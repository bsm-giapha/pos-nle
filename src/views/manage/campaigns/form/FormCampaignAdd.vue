<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <PanelStatus v-bind="bindDescendant"/>
        <PanelAbout v-bind="bindDescendant"/>
        <PanelAssignments v-bind="bindDescendant"/>
        <PanelCampaign v-bind="bindDescendant"/>
        <PanelApplication v-bind="bindDescendant"/>
        <PanelAssets v-bind="bindDescendant"/>
        <PanelConfigurationsCredit v-bind="bindDescendant"/>
        <PanelIncomeAndExpenses v-bind="bindDescendant"/>
        <PanelLiabilities v-bind="bindDescendant"/>
        <PanelProductAndPricing v-bind="bindDescendant"/>
        <PanelProperty v-bind="bindDescendant"/>
        <PanelVerificationAndImportOfData v-bind="bindDescendant"/>
    </FormWrapper>
</template>

<script>
import PanelStatus from "@/views/manage/campaigns/form/tabs/information/PanelStatus.vue";
import PanelAbout from "@/views/manage/campaigns/form/tabs/information/PanelAbout.vue";
import PanelAssignments from "@/views/manage/campaigns/form/tabs/information/PanelAssignments.vue";
import PanelCampaign from "@/views/manage/campaigns/form/tabs/configurations/PanelCampaign.vue";
import PanelApplication from "@/views/manage/campaigns/form/tabs/configurations/PanelApplication.vue";
import PanelAssets from "@/views/manage/campaigns/form/tabs/configurations/PanelAssets.vue";
import PanelConfigurationsCredit from "@/views/manage/campaigns/form/tabs/configurations/PanelConfigurationsCredit.vue";
import PanelIncomeAndExpenses from "@/views/manage/campaigns/form/tabs/configurations/PanelIncomeAndExpenses.vue";
import PanelLiabilities from "@/views/manage/campaigns/form/tabs/configurations/PanelLiabilities.vue";
import PanelProductAndPricing from "@/views/manage/campaigns/form/tabs/configurations/PanelProductAndPricing.vue";
import PanelProperty from "@/views/manage/campaigns/form/tabs/configurations/PanelProperty.vue";
import PanelVerificationAndImportOfData from "@/views/manage/campaigns/form/tabs/configurations/PanelVerificationAndImportOfData.vue";
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "@/views/manage/campaigns/form/FormCampaign.schema.js";
import axios from "axios";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "FormCampaignAdd",
    components: { PanelStatus, PanelAbout, PanelAssignments, PanelCampaign, PanelApplication, PanelAssets, PanelConfigurationsCredit, PanelIncomeAndExpenses, PanelLiabilities, PanelProductAndPricing, PanelProperty, PanelVerificationAndImportOfData },
    mixins: [FormAncestorMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.beforeRouteEnterGuard();
        });
    },
    beforeRouteLeave(to, from) {
        return this.beforeRouteLeaveGuard(to, from);
    },
    data() {
        return this.getInitialDataFromSchema(Schema, 'add');
    },
    computed: {
        id() {
            return 'FormCampaignAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/campaigns`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminCampaigns');
        },
    },
    methods: {
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];

            const fetchFormFields = axios.get(`${this.lenderBaseUrl}/campaigns/form-fields`).then(response => {
                response = response.data.data;
                this.formFields = {
                    ...this.formFields,
                    ...response,
                };
            });
            if (Object.keys(this.formFields).length === 0) promises.push(fetchFormFields);

            const fetchExternalUsers = lender.fetchExternalUsers();
            if (lender.externalUsers.length === 0) promises.push(fetchExternalUsers);

            const fetchLoanOfficers = lender.fetchLoanOfficers();
            if (lender.loanOfficers.length === 0) promises.push(fetchLoanOfficers);

            const fetchLeadSources = lender.fetchLeadSources();
            if (lender.leadSources.length === 0) promises.push(fetchLeadSources);

            return promises;
        },

        updateSchemaWithFetchedRequiredData() {
            const lender = useLenderStore();

            let getAssignedSellingAgentSelectDropdownOptions = (values) => {
                let list = [{ label: 'Unassigned', value: '' }];
                values.forEach(item => {
                    list.push({
                        label: `${item.firstName} ${item.lastName}`,
                        value: item.id,
                    });
                });
                return list;
            };

            let getAssignedLeadSourceSelectDropdownOptions = (values) => {
                let list = [{ label: 'Unassigned', value: '' }];
                values.forEach(item => {
                    list.push({
                        label: item.information.name,
                        value: item.information.value,
                    });
                });
                return list;
            };

            let externalUsersWithUnassignedOption = getAssignedSellingAgentSelectDropdownOptions(lender.externalUsers);
            let leadSourcesWithUnassignedOption = getAssignedLeadSourceSelectDropdownOptions(lender.leadSources);

            this.updateBaselineSchema('information.loanOfficerAssignment', 'options', this.formFields.loanOfficerAssignmentValues);
            this.updateBaselineSchema('information.assignedSellingAgentID', 'options', externalUsersWithUnassignedOption);
            this.updateBaselineSchema('information.assignedLeadSource', 'options', leadSourcesWithUnassignedOption);
            this.updateBaselineSchema('configurations.applicationScope', 'options', this.formFields.applicationTypes);
            this.updateBaselineSchema('configurations.defaultPropertyTypeForTBD', 'options', this.formFields.defaultPropertyTypesForTBDLoans);
        },

        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Add Campaign',
                breadcrumbs: {
                    to: { name: 'ManageCampaigns' },
                    label: 'Manage > Campaigns > Campaign',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageCampaigns' },
                    label: 'Campaigns',
                },
                localActions: [],
            });
        },

        formSubmitSuccessHandler() {
            this.$router.push({
                name: 'ManageCampaignAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    campaignName: this.formDataCurrent.information.name,
                },
            });
        },
    },
};
</script>
