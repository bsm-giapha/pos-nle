<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightButton v-bind="getPopoutSourceBindings" @click.stop="handleOnButtonClick('popout', !showPopout)" @keydown.space.enter.stop.prevent="handleOnButtonClick('popout', !showPopout)">Toggle Popout</BrightButton>
                    <BrightModalPopout :show="showPopout" v-bind="getPopoutBindings" @closed="handleOnButtonClick('popout', false)">
                        <template v-slot:media>
                            <img src="../images/ace-masked.jpg" alt="Photo of Masked Ace" class="w-full"/>
                        </template>
                        <template v-slot:left>
                            <div class="font-bold uppercase">Important!</div>
                        </template>
                        <template v-slot:right>
                            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
                        </template>
                        <div>
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                            This div is just here to show that the body of the modal fills the remaining space.
                        </div>
                    </BrightModalPopout>
                    <BrightButton v-bind="getPopupSourceBindings" @click.stop="handleOnButtonClick('popup', !showPopup)" @keydown.space.enter.stop.prevent="handleOnButtonClick('popup', !showPopup)">Toggle Popup</BrightButton>
                    <BrightModalPopup :show="showPopup" v-bind="getPopupBindings" @closed="handleOnButtonClick('popup', false)">
                        <template v-slot:media>
                            <img
                                src="../images/ace-masked.jpg"
                                alt="Photo of Masked Ace"
                                class="w-full"
                                style="height: 295px"
                            />
                        </template>
                        <template v-slot:left>
                            <div class="font-bold uppercase">Important!</div>
                        </template>
                        <template v-slot:right>
                            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
                        </template>
                        <div class="text-center">
                            Hang in there, buddy.
                        </div>
                    </BrightModalPopup>
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling</div>
                            <BrightInputGroup label="Styling Options" hide-label>
                                <BrightSwitch id="playgroundInvertLabels" v-model="invertLabels" label="Invert Labels"/>
                            </BrightInputGroup>

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
                                id="playgroundCloseLabel"
                                v-model="closeLabel"
                                label="Close Label"
                                hide-meta-label
                            />
                            <BrightDropdownSelect
                                id="playgroundCloseButtonType"
                                v-model="closeButtonType"
                                label="Close Button Type"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'primary', label: 'Primary', value: 'primary' },
                                    { id: 'secondary', label: 'Secondary', value: 'secondary' },
                                    { id: 'tertiary', label: 'Tertiary', value: 'tertiary' },
                                ]"
                            />
                            <BrightDropdownSelect
                                id="playgroundWidth"
                                v-model="width"
                                label="Width"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'widthLarge', label: 'Large', value: 'large' },
                                    { id: 'widthMedium', label: 'Medium', value: 'medium' },
                                    { id: 'widthSmall', label: 'Small', value: 'small' },
                                ]"
                            />
                            <BrightDropdownSelect
                                id="playgroundBreakpointHeaderLeft"
                                v-model="breakpointHeaderLeft"
                                label="Breakpoint Header Left"
                                sub-label="Determines when the Left section will be put on its own line."
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'breakpointHeaderLeftAlways', label: 'Always', value: 'always' },
                                    { id: 'breakpointHeaderLeftTablet', label: 'Tablet', value: 'tablet' },
                                    { id: 'breakpointHeaderLeftNever', label: 'Never', value: 'never' },
                                ]"
                            />
                            <BrightDropdownSelect
                                id="playgroundBreakpointHeaderRight"
                                v-model="breakpointHeaderRight"
                                label="Breakpoint Header Right"
                                sub-label="Determines when the Right section will be merged with the Bottom section."
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'breakpointHeaderRightAlways', label: 'Always', value: 'always' },
                                    { id: 'breakpointHeaderRightTablet', label: 'Tablet', value: 'tablet' },
                                    { id: 'breakpointHeaderRightNever', label: 'Never', value: 'never' },
                                ]"
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="layers"/> Popout Display</div>
                            <BrightInputGroup label="Display Settings" hide-label>
                                <BrightDropdownSelect
                                    id="playgroundFrom"
                                    v-model="from"
                                    label="From"
                                    sub-label="Specifies which side the Popout will emerge from."
                                    hide-meta-label
                                    menu-full-width
                                    :options="[
                                        { id: 'playgroundFromLeft', label: 'Left', value: 'left' },
                                        { id: 'playgroundFromRight', label: 'Right', value: 'right' },
                                    ]"
                                />
                                <BrightSwitch
                                    id="playgroundDisableMobileBreakpoint"
                                    v-model="disableMobileBreakpoint"
                                    label="Disable Mobile Breakpoint"
                                    sub-label="Disables the Popout from coming from the bottom on mobile."
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
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout.vue";
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";

export default {
    name: "VuePressUIPlaygroundModalPopoutPopup",
    components: { BrightGrid, BrightRow, BrightColumn, BrightCard, BrightButton, BrightModalPopout, BrightModalPopup, BrightSwitch, BrightInputText, BrightDropdownSelect, BrightInputGroup },
    data() {
        return {
            showPopout: false,
            showPopup: false,

            from: 'right',
            disableMobileBreakpoint: false,

            width: 'medium',
            label: 'Are you staying safe out there?',
            subLabel: 'We sure hope so.',
            invertLabels: false,
            breakpointHeaderLeft: 'always',
            breakpointHeaderRight: 'never',
            closeLabel: 'Close',
            closeButtonType: 'primary',
        };
    },
    computed: {
        getPopoutSourceBindings() {
            return {
                id: 'togglePopout',
                use: 'primary',
            };
        },
        getPopupSourceBindings() {
            return {
                id: 'togglePopup',
                use: 'primary',
            };
        },
        getPopoutBindings() {
            return {
                id: 'modalPopout',
                closeFocusID: 'togglePopout',

                from: this.from,
                disableMobileBreakpoint: this.disableMobileBreakpoint,

                width: this.width,
                label: this.label,
                subLabel: this.subLabel,
                invertLabels: this.invertLabels,
                breakpointHeaderLeft: this.breakpointHeaderLeft,
                breakpointHeaderRight: this.breakpointHeaderRight,
                closeLabel: this.closeLabel,
                closeButtonType: this.closeButtonType,
            };
        },
        getPopupBindings() {
            return {
                id: 'modalPopup',
                closeFocusID: 'togglePopup',

                width: this.width,
                label: this.label,
                subLabel: this.subLabel,
                invertLabels: this.invertLabels,
                breakpointHeaderLeft: this.breakpointHeaderLeft,
                breakpointHeaderRight: this.breakpointHeaderRight,
                closeLabel: this.closeLabel,
                closeButtonType: this.closeButtonType,
            };
        },
    },
    methods: {
        handleOnButtonClick(modalType, newValue) {
            switch (modalType) {
            case 'popout':
                this.showPopout = newValue;
                break;
            case 'popup':
                this.showPopup = newValue;
                break;
            }
        },
    },
};
</script>

<style scoped>

</style>
