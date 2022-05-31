<template>
    <FormPanel label="Borrower Information">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('applicationData.collectMiddleName')"
                        @update:modelValue="handleAncestorInput('applicationData.collectMiddleName', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('applicationData.normalizeBorrowerName')"
                        @update:modelValue="handleAncestorInput('applicationData.normalizeBorrowerName', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('applicationData.requireBorrowerSSN')"
                        @update:modelValue="handleAncestorInput('applicationData.requireBorrowerSSN', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputNumber
                        v-bind="bindAncestorInput('applicationData.maxNumberOfCoBorrowers')"
                        @update:modelValue="handleAncestorInput('applicationData.maxNumberOfCoBorrowers', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('applicationData.allowMarriedBorrowersToUseSameEmail')"
                        @update:modelValue="handleAncestorInput('applicationData.allowMarriedBorrowersToUseSameEmail', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelBorrowerInformation",
    mixins: [FormDescendantMixin],
};
</script>
