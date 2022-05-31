<template>
    <FormPanel label="Company">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.role')"
                        :disabled="!isAuthenticatedUserAnAdmin"
                        :hide-meta-label="!isAuthenticatedUserAnAdmin"
                        @update:modelValue="handleAncestorInput('assignments.role', $event)"
                    />
                    <div v-show="ancestorIsEditForm" class="mb-20">
                        <SmartLink :href="`/lender/admin/users/role-assignment-history/${formDataCurrentOfAncestor.id}`" target="_blank">View Role Assignment History</SmartLink>
                    </div>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-if="ancestorIsEditForm" align-items="end">
                <BrightColumn tablet="6" desktop="4">
                    <BrightInputText
                        v-bind="bindAncestorInput('assignments.region')"
                        @update:modelValue="handleAncestorInput('assignments.region', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import SmartLink from "@/components/navigation/SmartLink.vue";

export default {
    name: "PanelCompany",
    components: { SmartLink },
    mixins: [FormDescendantMixin],
};
</script>
