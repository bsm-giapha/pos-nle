<template>
    <FormPanel label="Approval">
        <BrightGrid align-items="end">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('workflowRules.approvalVerb')"
                        @update:modelValue="handleAncestorInput('workflowRules.approvalVerb', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('workflowRules.approvalVerbiage')"
                        @update:modelValue="handleAncestorInput('workflowRules.approvalVerbiage', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('workflowRules.approvalAdverb')"
                        @update:modelValue="handleAncestorInput('workflowRules.approvalAdverb', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputNumber
                        v-bind="bindAncestorInput('workflowRules.daysUntilApprovalLetterExpires')"
                        @update:modelValue="handleAncestorInput('workflowRules.daysUntilApprovalLetterExpires', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('workflowRules.sendApprovalLetterToBorrower')"
                        @update:modelValue="handleAncestorInput('workflowRules.sendApprovalLetterToBorrower', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('workflowRules.sendApprovalLetterToAgent')"
                        @update:modelValue="handleAncestorInput('workflowRules.sendApprovalLetterToAgent', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelApproval",
    mixins: [FormDescendantMixin],
};
</script>
