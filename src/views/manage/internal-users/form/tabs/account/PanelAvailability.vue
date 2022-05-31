<template>
    <FormPanel v-show="showAvailabilityPanel" label="Availability">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow v-show="hasUnavailabilityPermission" align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('account.availability')"
                        @update:modelValue="handleAncestorInput('account.availability', $event)"
                    />
                    <BrightInputDate
                        v-show="!formDataCurrentOfAncestor.account.availability"
                        v-bind="bindAncestorInput('account.unavailableDates')"
                        placeholder="Select a range of dates and times"
                        mode="range"
                        format="m/d/Y - H:i"
                        :default-value="unavailableDates"
                        :value="unavailableDates"
                        :input-value="unavailableDates"
                        enable-time
                        inline
                        @update:modelValue="handleAncestorInput('account.unavailableDates', $event)"
                    />
                </BrightColumn>
                <BrightColumn v-show="hasAvailableHoursPermission" mobile="12">
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="hasAvailableHoursPermission" align-items="end">
                <BrightColumn desktop="8">
                    <InputAvailableHours
                        v-bind="bindAncestorInput('account.availableHours')"
                        @update:modelValue="handleAncestorInput('account.availableHours', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import BrightInputDate from "@/bright/components/input-library/date/BrightInputDate.vue";
import InputAvailableHours from "@/views/manage/internal-users/form/tabs/account/components/InputAvailableHours.vue";
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelAvailability",
    components: { InputAvailableHours, BrightInputDate },
    mixins: [FormDescendantMixin],
    computed: {
        // VISIBILITY //
        showAvailabilityPanel() {
            return this.hasUnavailabilityPermission;
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
        hasAvailableHoursPermission() {
            return this.lenderConfiguration('isLOAvailableHoursUsed') || this.lenderConfiguration('isEnableSMS');
        },

        // DATA //
        unavailableDates() {
            return this.formDataCurrentOfAncestor.account.unavailableDates ?? "";
        },
    },
};
</script>
