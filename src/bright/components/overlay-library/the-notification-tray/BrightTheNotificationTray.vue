<template>
    <!-- The hard-coded `id` is intentional: This will help enforce the Singleton requirement -->
    <div id="BrightNotificationTray" v-bind="notificationTrayBindings">
        <BrightCard ref="notification" v-bind="notificationBindings">
            <template v-slot:left v-if="!isMobile">
                <BrightIcon v-bind="iconBindings"/>
            </template>

            <template v-slot:center v-if="!isMobile">
                <BrightButton
                    v-bind="ctaBindings"
                    @click="handleClickCallback"
                    @keydown.enter.space.prevent="handleClickCallback"
                >
                    {{ getCurrentNotification('cta') }}
                </BrightButton>
            </template>

            <template v-slot:right v-if="!isMobile">
                <a
                    ref="close"
                    v-bind="closeBindings"
                    @click="handleCloseNotification"
                    @keydown.enter.space.prevent="handleCloseNotification"
                >
                    <BrightIcon use="close"/>
                </a>
            </template>
        </BrightCard>
    </div>
</template>

<script>
import { nextTick } from "vue";
import BrightCard from "Bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";
import { MobileMixin } from "Bright/mixins/global/MobileMixin";
import { FocusableElementsMixin } from "Bright/mixins/global/FocusableElementsMixin";

let timeout;

