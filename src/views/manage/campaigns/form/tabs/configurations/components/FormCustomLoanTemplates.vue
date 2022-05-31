<template>
    <FormModalPopout
        :bind-modal="bindModal"
        :bind-form-wrapper="bindFormWrapper"
        :handle-modal-close="handleModalClose"
    >
        <BrightDropdownSelect
            v-bind="bindInput('program')"
            @update:modelValue="handleInput('program', $event)"
        />

        <BrightDropdownSelect
            v-bind="bindInput('purpose')"
            @update:modelValue="handleInput('purpose', $event)"
        />

        <BrightDropdownSelect
            v-bind="bindInput('amortization')"
            @update:modelValue="handleInput('amortization', $event)"
        />

        <BrightDropdownSelect
            v-bind="bindInput('losLoanTemplate')"
            :options="losLoanTemplateOptions"
            @update:modelValue="handleInput('losLoanTemplate', $event)"
        />
    </FormModalPopout>
</template>

<script>
import { FormAncestorModalMixin } from "@/mixins/form/FormAncestorModalMixin.js";
import Schema from "./FormCustomLoanTemplates.schema.js";
import { useLenderStore } from '@/stores/lender.js';

export default {
    name: "FormCustomLoanTemplates",
    mixins: [FormAncestorModalMixin],
    data() {
        return {
            ...this.getInitialDataFromSchema(Schema, this.isEditForm ? 'edit' : 'add'),
            getFormDataFromApiResourceUrl: false,
        };
    },
    computed: {
        id() {
            return 'FormCustomLoanTemplates';
        },
        apiResourceUrl() {
            let baseUrl = this.addNewPostfixToAncestorApiResourceUrlIfNeeded(this.ancestorApiResourceUrl);
            return `${baseUrl}/custom-loan-templates`;
        },
        formSubmissionHttpMethod() {
            return (this.formType === 'edit') ? 'PUT' : 'POST';
        },

        losLoanTemplateOptions() {
            const lender = useLenderStore();
            let list = [{ label: 'None', value: '' }];
            lender.losLoanTemplates.map(option => {
                list.push({
                    label: option,
                    value: option,
                });
            });
            return list;
        },
    },
};
</script>
