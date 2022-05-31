<template>
    <FormPanel label="Campaign">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.showInCreateNewApplication')"
                        @update:modelValue="handleAncestorInput('configurations.showInCreateNewApplication', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.checkForReturningUsers')"
                        @update:modelValue="handleAncestorInput('configurations.checkForReturningUsers', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="showApplicationScope">
                <BrightColumn tablet="6">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.applicationScope')"
                        @update:modelValue="handleAncestorInput('configurations.applicationScope', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelCampaign",
    mixins: [FormDescendantMixin],
    computed: {
        showApplicationScope() {
            return this.inputMetadataOfAncestor.configurations.applicationScope.options.length > 1;
        },
    },
};
</script>
