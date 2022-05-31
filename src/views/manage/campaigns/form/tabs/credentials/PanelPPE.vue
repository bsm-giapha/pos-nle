<template>
    <FormPanel label="Product Pricing Engine (PPE)">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-show="isOptimalBlue || isEllieMae || isPML"
                        v-bind="bindAncestorInput('credentials.ppeUsername')"
                        :label="isOptimalBlue ? 'PPE Email' : 'PPE Username'"
                        :optional="isPPEUsernameOptional"
                        @update:modelValue="handleAncestorInput('credentials.ppeUsername', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BsmInputSmartPassword
                        v-show="isEllieMae || isPML"
                        v-bind="bindAncestorInput('credentials.ppePassword')"
                        :encrypted-value="formDataInitialOfAncestor.credentials.ppePassword"
                        :optional="ppeFieldsAreEmpty || !(isEllieMae || isPML)"
                        @update:modelValue="handleAncestorInput('credentials.ppePassword', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-show="isOptimalBlue"
                        v-bind="bindAncestorInput('credentials.ppeBranchID')"
                        :optional="ppeFieldsAreEmpty || !isOptimalBlue"
                        @update:modelValue="handleAncestorInput('credentials.ppeBranchID', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6">
                    <BrightInputText
                        v-show="isOptimalBlue || isMortech"
                        v-bind="bindAncestorInput('credentials.ppeUserID')"
                        :label="isMortech ? 'Lead Source' : 'PPE User ID'"
                        :optional="ppeFieldsAreEmpty || !isOptimalBlue"
                        @update:modelValue="handleAncestorInput('credentials.ppeUserID', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="isOptimalBlue">
                <BrightColumn v-show="isOptimalBlue" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('credentials.ppeLeadID')"
                        @update:modelValue="handleAncestorInput('credentials.ppeLeadID', $event)"
                    />
                </BrightColumn>
                <BrightColumn v-show="isOptimalBlue || isMortech" tablet="6">
                    <BrightInputText
                        v-bind="bindAncestorInput('credentials.ppeLeadName')"
                        :label="isOptimalBlue ? 'PPE Lead Source Name' : 'PPE Lead Name'"
                        @update:modelValue="handleAncestorInput('credentials.ppeLeadName', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelPPE",
    mixins: [FormDescendantMixin],
    props: {
        isOptimalBlue: {
            type: Boolean,
            required: false,
            default: false,
        },
        isEllieMae: {
            type: Boolean,
            required: false,
            default: false,
        },
        isPML: {
            type: Boolean,
            required: false,
            default: false,
        },
        isMortech: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        // OPTIONAL OR REQUIRED INPUT //
        ppeFieldsAreEmpty() {
            return this.formDataCurrentOfAncestor.credentials.ppeUsername === "" && this.formDataCurrentOfAncestor.credentials.ppeBranchID === "" && this.formDataCurrentOfAncestor.credentials.ppeUserID === "" && this.formDataCurrentOfAncestor.credentials.ppePassword === "";
        },
        isPPEUsernameOptional() {
            const hasTheRequiredPPEs = this.isOptimalBlue || this.isEllieMae || this.isPML;
            return this.ppeFieldsAreEmpty || !(hasTheRequiredPPEs);
        },
    },
};
</script>
