<template>
    <BrightCard :bordered="false" class="AppPagePadding" no-padding>
        <BrightTable
            id="table"
            size="small"
            show-refresh-button
            row-class="hover:cursor-pointer"
            :show-vertical-divider="false"
            :show-horizontal-divider="false"
            :bordered="false"
            :columns="[
                { name: 'Status', key: 'status', filterable: true, sort: 'none', excludeFromSearch: true },
                { name: 'Name', key: 'name', cellClass: 'whitespace-no-wrap' },
                { name: 'Trigger', key: 'trigger', filterable: true, cellClass: 'whitespace-no-wrap', excludeFromSearch: true },
                { name: 'Purpose', key: 'purpose', filterable: true, excludeFromSearch: true },
                { name: 'Program', key: 'program', filterable: true, excludeFromSearch: true },
                { name: 'Category', key: 'category', filterable: true },
                { name: 'Priority', key: 'priority', excludeFromSearch: true },
                { name: 'Occupancy Type', key: 'occupancyType', hidden: true, filterable: true, excludeFromSearch: true },
            ]"
            :rows="loanConditions"
            :filters="[
                { columnKey: 'status', name: 'Status', pluralName: 'Status', operator: 'equalTo', value: ['Enabled'] },
                { columnKey: 'trigger', name: 'Trigger', pluralName: 'Triggers' },
                { columnKey: 'purpose', name: 'Purpose', pluralName: 'Purposes' },
                { columnKey: 'program', name: 'Program', pluralName: 'Product Programs' },
                { columnKey: 'category', name: 'Category', pluralName: 'Categories' },
                { columnKey: 'occupancyType', name: 'Occupancy Type', pluralName: 'Occupancy Types' },
            ]"
            searchable
            @refresh="getLoanConditions(true)"
            @row:click="handleRowClick"
        >
            <template v-slot:actions>
                <BrightButton
                    use="primary"
                    size="small"
                    icon="add"
                    icon-position="prefix"
                    @click="$router.push({
                        name: 'ManageLoanConditionAdd',
                    })"
                >
                    Add Condition
                </BrightButton>
            </template>
            <template v-slot:column:status="row">
                <BrightIcon
                    class="inline-block mr-12 align-middle"
                    use="lens"
                    :class="row.status === 'Enabled' ? 'text-green-500' : 'text-red-500'"
                />
                <div class="inline-block align-middle">{{ row.status }}</div>
            </template>
        </BrightTable>
    </BrightCard>
</template>

<script>
import { usePermissionsStore } from "@/stores/permissions";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import axios from "axios";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import { useNavigationStore } from "@/stores/navigation";
import { useLenderStore } from "@/stores/lender";

export default {
    name: "ViewLoanConditions",
    components: { BrightButton, BrightIcon, BrightTable, BrightCard },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            if (!permissions.hasPageVisitPermission('AdminConditions')) {
                vm.$router.push({ name: "UnAuthorized403", params: { '0': to.path } });
                return;
            }
            const navigation = useNavigationStore();
            navigation.updateNavigation({
                pageName: 'Loan Conditions',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
                tabs: [],
            });
            if (from.name.includes('ManageLoanCondition') || vm.loanConditions.length === 0) {
                vm.getLoanConditions();
            }
        });
    },
    data() {
        return {
            loanConditions: [],
        };
    },
    methods: {
        getLoanConditions(fromRefreshButton = false) {
            const lender = useLenderStore();
            const navigation = useNavigationStore();
            if (fromRefreshButton || this.loanConditions.length === 0) {
                navigation.startLoadingAnimation();
            }
            axios.get(`${lender.baseLenderURL}/loan-conditions`).then((response) => {
                this.loanConditions = response.data.data.map(loanCondition => {
                    const information = loanCondition.information;
                    const automaticTriggers = loanCondition.automaticTriggers;
                    return {
                        id: loanCondition.id,
                        status: information.isActive ? "Enabled" : "Disabled",
                        name: information.name,
                        trigger: automaticTriggers.isAutomatic ? 'Automatic' : 'Manual',
                        purpose: automaticTriggers.loanPurpose,
                        program: automaticTriggers.productProgram,
                        category: information.docType,
                        priority: information.type,
                        occupancyType: automaticTriggers.occupancyType,
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
                this.$router.push({
                    name: 'ManageLoanConditionEdit',
                    params: {
                        publicId: rowID.toString(),
                    },
                });
            } catch (e) {
                console.error('Row in Loan Conditions table does not have a id.');
            }
        },
    },
};
</script>

<style scoped>

</style>
