<template>
    <div class="NavigationLender">
        <NavigationLenderSidebar v-show="!isPortraitOrMobileSizedScreen" :expanded="sidebarMenuIsExpanded" @menu:toggle="handleMenuToggle()"/>
        <NavigationHeader ref="header" v-bind="headerBindings" @menu:toggle="handleMenuToggle()">
            <div class="NavigationActions NavigationActions--Header">
                <BrightDropdownSelect
                    v-if="localActions.length > 0"
                    id="localActionDropdown"
                    class="mb-0"
                    dummy
                    label="Actions"
                    hide-arrow
                    hierarchy="secondary"
                    variant="standard"
                    size="small"
                    rounded
                    hide-label
                    icon="more_vert"
                    icon-position="prefix"
                    placeholder="Actions"
                    :button-full-width="false"
                    :options="localActions"
                    @option:selected="$event()"
                />
            </div>
        </NavigationHeader>
        <BrightCard v-bind="contentBindings">
            <BrightLoader v-show="isLoading" v-bind="loaderBindings" @after-leave="showSlot = true;"/>
        
            <div v-show="showSlot">
                <slot></slot>
            </div>
        </BrightCard>
        <BrightModalPopout v-show="isPortraitOrMobileSizedScreen" v-bind="sidebarMobileBindings" @closed="updateSideBarMenuIsExpanded(false)">
            <NavigationLenderSidebar :expanded="true" @menu:toggle="handleMenuToggle()"/>
        </BrightModalPopout>
        <BrightModalPopout
            id="notificationsPopout"
            label="Notifications"
            sub-label="Here are all of your notifications."
            :show="showNotifications"
            close-focus-i-d="notificationsButton"
            @closed="updateNotifications(false)"
        />
    </div>
</template>

<script>
import NavigationHeader from "@/components/navigation/header/NavigationHeader.vue";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout.vue";
import { MobileMixin } from "@/bright/mixins/global/MobileMixin.js";
import NavigationLenderSidebar from "./NavigationLenderSidebar.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import { mapState, mapActions } from "pinia";
import { useNavigationStore } from "@/stores/navigation";

export default {
    name: "NavigationLender",
    components: {
        BrightDropdownSelect,
        BrightCard,
        BrightLoader,
        NavigationLenderSidebar,
        BrightModalPopout,
        NavigationHeader,
    },
    mixins: [MobileMixin],
    data() {
        return {
            showSlot: false,
            loaderMarginTop: 128,
        };
    },
    computed: {
        ...mapState(useNavigationStore, {
            showNotifications: store => store.showNotifications,
            sidebarMenuIsExpanded: store => store.sidebarMenuIsExpanded,
            localActions: store => store.localActions,
            isLoading: store => store.isLoading,
        }),

        loaderBindings() {
            return {
                class: 'inline-block w-full text-center',
                style: 'margin-top: ' + this.loaderMarginTop + 'px',
                isLoading: this.isLoading,
            };
        },
        sidebarMobileBindings() {
            return {
                id: 'navigationLenderSidebarMobile',
                show: this.sidebarMenuIsExpanded && this.isPortraitOrMobileSizedScreen,
                closeFocusID: 'navigationLenderHeaderToggleSidebarMobileButton',
                from: 'left',
                disableMobileBreakpoint: true,
                simple: true,
            };
        },
        headerBindings() {
            const navigation = useNavigationStore();
            return {
                id: 'navigationLenderHeader',
                pageName: navigation.pageName,
                breadcrumbs: navigation.breadcrumbs,
                tabs: navigation.tabs,
                backBar: navigation.backBar,
                avatarName: navigation.avatarName,
                avatarImageSrc: navigation.avatarImageSrc,
                actions: [
                    { id: 'quickLinksButton', label: 'Get Quick Links', icon: 'share', disabled: true },
                    { id: 'notificationsButton', label: 'View Notifications', icon: 'notifications' },
                    { id: 'messagesButton', label: 'View and Send Messages', icon: 'email' },
                    { id: 'myAccountButton', label: 'View My Account or logout', icon: 'account_circle' },
                ],
                sidebarMenuIsExpanded: this.sidebarMenuIsExpanded && !this.isPortraitOrMobileSizedScreen,
            };
        },
        contentBindings() {
            return {
                class: {
                    'NavigationLender__Content': true,
                },
                style: {
                    'transition': 'margin-left 0.3s ease-in-out',
                    'margin-left': this.sidebarMenuIsExpanded && !this.isPortraitOrMobileSizedScreen ? '244px': '0',
                },
                rounded: false,
                bordered: false,
            };
        },
        isPortraitOrMobileSizedScreen() {
            return this.isMobile || this.isPortrait;
        },
    },
    watch: {
        // TODO Make this a page-driven method. Not all pages need to be scrolled to the top.
        isLoading: function(newValue) {
            if (newValue) {
                this.showSlot = false;
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            } else {
                this.showSlot = true;
            }
        },
        windowWidth: function() {
            this.calculateLoaderMarginTop();
        },
        headerBindings: {
            handler: function() {
                this.calculateLoaderMarginTop();
            },
            deep: true,
        },
    },
    mounted() {
        this.$nextTick(function () {
            this.calculateLoaderMarginTop();
        });
    },
    methods: {
        ...mapActions(useNavigationStore, [
            'updateSideBarMenuIsExpanded',
            'updateNotifications',
        ]),
        calculateLoaderMarginTop() {
            const heightOfLoader = 80 / 2;
            const marginTopOfHeader = parseInt(window.getComputedStyle(this.$refs.header.$el).getPropertyValue('height'));
            this.loaderMarginTop = ((window.innerHeight - marginTopOfHeader) / 2) - heightOfLoader;
        },
        handleMenuToggle() {
            const navigation = useNavigationStore();
            navigation.updateSideBarMenuIsExpanded(!this.sidebarMenuIsExpanded);
        },
    },
};
</script>
