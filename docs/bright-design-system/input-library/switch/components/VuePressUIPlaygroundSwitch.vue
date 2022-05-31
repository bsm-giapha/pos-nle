<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightSwitch v-model="vModelData" v-bind="inputBindings"/>
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
                                id="playgroundDescriptionTrue"
                                v-model="descriptionTrue"
                                label="Description When True"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundDescriptionFalse"
                                v-model="descriptionFalse"
                                label="Description When False"
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
                            <BrightDropdownSelect
                                id="playgroundVariant"
                                v-model="variant"
                                label="Variant"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'variantStandard', label: 'Standard', value: 'standard' },
                                    { id: 'variantAlternative', label: 'Alternative', value: 'alternative' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8">
                                <BrightSwitch id="playgroundChecked" v-model="vModelData" label="Checked"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                            </BrightInputGroup>
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
export default {
    name: "VuePressUIPlaygroundSwitch",
    components: {
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
            label: "Enable themes for all users",
            subLabel: "All users will be able to use their own themes (including Dark Mode).",
            descriptionTrue: "Yes",
            descriptionFalse: "No",
            size: "medium",
            variant: "standard",
            disabled: false,
            validationType: "none",
            validationMessage: "This is the validation message.",
            vModelData: true,
        };
    },
    computed: {
        inputBindings() {
            return {
                id: "showcase",
                label: this.label,
                subLabel: this.subLabel,
                descriptionTrue: this.descriptionTrue,
                descriptionFalse: this.descriptionFalse,
                size: this.size,
                variant: this.variant,
                disabled: this.disabled,
                validationType: this.validationType,
                validationMessage: this.validationMessage,
            };
        },
    },
};
</script>

<style scoped>

</style>
