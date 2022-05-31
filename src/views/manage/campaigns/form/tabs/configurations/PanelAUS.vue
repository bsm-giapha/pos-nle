<template>
    <FormPanel label="AUS">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.ausApprovalRule')"
                        @update:modelValue="handleAncestorInput('configurations.ausApprovalRule', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelAUS",
    mixins: [FormDescendantMixin],
};
</script>
