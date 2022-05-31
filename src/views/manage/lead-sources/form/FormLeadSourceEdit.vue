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
import Schema from "@/views/manage/lead-sources/form/FormLeadSource.schema.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "FormLeadSourceEdit",
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
            return 'FormLeadSourceEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/lead-sources/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminLeadSourcePricing');
        },
    },

    methods: {
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];

            const fetchBranches = lender.fetchBranches();
            if (lender.branches.length === 0) promises.push(fetchBranches);

            const fetchLoanOfficers = lender.fetchLoanOfficers();
            if (lender.loanOfficers.length === 0) promises.push(fetchLoanOfficers);

            const fetchLeadSources = lender.fetchLeadSources();
            if (lender.leadSources.length === 0) promises.push(fetchLeadSources);

            return promises;
        },
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Lead Source',
                breadcrumbs: {
                    to: { name: 'ManageLeadSources' },
                    label: 'Manage > Settings > Lead Sources',
                },
                tabs: [
                    { label: 'Information', to: { name: 'ManageLeadSourceEditTabInformation' } },
                    { label: 'Assignments', to: { name: 'ManageLeadSourceEditTabAssignments' } },
                ],
                backBar: {
                    to: { name: 'ManageLeadSources' },
                    label: 'Lead Sources',
                },
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
