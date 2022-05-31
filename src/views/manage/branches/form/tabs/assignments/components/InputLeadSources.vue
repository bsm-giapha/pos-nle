<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:primary-label="item">
            <span>{{ item.name }}</span>
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add Lead Source</div>
                <div class="__typography--body--xs text-grey-700">It's possible to add multiple lead sources at once.</div>
                <BrightDropdownSelect
                    id="leadSources"
                    v-model="multiselectDropdownValue"
                    label="Lead Sources"
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
    name: "InputLeadSources",
    mixins: [FormDescendantInputListMixin],
};
</script>
