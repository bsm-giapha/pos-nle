<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <div>
            <input
                ref="input"
                v-model="moneyValue"
                v-bind="moneyInputBindings"
                inputmode="decimal"
                @blur="handleOnFocusOut"
                @input="handleInput"
            />
        </div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";

export default {
    name: "BrightInputMoney",
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
        decimal: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            inputValue: this.modelValue ? this.formatForBackend(this.modelValue) : '',
        };
    },
    computed: {
        moneyValue: {
            get: function() {
                if (this.inputValue) {
                    return this.parseInput(this.inputValue);
                }

                return '';
            },
            set: function(newValue) {
                this.inputValue = this.formatForBackend(newValue);
            },
        },
        moneyInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'text',
                    decimal: this.decimal,
                    value: this.moneyValue,
                    inputValueRaw: this.getInputValueRaw(),
                },
            };
        },
    },
    methods: {
        getInputValueRaw() {
            if (this.inputValue !== undefined && typeof this.inputValue === 'string') {
                return this.inputValue.replace(/[^0-9.]/g, '');
            }
        },

        parseInput(input) {
            let newValue = (input !== null) ? input.toString() : "";
            if (newValue === '') {
                return '';
            }

            // Do not allow numbers to begin with '0', unless it's a decimal number.
            if (newValue.length > 2 && newValue.startsWith('$0') && !newValue.includes('.')) {
                let index = newValue.indexOf('0');
                if (index === 1) {
                    let newValueStart = newValue.slice(0, index);
                    let newValueEnd = newValue.slice(index + newValueStart.length);
                    newValue = newValueStart + newValueEnd;
                }

            } else if (newValue.startsWith('0') && newValue.length >= 2 && !newValue.includes('.')) {
                let index = newValue.indexOf('0');
                if (index === 0) {
                    newValue = newValue.slice(index + 1);
                }
            }

            let numbersAndDotOnlyRegex = /[^0-9.]+/g;
            newValue = newValue.replace(numbersAndDotOnlyRegex, '');

            if (this.decimal === false && isNaN(parseInt(newValue))) {
                if (newValue.includes('.')) {
                    // Do not allow decimal points.
                    newValue = newValue.replace(/\./g, '');
                } else {
                    newValue = "";
                }
            } else if (this.decimal === false) {
                // Do not allow decimal points at all.
                if (newValue.includes('.')) {
                    newValue = newValue.replace(/\./g, '');
                }

                // Add commas, if applicable.
                newValue = parseInt(newValue).toString();
                newValue = this.formatWithCommas(newValue);

            } else if (this.decimal === true) {
                // Always prepend decimal number with '0.'
                if (newValue === '.') {
                    newValue = '0.';
                }

                // If numbers have already been typed into the input, do not allow user to edit & add a decimal to the beginning of numbers
                if (newValue.length > 1 && newValue.startsWith('.')) {
                    newValue = newValue.replace('.', '');
                }

                // Do not allow more than 1 decimal point
                if (newValue.match(/\./gi) !== null && newValue.match(/\./gi).length > 1) {
                    if (newValue.includes('..')) {
                        let index = newValue.lastIndexOf('.');
                        newValue = newValue.slice(0, index);
                    } else {
                        // Do not allow more decimals to be placed if decimal point already exists in number.
                        let index = newValue.indexOf('.');
                        let newValueStart = newValue.slice(0, index);
                        let newValueEnd = newValue.slice(index + 1);
                        let newValueTemp = newValueStart + newValueEnd;

                        if (newValueTemp.split('.')[1] === '') {
                            // Do not allow more decimals to be added after the existing decimal point.
                            newValue = newValue.replace(/\.+$/g, '');
                        } else {
                            // Do not allow more decimals to be added before the existing decimal point.
                            newValue = newValueTemp;
                        }
                    }
                }

                // Handle adding commas to decimal numbers & whole numbers.
                let decimalValue = newValue;
                if (decimalValue.toString().match(/^-?\d+(?:\.\d{0,2})?/) !== null) {
                    // Save digits after decimal point.
                    decimalValue = decimalValue.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0].split('.')[1];

                    // Truncate newValue & apply correct commas.
                    let newValueTruncated = parseInt(Math.trunc(newValue)).toString();
                    newValueTruncated = this.formatWithCommas(newValueTruncated);

                    // Determine if number is a decimal number or a whole number.
                    if (decimalValue !== undefined) {
                        // Concatenate newValueTruncated & decimalValue to save newValue.
                        newValue = newValueTruncated + '.' + decimalValue;
                    } else {
                        // Add commas, if applicable.
                        newValue = this.formatWithCommas(newValue);
                    }
                }
            }
            // Ensure the inputValue always begins with a '$'.
            newValue = newValue.startsWith('$') ? newValue : '$' + newValue;

            return newValue;
        },

        handleInput(newValue) {
            this.$emit('update:modelValue', this.getInputValueRaw(newValue));
        },

        /**
         * Formats inputValue correctly after focus is removed from input.
         */
        handleOnFocusOut() {
            if (this.decimal === true) {
                this.inputValue = this.setDecimalValueOnFocusOut();
            } else if (this.inputValue === '$') {
                this.inputValue += '0';
            }
        },

        /**
         * Sets the decimal number correctly after focus is removed from input.
         * Example: 1.2 ==> 1.20
         *
         * @returns {string}
         */
        setDecimalValueOnFocusOut() {
            // Return if input is empty in order to accept blank values in input
            if (this.inputValue === '') {
                return '';
            }
            // Empty inputs must always show a 0 value.
            if (this.inputValue === '$') {
                return this.inputValue += '0.00';
            }
            let inputValue = String(this.inputValue);
            let inputValueWithoutDollarSign = inputValue.replace('$', '');

            // If commas exist, remove them in order to prepare for allowing a decimal precision of 2.
            if (inputValueWithoutDollarSign.indexOf(',') > -1) {
                inputValueWithoutDollarSign = inputValueWithoutDollarSign.replace(/,/g, '');
            }

            // Only allow inputValue to have a decimal precision of 2.
            inputValueWithoutDollarSign = parseFloat(inputValueWithoutDollarSign).toFixed(2);

            // Apply commas again, if applicable.
            inputValueWithoutDollarSign = this.formatWithCommas(inputValueWithoutDollarSign);

            // Prepend $ again to inputValue.
            return '$' + inputValueWithoutDollarSign;
        },

        /**
         * Formats the number with commas.
         *
         * @param number {string}
         * @returns {string}
         */
        formatWithCommas(number) {
            return number.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
        },

        /**
         * Formats the number and strips $ and commas to prepare for sending to the backend
         *
         * @param amount {string, number}
         * @returns {string}
         */
        formatForBackend(amount) {
            amount = String(amount).replace(/([$,])/gi, "");
            if (!this.decimal && isNaN(parseInt(amount))) {
                if (amount.includes('.')) {
                    amount = amount.slice(0, amount.indexOf('.'));
                }
            }
            return amount;
        },
    },
};
</script>

<style scoped>

</style>
