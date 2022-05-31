import _isEmpty from "lodash/isEmpty";

/**
 * Implements the Pagination feature in the BrightTable.
 * Pagination controls are shown at the bottom of the table by default if there are more rows being shown than the Rows Per Page setting.
 */
export const BrightTablePaginationMixin = {
    props: {
        currentPage: {
            type: Number,
            default: 1,
            required: false,
        },
        rowsPerPageOptions: {
            type: Array,
            default: function() {
                return [25, 50, 100];
            },
            required: false,
        },
    },

    data() {
        return {
            pagination: {
                page: this.currentPage,
                currentSelectedRowsPerPage: this.rowsPerPageOptions[0],
                changeToFirstPage: false,
            },
        };
    },

    computed: {
        paginationBindings() {
            return {
                id: this.id + '-Pagination',
                class: {
                    'px-12': true,
                    'border': this.bordered,
                    'border-t': !this.bordered && !this.showHorizontalDivider,
                    'border-t-0': this.showHorizontalDivider,
                },
                changeToFirstPage: this.pagination.changeToFirstPage,
                currentPage: this.currentPage,
                firstAndLastRowsIndices: this.getFirstAndLastRowsIndices,
                paginatedPages: this.paginatedPages,
                rowsPerPageOptions: this.rowsPerPageOptions,
                totalRows: this.getTotalRowCount(),
            };
        },
        paginatedPages() {
            if (this.isServerSide) return this.pages;

            const firstIndex = this.getFirstAndLastRowsIndices[0];
            const lastIndex = this.getFirstAndLastRowsIndices[1];
            return this.pages.slice(firstIndex, lastIndex);
        },

        /**
         * Retrieves the first and last rows' indices in order to pass these values to the BasePagination component.
         * This is used for the "Showing __ of __ results" pagination verbiage.
         */
        getFirstAndLastRowsIndices() {
            const currentSelectedRowsPerPage = this.pagination.currentSelectedRowsPerPage;
            const firstIndex = (this.pagination.page - 1) * currentSelectedRowsPerPage;
            const lastIndex = this.pagination.page * currentSelectedRowsPerPage;
            return [firstIndex, lastIndex];
        },

        paginationEmittedEventPayload() {
            return { pageToFetch: this.pagination.page, rowsDisplayedPerPage: parseInt(this.pagination.currentSelectedRowsPerPage) };
        },
    },

    methods: {
        /**
         * Gets the total # of rows.
         * Takes into account client-side vs. server-side row totals.
         * If client-side, use this.pages as the source of truth.
         * If server-side, use this.metadata.
         * - Factors in filtered & searched total, if applicable.
         * @returns int
         */
        getTotalRowCount() {
            if (this.isServerSide) this.validateServerSideData();
            return this.isServerSide ? this.serverSideData.total : this.pages.length;
        },

        emitPageUpdateEvent() {
            this.$emit('page-update', this.paginationEmittedEventPayload);
        },

        /**********************************
         *        Validation Methods       *
         **********************************/
        validateServerSideData() {
            if (_isEmpty(this.serverSideData)) return;
            if (!('total' in this.serverSideData)) {
                console.error("The `server-side-data` prop object must include a \"total\" property and a value that represents the total # of rows for this table. Hint: This data can be retrieved from an API response's metadata.");
            }
        },
    },
};
