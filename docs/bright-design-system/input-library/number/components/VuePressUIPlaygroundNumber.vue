<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightInputNumber v-model="vModelData" v-bind="inputBindings"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none" class="mt-16">
            <BrightColumn>
                <BrightCard
                    ribbon="blue"
                    :expandable="true"
                    label="Interactive Playground"
                    sub-label="Use this playground to interact with the above component in different states and settings."
                >
                    <BrightRow class="mt-24">
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Text</div>
                            <BrightInputText
                                id="playgroundLabel"
                                v-model="label"
                                label="Label"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundSubLabel"
                                v-model="subLabel"
                                label="Sub Label"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundPlaceholder"
                                v-model="placeholder"
                                label="Placeholder Text"
                                hide-meta-label
                            />
                            <div class="__typography--heading--6 border-b pt-16 pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="verified_user"/> Validation</div>
                            <BrightDropdownSelect
                                id="playgroundValidationType"
                                v-model="validationType"
                                label="Validation Type"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'none', label: 'No Validation', value: 'none' },
                                    { id: 'error', label: 'Error', value: 'error' },
                                    { id: 'success', label: 'Success', value: 'success' },
                                ]"
                            />
                            <BrightInputText
                                id="playgroundValidationMessage"
                                v-model="validationMessage"
                                label="Validation Message"
                                sub-label="This will only show if validation is used."
                                hide-meta-label
                            />
                        </BrightColumn>

                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightDropdownSelect
                                id="playgroundSize"
                                v-model="size"
                                label="Size"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'sizeLarge', label: 'Large', value: 'large' },
                                    { id: 'sizeMedium', label: 'Medium', value: 'medium' },
                                    { id: 'sizeSmall', label: 'Small', value: 'small' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8">
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundOptional" v-model="optional" label="Optional"/>
                                <BrightSwitch id="playgroundReadonly" v-model="readonly" label="Readonly"/>
                            </BrightInputGroup>
                            <div class="__typography--heading--6 border-b pt-16 pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="functions"/> Numeric Settings</div>
                            <BrightSwitch id="playgroundDecimalAllowed" v-model="allowDecimals" label="Allow Decimals"/>
                            <BrightInputNumber
                                v-if="allowDecimals"
                                id="playgroundDecimalPrecision"
                                v-model="decimalPrecision"
                                label="Decimal Precision"
                            />
                            <BrightSwitch id="playgroundPercent" v-model="percent" label="Allow Percent"/>
                            <BrightSwitch id="playgroundNegative" v-model="negative" label="Allow Negative Numbers"/>
                        </BrightColumn>
                    </BrightRow>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</template>

<script>
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightInputNumber from "@/bright/components/input-library/number/BrightInputNumber";
export default {
    name: "VuePressUIPlaygroundNumber",
    components: {
        BrightInputNumber,
        BrightIcon,
        BrightInputGroup,
        BrightDropdownSelect,
        BrightCard,
        BrightSwitch,
        BrightInputText,
        BrightRow,
        BrightGrid,
        BrightColumn,
    },
    data() {
        return {
            label: 'Favorite Number',
            subLabel: "Everyone has a favorite number. What's yours?",
            placeholder: 'Our universe is made up of numbers.',
            size: 'medium',
            rounded: false,
            disabled: false,
            optional: false,
            readonly: false,
            validationType: 'none',
            validationMessage: 'This is the validation message.',
            allowDecimals: false,
            decimalPrecision: null,
            percent: false,
            negative: false,
            vModelData: null,
        };
    },
    computed: {
        inputBindings() {
            return {
                id: 'showcaseNumber',
                label: this.label,
                subLabel: this.subLabel,
                placeholder: this.placeholder,
                size: this.size,
                rounded: this.rounded,
                disabled: this.disabled,
                optional: this.optional,
                readonly: this.readonly,
                validationType: this.validationType,
                validationMessage: this.validationMessage,
                decimal: this.decimalValue,
                percent: this.percent,
                negative: this.negative,
            };
        },
        decimalValue() {
            if (this.allowDecimals === false || isNaN(parseInt(this.decimalPrecision))) {
                return this.allowDecimals;
            } else {
                return this.decimalPrecision;
            }
        },
    },
};
</script>

<style scoped>

</style>
