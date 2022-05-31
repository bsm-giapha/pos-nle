<template>
    <FormPanel label="Information">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn tablet="6" desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.name')"
                        @update:modelValue="handleAncestorInput('information.name', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6" desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.preferredDisplayName')"
                        @update:modelValue="handleAncestorInput('information.preferredDisplayName', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn>
                    <BrightInputAddress
                        v-bind="bindAncestorInput('information.address')"
                        @update:modelValue="handleAncestorInput('information.address', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn mobile="7" tablet="6">
                    <BrightInputPhoneNumber
                        v-bind="bindAncestorInput('information.phoneNumber')"
                        @update:modelValue="handleAncestorInput('information.phoneNumber', $event)"
                    />
                </BrightColumn>
                <BrightColumn v-show="showOrganizationCode" mobile="5" tablet="3">
                    <BrightInputText
                        v-bind="bindAncestorInput('information.organizationCode')"
                        @update:modelValue="handleAncestorInput('information.organizationCode', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn>
                    <BrightInputText
                        v-bind="bindAncestorInput('information.website')"
                        @update:modelValue="handleAncestorInput('information.website', $event)"
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
    name: "PanelInformation",
    mixins: [FormDescendantMixin],
    computed: {
        showOrganizationCode() {
            const lender = useLenderStore();
            return lender.isUsingByteLOS;
        },
    },
};
</script>
