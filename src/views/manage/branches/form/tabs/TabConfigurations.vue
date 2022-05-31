<template>
    <div class="TabConfigurations">
        <PanelDocumentsAndLetters v-bind="bindDescendant"/>
        <FormPanel label="Emails">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('configurations.useLogoForConsumerEmails')"
                            @update:modelValue="handleAncestorInput('configurations.useLogoForConsumerEmails', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('configurations.useNameForConsumerEmails')"
                            @update:modelValue="handleAncestorInput('configurations.useNameForConsumerEmails', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('configurations.useCustomEmailButtonColor')"
                            @update:modelValue="handleAncestorInput('configurations.useCustomEmailButtonColor', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('configurations.emailButtonColor')"
                            @update:modelValue="handleAncestorInput('configurations.emailButtonColor', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="LOS">
            <BrightGrid>
                <BrightRow>
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('configurations.defaultLoanTemplatePurchase')"
                            :options="losLoanCreationTemplateListOptions"
                            @update:modelValue="handleAncestorInput('configurations.defaultLoanTemplatePurchase', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('configurations.defaultLoanTemplateRefinance')"
                            :options="losLoanCreationTemplateListOptions"
                            @update:modelValue="handleAncestorInput('configurations.defaultLoanTemplateRefinance', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn desktop="8">
                        <InputCustomLoanTemplates
                            v-bind="ancestorBindDescendantInput('configurations.customLoanTemplateList')"
                            no-items-message="No custom loan templates have been assigned."
                            :get-object-representation-of-item-by-id="getLosLoanTemplateObjectById"
                            :allow-free-input="true"
                            :items-in-list-are-objects="true"
                            @update:modelValue="handleAncestorInput('configurations.customLoanTemplateList', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <PanelTermsOfUseAndPrivacyPolicy v-bind="bindDescendant"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputCustomLoanTemplates from "@/views/manage/branches/form/tabs/configurations/components/InputCustomLoanTemplates.vue";
import PanelDocumentsAndLetters from "@/views/manage/branches/form/tabs/configurations/PanelDocumentsAndLetters.vue";
import PanelTermsOfUseAndPrivacyPolicy from "@/views/manage/branches/form/tabs/configurations/PanelTermsOfUseAndPrivacyPolicy.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "TabConfigurations",
    components: {
        PanelTermsOfUseAndPrivacyPolicy,
        PanelDocumentsAndLetters,
        InputCustomLoanTemplates,
    },
    mixins: [FormDescendantMixin],
    computed: {
        losLoanCreationTemplateListOptions() {
            const lender = useLenderStore();
            return lender.losLoanTemplates.map(template => {
                return {
                    label: template,
                    value: template,
                };
            });
        },
        showTouAndPolicyURL() {
            return !this.formDataCurrentOfAncestor.configurations.useStandardTouAndPrivacyModal;
        },
    },
    methods: {
        getLosLoanTemplateObjectById(id) {
            const losLoanTemplate = this.formDataCurrentOfAncestor.configurations.customLoanTemplateList.find(template => template.id === id);
            let amortization = '';

            if (losLoanTemplate.amortization) {
                amortization = '(ARM)';
                if (losLoanTemplate.amortization === 'Fixed') {
                    amortization = '(Fixed)';
                }
            }

            return {
                ...losLoanTemplate,
                name: `${losLoanTemplate.program} ${losLoanTemplate.purpose} ${amortization}`,
            };

        },
    },
};
</script>

<style scoped>

</style>
