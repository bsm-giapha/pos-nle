<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightBanner v-bind="bindings">

                </BrightBanner>
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
                                id="playgroundBody"
                                v-model="body"
                                label="Body"
                                hide-meta-label
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & Behavior</div>
                            <BrightDropdownSelect
                                id="playgroundType"
                                v-model="type"
                                label="Type"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'typeInfo', label: 'Info', value: 'info' },
                                    { id: 'typeError', label: 'Error', value: 'error' },
                                    { id: 'typeWarning', label: 'Warning', value: 'warning' },
                                    { id: 'typeSuccess', label: 'Success', value: 'success' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8" hide-meta-label>
                                <BrightSwitch id="playgroundAnnouncement" v-model="announcement" label="Announcement"/>
                                <BrightSwitch id="playgroundRemovable" v-model="removable" label="Removable"/>
                                <BrightSwitch
                                    v-if="!announcement"
                                    id="playgroundBordered"
                                    v-model="bordered"
                                    label="Bordered"
                                />
                                <BrightSwitch
                                    v-if="!announcement"
                                    id="playgroundRounded"
                                    v-model="rounded"
                                    label="Rounded"
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
import BrightBanner from "@/bright/components/layout-library/banner/BrightBanner";
export default {
    name: "VuePressUIPlaygroundBanner",
    components: {
        BrightBanner,
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
            type: 'info',
            label: 'Here’s a fun fact',
            body: 'Although very unlikely, it’s possible for someone to never win (or lose) a game of Rock, Paper, Scisssors in their lifetime.',
            removable: true,
            announcement: false,
            bordered: true,
            rounded: true,
        };
    },
    computed: {
        bindings() {
            return {
                id: 'ExampleCard',
                type: this.type,
                label: this.label,
                body: this.body,
                removable: this.removable,
                announcement: this.announcement,
                bordered: this.bordered,
                rounded: this.rounded,
            };
        },
    },
};
</script>

<style scoped>

</style>
