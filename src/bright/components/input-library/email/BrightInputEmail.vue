<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <input
            ref="input"
            v-bind="emailInputBindings"
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
    name: "BrightInputEmail",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
        /** @override */
        autocomplete: {
            type: String,
            required: false,
            default: 'email',
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        emailInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    autocomplete: this.autocomplete,
                    multiple: this.multiple,
                    type: 'text',
                    value: this.modelValue,
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
