<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightInputAddress
                        v-model="value"
                        v-bind="inputBindings"
                    />
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
                            <BrightInputText id="playgroundLabel" v-model="label" label="Label"/>
                            <BrightInputText id="playgroundSubLabel" v-model="subLabel" label="Sub Label"/>
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="error"/> Error Messages</div>
                            <BrightInputText id="playgroundCountryError" v-model="errorMessages.country" label="Country"/>
                            <BrightInputText id="playgroundStreetAddress1Error" v-model="errorMessages.streetAddress1" label="Street Address 1"/>
                            <BrightInputText id="playgroundStreetAddress2Error" v-model="errorMessages.streetAddress2" label="Street Address 2"/>
                            <BrightInputText id="playgroundCityError" v-model="errorMessages.city" label="City"/>
                            <BrightInputText id="playgroundStateError" v-model="errorMessages.state" label="State"/>
                            <BrightInputText id="playgroundZipError" v-model="errorMessages.zip" label="Zip"/>
                        </BrightColumn>
                        <BrightColumn portrait="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightDropdownSelect
                                id="playgroundSize"
                                v-model="size"
                                label="Size"
                                menu-full-width
                                :options="[
                                    { id: 'sizeLarge', label: 'Large', value: 'large' },
                                    { id: 'sizeMedium', label: 'Medium', value: 'medium' },
                                    { id: 'sizeSmall', label: 'Small', value: 'small' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8">
                                <BrightSwitch id="playgroundIncludeStreetAddress2" v-model="includeStreetAddress2" label="Include Street Address 2"/>
                                <BrightSwitch id="playgroundIncludeCountry" v-model="includeCountry" label="Include Country"/>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundOptional" v-model="optional" label="Optional"/>
                                <BrightSwitch id="playgroundReadonly" v-model="readonly" label="Readonly"/>
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
import BrightInputAddress from "@/bright/components/input-library/address/BrightInputAddress";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
export default {
    name: "VuePressUIPlaygroundAddress",
    components: {
        BrightIcon,
        BrightInputGroup,
        BrightDropdownSelect,
        BrightCard,
        BrightSwitch,
        BrightInputAddress,
        BrightInputText,
        BrightRow,
        BrightGrid,
        BrightColumn,
    },
    data() {
        return {
            label: 'Mailing Address',
            subLabel: 'Domestic Addresses only.',
            size: 'medium',
            rounded: false,
            disabled: false,
            optional: false,
            readonly: false,
            value: {},
            includeStreetAddress2: true,
            includeCountry: false,
            errorMessages: {
                country: '',
                streetAddress1: '',
                streetAddress2: '',
                city: '',
                state: '',
                zip: '',
            },
        };
    },
    computed: {
        inputBindings() {
            return {
                id: 'playgroundAddress',
                label: this.label,
                subLabel: this.subLabel,
                size: this.size,
                rounded: this.rounded,
                disabled: this.disabled,
                optional: this.optional,
                readonly: this.readonly,
                value: this.value,
                includeStreetAddress2: this.includeStreetAddress2,
                includeCountry: this.includeCountry,
                errorMessages: this.errorMessages,
            };
        },
    },
    watch: {
        includeCountry() {
            return this.getSubLabel();
        },
    },
    methods: {
        getSubLabel() {
            let verbiage = this.includeCountry ? 'International' : 'Domestic';
            verbiage += ' Addresses only.';
            this.subLabel = verbiage;
        },
    },
};
</script>

<style scoped>

</style>
