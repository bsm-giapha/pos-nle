<template>
    <BrightInputGroup v-bind="inputGroupBindings">
        <BaseRadioButton
            v-for="option in optionsValue"
            :ref="option.id"
            :key="option.id"
            v-bind="getIteratorBindings(option)"
            @update:checked="handleChecked"
        />
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BrightInputGroup>
</template>

<script>
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import BrightInputGroup from "Bright/components/input-library/input-group/BrightInputGroup.vue";
import BaseRadioButton from "Bright/components/input-library/radio-group/BaseRadioButton.vue";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "BrightRadioGroup",
    components: {
        BrightInputGroup,
        BaseRadioButton,
    },
    mixins: [BrightInputMixin],
    inheritAttrs: true,
    props: {
        options: {
            type: Array,
            required: true,
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
        return {
            optionsValue: _cloneDeep(this.options),
        };
    },
    computed: {
        inputGroupBindings() {
            return {
                id: this.id,
                size: this.size,
                label: this.label,
                subLabel: this.subLabel,
                optional: this.optional,
                hideMetaLabel: this.hideMetaLabel, //This makes sure that the input group behaves the way this radio group does
                disabled: this.disabled,
                hideLabel: this.hideLabel,
                hideSubLabel: this.hideSubLabel,
                formControl: this.formControl,
                class: this.mergeClassObjectWithAttributeClass({}),
            };
        },
    },
    watch: {
        options: {
            deep: true,
            handler: function(newValue) {
                this.optionsValue = _cloneDeep(newValue);
            },
        },
    },
    methods: {
        getIteratorBindings(option) {
            return {
                checked: option.checked === true || option.checked === 'true' || option.value === this.selected,
                disabled: (this.disabled === true || this.disabled === 'true') ? true : (option.disabled === true || option.disabled === 'true'),
                formControl: this.formControl,
                id: option.id ? option.id : `${this.id}-${option.value}-Button`,
                label: option.label,
                name: (this.name) ? this.name : this.id,
                optional: this.optional,
                size: this.size,
                subLabel: option.subLabel,
                value: (option.value !== undefined) ? option.value : option.id,
                variant: this.variant,
                validationType: this.validationType,
            };
        },
        handleChecked(value) {
            this.$emit('update:modelValue', value);
        },
    },
};
</script>

<style scoped>

</style>
