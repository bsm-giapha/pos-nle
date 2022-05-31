<template>
    <div>
        <BrightInputList
            v-bind="inputListBindings"
            @remove="removeItems"
            @add="showAddForm"
            @edit="showEditForm"
            @item-click="showEditForm"
        >
            <template v-slot:primary-label="item">
                {{ item.name }}
            </template>
            <template v-slot:secondary-label="item">
                {{ item.losLoanTemplate }}
            </template>
        </BrightInputList>
        <FormCustomLoanTemplates v-bind="bindDescendantModalForm" singular-resource-label="Custom Loan Template" @submit="upsertItem"/>
    </div>
</template>

<script>
import FormCustomLoanTemplates from "@/views/manage/branches/form/tabs/configurations/components/FormCustomLoanTemplates.vue";
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";

export default {
    name: "InputCustomLoanTemplates",
    components: { FormCustomLoanTemplates },
    mixins: [FormDescendantInputListMixin],
    computed: {
        inputListBindings() {
            return {
                ...this.formModalBindings,
                label: 'Custom Loan Templates',
                optional: true,
            };
        },
    },
};
</script>
