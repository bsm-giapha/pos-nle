<template>
    <BrightCard :bordered="false" class="AppPagePadding" no-padding>
        <div class="__typography--heading--3 text-grey-900">All Branches</div>
        <BrightTable
            id="table"
            size="small"
            show-refresh-button
            row-class="hover:cursor-pointer"
            :show-vertical-divider="false"
            :show-horizontal-divider="false"
            :bordered="false"
            :columns="[
                { name: 'Status', key: 'branchStatus', hidden: true, filterable: true },
                { name: 'ID', key: 'id' },
                { name: 'Name', key: 'name', cellClass: 'whitespace-no-wrap' },
                { name: 'Contact', key: 'contact', excludeFromSearch: true },
                { name: 'Street', key: 'street', hidden: true },
                { name: 'City', key: 'city', hidden: true, filterable: true },
                { name: 'State', key: 'state', hidden: true, filterable: true },
                { name: 'Zipcode', key: 'zipcode', hidden: true, filterable: true },
                { name: 'Phone Number', key: 'phoneNumber', hidden: true },
                { name: 'Last Modified', key: 'lastModifiedDate' },
            ]"
            :rows="branches"
            :filters="[
                { columnKey: 'branchStatus', name: 'Status', pluralName: 'Status', operator: 'equalTo', value: ['Active'] },
                { columnKey: 'city', name: 'City', pluralName: 'Cities' },
                { columnKey: 'state', name: 'State', pluralName: 'States' },
                { columnKey: 'zipcode', name: 'Zipcode', pluralName: 'Zipcodes' },
            ]"
            searchable
            @refresh="getBranches(true)"
            @row:click="handleRowClick"
        >
            <template v-slot:actions>
                <BrightButton
                    use="primary"
                    size="small"
                    icon="add"
                    icon-position="prefix"
                    @click="handleAddBranchButtonClick"
                >
                    Add Branch
                </BrightButton>
            </template>
            <template v-slot:column:name="row">
                <BrightAvatar
                    class="inline-block mr-12 align-middle"
                    src=""
                    :name="row.displayNamePreferred ? row.displayNamePreferred : row.name"
                    color="grey"
                    light
                />
                <div class="inline-block align-middle">{{ row.name }}</div>
            </template>
            <template v-slot:column:contact="row">
                <div>{{ `${row.street} ${row.city}, ${row.state} ${row.zipcode}` }}</div>
                <div>{{ row.phoneNumber }}</div>
            </template>
            <template v-slot:column:lastModifiedDate="row">
                <div>{{ row.lastModifiedDate }}</div>
                <div class="text-grey-500">{{ row.lastModifiedTime }}</div>
            </template>
        </BrightTable>
    </BrightCard>
</template>



<script>
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import axios from "axios";
import { mapState } from 'pinia';
import { usePermissionsStore } from '@/stores/permissions';
import { useNavigationStore } from '@/stores/navigation';
import { useLenderStore } from '@/stores/lender';

export default {
    name: "ViewBranches",
    components: { BrightAvatar, BrightCard, BrightTable, BrightButton },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            const navigation = useNavigationStore();
            if (!permissions.hasPageVisitPermission('AdminBranches')) {
                vm.$router.push({ name: "404", params: { '0': to.path } });
                return;
            }
            navigation.updateNavigation({
                pageName: 'Branches',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
            });
            if (from.name.includes('ManageBranch') || vm.branches.length === 0) {
                vm.getBranches();
            }
        });
    },
    data() {
        return {
            branches: [],
        };
    },
    computed: {
        ...mapState(usePermissionsStore, {
            hasPageVisitPermission: store => store.hasPageVisitPermission,
        }),
    },
    methods: {
        getBranches(fromRefreshButton = false) {
            const lender = useLenderStore();
            const navigation = useNavigationStore();
            if (fromRefreshButton || this.branches.length === 0) {
                navigation.startLoadingAnimation();
            }
            axios.get(`${lender.baseLenderURL}/branches`).then((response) => {
                this.branches = response.data.data.map(branch => {
                    const information = branch.information;
                    return {
                        id: branch.id,
                        name: information.name,
                        preferredDisplayName: information.preferredDisplayName ? information.preferredDisplayName : '',
                        branchStatus: information.status ? "Active" : "Inactive",
                        phoneNumber: information.phoneNumber ? information.phoneNumber : '',
                        street: information.address.streetAddress1,
                        city: information.address.city,
                        state: information.address.state,
                        zipcode: information.address.zip,
                        contact: "",
                        lastModified: '',
                        lastModifiedDate: information.lastModifiedDate.date,
                        lastModifiedTime: information.lastModifiedDate.time,
                    };
                });
            }).catch(error => {
                console.error(error);
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },
        handleRowClick(rowID) {
            try {
                const branch = this.branches.find((element) => element.id === rowID);
                this.$router.push({
                    name: 'ManageBranchEdit',
                    params: {
                        publicId: branch.id,
                    },
                });
            } catch (e) {
                console.error('Row in Branches table does not have a public ID.');
            }
        },
        handleAddBranchButtonClick() {
            this.$router.push({
                name: 'ManageBranchAdd',
            });
        },
    },
};
</script>
