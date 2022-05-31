<template>
    <div class="PanelCompany">
        <FormPanel label="Contact">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputAddress
                            v-bind="bindAncestorInput('address')"
                            @update:modelValue="handleAncestorInput('address', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('county')"
                            @update:modelValue="handleAncestorInput('county', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('country')"
                            @update:modelValue="handleAncestorInput('country', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputPhoneNumber
                            v-bind="bindAncestorInput('phoneNumber')"
                            @update:modelValue="handleAncestorInput('phoneNumber', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputNumber
                            v-bind="bindAncestorInput('phoneExtension')"
                            @update:modelValue="handleAncestorInput('phoneExtension', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputPhoneNumber
                            v-bind="bindAncestorInput('faxNumber')"
                            @update:modelValue="handleAncestorInput('faxNumber', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputEmail
                            v-bind="bindAncestorInput('email')"
                            @update:modelValue="handleAncestorInput('email', $event)"
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
