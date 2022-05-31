<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightModalPopout
                        v-bind="popoutBindings"
                        @closed="isAddingItem = false; isEditingItem = false;"
                    >
                        <BrightForm autocomplete="new-password">
                            <BrightInputText
                                id="newItemState"
                                v-model="itemFormData.newItemState"
                                label="Imaginary State"
                                sub-label="This isn't validated against anything, so you can make up your own state name."
                                placeholder="Calivada"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="newItemStateAbbreviation"
                                v-model="itemFormData.newItemStateAbbreviation"
                                label="Imaginary State Two-Letter Abbreviation"
                                sub-label="What two letters would make up this imaginary state's abbreviation?"
                                placeholder="(e.g. CV)"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="newItemLicense"
                                v-model="itemFormData.newItemLicense"
                                label="Imaginary State License Number"
                                placeholder="(e.g. CV-1234578)"
                                hide-meta-label
                            />

                            <BrightInputGroup id="assignmentRules" label="Assignment Rules">
                                <BrightCheckbox
                                    id="newItemCompany"
                                    v-model="itemFormData.isInRoundRobin"
                                    label="Include in Company Round Robin"
                                    hide-meta-label
                                />
                                <BrightCheckbox
                                    id="newItemBranch"
                                    v-model="itemFormData.isInBranchRoundRobin"
                                    label="Include in Branch Round Robin"
                                    hide-meta-label
                                />
                                <BrightCheckbox
                                    id="newItemZip"
                                    v-model="itemFormData.isInZipcodeRoundRobin"
                                    label="Include in Zip Code Round Robin"
                                    hide-meta-label
                                />
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
                        @remove="handleRemove"
                        @add="isAddingItem = true"
                        @edit="handleEditRequest"
                        @item-click="handleEditRequest"
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
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none" class="mt-16">
            <BrightColumn>
                <BrightCard
                    ribbon="blue"
                    :expandable="true"
                    label="Interactive Playground"
                    sub-label="Use this playground to interact with the above component in different states and settings."
                >
                    <BrightRow class="mt-24">
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Text</div>
                            <BrightInputText
                                id="playgroundLabel"
                                v-model="label"
                                label="Label"
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundSubLabel"
                                v-model="subLabel"
                                label="Sub Label"
                                hide-meta-label
                            />

                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="warning"/> Empty States</div>
                            <BrightInputText
                                id="playgroundNoItemsMessage"
                                v-model="noItemsMessage"
                                label="No Items Message"
                                sub-label="This gets displayed when there are no items in an Input List."
                                hide-meta-label
                            />
                            <BrightInputText
                                id="playgroundNoSearchResultsMessage"
                                v-model="noSearchResultsMessage"
                                label="No Search Results Message"
                                sub-label="This gets displayed when the user searches and there are no search results."
                                hide-meta-label
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="list"/> Items</div>
                            <BrightInputNumber
                                id="playgroundNumberOfItemsShowInitially"
                                v-model.number="numberOfItemsShownInitially"
                                label="Number of Items Shown Initially"
                                negative
                                sub-label="Set this to -1 to show the entire list on initial load."
                            />
                            <BrightSwitch id="playgroundShowLeftSection" v-model="showLeftSection" label="Show Left Section"/>

                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Structure & Styling</div>
                            <BrightInputGroup label="Toggleable" hide-label class="mb-8">
                                <BrightSwitch id="playgroundHideLabel" v-model="hideLabel" label="Hide Label"/>
                                <BrightSwitch id="playgroundHideSubLabel" v-model="hideSubLabel" label="Hide Sub-Label"/>
                                <BrightSwitch id="playgroundShowAddButton" v-model="showAddButton" label="Show Add Button"/>
                                <BrightSwitch id="playgroundShowShowSortButton" v-model="showSortButton" label="Show Sort Button"/>
                                <BrightSwitch id="playgroundHideSearch" v-model="hideSearch" label="Hide Search"/>
                            </BrightInputGroup>
                        </BrightColumn>
                    </BrightRow>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</template>

<script>
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar";
import BrightInputNumber from "@/bright/components/input-library/number/BrightInputNumber";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout";
import BrightForm from "@/bright/components/input-library/form/BrightForm";
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory";
import BrightCheckbox from "@/bright/components/input-library/checkbox/BrightCheckbox";
import items from "./items";
import _cloneDeep from "lodash/cloneDeep";
const _BrightNotificationFactory = new BrightNotificationFactory();

