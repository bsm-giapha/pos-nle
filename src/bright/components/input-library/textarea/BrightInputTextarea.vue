<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <textarea
            ref="input"
            v-bind="textareaInputBindings"
            @input="handleInput"
        ></textarea>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightInputTextarea",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
        resize: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        textareaInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputTextareaStyleClassObject),
                    value: this.modelValue,
                },
            };
        },
        inputTextareaStyleClassObject() {
            return {
                ...this.inputStandardStyleClassObject,
                ...{
                    'block': true,
                    'resize-none': this.resize === false || !this.resize,
                },
            };
        },
    },
    methods: {
        handleInput(event) {
            let value = event.target.value;
            this.$emit('update:modelValue', value);
        },
    },
};
</script>

<style scoped>

</style>
