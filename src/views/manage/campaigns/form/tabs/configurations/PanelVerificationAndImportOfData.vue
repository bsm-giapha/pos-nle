<template>
    <FormPanel label="Verification & Import of Data">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <!-- TODO: THE VALUE FOR THIS INPUT IS NOT DISPLAYED CORRECTLY IN BOTH THE NLE & OLE. This is due to the LenderConfig getter logic for "borrowerCombinedExperienceType". -->
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('configurations.borrowerCombinedExperienceType')"
                        @update:modelValue="handleAncestorInput('configurations.borrowerCombinedExperienceType', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.allowIdentityVerification')"
                        @update:modelValue="handleAncestorInput('configurations.allowIdentityVerification', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.allowBankImport')"
                        @update:modelValue="handleAncestorInput('configurations.allowBankImport', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('configurations.allowAutomaticIncomeVerification')"
                        @update:modelValue="handleAncestorInput('configurations.allowAutomaticIncomeVerification', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelVerificationAndImportOfData",
    mixins: [FormDescendantMixin],
};
</script>
