<template>
    <div class="TabWorkflowRules">
        <FormPanel label="Assignments">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('workflowRules.loanOfficerAssignmentMethod')"
                            @update:modelValue="handleAncestorInput('workflowRules.loanOfficerAssignmentMethod', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('workflowRules.shouldRoundRobinBranchSelection')"
                            @update:modelValue="handleAncestorInput('workflowRules.shouldRoundRobinBranchSelection', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <PanelRateLockPeriods v-bind="bindDescendant"/>

        <FormPanel label="Loan Amount">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputMoney
                            v-bind="bindAncestorInput('workflowRules.maxLoanAmount')"
                            @update:modelValue="handleAncestorInput('workflowRules.maxLoanAmount', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputMoney
                            v-bind="bindAncestorInput('workflowRules.minLoanAmount')"
                            @update:modelValue="handleAncestorInput('workflowRules.minLoanAmount', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <PanelApproval v-bind="bindDescendant"/>

        <FormPanel label="Security">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('workflowRules.requireTwoFactorAuthentication')"
                            @update:modelValue="handleAncestorInput('workflowRules.requireTwoFactorAuthentication', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel v-show="!isUWMOrUWMBroker" label="Jumbo Loans">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('workflowRules.jumboLoanDeterminationMethod')"
                            @update:modelValue="handleAncestorInput('workflowRules.jumboLoanDeterminationMethod', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Realtors">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('workflowRules.askBorrowerForRealtorOrAgentInformation')"
                            @update:modelValue="handleAncestorInput('workflowRules.askBorrowerForRealtorOrAgentInformation', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Borrower Marketplace Credit Ranges">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <InputCreditRanges
                            v-bind="bindAncestorInput('workflowRules.marketplaceCreditRanges')"
                            no-items-message="No credit ranges have been set."
                            :allow-free-input="true"
                            :get-object-representation-of-item-by-id="getCreditRangeObjectById"
                            :ancestor-api-resource-url="ancestorApiResourceUrl"
                            @update:modelValue="handleAncestorInput('workflowRules.marketplaceCreditRanges', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelRateLockPeriods from "@/views/manage/application-settings/form/tabs/workflow-rules/PanelRateLockPeriods.vue";
import PanelApproval from "@/views/manage/application-settings/form/tabs/workflow-rules/PanelApproval.vue";
import InputCreditRanges from "@/views/manage/application-settings/form/tabs/workflow-rules/components/InputCreditRanges.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "TabWorkflowRules",
    components: { PanelRateLockPeriods, PanelApproval, InputCreditRanges },
    mixins: [FormDescendantMixin],
    computed: {
        isUWMOrUWMBroker() {
            const lender = useLenderStore();
            return lender.isUWMOrUWMBroker;
        },
    },
    methods: {
        getCreditRangeObjectById(id) {
            let creditRange = this.formDataCurrentOfAncestor.workflowRules.marketplaceCreditRanges.find(creditRange => creditRange.ficoTarget === id.ficoTarget);

            return {
                ...creditRange,
                id: id.ficoTarget,
                name: creditRange.displayText,
            };
        },
    },
};
</script>
