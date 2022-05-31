<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <TabInformation v-bind="bindDescendant"/>
        <PanelDocumentsAndLetters v-bind="bindDescendant"/>
        <PanelTermsOfUseAndPrivacyPolicy v-bind="bindDescendant"/>
    </FormWrapper>
</template>
<script>
import PanelTermsOfUseAndPrivacyPolicy from "@/views/manage/branches/form/tabs/configurations/PanelTermsOfUseAndPrivacyPolicy.vue";
import TabInformation from "@/views/manage/branches/form/tabs/TabInformation.vue";
import PanelDocumentsAndLetters from "@/views/manage/branches/form/tabs/configurations/PanelDocumentsAndLetters.vue";
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "@/views/manage/branches/form/FormBranch.schema.js";

export default {
    name: "FormBranchAdd",
    components: { PanelTermsOfUseAndPrivacyPolicy, PanelDocumentsAndLetters, TabInformation },
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
            return 'FormBranchAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/branches`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminBranches');
        },
        showTouAndPolicyURL() {
            return !this.formDataCurrent.configurations.useStandardTouAndPrivacyModal;
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Add Branch',
                breadcrumbs: {
                    to: { name: 'ManageBranches' },
                    label: 'Manage > Branches',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageBranches' },
                    label: 'Branches',
                },
                localActions: [],
            });
        },

        formSubmitSuccessHandler() {
            this.$router.push({
                name: 'ManageBranchAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    branchName: this.formDataCurrent.information.name,
                    branchPreferredDisplayName: this.formDataCurrent.information.preferredDisplayName,
                },
            });
        },
    },
};
</script>
