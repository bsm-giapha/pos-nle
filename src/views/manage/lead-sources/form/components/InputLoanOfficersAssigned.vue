<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm()"
        @action:click="handleActionClick"
        @remove="removeItems"
        @set-as-default="$emit('set-as-default', $event)"
        @remove-as-default="$emit('remove-as-default', $event)"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" :color="(currentLeadSourceID === getLoanOfficersDefaultLeadSourceID(item.id)) ? 'indigo' : 'yellow'" light/>
        </template>
        <template v-slot:primary-label="item">
            <span :class="(currentLeadSourceID === getLoanOfficersDefaultLeadSourceID(item.id)) ? 'text-indigo-400' : ''">{{ item.name }}</span>
        </template>
        <template v-slot:secondary-label="item">
            {{ (currentLeadSourceID === getLoanOfficersDefaultLeadSourceID(item.id)) ? `${leadSourceName} is set as their Default Lead Source` : '' }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Assign Loan Officers to this Lead Source</div>
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
                    Assign
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "InputLoanOfficersAssigned",
    mixins: [FormDescendantInputListMixin],
    inheritAttrs: true,
    props: {
        currentLeadSourceID: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    emits: ['set-as-default', 'update:modelValue'],
    data() {
        return {
            isSettingAsDefault: false,
        };
    },
    computed: {
        /**
       * @override from FormInputListMixin.js
       */
        itemsInList() {
            let itemsInList = [];
            if (this.modelValue) {
                for (const [userPublicID] of Object.entries(this.modelValue)) {
                    itemsInList.push(this.allPossibleItems.find(item => item === userPublicID));
                }
            }
            return itemsInList;
        },

        leadSourceName() {
            const lender = useLenderStore();
            if (lender.leadSources === undefined|| lender.leadSources.find(item => item.id === this.currentLeadSourceID) === undefined) return 'This lead source';
            return lender.leadSources.find(item => item.id === this.currentLeadSourceID).information.name;
        },

        loanOfficersAssigned() {
            return this.formDataCurrentOfAncestor.assignments.loanOfficersAssigned;
        },
        bulkEditActions() {
            return [
                { eventName: 'unassign-loan-officer', action: 'Unassign loan officer', icon: 'delete' },
            ];
        },
        itemActions() {
            const itemActions = [
                { value: 'unassign-loan-officer', icon: 'delete', label: 'Unassign loan officer' },
            ];

            if (this.currentLeadSourceID !== 0) { // Only allow the setting of a default on the Edit Form.
                if (this.isSettingAsDefault) {
                    itemActions.unshift({ value: 'set-as-default', icon: 'star', label: 'Set this Lead Source as their Default Lead Source' });
                } else {
                    itemActions.unshift({ value: 'remove-as-default', icon: 'star', label: 'Remove this Lead Source as their Default Lead Source' });
                }
            }

            return itemActions;
        },
    },
    methods: {
        /**
       * @override from FormInputListMixin.js
       */
        addItems(itemsToBeAdded) {
            let itemsInList = _cloneDeep(this.itemsInList);
            itemsToBeAdded.forEach(id => {
                if (!itemsInList.some(item => item === id)) {
                    this.loanOfficersAssigned[id] = { defaultLeadSourceID: null };

                    const toAdd = this.allPossibleItems.find(item => item === id);
                    itemsInList.push(toAdd);
                }
            });

            this.$emit('update:modelValue', this.loanOfficersAssigned);
            this.hideForm();
        },

        /**
         * * @override from FormInputListMixin.js
         */
        removeItems(idsOfItemsToBeRemoved) {
            let itemsInList = _cloneDeep(this.itemsInList);
            idsOfItemsToBeRemoved.forEach(id => {
                const index = itemsInList.findIndex(item => item.id === id);
                if (index > -1) {
                    itemsInList.splice(index, 1);
                }
                delete this.loanOfficersAssigned[id];
            });
          
            this.$emit('update:modelValue', this.loanOfficersAssigned);
        },
        getLoanOfficersDefaultLeadSourceID(loanOfficerPublicID) {
            if (typeof this.formDataCurrentOfAncestor.assignments.loanOfficersAssigned !== 'object' || this.formDataCurrentOfAncestor.assignments.loanOfficersAssigned[loanOfficerPublicID] === undefined) return null;
            return this.formDataCurrentOfAncestor.assignments.loanOfficersAssigned[loanOfficerPublicID]['defaultLeadSourceID'];
        },
        handleActionClick(loanOfficerPublicID) {
            if (this.loanOfficersAssigned[loanOfficerPublicID] === undefined) return;
            this.isSettingAsDefault = this.loanOfficersAssigned[loanOfficerPublicID]['defaultLeadSourceID'] !== this.currentLeadSourceID;
        },
    },
};
</script>
