<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <input
            ref="input"
            v-model="inputValue"
            v-bind="numberInputBindings"
            inputmode="numeric"
            @blur="handleBlurEvent"
            @input="handleInputEvent"
            @keydown.delete="handleBackspacePressedEvent"
        >
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { nextTick } from "vue";
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightInputNumber",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [Number, String],
            required: false,
            default: '',
        },
        /** @override */
        decimal: {
            type: [Boolean, Number, String],
            required: false,
            default: false,
            validator(value) {
                return ['true', 'false', true, false].includes(value)
                    || typeof parseInt(value) === "number";
            },
        },
        percent: {
            type: Boolean,
            required: false,
            default: false,
        },
        negative: {
            type: Boolean,
            required: false,
            default: false,
        },
        shouldBeTypedAsNumber: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            inputValue: this.modelValue,
            isBackspacePressed: false,
            cursorPosition: 0,
        };
    },
    computed: {
        inputValueShouldBeTypedAsNumber() {
            return !this.percent && (!this.decimal || !this.negative) && this.shouldBeTypedAsNumber;
        },
        numberInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: this.inputValueShouldBeTypedAsNumber ? 'number' : 'text',
                    decimal: this.decimal,
                    value: this.inputValue,
                    inputValueRaw: this.getInputValueRaw(),
                },
            };
        },

        /*
             * The list of properties to watch.
             */
        propertiesToWatch() {
            return `${this.decimal}|${this.percent}|${this.negative}`;
        },
    },
    watch: {
        propertiesToWatch() {
            // Re-trigger to account for the new changes.
            this.parseInput(this.inputValue);
        },
        modelValue: function(newValue) {
            this.inputValue = newValue;
            this.repositionCursor();
        },
        inputValue: function(newValue) {
            this.parseInput(newValue);
        },
    },
    methods: {
        /**
             * Changes the input value to an acceptable number format.
             */
        parseInput(input) {
            if (typeof input === 'undefined') return;
            let newValue = (input !== null) ? input.toString() : "";
            let decimalPlaces = parseInt(this.decimal);
            let allowsNegativeNumber = this.negative;
            let allowsPercent = this.percent;
            let numbersAndDotOnlyRegex = /[^0-9.]+/g;
            let negativeNumberRegex = new RegExp("^-");
            let isNegativeNumber = negativeNumberRegex.test(newValue);

            // Remove all letters & special characters except for numbers & decimal.
            newValue = newValue.replace(numbersAndDotOnlyRegex, "");
            const cachedNewValue = newValue;

            if (this.decimal === false || decimalPlaces <= 0) {
                // No decimals allowed.
                if (isNaN(parseInt(newValue))) {
                    newValue = "";
                } else {
                    newValue = parseInt(newValue).toString();
                }
            } else if (this.decimal === true) {
                // Allow decimals with unlimited decimal precision.
                let decimalValue = newValue;
                const firstDecimalIndex = newValue.indexOf(".");
                if (firstDecimalIndex !== -1) {
                    const secondDecimalIndex = newValue.indexOf(".", firstDecimalIndex + 1);
                    if (secondDecimalIndex !== -1) {
                        if (newValue.length > secondDecimalIndex) {
                            decimalValue = decimalValue.substring(0, secondDecimalIndex);
                        }
                    }
                }
                newValue = decimalValue;
            } else {
                // Allow decimals with specified decimal precision.
                let decimalValue = newValue;
                const firstDecimalIndex = newValue.indexOf(".");
                if (firstDecimalIndex !== -1) {
                    const secondDecimalIndex = newValue.indexOf(".", firstDecimalIndex + 1);
                    if (secondDecimalIndex !== -1) {
                        if (newValue.length > secondDecimalIndex) {
                            decimalValue = decimalValue.substring(0, secondDecimalIndex);
                        }
                    }
                    if (decimalValue.length > firstDecimalIndex + decimalPlaces) {
                        decimalValue = decimalValue.substring(0, firstDecimalIndex + decimalPlaces + 1);
                    }
                }
                newValue = decimalValue;
            }

            // Prepend '-' for negative numbers.
            if (allowsNegativeNumber && isNegativeNumber) {
                newValue = '-' + newValue;
            }

            // Append '%' for percents.
            if (allowsPercent && !this.isBackspacePressed && newValue !== '') {
                newValue += '%';
            }

            this.isBackspacePressed = false;

            // Convert to integer if the input value should be numbers only.
            if (newValue && this.inputValueShouldBeTypedAsNumber) {
                newValue = parseFloat(newValue); // Will work for negatives, integers, and decimals.
                if (isNaN(newValue)) {
                    newValue = cachedNewValue;
                }
            }

            this.handleInput(newValue);
        },

        /**
             * Handles the actions taken when the input is out of focus.
             */
        handleBlurEvent() {
            if (this.inputValue === '' || this.inputValue === null || this.inputValue === undefined) return;

            // Append percent sign (if necessary).
            return this.percent && !this.inputValue.includes('%') ? this.inputValue += '%' : '';
        },

        handleInput(newValue) {
            this.inputValue = newValue;
            this.$emit('update:modelValue', newValue);
        },

        /**
             * Handles the actions taken during the input event.
             */
        handleInputEvent($event) {
            this.getCursorPosition($event);
        },

        /**
             * Detects when the 'Backspace' key is pressed.
             */
        handleBackspacePressedEvent() {
            return this.isBackspacePressed = true;
        },

        /**
             * Saves the cursor position when the input value is updated.
             */
        getCursorPosition($event) {
            if ($event === undefined) return;
            this.cursorPosition = $event.target.selectionEnd;
        },

        /**
             * Repositions the cursor in the input.
             */
        repositionCursor() {
            // Place cursor before the percent sign when input value is being changed.
            if (this.percent && this.inputValue.includes('%')) {
                let cursorPosition = this.cursorPosition;
                let end = this.inputValue.length - 1;
                let inputElement = this.$refs.input;

                if (cursorPosition === end || cursorPosition === this.inputValue.length) {
                    nextTick(() => {
                        inputElement.setSelectionRange(end, end);
                    });
                }
            }
        },
        getInputValueRaw() {
            if (this.inputValue !== undefined && typeof this.inputValue === 'string') {
                return this.inputValue.replace(/[^0-9.]/g, '');
            }
        },
    },
};
</script>
