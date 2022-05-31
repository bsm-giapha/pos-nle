<template>
    <FormPanel v-show="hasUnavailabilityPermission" label="Certifications">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.certifications')"
                        :multiple-item-truncation="false"
                        @update:modelValue="handleAncestorInput('assignments.certifications', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelCertifications",
    mixins: [FormDescendantMixin],
    computed: {
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
    },
};
</script>
