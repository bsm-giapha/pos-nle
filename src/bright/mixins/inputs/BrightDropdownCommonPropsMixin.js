/**
 *  Props that can be passed in to any type of Bright Dropdown
 */

export const BrightDropdownCommonPropsMixin = {
    props: {
        buttonFullWidth: {
            type: Boolean,
            required: false,
            default: true,
        },
        dummy: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideArrow: {
            type: Boolean,
            required: false,
            default: false,
        },
        hierarchy: {
            type: String,
            required: false,
            default: 'input',
            validator(value) {
                return ['input', 'primary', 'secondary', 'tertiary'].includes(value);
            },
        },
        icon: {
            type: String,
            default: '',
            required: false,
        },
        iconPosition: {
            type: String,
            default: 'prefix',
            required: false,
            validator(value) {
                return ['center', 'prefix', 'postfix'].includes(value);
            },
        },
        menuFullWidth: {
            type: Boolean,
            required: false,
            default: false,
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false,

        },
        multipleItemTruncation: {
            type: Boolean,
            required: false,
            default: true,
        },
        multipleSelectAll: {
            type: Boolean,
            required: false,
            default: true,
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Select',
        },
        rounded: {
            type: Boolean,
            default: false,
            required: false,
        },
        searchable: {
            type: Boolean,
            required: false,
            default: false,
        },
        tabindex: {
            type: [Number, String],
            default: 0,
            required: false,
        },
        variant: {
            type: String,
            default: 'standard',
            required: false,
            validator(value) {
                return ['standard', 'alternative', 'danger'].includes(value);
            },
        },
    },
};
