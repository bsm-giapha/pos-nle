<template>
    <FormPanel label="Terms of Use & Privacy">
        <BrightGrid>
            <BrightRow>
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.useStandardTouAndPrivacyModal')"
                        @update:modelValue="handleAncestorInput('configurations.useStandardTouAndPrivacyModal', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="showTouAndPolicyURL">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('configurations.termsOfUseURL')"
                        @update:modelValue="handleAncestorInput('configurations.termsOfUseURL', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="showTouAndPolicyURL">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('configurations.privacyPolicyURL')"
                        @update:modelValue="handleAncestorInput('configurations.privacyPolicyURL', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelTermsOfUseAndPrivacyPolicy",
    mixins: [FormDescendantMixin],
    computed: {
        showTouAndPolicyURL() {
            return !this.formDataCurrentOfAncestor.configurations.useStandardTouAndPrivacyModal;
        },
    },
};
</script>

<style scoped>

</style>
