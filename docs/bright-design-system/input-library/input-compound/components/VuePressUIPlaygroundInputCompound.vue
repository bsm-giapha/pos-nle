<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightInputCompound v-bind="bindings">
                        <BrightDropdownSelect
                            id="select"
                            class="flex-initial"
                            label="Search Scope"
                            form-control="none"
                            :validation-type="validationType"
                            :validation-message="validationMessage"
                            :size="size"
                            :options="[
                                { value: 'everywhere', label: 'Everywhere' },
                                { value: 'products', label: 'Products' },
                                { value: 'vendors', label: 'Vendors' },
                                { value: 'users', label: 'Users' },
                            ]"
                        />
                        <BrightInputText
                            id="searchCompound"
                            class="flex-1"
                            form-control="none"
                            label="Search"
                            placeholder="Search"
                            :validation-type="validationType"
                            :size="size"
                        />
                    </BrightInputCompound>
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
                            <BrightInputGroup label="Toggleable" class="mb-8" hide-meta-label>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch id="playgroundOptional" v-model="optional" label="Optional"/>
                                <BrightSwitch id="playgroundHideCompoundLabel" v-model="hideCompoundLabel" label="Hide Compound Label"/>
                                <BrightSwitch id="playgroundHideInputLabels" v-model="hideInputLabels" label="Hide Input Labels"/>
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
import BrightInputCompound from "@/bright/components/input-library/input-compound/BrightInputCompound";
export default {
    name: "VuePressUIPlaygroundInputCompound",
    components: {
        BrightInputCompound,
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
            label: 'Search',
            subLabel: 'Where would you like to search?',
            size: 'medium',
            optional: false,
            hideCompoundLabel: false,
            hideInputLabels: true,
            rounded: false,
            validationType: 'none',
            validationMessage: 'This is the validation message.',
        };
    },
    computed: {
        bindings() {
            return {
                id: 'showcase',
                label: this.label,
                subLabel: this.subLabel,
                size: this.size,
                optional: this.optional,
                hideCompoundLabel: this.hideCompoundLabel,
                hideInputLabels: this.hideInputLabels,
                validationType: this.validationType,
                validationMessage: this.validationMessage,
                rounded: this.rounded,
            };
        },
    },
};
</script>
