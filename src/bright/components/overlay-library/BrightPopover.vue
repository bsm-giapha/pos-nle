<template>
    <BasePopper
        ref="basePopper"
        use="popover"
        @popover:click-opened="handlePopoverFirstFocusedElement"
        @popover:keydown-opened="handlePopoverFirstFocusedElement"
        @popover:keydown-closed="handleKeydownClosed"
    >
        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
        </template>
    </BasePopper>
</template>

<script>
import { nextTick } from "vue";
import BasePopper from "./base/BasePopper.vue";
import { FocusableElementsMixin } from "Bright/mixins/global/FocusableElementsMixin";

export default {
    name: "BrightPopover",
    components: { BasePopper },
    mixins: [FocusableElementsMixin],
    inheritAttrs: true,
    props: {
        firstFocusedElement: {
            type: String,
            required: false,
            default: null,
        },
        closable: {
            type: Boolean,
            required: false,
            default: true,
        },
        show: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            isClosable: this.closable === true || this.closable === 'true',
        };
    },
    watch: {
        show: function(newValue) {
            if (!newValue) {
                this.$_closePopover();
            }
        },
    },
    mounted() {
        // Closes the popover if the area outside of the origination source is clicked.
        window.addEventListener('click', this.handleClickOutsideOfOriginationSource);
    },
    beforeUnmount() {
        // Removes the popover's click event listener.
        window.removeEventListener('click', this.handleClickOutsideOfOriginationSource);
    },
    methods: {
        /**
             * Determines which element to place focus on when the popover is opened.
             */
        handlePopoverFirstFocusedElement() {
            let firstFocusedElement = this.firstFocusedElement;
            nextTick(() => {
                if (firstFocusedElement !== null) {
                    // Places focus on the user-specified element or the first possible focusable element.
                    if (document.getElementById(firstFocusedElement) !== null) {
                        document.getElementById(firstFocusedElement).focus({ preventScroll: true });
                    } else {
                        firstFocusedElement = this.getFirstPossibleFocusableElement();
                        firstFocusedElement.focus({ preventScroll: true });
                    }
                } else if (!this.isClosable) {
                    // Places focus on the first possible focusable element.
                    firstFocusedElement = this.getFirstPossibleFocusableElement(1);
                    if (firstFocusedElement === null) return;

                    if (document.getElementById(firstFocusedElement) !== null
                                || document.getElementById(firstFocusedElement.id) !== null
                    ) {
                        firstFocusedElement.focus({ preventScroll: true });
                    }
                } else {
                    // Places focus on the "close" button.
                    firstFocusedElement = this.$refs.basePopper.$refs.close.$el.parentNode;
                    if (firstFocusedElement !== undefined) {
                        firstFocusedElement.focus({ preventScroll: true });
                    }
                }
            });
        },

        /**
             * Closes the popover if the area outside of the origination source is clicked.
             */
        handleClickOutsideOfOriginationSource(event) {
            const popoverContainer = this.$refs.basePopper.$refs.container;

            if (!popoverContainer.contains(event.target) && this.$refs.basePopper.showPopper) {
                this.$refs.basePopper.showPopper = false;
                this.$refs.basePopper.emitPopperClosedClickEvent();
            }
        },

        /**
             * Handles actions taken when the popover is closed on keydown.
             */
        handleKeydownClosed() {
            const sourceElement = this.$refs.basePopper.$refs.sourceElement.firstElementChild;

            if (sourceElement !== undefined) {
                sourceElement.focus();
            }
        },

        /**
             * Public Methods
             */
        $_openPopover() {
            this.$refs.basePopper.$_openPopper();
        },
        $_closePopover() {
            this.$refs.basePopper.$_closePopper();
        },
        $_togglePopover() {
            this.$refs.basePopper.$_togglePopper();
        },
    },
};
</script>

<style scoped>

</style>
