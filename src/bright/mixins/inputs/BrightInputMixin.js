/**
 *  Shared across ALL BrightInputs
 */

/* Components */
import BaseFormControl from 'Bright/components/input-library/base/BaseFormControl.vue';
import BaseLabel from "Bright/components/input-library/base/BaseLabel.vue";
import BaseInputValidation from "Bright/components/input-library/base/BaseInputValidation.vue";

/* Mixins */
import { SizeMixin } from "../global/SizeMixin";

export const BrightInputMixin = {
    mixins: [SizeMixin],
    components: {
        BaseFormControl,
        BaseLabel,
        BaseInputValidation,
    },
    emits: ['update:modelValue'],
    props: {
        hideLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideSubLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        formControl: {
            type: String,
            required: false,
            default: 'comfortable',
            validator(value) {
                return ['comfortable', 'tight', 'loose', 'none'].includes(value);
            },
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        formControlBindings: {
            type: Object,
            required: false,
            default: () => {},
        },
        name: {
            type: String,
            required: false,
            default: null,
        },
        optional: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Whether to display a red asterisk if the field is required or the word (optional) if the field is optional
         */
        hideMetaLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false,
        },
        subLabel: {
            type: String,
            required: false,
            default: null,
        },
        /*
            Type is excluded because it shouldn't be exposed as an editable prop
        */
        validationMessage: {
            type: String,
            required: false,
            default: null,
        },
        validationType: {
            type: String,
            required: false,
            default: 'none',
            validator(value) {
                return ['error', 'success', 'none', ''].includes(value);
            },
        },
        /** Override this in every Input component */
        modelValue: {
            required: false,
        },
    },
    computed: {
        getFormControlProps() {
            return {
                formControl: this.formControl,
                size: this.size,
                ...this.formControlBindings,
            };
        },
        getLabelProps() {
            return {
                size: this.size,
                disabled: this.disabled,
                forValue: this.id,
                label: this.label,
                optional: this.optional,
                hideMetaLabel: this.hideMetaLabel,
                subLabel: this.subLabel,
                readonly: this.readonly,
                hideLabel: this.hideLabel,
                hideSubLabel: this.hideSubLabel,
            };
        },
        getBaseInputProps() {
            return {
                disabled: this.disabled,
                id: this.id,
                'aria-label': this.label,
                name: (this.name ? this.name : this.id),
                required: !this.optional,
                readonly: this.readonly,
                /* Value deliberately excluded due to the use of v-model in concrete components */
            };
        },
        getInputValidationProps() {
            return {
                size: this.size,
                validationMessage: this.validationMessage,
                validationType: this.validationType,
            };
        },
    },
    methods: {
        /**
         * @param {{}}classObject
         * @returns {{}}
         */
        mergeClassObjectWithAttributeClass(classObject = {}) {
            return {
                ...{
                    [this.$attrs.class]: true,
                },
                ...classObject,
            };
        },
        focus: function () {
            this.$refs.input.focus();
        },
    },
};
