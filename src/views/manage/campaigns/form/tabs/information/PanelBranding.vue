<template>
    <FormPanel label="Branding">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('information.theme')"
                        @update:modelValue="handleAncestorInput('information.theme', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.navbarCompanyLogo')"
                        @update:modelValue="handleAncestorInput('information.navbarCompanyLogo', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BrightSwitch
                        v-bind="bindAncestorInput('information.useLogoInSignupNavbar')"
                        @update:modelValue="handleAncestorInput('information.useLogoInSignupNavbar', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.coBrandLogo')"
                        @update:modelValue="handleAncestorInput('information.coBrandLogo', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightSwitch
                        v-bind="bindAncestorInput('information.useCoBrandLogoInPrequalAndApprovalLetter')"
                        @update:modelValue="handleAncestorInput('information.useCoBrandLogoInPrequalAndApprovalLetter', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BrightSwitch
                        v-bind="bindAncestorInput('information.useCoBrandAddressInPrequalAndApprovalLetter')"
                        @update:modelValue="handleAncestorInput('information.useCoBrandAddressInPrequalAndApprovalLetter', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightSwitch
                        v-bind="bindAncestorInput('information.useCoBrandLogoInSignupHeader')"
                        @update:modelValue="handleAncestorInput('information.useCoBrandLogoInSignupHeader', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BrightSwitch
                        v-bind="bindAncestorInput('information.useCoBrandLogoInSignupFooter')"
                        @update:modelValue="handleAncestorInput('information.useCoBrandLogoInSignupFooter', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.signupHeader')"
                        @update:modelValue="handleAncestorInput('information.signupHeader', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.signupSubHeader')"
                        @update:modelValue="handleAncestorInput('information.signupSubHeader', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.emailCTAButtonColor')"
                        @update:modelValue="handleAncestorInput('information.emailCTAButtonColor', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelBranding",
    mixins: [FormDescendantMixin],
};
</script>
