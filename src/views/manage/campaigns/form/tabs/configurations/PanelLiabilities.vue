<template>
    <FormPanel label="Liabilities">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectLiabilities')"
                        @update:modelValue="handleAncestorInput('configurations.collectLiabilities', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.allowREOPropertyLinkToLiability')"
                        @update:modelValue="handleAncestorInput('configurations.allowREOPropertyLinkToLiability', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelLiabilities",
    mixins: [FormDescendantMixin],
};
</script>
