<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" v-bind="bindDescendant"/>
            </keep-alive>
        </router-view>
        <LenderURLBuilder v-bind="urlBuilderBindings" @closed="showLenderURLBuilder = false"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import LenderURLBuilder from "@/components/LenderURLBuilder.vue";
import Schema from "@/views/manage/branches/form/FormBranch.schema.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "FormBranchEdit",
    components: { LenderURLBuilder },
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
            showLenderURLBuilder: false,
        };
    },

    computed: {
        id() {
            return 'FormBranchEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/branches/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminBranches');
        },
        urlBuilderBindings() {
            const lender = useLenderStore();
            return {
                showModal: this.showLenderURLBuilder,
                loanOfficers: this.assignedLoanOfficers,
                campaigns: this.branchCampaigns,
                lenderID: lender.id,
                lenderNameFriendly: lender.nameFriendly,
                source: 'branch',
                branch: this.formDataCurrent,
                baseURL: lender.appDomain,
            };
        },
        assignedLoanOfficers() {
            const lender = useLenderStore();
            return lender.loanOfficers.filter(loanOfficer => loanOfficer.assignments.branches.some(branch => branch.id === this.formDataCurrent.id));
        },
        branchCampaigns() {
            const lender = useLenderStore();
            let publicCampaigns = lender.campaigns.filter(campaign => campaign.information.isActive && campaign.information.isPublic);
            let campaignIds = publicCampaigns.map(campaign => campaign.id);
            let loanOfficers = this.assignedLoanOfficers;

            loanOfficers.forEach(loanOfficer => {
                loanOfficer.assignments.campaigns.forEach(campaign => {
                    if (!campaignIds.includes(campaign.id)) {
                        campaignIds.push(campaign.id);
                    }
                });
            });

            return lender.campaigns.filter(campaign => campaignIds.includes(campaign.id));
        },
    },
    methods: {
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];

            const fetchCampaigns = lender.fetchCampaigns();
            if (lender.campaigns.length === 0) promises.push(fetchCampaigns);

            const fetchLoanOfficers = lender.fetchLoanOfficers();
            if (lender.loanOfficers.length === 0) promises.push(fetchLoanOfficers);

            const fetchLeadSources = lender.fetchLeadSources();
            if (lender.leadSources.length === 0) promises.push(fetchLeadSources);


            return promises;
        },
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Branch',
                breadcrumbs: {
                    to: { name: 'ManageBranches' },
                    label: 'Manage > Branches',
                },
                tabs: [
                    { label: 'Information', to: { name: 'ManageBranchEditTabInformation' } },
                    { label: 'Configurations', to: { name: 'ManageBranchEditTabConfigurations' } },
                    { label: 'Assignments', to: { name: 'ManageBranchEditTabAssignments' } },
                    { label: 'Credentials', to: { name: 'ManageBranchEditTabCredentials' } },
                    { label: 'Recent Changes' },
                ],
                backBar: {
                    to: { name: 'ManageBranches' },
                    label: 'Branches',
                },
                localActions: [
                    { label: 'Get Links', icon: 'share', value: () => this.showLenderURLBuilder = true },
                ],
            });
        },
        updateNavigationAfterFetchingDataFromApi(navigation) {
            navigation.updatePageName(this.formDataCurrent.information.name);
        },
        formSubmitSuccessHandler(navigation) {
            this.updateNavigationAfterFetchingDataFromApi(navigation);
        },
    },
};
</script>
