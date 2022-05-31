<template>
    <div class="ViewInternalUsers">
        <BrightCard
            class="AppPagePadding bg-grey-50 z-0"
            no-padding
            :bordered="false"
            :rounded="false"
        >
            <div class="mb-16 __typography--heading--5 text-grey-900">Recently Viewed</div>
            <div>
                <BrightCard
                    class="inline-block"
                    label="Leo Larry Officer"
                    sub-label="Admin / Loan Officer"
                    size="small"
                    :bordered="false"
                    raised
                >
                    <template v-slot:left>
                        <BrightAvatar class="mt-4" name="Leo Officer"/>
                    </template>
                </BrightCard>
            </div>
        </BrightCard>
        <BrightCard :bordered="false" class="AppPagePadding" no-padding>
            <div class="__typography--heading--3 text-grey-900">All Internal Users</div>
            <BrightTable
                id="internalUsersTable"
                size="small"
                show-refresh-button
                row-class="hover:cursor-pointer"
                :show-horizontal-divider="false"
                :bordered="false"
                :columns="[
                    { name: 'Account Status', key: 'accountStatus', filterable: true, excludeFromSearch: true, sort: 'none', headerClass: 'w-1/12' },
                    { name: 'First Name', key: 'firstName', cellClass: 'whitespace-no-wrap' },
                    { name: 'Last Name', key: 'lastName', sort: 'asc' },
                    { name: 'Role', key: 'role', filterable: true },
                    { name: 'Branch Name', key: 'branchName', filterable: true, hidden: true },
                    { name: 'Branch', key: 'primaryBranchName', excludeFromSearch: true },
                    { name: 'Contact', key: 'contact', excludeFromSearch: true, sort: 'none' },
                    { name: 'Email', key: 'email', hidden: true },
                ]"
                :rows="rows"
                :filters="[
                    { columnKey: 'accountStatus', name: 'Account Status', pluralName: 'Account Status', operator: 'equalTo', value: ['Active'] },
                    { columnKey: 'role', name: 'Role', pluralName: 'Roles' },
                    { columnKey: 'branchName', name: 'Branch Name', pluralName: 'Branches' },
                ]"
                :bulk-edit-actions="[
                    { eventName: 'assigntoteam', action: 'Assign To Team', icon: 'assignment' },
                    { eventName: 'changerole', action: 'Change Role', icon: 'star' },
                ]"
                :rows-per-page-options="[25, 50, 100]"
                searchable
                :server-side-data="serverSideData"
                @refresh="getRefreshedRows"
                @page-update="getUpdatedPages"
                @filter-update="getFilteredRows"
                @search-update="getSearchedRows"
                @sort-update="getSortedRows"
                @row:click="handleUserRowClick"
                @assigntoteambulkeditbutton:clicked="handleBulkEditActions"
                @changerole:clicked="handleBulkEditActions"
            >
                <template v-slot:actions>
                    <BrightButton
                        use="primary"
                        size="small"
                        icon="add"
                        icon-position="prefix"
                        @click="handleAddUserButtonClick"
                    >
                        Add User
                    </BrightButton>
                </template>
                <template v-slot:column:accountStatus="row">
                    <BrightTag :label="isActive(row.accountStatus) ? 'Active' : 'Inactive'" :color="isActive(row.accountStatus) ? 'green' : 'red'"/>
                </template>
                <template v-slot:column:firstName="row">
                    <BrightAvatar
                        class="inline-block mr-12 align-middle"
                        :name="row.firstName + ' ' + row.lastName"
                        color="grey"
                        light
                    />
                    <div class="inline-block align-middle">{{ row.firstName }}</div>
                </template>
                <template v-slot:column:lastName="row">
                    <strong>{{ row.lastName }}</strong>
                </template>
                <template v-slot:column:primaryBranchName="row">
                    <div :class="row.primaryBranchName === 'None' ? '__typography--body--xs text-grey-500 mb-0' : ''">{{ row.primaryBranchName }}</div>
                    <div class="__typography--body--xs text-grey-500 mb-0">{{ row.numberOfSecondaryBranches > 0 ? `and ${row.numberOfSecondaryBranches} more` : '' }}</div>
                </template>
                <template v-slot:column:contact="row">
                    <a :href="'mailto:' + row.email" target="_blank" @click.stop><div>{{ row.email }}</div></a>
                    <div>{{ row.phoneNumber }}</div>
                </template>
            </BrightTable>
        </BrightCard>
    </div>
