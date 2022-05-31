import _cloneDeep from "lodash/cloneDeep";

/**
 * Implements the Bulk Editing feature in BrightInputList.
 * Items can be bulk-edited. This is very similar to how BrightTable does bulk-editing.
 */
export const BrightInputListBulkEditingMixin = {
    props: {
        bulkEditActions: {
            type: Array,
            required: false,
            default: function() {
                return [];
            },
            validator: function(bulkEditActions) { // Taken straight from BrightTable
                for (let [, bulkEditActionsObject] of Object.entries(bulkEditActions)) {
                    if (!('eventName' in bulkEditActionsObject)) {
                        console.error("All bulkEditActions objects must have an 'eventName' property");
                        return false;
                    }
                    if (!('action' in bulkEditActionsObject) && !('icon' in bulkEditActionsObject)) {
                        console.error("All bulkEditActions objects must have either an 'action' or 'icon' property");
                        return false;
                    }

                    for (let [bulkEditActionsKey, bulkEditActionsValue] of Object.entries(bulkEditActionsObject)) {
                        if (typeof bulkEditActionsValue !== 'string') {
                            console.error("'" + bulkEditActionsKey + ": " + bulkEditActionsValue + "' value must be a string");
                            return false;
                        }

                        switch (bulkEditActionsKey) {
                            case 'icon':
                            case 'action':
                            case 'eventName':
                                if (bulkEditActionsValue === '') {
                                    console.error("'" + bulkEditActionsKey + "' must not have an empty string value");
                                    return false;
                                }
                                break;
                            default:
                                console.error("'" + bulkEditActionsKey + ": " + bulkEditActionsValue + "' doesn't have a valid key name");
                                return false;
                        }
                    }
                }
                return true;
            },
        },
        items: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
    },

    data() {
        return {
            displayedItems: [],
            selectedItems: [],
        };
    },

    computed: {
        bulkEditActionsContainerBindings() {
            return {
                id: this.id + 'BulkEditActionsContainer',
                class: {
                    'mb-12': true,
                    'animation__bulkEditActions--in': this.selectedItems.length,
                },
            };
        },
    },

    methods: {
        handleBulkEditOnAllRows() {
            // Searching should only care about its own search scope
            if (this.searchInput.length > 0) {
                // If all displayed items have been selected, then unselect all currently displayed items
                if (this.displayedItems.every(item => this.selectedItems.includes(item.id))) {
                    let displayedItemsIDs = [];
                    this.displayedItems.forEach((displayedItem) => {
                        displayedItemsIDs.push(displayedItem.id);
                    });
                    this.selectedItems = this.selectedItems.filter(selectedItemID => !displayedItemsIDs.includes(selectedItemID));
                } else { // Else, select all currently displayed items
                    this.displayedItems.forEach((displayedItem) => {
                        if (!this.selectedItems.includes(displayedItem.id)) {
                            this.selectedItems.push(displayedItem.id);
                        }
                    });
                }
            } else if (this.selectedItems.length === this.numberOfTotalItems) {
                this.selectedItems = [];
            } else {
                this.selectedItems = [];
                this.items.forEach((item) => {
                    this.selectedItems.push(item.id);
                });
            }

            this.emitSelectedItemsChange();
        },

        handleBulkEditClick(itemID) {
            if (this.selectedItems.includes(itemID)) {
                this.selectedItems = this.selectedItems.filter(element => element !== itemID);
            } else {
                this.selectedItems.push(itemID);
            }
            this.emitSelectedItemsChange();
        },

        emitSelectedItemsChange() {
            this.$emit('selected-items-change', _cloneDeep(this.selectedItems));
        },
    },
};
