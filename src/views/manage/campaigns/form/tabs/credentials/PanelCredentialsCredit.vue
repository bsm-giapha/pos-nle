<template>
    <FormPanel label="Credit">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('credentials.creditVendor')"
                        @update:modelValue="handleAncestorInput('credentials.creditVendor', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('credentials.creditLoginID')"
                        :optional="formDataCurrentOfAncestor.credentials.creditVendor === ''"
                        @update:modelValue="handleAncestorInput('credentials.creditLoginID', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BsmInputSmartPassword
                        v-bind="bindAncestorInput('credentials.creditLoginPassword')"
                        :encrypted-value="formDataInitialOfAncestor.credentials.creditLoginPassword"
                        :optional="formDataCurrentOfAncestor.credentials.creditVendor === ''"
                        @update:modelValue="handleAncestorInput('credentials.creditLoginPassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('credentials.creditInternalID')"
                        @update:modelValue="handleAncestorInput('credentials.creditInternalID', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelCredentialsCredit",
    mixins: [FormDescendantMixin],
};
</script>
