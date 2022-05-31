<template>
    <FormPanel label="Product & Pricing">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow v-show="ardentCanUpdateResource('Lender.OfferingHomeEquityProducts')">
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.isForHELOC')"
                        @update:modelValue="handleAncestorInput('configurations.isForHELOC', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="ardentCanUpdateResource('Lender.OfferingHomeEquityProducts') && formDataCurrentOfAncestor.configurations.isForHELOC">
                <BrightColumn>
                    <!-- TODO: Convert this into a BrightInputFile component once that's available in Bright -->
                    <BrightInputText
                        v-bind="bindAncestorInput('configurations.helocDisclosure')"
                        @update:modelValue="handleAncestorInput('configurations.helocDisclosure', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.isProductFHA')"
                        @update:modelValue="handleAncestorInput('configurations.isProductFHA', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.isProductVA')"
                        @update:modelValue="handleAncestorInput('configurations.isProductVA', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="ardentCanUpdateResource('Lender.Campaign.BeSmarteePPE')">
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.useBeSmarteePPE')"
                        @update:modelValue="handleAncestorInput('configurations.useBeSmarteePPE', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.showAmortization')"
                        @update:modelValue="handleAncestorInput('configurations.showAmortization', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelProductAndPricing",
    mixins: [FormDescendantMixin],
};
</script>
