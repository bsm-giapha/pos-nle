<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightAvatar v-bind="bindings"/>
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="settings"/> Content</div>
                            <BrightInputText
                                id="playgroundName"
                                v-model="name"
                                label="Name"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundImageSource"
                                v-model="src"
                                label="Image Source"
                                sub-label="Try an externally hosted image link."
                                hide-meta-label
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightDropdownSelect
                                id="playgroundColor"
                                v-model="color"
                                label="Color"
                                hide-meta-label
                                menu-full-width
                                :options="[
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
                            <BrightDropdownSelect
                                id="playgroundSize"
                                v-model="size"
                                label="Size"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'sizeSmall', label: 'Small', value: 'small' },
                                    { id: 'sizeMedium', label: 'Medium', value: 'medium' },
                                    { id: 'sizeLarge', label: 'Large', value: 'large' },
                                    { id: 'sizeExtraLarge', label: 'Extra Large', value: 'extra-large' },
                                    { id: 'sizeExtraExtraLarge', label: 'Extra Extra Large', value: 'extra-extra-large' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8" hide-meta-label>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundLight" v-model="light" label="Light"/>
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
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar";
export default {
    name: "VuePressUIPlaygroundAvatar",
    components: {
        BrightAvatar,
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
            src: '',
            name: 'Alice Firstimer',
            color: 'blue',
            light: false,
            size: 'medium',
            disabled: false,
        };
    },
    computed: {
        bindings() {
            return {
                src: this.src,
                name: this.name,
                color: this.color,
                light: this.light,
                size: this.size,
                disabled: this.disabled,
            };
        },
    },
};
</script>