export default {
    name: "VuePressUIPlaygroundInputList",
    components: {
        BrightCheckbox,
        BrightButton,
        BrightForm,
        BrightModalPopout,
        BrightInputNumber,
        BrightAvatar,
        BrightInputList,
        BrightIcon,
        BrightInputGroup,
        BrightCard,
        BrightSwitch,
        BrightInputText,
        BrightRow,
        BrightGrid,
        BrightColumn,
    },
    data() {
        return {
            id: 'inputListUIPlayground',
            label: 'State Licensing',
            subLabel: 'These are the current state licenses for this user.',
            hideLabel: false,
            hideSubLabel: false,
            showAddButton: true,
            showSortButton: true,
            hideSearch: false,
            noItemsMessage: 'No entries were found.',
            noSearchResultsMessage: 'Unfortunately, no search results were found.',
            numberOfItemsShownInitially: 10,
            showLeftSection: true,
            newlyAddedItems: [],
            isAddingItem: false,
            isEditingItem: false,
            editingItemID: '',
            bulkEditActions: [
                { eventName: 'remove', action: 'Remove', icon: 'delete' },
            ],
            sortOptions: [
                { value: 'asc', label: 'Alphabetical (A to Z)', sort: this.sortAscending },
                { value: 'desc', label: 'Alphabetical (Z to A)', sort: this.sortDescending },
            ],
            itemActions: [
                { value: 'edit', icon: 'edit', label: 'Edit' },
                { value: 'remove', icon: 'close', label: 'Remove' },
            ],
            items: this.getInitialItems(),
            itemFormData: {
                newItemState: '',
                newItemStateAbbreviation: '',
                newItemLicense: '',
                isInRoundRobin: false,
                isInBranchRoundRobin: false,
                isInZipcodeRoundRobin: false,
            },
        };
    },
    computed: {
        bindings() {
            return {
                id: 'showcase',
                label: this.label,
                subLabel: this.subLabel,
                hideLabel: this.hideLabel,
                hideSubLabel: this.hideSubLabel,
                showAddButton: this.showAddButton,
                showSortButton: this.showSortButton,
                hideSearch: this.hideSearch,
                noItemsMessage: this.noItemsMessage,
                noSearchResultsMessage: this.noSearchResultsMessage,
                numberOfItemsShownInitially: this.numberOfItemsShownInitially,
                showLeftSection: this.showLeftSection,
                itemsAreClickable: true,
                sortOptions: this.sortOptions,
                itemActions: this.itemActions,
                items: this.items,
                currentSort: 'asc',
                bulkEditActions: this.bulkEditActions,
                newlyAddedItems: this.newlyAddedItems,
            };
        },
        popoutBindings() {
            return {
                id: 'playgroundPopoutForm',
                label: (this.isAddingItem) ? 'Add State License' : 'Edit State License',
                show: this.isAddingItem || this.isEditingItem,
                closeFocusID: (this.isEditingItem) ? this.editingItemID : 'showcase-Add',
            };
        },
    },
    methods: {
        getInitialItems() {
            return _cloneDeep(items);
        },
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

            this.itemFormData.newItemStateAbbreviation = editedItem.twoLetterLabel;
            this.itemFormData.newItemState = editedItem.state;
            this.itemFormData.newItemLicense = editedItem.licenseNum;
            this.itemFormData.isInRoundRobin = editedItem.isInRoundRobin;
            this.itemFormData.isInBranchRoundRobin = editedItem.isInBranchRoundRobin;
            this.itemFormData.isInZipcodeRoundRobin = editedItem.isInZipcodeRoundRobin;
        },
        handleFormSubmit() {
            if (this.isAddingItem) {
                this.items.push({
                    id: this.$refs.inputList.$_getUniqueIDForNewItem(),
                    state: this.itemFormData.newItemState,
                    twoLetterLabel: this.itemFormData.newItemStateAbbreviation,
                    licenseNum: this.itemFormData.newItemLicense,
                    isInRoundRobin: this.itemFormData.isInRoundRobin,
                    isInBranchRoundRobin: this.itemFormData.isInBranchRoundRobin,
                    isInZipcodeRoundRobin: this.itemFormData.isInZipcodeRoundRobin,
                });

                _BrightNotificationFactory.createNotification({
                    type: 'success',
                    icon: 'check_circle',
                    label: 'New State License',
                    subLabel: `${this.itemFormData.newItemState} was created successfully.`,
                });

                this.isAddingItem = false;
            } else {
                let editedItem = this.items.find(item => item.id === this.editingItemID);
                editedItem.twoLetterLabel = this.itemFormData.newItemStateAbbreviation;
                editedItem.state = this.itemFormData.newItemState;
                editedItem.licenseNum = this.itemFormData.newItemLicense;
                editedItem.isInRoundRobin = this.itemFormData.isInRoundRobin;
                editedItem.isInBranchRoundRobin = this.itemFormData.isInBranchRoundRobin;
                editedItem.isInZipcodeRoundRobin = this.itemFormData.isInZipcodeRoundRobin;

                _BrightNotificationFactory.createNotification({
                    type: 'success',
                    icon: 'save',
                    label: 'Edited State License',
                    subLabel: `Changes to ${this.itemFormData.newItemState} were saved successfully.`,
                });

                this.isEditingItem = false;
            }

            this.itemFormData.newItemStateAbbreviation = '';
            this.itemFormData.newItemState = '';
            this.itemFormData.newItemLicense = '';
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
