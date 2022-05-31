<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" color="yellow" light/>
        </template>
        <template v-slot:primary-label="item">
            <span>{{ item.name }}</span>
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign Branches to this Lead Source</div>
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
                    Assign
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>

<script>
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";

export default {
    name: "InputBranchesAssigned",
    mixins: [FormDescendantInputListMixin],
    computed: {
        itemsInList() {
            return this.modelValue.filter((item) => this.allPossibleItems.includes(item));
        },
    },
};
</script>
