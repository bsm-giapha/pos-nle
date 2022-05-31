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
        <template v-slot:secondary-label="item">
            <span>{{ item.role }}</span>
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add Member</div>
                <div class="__typography--body--xs text-grey-700">It's possible to add multiple members at once.</div>
                <BrightDropdownSelect
                    id="teamMembers"
                    v-model="multiselectDropdownValue"
                    label="Team Members"
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
import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList.vue";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";

export default {
    name: "InputTeamMembers",
    components: {
        BrightInputList,
        BrightDropdownSelect,
        BrightButton,
    },
    mixins: [FormDescendantInputListMixin],
};
</script>

<style scoped>

</style>
