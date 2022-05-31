import { defineStore } from "pinia";
import { commonUpdate, commonUpsert } from "@/stores/common/actions";
import axios from "axios";
import { useLenderStore } from "@/stores/lender";
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser";

export const usePermissionsStore = defineStore({
    id: 'permissions',
    state: () => {
        return {
            ardent: {}, // Permissions that are synced back from Ardent requests
            subroles: [],
            general: [],
            pageVisit: [],
            sideMenu: [],
            loan: [],
        };
    },
    getters: {
        ardentCanReadResource() {
            return (permissionKey) => (permissionKey in this.ardent) ? this.ardent[permissionKey].canRead : false;
        },
        ardentCanUpdateResource() {
            return (permissionKey) => (permissionKey in this.ardent) ? this.ardent[permissionKey].canUpdate : false;
        },
        ardentCanDeleteResource() {
            return (permissionKey) => (permissionKey in this.ardent) ? this.ardent[permissionKey].canDelete : false;
        },
        ardentCanCreateOrPostResource() {
            return (permissionKey) => (permissionKey in this.ardent) ? this.ardent[permissionKey].canCreateOrPOST : false;
        },
        hasGeneralPermission() {
            return (permissionKey) => this.general.includes(permissionKey);
        },
        hasPageVisitPermission() {
            return (permissionKey) => this.pageVisit.includes(permissionKey);
        },
        hasSideMenuPermission() {
            return (permissionKey) => this.sideMenu.includes(permissionKey);
        },
        hasAnySettingsPageVisitPermissions() {
            return this.pageVisit.some((pageVisitPermission) => {
                return pageVisitPermission.includes('Admin') || pageVisitPermission.includes('Manage');
            });
        },
        hasSubrole() {
            return (subrole) => this.subroles.includes(subrole);
        },
        canEditRoles() {
            const lender = useLenderStore();
            return this.hasSubrole('Admin') && !lender.isBroker;
        },
    },
    actions: {
        update(payload) {
            commonUpdate(this, payload);
        },
        upsert(payload) {
            commonUpsert(this, payload);
        },
        upsertManyArdentPermissions(payload) {
            this.upsert({ ardent: payload });
        },
        async fetchPermissions() {
            const lender = useLenderStore();
            const authenticatedUser = useAuthenticatedUserStore();
            return axios.get(`${lender.baseLenderURL}/internal-users/${authenticatedUser.id}/permissions`)
                .then(response => {
                    const permissions = response.data.data;
                    this.update({
                        subroles: permissions.subroles,
                        general: permissions.general,
                        pageVisit: permissions.pageVisit,
                        sideMenu: permissions.sideMenu,
                    });
                });
        },
    },
});
