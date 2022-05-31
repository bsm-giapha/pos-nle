import { FocusableElementsMixin } from "../global/FocusableElementsMixin";

/**
 *  Shared Modal behavior between the Popup and Popout components.
 */
export const ModalMixin = {
    mixins: [FocusableElementsMixin],
    data() {
        return {
            isBeingShown: this.show,
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: 'small',
            validator(value) {
                return ['small', 'medium', 'large'].includes(value);
            },
        },
        closeLabel: {
            type: String,
            default: 'Close',
        },
        closeFocusID: {
            type: [String, Number],
            required: true,
        },
        closeButtonType: {
            type: String,
            default: 'primary',
            required: false,
            validator: function(value) {
                return ['primary', 'secondary', 'tertiary'].includes(value);
            },
        },

        /**
         * Card Props
         */
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: '',
            required: false,
        },
        subLabel: {
            type: String,
            default: '',
            required: false,
        },
        invertLabels: {
            type: Boolean,
            default: false,
            required: false,
        },
        breakpointHeaderLeft: { // Determines when the Left section will be put on its own line.
            type: [String],
            default: 'never',
            required: false,
            validator(value) {
                return ['always', 'tablet', 'never'].includes(value);
            },
        },
        breakpointHeaderRight: { // Determines when the Right section will be merged with the Bottom section.
            type: [String],
            default: 'never',
            required: false,
            validator(value) {
                return ['always', 'tablet', 'never'].includes(value);
            },
        },
    },
    beforeMount() {
        Element.prototype.scrollTo = () => {};
    },
    mounted() {
        this.handleVisibility(this.show);

        /**
         * Applies the key down event to the last focusable element (which is the origination source).
         */
        let nodes = this.selectFocusableElements();
        if (nodes.length > 0) {
            this.lastFocusableElement = nodes[nodes.length - 1];
            this.lastFocusableElement.addEventListener('keydown', this.handleLastFocusableElementKeyDown);
        }
    },
    beforeUnmount() {
        //Removes the lastFocusableElement's event listener.
        if (this.lastFocusableElement !== undefined) {
            this.lastFocusableElement.removeEventListener('keydown', this.handleLastFocusableElementKeyDown);
        }
    },
    computed: {
        overlayBindings() {
            return {
                class: {
                    'BaseModalOverlay': true,
                    'BaseModalOverlay__inactive': !this.isBeingShown,
                    'BaseModalOverlay__active': this.isBeingShown,
                },
            };
        },
    },
    methods: {
        handleModalClose(event) {
            this.handleVisibility(false);
            this.handleLastFocusableElementKeyDown(event);
            this.$emit('closed');
        },

        /**
         * Handles visibility changes.
         * @param {Boolean} newValue
         */
        handleVisibility(newValue) {
            this.isBeingShown = newValue;
            if (newValue) {
                let modal = this.$refs.modal.$el;
                modal.scrollTo(0, 0);
                document.body.classList.add('overflow-y-hidden');
                this.handleFirstFocusedElement();
            } else {
                document.body.classList.remove('overflow-y-hidden');
            }
        },

        handleKeyDown(event) {
            if (event.key === 'Escape') {
                this.handleModalClose(event);
                return;
            }

            let firstFocusableElement = this.getFirstPossibleFocusableElement();
            let lastFocusableElement = this.getLastPossibleFocusableElement();

            //When only Tab is pressed, handle focus on appropriate elements.
            if (!event.shiftKey && event.key === 'Tab') {
                //Place focus on the Last Focusable Element if the Close button is the only focusable element.
                if (firstFocusableElement === lastFocusableElement) {
                    lastFocusableElement.focus();
                    event.preventDefault();

                //Else place focus on the First Focusable Element if current focus is on the Close button.
                } else if (lastFocusableElement === document.activeElement) {
                    firstFocusableElement.focus();
                    event.preventDefault();
                }
            }

            //When Shift + Tab is pressed, handle focus on appropriate elements.
            if (event.shiftKey && event.key === 'Tab') {
                //Place focus on the Last Focusable Element if the First Focusable Element is currently focused OR if the Close button is the only focusable element.
                if ((firstFocusableElement === document.activeElement) || (firstFocusableElement === lastFocusableElement)) {
                    lastFocusableElement.focus();
                    event.preventDefault();

                //Else place focus on the First Focusable Element if current focus is on the Close button.
                } else {
                    //Note: When focus is on the Close button, document.activeElement returns the closeFocusElement.
                    let closeFocusElement = document.getElementById(this.closeFocusID + '');
                    if (closeFocusElement === document.activeElement) {
                        let nodes = this.selectFocusableElements();
                        if (nodes.length > 1) {
                            let previousFocusableElement = nodes[nodes.length - 2];
                            previousFocusableElement.focus();
                            event.preventDefault();
                        }
                    }
                }
            }
        },
    },
    watch: {
        show: function(newValue) {
            this.handleVisibility(newValue);
        },
    },
};
