<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <input
            ref="input"
            v-bind="phoneNumberInputBindings"
            v-model="inputValue"
            @blur="forceFormatPhoneNumber()"
        />
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { nextTick } from "vue";
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightInputPhoneNumber",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            inputValue: this.modelValue,
            cachedRawNumericInput: false,
            formattedInput: false,
        };
    },
    computed: {
        phoneNumberInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'tel',
                    value: this.inputValue,
                    inputValueRaw: this.getInputValueRaw(),
                },
            };
        },
    },
    watch: {
        modelValue: {
            handler: function(value) {
                this.parseInput(value);
            },
        },
        inputValue: {
            handler: function(value) {
                this.parseInput(value);
            },
        },
    },
    methods: {
        getInputValueRaw() {
            if (this.inputValue !== undefined && typeof this.inputValue === 'string') {
                return this.inputValue.replace(/[^0-9.]/g, '');
            }
        },
        updateInput(value) {
            this.inputValue = value;
            this.$emit('update:modelValue', this.inputValue);
        },
        parseInput(input) {
            // If input is undefined or the same value that was just formatted.
            if (input === undefined || input === this.formattedInput || input === '') { return; }

            // Get rid of things that we're not looking for
            let notParenthesesDashNumberOrSpace = /[^()-\d\s]/;
            input = input.toString().replace(notParenthesesDashNumberOrSpace, '');

            let numberOnlyRegex = /[^0-9]+/g;
            let rawNumericInput = input.toString().replace(numberOnlyRegex, '');

            // Backspace: Always allow the user to remove characters
            if (rawNumericInput.length < this.cachedRawNumericInput.length) {
                this.updateInput(input);
                this.cachedRawNumericInput = rawNumericInput;
                this.formatPhoneNumber(rawNumericInput);
                return;
            }

            // For when people input their own parentheses
            if ((input.length === 1 && input[0] === "(") || (input.length === 5 && input[4] === ")")) {
                this.updateInput(input);
                this.cachedRawNumericInput = rawNumericInput;
                return;
            }

            // If the user entered anything that wasn't a "(" or number, empty out the input
            if (rawNumericInput.length === 0) {
                this.updateInput("");
                this.cachedRawNumericInput = rawNumericInput;
                return;
            }

            // If there's no numeric difference, then do nothing
            if (rawNumericInput === this.cachedRawNumericInput) {
                this.updateInput(input);
                return;
            }

            // If it got this far, then we need to format it.
            this.formatPhoneNumber(rawNumericInput);
        },
        forceFormatPhoneNumber() {
            let numberOnlyRegex = /[^0-9]+/g;
            let rawNumericInput = this.inputValue.toString().replace(numberOnlyRegex, '');
            this.formatPhoneNumber(rawNumericInput);
        },
        formatPhoneNumber(rawNumericInput) {
            let parsedInput = "";
            this.cachedRawNumericInput = rawNumericInput;

            // Format the Phone Number correctly based on the number of numbers that the user typed in
            if (rawNumericInput.length >= 1 && rawNumericInput.length <= 3) {
                parsedInput = formatFirstNumberBlock(rawNumericInput);
                if (rawNumericInput < 3) {
                    nextTick(() => { // Adjust the cursor so that the auto-parentheses feel more natural
                        this.$refs.input.setSelectionRange(rawNumericInput.length + 1, rawNumericInput.length + 1);
                    });
                }
            } else if (rawNumericInput.length >= 4 && rawNumericInput.length <= 6) {
                parsedInput = formatSecondNumberBlock(rawNumericInput);
            } else if (rawNumericInput.length >= 7) {
                parsedInput = formatSecondNumberBlock(rawNumericInput.substring(0, 6)) + "-" + rawNumericInput.substring(6, 10);
            }

            if (parsedInput.length > 0 && this.inputValue !== parsedInput) {
                this.formattedInput = parsedInput;
                this.updateInput(parsedInput);
            }

            function formatFirstNumberBlock(number) {
                if (number.length === 3) {
                    return "(" + number + ")";
                } else {
                    return "(" + number;
                }
            }
            function formatSecondNumberBlock(number) {
                return formatFirstNumberBlock(number.substring(0, 3)) + " " + number.substring(3, 6);
            }
        },
    },
};
</script>

<style scoped>

</style>
