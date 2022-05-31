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
import Schema from "./FormApplicationSettings.schema.js";

export default {
    name: "FormApplicationSettingsEdit",
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
        return this.getInitialDataFromSchema(Schema, 'edit');
    },
    computed: {
        id() {
            return 'FormApplicationSettingsEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/application-settings`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminConfigsApplication');
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Application Settings',
                breadcrumbs: {
                    to: { name: 'ManageApplicationSettings' },
                    label: 'Manage > Settings > Application Settings',
                },
                tabs: [
                    { label: 'Application Data', to: { name: 'ManageApplicationSettingsEditTabApplicationData' } },
                    { label: 'Workflow Rules', to: { name: 'ManageApplicationSettingsEditTabWorkflowRules' } },
                    { label: 'User Interface', to: { name: 'ManageApplicationSettingsEditTabUserInterface' } },
                ],
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
            });
        },

        formSubmitSuccessHandler() {},
    },
};
</script>
