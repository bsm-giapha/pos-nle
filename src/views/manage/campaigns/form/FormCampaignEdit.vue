<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" v-bind="bindDescendant"/>
            </keep-alive>
        </router-view>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "./FormCampaign.schema.js";
import axios from "axios";
import _mapValues from "lodash/mapValues";
import { useLenderStore } from '@/stores/lender.js';

export default {
    name: "FormCampaignEdit",
    mixins: [FormAncestorMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.beforeRouteEnterGuard();
        });
    },
    beforeRouteLeave(to, from) {
        return this.beforeRouteLeaveGuard(to, from);
    },
    props: {
        publicId: {
            type: String,
            required: true,
        },
    },
    data() {
        return this.getInitialDataFromSchema(Schema, 'edit');
    },
    computed: {
        id() {
            return 'FormCampaignEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/campaigns/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminCampaigns');
        },

        campaignName() {
            return `${this.formDataCurrent.information.name}`;
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

            let getDefaultLoanTemplateSelectDropdownOptions = (values) => {
                let list = [];
                _mapValues(values, (value) => list.push({
                    label: value,
                    value: value,
                }));
                return list;
            };

            let externalUsersWithUnassignedOption = getAssignedSellingAgentSelectDropdownOptions(lender.externalUsers);
            let leadSourcesWithUnassignedOption = getAssignedLeadSourceSelectDropdownOptions(lender.leadSources);
            let losLoanTemplatesForPurchase = getDefaultLoanTemplateSelectDropdownOptions(lender.losLoanTemplates, 'configurations.defaultLoanTemplatePurchase');
            let losLoanTemplatesForRefinance = getDefaultLoanTemplateSelectDropdownOptions(lender.losLoanTemplates, 'configurations.defaultLoanTemplateRefinance');

            this.updateBaselineSchema('information.loanOfficerAssignment', 'options', this.formFields.loanOfficerAssignmentValues);
            this.updateBaselineSchema('information.assignedSellingAgentID', 'options', externalUsersWithUnassignedOption);
            this.updateBaselineSchema('information.assignedLeadSource', 'options', leadSourcesWithUnassignedOption);
            this.updateBaselineSchema('information.theme', 'options', this.formFields.themes);
            this.updateBaselineSchema('configurations.applicationScope', 'options', this.formFields.applicationTypes);
            this.updateBaselineSchema('configurations.ausApprovalRule', 'options', this.formFields.ausApprovalRules);
            this.updateBaselineSchema('configurations.defaultLoanTemplatePurchase', 'options', losLoanTemplatesForPurchase);
            this.updateBaselineSchema('configurations.defaultLoanTemplateRefinance', 'options', losLoanTemplatesForRefinance);
            this.updateBaselineSchema('configurations.defaultPropertyTypeForTBD', 'options', this.formFields.defaultPropertyTypesForTBDLoans);
            this.updateBaselineSchema('credentials.creditVendor', 'options', this.formFields.creditVendorValues);
        },

        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Campaign',
                breadcrumbs: {
                    to: { name: 'ManageCampaigns' },
                    label: 'Manage > Campaigns > Campaign',
                },
                tabs: [
                    { label: 'Information', to: { name: 'ManageCampaignEditTabInformation' } },
                    { label: 'Configurations', to: { name: 'ManageCampaignEditTabConfigurations' } },
                    { label: 'Credentials', to: { name: 'ManageCampaignEditTabCredentials' } },
                    { label: 'Custom Scripts', to: { name: 'ManageCampaignEditTabCustomScripts' } },
                ],
                backBar: {
                    to: { name: 'ManageCampaigns' },
                    label: 'Campaigns',
                },
            });
        },

        updateNavigationAfterFetchingDataFromApi(navigation) {
            navigation.updatePageName(this.campaignName);
            navigation.updateAvatar({
                avatarName: this.campaignName,
                avatarImageSrc: '', // TODO
            });
        },

        formSubmitSuccessHandler(navigation) {
            this.updateNavigationAfterFetchingDataFromApi(navigation);
        },
    },
};
</script>

