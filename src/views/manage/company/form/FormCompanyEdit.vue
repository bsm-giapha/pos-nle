<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <PanelCompany v-bind="bindDescendant"/>
        <PanelContact v-bind="bindDescendant"/>
        <DeleteAllDemoUsersModal v-bind="deleteDemoUsersBindings" @closed="showDeleteDemoUsersModal = false"/>
        <LenderURLBuilder v-bind="urlBuilderBindings" @closed="showLenderURLBuilder = false"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import PanelContact from "@/views/manage/company/form/panels/PanelContact.vue";
import PanelCompany from "@/views/manage/company/form/panels/PanelCompany.vue";
import Schema from "./FormCompany.schema.js";
import DeleteAllDemoUsersModal from "./components/DeleteDemoUsersModal.vue";
import LenderURLBuilder from "@/components/LenderURLBuilder.vue";
import { useLenderStore } from '@/stores/lender.js';

export default {
    name: "FormCompanyEdit",
    components: {
        LenderURLBuilder,
        DeleteAllDemoUsersModal,
        PanelCompany,
        PanelContact,
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
    data() {
        return {
            ...this.getInitialDataFromSchema(Schema, 'edit'),
            showDeleteDemoUsersModal: false,
            showLenderURLBuilder: false,
        };
    },
    computed: {
        id() {
            return 'FormCompanyEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/company`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminCompany');
        },
        deleteDemoUsersBindings() {
            return {
                showModal: this.showDeleteDemoUsersModal,
            };
        },
        urlBuilderBindings() {
            const lender = useLenderStore();
            return {
                showModal: this.showLenderURLBuilder,
                lenderID: lender.id,
                lenderNameFriendly: lender.nameFriendly,
                source: 'lender',
                baseURL: lender.appDomain,
            };
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit Company',
                breadcrumbs: {
                    label: 'Manage',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                localActions: [
                    { label: 'Get Links', icon: 'share', value: () => this.showLenderURLBuilder = true },
                    { label: 'Delete All Demo Users', icon: 'delete', value: () => this.showDeleteDemoUsersModal = true },
                ],
            });
        },
        formSubmitSuccessHandler() {},
    },
};
</script>