</template>

<script>
import { usePermissionsStore } from "@/stores/permissions";
import { ResourceTableMixin } from "@/mixins/table/helpers/ResourceTableMixin.js";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightTag from "@/bright/components/core-library/tag/BrightTag.vue";
import _cloneDeep from "lodash/cloneDeep.js";
import axios from "axios";
import { useNavigationStore } from "@/stores/navigation";
import { useLenderStore } from "@/stores/lender";

export default {
    name: "ViewInternalUsers",
    components: {
        BrightAvatar,
        BrightButton,
        BrightCard,
        BrightTable,
        BrightTag,
    },
    mixins: [ResourceTableMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            if (!permissions.hasPageVisitPermission('AdminUsers')) {
                vm.$router.push({ name: "NotFound404", params: { '0': to.path } });
                return;
            }
            const navigation = useNavigationStore();
            navigation.updateNavigation({
                pageName: 'Users',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
                tabs: [
                    { to: { name: 'ManageInternalUsers' }, label: 'Internal Users' },
                    { to: { name: 'ManageExternalUsers' }, label: 'External Agents' },
                ],
            });
        });
    },
    data() {
        const lender = useLenderStore();
        return {
            baseResourceURL: `${lender.baseLenderURL}/internal-users`,
        };
    },
    methods: {
        handleBulkEditActions() {
            // TODO: Handle bulk edit actions here.
        },

        handleUserRowClick(rowID) {
            try {
                const user = this.rows.find((element) => element.id === rowID);
                this.$router.push({
                    name: 'ManageInternalUserEdit',
                    params: {
                        publicId: user.id,
                    },
                });
            } catch (e) {
                console.error('Row in Internal Users table does not have a public ID.');
            }
        },

        getRowData() {
            const navigation = useNavigationStore();
            navigation.startLoadingAnimation();
            Promise.all([
                axios.get(this.getResourceURL()),
            ]).then((response) => {
                this.serverSideData = _cloneDeep(response[0].data.__metadata__);
                this.setServerSideData();

                let responseData = response[0].data.data;
                this.rows = responseData.map(internalUser => {
                    const account = internalUser.account;
                    const assignments = internalUser.assignments;
                    return {
                        accountStatus: account.accountStatus ? "Active" : "Inactive",
                        id: internalUser.id,
                        firstName: account.firstName,
                        lastName: account.lastName,
                        role: assignments.role.name,
                        branchName: assignments.branches,
                        primaryBranchName: assignments.primaryBranch?.name ?? "None",
                        numberOfSecondaryBranches: (assignments.branches.length - 1) > 0 ? assignments.branches.length - 1 : 0,
                        email: account.email,
                        phoneNumber: account.phoneNumber + ((account.phoneExtension.length > 0) ? " ext. " + account.phoneExtension : ""),
                        contact: "",
                    };
                });
            }).catch((error) => {
                console.error(error);
                this.handle500Errors();
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },

        setFilterServerSideData() {
            const lender = useLenderStore();
            this.serverSideData.filter = {};
            this.serverSideData.filter.accountStatus = [{ name: 'Active' }, { name: 'Inactive' }];
            this.serverSideData.filter.branchName = lender.branches.map(branch => branch.information);
            this.serverSideData.filter.role = lender.roles;
        },

        handleAddUserButtonClick() {
            this.$router.push({
                name: 'ManageInternalUserAdd',
            });
        },

        isActive(status) {
            return status === 'Active';
        },
    },
};
</script>
