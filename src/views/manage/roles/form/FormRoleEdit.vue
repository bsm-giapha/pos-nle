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
import Schema from "./FormRole.schema.js";
import axios from "axios";
import { usePermissionsStore } from "@/stores/permissions.js";

export default {
    name: "FormRoleEdit",
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
            return 'FormRoleEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/roles/${this.publicId}`;
        },
        userCanViewPage() {
            const permissions = usePermissionsStore();
            return permissions.canEditRoles;
        },
    },
    methods: {
        fetchRequiredDataForFormAsPromise() {
            let promises = [];

            const fetchFormFields = axios.get(`${this.lenderBaseUrl}/roles/form-fields`).then(response => {
                response = response.data.data;
                this.formFields = {
                    ...this.formFields,
                    ...response,
                };
            });
            if (Object.keys(this.formFields).length === 0) promises.push(fetchFormFields);

            return promises;
        },

        updateSchemaWithFetchedRequiredData() {
            this.updateBaselineSchema('role.subroles', 'options', this.formFields.subroles);
            this.updateBaselineSchema('', 'generalPermissions', {
                ...this.formFields.generalPermissions,
                namedRoute: 'ManageRoleEditTabGeneral',
            });
            this.updateBaselineSchema('', 'pageVisitPermissions', {
                ...this.formFields.pageVisitPermissions,
                namedRoute: 'ManageRoleEditTabPageVisit',
            });
            this.updateBaselineSchema('', 'loanPageVisitPermissions', {
                ...this.formFields.loanPageVisitPermissions,
                namedRoute: 'ManageRoleEditTabLoanPageVisit',
            });
        },

        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Role',
                breadcrumbs: {
                    to: { name: 'ManageRoles' },
                    label: 'Manage > Roles',
                },
                tabs: [
                    { label: 'Role', to: { name: 'ManageRoleEditTabRole' } },
                    { label: 'General Permissions', to: { name: 'ManageRoleEditTabGeneral' } },
                    { label: 'Page Visit Permissions', to: { name: 'ManageRoleEditTabPageVisit' } },
                    { label: 'Loan Page Visit Permissions', to: { name: 'ManageRoleEditTabLoanPageVisit' } },
                ],
                backBar: {
                    to: { name: 'ManageRoles' },
                    label: 'View Roles',
                },
                localActions: [],
            });
        },

        updateNavigationAfterFetchingDataFromApi(navigation) {
            navigation.updatePageName(this.formDataCurrent.role.name);
        },

        formSubmitSuccessHandler(navigation) {
            this.updateNavigationAfterFetchingDataFromApi(navigation);
        },
    },
};
</script>
