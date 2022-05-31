<template>
    <div ref="container" :class="exteriorClass">
        <div
            ref="sourceElement"
            :class="exteriorClass"
            @click="handlePopperClickEvent"
            @keydown="handlePopperKeyDownEvent"
            @focus="handleMouseover"
            @mouseover="handleMouseover"
            @mouseout="handleMouseout"
        >
            <slot/>
        </div>
        <div ref="wrapper" :class="wrapperClassObject">
            <BrightCard
                v-show="showPopper"
                ref="popper"
                v-bind="getPopperPropsAndAttrs"
                :role="role"
            >
                <a
                    v-show="isClosable"
                    :class="closableClassObject"
                    href="javascript:void(0)"
                    @click="handlePopperCloseOnClick"
                    @keydown="handlePopperKeyDownEvent"
                >
                    <BrightIcon ref="close" use="close"/>
                </a>
                <slot :name="type"/>
                <div
                    v-show="showArrow"
                    ref="arrow"
                    class="arrow"
                    data-popper-arrow
                />
            </BrightCard>
        </div>
    </div>
</template>

<script>
import { nextTick } from "vue";
import { createPopper, preventOverflow, flip } from '@popperjs/core';
import BrightCard from "Bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
import { FocusableElementsMixin } from "Bright/mixins/global/FocusableElementsMixin";

const showPopperEvents = ['mouseenter', 'focus'];
const hidePopperEvents = ['mouseleave', 'blur'];

