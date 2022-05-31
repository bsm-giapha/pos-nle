<template>
    <BrightCard :bordered="false" class="AppPagePadding" no-padding>
        <div class="__typography--heading--3 text-grey-900">All Roles</div>
        <BrightCard>
            <BrightInputList
                id="roles"
                label="All Roles"
                v-bind="inputListBindings"
                items-are-clickable
                :item-actions="[
                    { value: 'view-history', icon: 'history', label: 'History' },
                ]"
                :items="roles"
                @view-history="handleViewHistory"
                @item-click="handleItemClick"
            >
                <template v-slot:primary-label="role">
                    {{ role.name }}
                </template>
                <template v-slot:secondary-label="role">
                    {{ role.numberOfUsers }} {{ pluralize('user', role.numberOfUsers) }}
                </template>
            </BrightInputList>
        </BrightCard>
    </BrightCard>
</template>

<script>
import { usePermissionsStore } from "@/stores/permissions";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList.vue";
import axios from "axios";
import { useNavigationStore } from "@/stores/navigation";
import { useLenderStore } from "@/stores/lender";

export default {
    name: 'ViewRoles',
    components: { BrightInputList, BrightCard },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            if (!permissions.canEditRoles) {
                vm.$router.push({ name: "UnAuthorized403", params: { '0': to.path } });
                return;
            }
            const navigation = useNavigationStore();
            navigation.updateNavigation({
                pageName: 'Roles',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
            });
            if (from.name.includes('ManageRole') || vm.roles.length === 0) {
                vm.getRoles();
            }
        });
    },
    data() {
        return {
            //TODO: In the near future, we will get this data directly from the store instead of holding it in local component data
            roles: [],
            currentSort: 'name-asc',
        };
    },
    computed: {
        inputListBindings() {
            return {
                showSortButton: true,
                sortOptions: [
                    { value: 'name-asc', label: 'Alphabetical (A to Z)', sort: this.compareNamesAscending },
                    { value: 'name-desc', label: 'Alphabetical (Z to A)', sort: this.compareNamesDescending },
                    { value: 'number-of-users-desc', label: '# of Users (Most on Top)', sort: this.compareNumberOfUsersDescending },
                    { value: 'number-of-users-asc', label: '# of Users (Least on Top)', sort: this.compareNumberOfUsersAscending },
                ],
                currentSort: this.currentSort,
            };
        },
    },
    methods: {
        getRoles(fromRefreshButton = false) {
            const navigation = useNavigationStore();
            const lender = useLenderStore();
            if (fromRefreshButton || this.roles.length === 0) {
                navigation.startLoadingAnimation();
            }
            axios.get(`${lender.baseLenderURL}/roles`).then((response) => {
                this.roles = response.data.data.map(role => {
                    return {
                        id: role.id,
                        name: role.name,
                        numberOfUsers: role.numberOfUsers,
                    };
                });
            }).catch(error => {
                console.error(error);
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },
        compareNamesAscending(roleA, roleB) {
            const nameA = roleA.name.toLowerCase();
            const nameB = roleB.name.toLowerCase();

            return nameA.localeCompare(nameB);
        },
        compareNamesDescending(roleA, roleB) {
            return -this.compareNamesAscending(roleA, roleB);
        },
        compareNumberOfUsersAscending(roleA, roleB) {
            return roleA.numberOfUsers - roleB.numberOfUsers;
        },
        compareNumberOfUsersDescending(roleA, roleB) {
            return -this.compareNumberOfUsersAscending(roleA, roleB);
        },
        pluralize(word, count) {
            if (count === 1) {
                return word;
            }
            return `${word}s`;
        },
        handleItemClick(publicId) {
            this.$router.push({
                name: 'ManageRoleEdit',
                params: {
                    publicId: publicId,
                },
            });
        },
        handleViewHistory(e) {
            const rolePublicId = e[0];

            //Workaround to open new tab outside of path base
            const a = document.createElement('a');
            a.href = `/lender/admin/roles/history/${rolePublicId}`;
            a.target= '_blank';
            a.click();
        },
    },
};
</script>
