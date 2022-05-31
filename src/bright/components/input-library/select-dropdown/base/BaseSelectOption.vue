<template>
    <div
        v-bind="selectOptionBindings"
        @click="handleEvent($event)"
        @keydown="handleEvent($event)"
        @focus="handleEvent($event)"
        @blur="handleEvent($event)"
        @mouseover="state.isHoveredOver = true"
        @mouseleave="state.isHoveredOver = false"
    >
        <BrightIcon v-if="icon || selected" v-bind="iconBindings"/>
        <div v-bind="labelContainerBindings">
            <div v-bind="primaryLabelBindings">{{ label }}</div>
            <div v-if="subLabel" v-bind="secondaryLabelBindings">{{ subLabel }}</div>
        </div>
    </div>
</template>

<script>
import { SizeMixin } from "Bright/mixins/global/SizeMixin";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
export default {
    name: "BaseSelectOption",
    components: { BrightIcon },
    mixins: [SizeMixin],
    inheritAttrs: true,
    props: {
        optionData: {
            type: Object,
            required: true,
            default: function() {
                return {
                    label: '',
                    value: '',
                    disabled: false,
                    icon: null,
                    selected: false,
                    subLabel: null,
                };
            },
        },
        focused: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    emits: ['option:event'],
    data() {
        return {
            id: this.optionData.id,
            label: this.optionData.label,
            value: this.optionData.value,
            disabled: (this.optionData.disabled) ? this.optionData.disabled : false,
            icon: (this.optionData.icon) ? this.optionData.icon : null,
            selected: (this.optionData.selected) ? this.optionData.selected : false,
            focusedValue: this.focused,
            subLabel: (this.optionData.subLabel) ? this.optionData.subLabel : null,
            isInMultiSelectDropdown: (this.optionData.isInMultiSelectDropdown) ? this.optionData.isInMultiSelectDropdown : false,
            state: {
                isHoveredOver: false,
            },
        };
    },
    computed: {
        ariaLabelledBy() {
            return this.primaryLabelID + (this.subLabel ? ' ' + this.secondaryLabelID : '');
        },
        primaryLabelID() {
            return this.id + '-PrimaryLabel';
        },
        secondaryLabelID() {
            return this.id + '-SecondaryLabel';
        },
        selectOptionBindings() {
            return {
                id: this.id,
                class: {
                    'BaseSelectOption': true,

                    'BaseSelectOption__state--enabled': !this.disabled,
                    'BaseSelectOption__state--disabled': this.disabled,
                    'BaseSelectOption__state--focused': (this.focusedValue || this.state.isHoveredOver) && !this.disabled && !this.selected,
                    'BaseSelectOption__state--selected': this.selected && !this.disabled,
                },
                role: 'option',
                tabindex: -1,
                'aria-labelledby': this.ariaLabelledBy,
                'aria-selected': this.selected,
                'aria-disabled': this.disabled,
            };
        },
        iconBindings() {
            return {
                class: {
                    'BaseSelectOption__Icon': true,

                    'BaseSelectOption__Icon__size--large': this.size === 'large',
                    'BaseSelectOption__Icon__size--medium': this.size === 'medium',
                    'BaseSelectOption__Icon__size--small': this.size === 'small',

                    'BaseSelectOption__Icon__state--enabled': !this.disabled,
                    'BaseSelectOption__Icon__state--disabled': this.disabled,
                    'BaseSelectOption__Icon__state--focused': (this.focusedValue || this.state.isHoveredOver) && !this.disabled,
                    'BaseSelectOption__Icon__state--selected': this.selected && !this.disabled,
                },
                use: (this.selected) ? 'check' : this.icon,
            };
        },
        labelContainerBindings() {
            return {
                class: {
                    'BaseSelectOption__LabelContainer': true,
                },
            };
        },
        primaryLabelBindings() {
            return {
                id: this.primaryLabelID,
                class: {
                    'BaseSelectOption__LabelContainer__PrimaryLabel': true,

                    'BaseSelectOption__LabelContainer__PrimaryLabel__size--large': this.size === 'large',
                    'BaseSelectOption__LabelContainer__PrimaryLabel__size--medium': this.size === 'medium',
                    'BaseSelectOption__LabelContainer__PrimaryLabel__size--small': this.size === 'small',

                    'BaseSelectOption__LabelContainer__PrimaryLabel__state--enabled': !this.disabled,
                    'BaseSelectOption__LabelContainer__PrimaryLabel__state--disabled': this.disabled,
                    'BaseSelectOption__LabelContainer__PrimaryLabel__state--focused': (this.focusedValue || this.state.isHoveredOver) && !this.disabled,
                    'BaseSelectOption__LabelContainer__PrimaryLabel__state--selected': this.selected && !this.disabled,
                },
            };
        },
        secondaryLabelBindings() {
            return {
                id: this.secondaryLabelID,
                class: {
                    'BaseSelectOption__LabelContainer__SecondaryLabel': true,

                    'BaseSelectOption__LabelContainer__SecondaryLabel__size--large': this.size === 'large',
                    'BaseSelectOption__LabelContainer__SecondaryLabel__size--medium': this.size === 'medium',
                    'BaseSelectOption__LabelContainer__SecondaryLabel__size--small': this.size === 'small',

                    'BaseSelectOption__LabelContainer__SecondaryLabel__state--enabled': !this.disabled,
                    'BaseSelectOption__LabelContainer__SecondaryLabel__state--disabled': this.disabled,
                    'BaseSelectOption__LabelContainer__SecondaryLabel__state--focused': (this.focusedValue || this.state.isHoveredOver) && !this.disabled,
                    'BaseSelectOption__LabelContainer__SecondaryLabel__state--selected': this.selected && !this.disabled,
                },
            };
        },
    },
    watch: {
        optionData: {
            deep: true,
            handler(newValue) {
                this.id = newValue.id;
                this.label = newValue.label;
                this.modelValue = newValue.value;
                this.disabled = (newValue.disabled) ? newValue.disabled : false;
                this.icon = (newValue.icon) ? newValue.icon : null;
                this.selected = (newValue.selected) ? newValue.selected : false;
                this.focusedValue = this.focused;
                this.subLabel = (newValue.subLabel) ? newValue.subLabel : null;
                this.isInMultiSelectDropdown = (newValue.isInMultiSelectDropdown) ? newValue.isInMultiSelectDropdown : false;
                this.state.isHoveredOver = false;
            },
        },
    },
    methods: {
        handleEvent(event) {
            if (event === undefined) { return; }
            event.target.id = this.id; // The nested child elements need to pass this ID or else things will break.

            if (event.type === 'focus') {
                this.focusedValue = true;
            } else if (event.type === 'blur') {
                this.focusedValue = false;
            }

            if ((event.type === 'click' && !this.disabled) || event.type === 'keydown') {
                this.$emit('option:event', event);
            }
        },
    },
};
</script>

<style scoped>

</style>
