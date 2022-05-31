<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="handleRemove"
    >
        <template v-slot:primary-label="item">
            <span>{{ item.zipcode }}</span>
        </template>
        <template v-slot:secondary-label="item">
            {{ (item.isInBranchRoundRobin) ? 'Included in Branch Assignment Rules' : 'Not included in Branch Assignment Rules' }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add Operational Zipcode</div>
                <BrightInputNumber
                    id="zipcode"
                    v-model="zipcodeFormData.zipcode"
                    label="Zipcode"
                />
                <BrightSwitch
                    id="isInBranchRoundRobin"
                    v-model="zipcodeFormData.isInBranchRoundRobin"
                    label="Include in Branch Assignment Rules"
                    :checked="false"
                />
                <BrightButton
                    use="primary"
                    :disabled="!zipcodeFormData.zipcode"
                    full-width
                    @click="handleAdd"
                    @keydown.space.enter.prevent="handleAdd"
                >
                    Add
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>

<script>
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";
import _cloneDeep from "lodash/cloneDeep";
export default {
    name: 'InputOperationalZipcodes',
    mixins: [FormDescendantInputListMixin],
    data() {
        return {
            zipcodeFormData: {
                zipcode: 0,
                isInBranchRoundRobin: false,
            },
        };
    },
    computed: {
        operationalZipcodes() {
            return this.formDataCurrentOfAncestor.assignments.operationalZipcodes;
        },
        sortOptions() {
            return [
                { value: 'asc', label: 'Numerical (Smallest to Largest)', sort: this.sortZipCodesAscending },
                { value: 'desc', label: 'Numerical (Largest to Smallest)', sort: this.sortZipCodesDescending },
            ];
        },
    },
    methods: {
        handleAdd() {
            let operationalZipcodes = _cloneDeep(this.operationalZipcodes);
            let zipcode = { zipcode: this.zipcodeFormData.zipcode, isInBranchRoundRobin: this.zipcodeFormData.isInBranchRoundRobin };
            operationalZipcodes.push(zipcode);
            this.$emit('update:modelValue', operationalZipcodes);
            this.hideForm();
            this.zipcodeFormData.zipcode = 0;
            this.zipcodeFormData.isInBranchRoundRobin = false;
        },
        sortZipCodesAscending(a, b) {
            const numberA = a.zipcode;
            const numberB = b.zipcode;

            if (numberA < numberB) return -1;
            if (numberA > numberB) return 1;
            return 0;
        },
        sortZipCodesDescending(a, b) {
            const numberA = a.zipcode;
            const numberB = b.zipcode;

            if (numberA > numberB) return -1;
            if (numberA < numberB) return 1;
            return 0;
        },
        handleRemove(toBeRemoved) {
            let operationalZipcodes = _cloneDeep(this.operationalZipcodes);
            toBeRemoved.forEach(id => {
                const index = operationalZipcodes.findIndex(operationalZipcode => operationalZipcode.id === id);
                if (index > -1) {
                    operationalZipcodes.splice(index, 1);
                }
            });

            this.$emit('update:modelValue', operationalZipcodes);
        },
    },

};
</script>
