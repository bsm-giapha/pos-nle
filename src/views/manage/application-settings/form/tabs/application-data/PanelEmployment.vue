<template>
    <FormPanel label="Employment">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow v-for="field in employmentFields" :key="field">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput(`applicationData.${field}`)"
                        @update:modelValue="handleAncestorInput(`applicationData.${field}`, $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelEmployment",
    mixins: [FormDescendantMixin],
    data() {
        return {
            employmentFields: [
                'requireEmployerStreetAddress',
                'requireEmployerAddressCity',
                'requireEmployerAddressState',
                'requireEmployerAddressZipcode',
            ],
        };
    },
};
</script>
