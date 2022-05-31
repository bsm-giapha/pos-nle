<template>
    <FormPanel label="Documents & Letters">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightSwitch
                        v-bind="bindAncestorInput('configurations.useLogoForDocs')"
                        @update:modelValue="handleAncestorInput('configurations.useLogoForDocs', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightInputText
                        v-bind="bindAncestorInput('configurations.docDisplayName')"
                        @update:modelValue="handleAncestorInput('configurations.docDisplayName', $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow v-show="companyDesignations.length" align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('configurations.companyDesignation')"
                        :options="companyDesignationOptionsList"
                        @update:modelValue="handleAncestorInput('configurations.companyDesignation', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "PanelDocumentsAndLetters",
    mixins: [FormDescendantMixin],
    computed: {
        companyDesignations() {
            const lender = useLenderStore();
            return lender.companyDesignations;
        },
        companyDesignationOptionsList() {
            return this.companyDesignations.map((designation, index) => {
                return {
                    id: 'companyDesignation' + index,
                    label: designation,
                    value: designation,
                };
            });
        },
    },
};
</script>

<style scoped>

</style>
