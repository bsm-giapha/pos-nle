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

const _BrightNotificationFactory = new BrightNotificationFactory();

export default {
    name: 'VuePressTheNotificationTrayDemo',
    components: {
        BrightTheNotificationTray,
        BrightGrid,
        BrightRow,
        BrightColumn,
        BrightCard,
        BrightButton,
    },
    data() {
        return {
            type: 'info',
            icon: 'notifications',
            label: 'Congratulations!',
            subLabel: 'Here is your toast.',
            cta: 'Raise Your Glass',
            clickCallback: function() { alert('Cheers!'); },
        };
    },
    computed: {
        getButtonSourceBindings() {
            return {
                id: 'demoShowNotificationButton',
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
