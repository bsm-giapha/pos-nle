<template>
    <BrightInputGroup v-bind="inputGroupBindings">
        <BrightGrid>
            <BrightRow v-if="includeCountry" gutters="none">
                <BrightColumn v-bind="countryColumnBindings">
                    <BrightInputText
                        ref="countryInput"
                        v-bind="countryInputBindings"
                        v-model="inputValue.country"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow gutters="none">
                <BrightColumn v-bind="streetAddress1ColumnBindings">
                    <BrightInputText
                        ref="streetAddress1Input"
                        v-bind="streetAddress1InputBindings"
                        v-model="inputValue.streetAddress1"
                    />
                </BrightColumn>
                <BrightColumn v-show="includeStreetAddress2" v-bind="streetAddress2ColumnBindings">
                    <BrightInputText
                        ref="streetAddress2Input"
                        v-bind="streetAddress2InputBindings"
                        v-model="inputValue.streetAddress2"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow gutters="none">
                <BrightColumn v-bind="cityColumnBindings">
                    <BrightInputText
                        ref="cityInput"
                        v-bind="cityInputBindings"
                        v-model="inputValue.city"
                    />
                </BrightColumn>
                <BrightColumn v-bind="stateColumnBindings">
                    <BrightInputState
                        v-if="!includeCountry"
                        ref="stateDropdown"
                        v-bind="stateDropdownSelectBindings"
                        v-model="inputValue.state"
                    />
                    <BrightInputText
                        v-else
                        ref="stateInput"
                        v-bind="stateInputBindings"
                        v-model="inputValue.state"
                    />
                </BrightColumn>
                <BrightColumn v-bind="zipColumnBindings">
                    <BrightInputNumber
                        ref="zipInput"
                        v-bind="zipInputBindings"
                        v-model="inputValue.zip"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </BrightInputGroup>
</template>

<script>
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";
import BrightGrid from "Bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "Bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "Bright/components/layout-library/grid/BrightColumn.vue";
import BrightInputGroup from "Bright/components/input-library/input-group/BrightInputGroup.vue";
import BrightInputText from "Bright/components/input-library/text/BrightInputText.vue";
import BrightInputNumber from "Bright/components/input-library/number/BrightInputNumber.vue";
import BrightInputState from "Bright/components/input-library/state/BrightInputState.vue";

