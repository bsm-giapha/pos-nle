<template>
    <div>
        <BrightInputList
            v-bind="formModalBindings"
            @remove="removeItems"
            @add="showAddForm"
            @edit="showEditForm"
            @item-click="showEditForm"
        >
            <template v-slot:left-section="item">
                <BrightAvatar :name="item.state" light color="yellow"/>
            </template>
            <template v-slot:primary-label="item">
                {{ item.state }}
            </template>
            <template v-slot:tertiary-label="item">
                {{ item.licenseNumber }} {{ getProductTypeDescription(item.productType) }}
            </template>
        </BrightInputList>
        <FormStateLicensing
            v-bind="bindDescendantModalForm"
            singular-resource-label="State License"
            @submit="upsertItem"
            @update:modelValue="$emit('update:modelValue', $event)"
        />
    </div>
</template>

<script>
import FormStateLicensing from "./FormStateLicensing.vue";
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";

export default {
    name: "InputStateLicensing",
    components: { FormStateLicensing },
    mixins: [FormDescendantInputListMixin],
    methods: {
        getProductTypeDescription(productType) {
            if (productType && productType !== 'All') return ' - ' + productType.replace(/([A-Z])/g, ' $1').trim();
            return '';
        },
    },
};
</script>
