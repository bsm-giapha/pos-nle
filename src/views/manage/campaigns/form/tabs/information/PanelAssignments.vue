<template>
    <FormPanel label="Assignments">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow v-show="formDataCurrentOfAncestor.information.subscriptionType === 'Public'">
                <BrightColumn tablet="6">
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('information.loanOfficerAssignment')"
                        @update:modelValue="handleAncestorInput('information.loanOfficerAssignment', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('information.assignedSellingAgentID')"
                        @update:modelValue="handleAncestorInput('information.assignedSellingAgentID', $event)"
                    />
                </BrightColumn>
                <BrightColumn v-show="leadSources.length" tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('information.assignedLeadSource')"
                        @update:modelValue="handleAncestorInput('information.assignedLeadSource', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelAssignments",
    mixins: [FormDescendantMixin],
    computed: {
        leadSources() {
            const lender = useLenderStore();
            return lender.leadSources;
        },
    },
};
</script>
