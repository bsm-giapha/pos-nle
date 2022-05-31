<template>
    <FormPanel label="Status">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('information.isActive')"
                        @update:modelValue="handleAncestorInput('information.isActive', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelStatus",
    mixins: [FormDescendantMixin],
};
</script>