export default {
    name: "BasePopper",
    components: { BrightIcon, BrightCard },
    mixins: [FocusableElementsMixin],
    inheritAttrs: true, // Note: This should probably be false because we're binding $attrs to a nested element.
    props: {
        use: {
            type: String,
            required: true,
            validator: function(value) {
                return ['popover', 'tooltip'].includes(value);
            },
        },
        styleClass: {
            type: String,
            required: false,
            default: '',
        },
        placement: {
            type: String,
            required: false,
            default: 'top',
            validator(value) {
                const acceptedValues = [
                    'top-start', 'top', 'top-end',
                    'bottom-start', 'bottom', 'bottom-end',
                    'left-start', 'left', 'left-end',
                    'right-start', 'right', 'right-end',
                    'auto-start', 'auto', 'auto-end',
                ];
                return acceptedValues.includes(value);
            },
        },
        arrow: {
            type: Boolean,
            required: false,
            default: true,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    emits: [
        'popover:click-opened',
        'popover:click-closed',
        'popover:keydown-opened',
        'popover:keydown-closed',
        'tooltip:click-opened',
        'tooltip:click-closed',
        'tooltip:keydown-opened',
        'tooltip:keydown-closed',
    ],
    data() {
        return {
            popperInstance: null,

            /* HTML Attributes */
            exteriorClass: '',
            type: this.getPopperType(),
            role: this.getPopperRole(),

            /* Popper Display */
            showPopper: false,
            showArrow: this.shouldShowArrow(),
            arrowOffsetDistance: this.shouldShowArrow() ? 16 : 4,
            isDisabled: this.disabled === true || this.disabled === 'true',

            /* Popover Display */
            isClosable: this.isPopover() && (this.$parent.$props.closable === true || this.$parent.$props.closable === 'true'),

            /* Tooltip Display */
            showTitle: this.isTooltip(),
            showText: this.isTooltip(),

            scrollPixel: 1,
        };
    },
    computed: {
        wrapperClassObject() {
            return {
                'BasePopper__wrapper--disabled': this.disabled === true || this.disabled === 'true',
                'BasePopper__arrow': this.showArrow,
            };
        },
        popperClassObject() {
            return {
                'BasePopper__card': true,
            };
        },
        closableClassObject() {
            return {
                'BasePopper__card--closable': this.isClosable,
            };
        },
        getPopperPropsAndAttrs() {
            return {
                ...{
                    class: this.mergeClassObjectWithStyleClass(this.popperClassObject),
                    placement: this.placement,
                    disabled: this.disabled,
                    size: 'small',
                    raised: true,
                },
                ...this.$attrs,
            };
        },
    },
    watch: {
        showPopper(newValue) {
            if (newValue) {
                this.createPopper();
            }
        },
        disabled(newValue) {
            this.isDisabled = newValue;
        },
    },
    mounted() {
        /**
             * Explanation: Once a popper is created with createPopper, it stays "alive".
             * This means while scrolling the page, the popper is constantly being updated, even if it is not visible.
             * The popper instance has to be created & destroyed when necessary in order to improve performance.
             */
        const sourceElement = this.$refs.sourceElement.children[0];
        showPopperEvents.forEach(event => {
            sourceElement.addEventListener(event, this.show());
        });
        hidePopperEvents.forEach(event => {
            sourceElement.addEventListener(event, this.hide());
        });

        /**
             * Explanation: The popper's container element is inline-block because of reasons. This means that the
             * slot's display property will never be respected and will always be inline-block. This means that the
             * popper is not compatible with block, flex, and inline elements.
             *
             * This exteriorClass data attribute will wrap the entire popper in the slot's display value, making it
             * behave as if the slot was the root element for display calculation purposes.
             *
             * @type {string}
             */
        this.exteriorClass = window.getComputedStyle(this.$refs.sourceElement.children[0]).getPropertyValue('display');

        /**
             * Applies the key down event to the last focusable element (which is the origination source).
             */
        this.lastFocusableElement = this.getLastPossibleFocusableElement();
        if (this.lastFocusableElement) {
            this.lastFocusableElement.addEventListener('keydown', this.handleLastFocusableElementKeyDown);
        }
    },
    beforeUnmount() {
        // Removes popper instance's event listener.
        const sourceElement = this.$refs.sourceElement.children[0];
        showPopperEvents.forEach(event => {
            sourceElement.removeEventListener(event, this.show());
        });
        hidePopperEvents.forEach(event => {
            sourceElement.removeEventListener(event, this.hide());
        });

        // Removes the lastFocusableElement's event listener.
        if (this.lastFocusableElement !== null) {
            this.lastFocusableElement.removeEventListener('keydown', this.handleLastFocusableElementKeyDown);
        }
    },
    updated() {
        if (this.popperInstance) {
            this.popperInstance.update();
        }
    },
    methods: {
        /**
             * Creates popper instance.
             */
        createPopper() {
            const sourceElement = this.$refs.sourceElement.children[0];
            const popper = this.$refs.wrapper.children[0];

            this.popperInstance = createPopper(sourceElement, popper, {
                modifiers: [
                    preventOverflow,
                    flip,
                    {
                        name: 'offset',
                        options: {
                            offset: [0, this.arrowOffsetDistance],
                        },
                    },
                ],
                placement: this.placement,
            });
        },
        /**
             * Destroys popper instance.
             */
        destroyPopper() {
            if (this.popperInstance) {
                this.popperInstance.destroy();
                this.popperInstance = null;
            }
        },
        /**
             * Adds data-show attribute to popper.
             */
        show() {
            const popper = this.$refs.wrapper.children[0];
            popper.setAttribute('data-show', '');
            this.createPopper();
        },
        /**
             * Removes data-show attribute from popper.
             */
        hide() {
            const popper = this.$refs.wrapper.children[0];
            popper.removeAttribute('data-show', '');
            this.destroyPopper();
        },

        /**
             * HTML Element Methods
             */
        mergeClassObjectWithStyleClass(classObject = {}) {
            return {
                ...{
                    [this.styleClass]: true,
                },
                ...classObject,
            };
        },
        shouldShowArrow() {
            return this.arrow === true || this.arrow === 'true';
        },
        getPopperType() {
            return this.use;
        },
        getPopperRole() {
            return this.isPopover() ? 'dialog' : this.use;
        },
        isPopover() {
            return this.use === 'popover';
        },
        isTooltip() {
            return this.use === 'tooltip';
        },

        /**
             * Click Methods
             */
        handlePopperClickEvent() {
            this.triggerScroll();

            if (!this.isDisabled) {
                if (this.isPopover()) {
                    this.showPopper = !this.showPopper;
                }
            }

            if (this.showPopper) {
                this.openPopperClick();
            } else {
                this.closePopperClick();
            }
        },
        openPopperClick() {
            this.emitPopperOpenedClickEvent();
        },
        closePopperClick() {
            this.emitPopperClosedClickEvent();
        },
        handlePopperCloseOnClick() {
            this.showPopper = false;
            this.emitPopperClosedClickEvent();
        },

        /**
             * Key Down Methods
             */
        handlePopperKeyDownEvent(event) {
            if (event === undefined) { return; }

            this.triggerScroll();

            if (this.isPopover()) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    this.handlePopperKeyDownVisibility();
                }
            }

            if (this.isTooltip()) {
                // Prevents space bar from scrolling the page.
                if (event.key === ' ') {
                    event.preventDefault();
                }
            }

            if (event.key === 'Escape') {
                if (this.isTooltip()) {
                    // Toggle tooltip opened/closed when the Escape key is pressed.
                    this.handlePopperKeyDownVisibility(event.key);
                } else {
                    this.closePopperKeyDown();
                }
            }
        },
        /**
             * Handles popper visibility on keydown.
             * @param {string} [keyException = null] - Handles exception to keys that should control visibility differently.
             */
        handlePopperKeyDownVisibility(keyException = null) {
            if (!this.disabled) {
                this.showPopper = !this.showPopper;
            }

            if (this.showPopper) {
                this.openPopperKeyDown();
            } else {
                this.closePopperKeyDown(keyException);
            }
        },
        openPopperKeyDown() {
            this.showPopper = true;
            this.emitPopperOpenedKeyDownEvent();
        },
        closePopperKeyDown(keyException = null) {
            this.showPopper = false;
            this.emitPopperClosedKeyDownEvent(keyException);
        },

        /**
             * Mouse Methods
             */
        handleMouseover() {
            if (this.isTooltip()) {
                this.triggerScroll();
                this.openPopperKeyDown();
            }
        },
        handleMouseout() {
            if (this.isTooltip()) {
                this.closePopperKeyDown();
            }
        },

        /**
         * There's currently an issue with the `placement` option in popper.js
         * This is a temporary work-around for the popper not opening in the correct position for certain placements.
         */
        triggerScroll() {
            this.scrollPixel = this.scrollPixel > 0 ? -1 : 1;
            window.scrollTo(window.scrollX, window.scrollY + this.scrollPixel);
        },

        /**
             * Public Methods
             */
        $_openPopper() {
            this.showPopper = true;
            nextTick(() => {
                this.openPopperClick();
            });
        },
        $_closePopper() {
            this.showPopper = false;
            nextTick(() => {
                this.closePopperClick();
            });
        },
        $_togglePopper() {
            this.showPopper = !this.showPopper;
            nextTick(() => {
                if (this.showPopper) {
                    this.openPopperClick();
                } else {
                    this.closePopperClick();
                }
            });
        },

        /**
             * Event Methods
             */
        emitPopperOpenedClickEvent() {
            const popperType = this.getPopperType();
            if (this.isPopover() && !this.isDisabled) {
                this.$emit(popperType+':click-opened');
            }
        },
        emitPopperClosedClickEvent() {
            const popperType = this.getPopperType();
            if (this.isPopover() && !this.isDisabled) {
                this.$emit(popperType+':click-closed');
            }
        },
        emitPopperOpenedKeyDownEvent() {
            const popperType = this.getPopperType();
            this.$emit(popperType+':keydown-opened');
        },
        emitPopperClosedKeyDownEvent(keyException = null) {
            const popperType = this.getPopperType();
            const argsObject = {
                keyException: keyException,
            };
            this.$emit(popperType+':keydown-closed', argsObject);
        },
    },
};
</script>

<style scoped>

</style>
