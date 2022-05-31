<template>
    <FormPanel label="About">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.name')"
                        @update:modelValue="handleAncestorInput('information.name', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.urlName')"
                        @update:modelValue="handleAncestorInput('information.urlName', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('information.subscriptionType')"
                        @update:modelValue="handleSubscriptionTypeInput"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="formDataCurrentOfAncestor.information.subscriptionType === 'Loan Officer Specific'">
                <BrightColumn tablet="6">
                    <InputAssignedLoanOfficers
                        ref="inputList-information-assignedLoanOfficers"
                        v-bind="bindAncestorInput('information.assignedLoanOfficers')"
                        no-items-message="No Loan Officers have been assigned."
                        :all-possible-items="loanOfficers.map(loanOfficer => loanOfficer.id)"
                        :get-object-representation-of-item-by-id="getLoanOfficerObjectById"
                        :campaign-name="formDataCurrentOfAncestor.information.name"
                        @update:modelValue="handleAncestorInput('information.assignedLoanOfficers', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputAssignedLoanOfficers from "@/views/manage/campaigns/form/tabs/information/components/InputAssignedLoanOfficers.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelAbout",
    components: { InputAssignedLoanOfficers },
    mixins: [FormDescendantMixin],
    computed: {
        loanOfficers() {
            const lender = useLenderStore();
            return lender.loanOfficers;
        },
    },
    methods: {
        getLoanOfficerObjectById(id) {
            let loanOfficer = this.loanOfficers.find(loanOfficer => loanOfficer.id === id);
            return {
                id: id,
                name: loanOfficer.account.fullName,
                email: loanOfficer.account.email,
            };
        },
        handleSubscriptionTypeInput(value) {
            const assignedLoanOfficersInput = this.$refs['inputList-information-assignedLoanOfficers'];
            const currentAssignedLOs = this.formDataCurrentOfAncestor.information.assignedLoanOfficers;
            const initiallyAssignedLOs = this.formDataInitialOfAncestor.information.assignedLoanOfficers;
            const assignedLOsHasUpdated = currentAssignedLOs.length !== initiallyAssignedLOs.length;
            const idsAdded = currentAssignedLOs.filter(currentAssignedLO => !initiallyAssignedLOs.some(initiallyAssignedLO => initiallyAssignedLO === currentAssignedLO));

            this.handleAncestorInput('information.subscriptionType', value);

            if (value !== "Loan Officer Specific" && assignedLOsHasUpdated) {
                assignedLoanOfficersInput.$_removeItems(idsAdded);
            }
        },
    },
};
</script>
