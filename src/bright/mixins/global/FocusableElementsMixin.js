import { nextTick } from "vue";
/**
 *  Shared globally across all components that need to utilize placing focus on focusable elements.
 */
export const FocusableElementsMixin = {
    methods: {
        getComponentNameThatIsUsingMixin() {
            let componentName = null;
            if (this.$options.name.includes('Popper')) {
                componentName = 'popper';
            } else if (this.$options.name.includes('Popover')) {
                componentName = 'popover';
            } else if (this.$options.name.includes('Tooltip')) {
                componentName = 'tooltip';
            } else if (this.$options.name.includes('Modal')) {
                componentName = 'modal';
            } else if (this.$options.name.includes('Notification')) {
                componentName = 'notification';
            }
            return componentName;
        },

        /**
         * Selects all of the focusable elements in the component.
         */
        selectFocusableElements() {
            const selectors = 'a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], [contenteditable]';
            const component = this.getComponentNameThatIsUsingMixin();

            if (component === 'popper') {
                if (this.$refs.popper === undefined) return '';
                return this.$refs.popper.$el.querySelectorAll(selectors);

            } else if (component === 'popover' || component === 'tooltip') {
                if (this.$refs.basePopper.$refs.popper === undefined) return '';
                return this.$refs.basePopper.$refs.popper.$el.querySelectorAll(selectors);

            } else if (component === 'modal') {
                if (this.$refs.modal === undefined) return '';
                return this.$refs.modal.$el.querySelectorAll(selectors);

            } else if (component === 'notification') {
                if (this.$refs.notification === undefined) return '';
                return this.$refs.notification.$el.querySelectorAll(selectors);
            }
        },

        /**
         * Applies the key down event to the last focusable element (which is the origination source).
         */
        handleLastFocusableElementKeyDown(event) {
            let modalSourceElement = this.closeFocusID ? document.getElementById(this.closeFocusID) : null;
            if (event === undefined || modalSourceElement === undefined) { return; }

            nextTick(() => {
                if (modalSourceElement === null) {
                    // Applies to Popper components.
                    if (event.key === 'Tab' && this.$refs.sourceElement.children[0] !== undefined) {
                        this.$refs.sourceElement.children[0].focus();
                    }
                } else {
                    // Applies to Modal components.
                    switch (event.key) {
                        case ' ':
                        case 'Space':
                        case 'Enter':
                        case 'Escape':
                        case 'Tab':
                            modalSourceElement.focus();
                            break;
                        default:
                            break;
                    }
                }
            });
        },

        /**
         * Returns the first possible focusable element in the component.
         */
        getFirstPossibleFocusableElement(indexToSkipTo = 0) {
            let firstFocusableElement = null;
            let nodes = this.selectFocusableElements();

            if (nodes.length > 0) {
                firstFocusableElement = nodes[0];

                if (indexToSkipTo) {
                    firstFocusableElement = nodes[indexToSkipTo];
                }
            }
            return firstFocusableElement;
        },

        /**
         * Returns the last possible focusable element in the component.
         */
        getLastPossibleFocusableElement() {
            let lastFocusableElement = null;
            let nodes = this.selectFocusableElements();
            if (nodes.length > 0) {
                lastFocusableElement = nodes[nodes.length - 1];
            }
            return lastFocusableElement;
        },

        /**
         * Places focus on the first possible focusable element.
         */
        handleFirstFocusedElement() {
            nextTick(() => {
                let firstFocusedElement = this.getFirstPossibleFocusableElement();
                if (firstFocusedElement) {
                    setTimeout(() => {
                        firstFocusedElement.focus({ preventScroll: true });
                    }, 100);
                }
            });
        },
    },
};
