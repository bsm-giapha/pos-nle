<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <PanelPlatform v-bind="bindDescendant"/>
        <PanelContact v-bind="bindDescendant"/>
        <PanelCompany v-bind="bindDescendant"/>
    </FormWrapper>
</template>

<script>
import PanelCompany from "@/views/manage/internal-users/form/tabs/assignments/PanelCompany.vue";
import PanelContact from "@/views/manage/internal-users/form/tabs/account/PanelContact.vue";
import PanelPlatform from "@/views/manage/internal-users/form/tabs/account/PanelPlatform.vue";
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "@/views/manage/internal-users/form/FormInternalUser.schema.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "FormInternalUserAdd",
    components: { PanelCompany, PanelContact, PanelPlatform },
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
            return 'FormInternalUserAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/internal-users`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminUsers');
        },
    },
    methods: {
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];
            const fetchRoles = lender.fetchRoles();
            if (lender.roles.length === 0) promises.push(fetchRoles);

            return promises;
        },

        updateSchemaWithFetchedRequiredData() {
            const lender = useLenderStore();
            this.updateBaselineSchema('assignments.role', 'options', lender.roles.map(item => {
                return {
                    label: item.name,
                    value: item.id,
                };
            }));
        },

        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Add Internal User',
                breadcrumbs: {
                    to: { name: 'ManageInternalUsers' },
                    label: 'Manage > Users > Internal',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageInternalUsers' },
                    label: 'Internal Users',
                },
                localActions: [],
            });
        },

        formSubmitSuccessHandler() {
            const lender = useLenderStore();
            this.$router.push({
                name: 'ManageInternalUserAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    userFullName: `${this.formDataCurrent.account.firstName} ${this.formDataCurrent.account.lastName}`,
                    role: lender.roles.find(role => role.id === this.formDataCurrent.assignments.role)?.name ?? "",
                },
            });
        },
    },
};
</script>
