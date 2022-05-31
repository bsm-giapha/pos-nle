<template>
    <FormPanel v-show="userBeingEditedIsALoanOfficerAssistant" label="Loan Officer Assistant">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.preferredLOAToTheseLOs')"
                        :disabled="!isAuthenticatedUserAnAdmin"
                        :hide-meta-label="!isAuthenticatedUserAnAdmin"
                        @update:modelValue="handleInputPreferredLOAToTheseLOs"
                    />
                    <InputLoanOfficersTheLOAIsAssignedTo
                        v-bind="bindAncestorInput('assignments.loanOfficersTheLOAIsAssignedTo')"
                        no-items-message="This User is not assigned to any Loan Officers."
                        :all-possible-items="loanOfficers.map(user => user.id)"
                        :get-object-representation-of-item-by-id="getLoanOfficerObjectById"
                        @update:modelValue="handleAncestorInput('assignments.loanOfficersTheLOAIsAssignedTo', $event)"
                    />
                </BrightColumn>
                <BrightColumn mobile="12">
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import _cloneDeep from "lodash/cloneDeep.js";
import InputLoanOfficersTheLOAIsAssignedTo from "@/views/manage/internal-users/form/tabs/assignments/components/InputLoanOfficersTheLOAIsAssignedTo.vue";
import { useLenderStore } from '@/stores/lender';
import { mapState } from 'pinia';

export default {
    name: "PanelLoanOfficerAssistant",
    components: { InputLoanOfficersTheLOAIsAssignedTo },
    mixins: [FormDescendantMixin],
    computed: {
        ...mapState(useLenderStore, {
            roles: store => store.roles,
            loanOfficers: store => store.loanOfficers,
        }),
        userBeingEditedIsALoanOfficerAssistant() {
            const currentRole = this.formDataCurrentOfAncestor.assignments.role;
            const matchingLenderRole = this.roles.find(role => role.id === currentRole);
            if (matchingLenderRole) {
                return matchingLenderRole.subroles.includes('Loan Officer Assistant');
            }
            return false;
        },
    },
    methods: {
        handleInputPreferredLOAToTheseLOs(ids) {
            this.handleAncestorInput('assignments.preferredLOAToTheseLOs', ids);
            let loanOfficersTheLOAIsAssignedTo = _cloneDeep(this.formDataCurrentOfAncestor.assignments.loanOfficersTheLOAIsAssignedTo);
            let numberOfAddedItems = 0;

            ids.forEach(id => {
                if (!loanOfficersTheLOAIsAssignedTo.includes(id)) {
                    loanOfficersTheLOAIsAssignedTo.push(id);
                    numberOfAddedItems++;
                }
            });
            if (numberOfAddedItems) this.handleAncestorInput('assignments.loanOfficersTheLOAIsAssignedTo', loanOfficersTheLOAIsAssignedTo);
        },
        getLoanOfficerObjectById(id) {
            let user = this.loanOfficers.find(user => user.id === id);
            return {
                id: id,
                name: `${user.account.firstName} ${user.account.lastName}`,
            };
        },
        handleInputLoanOfficersTheLOAIsAssignedTo(ids) {
            this.handleAncestorInput('assignments.loanOfficersTheLOAIsAssignedTo', ids);
            let preferredLOAToTheseLOs = this.formDataCurrentOfAncestor.assignments.preferredLOAToTheseLOs;
            let initialNumberOfItems = preferredLOAToTheseLOs.length;

            preferredLOAToTheseLOs = preferredLOAToTheseLOs.filter(id => ids.includes(id));
            if (initialNumberOfItems !== preferredLOAToTheseLOs.length) {
                this.handleAncestorInput('assignments.preferredLOAToTheseLOs', preferredLOAToTheseLOs);
            }
        },
    },
};
</script>
