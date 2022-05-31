<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <FormExternalUser v-bind="bindDescendant"/>
        <BaseSendPasswordResetEmail v-bind="sendPasswordResetEmailBindings" @close="showResetPasswordModal = false"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "./FormExternalUser.schema.js";
import BaseSendPasswordResetEmail from "@/components/modal/BaseSendPasswordResetEmail.vue";
import FormExternalUser from "@/views/manage/external-users/form/FormExternalUser.vue";

export default {
    name: "FormExternalUserEdit",
    components: { FormExternalUser, BaseSendPasswordResetEmail },
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
        };
    },
    computed: {
        id() {
            return 'FormExternalUserEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/external-users/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminUsers');
        },

        fullName() {
            return `${this.formDataCurrent.contact.firstName} ${this.formDataCurrent.contact.lastName}`;
        },
        sendPasswordResetEmailBindings() {
            return {
                source: "/external-users",
                userID: this.publicId ?? "",
                userEmail: this.formDataCurrent.contact.email,
                showModal: this.showResetPasswordModal,
            };
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Edit External User',
                breadcrumbs: {
                    to: { name: 'ManageExternalUsers' },
                    label: 'Manage > Users > External',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageExternalUsers' },
                    label: 'External Users',
                },
                localActions: [
                    { label: 'Reset Password', icon: 'vpn_key', value: () => this.showResetPasswordModal = true },
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
            this.updateNavigationAfterFetchingDataFromApi(navigation);
        },
    },
};
</script>
