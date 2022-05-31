<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" :color="(item.id === preferredLoanOfficerAssistantId) ? 'indigo' : 'yellow'" light/>
        </template>
        <template v-slot:primary-label="item">
            <span :class="(item.id === preferredLoanOfficerAssistantId) ? 'text-indigo-400' : ''">{{ item.name }}</span>
        </template>
        <template v-slot:secondary-label="item">
            {{ (item.id === preferredLoanOfficerAssistantId) ? 'Preferred Loan Officer Assistant' : '' }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign Loan Officer Assistants</div>
                <div class="__typography--body--xs text-grey-700">It's possible to assign multiple loan officer assistants at once.</div>
                <BrightDropdownSelect
                    id="assignLoanOfficerAssistants"
                    v-model="multiselectDropdownValue"
                    label="Available Loan Officer Assistants"
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
    name: "InputLoanOfficerAssistants",
    mixins: [FormInputListMixin],
    props: {
        preferredLoanOfficerAssistantId: {
            type: String,
            required: true,
        },
    },
};
</script>
