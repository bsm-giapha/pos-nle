<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightButton v-bind="getButtonSourceBindings" @click="handleOnButtonClick" @keydown.space.enter.stop.prevent="handleOnButtonClick">Click for a notification</BrightButton>
                </BrightCard>
                <BrightTheNotificationTray/>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none" class="mt-16">
            <BrightColumn>
                <BrightCard
                    :expandable="true"
                    ribbon="blue"
                    label="Interactive Playground"
                    sub-label="Use this playground to interact with the above component in different states and settings."
                >
                    <BrightRow class="mt-24">
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="settings"/> Content</div>
                            <BrightInputText
                                id="playgroundIcon"
                                v-model="icon"
                                label="Icon"
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
                                id="playgroundCTA"
                                v-model="cta"
                                label="CTA"
                                hide-meta-label
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling</div>
                            <BrightDropdownSelect
                                id="playgroundType"
                                v-model="type"
                                label="Type"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'info', label: 'Info', value: 'info' },
                                    { id: 'success', label: 'Success', value: 'success' },
                                    { id: 'error', label: 'Error', value: 'error' },
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
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory";
import BrightTheNotificationTray from "@/bright/components/overlay-library/the-notification-tray/BrightTheNotificationTray";
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";

const _BrightNotificationFactory = new BrightNotificationFactory();

export default {
    name: 'VuePressUIPlaygroundTheNotificationTray',
    components: {
        BrightTheNotificationTray,
        BrightGrid,
        BrightRow,
        BrightColumn,
        BrightCard,
        BrightButton,
        BrightDropdownSelect,
        BrightInputText,
    },
    data() {
        return {
            type: 'info',
            icon: 'notifications',
            label: 'Borrower Completed Application',
            subLabel: 'Alice Firstimer has completed their application.',
            cta: 'Go to Loan',
            clickCallback: function() { alert('CTA was clicked.'); },
        };
    },
    computed: {
        getButtonSourceBindings() {
            return {
                id: 'playgroundShowNotificationButton',
                use: 'primary',
            };
        },
    },
    methods: {
        handleOnButtonClick() {
            let object = {
                type: this.type,
                icon: this.icon,
                label: this.label,
                subLabel: this.subLabel,
                cta: this.cta,
                clickCallback: this.clickCallback,
            };
            _BrightNotificationFactory.createNotification(object);
        },
    },
};

</script>
