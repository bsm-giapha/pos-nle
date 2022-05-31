<template>
    <FormPanel label="Platform">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('account.accountStatus')"
                        @update:modelValue="handleAncestorInput('account.accountStatus', $event)"
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow v-show="hasGeneralPermission('AllowAdminCreateDemoUser')" align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('account.canCreateTestApplications')"
                        @update:modelValue="handleAncestorInput('account.canCreateTestApplications', $event)"
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow v-if="ancestorIsAddForm" align-items="end">
                <BrightColumn desktop="8">
                    <BrightCheckbox
                        v-bind="bindAncestorInput('account.sendEmailToUserOnCreation')"
                        @update:modelValue="handleAncestorInput('account.sendEmailToUserOnCreation', $event)"
                    />
                </BrightColumn>
            </BrightRow>

            <BrightRow v-if="ancestorIsEditForm" align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('account.isInTaskRoundRobin')"
                        @update:modelValue="handleAncestorInput('account.isInTaskRoundRobin', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelPlatform",
    mixins: [FormDescendantMixin],
};
</script>
