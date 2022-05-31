<template>
    <FormPanel label="Credit">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('configurations.allowCreditToRun')"
                        @update:modelValue="handleAncestorInput('configurations.allowCreditToRun', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightRadioGroup
                        v-bind="bindAncestorInput('configurations.creditPullType')"
                        @update:modelValue="handleAncestorInput('configurations.creditPullType', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelConfigurationsCredit",
    mixins: [FormDescendantMixin],
};
</script>
