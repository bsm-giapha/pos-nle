<template>
    <FormPanel label="Info">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow allign-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('role.name')"
                        @update:modelValue="handleAncestorInput('role.name', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('role.subroles')"
                        :multiple-item-truncation="false"
                        @update:modelValue="handleAncestorInput('role.subroles', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "TabRole",
    mixins: [FormDescendantMixin],
};
</script>
