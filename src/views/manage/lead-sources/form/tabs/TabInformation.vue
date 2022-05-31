<template>
    <div>
        <FormPanel label="Lead Source">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn desktop="6">
                        <BrightInputText
                            v-bind="bindAncestorInput('information.name')"
                            @update:modelValue="handleAncestorInput('information.name', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn desktop="6">
                        <BrightInputText
                            v-bind="bindAncestorInput('information.value')"
                            @update:modelValue="handleAncestorInput('information.value', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import FormPanel from "@/components/form/FormPanel.vue";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "TabInformation",
    components: {
        FormPanel,
    },
    mixins: [FormDescendantMixin],
};
</script>
