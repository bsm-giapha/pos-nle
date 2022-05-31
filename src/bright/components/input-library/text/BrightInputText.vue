<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <input
            ref="input"
            v-bind="textInputBindings"
            @input="handleInput"
        />
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightInputText",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
        capitalize: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        textInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'text',
                    value: this.modelValue,
                },
            };
        },
    },
    methods: {
        handleInput(event) {
            let value = event.target.value;
            value = this.capitalizeWords(value);
            this.$emit('update:modelValue', value);
        },
        capitalizeWords(value) {
            if (!this.capitalize) return value;
            return value.replace(/\w\S*/g, (text) => {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        },
    },
};
</script>

<style scoped>

</style>
