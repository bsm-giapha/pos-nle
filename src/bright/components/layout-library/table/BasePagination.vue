<template>
    <BrightGrid class="BasePagination" gutters-vertical="small">
        <BrightRow gutters="none">
            <BrightColumn tablet="6">
                <BrightDropdownSelect v-model="currentSelectedRowsPerPage" v-bind="dropdownBindings"/>
                <span class="BasePaginationTotalResultsLabel">
                    &nbsp;&nbsp;Showing <span class="">{{ rowIndicesAndTotalResultsVerbiage }}</span>
                </span>
            </BrightColumn>
            <BrightColumn tablet="6">
                <div
                    v-show="totalRows > currentSelectedRowsPerPage"
                    class="PaginationNavigation text-right"
                    role="navigation"
                    aria-label="Pagination Navigation"
                >
                    <BrightButton
                        use="tertiary"
                        :disabled="disablePreviousAndFirstPageButtons"
                        size="small"
                        icon="first_page"
                        icon-position="center"
                        aria-label="First Page"
                        rounded
                        data-changepage="first"
                        @click="changePage('first')"
                        @keydown="handlePaginationKeyDownEvent"
                    />
                    <BrightButton
                        use="tertiary"
                        :disabled="disablePreviousAndFirstPageButtons"
                        size="small"
                        icon="chevron_left"
                        icon-position="center"
                        aria-label="Previous Page"
                        rounded
                        data-changepage="back"
                        @click="changePage('back')"
                        @keydown="handlePaginationKeyDownEvent"
                    />
                    <!--                    TODO: Re-add this later for Search Results pagination.-->
                    <!--                    <span-->
                    <!--                        v-for="(adjacentPage, index) in adjacentPages"-->
                    <!--                        :data-changepage="adjacentPage"-->
                    <!--                        :key="index"-->
                    <!--                        @click="changePage(adjacentPage)"-->
                    <!--                        @keydown="handlePaginationKeyDownEvent"-->
                    <!--                        :class="{-->
                    <!--                            'cursor-pointer': typeof adjacentPage === 'number',-->
                    <!--                            'font-bold': parseInt(adjacentPage) === parseInt(page),-->
                    <!--                        }"-->
                    <!--                        v-bind:aria-current="adjacentPage === currentPage"-->
                    <!--                        class="mx-8"-->
                    <!--                        tabindex="0"-->
                    <!--                    >-->
                    <!--                            {{adjacentPage}}-->
                    <!--                    </span>-->
                    <BrightButton
                        use="tertiary"
                        :disabled="disableNextAndLastPageButtons"
                        size="small"
                        icon="chevron_right"
                        icon-position="center"
                        aria-label="Next Page"
                        rounded
                        data-changepage="next"
                        @click="changePage('next')"
                        @keydown="handlePaginationKeyDownEvent"
                    />
                    <BrightButton
                        use="tertiary"
                        :disabled="disableNextAndLastPageButtons"
                        size="small"
                        icon="last_page"
                        icon-position="center"
                        aria-label="Last Page"
                        rounded
                        data-changepage="last"
                        @click="changePage('last')"
                        @keydown="handlePaginationKeyDownEvent"
                    />
                </div>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</template>

<script>
import BrightGrid from "Bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "Bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "Bright/components/layout-library/grid/BrightColumn.vue";
import BrightDropdownSelect from "Bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";

