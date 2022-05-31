<template>
    <NavigationSidebar :expanded="expanded">
        <div class="py-16">
            <NavigationSidebarItem label="Dashboard" icon="dashboard" disabled/>
        </div>

        <div class="Divider"></div>

        <NavigationSidebarGroup label="Origination">
            <NavigationSidebarItem label="New Application" icon="create_new_folder" href="/lender/new-application/campaigns"/>
            <NavigationSidebarItem label="Pipeline" icon="format_list_bulleted" href="/lender/pipeline"/>
            <NavigationSidebarItem label="Pricing" icon="monetization_on" href="/lender/pricing"/>
        </NavigationSidebarGroup>

        <div class="Divider"></div>

        <NavigationSidebarGroup label="Manage">
            <!-- <NavigationSidebarItem
                v-if="hasPageVisitPermission('AdminUsers')"
                label="Users"
                icon="supervisor_account"
                :to="{ name: 'ManageInternalUsers' }"
            />
            <NavigationSidebarItem
                v-if="canSeeLinkToRolesPage"
                label="Roles & Permissions"
                icon="assignment_ind"
                :to="{ name: 'ManageRoles' }"
            />
            <NavigationSidebarItem
                v-if="hasPageVisitPermission('AdminBranches') || hasPageVisitPermission('ManageLenderTeams')"
                label="Hierarchy"
                icon="device_hub"
                :to="{ name: hasPageVisitPermission('AdminBranches') ? 'ManageHierarchyBranches' : 'ManageHierarchyTeams' }"
            />
            <NavigationSidebarItem
                v-if="hasPageVisitPermission('AdminCampaigns')"
                label="Campaigns"
                icon="star"
                :to="{ name: 'ManageCampaigns' }"
            />
            <NavigationSidebarItem label="Integrations" icon="group_work"/> -->
            <NavigationSidebarItem
                v-if="hasAnySettingsPageVisitPermissions"
                label="Settings"
                icon="settings"
                :to="{ name: 'ManageSettings' }"
            />
        </NavigationSidebarGroup>

        <div class="Divider"></div>

        <div class="mt-16">
            <NavigationSidebarItem label="Reporting" icon="insert_chart"/>
            <NavigationSidebarItem label="Resources" icon="import_contacts"/>
            <NavigationSidebarItem label="Support" icon="help"/>
            <NavigationSidebarItem label="Logout" icon="exit_to_app" @click="showLogoutModal = true"/>
        </div>

        <BrightModalPopup
            id="LogoutPopupModal"
            close-focus-i-d=""
            width="medium"
            label="Logout Confirmation"
            sub-label="Are you sure you want to logout? Any unsaved progress will be lost."
            :show="showLogoutModal"
            @closed="handleLogoutCancel"
        >
            <template v-slot:footer>
                <div class="block tablet:flex">
                    <BrightButton
                        class="block w-full tablet:flex-1"
                        :disabled="disableButtonsInLogoutModal"
                        use="primary"
                        @click="handleLogoutCancel"
                        @keydown.space.enter.prevent="handleLogoutCancel"
                    >
                        Stay Logged In
                    </BrightButton>
                    <BrightButton
                        class="block w-full mr-0 mb-8 tablet:flex-1 tablet:mr-8 tablet:mb-0"
                        :disabled="disableButtonsInLogoutModal"
                        use="secondary"
                        @click="handleLogout"
                        @keydown.space.enter="handleLogout"
                    >
                        Logout
                    </BrightButton>
                </div>
            </template>
        </BrightModalPopup>
    </NavigationSidebar>
</template>

<script>
import NavigationSidebar from "./sidebar/NavigationSidebar.vue";
import NavigationSidebarGroup from "./sidebar/NavigationSidebarGroup.vue";
import NavigationSidebarItem from "./sidebar/NavigationSidebarItem.vue";
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";
import { mapState } from "pinia";
import axios from "axios";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import { usePermissionsStore } from "@/stores/permissions";

export default {
    name: "NavigationLenderSidebar",
    components: {
        BrightButton,
        BrightModalPopup,
        NavigationSidebar,
        NavigationSidebarGroup,
        NavigationSidebarItem,
    },
    inheritAttrs: true,
    props: {
        expanded: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    data() {
        return {
            showLogoutModal: false,
            disableButtonsInLogoutModal: false,
        };
    },
    computed: {
        ...mapState(usePermissionsStore, {
            hasPageVisitPermission: store => store.hasPageVisitPermission,
            canEditRoles: store => store.canEditRoles,
            hasAnySettingsPageVisitPermissions: store => store.hasAnySettingsPageVisitPermissions,
        }),
        canSeeLinkToRolesPage(state) {
            return this.canEditRoles && state.lender.wholesaleLenderID !== 'TVDG4JDI';
        },
    },
    methods: {
        handleLogout() {
            this.disableButtonsInLogoutModal = true;
            axios.post('/logout').then(() => {
                this.showLogoutModal = false;
                this.disableButtonsInLogoutModal = false;
                window.location.replace('/login'); // This will clear the state of the store and any components/forms; this is done on purpose to avoid exposing any lingering data
            });
        },
        handleLogoutCancel() {
            this.showLogoutModal = false;
        },
    },
};
</script>
