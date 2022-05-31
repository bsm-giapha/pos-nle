<template>
    <FormPanel label="Assets">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectAssets')"
                        @update:modelValue="handleAncestorInput('configurations.collectAssets', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.showLTV')"
                        @update:modelValue="handleAncestorInput('configurations.showLTV', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelAssets",
    mixins: [FormDescendantMixin],
};
</script>
