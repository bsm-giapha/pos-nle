<template>
    <div class="PanelLicensing">
        <FormPanel label="Licensing">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn tablet="5" desktop="4">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('licensing.agentType')"
                            @update:modelValue="handleAncestorInput('licensing.agentType', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn tablet="7" desktop="5">
                        <BrightInputText
                            v-bind="bindAncestorInput('licensing.license')"
                            @update:modelValue="handleAncestorInput('licensing.license', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelLicensing",
    mixins: [FormDescendantMixin],
};
</script>
