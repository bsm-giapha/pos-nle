<template>
    <FormPanel v-show="userBeingEditedIsALoanOfficer" label="Loan Officer">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('assignments.urlName')"
                        @update:modelValue="handleAncestorInput('assignments.urlName', $event)"
                    />
                </BrightColumn>
                <BrightColumn desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('assignments.vanityURL')"
                        @update:modelValue="handleAncestorInput('assignments.vanityURL', $event)"
                    />
                </BrightColumn>
                <BrightColumn mobile="12">
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>

            <BrightRow v-show="loanOfficerAssistants.length" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.preferredLoanOfficerAssistant')"
                        :value="formDataCurrentOfAncestor.assignments.loanOfficerAssistants.includes(formDataCurrentOfAncestor.assignments.preferredLoanOfficerAssistant) ? formDataCurrentOfAncestor.assignments.preferredLoanOfficerAssistant : ''"
                        placeholder="Unassigned"
                        :disabled="!isAuthenticatedUserAnAdmin"
                        :hide-meta-label="!isAuthenticatedUserAnAdmin"
                        @update:modelValue="handleInputPreferredLoanOfficerAssistant"
                    />
                    <InputLoanOfficerAssistants
                        v-bind="bindAncestorInput('assignments.loanOfficerAssistants')"
                        no-items-message="No Loan Officer Assistants have been assigned to this User."
                        :all-possible-items="loanOfficerAssistants.map(user => user.id)"
                        :get-object-representation-of-item-by-id="getLoanOfficerAssistantObjectById"
                        :preferred-loan-officer-assistant-id="formDataCurrentOfAncestor.assignments.preferredLoanOfficerAssistant"
                        @update:modelValue="handleInputLoanOfficerAssistants"
                    />
                </BrightColumn>
                <BrightColumn mobile="12">
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>

            <BrightRow v-show="processors.length" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.processor')"
                        placeholder="Unassigned"
                        @update:modelValue="handleAncestorInput('assignments.processor', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import _cloneDeep from "lodash/cloneDeep";
import InputLoanOfficerAssistants from "@/views/manage/internal-users/form/tabs/assignments/components/InputLoanOfficerAssistants.vue";
import { useLenderStore } from '@/stores/lender';
import { mapState } from 'pinia';

export default {
    name: "PanelLoanOfficer",
    components: { InputLoanOfficerAssistants },
    mixins: [FormDescendantMixin],
    props: {
        userBeingEditedIsALoanOfficer: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState(useLenderStore, {
            loanOfficerAssistants: store => store.loanOfficerAssistants,
            processors: store => store.processors,
        }),
    },
    methods: {
        handleInputPreferredLoanOfficerAssistant(id) {
            this.handleAncestorInput('assignments.preferredLoanOfficerAssistant', id);
            let loanOfficerAssistants = _cloneDeep(this.formDataCurrentOfAncestor.assignments.loanOfficerAssistants);
            if (id && !loanOfficerAssistants.includes(id)) {
                loanOfficerAssistants.push(id);
                this.handleAncestorInput('assignments.loanOfficerAssistants', loanOfficerAssistants);
            }
        },
        getLoanOfficerAssistantObjectById(id) {
            let user = this.loanOfficerAssistants.find(user => user.id === id);
            return {
                id: id,
                name: `${user.account.firstName} ${user.account.lastName}`,
            };
        },
        handleInputLoanOfficerAssistants(ids) {
            this.handleAncestorInput('assignments.loanOfficerAssistants', ids);
            if (!ids.includes(this.formDataCurrentOfAncestor.assignments.preferredLoanOfficerAssistant)) {
                this.handleAncestorInput('assignments.preferredLoanOfficerAssistant', '');
            }
        },
    },
};
</script>
