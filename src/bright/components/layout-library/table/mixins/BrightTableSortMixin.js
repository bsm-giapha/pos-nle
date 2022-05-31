/**
 * Implements the Sort feature in the BrightTable.
 * If no initial sort is set on a column, the 1st sortable column will automatically be sorted.
 */
export const BrightTableSortMixin = {
    data() {
        return {
            sorting: {
                column: null,
                order: null,
            },
        };
    },

    computed: {
        sortIcon() {
            return {
                asc: 'arrow_upward',
                desc: 'arrow_downward',
            };
        },
        sortIconBindings() {
            let idealFontSize = '18px';
            if (this.size === 'small') {
                idealFontSize = '14px';
            }
            return {
                class: 'text-blue-500',
                style: {
                    fontSize: idealFontSize,
                },
            };
        },
    },

    watch: {
        sorting: {
            deep: true,
            handler() {
                this.handleSort();
            },
        },
    },

    created() {
        this.validateColumnSort();
    },

    methods: {
        /**
         * Automatically applies a sort on a column.
         */
        applyInitialSort() {
            let initiallySortedColumn = this.columns.find(col => col.sort === 'asc' || col.sort === 'desc');
            if (initiallySortedColumn === undefined) {
                initiallySortedColumn = this.columns.find(col => col.sort !== 'none');
            }
            if (initiallySortedColumn === undefined) return false;

            this.sorting.column = initiallySortedColumn.key;
            if ('sort' in initiallySortedColumn) {
                this.sorting.order = initiallySortedColumn.sort;
            } else {
                initiallySortedColumn.sort = 'asc'; // Set an automatic sort order on the initially sorted column.
                this.sorting.order = 'asc';
            }
        },
        handleSort() {
            if (!this.isServerSide) {
                this.setPages();
            }
            this.$emit('sort-update', { sort: this.sorting.column, order: this.sorting.order });
            this.pagination.changeToFirstPage = true;
        },


        /**
         * Prepares pages for sorting.
         * @param recentlyUpdatedRows. Default = null.
         */
        setPages(recentlyUpdatedRows = null) {
            let pages = this.rows;

            // If rows have been altered using the filter and/or search, use the updated this.pages.
            if (this.pages.length) {
                pages = this.pages;

                // If no filter is used, use the original set of rows.
                if (!this.filtering.edit.length) {
                    pages = this.rows;
                }
            }

            // Use the most recent set of rows, if available.
            if (recentlyUpdatedRows) pages = recentlyUpdatedRows;

            this.handlePageSort(pages);
            this.pages = pages;
        },

        /**
         * Handles the page sort on key down events.
         * @param {Object} event
         * @param {Object} column
         */
        handlePageSortOnKeyDownEvent(event, column) {
            if (event === undefined) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handlePageSortOnColumnClick(event, column);
            }
        },

        /**
         * Handles the page sort on column click events.
         * @param {Object} event
         * @param {Object} column
         */
        handlePageSortOnColumnClick(event, column) {
            if (column.sort === 'none') return;

            if (column.key === this.sorting.column) {
                this.sorting.order = this.sorting.order === 'asc' ? 'desc' : 'asc';
            } else {
                this.sorting.order = 'asc';
            }
            this.sorting.column = column.key;

            this.handlePageSort(this.pages);
        },

        /**
         * Prepares the pages for sorting.
         * @param {Object} pages
         */
        handlePageSort(pages) {
            if (this.isServerSide) return;

            pages.sort((cellValue1, cellValue2) => {
                let result = this.naturalSort(cellValue1, cellValue2, this.sorting.column);
                if (result !== 0) return result;
                return 0;
            });
        },

        /**
         * Sorts the rows.
         * @param a - This is cell value 1.
         * @param b - This is cell value 2.
         * @param {string} columnToSort
         * @returns {number|*}
         */
        naturalSort(a, b, columnToSort) {
            if (!columnToSort) return;
            let cellValue1 = a[columnToSort];
            if (Array.isArray(cellValue1)) {
                // Account for array type values.
                cellValue1 = cellValue1[0];
            }
            cellValue1 = this.removeSpecialChars(cellValue1, true);

            let cellValue2 = b[columnToSort];
            if (Array.isArray(cellValue2)) {
                // Account for array type values.
                cellValue2 = cellValue2[0];
            }
            cellValue2 = this.removeSpecialChars(cellValue2, true);

            if (/^\d*\.?\d*$/.test(cellValue1) && /^\d*\.?\d*$/.test(cellValue2)) {
                cellValue1 = Number(cellValue1);
                cellValue2 = Number(cellValue2);
            }

            let sortOrder = this.sorting.order;
            let comparisons = {
                'asc': [-1, 1],
                'desc': [1, -1],
            };

            if (cellValue1 < cellValue2) return comparisons[sortOrder][0];
            if (cellValue1 > cellValue2) return comparisons[sortOrder][1];
            return 0;
        },

        getColumnSlotNameByKey(key) {
            return 'column:' + key;
        },

        /**********************************
         *        Validation Methods       *
         **********************************/
        validateColumnSort() {
            let sortCount = 0;
            this.columns.forEach(col => {
                if (col.sort === 'asc' || col.sort === 'desc') sortCount++;
                if (col.sort !== undefined && col.sort !== 'none' && sortCount > 1) console.error('Error on column key: ' + col.key + '. There can only be 1 initially sorted column at a time.');
            });
        },
    },
};
