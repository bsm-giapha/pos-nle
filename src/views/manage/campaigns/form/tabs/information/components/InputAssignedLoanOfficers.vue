<template>
    <BrightInputList
        v-bind="inputListBindings"
        @add="showAddForm"
        @add-popover-close="hideForm"
        @remove="removeItems"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" light/>
        </template>
        <template v-slot:primary-label="item">
            <span>{{ item.name }}</span>
        </template>
        <template v-slot:secondary-label="item">
            <span>{{ item.email }}</span>
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
                    :disabled="multiselectDropdownValue.length === 0"
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
import { FormInputListMixin } from "@/mixins/form/FormInputListMixin.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "InputAssignedLoanOfficers",
    mixins: [FormInputListMixin],
    inheritAttrs: true,
    props: {
        campaignName: {
            type: String,
            required: true,
        },
    },
    computed: {
        isAuthenticatedUserAnAdmin() {
            const lender = useLenderStore();
            return lender.isAuthenticatedUserAnAdmin;
        },

        bulkEditActions() {
            const bulkEditActions = [
                { eventName: 'remove', action: `Unassign from ${this.campaignName}` },
            ];
            return this.isAuthenticatedUserAnAdmin ? bulkEditActions : [];
        },

        itemActions() {
            const itemActions = [
                { value: 'remove', icon: 'clear', label: `Unassign from ${this.campaignName}` },
            ];
            return this.isAuthenticatedUserAnAdmin ? itemActions : [];
        },

        inputListBindings() {
            return {
                ...this.formPopoverBindings,
                label: `Loan Officers assigned to ${this.campaignName}`,
                optional: true,
                showAddButton: this.isAuthenticatedUserAnAdmin ? this.showAddButton : false,
                bulkEditActions: this.bulkEditActions,
                itemActions: this.itemActions,
            };
        },
    },
    methods: {
        /**
         * Use this to remove all items from an Input List.
         */
        $_removeItems(ids) {
            this.removeItems(ids);
        },
    },
};
</script>
