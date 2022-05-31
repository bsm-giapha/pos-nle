<template>
    <FormPanel label="Rate Lock Periods">
        <BrightGrid align-items="end">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <InputRateLockPeriods
                        v-bind="bindAncestorInput('workflowRules.lockPeriods')"
                        no-items-message="No rate lock periods have been set."
                        :all-possible-items="formDataCurrentOfAncestor.workflowRules.lockPeriods"
                        :allow-free-input="true"
                        @update:modelValue="handleAncestorInput('workflowRules.lockPeriods', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="lenderConfiguration('canLOChangeRatePeriod')" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('workflowRules.lockPeriodForPurchaseLoans')"
                        :options="lockPeriodOptions"
                        @update:modelValue="handleAncestorInput('workflowRules.lockPeriodForPurchaseLoans', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="lenderConfiguration('canLOChangeRatePeriod')" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('workflowRules.lockPeriodForRefinanceLoans')"
                        :options="lockPeriodOptions"
                        @update:modelValue="handleAncestorInput('workflowRules.lockPeriodForRefinanceLoans', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('workflowRules.enablePPERateLock')"
                        @update:modelValue="handleAncestorInput('workflowRules.enablePPERateLock', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputRateLockPeriods from "@/views/manage/application-settings/form/tabs/workflow-rules/components/InputRateLockPeriods.vue";

export default {
    name: "PanelRateLockPeriods",
    components: { InputRateLockPeriods },
    mixins: [FormDescendantMixin],
    computed: {
        lockPeriodOptions() {
            let lockPeriods = this.formDataCurrentOfAncestor.workflowRules.lockPeriods;
            lockPeriods.sort((a, b) => a - b);
            return lockPeriods.map(lockPeriod => ({ label: lockPeriod, value: lockPeriod }));
        },
    },
};
</script>
