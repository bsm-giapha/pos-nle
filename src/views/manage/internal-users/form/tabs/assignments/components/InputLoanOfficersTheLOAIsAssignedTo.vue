<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" :color="preferredLOAToTheseLOs.includes(item.id) ? 'indigo' : 'yellow'" light/>
        </template>
        <template v-slot:primary-label="item">
            <span :class="preferredLOAToTheseLOs.includes(item.id) ? 'text-indigo-400' : ''">{{ item.name }}</span>
        </template>
        <template v-slot:secondary-label="item">
            {{ preferredLOAToTheseLOs.includes(item.id) ? `${item.name}'s preferred Loan Officer Assistant is this User.` : '' }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign Loan Officers</div>
                <div class="__typography--body--xs text-grey-700">It's possible to assign multiple loan officers at once.</div>
                <BrightDropdownSelect
                    id="assignLoanOfficers"
                    v-model="multiselectDropdownValue"
                    label="Available Loan Officers"
                    hide-label
                    multiple
                    :options="selectDropdownOptionsForItemsNotInList"
                />
                <BrightButton
                    use="primary"
                    full-width
                    @click="addItems(multiselectDropdownValue)"
                    @keydown.space.enter.prevent="addItems(multiselectDropdownValue)"
                >
                    Add
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>

<script>
import { FormInputListMixin } from "@/mixins/form/FormInputListMixin.js";

export default {
    name: "InputLoanOfficersTheLOAIsAssignedTo",
    mixins: [FormInputListMixin],
    props: {
        preferredLOAToTheseLOs: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
};
</script>
