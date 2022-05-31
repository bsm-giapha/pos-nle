<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <FormTeam v-bind="bindDescendant"/>
        <ConfirmCopyTeamModal v-bind="copyTeamBindings" @closed="showCopyTeamModal = false" @re-render-form="reRenderForm"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import FormTeam from "@/views/manage/teams/form/FormTeam.vue";
import Schema from "@/views/manage/teams/form/FormTeam.schema.js";
import ConfirmCopyTeamModal from "@/views/manage/teams/form/components/ConfirmCopyTeamsModal.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "FormTeamEdit",
    components: {
        ConfirmCopyTeamModal,
        FormTeam,
    },
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
            showCopyTeamModal: false,
        };
    },
    computed: {
        id() {
            return 'FormTeamEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/teams/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('ManageLenderTeams');
        },
        copyTeamBindings() {
            return {
                ...this.bindDescendant,
                showModal: this.showCopyTeamModal,
            };
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Team',
                breadcrumbs: {
                    to: { name: 'ManageTeams' },
                    label: 'Manage > Teams',
                },
                backBar: {
                    to: { name: 'ManageTeams' },
                    label: 'Teams',
                },
                localActions: [
                    { label: 'Copy Team', icon: 'content_copy', value: () => this.showCopyTeamModal = true },
                ],
            });
        },
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];

            const fetchLoanOfficers = lender.fetchLoanOfficers();
            if (lender.loanOfficers.length === 0) promises.push(fetchLoanOfficers);

            return promises;

        },
        updateNavigationAfterFetchingDataFromApi(navigation) {
            navigation.updatePageName(this.formDataCurrent.name);
        },
        formSubmitSuccessHandler(navigation) {
            this.updateNavigationAfterFetchingDataFromApi(navigation);
        },
        reRenderForm() {
            this.getFormDataFromApi();
        },
    },
};
</script>
