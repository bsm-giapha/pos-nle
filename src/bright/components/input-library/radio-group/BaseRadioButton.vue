<template>
    <div :class="radioContainerClassObject">
        <div :class="labelWrapperClassObject">
            <input v-bind="radioInputBindings" @change="updateChecked"/>
            <BaseLabel v-bind="getLabelProps" hide-meta-label/>
            <BaseInputValidation v-bind="getInputValidationProps"/>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BaseRadioButton",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        checked: {
            type: Boolean,
            default: false,
            required: false,
        },
        value: {
            type: String,
            default: null,
            required: true,
        },
        variant: {
            type: String,
            default: 'standard',
            required: false,
            validator: function(value) {
                return ['standard', 'alternative'].includes(value);
            },
        },
    },
    emits: [
        'update:checked',
    ],
    data() {
        //Check if a parent component is setting the disabled property
        let inputGroup = this.getComponent('BrightInputGroup');
        let inputGroupDisabledValue = false;

        if (inputGroup !== null) {
            inputGroupDisabledValue = inputGroup.disabled;
        }

        return {
            disabledValue: inputGroupDisabledValue || this.disabled,
        };
    },
    computed: {
        radioInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'radio',
                    checked: this.checked,
                    value: this.value,
                    variant: this.variant,
                },
            };
        },
        radioContainerClassObject() {
            return {
                'BaseRadioButton': true,
                'BaseRadioButton__container': true,

                'BaseRadioButton__container--variant--standard': (!this.variant || this.variant === 'standard') && this.validationType !== 'error',
                'BaseRadioButton__container--variant--alternative': this.variant === 'alternative' && this.validationType !== 'error',
                'BaseRadioButton__container--variant--danger': this.validationType === 'error',

                'BaseRadioButton__container--size--large': this.size === 'large',
                'BaseRadioButton__container--size--medium': !this.size || this.size === 'medium',
                'BaseRadioButton__container--size--small': this.size === 'small',
            };
        },
        labelWrapperClassObject() {
            return {
                'BaseRadioButton__labelWrapper': true,

                'BaseRadioButton__labelWrapper--variant--standard': (!this.variant || this.variant === 'standard') && this.validationType !== 'error',
                'BaseRadioButton__labelWrapper--variant--alternative': this.variant === 'alternative' && this.validationType !== 'error',
                'BaseRadioButton__labelWrapper--variant--danger': this.validationType === 'error',

                'BaseRadioButton__labelWrapper--size--large': this.size === 'large',
                'BaseRadioButton__labelWrapper--size--large--inputValidation--withSubLabel': this.size === 'large' && this.subLabel,

                'BaseRadioButton__labelWrapper--size--medium': !this.size || this.size === 'medium',
                'BaseRadioButton__labelWrapper--size--medium--inputValidation--withSubLabel': (this.size === '' || this.size === 'medium') && this.subLabel,

                'BaseRadioButton__labelWrapper--size--small': this.size === 'small',
                'BaseRadioButton__labelWrapper--size--small--inputValidation--withSubLabel': this.size === 'small' && this.subLabel,
                'BaseRadioButton__labelWrapper--size--small--inputValidation--withoutSubLabel': this.size === 'small' && !this.subLabel,
            };
        },
    },
    methods: {
        updateChecked() {
            this.$emit('update:checked', this.value);
        },
        getComponent(componentName) {
            let component = null;
            let parent = this.$parent;
            while (parent && !component) {
                if (parent.$options.name === componentName) {
                    component = parent;
                }
                parent = parent.$parent;
            }
            return component;
        },
        handleAriaChecked() {
            return "" + this.value + "";
        },
    },
};
</script>

<style scoped>

</style>
