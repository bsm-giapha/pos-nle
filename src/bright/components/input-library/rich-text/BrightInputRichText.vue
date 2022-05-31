<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <input
            ref="input"
            v-bind="hiddenInputBindings"
            name="content"
            @input="handleInput"
        >
        <component
            v-bind="richTextInputBindings"
            :is="'trix-editor'"
            v-show="!disabled && !readonly"
            @trix-change="handleInput"
        >
        </component>
        <div v-show="disabled || readonly" v-html="modelValue"></div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>

import { BrightInputMixin } from "../../../mixins/inputs/BrightInputMixin.js";
import { InputStandardStyleMixin } from "../../../mixins/inputs/styles/InputStandardStyleMixin.js";
import "trix/dist/trix.js";

export default {
    name: "BrightInputRichText",
    components: {},
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        richTextInputBindings() {
            return {
                ...{
                    disabled: this.disabled,
                    id: this.id,
                    'aria-label': this.label,
                    required: !this.optional,
                    readonly: this.readonly,
                },
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'text',
                    input: this.id,
                    id: 'richTextEditor',
                },
            };
        },
        hiddenInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    type: 'hidden',
                    value: this.modelValue,
                },
            };
        },
    },
    methods: {
        handleInput(event) {
            if (!this.disabled && !this.readonly) {
                this.$emit('update:modelValue', event.target.value);
            }
        },
    },
};
</script>