export default {
    name: "BrightInputAddress",
    components: {
        BrightInputState,
        BrightGrid,
        BrightRow,
        BrightColumn,
        BrightInputGroup,
        BrightInputText,
        BrightInputNumber,
    },
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: true,
    props: {
        modelValue: {
            type: Object,
            default: () => {},
            required: false,
        },
        includeCountry: {
            type: Boolean,
            default: false,
            required: false,
        },
        includeStreetAddress2: {
            type: Boolean,
            default: true,
            required: false,
        },
        errorMessages: {
            type: Object,
            default: () => {},
            required: false,
        },
    },
    data() {
        return {
            inputValue: {
                country: this.getInputValue('country'),
                streetAddress1: this.getInputValue('streetAddress1'),
                streetAddress2: this.getInputValue('streetAddress2'),
                city: this.getInputValue('city'),
                state: this.getInputValue('state'),
                zip: this.getInputValue('zip'),
            },
        };
    },
    computed: {
        inputGroupBindings() {
            return {
                label: this.label,
                subLabel: this.subLabel,
                formControl: this.formControl,
                hideLabel: this.hideLabel,
                hideSubLabel: this.hideSubLabel,
                disabled: this.disabled,
                optional: this.optional,
                size: this.size,
                class: "BrightInputAddress",
            };
        },
        countryColumnBindings() {
            return {
                mobile: "12",
                tablet: "7",
                desktop: "4",
                class: "BrightInputAddress__country",
            };
        },
        countryInputBindings() {
            return {
                id: this.id + "Country",
                label: "Country",
                rounded: this.rounded,
                hideMetaLabel: this.optional,
                readonly: this.readonly,
                size: this.size,
                disabled: this.disabled,
                capitalize: true,
                value: this.inputValue.country,
                validationType: this.errorMessages && this.errorMessages['country'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['country'] ? this.errorMessages['country'] : '',
            };
        },
        streetAddress1ColumnBindings() {
            return {
                mobile: "12",
                tablet: this.includeStreetAddress2 ? "7" : "9",
                desktop: this.includeStreetAddress2 ? "8" : "9",
                class: "BrightInputAddress__streetAddress1",
            };
        },
        streetAddress1InputBindings() {
            return {
                id: this.id + "StreetAddress1",
                label: "Street Address 1",
                rounded: this.rounded,
                readonly: this.readonly,
                hideMetaLabel: this.optional,
                size: this.size,
                disabled: this.disabled,
                capitalize: true,
                value: this.inputValue.streetAddress1,
                validationType: this.errorMessages && this.errorMessages['streetAddress1'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['streetAddress1'] ? this.errorMessages['streetAddress1'] : '',
            };
        },
        streetAddress2ColumnBindings() {
            return {
                mobile: "12",
                tablet: "5",
                desktop: "4",
                class: "BrightInputAddress__streetAddress2",
            };
        },
        streetAddress2InputBindings() {
            return {
                id: this.id + "StreetAddress2",
                label: "Street Address 2",
                placeholder: "e.g. Apt/Unit #",
                rounded: this.rounded,
                readonly: this.readonly,
                hideMetaLabel: this.optional,
                optional: true,
                size: this.size,
                disabled: this.disabled,
                capitalize: true,
                value: this.inputValue.streetAddress2,
                validationType: this.errorMessages && this.errorMessages['streetAddress2'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['streetAddress2'] ? this.errorMessages['streetAddress2'] : '',
            };
        },
        cityColumnBindings() {
            return {
                mobile: "12",
                tablet: "6",
                class: "BrightInputAddress__city",
            };
        },
        cityInputBindings() {
            return {
                id: this.id + "City",
                label: "City",
                rounded: this.rounded,
                readonly: this.readonly,
                hideMetaLabel: this.optional,
                size: this.size,
                disabled: this.disabled,
                capitalize: true,
                value: this.inputValue.city,
                validationType: this.errorMessages && this.errorMessages['city'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['city'] ? this.errorMessages['city'] : '',
            };
        },
        stateColumnBindings() {
            return {
                mobile: "6",
                tablet: "3",
                class: "BrightInputAddress__state",
            };
        },
        stateDropdownSelectBindings() {
            return {
                id: this.id + "State",
                label: "State",
                'menu-full-width': true,
                searchable: true,
                rounded: this.rounded,
                readonly: this.readonly,
                hideMetaLabel: this.optional,
                size: this.size,
                disabled: this.disabled,
                value: this.inputValue.state,
                validationType: this.errorMessages && this.errorMessages['state'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['state'] ? this.errorMessages['state'] : '',
            };
        },
        stateInputBindings() {
            return {
                id: this.id + "State",
                label: "State",
                rounded: this.rounded,
                readonly: this.readonly,
                hideMetaLabel: this.optional,
                size: this.size,
                disabled: this.disabled,
                capitalize: true,
                value: this.inputValue.state,
                validationType: this.errorMessages && this.errorMessages['state'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['state'] ? this.errorMessages['state'] : '',
            };
        },
        zipColumnBindings() {
            return {
                mobile: "6",
                tablet: "3",
                class: "BrightInputAddress__zip",
            };
        },
        zipInputBindings() {
            return {
                id: this.id + "Zip",
                label: "ZIP/Postal Code",
                rounded: this.rounded,
                readonly: this.readonly,
                hideMetaLabel: this.optional,
                size: this.size,
                disabled: this.disabled,
                value: this.inputValue.zip,
                validationType: this.errorMessages && this.errorMessages['zip'] ? 'error' : 'none',
                validationMessage: this.errorMessages && this.errorMessages['zip'] ? this.errorMessages['zip'] : '',
                shouldBeTypedAsNumber: false,
            };
        },
    },
    watch: {
        modelValue: {
            deep: true,
            handler(newInputValueObject) {
                this.inputValue.country = newInputValueObject.country ?? '';
                this.inputValue.streetAddress1 = newInputValueObject.streetAddress1;
                this.inputValue.streetAddress2 = newInputValueObject.streetAddress2;
                this.inputValue.city = newInputValueObject.city;
                this.inputValue.state = newInputValueObject.state;
                this.inputValue.zip = newInputValueObject.zip;
            },
        },
        inputValue: {
            deep: true,
            handler() {
                //Emit event that will output the Address input value in an object.
                this.$emit('update:modelValue', this.inputValue);
            },
        },
    },
    methods: {
        getInputValue(inputName) {
            if (this.modelValue && this.modelValue[inputName]) {
                return this.modelValue[inputName];
            } else if (this.value && this.value[inputName]) {
                return this.value[inputName];
            }
            return null;
        },
    },
};
</script>
