import { nextTick } from "vue";

/**
 * Implements the Bulk Edit feature in the BrightTable.
 * Bulk editing can be enabled with the `bulkEditAction` property.
 * Additionally, rows must contain unique `id` properties.
 */
export const BrightTableBulkEditMixin = {
    props: {
        bulkEditActions: {
            type: Array,
            required: false,
            default: function() {
                return [];
            },
            validator: function(bulkEditActions) {
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
    },

    data() {
        return {
            bulkEdit: {
                all: false,
                allRowsWereSelected: null,
                allRowsWereUnselected: null,
                whitelist: [],
                blacklist: [],
            },
        };
    },

    computed: {
        selectedRowsVerbiage() {
            return this.totalRowsSelected + " Selected (" + this.bulkEditNumberOfSelectedRowsOnThisPage + " on this page)";
        },
        totalRowsSelected() {
            let totalRowsSelected = 0;
            if (this.totalRowsCount === this.bulkEdit.whitelist.length) {
                totalRowsSelected = this.totalRowsCount;
            } else {
                totalRowsSelected = this.bulkEdit.whitelist.length;

                if (this.isServerSide && this.bulkEdit.allRowsWereUnselected === false) {
                    totalRowsSelected = this.totalRowsCount - this.bulkEdit.blacklist.length;
                }
            }
            return totalRowsSelected;
        },
        bulkEditAll() {
            let numberOfSelectedRowsOnThisPage = this.getNumberOfSelectedRows();
            if (!numberOfSelectedRowsOnThisPage) return false;

            const totalRowsCountEqualsCurrentPagesSelectedRowsCount = this.totalRowsCount === numberOfSelectedRowsOnThisPage; // total # of rows is equal to the current page's # of selected rows.
            const totalRowsCountEqualsSelectedRowsCountInTheWhitelist = this.totalRowsCount === this.bulkEdit.whitelist.length; // total # of rows is equal to the # of selected rows in the whitelist.
            const totalRowsCountEqualsCurrentPagesRowCount = this.totalRowsCount === this.paginatedPages.length; // total # of rows is equal to the current page's row count.
            const totalRowsCountEqualsSelectedRowsCount = this.totalRowsCount === this.totalRowsSelected; // total # of rows is equal to the # of selected rows.
            const currentPagesSelectedRowsCountEqualsCurrentPagesRowCount = numberOfSelectedRowsOnThisPage === this.paginatedPages.length; // current page's # of selected rows is equal to the current page's row count.

            const clientSideAllAreSelected = !this.isServerSide && totalRowsCountEqualsSelectedRowsCountInTheWhitelist && currentPagesSelectedRowsCountEqualsCurrentPagesRowCount;
            const serverSideAllAreSelected = this.isServerSide && ((totalRowsCountEqualsCurrentPagesRowCount && currentPagesSelectedRowsCountEqualsCurrentPagesRowCount) || totalRowsCountEqualsSelectedRowsCountInTheWhitelist || totalRowsCountEqualsSelectedRowsCount);

            return totalRowsCountEqualsCurrentPagesSelectedRowsCount || clientSideAllAreSelected || serverSideAllAreSelected;
        },
        bulkEditNumberOfSelectedRowsOnThisPage() {
            if (!this.bulkEdit.whitelist.length) return 0;
            if (this.bulkEditAll) return this.paginatedPages.length;
            return this.getNumberOfSelectedRows(true);
        },
        bulkEditActionsContainerBindings() {
            return {
                id: this.id + 'BulkEditActionsContainer',
                class: {
                    'mb-12': true,
                    'animation__bulkEditActions--in': this.bulkEdit.whitelist.length,
                },
            };
        },
        bulkEditActionButtonBindings() {
            return {
                class: 'block tablet:inline-block mr-8',
                size: 'small',
            };
        },
        bulkEditNumberOfSelectedRowsBindings() {
            return {
                id: this.id + 'BulkEditNumberOfSelectedRows',
                class: 'block tablet:inline-block uppercase font-semibold font-primary text-s text-blue-500',
            };
        },
        bulkEditCheckboxBindings() {
            return {
                id: this.id + 'BulkEditColumn',
                label: 'Select',
                hideLabel: true,
                formControlBindings: { class: 'm-auto mt-3 -ml-5 desktop:mt-5 desktop:ml-1' },
            };
        },
    },

    watch: {
        'bulkEditAll': function() {
            if (this.bulkEditAll) {
                this.bulkEdit.all = true;
            }
        },
        'bulkEdit.blacklist': {
            deep: true,
            handler: function(removedRows) {
                this.removeExistingIDsFrom('whitelist', removedRows);
            },
        },
        'bulkEdit.whitelist': {
            deep: true,
            handler: function(addedRows) {
                this.removeExistingIDsFrom('blacklist', addedRows);
            },
        },
    },

    methods: {
        /**
         * Selects/Unselect all rows for bulk editing.
         */
        async handleAllRowsSelection(event) {
            await nextTick();

            // Determine if the "Select All" checkbox was deliberately clicked/selected.
            if (event) {
                this.bulkEdit.allRowsWereSelected = this.bulkEdit.all;
                this.bulkEdit.allRowsWereUnselected = !this.bulkEdit.all;
            }

            // The "Select All" checkbox is selected, select & save every row.
            if (this.bulkEdit.all) {
                const rows = this.isServerSide ? this.paginatedPages : this.pages;
                const rowIDPrefix = this.id + 'Row';

                if (!this.bulkEdit.whitelist.length) {
                    this.bulkEdit.whitelist = [];
                }

                // Add to the whitelist.
                for (const [, rowObject] of Object.entries(rows)) {
                    for (const [rowKey, rowID] of Object.entries(rowObject)) {
                        if (rowKey === 'id') {
                            const id = rowIDPrefix + rowID;
                            this.addRowIDTo('whitelist', id);
                        }
                    }
                }

                // Server-side: If a row on a different page has been unselected, ensure that they're not added to the whitelist twice.
                if (this.isServerSide && this.bulkEdit.blacklist.length) {
                    this.bulkEdit.blacklist.forEach(id => {
                        this.addRowIDTo('whitelist', id);
                    });
                }

                this.emitRowSelectedEvent();

            // The "Select All" checkbox is unselected. Clear ALL selected rows for every page OR if this is a server-side table.
            } else if (this.bulkEdit.whitelist.length === this.totalRowsCount || this.isServerSide) {
                this.emitRowUnselectedEvent(this.bulkEdit.whitelist);
                this.bulkEdit.whitelist.forEach(id => {
                    this.addRowIDTo('blacklist', id);
                });
                this.bulkEdit.whitelist = [];

            // The "Select All" checkbox is unselected, but only unselect the currently displayed rows on this page.
            } else {
                if (this.isServerSide) return;

                let unselectedRows = [];
                this.pages.forEach(row => {
                    unselectedRows.push(this.id + 'Row' + row.id);
                });
                unselectedRows.forEach(rowID => {
                    let index = this.bulkEdit.whitelist.indexOf(rowID);
                    this.bulkEdit.whitelist.splice(index, 1);
                    this.addRowIDTo('blacklist', rowID);
                    this.emitRowUnselectedEvent(rowID);
                });
            }
        },

        /**
         * Selects/Unselect current row for bulk editing.
         */
        handleSingleRowSelection(id) {
            const rowID = this.id + 'Row' + id;

            if (this.bulkEdit.whitelist.includes(rowID)) {
                // Clear previously selected row.
                this.bulkEdit.all = false;
                this.addRowIDTo('blacklist', rowID);
                this.bulkEdit.whitelist = this.bulkEdit.whitelist.filter(element => element !== rowID);
                this.emitRowUnselectedEvent(rowID);
            } else {
                // Save selected row.
                this.bulkEdit.whitelist.push(rowID);
                this.emitRowSelectedEvent();
            }
        },

        /**
         * Sets the correct # of selected rows whenever the table updates.
         */
        setSelectedRowsOnTableUpdate() {
            if (this.isServerSide) {
                setServerSideSelectedRows(this);
            } else {
                setClientSideSelectedRows(this);
            }

            function setServerSideSelectedRows(thisComponent) {
                const rowIDPrefix = thisComponent.id + 'Row';
                const rows = thisComponent.paginatedPages;

                if (thisComponent.bulkEdit.allRowsWereSelected) {
                    for (const [, rowObject] of Object.entries(rows)) {
                        for (const [rowKey, rowID] of Object.entries(rowObject)) {
                            if (rowKey === 'id') {
                                const id = rowIDPrefix + rowID;

                                // Avoid saving duplicate rows in the whitelist or blacklist.
                                if (thisComponent.bulkEdit.whitelist.includes(id) || thisComponent.bulkEdit.blacklist.includes(id)) continue;

                                // Save selected rows.
                                thisComponent.bulkEdit.whitelist.push(id);
                            }
                        }
                    }
                    thisComponent.emitRowSelectedEvent();

                } else if (thisComponent.bulkEdit.whitelist.length) {
                    // Only select the currently selected filtered rows.
                    thisComponent.selectRowsListedInWhitelist();
                }
            }

            function setClientSideSelectedRows(thisComponent) {
                if (thisComponent.bulkEditAll) {
                    // If all filtered rows were selected.
                    if (thisComponent.bulkEdit.whitelist.length === thisComponent.totalRowsCount) {
                        // Only select the currently selected filtered rows.
                        thisComponent.selectRowsListedInWhitelist();

                        // Else if, some filtered rows were selected.
                    } else if (thisComponent.bulkEdit.whitelist.length) {
                        thisComponent.bulkEdit.all = false;

                        // Only select the currently selected filtered rows.
                        thisComponent.selectRowsListedInWhitelist();

                        // Else, no filtered rows were selected.
                    } else {
                        // Select all possible rows in the table.
                        thisComponent.handleAllRowsSelection();
                    }

                    // Else if, some filtered rows were selected.
                } else if (thisComponent.bulkEdit.whitelist.length) {
                    // Only select the currently selected filtered rows.
                    thisComponent.selectRowsListedInWhitelist();
                }
            }
        },

        /**
         * Only selects the currently selected rows that are found in the whitelist.
         */
        selectRowsListedInWhitelist() {
            let updatedSelectedRows = [];
            this.bulkEdit.whitelist.forEach(row => {
                updatedSelectedRows.push(row);
            });
            this.bulkEdit.whitelist = updatedSelectedRows;
            this.emitRowSelectedEvent();
        },

        /**
         * Gets the number of bulk-editable rows for either the current page or across all pages.
         * @param {boolean} usePaginatedPages
         * @returns {number}
         */
        getNumberOfSelectedRows(usePaginatedPages = false) {
            let numberOfSelectedRowsOnThisPage = 0;
            let pages = usePaginatedPages || this.isServerSide ? this.paginatedPages : this.pages;
            let rowIDs = pages.map(page => this.id + 'Row' + page.id);

            rowIDs.forEach(rowID => {
                this.bulkEdit.whitelist.forEach(selectedRowID => {
                    if (selectedRowID === rowID) {
                        numberOfSelectedRowsOnThisPage++;
                    }
                });
            });
            return numberOfSelectedRowsOnThisPage;
        },

        /**
         * Adds a rowID to the specified list.
         * @param {string} list - Can be either "whitelist" or "blacklist"
         * @param {string} rowID
         */
        addRowIDTo(list, rowID) {
            if (!this.bulkEdit[list].includes(rowID)) { // Avoid saving duplicate rows.
                this.bulkEdit[list].push(rowID);
            }
        },

        /**
         * Remove row from the whitelist if a row has been removed.
         */
        handleRemovalOfSelectedRows() {
            if (this.isServerSide) return;

            let rowIDs = this.rows.map(page => this.id + 'Row' + page.id);
            this.bulkEdit.whitelist.forEach((selectedRowID, index) => {
                if (rowIDs.indexOf(selectedRowID) === -1) {
                    this.bulkEdit.whitelist.splice(index, 1);
                    this.addRowIDTo('blacklist', selectedRowID);
                    this.emitRowUnselectedEvent(selectedRowID);
                }
            });
        },

        /**
         * Removes existing IDs from either the bulk-edit whitelist or blacklist.
         * This eliminates duplicates & ensures an ID exists in one list at a time.
         *
         * @param {string} list - Either the whitelist or blacklist.
         * @param rowIDs
         */
        removeExistingIDsFrom(list, rowIDs) {
            if (rowIDs.length) {
                rowIDs.forEach(row => {
                    if (this.bulkEdit[list].includes(row)) {
                        const index = this.bulkEdit[list].indexOf(row);
                        if (index > -1) {
                            this.bulkEdit[list].splice(index, 1);
                        }
                    }
                });
            }
        },

        resetSelection() {
            this.bulkEdit.all = false;
            this.bulkEdit.allRowsWereSelected = null;
            this.bulkEdit.allRowsWereUnselected = null;
            this.bulkEdit.blacklist = [];
            this.bulkEdit.whitelist = [];
        },

        /*****************************
        *                 Public Methods                *
        *****************************/
        $_getBulkEditableSelectedRows() {
            if (this.bulkEdit.whitelist.length) {
                return this.bulkEdit.whitelist;
            }
            return '';
        },

        /*****************************
        *                  Event Methods                *
        *****************************/
        emitRowSelectedEvent() {
            let payload = {};
            const selectedAll = this.bulkEdit.all;

            payload.selectedAll = selectedAll;

            // Provide rowID(s) for client-side tables & server-side tables that have "Select All" unselected). Server-side tables might not have access to a list of every possible rowID.
            if (!this.isServerSide || this.isServerSide && !selectedAll) {
                payload.rowIDs = this.bulkEdit.whitelist;
            }

            this.$emit('row:selected', payload);
        },
        emitRowUnselectedEvent(rowID) {
            let payload = {};
            const unselectedAll = Array.isArray(rowID);

            payload.unselectedAll = unselectedAll;

            // Provide rowID(s) for client-side tables & server-side tables where 1 row was unselected at a time. Server-side tables might not have access to a list of every possible rowID.
            if (!this.isServerSide || this.isServerSide && !unselectedAll) {
                payload.rowIDs = rowID;
            }

            this.$emit('row:unselected', payload);
        },
        emitBulkEditActionEvent(action) {
            let payload = {};
            const selectedAll = this.bulkEdit.all;

            payload.action = action;
            payload.selectedAll = selectedAll;
            payload.totalRowsSelected = this.totalRowsSelected;
            payload.totalRows = this.totalRowsCount;

            // Provide rowID(s) for client-side tables & server-side tables that have "Select All" unselected). Server-side tables might not have access to a list of every possible rowID.
            if (!this.isServerSide || this.isServerSide && !selectedAll) {
                payload.rowIDs = this.bulkEdit.whitelist;
                payload.blacklist = this.bulkEdit.blacklist;
            }

            if (this.isServerSide) {
                payload.filter = {};
                payload.search = {};
                payload.excludeActionForIDsInTheBlacklist = false;

                // Gather Filter information.
                if (this.filtering.edit.length) {
                    for (let [, filterObject] of Object.entries(this.filtering.edit)) {
                        payload.filter[filterObject.columnKey] = { operator: filterObject.operator ?? 'between', value: filterObject.value };
                    }
                }

                // Gather Search information.
                payload.search[this.searchColumnScope] = this.searchInput;

                // Determine if the server needs to utilize the blacklist to perform bulk-edit actions.
                if (this.totalRowsCount !== this.totalRowsSelected
                    && this.bulkEdit.whitelist.length !== this.totalRowsSelected
                    && this.bulkEdit.blacklist.length === (this.totalRowsCount - this.totalRowsSelected)) {
                    payload.excludeActionForIDsInTheBlacklist = true;
                }
            }

            this.$emit(action.toLowerCase() + 'bulkeditbutton:clicked', payload);
        },
    },
};
