<template>
    <FormPanel label="Contact Information">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn tablet="6" desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('account.firstName')"
                        @update:modelValue="handleAncestorInput('account.firstName', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6" desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('account.middleName')"
                        @update:modelValue="handleAncestorInput('account.middleName', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6" desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('account.lastName')"
                        @update:modelValue="handleAncestorInput('account.lastName', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="6" desktop="flex">
                    <BrightInputText
                        v-bind="bindAncestorInput('account.title')"
                        @update:modelValue="handleAncestorInput('account.title', $event)"
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>

            <BrightRow align-items="end">
                <BrightColumn tablet="9">
                    <BrightInputEmail
                        v-bind="bindAncestorInput('account.email')"
                        @update:modelValue="handleAncestorInput('account.email', $event)"
                    />
                </BrightColumn>
                <BrightColumn tablet="3">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('account.timezone')"
                        @update:modelValue="handleAncestorInput('account.timezone', $event)"
                    />
                </BrightColumn>
                <BrightColumn mobile="7" tablet="6">
                    <BrightInputPhoneNumber
                        v-bind="bindAncestorInput('account.phoneNumber')"
                        @update:modelValue="handleAncestorInput('account.phoneNumber', $event)"
                    />
                </BrightColumn>
                <BrightColumn mobile="5" tablet="3">
                    <BrightInputNumber
                        v-bind="bindAncestorInput('account.phoneExtension')"
                        @update:modelValue="handleAncestorInput('account.phoneExtension', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelContact",
    mixins: [FormDescendantMixin],
};
</script>
