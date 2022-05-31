<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightTag
                        :key="componentKey"
                        v-model="active"
                        v-bind="bindings"
                        @tag:remove="reinstateTag"
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Text</div>
                            <BrightInputText
                                id="playgroundLabel"
                                v-model="label"
                                label="Label"
                                hide-meta-label
                            />
                            <BrightInputNumber
                                id="playgroundTruncation"
                                v-model="truncateAt"
                                label="Truncate At"
                                sub-label="This determines when truncation is applied."
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundIcon"
                                v-model="icon"
                                label="Icon"
                                sub-label="Try 'face' or 'home'. Consult our Icon Library for more icons."
                                hide-meta-label
                            />

                            <div class="__typography--heading--6 border-b pt-16 pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="settings"/> Label Settings</div>
                            <BrightInputGroup label="Icon Controls" hide-label>
                                <BrightSwitch
                                    id="playgroundImagePlaceholder"
                                    v-model="imagePlaceholder"
                                    label="Use Image Placeholder"
                                    sub-label="Note: This won't show if an Icon is set."
                                />
                                <BrightSwitch
                                    id="playgroundImageRemovable"
                                    v-model="removable"
                                    label="Removable"
                                    sub-label="In this playground only, removed tags will return after three seconds."
                                />
                            </BrightInputGroup>
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
                                    { id: 'paddingLarge', label: 'Large', value: 'large' },
                                    { id: 'paddingMedium', label: 'Medium', value: 'medium' },
                                    { id: 'paddingSmall', label: 'Small', value: 'small' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8" hide-meta-label>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch id="playgroundBorderless" v-model="borderless" label="Borderless"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch
                                    id="playgroundToggleTag"
                                    v-model="isToggleTag"
                                    label="Toggle Tag"
                                    sub-label="Toggle Tags have state (i.e. pressed vs not pressed)"
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
import BrightTag from "@/bright/components/core-library/tag/BrightTag";
import BrightInputNumber from "@/bright/components/input-library/number/BrightInputNumber";
export default {
    name: "VuePressUIPlaygroundTag",
    components: {
        BrightInputNumber,
        BrightTag,
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
            label: 'Lorem ipsum dolor sit amet',
            truncateAt: -1,

            icon: '',
            imagePlaceholder: true,
            removable: true,

            color: 'blue',
            size: 'medium',

            rounded: false,
            borderless: false,
            disabled: false,

            isToggleTag: false,
            active: false,

            componentKey: 0,
        };
    },
    computed: {
        bindings() {
            return {
                label: this.label,
                truncateAt: this.truncateAt,

                icon: this.icon,
                imagePlaceholder: this.imagePlaceholder,
                removable: this.removable,

                color: this.color,
                size: this.size,

                rounded: this.rounded,
                borderless: this.borderless,
                disabled: this.disabled,

                isToggleTag: this.isToggleTag,
                active: this.active,
            };
        },
    },
    methods: {
        reinstateTag() {
            setTimeout(() => this.componentKey++, 3000);
        },
    },
};
</script>

<style scoped>

</style>
