<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightButton v-model="active" :use="buttonType" v-bind="bindings">{{ label }}</BrightButton>
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="settings"/> Button Settings</div>
                            <BrightInputText id="playgroundLabel" v-model="label" label="Label"/>
                            <BrightInputText
                                id="playgroundIcon"
                                v-model="icon"
                                label="Icon"
                                sub-label="Try 'face' or 'home'. Consult our Icon Library for more icons."
                            />
                            <BrightDropdownSelect
                                id="playgroundIconPosition"
                                v-model="iconPosition"
                                label="Icon Position"
                                menu-full-width
                                :options="[
                                    { id: 'center', label: 'Center', value: 'center' },
                                    { id: 'prefix', label: 'Prefix (Left)', value: 'prefix' },
                                    { id: 'postfix', label: 'Postfix (Right)', value: 'postfix' },
                                ]"
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightDropdownSelect
                                id="playgroundType"
                                v-model="buttonType"
                                label="Button Type (Hierarchy)"
                                menu-full-width
                                :options="[
                                    { id: 'primary', label: 'Primary Button', value: 'primary' },
                                    { id: 'secondary', label: 'Secondary Button', value: 'secondary' },
                                    { id: 'tertiary', label: 'Tertiary Button', value: 'tertiary' },
                                ]"
                            />
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
                            <BrightDropdownSelect
                                id="playgroundVariant"
                                v-model="variant"
                                label="Variant"
                                menu-full-width
                                :options="[
                                    { id: 'variantStandard', label: 'Standard', value: 'standard' },
                                    { id: 'variantAlternative', label: 'Alternative', value: 'alternative' },
                                    { id: 'variantDanger', label: 'Danger', value: 'danger' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8">
                                <BrightSwitch id="playgroundLoadingAnimation" v-model="showLoadingAnimation" label="Show Loading Animation"/>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundFullWidth" v-model="fullWidth" label="Full-Width"/>
                                <BrightSwitch
                                    id="playgroundToggleButton"
                                    v-model="isToggleButton"
                                    label="Toggle Button"
                                    sub-label="Toggle Buttons have state (i.e. pressed vs not pressed)"
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
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightButton from "@/bright/components/core-library/button/BrightButton";
export default {
    name: "VuePressUIPlaygroundButton",
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
            buttonType: 'primary',
            label: 'Submit',
            icon: '',
            iconPosition: 'prefix',
            size: 'medium',
            variant: 'standard',
            disabled: false,
            fullWidth: false,
            showLoadingAnimation: false,
            rounded: false,
            isToggleButton: false,
            active: false,
        };
    },
    computed: {
        bindings() {
            return {
                icon: this.icon,
                iconPosition: this.iconPosition,
                size: this.size,
                variant: this.variant,
                disabled: this.disabled,
                fullWidth: this.fullWidth,
                showLoadingAnimation: this.showLoadingAnimation,
                rounded: this.rounded,
                isToggleButton: this.isToggleButton,
                active: this.active,
            };
        },
    },
    watch: {
        label: function(newValue) {
            if (newValue.length === 0) {
                this.iconPosition = 'center';
            } else {
                this.iconPosition = 'prefix';
            }
        },
    },
};
</script>
