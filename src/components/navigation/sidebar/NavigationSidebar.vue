<template>
    <div v-bind="sidebarBindings">
        <div class="relative">
            <BrightCard v-bind="menuBindings">
                <div class="ClientName">{{ clientName }}</div>
                <NavigationLenderHeaderActions @button-click="handleHeaderActionClick"/>
                <div class="Divider"></div>
                <nav :id="navID" aria-label="Site Navigation">
                    <slot></slot>
                </nav>
            </BrightCard>
        </div>
    </div>
</template>

<script>
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import { MobileMixin } from "@/bright/mixins/global/MobileMixin.js";
import { useNavigationStore } from "@/stores/navigation";
import NavigationLenderHeaderActions from "@/components/navigation/NavigationLenderHeaderActions.vue";

export default {
    name: "NavigationSidebar",
    components: {
        NavigationLenderHeaderActions,
        BrightCard,
    },
    mixins: [MobileMixin],
    inheritAttrs: true,
    props: {
        id: {
            type: String,
            default: 'sidebar',
            required: false,
        },
        clientName: {
            type: String,
            default: 'Smart Mortgage',
            required: false,
        },
        expanded: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    emits: ['menu:toggle'],
    computed: {
        navID() {
            return this.id + 'Nav';
        },
        buttonID() {
            return this.id + 'MenuButton';
        },
        sidebarBindings() {
            return {
                id: this.id,
                class: {
                    'NavigationSidebar': true,
                    'NavigationSidebar--expanded': this.expanded,
                },
            };
        },
        menuBindings() {
            return {
                class: {
                    'NavigationSidebar__Menu': true,
                    'NavigationSidebar__Menu--expanded': this.expanded,
                },
                size: 'large',
                raised: true,
                rounded: false,
                bordered: false,
            };
        },
        showPopout() {
            return this.windowWidth <= 768;
        },
    },
    methods: {
        emitMenuToggle() {
            this.$emit('menu:toggle');
        },
        handleHeaderActionClick(event) {
            const navigation = useNavigationStore();
            switch (event) {
                case 'notifications':
                    navigation.updateNotifications(true);
                    break;
                default:
                    break;
            }
        },
    },
};
</script>
