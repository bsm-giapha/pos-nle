<template>
    <FormPanel label="Signup Page">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('userInterface.checkForReturningUsersOnTheBorrowerSignupPage')"
                        @update:modelValue="handleAncestorInput('userInterface.checkForReturningUsersOnTheBorrowerSignupPage', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('userInterface.linkableCompanyLogo')"
                        @update:modelValue="handleAncestorInput('userInterface.linkableCompanyLogo', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('userInterface.displayCompanyFooterImageInBorrowerApplication')"
                        @update:modelValue="handleAncestorInput('userInterface.displayCompanyFooterImageInBorrowerApplication', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('userInterface.signupPageHeader')"
                        @update:modelValue="handleAncestorInput('userInterface.signupPageHeader', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('userInterface.signupPageSubHeader')"
                        @update:modelValue="handleAncestorInput('userInterface.signupPageSubHeader', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelSignupPage",
    mixins: [FormDescendantMixin],
};
</script>
