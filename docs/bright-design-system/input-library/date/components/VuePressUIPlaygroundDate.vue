<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightInputDate
                        ref="playgroundInputDate"
                        v-bind="inputBindings"
                        :key="componentKey"
                        v-model="vModelData"
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
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Type</div>
                            <BrightDropdownSelect
                                id="playgroundType"
                                v-model="inputType"
                                label="Input Type"
                                menu-full-width
                                :options="[
                                    { id: 'date', label: 'Date Input', value: 'date' },
                                    { id: 'time', label: 'Time Input', value: 'time' },
                                    { id: 'dateTime', label: 'Date & Time Input', value: 'dateTime' },
                                ]"
                            />
                            <div class="__typography--heading--6 border-b pt-16 pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="verified_user"/> Validation</div>
                            <BrightDropdownSelect
                                id="playgroundValidationType"
                                v-model="validationType"
                                label="Validation Type"
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
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
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
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundOptional" v-model="optional" label="Optional"/>
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
import BrightInputDate from "@/bright/components/input-library/date/BrightInputDate";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
export default {
    name: "VuePressUIPlaygroundDate",
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
        BrightInputDate,
    },
    data() {
        return {
            componentKey: 0,
            inputType: 'date',
            mode: 'single',
            monthSelectorType: 'dropdown',
            label: 'Availability',
            subLabel: 'Select a Date',
            placeholder: 'mm/dd/yyyy',
            size: 'medium',
            disabled: false,
            optional: false,
            validationType: 'none',
            validationMessage: 'This is the validation message.',
            vModelData: '',
        };
    },
    computed: {
        inputBindings() {
            return {
                id: 'showcaseDate',
                enableTime: this.inputType !== 'date',
                format: this.getDateFormat(),
                hideCalendar: this.inputType === 'time',
                label: this.label,
                subLabel: this.getSubLabel(),
                placeholder: this.getPlaceholder(),
                size: this.size,
                disabled: this.disabled,
                optional: this.optional,
                validationType: this.validationType,
                validationMessage: this.validationMessage,
            };
        },
    },
    watch: {
        inputType() {
            this.$refs.playgroundInputDate.inputValue = null;
            this.forceRerender();
        },
    },
    methods: {
        getDateFormat() {
            switch (this.inputType) {
            case 'date': return 'm/d/Y';
            case 'time': return 'h:i K';
            case 'dateTime': return 'm/d/Y at h:i K';
            default: return 'm/d/Y';
            }
        },
        getSubLabel() {
            switch (this.inputType) {
            case 'time': return 'Select a Time';
            case 'dateTime': return 'Select a Date & Time';
            default: return 'Select a Date';
            }
        },
        getPlaceholder() {
            switch (this.inputType) {
            case 'time': return '00:00 AM/PM';
            case 'dateTime': return 'mm/dd/yyyy at 00:00 AM/PM';
            default: return 'mm/dd/yyyy';
            }
        },
        forceRerender() {
            this.componentKey += 1;
        },
    },
};
</script>

<style scoped>

</style>
