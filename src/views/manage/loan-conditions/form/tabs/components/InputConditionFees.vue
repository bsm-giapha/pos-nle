<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm(); feeType = ''; feeAmount = '';"
        @remove="removeItems"
    >
        <template v-slot:primary-label="item">
            ${{ item.fee }}
        </template>
        <template v-slot:secondary-label="item">
            {{ _startCase(item.name) }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add Fee to this Condition</div>
                <BrightDropdownSelect
                    id="feeType"
                    v-model="feeType"
                    label="Type"
                    :options="assignableFeeTypes"
                />
                <BrightInputMoney
                    id="feeAmount"
                    v-model="feeAmount"
                    label="Amount"
                />
                <BrightButton
                    use="primary"
                    full-width
                    @click="addItems(createItemObject())"
                    @keydown.space.enter.prevent="addItems(createItemObject())"
                >
                    Add
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>

<script>
import { FormInputListMixin } from "@/mixins/form/FormInputListMixin.js";
import BrightInputMoney from "@/bright/components/input-library/money/BrightInputMoney.vue";
import _startCase from "lodash/startCase";

export default {
    name: "InputConditionFees",
    components: { BrightInputMoney },
    mixins: [FormInputListMixin],
    data() {
        return {
            feeType: '',
            feeAmount: '',
        };
    },
    computed: {
        assignableFeeTypes() {
            return [
                { id: 'Appraisal', label: 'Appraisal', value: 'Appraisal' },
                { id: 'CreditReport', label: 'Credit Report', value: 'CreditReport' },
            ].filter(feeOption => !this.itemsInList.some(conditionFee => conditionFee.id === feeOption.id));
        },
    },
    methods: {
        createItemObject() {
            return [{
                id: this.feeType,
                name: this.feeType,
                type: this.feeType,
                fee: this.feeAmount,
            }];
        },
        _startCase(value) {
            return _startCase(value);
        },
    },
};
</script>
