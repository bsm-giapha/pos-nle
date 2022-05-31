<template>
    <BaseFormControl v-bind="getFormControlProps" :form-control="parentIsInputGroup ? 'none' : 'comfortable'">
        <div :class="checkboxContainerClassObject">
            <div class="flex flex-row">
                <div class="inline-block">
                    <div :class="checkboxWrapperClassObject">
                        <input v-bind="checkboxInputBindings" @change="handleInputEvent"/>
                        <span
                            ref="input"
                            v-bind="checkboxSpanBindings"
                            @click="handleInputEvent"
                            @keydown.space.prevent
                            @keydown.space="handleInputEvent"
                        ></span>
                    </div>
                </div>
                <div class="inline-block" @click.prevent="handleInputEvent">
                    <BaseLabel v-bind="getLabelProps"/>
                    <BaseInputValidation v-bind="getInputValidationProps"/>
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
    name: "BrightCheckbox",
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
    },
    data() {
        //Check if a parent component is setting the disabled property
        let inputGroup = this.getComponent('BrightInputGroup');
        let inputGroupDisabledValue = false;

        if (inputGroup !== null) {
            inputGroupDisabledValue = inputGroup.disabled;
        }

        return {
            parentIsInputGroup: inputGroup !== null,
            disabledValue: inputGroupDisabledValue || this.disabled,
            inputValue: this.modelValue || this.checked,
        };
    },
    computed: {
        checkboxInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    checked: this.inputValue,
                    disabled: this.disabled,
                    tabindex: -1,
                    type: 'checkbox',
                    value: this.inputValue,
                },
            };
        },
        checkboxSpanBindings() {
            return {
                ...this.$attrs,
                ...{
                    id: this.id + '-Box',
                    class: this.mergeClassObjectWithAttributeClass({}),
                    role: 'checkbox',
                    'aria-label': this.label,
                    'aria-checked': this.handleAriaChecked(),
                    'aria-disabled': this.disabled,
                    tabindex: 0,
                },
            };
        },
        checkboxContainerClassObject() {
            return {
                'BrightCheckbox': true,
                'BrightCheckbox__container': true,

                'BrightCheckbox__container--variant--standard': !this.variant || this.variant === 'standard',
                'BrightCheckbox__container--variant--alternative': this.variant === 'alternative',
                'BrightCheckbox__container--variant--danger': this.validationType === 'error',

                'BrightCheckbox__container--size--large': this.size === 'large',
                'BrightCheckbox__container--size--medium': !this.size || this.size === 'medium',
                'BrightCheckbox__container--size--small': this.size === 'small',

                'BrightCheckbox__container--parentIsInputGroup': this.parentIsInputGroup,
            };
        },
        checkboxWrapperClassObject() {
            return {
                'BrightCheckbox__wrapper': true,

                'BrightCheckbox__wrapper--variant--standard': !this.variant || this.variant === 'standard',
                'BrightCheckbox__wrapper--variant--alternative': this.variant === 'alternative',
                'BrightCheckbox__wrapper--variant--danger': this.validationType === 'error',

                'BrightCheckbox__wrapper--size--large': this.size === 'large',
                'BrightCheckbox__wrapper--size--medium': !this.size || this.size === 'medium',
                'BrightCheckbox__wrapper--size--small': this.size === 'small',
            };
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
