<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @remove="removeItems"
    >
        <template v-slot:primary-label="item">
            <span :class="(item.id === defaultLeadSourceId) ? 'text-indigo-400' : ''">{{ item.name }}</span>
        </template>
        <template v-slot:secondary-label="item">
            {{ (item.id === defaultLeadSourceId) ? 'Default Lead Source' : '' }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign User to Lead Sources</div>
                <div class="__typography--body--xs text-grey-700">It's possible to assign multiple lead sources at once.</div>
                <BrightDropdownSelect
                    id="assignLeadSources"
                    v-model="multiselectDropdownValue"
                    label="Available Lead Sources"
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
    name: "InputLeadSources",
    mixins: [FormInputListMixin],
    props: {
        defaultLeadSourceId: {
            type: [Number, String],
            required: true,
        },
    },
};
</script>
