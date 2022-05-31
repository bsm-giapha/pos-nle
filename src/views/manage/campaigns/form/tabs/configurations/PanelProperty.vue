<template>
    <FormPanel label="Property">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.isPropertyKnownDefault')"
                        @update:modelValue="handleAncestorInput('configurations.isPropertyKnownDefault', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.allowedPropertyAddressInputFields')"
                        @update:modelValue="handleAncestorInput('configurations.allowedPropertyAddressInputFields', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('configurations.setDefaultPropertyTypeForTBD')"
                        @update:modelValue="handleAncestorInput('configurations.setDefaultPropertyTypeForTBD', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn v-show="formDataCurrentOfAncestor.configurations.setDefaultPropertyTypeForTBD !== '0'" tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.defaultPropertyTypeForTBD')"
                        @update:modelValue="handleAncestorInput('configurations.defaultPropertyTypeForTBD', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectEstimatedPropertyValue')"
                        @update:modelValue="handleAncestorInput('configurations.collectEstimatedPropertyValue', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelProperty",
    mixins: [FormDescendantMixin],
};
</script>
