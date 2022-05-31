<template>
    <div>
        <FormPanel label="Loan Officers">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn desktop="8">
                        <InputLoanOfficersAssigned
                            v-bind="ancestorBindDescendantInput('assignments.loanOfficersAssigned')"
                            :current-lead-source-i-d="formDataInitialOfAncestor.id || 0"
                            no-items-message="No Loan Officers have been assigned."
                            :all-possible-items="loanOfficers.map(user => user.id)"
                            :get-object-representation-of-item-by-id="getLoanOfficerObjectById"
                            @update:modelValue="handleAncestorInput('assignments.loanOfficersAssigned', $event)"
                            @set-as-default="handleLoanOfficersDefaultLeadSource"
                            @remove-as-default="handleLoanOfficersDefaultLeadSource($event, 'remove')"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Branches">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn desktop="8">
                        <InputBranchesAssigned
                            v-bind="ancestorBindDescendantInput('assignments.branchesAssigned')"
                            no-items-message="No Branches have been assigned."
                            :all-possible-items="branches.map(branch => branch.id)"
                            :get-object-representation-of-item-by-id="getBranchObjectById"
                            @update:modelValue="handleAncestorInput('assignments.branchesAssigned', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import FormPanel from "@/components/form/FormPanel.vue";
import InputBranchesAssigned from "@/views/manage/lead-sources/form/components/InputBranchesAssigned.vue";
import InputLoanOfficersAssigned from "@/views/manage/lead-sources/form/components/InputLoanOfficersAssigned.vue";
import _cloneDeep from "lodash/cloneDeep";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import { mapState } from 'pinia';
import { useLenderStore } from '@/stores/lender';

export default {
    name: "TabAssignments",
    components: {
        FormPanel,
        InputBranchesAssigned,
        InputLoanOfficersAssigned,
    },
    mixins: [FormDescendantMixin],
    computed: {
        ...mapState(useLenderStore, {
            branches: store => store.branches,
            loanOfficers: store => store.loanOfficers,
        }),
    },
    methods: {
        getBranchObjectById(id) {
            let branch = this.branches.find(branch => branch.id === id);
            if (branch) {
                return {
                    id: id,
                    name: branch.information.name,
                };
            }
        },
        getLoanOfficerObjectById(id) {
            let user = this.loanOfficers.find(user => user.id === id);
            if (user) {
                return {
                    id: id,
                    name: `${user.account.firstName} ${user.account.lastName}`,
                };
            }
        },
        handleLoanOfficersDefaultLeadSource(event, action = '') {
            const loanOfficerPublicID = event[0];
            let loanOfficersAssigned = _cloneDeep(this.formDataCurrentOfAncestor.assignments.loanOfficersAssigned);

            if (action ==='remove') {
                loanOfficersAssigned[loanOfficerPublicID]['defaultLeadSourceID'] = null;
            } else {
                loanOfficersAssigned[loanOfficerPublicID]['defaultLeadSourceID'] = this.formDataInitialOfAncestor.id;
            }

            this.handleAncestorInput('assignments.loanOfficersAssigned', loanOfficersAssigned);
        },
    },
};
</script>
