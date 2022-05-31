<template>
    <div class="ViewExternalUsers">
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
                    @click="getExternalUsers(true)"
                >
                    <template v-slot:left>
                        <BrightAvatar class="mt-4" name="Leo Officer"/>
                    </template>
                </BrightCard>
            </div>
        </BrightCard>
        <BrightCard :bordered="false" class="AppPagePadding" no-padding>
            <div class="__typography--heading--3 text-grey-900">All External Users</div>
            <BrightTable
                id="table"
                size="small"
                show-refresh-button
                row-class="hover:cursor-pointer"
                :show-horizontal-divider="false"
                :bordered="false"
                :columns="[
                    { name: 'Account Status', key: 'accountStatus', hidden: true, filterable: true },
                    { name: 'First Name', key: 'firstName', cellClass: 'whitespace-no-wrap' },
                    { name: 'Last Name', key: 'lastName' },
                    { name: 'Contact', key: 'contact', excludeFromSearch: true },
                    { name: 'Email', key: 'email', hidden: true },
                    { name: 'Phone Number', key: 'phoneNumber', hidden: true },
                    { name: 'Agent Type', key: 'agentType', filterable: true },
                    { name: 'Company', key: 'company', filterable: true },
                    { name: 'Last Modified', key: 'lastModified', excludeFromSearch: true },
                    { name: 'Last Modified Date', key: 'lastModifiedDate', type: 'date', hidden: true, filterable: true, excludeFromSearch: true },
                ]"
                :rows="externalUsers"
                :filters="[{
                    columnKey: 'accountStatus',
                    name: 'Account Status',
                    pluralName: 'Account Status',
                    operator: 'equalTo',
                    value: ['Active'],
                }, {
                    columnKey: 'company',
                    name: 'Company',
                    pluralName: 'Companies',
                }, {
                    columnKey: 'agentType',
                    name: 'Agent Type',
                    pluralName: 'Agent Types',
                }, {
                    columnKey: 'lastModifiedDate',
                    name: 'Last Modified Date',
                }]"
                searchable
                @refresh="getExternalUsers(true)"
                @row:click="handleUserRowClick"
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
                <template v-slot:column:firstName="row">
                    <BrightAvatar
                        class="inline-block mr-12 align-middle"
                        :name="`${row.firstName} ${row.lastName}`"
                        color="grey"
                        light
                    />
                    <div class="inline-block align-middle">{{ row.firstName }}</div>
                </template>
                <template v-slot:column:lastName="row">
                    <strong>{{ row.lastName }}</strong>
                </template>
                <template v-slot:column:contact="row">
                    <div>{{ row.email }}</div>
                    <div>{{ row.phoneNumber }}</div>
                </template>
                <template v-slot:column:lastModified="row">
                    <div>{{ row.lastModifiedDate }}</div>
                    <div class="text-grey-500">{{ row.lastModifiedTime }}</div>
                </template>
            </BrightTable>
        </BrightCard>
    </div>
</template>

<script>
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import axios from "axios";
import { usePermissionsStore } from "@/stores/permissions";
import { useNavigationStore } from "@/stores/navigation";
import { useLenderStore } from "@/stores/lender";

export default {
    name: "ViewExternalUsers",
    components: {
        BrightButton,
        BrightAvatar,
        BrightTable,
        BrightCard,
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            const navigation = useNavigationStore();
            if (!permissions.hasPageVisitPermission('AdminUsers')) {
                vm.$router.push({ name: "UnAuthorized403", params: { '0': to.path } });
                return;
            }
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
            if (from.name.includes('ManageExternalUser') || vm.externalUsers.length === 0) {
                vm.getExternalUsers();
            }
        });
    },
    data() {
        return {
            externalUsers: [],
        };
    },
    methods: {
        getExternalUsers(fromRefreshButton = false) {
            const lender = useLenderStore();
            const navigation = useNavigationStore();
            if (fromRefreshButton || this.externalUsers.length === 0) {
                navigation.startLoadingAnimation();
            }
            axios.get(`${lender.baseLenderURL}/external-users`).then((response) => {
                this.externalUsers = response.data.data.map((row) => {
                    return {
                        id: row.id,

                        accountStatus: row.accountStatus ? 'Active' : 'Inactive',
                        firstName: row.firstName,
                        lastName: row.lastName,

                        contact: '',
                        email: row.email,
                        phoneNumber: row.phoneNumber,

                        agentType: row.agentType,
                        company: row.company,

                        lastModified: '',
                        lastModifiedDate: row.lastModified.date,
                        lastModifiedTime: row.lastModified.time,
                    };
                });
            }).catch((error) => {
                console.error(error);
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },
        handleUserRowClick(rowID) {
            try {
                const user = this.externalUsers.find((element) => element.id === rowID);
                this.$router.push({
                    name: 'ManageExternalUserEdit',
                    params: {
                        publicId: user.id,
                    },
                });
            } catch (e) {
                console.error('Row in External Users table does not have a public ID.');
            }
        },
        handleAddUserButtonClick() {
            this.$router.push({
                name: 'ManageExternalUserAdd',
            });
        },
    },
};
</script>
