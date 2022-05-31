<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <flat-pickr
            ref="input"
            v-model="inputValue"
            v-bind="dateInputBindings"
            @on-open="handleOnOpen"
            @update:modelValue="handleInput"
        />
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { nextTick } from "vue";
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    name: "BrightInputDate",
    components: { flatPickr },
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
        defaultValue: {
            type: String,
            required: false,
            default: null,
        },
        enableTime: {
            type: Boolean,
            required: false,
            default: false,
        },
        format: {
            type: String,
            required: false,
            default: 'm/d/Y',
        },
        hideCalendar: {
            type: Boolean,
            required: false,
            default: false,
        },
        inline: {
            type: Boolean,
            required: false,
            default: false,
        },
        maxValue: {
            type: String,
            required: false,
            default: null,
        },
        minValue: {
            type: String,
            required: false,
            default: null,
        },
        mode: {
            type: String,
            required: false,
            default: 'single',
            validator(value) {
                return ['single', 'range', 'multiple'].includes(value);
            },
        },
        monthSelectorType: {
            type: String,
            required: false,
            default: 'dropdown',
            validator(value) {
                return ['dropdown', 'static'].includes(value);
            },
        },
        shorthandMonths: {
            type: Boolean,
            required: false,
            default: false,
        },
        startingHour: {
            type: String,
            required: false,
            default: "12",
        },
        startingMinute: {
            type: String,
            required: false,
            default: "00",
        },
    },
    data() {
        return {
            inputValue: this.defaultValue ?? "",
            shouldAllowInput: true,
        };
    },
    computed: {
        dateInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    config: {
                        altInput: true, // Keep this TRUE in order to enable keyboard accessibility for the calendar and time pickers.
                        altFormat: this.format, // This is the input that is shown to the user. Its value will default to the this.format value.
                        allowInput: this.shouldAllowInput,
                        dateFormat: this.format,
                        defaultDate: this.defaultValue,
                        defaultHour: this.startingHour,
                        defaultMinute: this.startingMinute,
                        disableMobile: true, // Keep this TRUE to continue using flat-pickr on mobile devices and not the native datetime mobile selection.
                        enableTime: this.enableTime,
                        inline: this.inline,
                        maxDate: this.maxValue,
                        minDate: this.minValue,
                        mode: this.mode,
                        monthSelectorType: this.monthSelectorType,
                        noCalendar: this.hideCalendar,
                        shorthandCurrentMonth: this.shorthandMonths,
                    },
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: 'text',
                },
            };
        },

        elementWithIDVerbiage() {
            return 'Element with id="' + this.id + '": ';
        },

        isDateInput() {
            return !this.enableTime && !this.hideCalendar;
        },

        isTimeInput() {
            return this.enableTime && this.hideCalendar;
        },

        isDateTimeInput() {
            return this.enableTime;
        },

        isSingleMode() {
            return this.mode === 'single';
        },

        isRangeMode() {
            return this.mode === 'range';
        },
    },
    watch: {
        $props: {
            immediate: true,
            handler() {
                this.validateProps();
            },
        },

        size: function() {
            this.applySizeClasses();
        },

        validationType: function() {
            this.applyValidationClasses();
        },

        modelValue: function(newValue) {
            this.inputValue = newValue;
        },
    },
    methods: {
        handleInput(event) {
            this.$emit('update:modelValue', event);
        },

        validateProps() {
            this.validateTimeAndDateTimeInputs();
            this.validateMode();
        },

        validateTimeAndDateTimeInputs() {
            if (!this.isDateInput && !this.isRangeMode && this.format === 'm/d/Y') {
                const inputType = this.isTimeInput ? 'Time' : 'Date & Time';
                console.error(this.elementWithIDVerbiage + inputType + ' Inputs in `' + this.mode + '-mode` require the `format` property');
            }
        },

        validateMode() {
            if (this.isTimeInput && !this.isSingleMode) {
                console.error(this.elementWithIDVerbiage + 'Time Inputs do not support the `' + this.mode + '` mode.');
            }
        },

        /**
         * Applies the same classes to the input that's visible to the user.
         */
        applyInputClasses() {
            nextTick(() => {
                const inputHiddenFromUsersClassList = this.$refs.input.$el.classList;
                const inputVisibleToUsers = this.$refs.input.$el.nextSibling;

                inputVisibleToUsers.className = "";
                inputVisibleToUsers.classList.add(...inputHiddenFromUsersClassList);
            });
        },

        applySizeClasses() {
            this.applyInputClasses();
        },

        applyValidationClasses() {
            this.applyInputClasses();
        },

        handleOnOpen() {
            this.shouldAllowInput = false;
        },
    },
};
</script>

<style scoped>

</style>
