<template>
    <div class="PanelContact">
        <FormPanel label="Contact Information">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn tablet="6" desktop="flex">
                        <BrightInputText
                            v-bind="bindAncestorInput('contact.firstName')"
                            @update:modelValue="handleAncestorInput('contact.firstName', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn tablet="6" desktop="flex">
                        <BrightInputText
                            v-bind="bindAncestorInput('contact.lastName')"
                            @update:modelValue="handleAncestorInput('contact.lastName', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>

            <BrightGrid>
                <BrightRow>
                    <BrightColumn>
                        <BrightDivider class="mt-8 mb-24"/>
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn tablet="9">
                        <BrightInputEmail
                            v-bind="bindAncestorInput('contact.email')"
                            @update:modelValue="handleAncestorInput('contact.email', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn mobile="7" tablet="6">
                        <BrightInputPhoneNumber
                            v-bind="bindAncestorInput('contact.phoneNumber')"
                            @update:modelValue="handleAncestorInput('contact.phoneNumber', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelContact",
    mixins: [FormDescendantMixin],
};
</script>
