<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" :color="(item.id === primaryBranchId) ? 'indigo' : 'yellow'" light/>
        </template>
        <template v-slot:primary-label="item">
            <span :class="(item.id === primaryBranchId) ? 'text-indigo-400' : ''">{{ item.name }}</span>
        </template>
        <template v-slot:secondary-label="item">
            {{ (item.id === primaryBranchId) ? 'Primary Branch' : 'Secondary Branch' }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign User to Branches</div>
                <div class="__typography--body--xs text-grey-700">It's possible to assign multiple branches at once.</div>
                <BrightDropdownSelect
                    id="assignBranches"
                    v-model="multiselectDropdownValue"
                    label="Available Branches"
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
    name: "InputBranches",
    mixins: [FormInputListMixin],
    props: {
        primaryBranchId: {
            type: String,
            required: true,
        },
    },
};
</script>
