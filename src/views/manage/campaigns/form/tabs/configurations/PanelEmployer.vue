<template>
    <FormPanel label="Employer">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectEmployerStreetAddress')"
                        @update:modelValue="handleAncestorInput('configurations.collectEmployerStreetAddress', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectEmployerCity')"
                        @update:modelValue="handleAncestorInput('configurations.collectEmployerCity', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectEmployerState')"
                        @update:modelValue="handleAncestorInput('configurations.collectEmployerState', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectEmployerZipcode')"
                        @update:modelValue="handleAncestorInput('configurations.collectEmployerZipcode', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.collectEmployerPhoneNumber')"
                        @update:modelValue="handleAncestorInput('configurations.collectEmployerPhoneNumber', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelEmployer",
    mixins: [FormDescendantMixin],
};
</script>
