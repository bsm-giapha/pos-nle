<template>
    <FormPanel v-show="ardentCanUpdateResource('Lender.InternalUser.MortgageLoans') && userBeingEditedIsALoanOfficer" label="State Licensing" sub-label="Only available for Loan Officers.">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('licensingCredentials.nmlsNumber')"
                        autocomplete="new-password"
                        @update:modelValue="handleAncestorInput('licensingCredentials.nmlsNumber')"
                    />

                    <BrightDivider class="mt-20 mb-24"/>

                    <InputStateLicensing
                        v-bind="ancestorBindDescendantInput('licensingCredentials.stateLicensing')"
                        no-items-message="No State Licenses have been assigned to this User."
                        :get-object-representation-of-item-by-id="getStateLicensingObjectById"
                        :allow-free-input="true"
                        :items-in-list-are-objects="true"
                        @update:modelValue="handleAncestorInput('licensingCredentials.stateLicensing', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText.vue";
import InputStateLicensing from "@/views/manage/internal-users/form/tabs/licensing-credentials/components/InputStateLicensing.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelStateLicensing",
    components: { InputStateLicensing, BrightInputText },
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
    methods: {
        getStateLicensingObjectById(id) {
            let license = this.formDataCurrentOfAncestor.licensingCredentials.stateLicensing.find(license => license.id === id);
            return {
                ...license,
                name: license.state,
            };
        },
    },
};
</script>