export default {
    name: 'BrightTheNotificationTray',
    components: { BrightCard, BrightIcon, BrightButton },
    mixins: [MobileMixin, FocusableElementsMixin],
    data() {
        return {
            shouldShowNotification: false,
            notifications: [],

            isFocused: false,
            previouslyFocusedElement: null,
        };
    },
    computed: {
        notificationTrayBindings() {
            return {
                class: {
                    'BrightNotificationTray': true,
                    'BrightNotificationTray__mobile': this.isMobile,
                    'BrightNotificationTray__hidden': !this.shouldShowNotification,
                    'BrightNotificationTray__active': this.shouldShowNotification,
                },
                'aria-live': 'polite',
            };
        },
        notificationBindings() {
            return {
                class: {
                    'BrightNotification': true,
                    'BrightNotification__mobile': this.isMobile,
                    'BrightNotification__type--info': this.getCurrentNotification('type') === 'info',
                    'BrightNotification__type--success': this.getCurrentNotification('type') === 'success',
                    'BrightNotification__type--error': this.getCurrentNotification('type') === 'error',

                    'animation__notification--fade-in': this.shouldShowNotification,
                    'animation__notification--fade-out': !this.shouldShowNotification,
                    'animation__notification--slide-in-from-top': this.isMobile && this.shouldShowNotification,
                    'animation__notification--slide-out-to-top': this.isMobile && !this.shouldShowNotification,
                },
                label: this.getCurrentNotification('label'),
                subLabel: this.getCurrentNotification('subLabel'),
                size: 'small',
                raised: true,
                role: 'alert',
                'aria-live': 'polite',
            };
        },
        iconBindings() {
            return {
                class: {
                    'BrightNotification__icon': true,
                },
                use: this.getCurrentNotification('icon'),
            };
        },
        ctaBindings() {
            return {
                class: {
                    'BrightNotification__cta': true,
                    'BrightNotification__cta--none': !this.currentNotificationHas('cta'),
                },
                use: 'tertiary',
                href: 'javascript:void(0)',
            };
        },
        closeBindings() {
            return {
                class: {
                    'BrightNotification__close': true,
                },
                href: 'javascript:void(0)',
            };
        },
        currentNotificationHas() {
            return propertyValue => {
                return this.notifications.length && this.notifications[0][propertyValue];
            };
        },
    },
    watch: {
        shouldShowNotification: function(newValue) {
            this.handleNotificationDisplay(newValue);
            this.isFocused = !!newValue;

            if (!newValue && this.previouslyFocusedElement) {
                this.previouslyFocusedElement.focus();
            }
        },
    },
    mounted() {
        // Append Notification Tray to the <body>.
        let notificationTray = document.getElementById('BrightNotificationTray');
        document.body.appendChild(notificationTray);

        window.addEventListener('BrightNotificationCreate', this.handleCreateNotificationEvent);
        window.addEventListener('keydown', this.handleKeydownFocus);
        window.addEventListener('focusin', this.detectFocusIn);
    },
    beforeUnmount() {
        window.removeEventListener('BrightNotificationCreate', this.handleCreateNotificationEvent);
        window.removeEventListener('keydown', this.handleKeydownFocus);
        window.removeEventListener('focusin', this.detectFocusIn);
    },
    methods: {
        /**
        * Detects the currently focused element.
        */
        detectFocusIn() {
            // Save the element that was focused before a notification is shown.
            // Once the notification closes, the focus will move back to this element.
            if (!document.activeElement.className.includes('BrightNotification')) {
                this.previouslyFocusedElement = document.activeElement;
            }
        },

        /**
         * Moves focus to a specific element.
         */
        moveFocusTo(element, $event = null) {
            if (element === undefined) return;

            setTimeout(() => {
                element.focus({ preventScroll: true });
            }, 100);

            if ($event) {
                $event.preventDefault();
            }
        },

        /**
         * Handles the focus on elements on keydown events.
         */
        handleKeydownFocus($event) {
            if (this.isFocused) {
                let isTabPressed = ($event.key === 'Tab');
                if (!isTabPressed) return;

                const focusableElements = this.selectFocusableElements();
                if (focusableElements) {
                    const firstFocusableElement = focusableElements[1];
                    let lastFocusableElement = focusableElements[0];

                    // First & last focusable element will be the Close button if there is no CTA button included.
                    if (lastFocusableElement.className.includes('BrightNotification__cta--none')) {
                        lastFocusableElement = focusableElements[1];
                    }

                    // Only allow focus within the notification.
                    nextTick(() => {
                        if ($event.shiftKey) {
                            /* shift + tab */
                            if (document.activeElement === lastFocusableElement) {
                                this.moveFocusTo(firstFocusableElement, $event);
                            }
                        } else if (document.activeElement === firstFocusableElement) {
                            /* tab */
                            this.moveFocusTo(lastFocusableElement, $event);
                        }
                    });
                }
            }
        },

        validateNotification(object) {
            if ('type' in object) {
                // Ensure 'type' is a correct value.
                const possibleValues = ['info', 'success', 'error'];
                const hasValidValue = possibleValues.find(value => value === object.type);
                if (!hasValidValue) {
                    console.error('Invalid notification type.');
                }
            } else {
                // Set the 'type' default if empty.
                object.type = 'info';
            }

            if (!('icon' in object)) {
                // Set the 'icon' default if empty.
                object.icon = 'notifications';
            }

            // Ensure values are string types (except for clickCallback).
            const notificationProperties = ['type', 'icon', 'label', 'subLabel', 'cta'];
            const hasValidValueType = notificationProperties.every(property => {
                if (object[property] === undefined) return true;
                return typeof object[property] === 'string';
            });
            if (!hasValidValueType) {
                console.error('Notification object values must be strings.');
            }

            // Ensure clickCallback is a function.
            if ('clickCallback' in object) {
                if (typeof object.clickCallback !== 'function') {
                    console.error("Notification 'clickCallback' must be a function");
                }
            }
            return object;
        },

        handleCreateNotificationEvent($event) {
            if ($event.detail === undefined) return;

            let notificationObject = $event.detail;
            notificationObject = this.validateNotification(notificationObject);

            // Handle updating data
            nextTick(() => {
                this.notifications.push(notificationObject);
                this.shouldShowNotification = true;
            });
        },

        getCurrentNotification(propertyValue) {
            if (!this.currentNotificationHas(propertyValue)) return '';
            return this.notifications[0][propertyValue];
        },

        handleClickCallback() {
            let callback = this.getCurrentNotification('clickCallback');
            if (callback !== '') { (callback)(); }
        },

        handleCloseNotification() {
            this.shouldShowNotification = false;
        },

        handleNotificationDisplay(shouldShowNotification) {
            let thisComponent = this;
            let notificationDisplayDuration = this.getCurrentNotification('duration');
            if (notificationDisplayDuration === '') notificationDisplayDuration = 4500;
            nextTick(() => {
                if (shouldShowNotification) {
                    // Reset any existing timeouts.
                    if (timeout) {
                        window.clearTimeout(timeout);
                    }

                    const closeButtonElement = this.$refs.close;
                    this.moveFocusTo(closeButtonElement);

                    // Dismiss notification after a couple of seconds.
                    timeout = window.setTimeout(function() {
                        thisComponent.shouldShowNotification = false;
                    }, notificationDisplayDuration);
                } else {
                    setTimeout(function() {
                        // After notification is dismissed, remove it from the queue.
                        if (thisComponent.notifications) {
                            thisComponent.notifications.splice(0, 1);
                        }

                        // If there are more notifications in the queue, show the next one after 0.8 seconds.
                        if (thisComponent.notifications.length) {
                            thisComponent.shouldShowNotification = true;
                        }
                    }, 800);
                }
            });
        },
    },
};
</script>

<style scoped>

</style>
