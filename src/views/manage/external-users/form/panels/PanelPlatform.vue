<template>
    <div class="PanelPlatform">
        <FormPanel label="Platform">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn>
                        <BrightSwitch
                            v-bind="bindAncestorInput('platform.accountStatus')"
                            @update:modelValue="handleAncestorInput('platform.accountStatus', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-if="ancestorIsAddForm" align-items="end">
                    <BrightColumn desktop="8">
                        <BrightCheckbox
                            v-bind="bindAncestorInput('platform.sendEmail')"
                            @update:modelValue="handleAncestorInput('platform.sendEmail', $event)"
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
    name: "PanelPlatform",
    mixins: [FormDescendantMixin],
};
</script>
