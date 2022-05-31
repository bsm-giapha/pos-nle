<template>
    <div class="TabAssignments">
        <PanelCompany v-bind="bindDescendant"/>
        <PanelLoanOfficer v-bind="bindDescendant" :user-being-edited-is-a-loan-officer="userBeingEditedIsALoanOfficer"/>
        <PanelLoanOfficerAssistant v-bind="bindDescendant"/>
        <PanelCampaigns v-bind="bindDescendant" :user-being-edited-is-a-loan-officer="userBeingEditedIsALoanOfficer"/>
        <PanelBranches v-bind="bindDescendant"/>
        <PanelTeams v-bind="bindDescendant"/>
        <PanelLeadSources v-bind="bindDescendant"/>
        <PanelCertifications v-bind="bindDescendant"/>
    </div>
</template>

<script>
import PanelCompany from "@/views/manage/internal-users/form/tabs/assignments/PanelCompany.vue";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelLoanOfficer from "@/views/manage/internal-users/form/tabs/assignments/PanelLoanOfficer.vue";
import PanelLoanOfficerAssistant from "@/views/manage/internal-users/form/tabs/assignments/PanelLoanOfficerAssistant.vue";
import PanelCampaigns from "@/views/manage/internal-users/form/tabs/assignments/PanelCampaigns.vue";
import PanelBranches from "@/views/manage/internal-users/form/tabs/assignments/PanelBranches.vue";
import PanelTeams from "@/views/manage/internal-users/form/tabs/assignments/PanelTeams.vue";
import PanelLeadSources from "@/views/manage/internal-users/form/tabs/assignments/PanelLeadSources.vue";
import PanelCertifications from "@/views/manage/internal-users/form/tabs/assignments/PanelCertifications.vue";
import { useLenderStore } from '@/stores/lender';
export default {
    name: "TabAssignments",
    components: { PanelCertifications, PanelLeadSources, PanelTeams, PanelBranches, PanelCampaigns, PanelLoanOfficerAssistant, PanelLoanOfficer, PanelCompany },
    mixins: [FormDescendantMixin],
    computed: {
        userBeingEditedIsALoanOfficer() {
            const lender = useLenderStore();
            const currentRole = this.formDataCurrentOfAncestor.assignments.role;
            const matchingLenderRole = lender.roles.find(role => role.id === currentRole);
            if (matchingLenderRole) {
                return matchingLenderRole.subroles.includes('Loan Officer');
            }
            return false;
        },
    },
};
</script>
