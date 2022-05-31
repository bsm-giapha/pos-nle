<template>
    <FormPanel label="Application">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.jumboLoanCriteria')"
                        @update:modelValue="handleAncestorInput('configurations.jumboLoanCriteria', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.allowMarriedCoBoSameEmail')"
                        @update:modelValue="handleAncestorInput('configurations.allowMarriedCoBoSameEmail', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('configurations.collectReferralSource')"
                        @update:modelValue="handleAncestorInput('configurations.collectReferralSource', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.autoAssignMortgageLienType')"
                        @update:modelValue="handleAncestorInput('configurations.autoAssignMortgageLienType', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelApplication",
    mixins: [FormDescendantMixin],
};
</script>
