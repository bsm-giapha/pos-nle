<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <FormExternalUser v-bind="bindDescendant"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import FormExternalUser from "@/views/manage/external-users/form/FormExternalUser.vue";
import Schema from "@/views/manage/external-users/form/FormExternalUser.schema.js";
import _startCase from "lodash/startCase";

export default {
    name: "FormExternalUserAdd",
    components: { FormExternalUser },
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
            return 'FormExternalUserAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/external-users`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminUsers');
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Add External User',
                breadcrumbs: {
                    to: { name: 'ManageExternalUsers' },
                    label: 'Manage > Users > External',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageExternalUsers' },
                    label: 'External Users',
                },
                localActions: [],
            });
        },

        formSubmitSuccessHandler() {
            this.$router.push({
                name: 'ManageExternalUserAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    company: this.formDataCurrent.company.company,
                    userFullName: `${this.formDataCurrent.contact.firstName} ${this.formDataCurrent.contact.lastName}`,
                    userAgentType: _startCase(this.formDataCurrent.licensing.agentType),
                },
            });
        },
    },
};
</script>
