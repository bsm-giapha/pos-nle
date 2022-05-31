<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <div class="flex">
            <input
                ref="input"
                v-bind="SSNInputBindings"
                v-model="ssnValue"
                autocomplete="off"
                @input="handleInput"
            />
            <BrightTooltip :text="helperText">
                <BrightButton
                    use="secondary"
                    class="flex-shrink ml-8"
                    :icon="(isShowingSSN) ? 'visibility_off' : 'visibility'"
                    icon-position="center"
                    :size="size"
                    :rounded="rounded"
                    :disabled="disabled"
                    :aria-label="helperText"
                    :show-loading-animation="showLoadingAnimation"
                    @click="handleShowHideSSN"
                    @keydown.space.enter.prevent="handleShowHideSSN"
                />
            </BrightTooltip>
        </div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";
import BrightTooltip from "Bright/components/overlay-library/BrightTooltip.vue";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";

export default {
    name: "BrightInputSocialSecurityNumber",
    components: {
        BrightTooltip,
        BrightButton,
    },
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        showLoadingAnimation: {
            type: Boolean,
            default: false,
            required: false,
        },
        modelValue: {
            type: [String, Number],
            required: false,
            default: '',
        },
    },
    emits: [
        'show-ssn',
        'hide-ssn',
    ],
    data() {
        return {
            isShowingSSN: false,
            rawNumericInput: '',
            inputValue: this.updateAndGetRawNumericValue(this.modelValue),
        };
    },
    computed: {
        ssnValue: {
            get: function(ssnInput) {

                // if the user inputs their own dash.
                if ((ssnInput.modelValue.length === 4 && ssnInput.modelValue[3] === '-') || (ssnInput.modelValue.length === 7 && ssnInput.modelValue[6] === '-')) {
                    return this.parseInput(ssnInput.modelValue);
                }

                if (this.inputValue) {
                    return this.parseInput(this.inputValue);
                }

                return '';
            },
            set: function(newValue) {

                if (newValue[newValue.length - 1] !== '-') {
                    this.inputValue = this.updateAndGetRawNumericValue(newValue);
                } else {
                    this.inputValue = this.rawNumericInput;
                }
            },
        },
        SSNInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'text',
                    value: this.ssnValue || this.inputValue,
                },
            };
        },
        helperText() {
            return (this.isShowingSSN) ? 'Hide' : 'Show';
        },
    },
    watch: {
        modelValue: {
            handler: function(value) {

                // if the user inputs their own dash.
                if ((value.length === 4 && value[3] === '-') || (value.length === 7 && value[6] === '-')) {
                    // if the user backspaced the number before a dash
                    if (this.rawNumericInput.length === 6) {
                        this.rawNumericInput = this.rawNumericInput.toString().substring(0, 5);
                    } else if (this.rawNumericInput.length === 4) {
                        this.rawNumericInput = this.rawNumericInput.toString().substring(0, 3);
                    }
                    return;
                }

                // if user enters anything other than a number or dash.
                if (this.inputValue.length < value.length) {
                    this.updateInput(this.inputValue);
                }
            },
        },
        inputValue: {
            handler: function(value) {
                this.updateInput(value);
            },
        },
    },
    methods: {
        handleInput(event) {
            let value = event.target.value;
            let notDashNumberOrDot = /[^-●\d]/;
            let replace = event.target.value.replace(notDashNumberOrDot, '');

            if (replace.length < value.length || value.length > 11 || value[value.length - 1] === '-') {
                this.$emit('update:modelValue', event.target.value);
            }
        },
        updateInput(value) {
            this.inputValue = value;
            this.$emit('update:modelValue', this.inputValue);
        },
        updateAndGetRawNumericValue(value) {

            if (!value) return '';

            let numberOnlyRegex = /[^0-9]+/g;
            let rawNumericInput = value.toString().replace(numberOnlyRegex, '');

            if (!this.rawNumericInput) {
                this.rawNumericInput = rawNumericInput;
                this.inputValue = this.rawNumericInput;
                return this.rawNumericInput;
            }

            if (this.isShowingSSN) {
                this.rawNumericInput = rawNumericInput;
                this.inputValue = this.rawNumericInput;
                if (this.rawNumericInput.length > 9) {
                    this.rawNumericInput = this.rawNumericInput.substring(0, 9);
                }
                return this.rawNumericInput;
            }

            let valueNoDashes = value.toString().replace('-', '');
            valueNoDashes = valueNoDashes.replace('-', '');

            let difference = this.rawNumericInput.length - valueNoDashes.length;

            // when hidden
            if (valueNoDashes[valueNoDashes.length - 1] !== '●' && valueNoDashes.length <= this.rawNumericInput.length && valueNoDashes.length > 1) { // if the user pasted over part of the input
                this.rawNumericInput = this.rawNumericInput.toString().substring(0, this.rawNumericInput.length - (difference + rawNumericInput.length)) + rawNumericInput;
            } else if (valueNoDashes.length === rawNumericInput.length) { // if the user pasted
                this.rawNumericInput = rawNumericInput;
            } else if (valueNoDashes.length === this.rawNumericInput.length) { // if the user backspaced on a dash
                return this.rawNumericInput;
            } else if (valueNoDashes.length < this.rawNumericInput.length) { // if the user backspaced
                this.rawNumericInput = this.rawNumericInput.toString().substring(0, this.rawNumericInput.length - difference);
            } else {
                this.rawNumericInput = (this.rawNumericInput === false) ? rawNumericInput : `${this.rawNumericInput}${rawNumericInput}`;
            }

            if (this.rawNumericInput.length > 9) {
                this.rawNumericInput = this.rawNumericInput.substring(0, 9);
            }

            this.inputValue = this.rawNumericInput;
            return this.rawNumericInput;
        },
        parseInput(input) {

            if (input === undefined || input === '') { return; }

            let numberOnlyRegex = /[^0-9]+/g;

            let rawNumericInput;
            if (this.isShowingSSN && input[input.length - 1] !== '-') {
                rawNumericInput = input.toString().replace(numberOnlyRegex, '');
                rawNumericInput = rawNumericInput ? rawNumericInput : '';
                this.rawNumericInput = rawNumericInput;
            }

            if (this.isShowingSSN) {
                return this.formatShowingSSN(rawNumericInput, input);
            } else {
                return this.formatHiddenSSN(input);
            }
        },
        formatShowingSSN(rawNumericInput, input) {

            let shouldAddDash = false;
            if (input[input.length - 1] === '-' && !input.includes('●')) {
                return input;
            } else if (input[input.length - 1] === '-' && input.includes('●')) {
                rawNumericInput = this.rawNumericInput;
                shouldAddDash = true;
            }

            let parsedInput = "";
            if (rawNumericInput.length <= 3) {
                parsedInput = rawNumericInput;
            }

            if (rawNumericInput.length <= 5 && rawNumericInput.length > 3) {
                let first = rawNumericInput.substring(0, 3);
                let second = rawNumericInput.substring(3);
                if (rawNumericInput.length === 5) {
                    parsedInput = `${first}-${second}`;
                } else {
                    parsedInput = `${first}-${second}`;
                }
            }

            if (rawNumericInput.length > 5) {
                let first = rawNumericInput.substring(0, 3);
                let second = rawNumericInput.substring(3, 5);
                let third = rawNumericInput.substring(5, 9);
                parsedInput = `${first}-${second}-${third}`;
            }

            if (shouldAddDash) {
                parsedInput += '-';
            }

            return parsedInput;
        },
        formatHiddenSSN(input) {

            if (input[input.length - 1] === '-') {
                return input;
            }

            let parsedInput = '';

            if (input.length <= 3) {
                for (let i = 0; i < input.length; i++) {
                    parsedInput += '●';
                }
            }

            if (input.length <= 5 && input.length > 3) {
                let second = input.substring(3);
                if (input.length === 5) {
                    parsedInput = '●●●-●●';
                } else {
                    let secondDots = '';
                    for (let i = 0; i < second.length; i++) {
                        secondDots += '●';
                    }
                    parsedInput = `●●●-${secondDots}`;
                }
            }

            if (input.length > 5) {
                let end = input.substring(5, 9);
                let endDots = '';
                for (let i = 0; i < end.length; i++) {
                    endDots += '●';
                }
                parsedInput = `●●●-●●-${endDots}`;
            }

            return parsedInput;
        },
        handleShowHideSSN() {

            this.isShowingSSN = !this.isShowingSSN;

            if (this.isShowingSSN) {
                this.$emit("show-ssn");
            } else {
                this.$emit("hide-ssn");
            }

        },
        forceShowSSN() {
            this.isShowingSSN = true;
        },
        forceHideSSN() {
            this.isShowingSSN = false;
        },
    },
};
</script>
