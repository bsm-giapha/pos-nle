<template>
    <div>
        <BrightModalPopout
            v-bind="popoutBindings"
            @closed="isAddingItem = false; isEditingItem = false;"
        >
            <BrightForm autocomplete="new-password">
                <BrightInputText
                    id="addNewItemState"
                    v-model="itemFormData.addNewItemState"
                    label="Imaginary State"
                    sub-label="This isn't validated against anything, so you can make up your own state name."
                    placeholder="Calivada"
                />
                <BrightInputText
                    id="addNewItemStateAbbreviation"
                    v-model="itemFormData.addNewItemStateAbbreviation"
                    label="Imaginary State Two-Letter Abbreviation"
                    sub-label="What two letters would make up this imaginary state's abbreviation?"
                    placeholder="(e.g. CV)"
                />
                <BrightInputText
                    id="addNewItemLicense"
                    v-model="itemFormData.addNewItemLicense"
                    label="Imaginary State License Number"
                    placeholder="(e.g. CV-1234578)"
                />

                <BrightInputGroup id="addNewItemAssignmentRules" label="Assignment Rules">
                    <BrightCheckbox id="addNewItemCompany" v-model="itemFormData.isInRoundRobin" label="Include in Company Round Robin"/>
                    <BrightCheckbox id="addNewItemBranch" v-model="itemFormData.isInBranchRoundRobin" label="Include in Branch Round Robin"/>
                    <BrightCheckbox id="addNewItemZip" v-model="itemFormData.isInZipcodeRoundRobin" label="Include in Zip Code Round Robin"/>
                </BrightInputGroup>
            </BrightForm>
            <template v-slot:footer>
                <div class="flex">
                    <BrightButton
                        class="w-1/2 mr-4"
                        use="secondary"
                        @click="isAddingItem = false; isEditingItem = false;"
                        @keydown.space.enter.prevent="isAddingItem = false; isEditingItem = false"
                    >
                        Cancel
                    </BrightButton>
                    <BrightButton
                        class="w-1/2 ml-4"
                        use="primary"
                        @click="handleFormSubmit"
                        @keydown.space.enter.prevent="handleFormSubmit"
                    >
                        {{ (isEditingItem) ? 'Save' : 'Add' }}
                    </BrightButton>
                </div>
            </template>
        </BrightModalPopout>
        <BrightInputList
            ref="inputList"
            v-bind="bindings"
            v-model="items"
            @add="isAddingItem = true"
            @edit="handleEditRequest"
            @item-click="handleEditRequest"
            @remove="handleRemove"
        >
            <template v-slot:left-section="item">
                <BrightAvatar :name="item.twoLetterLabel" light color="yellow"/>
            </template>
            <template v-slot:primary-label="item">
                {{ item.state }}
            </template>
            <template v-slot:secondary-label="item">
                {{ (item.isInRoundRobin) ? 'Company' : '' }}
                {{ (item.isInBranchRoundRobin) ? 'Branch' : '' }}
                {{ (item.isInZipcodeRoundRobin) ? 'Zip' : '' }}
                {{ (!item.isInRoundRobin && !item.isInBranchRoundRobin && !item.isInZipcodeRoundRobin) ? 'Not in any rules' : '' }}
            </template>
            <template v-slot:tertiary-label="item">
                {{ item.licenseNum }}
            </template>
        </BrightInputList>
    </div>
</template>

