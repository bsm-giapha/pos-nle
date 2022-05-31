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
            {{ item.name }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign Campaigns to User</div>
                <div class="__typography--body--xs text-grey-700">It's possible to assign multiple campaigns at once. Also note: Only LO-specific campaigns are available for assignment.</div>
                <BrightDropdownSelect
                    id="modalCampaignAssignCampaign"
                    v-model="multiselectDropdownValue"
                    label="Available Campaigns"
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
    name: "InputCampaigns",
    mixins: [FormInputListMixin],
};
</script>
