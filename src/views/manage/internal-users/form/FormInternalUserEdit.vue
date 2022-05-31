<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" v-bind="bindDescendant"/>
            </keep-alive>
        </router-view>
        <BaseSendPasswordResetEmail v-bind="sendPasswordResetEmailBindings" @close="showResetPasswordModal = false"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "./FormInternalUser.schema.js";
import BaseSendPasswordResetEmail from "@/components/modal/BaseSendPasswordResetEmail.vue";
import { useLenderStore } from '@/stores/lender.js';

export default {
    name: "FormInternalUserEdit",
    components: { BaseSendPasswordResetEmail },
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
        return {
            ...this.getInitialDataFromSchema(Schema, 'edit'),
            showResetPasswordModal: false,
            showLenderURLBuilder: false,
        };
    },
    computed: {
        id() {
            return 'FormInternalUserEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/internal-users/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminUsers');
        },

        fullName() {
            return `${this.formDataCurrent.account.firstName} ${this.formDataCurrent.account.lastName}`;
        },
        sendPasswordResetEmailBindings() {
            return {
                source: "/internal-users",
                userID: this.publicId,
                userEmail: this.formDataCurrent.account.email,
                showModal: this.showResetPasswordModal,
            };
        },
        urlBuilderBindings() {
            const lender = useLenderStore();
            return {
                showModal: this.showLenderURLBuilder,
                lenderID: lender.id,
                lenderNameFriendly: lender.nameFriendly,
                source: 'internalUser',
                campaigns: this.userCampaigns,
                branches: this.userBranches,
                loanOfficer: this.formDataCurrent,
                baseURL: lender.appDomain,
            };
        },
        userCampaigns() {
            const lender = useLenderStore();
            let publicCampaigns = lender.campaigns.filter(campaign => campaign.information.isActive && campaign.information.isPublic);
            let campaignIDs = publicCampaigns.map(campaign => campaign.id);

            this.formDataCurrent.assignments.campaigns.forEach(assignedCampaignID => {
                if (!campaignIDs.includes(assignedCampaignID)) {
                    campaignIDs.push(assignedCampaignID);
                }
            });

            return lender.campaigns.filter(campaign => campaignIDs.includes(campaign.id));
        },
        userBranches() {
            const lender = useLenderStore();
            return lender.branches.filter(branch => this.formDataCurrent.assignments.branches.includes(branch.id));
        },
    },
    methods: {
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];

            const fetchRoles = lender.fetchRoles();
            if (lender.roles.length === 0) promises.push(fetchRoles);

            const fetchBranches = lender.fetchBranches();
            if (lender.branches.length === 0) promises.push(fetchBranches);

            const fetchCampaigns = lender.fetchCampaigns();
            if (lender.campaigns.length === 0) promises.push(fetchCampaigns);

            const fetchCampaignsForInternalUser = lender.fetchCampaignsForInternalUser();
            if (lender.campaignsForInternalUser.length === 0) promises.push(fetchCampaignsForInternalUser);

            const fetchTeams = lender.fetchTeams();
            if (lender.teams.length === 0) promises.push(fetchTeams);

            const fetchCreditVendors = lender.fetchCreditVendors();
            if (lender.creditVendors.length === 0) promises.push(fetchCreditVendors);

            const fetchLoanOfficerAssistants = lender.fetchLoanOfficerAssistants();
            if (lender.loanOfficerAssistants.length === 0) promises.push(fetchLoanOfficerAssistants);

            const fetchLoanOfficers = lender.fetchLoanOfficers();
            if (lender.loanOfficers.length === 0) promises.push(fetchLoanOfficers);

            const fetchProcessors = lender.fetchProcessors();
            if (lender.processors.length === 0) promises.push(fetchProcessors);

            const fetchLeadSources = lender.fetchLeadSources();
            if (lender.leadSources.length === 0) promises.push(fetchLeadSources);

            return promises;
        },

        updateSchemaWithFetchedRequiredData() {
            const lender = useLenderStore();
            let getSelectDropdownOptionsForInternalUsers = (internalUsers, includeUnassignedOption = false) => {
                let list = (includeUnassignedOption) ? [{ label: 'Unassigned', value: '' }] : [];
                internalUsers.forEach(item => {
                    list.push({
                        label: `${item.account.firstName} ${item.account.lastName}`,
                        value: item.id,
                    });
                });
                return list;
            };

            let roles = lender.roles.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
            let loanOfficers = getSelectDropdownOptionsForInternalUsers(lender.loanOfficers);
            let loanOfficerAssistantsWithUnassignedOption = getSelectDropdownOptionsForInternalUsers(lender.loanOfficerAssistants, true);
            let processorsWithUnassignedOption = getSelectDropdownOptionsForInternalUsers(lender.processors, true);
            let branches = lender.branches.map(item => {
                return {
                    label: item.information.name,
                    value: item.id,
                };
            });
            let leadSources = lender.leadSources.map(item => {
                return {
                    label: item.displayName,
                    value: item.id,
                };
            });
            let creditVendors = lender.creditVendors.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });

            this.updateBaselineSchema('assignments.role', 'options', roles);
            this.updateBaselineSchema('assignments.preferredLOAToTheseLOs', 'options', loanOfficers);
            this.updateBaselineSchema('assignments.loanOfficerAssistants', 'options', loanOfficerAssistantsWithUnassignedOption);
            this.updateBaselineSchema('assignments.preferredLoanOfficerAssistant', 'options', loanOfficerAssistantsWithUnassignedOption);
            this.updateBaselineSchema('assignments.processor', 'options', processorsWithUnassignedOption);
            this.updateBaselineSchema('assignments.primaryBranch', 'options', branches);
            this.updateBaselineSchema('assignments.defaultLeadSource', 'options', leadSources);
            this.updateBaselineSchema('licensingCredentials.creditVendor', 'options', creditVendors);
        },

        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Internal User',
                breadcrumbs: {
                    to: { name: 'ManageInternalUsers' },
                    label: 'Manage > Users > Internal',
                },
                tabs: [
                    { label: 'Account', to: { name: 'ManageInternalUserEditTabAccount' } },
                    { label: 'Assignments', to: { name: 'ManageInternalUserEditTabAssignments' } },
                    { label: 'Licensing & Credentials', to: { name: 'ManageInternalUserEditTabLicensingCredentials' } },
                    { label: 'Recent Changes' },
                ],
                backBar: {
                    to: { name: 'ManageInternalUsers' },
                    label: 'Internal Users',
                },
                localActions: [
                    { label: 'Reset Password', icon: 'vpn_key', value: () => this.showResetPasswordModal = true },
                    { label: 'Get Links', icon: 'share', value: () => this.showLenderURLBuilder = true },
                ],
            });
        },

        updateNavigationAfterFetchingDataFromApi(navigation) {
            navigation.updatePageName(this.fullName);
            navigation.updateAvatar({
                avatarName: this.fullName,
                avatarImageSrc: '', // TODO
            });
        },

        formSubmitSuccessHandler(navigation) {
            navigation.updatePageName(this.fullName);
            navigation.updateAvatar({
                avatarName: this.fullName,
                avatarImageSrc: '', // TODO
            });
        },
    },
};
</script>