<script>
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout";
import BrightForm from "@/bright/components/input-library/form/BrightForm";
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory";
import BrightCheckbox from "@/bright/components/input-library/checkbox/BrightCheckbox";
const _BrightNotificationFactory = new BrightNotificationFactory();
import items from "./items";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "VuePressExampleAddingItems",
    components: {
        BrightCheckbox,
        BrightButton,
        BrightForm,
        BrightModalPopout,
        BrightAvatar,
        BrightInputList,
        BrightInputGroup,
        BrightInputText,
    },
    data() {
        return {
            newlyAddedItems: [],
            isAddingItem: false,
            isEditingItem: false,
            editingItemID: '',
            items: _cloneDeep(items),
            itemFormData: {
                addNewItemState: '',
                addNewItemStateAbbreviation: '',
                addNewItemLicense: '',
                isInRoundRobin: false,
                isInBranchRoundRobin: false,
                isInZipcodeRoundRobin: false,
            },
        };
    },
    computed: {
        bindings() {
            return {
                id: 'inputListAdding',
                label: 'State Licensing',
                items: this.items,
                showAddButton: true,
                showSortButton: true,
                showLeftSection: true,
                itemsAreClickable: true,
                itemActions: [
                    { value: 'edit', icon: 'edit', label: 'Edit' },
                    { value: 'remove', icon: 'close', label: 'Remove' },
                ],
                currentSort: 'asc',
                sortOptions: [
                    { value: 'asc', label: 'Alphabetical (A to Z)', sort: this.sortAscending },
                    { value: 'desc', label: 'Alphabetical (Z to A)', sort: this.sortDescending },
                ],
            };
        },
        popoutBindings() {
            return {
                id: 'addingPopoutForm',
                label: (this.isAddingItem) ? 'Add State License' : 'Edit State License',
                show: this.isAddingItem || this.isEditingItem,
                closeFocusID: (this.isEditingItem) ? this.editingItemID : 'showcase-Add',
            };
        },
    },
    methods: {
        sortAscending(a, b) {
            const nameA = a.state.toLowerCase();
            const nameB = b.state.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        },
        sortDescending(a, b) {
            const nameA = a.state.toLowerCase();
            const nameB = b.state.toLowerCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        },
        handleEditRequest(itemID) {
            this.isEditingItem = true;
            this.editingItemID = itemID;
            let editedItem = this.items.find(item => item.id === itemID);

            this.itemFormData.addNewItemStateAbbreviation = editedItem.twoLetterLabel;
            this.itemFormData.addNewItemState = editedItem.state;
            this.itemFormData.addNewItemLicense = editedItem.licenseNum;
            this.itemFormData.isInRoundRobin = editedItem.isInRoundRobin;
            this.itemFormData.isInBranchRoundRobin = editedItem.isInBranchRoundRobin;
            this.itemFormData.isInZipcodeRoundRobin = editedItem.isInZipcodeRoundRobin;
        },
        handleFormSubmit() {
            if (this.isAddingItem) {
                this.items.push({
                    id: this.$refs.inputList.$_getUniqueIDForNewItem(),
                    state: this.itemFormData.addNewItemState,
                    twoLetterLabel: this.itemFormData.addNewItemStateAbbreviation,
                    licenseNum: this.itemFormData.addNewItemLicense,
                    isInRoundRobin: this.itemFormData.isInRoundRobin,
                    isInBranchRoundRobin: this.itemFormData.isInBranchRoundRobin,
                    isInZipcodeRoundRobin: this.itemFormData.isInZipcodeRoundRobin,
                });

                _BrightNotificationFactory.createNotification({
                    type: 'success',
                    icon: 'check_circle',
                    label: 'New State License',
                    subLabel: `${this.itemFormData.addNewItemState} was created successfully.`,
                });

                this.isAddingItem = false;
            } else {
                let editedItem = this.items.find(item => item.id === this.editingItemID);
                editedItem.twoLetterLabel = this.itemFormData.addNewItemStateAbbreviation;
                editedItem.state = this.itemFormData.addNewItemState;
                editedItem.licenseNum = this.itemFormData.addNewItemLicense;
                editedItem.isInRoundRobin = this.itemFormData.isInRoundRobin;
                editedItem.isInBranchRoundRobin = this.itemFormData.isInBranchRoundRobin;
                editedItem.isInZipcodeRoundRobin = this.itemFormData.isInZipcodeRoundRobin;

                _BrightNotificationFactory.createNotification({
                    type: 'success',
                    icon: 'save',
                    label: 'Edited State License',
                    subLabel: `Changes to ${this.itemFormData.addNewItemState} were saved successfully.`,
                });

                this.isEditingItem = false;
            }

            this.itemFormData.addNewItemStateAbbreviation = '';
            this.itemFormData.addNewItemState = '';
            this.itemFormData.addNewItemLicense = '';
            this.itemFormData.isInRoundRobin = false;
            this.itemFormData.isInBranchRoundRobin = false;
            this.itemFormData.isInZipcodeRoundRobin = false;
        },
        handleRemove(itemsToBeRemoved) {
            itemsToBeRemoved.forEach((itemID) => {
                const indexOfItem = this.items.findIndex(item => item.id === itemID);
                this.items.splice(indexOfItem, 1);
            });

            _BrightNotificationFactory.createNotification({
                type: 'info',
                icon: 'delete',
                label: 'Removed State Licenses',
                subLabel: `${itemsToBeRemoved.length} state license${itemsToBeRemoved.length > 1 ? "s were" : " was"} removed successfully.`,
            });
        },
    },
};
</script>
