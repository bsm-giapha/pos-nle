<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard ref="card" v-bind="bindings" class="w-full tablet:w-2/3">
                    <template v-slot:media>
                        <div v-if="showMediaSection" class="bg-grey-200 w-full" style="height: 256px;"></div>
                    </template>
                    <template v-slot:left>
                        <div v-if="showLeftSection" class="inline-block bg-blue-50 p-10 rounded-6">
                            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
                        </div>
                    </template>
                    <template v-slot:right>
                        <BrightButton v-if="showRightSection" use="primary">Right</BrightButton>
                    </template>
                    <div v-if="content" class="__typography--body--m mb-0">{{ content }}</div>
                    <div v-if="showBottomSection" class="mt-12">
                        <BrightButton use="primary">Button 1</BrightButton>
                        <BrightButton use="tertiary">Button 2</BrightButton>
                    </div>
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Labels</div>
                            <BrightDropdownSelect
                                id="playgroundLabelPosition"
                                v-model="labelPosition"
                                label="Label Position"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'labelPositionLeft', label: 'Left', value: 'left' },
                                    { id: 'labelPositionCenter', label: 'Center', value: 'center' },
                                    { id: 'labelPositionRight', label: 'Right', value: 'right' },
                                ]"
                            />
                            <BrightInputText
                                id="playgroundLabelElement"
                                v-model="labelElement"
                                label="Label Element"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundLabel"
                                v-model="label"
                                label="Label"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundSubLabel"
                                v-model="subLabel"
                                label="Sub-Label"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundContent"
                                v-model="content"
                                label="Content"
                                hide-meta-label
                            />

                            <div class="__typography--heading--6 border-b pb-2 mt-32"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Content</div>
                            <BrightInputGroup label="Sections" hide-meta-label>
                                <BrightSwitch id="playgroundShowMedia" v-model="showMediaSection" label="Show Media Section"/>
                                <BrightSwitch id="playgroundShowLeft" v-model="showLeftSection" label="Show Left Section"/>
                                <BrightSwitch id="playgroundShowRight" v-model="showRightSection" label="Show Right Section"/>
                                <BrightSwitch id="playgroundShowBottom" v-model="showBottomSection" label="Show Bottom Section"/>
                            </BrightInputGroup>
                            <BrightInputGroup label="Expandable" hide-meta-label>
                                <BrightSwitch id="playgroundExpandable" v-model="expandable" label="Show Expandable Section"/>
                                <BrightSwitch id="playgroundExpandableHideArrow" v-model="expandableHideArrow" label="Hide Expandable Section Arrow"/>
                            </BrightInputGroup>
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
                                id="playgroundRibbon"
                                v-model="ribbon"
                                label="Ribbon"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'none', label: 'None', value: 'none' },
                                    { id: 'grey', label: 'Grey', value: 'grey' },
                                    { id: 'blue', label: 'Blue', value: 'blue' },
                                    { id: 'pink', label: 'Pink', value: 'pink' },
                                    { id: 'aqua', label: 'Aqua', value: 'aqua' },
                                    { id: 'yellow', label: 'Yellow', value: 'yellow' },
                                    { id: 'green', label: 'Green', value: 'green' },
                                    { id: 'red', label: 'Red', value: 'red' },
                                    { id: 'orange', label: 'Orange', value: 'orange' },
                                    { id: 'purple', label: 'Purple', value: 'purple' },
                                    { id: 'indigo', label: 'Indigo', value: 'indigo' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8" hide-meta-label>
                                <BrightSwitch id="playgroundRaised" v-model="raised" label="Raised"/>
                                <BrightSwitch id="playgroundBordered" v-model="bordered" label="Bordered"/>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch
                                    id="playgroundInvertLabels"
                                    v-model="invertLabels"
                                    class="mb-48"
                                    label="Invert Labels"
                                />
                            </BrightInputGroup>

                            <div class="__typography--heading--6 border-b pb-2 mt-32"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="phone_iphone"/> &nbsp;Responsive Breakpoints</div>
                            <BrightDropdownSelect
                                id="playgroundBreakpointHeaderLeft"
                                v-model="breakpointHeaderLeft"
                                label="Left Section Breakpoint"
                                sub-label="Determines the responsive breakpoint at which the Left Section will be on its own line."
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'leftNever', label: 'Never', subLabel: 'The Left Section will never be on its own line.', value: 'never' },
                                    { id: 'leftAlways', label: 'Always', subLabel: 'The Left Section will always be on its own line.', value: 'always' },
                                    { id: 'leftTablet', label: 'Tablet', subLabel: 'The Left Section will be on its own line starting at the Tablet breakpoint.', value: 'tablet' },
                                ]"
                            />
                            <BrightDropdownSelect
                                id="playgroundBreakpointHeaderRight"
                                v-model="breakpointHeaderRight"
                                label="Right Section Breakpoint"
                                sub-label="Determines the responsive breakpoint at which the Right Section will be moved to the bottom of the Card."
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'rightNever', label: 'Never', value: 'never' },
                                    { id: 'rightAlways', label: 'Always', value: 'always' },
                                    { id: 'rightTablet', label: 'Tablet', value: 'tablet' },
                                ]"
                            />
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
export default {
    name: "VuePressUIPlaygroundCard",
    components: {
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
            labelPosition: '',
            labelElement: 'div',
            label: 'Card Label',
            subLabel: 'Card Sub-Label',
            content: 'Card Body',
            bordered: true,
            showMediaSection: false,
            showLeftSection: false,
            showRightSection: false,
            showBottomSection: false,
            breakpointHeaderLeft: 'never',
            breakpointHeaderRight: 'never',
            expandable: false,
            expandableHideArrow: false,
            invertLabels: false,
            raised: false,
            ribbon: 'none',
            rounded: true,
            size: 'medium',
        };
    },
    computed: {
        bindings() {
            return {
                id: 'ExampleCard',
                labelPosition: this.labelPosition,
                labelElement: this.labelElement,
                label: this.label,
                subLabel: this.subLabel,
                bordered: this.bordered,
                breakpointHeaderLeft: this.breakpointHeaderLeft,
                breakpointHeaderRight: this.breakpointHeaderRight,
                expandable: this.expandable,
                expandableHideArrow: this.expandableHideArrow,
                invertLabels: this.invertLabels,
                raised: this.raised,
                ribbon: this.ribbon,
                rounded: this.rounded,
                size: this.size,
            };
        },
    },
};
</script>

<style scoped>

</style>
