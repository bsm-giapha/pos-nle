<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightTooltip v-bind="bindings">
                        <BrightButton use="secondary">Hover Over Me</BrightButton>
                    </BrightTooltip>
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
                                id="playgroundTitle"
                                v-model="title"
                                label="Title"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundText"
                                v-model="text"
                                label="Text"
                                hide-meta-label
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightDropdownSelect
                                id="playgroundPlacement"
                                v-model="placement"
                                label="Placement"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { label: 'Top', options: [
                                        { id: 'placementTopStart', label: 'Top-Start', value: 'top-start' },
                                        { id: 'placementTop', label: 'Top', value: 'top' },
                                        { id: 'placementTopEnd', label: 'Top-End', value: 'top-end' },
                                    ] },
                                    { label: 'Bottom', options: [
                                        { id: 'placementBottomStart', label: 'Bottom-Start', value: 'bottom-start' },
                                        { id: 'placementBottom', label: 'Bottom', value: 'bottom' },
                                        { id: 'placementBottomEnd', label: 'Bottom-End', value: 'bottom-end' },
                                    ] },
                                    { label: 'Left', options: [
                                        { id: 'placementLeftStart', label: 'Left-Start', value: 'left-start' },
                                        { id: 'placementLeft', label: 'Left', value: 'left' },
                                        { id: 'placementLeftEnd', label: 'Left-End', value: 'left-end' },
                                    ] },
                                    { label: 'Right', options: [
                                        { id: 'placementRightStart', label: 'Right-Start', value: 'right-start' },
                                        { id: 'placementRight', label: 'Right', value: 'right' },
                                        { id: 'placementRightEnd', label: 'Right-End', value: 'right-end' },
                                    ] },
                                    { label: 'Auto', options: [
                                        { id: 'placementAutoStart', label: 'Auto-Start', value: 'auto-start' },
                                        { id: 'placementAuto', label: 'Auto', value: 'auto' },
                                        { id: 'placementAutoEnd', label: 'Auto-End', value: 'auto-end' },
                                    ] },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8">
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
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightTooltip from "@/bright/components/overlay-library/BrightTooltip";
export default {
    name: "VuePressUIPlaygroundTooltip",
    components: {
        BrightTooltip,
        BrightButton,
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
            title: 'Mitochondria',
            text: 'Also known as the powerhouse of the cell.',
            placement: 'top',
            disabled: false,
        };
    },
    computed: {
        bindings() {
            return {
                title: this.title,
                text: this.text,
                placement: this.placement,
                disabled: this.disabled,
            };
        },
    },
};
</script>

<style scoped>

</style>
