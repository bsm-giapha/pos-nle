<template>
    <BaseFormControl v-bind="fieldsetBindings">
        <legend v-show="!hideCompoundLabel" :class="legendClassObject">
            <BaseLabel v-bind="getLabelProps"/>
        </legend>
        <div :class="compoundedInputsClassObject">
            <slot></slot>
        </div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightInputCompound",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: true,
    props: {
        displayClass: {
            type: String,
            required: false,
            default: 'flex',
        },
        hideCompoundLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideInputLabels: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        fieldsetBindings() {
            return {
                id: this.id,
                elementType: 'fieldset',
                formControl: this.formControl,
                size: this.size,
                class: {
                    'BrightInputCompound': true,
                    'BrightInputCompound__hideInputLabels': this.hideInputLabels,
                    'BrightInputCompound__rounded': this.rounded,
                },
            };
        },
        legendClassObject() {
            return {
                'BrightInputGroup__size': true,
                'BrightInputGroup__size--small': this.size === 'small',
                'BrightInputGroup__size--medium': !this.size || this.size === 'medium',
                'BrightInputGroup__size--large': this.size === 'large',
            };
        },
        compoundedInputsClassObject() {
            return {
                ['compoundedInputs ' + this.displayClass]: true,
            };
        },
    },
};
</script>

<style scoped>

</style>
