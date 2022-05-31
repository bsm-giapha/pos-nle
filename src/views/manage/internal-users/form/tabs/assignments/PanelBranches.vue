<template>
    <FormPanel v-show="branches.length" label="Branches">
        <template v-slot:sub-label>
            All of the User's assigned branches.
            <br><br>
            To view all of your company's available branches, <SmartLink href="/lender/admin/branches" target="_blank">click here</SmartLink>.
        </template>
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.primaryBranch')"
                        :disabled="!isAuthenticatedUserAnAdmin"
                        :hide-meta-label="!isAuthenticatedUserAnAdmin"
                        @update:modelValue="handleInputPrimaryBranch"
                    />
                    <InputBranches
                        v-bind="bindAncestorInput('assignments.branches')"
                        no-items-message="This User is not assigned to any Branches."
                        :all-possible-items="branches.map(branch => branch.id)"
                        :get-object-representation-of-item-by-id="getBranchObjectById"
                        :primary-branch-id="formDataCurrentOfAncestor.assignments.primaryBranch"
                        @update:modelValue="handleInputBranches"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import SmartLink from "@/components/navigation/SmartLink.vue";
import _cloneDeep from "lodash/cloneDeep.js";
import InputBranches from "@/views/manage/internal-users/form/tabs/assignments/components/InputBranches.vue";
import { useLenderStore } from '@/stores/lender';
import { mapState } from 'pinia';

export default {
    name: "PanelBranches",
    components: { InputBranches, SmartLink },
    mixins: [FormDescendantMixin],
    computed: {
        ...mapState(useLenderStore, {
            branches: store => store.branches,
        }),
    },
    methods: {
        handleInputPrimaryBranch(id) {
            this.handleAncestorInput('assignments.primaryBranch', id);
            let branches = _cloneDeep(this.formDataCurrentOfAncestor.assignments.branches);
            if (id && !branches.includes(id)) {
                branches.push(id);
                this.handleAncestorInput('assignments.branches', branches);
            }
        },
        getBranchObjectById(id) {
            let branch = this.branches.find(branch => branch.id === id);
            return {
                id: id,
                name: branch.information.name,
            };
        },
        handleInputBranches(ids) {
            this.handleAncestorInput('assignments.branches', ids);
            if (!ids.includes(this.formDataCurrentOfAncestor.assignments.primaryBranch)) {
                this.handleAncestorInput('assignments.primaryBranch', '');
            }
        },
    },
};
</script>
