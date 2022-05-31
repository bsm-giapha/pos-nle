import _debounce from "lodash/debounce";
import _cloneDeep from "lodash/cloneDeep";

/**
 * Implements the Search feature in the BrightTable.
 * Searching can be enabled with the `searchable` property.
 * Exclude a column from searching with the `excludeFromSearch` column property.
 */
export const BrightTableSearchMixin = {
    props: {
        searchable: {
            type: Boolean,
            default: false,
            required: false,
        },
    },

    data() {
        return {
            searchInput: '',
            searchColumnScope: 'all',
        };
    },

    computed: {
        shouldShowSearch() {
            return this.searchable === true || this.searchable === 'true';
        },
        searchInputCompoundBindings() {
            return {
                id: this.id + 'InputCompound',
                class: 'self-center mb-12 tablet:mb-0 w-full tablet:w-auto',
                formControl: 'none',
                displayClass: 'flex',
                label: 'Search',
                size: 'small',
            };
        },
        searchScopeDropdownBindings() {
            return {
                id: this.id + 'SearchColumnScope',
                class: 'flex-initial',
                label: 'Search Column',
                'aria-label': 'Search Column. You can choose a specific column to search with this dropdown.',
                subLabel: 'You can choose a specific column to search with this dropdown.',
                size: 'small',
                formControl: 'none',
                options: this.searchScopeDropdownOptions,
            };
        },
        searchInputTextBindings() {
            return {
                id: this.id + 'SearchText',
                label: 'Search',
                'aria-label': 'Search',
                class: 'flex-1 landscape:flex',
                size: 'small',
                formControl: 'none',
            };
        },
        searchScopeDropdownOptions() {
            let options = [];
            let columnKeyedOptions = []; // Will be shown in the developer-defined order.
            let nonKeyedOptions = []; // Will be down in alphabetic order.

            // Get all columns that are not being excluded.
            this.columns.forEach(column => {
                if (column.excludeFromSearch === undefined || column.excludeFromSearch === false) {
                    if (column.hidden === undefined || column.hidden === false) {
                        columnKeyedOptions.push({
                            'value': column.key,
                            'label': column.name,
                        });
                    } else {
                        nonKeyedOptions.push({
                            'value': column.key,
                            'label': column.name,
                        });
                    }
                }
            });

            // Alphabetically sort by label.
            if (nonKeyedOptions.length > 0) {
                // Put the Column-Keyed Options in an Option Group for ease of access.
                options.push({ label: 'Columns', options: columnKeyedOptions });

                nonKeyedOptions.sort(function(a, b) {
                    const nameA = a.label.toLowerCase();
                    const nameB = b.label.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });

                // Put the Non-Keyed Options in their own Option Group after the Column Group.
                options.push({ label: 'Other', options: nonKeyedOptions });
            } else {
                options = columnKeyedOptions;
            }

            // Always put the "All" option first.
            options.unshift({ value: 'all', label: 'Everything' });

            return options;
        },
    },

    watch: {
        searchColumnScope: function() {
            this.updateTable();
            this.$emit('search-update', { searchKey: this.searchColumnScope, searchValue: this.searchInput.toLowerCase() });

            if (this.isServerSide) {
                this.resetSelection();
                this.pagination.changeToFirstPage = true;
            }
        },
        searchInput: _debounce(function() {
            this.updateTable();

            if (this.isServerSide) {
                this.pagination.changeToFirstPage = true;
                this.resetSelection();
            } else {
                // When searchInput is updated, update the # of selected rows.
                this.setSelectedRowsOnTableUpdate();
            }

            this.$emit('search-update', { searchKey: this.searchColumnScope, searchValue: this.searchInput.toLowerCase() });
        }, 1000),
    },

    methods: {
        /**
         * Handles the search functionality for the table.
         */
        handleSearch() {
            if (!this.isServerSide) {
                this.pages = this.executeSearch();
            }
        },

        /**
         * Executes search & returns matching rows.
         */
        executeSearch() {
            let rows = _cloneDeep(this.rows);
            let currentSearchPoints = 0;
            let mostRelevantRows = [];
            let searchTerms = '';
            let excludedColumnKeys = [];

            // Set search input value to be lower-cased.
            searchTerms = this.searchInput.toLowerCase();

            // If a column has the `excludeFromSearch` property, then exclude it from the search.
            this.columns.forEach(column => {
                if (column.excludeFromSearch !== undefined && column.excludeFromSearch === true) {
                    excludedColumnKeys.push(column.key);
                }
            });

            // Iterate through each row.
            rows.forEach(row => {
                let searchPointsForRow = 0;
                if (this.searchColumnScope === 'all') {
                    for (let key in row) {
                        let value = row[key];
                        let isValueAnArray = Array.isArray(value);

                        // Skip the check if the column key is being excluded or isn't column-keyed.
                        if (excludedColumnKeys.includes(key) || !this.columns.find(column => column.key === key)) {
                            continue;
                        }
                        if (typeof value !== 'number') {
                            if (isValueAnArray) {
                                value = value.map(string => string.toLowerCase());
                            } else {
                                value = value.toLowerCase();
                            }

                            if (value.indexOf(searchTerms) > -1 || (isValueAnArray && searchTerms === '')) {
                                searchPointsForRow++;
                            }
                        }
                    }
                } else { // Column-specific searching.
                    const key = this.searchColumnScope;
                    let value = row[key];
                    let isValueAnArray = Array.isArray(value);

                    if (typeof value !== 'number') {
                        if (isValueAnArray) {
                            value = value.map(string => string.toLowerCase());
                        } else {
                            value = value.toLowerCase();
                        }

                        if (value.indexOf(searchTerms) > -1 || (isValueAnArray && searchTerms === '')) {
                            searchPointsForRow++;
                        }
                    }
                }

                if (searchPointsForRow > currentSearchPoints) {
                    mostRelevantRows = [row];
                    currentSearchPoints = searchPointsForRow;
                } else if (searchPointsForRow === currentSearchPoints && currentSearchPoints !== 0) {
                    mostRelevantRows.push(row);
                }
            });

            if (currentSearchPoints === 0) {
                return []; // If nothing was found in the search, then return an empty array.
            } else {
                return mostRelevantRows; // Else, return the matching rows.
            }
        },
    },
};
