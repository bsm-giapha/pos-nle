<template>
    <BrightCard :bordered="false" class="AppPagePadding" no-padding>
        <div class="__typography--heading--3 text-grey-900">All Lead Sources</div>
        <div>
            <ViewLeadSourcesConfirmAction ref="viewLeadSourcesConfirmAction"/>
        </div>
        <BrightTable
            id="leadSourcesTable"
            size="small"
            show-refresh-button
            row-class="hover:cursor-pointer"
            :show-vertical-divider="false"
            :show-horizontal-divider="false"
            :bordered="false"
            :columns="[
                { name: 'Name', key: 'name', cellClass: 'whitespace-no-wrap' },
                { name: 'Value', key: 'value', cellClass: 'whitespace-no-wrap' },
                { name: '# of Loan Officers', key: 'numberOfLoanOfficers', type: 'number', sort: 'none', excludeFromSearch: true },
                { name: '# of Branches', key: 'numberOfBranches', type: 'number', sort: 'none', excludeFromSearch: true },
                { name: 'Actions', key: 'actions', sort: 'none', excludeFromSearch: true, align: 'center', headerClass: 'w-1/5' },
            ]"
            :rows="rows"
            :bulk-edit-actions="[
                { eventName: 'assignToAllLoanOfficers', action: 'Assign to all Loan Officers', icon: 'group_add' },
                { eventName: 'removeFromAllLoanOfficers', action: 'Remove from all Loan Officers', icon: 'group_off' },
                { eventName: 'assignToAllBranches', action: 'Assign to all Branches', icon: 'domain_add' },
                { eventName: 'removeFromAllBranches', action: 'Remove from all Branches', icon: 'domain_disabled' },
            ]"
            searchable
            :server-side-data="serverSideData"
            @refresh="getRefreshedRows"
            @page-update="getUpdatedPages"
            @search-update="getSearchedRows"
            @sort-update="getSortedRows"
            @row:click="handleRowClick"
            @assigntoallloanofficersbulkeditbutton:clicked="handleBulkEditActions"
            @removefromallloanofficersbulkeditbutton:clicked="handleBulkEditActions"
            @assigntoallbranchesbulkeditbutton:clicked="handleBulkEditActions"
            @removefromallbranchesbulkeditbutton:clicked="handleBulkEditActions"
        >
            <template v-slot:actions>
                <BrightButton
                    use="primary"
                    size="small"
                    icon="add"
                    icon-position="prefix"
                    @click="handleAddLeadSourceButtonClick"
                >
                    Add a Lead Source
                </BrightButton>
            </template>
            <template v-slot:column:actions="row">
                <BrightDropdownSelect
                    :id="row.id + '-Actions'"
                    class="inline-block"
                    tabindex="0"
                    :label="'View Actions for ' + row.name"
                    placeholder=""
                    hierarchy="tertiary"
                    icon="more_vert"
                    icon-position="center"
                    :button-full-width="false"
                    form-control="none"
                    dummy
                    hide-label
                    hide-arrow
                    rounded
                    :options="[
                        { label: 'Actions', options: getActionsOptions() },
                    ]"
                    @option:selected="handleRowAction($event, row)"
                    @click.stop
                />
            </template>
        </BrightTable>
    </BrightCard>
</template>

<script>
import { ResourceTableMixin } from "@/mixins/table/helpers/ResourceTableMixin";
import ViewLeadSourcesConfirmAction from "@/views/manage/lead-sources/components/ViewLeadSourcesConfirmAction.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { usePermissionsStore } from '@/stores/permissions';
import { useNavigationStore } from '@/stores/navigation';
import { useLenderStore } from '@/stores/lender';

export default {
    name: "ViewLeadSources",
    components: {
        ViewLeadSourcesConfirmAction,
        BrightButton,
        BrightCard,
        BrightDropdownSelect,
        BrightTable,
    },
    mixins: [ResourceTableMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            const navigation = useNavigationStore();
            if (!permissions.hasPageVisitPermission('AdminLeadSourcePricing')) {
                vm.$router.push({ name: "404", params: { '0': to.path } });
                return;
            }
            navigation.updateNavigation({
                pageName: 'Lead Sources',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage > Settings',
                },
            });
        });
    },
    data() {
        const lender = useLenderStore();
        return {
            baseResourceURL: `${lender.baseLenderURL}/lead-sources`,
        };
    },
    methods: {
        getRowData() {
            const navigation = useNavigationStore();
            navigation.startLoadingAnimation();
            Promise.all([
                axios.get(this.getResourceURL()),
            ]).then((response) => {
                this.serverSideData = _cloneDeep(response[0].data.__metadata__);
                this.setServerSideData();

                let responseData = response[0].data.data;
                this.rows = responseData.map(leadSource => {
                    const information = leadSource.information;
                    const assignments = leadSource.assignments;
                    return {
                        id: leadSource.id,
                        name: information.name,
                        value: information.value,
                        numberOfLoanOfficers: assignments.numberOfLoanOfficers,
                        numberOfBranches: assignments.numberOfBranches,
                        actions: '',
                    };
                });
            }).catch((error) => {
                console.error(error);
                this.handle500Errors();
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },

        handleAddLeadSourceButtonClick() {
            this.$router.push({
                name: 'ManageLeadSourceAdd',
            });
        },

        handleRowClick(rowID) {
            try {
                const leadSource = this.rows.find((element) => element.id === rowID);
                this.$router.push({
                    name: 'ManageLeadSourceEdit',
                    params: {
                        publicId: leadSource.id.toString(),
                    },
                });
            } catch (e) {
                console.error('Row in Lead Sources table does not have a id.');
            }
        },

        getActionsOptions() {
            return [
                { label: 'Edit', icon: 'edit', value: 'edit' },
                { label: 'Assign to all Loan Officers', icon: 'group_add', value: 'assignToAllLoanOfficers' },
                { label: 'Remove from all Loan Officers', icon: 'group_off', value: 'removeFromAllLoanOfficers' },
                { label: 'Assign to all Branches', icon: 'domain_add', value: 'assignToAllBranches' },
                { label: 'Remove from all Branches', icon: 'domain_disabled', value: 'removeFromAllBranches' },
                { label: 'Delete', icon: 'delete', value: 'delete' },
            ];
        },

        handleBulkEditActions(event) {
            this.handleAction(event.action, event.rowIDs);
        },

        handleRowAction(action, leadSource) {
            this.handleAction(action, [leadSource.id], leadSource.name);
        },

        handleAction(action, leadSourceIDs, leadSourceName = "") {
            const viewLeadSourcesConfirmAction = this.$refs.viewLeadSourcesConfirmAction;

            if (action !== 'edit') viewLeadSourcesConfirmAction.$_showModal();

            switch (action) {
                case 'assignToAllLoanOfficers':
                    viewLeadSourcesConfirmAction.$_assignToAllLoanOfficers(leadSourceIDs, leadSourceName);
                    break;
                case 'removeFromAllLoanOfficers':
                    viewLeadSourcesConfirmAction.$_removeFromAllLoanOfficers(leadSourceIDs, leadSourceName);
                    break;
                case 'assignToAllBranches':
                    viewLeadSourcesConfirmAction.$_assignToAllBranches(leadSourceIDs, leadSourceName);
                    break;
                case 'removeFromAllBranches':
                    viewLeadSourcesConfirmAction.$_removeFromAllBranches(leadSourceIDs, leadSourceName);
                    break;
                case 'delete':
                    viewLeadSourcesConfirmAction.$_delete(leadSourceIDs, leadSourceName);
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style scoped>

</style>
