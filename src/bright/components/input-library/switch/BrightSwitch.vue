<template>
    <BaseFormControl v-bind="getFormControlProps" :form-control="parentIsInputGroup ? 'none' : 'comfortable'">
        <div :class="switchContainerClassObject">
            <div class="flex flex-col" @click.prevent="handleInputEvent">
                <div class="inline-block">
                    <BaseLabel hide-meta-label v-bind="getLabelProps"/>
                    <BaseInputValidation v-bind="getInputValidationProps"/>
                </div>
                <div :class="switchWrapperClassObject">
                    <div :class="switchInputClassObject">
                        <input v-bind="switchInputBindings" @change="handleInputEvent"/>
                        <span
                            ref="input"
                            v-bind="switchSpanBindings"
                            @keydown.space.prevent="handleInputEvent"
                        />
                    </div>
                    <span :class="switchDescriptionClassObject">{{ getDescription }}</span>
                </div>
            </div>
        </div>
    </BaseFormControl>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightSwitch",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Boolean,
            default: false,
            required: false,
        },
        checked: {
            type: Boolean,
            default: false,
            required: false,
        },
        variant: {
            type: String,
            default: 'standard',
            required: false,
            validator: function(value) {
                return ['standard', 'alternative'].includes(value);
            },
        },
        descriptionTrue: {
            type: String,
            default: 'Yes',
            required: false,
        },
        descriptionFalse: {
            type: String,
            default: 'No',
            required: false,
        },
    },
    data() {
        //Check if BrightInputGroup is a parent component.
        let inputGroup = this.getComponent('BrightInputGroup');

        return {
            parentIsInputGroup: inputGroup !== null,
            inputValue: this.modelValue || this.checked,
        };
    },
    computed: {
        switchInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    checked: this.inputValue,
                    disabled: this.disabled,
                    tabindex: -1,
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'checkbox',
                    value: this.inputValue,
                },
            };
        },
        switchSpanBindings() {
            return {
                ...this.$attrs,
                ...{
                    id: this.id + '-Knob',
                    class: this.mergeClassObjectWithAttributeClass({}),
                    'aria-label': this.label,
                    'aria-checked': this.handleAriaChecked(),
                    'aria-disabled': this.disabled,
                    tabindex: 0,
                    role: 'switch',
                },
            };
        },
        switchContainerClassObject() {
            return {
                'BrightSwitch': true,
                'BrightSwitch__disabled': this.disabled,

                'BrightSwitch__container': true,

                'BrightSwitch__container--variant--standard': !this.variant || this.variant === 'standard',
                'BrightSwitch__container--variant--alternative': this.variant === 'alternative',
                'BrightSwitch__container--variant--danger': this.validationType === 'error',

                'BrightSwitch__container--size--large': this.size === 'large',
                'BrightSwitch__container--size--medium': !this.size || this.size === 'medium',
                'BrightSwitch__container--size--small': this.size === 'small',

                'BrightSwitch__container--parentIsInputGroup': this.parentIsInputGroup,

                'BaseFormControl__size--large--loose': !this.parentIsInputGroup && this.size === 'large' && this.formControl === 'loose',
                'BaseFormControl__size--large--comfortable': !this.parentIsInputGroup && this.size === 'large' && this.formControl === 'comfortable',
                'BaseFormControl__size--large--tight': !this.parentIsInputGroup && this.size === 'large' && this.formControl === 'tight',
                'BaseFormControl__size--large--none': !this.parentIsInputGroup && this.size === 'large' && this.formControl === 'none',

                'BaseFormControl__size--medium--loose': !this.parentIsInputGroup && (this.size !== 'large' && this.size !== 'small') && this.formControl === 'loose',
                'BaseFormControl__size--medium--comfortable': !this.parentIsInputGroup && (this.size !== 'large' && this.size !== 'small') && this.formControl === 'comfortable',
                'BaseFormControl__size--medium--tight': !this.parentIsInputGroup && (this.size !== 'large' && this.size !== 'small') && this.formControl === 'tight',
                'BaseFormControl__size--medium--none': !this.parentIsInputGroup && (this.size !== 'large' && this.size !== 'small') && this.formControl === 'none',

                'BaseFormControl__size--small--loose': !this.parentIsInputGroup && this.size === 'small' && this.formControl === 'loose',
                'BaseFormControl__size--small--comfortable': !this.parentIsInputGroup && this.size === 'small' && this.formControl === 'comfortable',
                'BaseFormControl__size--small--tight': !this.parentIsInputGroup && this.size === 'small' && this.formControl === 'tight',
                'BaseFormControl__size--small--none': !this.parentIsInputGroup && this.size === 'small' && this.formControl === 'none',
            };
        },
        switchWrapperClassObject() {
            return {
                'BrightSwitch__wrapper': true,

                'BrightSwitch__wrapper--size--large': this.size === 'large',
                'BrightSwitch__wrapper--size--medium': !this.size || this.size === 'medium',
                'BrightSwitch__wrapper--size--small': this.size === 'small',
            };
        },
        switchInputClassObject() {
            return {
                'BrightSwitch__input': true,

                'BrightSwitch__input--variant--standard': !this.variant || this.variant === 'standard',
                'BrightSwitch__input--variant--alternative': this.variant === 'alternative',
                'BrightSwitch__input--variant--danger': this.validationType === 'error',

                'BrightSwitch__input--size--large': this.size === 'large',
                'BrightSwitch__input--size--medium': !this.size || this.size === 'medium',
                'BrightSwitch__input--size--small': this.size === 'small',
            };
        },
        switchDescriptionClassObject() {
            return {
                'BrightSwitch__description': true,

                'BrightSwitch__description--size--large': this.size === 'large',
                'BrightSwitch__description--size--medium': !this.size || this.size === 'medium',
                'BrightSwitch__description--size--small': this.size === 'small',
            };
        },
        getDescription() {
            return this.inputValue ? this.descriptionTrue : this.descriptionFalse;
        },
    },
    watch: {
        modelValue(newValue) {
            this.inputValue = newValue;
        },
        checked(newValue) {
            this.inputValue = newValue;
        },
    },
    methods: {
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
        handleInputEvent() {
            if (!this.disabled) {
                this.inputValue = !this.inputValue;
                this.$emit('update:modelValue', this.inputValue);
            }
        },
        handleAriaChecked() {
            return "" + this.inputValue;
        },
    },
};

</script>

<style scoped>

</style>
