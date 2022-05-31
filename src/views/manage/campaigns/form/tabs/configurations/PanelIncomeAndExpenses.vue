<template>
    <FormPanel label="Income & Expenses">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectProposedRETaxForTBD')"
                        @update:modelValue="handleAncestorInput('configurations.collectProposedRETaxForTBD', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectProposedHazardInsuranceForTBD')"
                        @update:modelValue="handleAncestorInput('configurations.collectProposedHazardInsuranceForTBD', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.showDTI')"
                        @update:modelValue="handleAncestorInput('configurations.showDTI', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelIncomeAndExpenses",
    mixins: [FormDescendantMixin],
};
</script>
