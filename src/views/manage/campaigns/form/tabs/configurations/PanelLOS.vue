<template>
    <FormPanel label="LOS">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.defaultLoanTemplatePurchase')"
                        @update:modelValue="handleAncestorInput('configurations.defaultLoanTemplatePurchase', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.defaultLoanTemplateRefinance')"
                        @update:modelValue="handleAncestorInput('configurations.defaultLoanTemplateRefinance', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6" desktop="8">
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
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputCustomLoanTemplates from "@/views/manage/campaigns/form/tabs/configurations/components/InputCustomLoanTemplates.vue";

export default {
    name: "PanelLOS",
    components: { InputCustomLoanTemplates },
    mixins: [FormDescendantMixin],
    methods: {
        getLosLoanTemplateObjectById(id) {
            let losLoanTemplate = this.formDataCurrentOfAncestor.configurations.customLoanTemplateList.find(template => template.id === id);
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
