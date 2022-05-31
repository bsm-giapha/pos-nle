/**
 * Used for validating slot content.
 */
export const BrightGridSlotValidationMixin = {
    data() {
        return {
            containsValidSlotComponents: true,
        };
    },
    methods: {
        validateSlotComponents(parentComponent, validChildComponent) {
            if (this.$slots.default) {
                for (let [, slot] of Object.entries(this.$slots.default)) {
                    if (slot.componentInstance !== undefined && slot.componentInstance.$options._componentTag !== validChildComponent) {
                        console.error('The ' + parentComponent + ' must only have ' + validChildComponent + ' components as direct children.');
                        this.containsValidSlotComponents = false;
                    }
                }
            }
        },
    },
};
