<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:primary-label="item">
            {{ item.name }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add to Branch Scope</div>
                <div class="__typography--body--xs text-grey-700">It's possible to add multiple branches at once.</div>
                <BrightDropdownSelect
                    id="assignBranches"
                    v-model="multiselectDropdownValue"
                    label="Branches"
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
    name: "InputSpecificBranches",
    mixins: [FormInputListMixin],
};
</script>
