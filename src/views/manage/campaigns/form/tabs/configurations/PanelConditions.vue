<template>
    <FormPanel label="Conditions">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.statusThatTriggersInitialConditionsCreation')"
                        @update:modelValue="handleAncestorInput('configurations.statusThatTriggersInitialConditionsCreation', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelConditions",
    mixins: [FormDescendantMixin],
};
</script>
