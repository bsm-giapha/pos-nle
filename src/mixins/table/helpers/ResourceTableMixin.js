/**
 * Handles the endpoint construction and the initiation of the requests sent to the Ardent API in order to obtain row data.
 */
export const ResourceTableMixin = {
    data() {
        return {
            baseResourceURL: '', // TODO: Override this with the correct Base Resource URL value for obtaining row data.
            resourceURLQueries: {}, // This holds the queries that will be appended to the Base Resource URL.
            rows: [], // This holds the list of rows returned from the API. This is assigned to the `rows` prop on the BrightTable.
            serverSideData: {}, // This holds the data that is required to render server-side tables. This is assigned to the `server-side-data` prop on the BrightTable.
        };
    },
    methods: {
        /**
         * This will add the necessary queries to the resource URL in order to obtain specific row data from the API.
         * @returns {string}
         */
        getResourceURL() {
            let baseResourceURL = this.baseResourceURL;
            let query = "";
            for (const [queryGroupName, queryGroup] of Object.entries(this.resourceURLQueries)) {
                // For filters, get the operator value & append it to the resource query key.
                if (queryGroupName === 'filter') {
                    for (const [paramKey, paramObject] of Object.entries(queryGroup)) {
                        let operator = '';
                        let paramValue = '';

                        // Extract the operator & filter value.
                        for (const [key, value] of Object.entries(paramObject)) {
                            if (key === 'operator') {
                                operator = '.' + value;
                            } else if (key === 'value') {
                                paramValue = value;
                            }
                        }

                        // Construct the query.
                        query += paramKey + operator + "=" + paramValue + "&";
                    }

                // Else, build the query normally.
                } else {
                    for (const [paramKey, paramValue] of Object.entries(queryGroup)) {
                        query += paramKey + "=" + paramValue + "&";
                    }
                }
            }
            query = query ? "?" + query : "";
            return baseResourceURL + query;
        },

        /**
         * This will retrieve the most recent row data.
         * @param event
         */
        getRefreshedRows(event) {
            this.getPaginatedRows(event, true);
        },

        /**
         * This will obtain updated pagination values needed for the Resource URL's Pagination Query.
         * @param event
         */
        getUpdatedPages(event) {
            this.getPaginatedRows(event);
        },

        /**
         * This will set the pagination values needed for the Resource URL's Pagination Query.
         * @param event
         * @param isRefresh
         */
        getPaginatedRows(event, isRefresh = false) {
            if (event && event.pageToFetch && event.rowsDisplayedPerPage) {
                const limit = event.rowsDisplayedPerPage;
                const offset = (event.pageToFetch - 1) * limit;

                if (!isRefresh) {
                    // If the limit & offset haven't changed, prevent another request from initiating.
                    if (this.resourceURLQueries.pagination && limit === this.resourceURLQueries.pagination.limit && offset === this.resourceURLQueries.pagination.offset) return;
                }

                this.resourceURLQueries.pagination = {};
                this.resourceURLQueries.pagination.limit = limit;
                this.resourceURLQueries.pagination.offset = offset;
                this.getRowData();
            }
        },

        /**
         * This will set the filter values needed for the Resource URL's Filter Query.
         * @param event
         */
        getFilteredRows(event) {
            this.resourceURLQueries.filter = {};
            for (const [, filter] of Object.entries(event)) {
                this.resourceURLQueries.filter[filter.columnKey] = { operator: filter.operator, value: filter.value.join() };
            }
            this.getRowData();
        },

        /**
         * This will set the search values needed for the Resource URL's Search Query.
         * @param event
         */
        getSearchedRows(event) {
            this.resourceURLQueries.search = {};
            for (const [key, value] of Object.entries(event)) {
                this.resourceURLQueries.search[key] = value;
            }
            this.getRowData();
        },

        /**
         * This will set the sort values needed for the Resource URL's Sort Query.
         * @param event
         */
        getSortedRows(event) {
            this.resourceURLQueries.sort = {};
            for (const [key, value] of Object.entries(event)) {
                this.resourceURLQueries.sort[key] = value;
            }
            this.getRowData();
        },

        /**
         * TODO: Override this to obtain the row data via Axios request.
         */
        getRowData() {},

        /**
         * Call this in getRowData() when the response is returned successfully.
         */
        setServerSideData() {
            this.setFilterServerSideData();
        },

        /**
         * TODO: Override this to set the filter needed for the `server-side-data` BrightTable prop.
         */
        setFilterServerSideData() {},
    },
};
