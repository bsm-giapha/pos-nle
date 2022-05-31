<template>
    <FormPanel v-show="showCommunicationPreferencesPanel" label="Communication Preferences">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow v-show="hasUnavailabilityPermission" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('account.preferredLanguage')"
                        @update:modelValue="handleAncestorInput('account.preferredLanguage', $event)"
                    />
                </BrightColumn>
                <BrightColumn v-show="hasEmailCCListPermission || hasSMSPermission" mobile="12">
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>

            <BrightRow v-show="hasEmailCCListPermission" align-items="end">
                <BrightColumn desktop="8">
                    <InputEmailCCList
                        v-bind="bindAncestorInput('account.emailCCList')"
                        no-items-message="Email addresses have not been added to this CC list yet."
                        :allow-free-input="true"
                        @update:modelValue="handleAncestorInput('account.emailCCList', $event)"
                    />
                </BrightColumn>
                <BrightColumn v-show="hasSMSPermission" mobile="12">
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="hasSMSPermission" align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('account.enableSMS')"
                        @update:modelValue="handleAncestorInput('account.enableSMS', $event)"
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow v-show="formDataCurrentOfAncestor.account.enableSMS" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('account.smsPhoneType')"
                        @update:modelValue="handleAncestorInput('account.smsPhoneType', $event)"
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow v-show="ardentCanReadResource('Lender.InternalUser.SMSNotificationLogs')" align-items="end">
                <BrightColumn desktop="8">
                    <ViewSmsNotificationLogs
                        v-bind="bindAncestorInput('account.smsNotificationLogs')"
                        no-items-message="No SMS notification logs were found."
                        readonly
                        @update:modelValue="handleAncestorInput('account.smsNotificationLogs', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser";
import InputEmailCCList from "@/views/manage/internal-users/form/tabs/account/components/InputEmailCCList.vue";
import ViewSmsNotificationLogs from "@/views/manage/internal-users/form/tabs/account/components/ViewSmsNotificationLogs.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelCommunication",
    components: { ViewSmsNotificationLogs, InputEmailCCList },
    mixins: [FormDescendantMixin],
    computed: {
        // VISIBILITY //
        showCommunicationPreferencesPanel() {
            return this.hasUnavailabilityPermission || this.hasEmailCCListPermission || this.hasSMSPermission;
        },

        // PERMISSIONS //
        hasUnavailabilityPermission() {
            const lender = useLenderStore();
            const currentRole = this.formDataCurrentOfAncestor.assignments.role;
            const matchingLenderRole = lender.roles.find(role => role.id === currentRole);
            if (matchingLenderRole) {
                const authenticatedUser = useAuthenticatedUserStore();
                const isAdmin = matchingLenderRole.subroles.includes('Admin');
                const internalUsersBranches = this.formDataCurrentOfAncestor.assignments.branches;
                const authenticatedUsersBranches = authenticatedUser.assignments.branches.map(branch => branch.id);
                const authenticatedUserIsInTheSameBranchAsInternalUser = internalUsersBranches.some(internalUsersBranch => authenticatedUsersBranches.includes(internalUsersBranch));

                return !isAdmin && authenticatedUserIsInTheSameBranchAsInternalUser && this.ardentCanUpdateResource('Lender.InternalUser.Unavailability');
            }
            return false;
        },
        hasEmailCCListPermission() {
            const lender = useLenderStore();
            const currentRole = this.formDataCurrentOfAncestor.assignments.role;
            const matchingLenderRole = lender.roles.find(role => role.id === currentRole);
            if (matchingLenderRole) {
                return this.ardentCanUpdateResource('Lender.InternalUser.EmailCCList') || matchingLenderRole.subroles.includes('Loan Officer');
            }
            return false;
        },
        hasSMSPermission() {
            return this.lenderConfiguration('isEnableSMS');
        },
    },
};
</script>
