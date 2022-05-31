<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightInputState v-bind="inputBindings"/>
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
                        <BrightColumn portrait="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Text</div>
                            <BrightInputText
                                id="playgroundLabel"
                                v-model="label"
                                label="Label"
                                sub-label="Defaults to 'State'"
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
                            <BrightInputText
                                id="playgroundIcon"
                                v-model="icon"
                                label="Icon"
                                sub-label="Only works for non-Input Button Types. Try 'face' or 'home'. Consult our Icon Library for more icons."
                                hide-meta-label
                            />
                            <BrightDropdownSelect
                                id="playgroundIconPosition"
                                v-model="iconPosition"
                                label="Icon Position"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'center', label: 'Center', value: 'center' },
                                    { id: 'prefix', label: 'Prefix (Left)', value: 'prefix' },
                                ]"
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
                                id="playgroundType"
                                v-model="hierarchy"
                                label="Button Type (Hierarchy)"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'input', label: 'Input Button', value: 'input' },
                                    { id: 'primary', label: 'Primary Button', value: 'primary' },
                                    { id: 'secondary', label: 'Secondary Button', value: 'secondary' },
                                    { id: 'tertiary', label: 'Tertiary Button', value: 'tertiary' },
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
                                    { id: 'variantDanger', label: 'Danger', value: 'danger' },
                                ]"
                            />
                            <BrightInputGroup label="State Dropdown Settings">
                                <BrightSwitch id="playgroundIncludeTerritories" v-model="includeTerritories" label="Include Territories"/>
                            </BrightInputGroup>
                            <BrightInputGroup label="Generic Dropdown Settings">
                                <BrightSwitch id="playgroundSearchable" v-model="searchable" label="Show Search Bar"/>
                                <BrightSwitch id="playgroundButtonWidth" v-model="buttonFullWidth" label="Full Width Button"/>
                                <BrightSwitch id="playgroundMenuWidth" v-model="menuFullWidth" label="Full Width Menu"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundOptional" v-model="optional" label="Optional"/>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch
                                    id="playgroundRounded"
                                    v-model="hideArrow"
                                    label="Hide Arrow"
                                    sub-label="If enabled, will hide the right arrow/caret."
                                />
                                <BrightSwitch
                                    id="playgroundRounded"
                                    v-model="dummy"
                                    label="Dummy"
                                    sub-label="Dummies don't update the currently selected value when a new one is chosen and cannot be searched."
                                />
                            </BrightInputGroup>
                            <BrightInputGroup label="Multi-Select Dropdown Settings">
                                <BrightSwitch id="playgroundMultiple" v-model="multiple" label="Multi-Select"/>
                                <BrightSwitch
                                    v-show="multiple"
                                    id="playgroundMultipleTruncation"
                                    v-model="multipleItemTruncation"
                                    label="Truncate Multiple Items"
                                    sub-label="If enabled, will truncate items in a format of 'X selected'."
                                />
                                <BrightSwitch
                                    v-show="multiple"
                                    id="playgroundMultipleSelectAll"
                                    v-model="multipleSelectAll"
                                    label="Show Select/Unselect All Option"
                                    sub-label="If enabled, will dynamically add a 'Select/Unselect All' option."
                                />
                            </BrightInputGroup>
                        </BrightColumn>
                    </BrightRow>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</template>

<script>
import BrightInputState from "../../../../../src/components/input-library/state/BrightInputState";
import BrightGrid from "../../../../../src/components/layout-library/grid/BrightGrid";
import BrightRow from "../../../../../src/components/layout-library/grid/BrightRow";
import BrightColumn from "../../../../../src/components/layout-library/grid/BrightColumn";
import BrightCard from "../../../../../src/components/layout-library/card/BrightCard";
import BrightIcon from "../../../../../src/components/core-library/icon/BrightIcon";
import BrightInputText from "../../../../../src/components/input-library/text/BrightInputText";
import BrightDropdownSelect from "../../../../../src/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "../../../../../src/components/input-library/input-group/BrightInputGroup";
import BrightSwitch from "../../../../../src/components/input-library/switch/BrightSwitch";

export default {
    name: "VuePressUIPlaygroundState",
    components: {
        BrightSwitch,
        BrightInputGroup,
        BrightDropdownSelect, BrightInputText, BrightIcon, BrightCard, BrightColumn, BrightRow, BrightGrid, BrightInputState },
    data() {
        return {
            label: 'State',
            subLabel: '',
            placeholder: 'Select',
            size: 'medium',
            multiple: false,
            includeTerritories: false,
            searchable: true,
            buttonFullWidth: false,
            menuFullWidth: false,
            disabled: false,
            optional: false,
            validationType: 'none',
            validationMessage: 'This is the validation message.',
            vModelData: 'radioInput1',
            rounded: false,
            multipleItemTruncation: true,
            multipleSelectAll: true,
            hierarchy: 'input',
            variant: 'standard',
            icon: '',
            iconPosition: 'prefix',
            hideArrow: false,
            dummy: false,
        };
    },
    computed: {
        inputBindings() {
            return {
                id: 'playgroundState',
                label: this.label,
                subLabel: this.subLabel,
                placeholder: this.placeholder,
                hierarchy: this.hierarchy,
                variant: this.variant,
                icon: this.icon,
                iconPosition: this.iconPosition,
                hideArrow: this.hideArrow,
                dummy: this.dummy,
                size: this.size,
                multiple: this.multiple,
                includeTerritories: this.includeTerritories,
                searchable: this.searchable,
                buttonFullWidth: this.buttonFullWidth,
                menuFullWidth: this.menuFullWidth,
                disabled: this.disabled,
                optional: this.optional,
                validationType: this.validationType,
                validationMessage: this.validationMessage,
                rounded: this.rounded,
                multipleItemTruncation: this.multipleItemTruncation,
                multipleSelectAll: this.multipleSelectAll,
            };
        },
    },
};
</script>

<style scoped>

</style>
