import { defineStore } from "pinia";

export const useNavigationStore = defineStore({
    id: 'navigation',
    state: () => {
        return {
            pageName: '',
            breadcrumbs: {},
            tabs: [],
            localActions: [],
            backBar: {},
            isLoading: true,
            avatarName: '',
            avatarImageSrc: '',
            showNotifications: false,
            sidebarMenuIsExpanded: true,
        };
    },
    getters: {},
    actions: {
        /**
         * Use this if the <slot> in <NavigationLender> doesn't show on pages that load too quickly.
         */
        fakeLoadingAnimation() {
            this.startLoadingAnimation();
            window.setTimeout(() => {
                this.stopLoadingAnimation();
            }, 50);
        },
        startLoadingAnimation() {
            this.isLoading = true;
        },
        stopLoadingAnimation() {
            this.isLoading = false;
        },
        updateNavigation(payload) {
            this.backBar = ('backBar' in payload) ? payload.backBar : {};
            this.localActions = ('localActions' in payload) ? payload.localActions : {};
            this.breadcrumbs = ('breadcrumbs' in payload) ? payload.breadcrumbs : {};
            this.tabs = ('tabs' in payload) ? payload.tabs : [];
            this.updateAvatar(payload);
            this.updatePageName(payload.pageName);
        },
        updatePageName(payload) {
            this.pageName = payload;
        },
        updateAvatar(payload) {
            this.avatarName = ('avatarName' in payload) ? payload.avatarName : '';
            this.updateAvatarImageSrc = ('updateAvatarImageSrc' in payload) ? payload.updateAvatarImageSrc : '';
        },
        updateNotifications(payload) {
            this.showNotifications = payload;
        },
        updateSideBarMenuIsExpanded(payload) {
            this.sidebarMenuIsExpanded = payload;
        },
    },
});
