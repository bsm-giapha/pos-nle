<template>
    <div class="PanelCompany">
        <FormPanel label="Company">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn tablet="9">
                        <BrightInputText
                            v-bind="bindAncestorInput('company.company')"
                            @update:modelValue="handleAncestorInput('company.company', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn mobile="7" tablet="6">
                        <BrightInputText
                            v-bind="bindAncestorInput('company.office')"
                            @update:modelValue="handleAncestorInput('company.office', $event)"
                        />
                    </BrightColumn>
                    <BrightColumn mobile="5" tablet="6">
                        <BrightInputState
                            v-bind="bindAncestorInput('company.officeState')"
                            @update:modelValue="handleAncestorInput('company.officeState', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import BrightInputState from "@/bright/components/input-library/state/BrightInputState.vue";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelCompany",
    components: { BrightInputState },
    mixins: [FormDescendantMixin],
};
</script>