export default {
    name: "BasePagination",
    components: { BrightButton, BrightGrid, BrightRow, BrightColumn, BrightDropdownSelect },
    inheritAttrs: true,
    props: {
        id: {
            type: String,
            default: '',
            required: true,
        },
        changeToFirstPage: {
            type: Boolean,
            default: false,
            required: false,
        },
        currentPage: {
            type: Number,
            default: 1,
            required: false,
        },
        firstAndLastRowsIndices: {
            type: Array,
            required: true,
        },
        numberOfAdjacentPages: {
            type: Number,
            default: 2,
            required: false,
        },
        paginatedPages: {
            type: Array,
            required: true,
        },
        rowsPerPageOptions: {
            type: Array,
            default: function() {
                return [25, 50, 100];
            },
            required: false,
        },
        totalRows: {
            type: Number,
            required: true,
        },
    },
    emits: [
        'update:modelValue',
        'click',
        'pagination:changed',
    ],
    data() {
        return {
            page: this.currentPage,
            currentSelectedRowsPerPage: this.rowsPerPageOptions[0],
        };
    },
    computed: {
        dropdownBindings() {
            return {
                id: this.id + '-ResultsPerPageOptions',
                class: {
                    'inline-block mb-0': true,
                },
                label: 'Results per page',
                size: 'small',
                buttonFullWidth: false,
                options: this.handleDropdownSelectOptions(),
            };
        },
        disablePreviousAndFirstPageButtons() {
            return this.page === 1;
        },
        disableNextAndLastPageButtons() {
            const totalNumberOfPages = Math.ceil(this.totalRows / parseInt(this.currentSelectedRowsPerPage));
            return this.page === totalNumberOfPages;
        },
        /**
             * Formats the "Showing __ of __ results" verbiage.
             * @returns {String}
             */
        rowIndicesAndTotalResultsVerbiage() {
            let rowIndices = this.getRowIndices();
            if (rowIndices[1] === 0) rowIndices[0] = 0;

            let indicesVerbiage = rowIndices[0];

            if (rowIndices[0] !== 0 && rowIndices.length > 1) {
                indicesVerbiage += ' - ' + rowIndices[1];
            }

            indicesVerbiage += ' of ' + this.totalRows;
            return indicesVerbiage;
        },
        /**
             * Calculates the total # of pages.
             * @returns {Number}
             */
        pages() {
            let currentSelectedRowsPerPage = parseInt(this.currentSelectedRowsPerPage);
            this.$emit('update:modelValue', { page: this.page, currentSelectedRowsPerPage: currentSelectedRowsPerPage });

            const remainder = this.totalRows % currentSelectedRowsPerPage;
            if (remainder > 0) {
                return Math.floor(this.totalRows / currentSelectedRowsPerPage) + 1;
            } else {
                return this.totalRows / currentSelectedRowsPerPage;
            }
        },
        /**
             * Retrieves the list of adjacent pages to display in the pagination.
             * @returns {Array}
             */
        adjacentPages() { // TODO: This will be used when Search Results becomes a thing.
            return this.getAdjacentPages();
        },
    },
    watch: {
        changeToFirstPage: function(newValue) {
            if (newValue) {
                this.$emit('click', this.changePage('first'));
            }
        },
        currentSelectedRowsPerPage: function(newValue, oldValue) {
            // Change the view to the 1st page only when the dropdown has been manually updated.
            if (oldValue) {
                this.$emit('click', this.changePage('first'));
            }
        },
    },
    methods: {
        /**
             * Obtains the first & last indices of the current page's row results.
             * @returns {Array}
             */
        getRowIndices() {
            const firstAndLastPageIndices = this.firstAndLastRowsIndices;
            let firstIndex = firstAndLastPageIndices[0] + 1;
            let lastIndex = firstAndLastPageIndices[1];

            if (lastIndex > this.totalRows) {
                lastIndex = this.totalRows;
            }

            if (firstIndex === lastIndex) {
                return [firstIndex];
            }
            return [firstIndex, lastIndex];
        },
        /**
             * Obtains the list of adjacent pages to display in the pagination.
             * @returns {Array}
             */
        getAdjacentPages() {
            if (this.pages.length === 1) return [1];

            let adjacentPages = [];
            for (let i = 1; i < this.pages + 1; i++) {
                adjacentPages.push(i);
            }
            if (!adjacentPages.length) return;

            let adjacentPagesSliced = [];
            let addFrontEllipses = false;
            let addLastEllipses = false;

            if (parseInt(this.page) === 1) {
                //For First Page
                for (let i = 1; i < this.numberOfAdjacentPages + 2; i++) {
                    if (i > adjacentPages.length) continue;

                    adjacentPagesSliced.push(i);
                }

                if (adjacentPagesSliced.length < adjacentPages.length) {
                    addLastEllipses = true;
                }
            } else if (parseInt(this.page) === adjacentPages.length) {
                //For Last Page
                for (let i = ((adjacentPages.length) - this.numberOfAdjacentPages); i < (adjacentPages.length + 1); i++) {
                    if (i <= 0 || i > adjacentPages.length) continue;

                    adjacentPagesSliced.push(i);
                }

                if (adjacentPagesSliced.length !== adjacentPages.length) {
                    addFrontEllipses = true;
                }
            } else {
                //For Middle Pages
                for (let i = (parseInt(this.page) - this.numberOfAdjacentPages); i < (parseInt(this.page) + (this.numberOfAdjacentPages + 1)); i++) {
                    if (i <= 0 || i > adjacentPages.length) continue;

                    adjacentPagesSliced.push(i);

                    if (adjacentPagesSliced.length < adjacentPages.length) {
                        if (i === parseInt(this.page) - this.numberOfAdjacentPages && i !== adjacentPages[0]) {
                            addFrontEllipses = true;
                        }

                        if ((i === parseInt(this.page) + this.numberOfAdjacentPages
                                && i !== adjacentPages[adjacentPages.length - 1])
                        ) {
                            addLastEllipses = true;
                        }
                    }
                }
            }
            if (addFrontEllipses) {
                adjacentPagesSliced.unshift('...');
            }
            if (addLastEllipses) {
                adjacentPagesSliced.push('...');
            }
            return adjacentPagesSliced;
        },
        /**
             * Handles the changing of pages.
             * @param {String | Number} val
             */
        changePage(val) {
            switch (val) {
                case 'first':
                    this.page = 1;
                    break;
                case 'back':
                    this.page = this.page > 1 ? this.page - 1 : this.page;
                    break;
                case 'next':
                    this.page = this.page < this.pages ? this.page + 1 : this.page;
                    break;
                case 'last':
                    this.page = this.page = this.pages;
                    break;
                default:
                //Must be a page number
                    if (val !== '...') {
                        this.page = val;
                    }
                    break;
            }

            const currentSelectedRowsPerPage = parseInt(this.currentSelectedRowsPerPage);
            this.$emit('update:modelValue', { page: this.page, currentSelectedRowsPerPage: currentSelectedRowsPerPage });
            this.$emit('pagination:changed');
        },
        /**
             * Retrieves the resultsPerPageOptions drop-down list.
             * @returns {Array}
             */
        handleDropdownSelectOptions() {
            let options = [];

            this.rowsPerPageOptions.forEach(function(item, index) {
                item += '';
                let optionsObject = { label: item + ' per Page', value: item };

                if (index === 0) {
                    optionsObject['selected'] = true;
                }

                options.push(optionsObject);
            });
            return options;
        },
        /**
             * Handles the pagination on key down events.
             * @param {Object} event
             */
        handlePaginationKeyDownEvent(event) {
            if (event === undefined) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.$emit('click', this.changePage(event.currentTarget.getAttribute('data-changepage')));
                this.$emit('pagination:changed');
            }
        },
    },
};
</script>

<style scoped>

</style>
