<template>
    <BaseFormControl v-bind="tableContainerBindings">
        <div class="flex flex-wrap landscape:flex-nowrap mb-12">
            <!------------- SEARCH SECTION --------------->
            <BrightInputCompound v-if="shouldShowSearch" v-bind="searchInputCompoundBindings" hide-meta-label>
                <BrightDropdownSelect v-model="searchColumnScope" v-bind="searchScopeDropdownBindings"/>
                <BrightInputText v-model="searchInput" v-bind="searchInputTextBindings"/>
            </BrightInputCompound>

            <!------------- ADD FILTER SECTION --------------->
            <BrightPopover
                ref="addFilterPopover"
                class="mb-1 self-end mb-12 tablet:mb-0"
                v-bind="getFilterPopoverPropsAndAttrs('add')"
                @popover:click-opened="handleFilterPopoverOpenedEvent('add', 'addFilterButton')"
                @popover:keydown-opened="handleFilterPopoverOpenedEvent('add', 'addFilterButton')"
                @popover:click-closed="handleFilterPopoverClosedEvent('add', 'addFilterButton')"
                @popover:keydown-closed="handleFilterPopoverClosedEvent('add', 'addFilterButton')"
            >
                <template v-slot:popover>
                    <div v-bind="filterPopoverTemplateContainerBindings">
                        <div v-bind="filterPopoverHeaderDivBindings">
                            <span v-bind="filterPopoverHeaderSpanBindings">Add Filter</span>
                        </div>
                        <BrightDropdownSelect v-model="filtering.selectedAddFilterCriteria" v-bind="getFilterPopoverCriteriaPropsAndAttrs('add')" @option:selected="handlePreSelectedFilterInputData('add', $event)"/>
                        <div v-bind="filterPopoverOperatorValueBindings">
                            <div v-bind="filterPopoverOperatorBindings">
                                <BrightDropdownSelect v-show="!filterAddIsTypeByType('date')" v-model="filtering.selectedAddFilterOperator" v-bind="getFilterPopoverOperatorPropsAndAttrs('add')"/>
                                <BrightInputText v-show="filterAddIsTypeByType('date')" v-model="filtering.selectedAddFilterValueDateFrom" v-bind="getFilterPopoverOperatorDateFromPropsAndAttrs('add')"/>
                            </div>
                            <div v-bind="filterPopoverValueBindings">
                                <BrightDropdownSelect v-if="filterIsTypeStringOrArrayByAction('add')" v-model="filtering.selectedAddFilterValue" v-bind="getFilterPopoverValuePropsAndAttrs('add')"/>
                                <BrightInputMoney v-if="filterIsTypeByTypeFilterName('money', filtering.selectedAddFilterCriteria)" v-model="filtering.selectedAddFilterValueMoney" v-bind="getFilterPopoverValueMoneyPropsAndAttrs('add')"/>
                                <BrightInputNumber v-if="filterIsTypeByTypeFilterName('number', filtering.selectedAddFilterCriteria)" v-model="filtering.selectedAddFilterValueNumber" v-bind="getFilterPopoverValueNumberPropsAndAttrs('add')"/>
                                <BrightInputText v-if="filterIsTypeByTypeFilterName('date', filtering.selectedAddFilterCriteria)" v-model="filtering.selectedAddFilterValueDateTo" v-bind="getFilterPopoverOperatorDateToPropsAndAttrs('add')"/>
                            </div>
                        </div>
                        <div v-bind="filterPopoverActionsContainerBindings">
                            <BrightButton
                                use="primary"
                                v-bind="filterPopoverActionBindings('add')"
                                @click="handleApplyFilter('add')"
                                @keydown.enter.space.prevent="handleApplyFilter('add')"
                            >Add Filter</BrightButton>
                            <BrightButton use="secondary" @click="handleCancelFilter('add')" @keydown.enter.space.prevent="handleCancelFilter('add')">Cancel</BrightButton>
                        </div>
                    </div>
                </template>
                <BrightButton
                    v-show="shouldShowFilters"
                    ref="addFilterButton"
                    v-bind="getAddFilterButtonPropsAndAttrs"
                />
            </BrightPopover>
            <!------------- REFRESH SECTION --------------->
            <BrightButton
                v-if="showRefreshButton"
                ref="refreshButton"
                class="mb-1 ml-6 self-end mb-12 tablet:mb-0"
                aria-label="Refresh Table"
                use="secondary"
                size="small"
                icon="refresh"
                icon-position="center"
                @click="emitRefreshEvent"
                @keydown.space.enter="emitRefreshEvent"
            />
            <div class="order-first self-end landscape:ml-auto landscape:order-last w-full landscape:w-auto mb-12 landscape:mb-0">
                <slot name="actions"></slot>
            </div>
        </div>

        <!------------- EDIT FILTER (TAGS) SECTION --------------->
        <div v-show="filtering.edit.length" class="flex-initial">
            <BrightPopover
                v-for="(filter, filterIndex) in filtering.edit"
                :key="'editFilterPopover-' + filter.columnKey + filterIndex"
                :ref="'editFilterPopover-' + filter.columnKey"
                v-bind="getFilterPopoverPropsAndAttrs('edit')"
                @popover:click-opened="handleFilterPopoverOpenedEvent('edit', 'editFilterPopover-' + filter.columnKey, filter)"
                @popover:keydown-opened="handleFilterPopoverOpenedEvent('edit', 'editFilterPopover-' + filter.columnKey, filter)"
                @popover:click-closed="handleFilterPopoverClosedEvent('edit', 'editFilterTag-' + filter.columnKey, filter)"
                @popover:keydown-closed="handleFilterPopoverClosedEvent('edit', 'editFilterTag-' + filter.columnKey, filter)"
            >
                <template v-slot:popover>
                    <div v-bind="filterPopoverTemplateContainerBindings">
                        <div v-bind="filterPopoverHeaderDivBindings">
                            <span v-bind="filterPopoverHeaderSpanBindings">Edit Filter</span>
                        </div>
                        <BrightDropdownSelect v-model="filtering.selectedEditFilterCriteria" v-bind="getFilterPopoverCriteriaPropsAndAttrs('edit', filter)"/>
                        <div v-bind="filterPopoverOperatorValueBindings">
                            <div v-bind="filterPopoverOperatorBindings">
                                <BrightDropdownSelect
                                    v-if="!filterIsTypeByTypeFilterName('date', filtering.selectedEditFilterCriteria)"
                                    :ref="'selectedEditFilterOperator-' + filter.columnKey"
                                    v-bind="getFilterPopoverOperatorPropsAndAttrs('edit', filter, 'selectedEditFilterOperator-' + filter.columnKey)"
                                    v-model="filtering.selectedEditFilterOperator"
                                />
                                <BrightInputText v-if="filterIsTypeByTypeFilterName('date', filtering.selectedEditFilterCriteria)" v-model="filtering.selectedEditFilterValueDateFrom" v-bind="getFilterPopoverOperatorDateFromPropsAndAttrs('edit', filter)"/>
                            </div>
                            <div v-bind="filterPopoverValueBindings">
                                <BrightDropdownSelect v-if="filterIsTypeStringOrArrayByAction('edit')" v-model="filtering.selectedEditFilterValue" v-bind="getFilterPopoverValuePropsAndAttrs('edit', filter)"/>
                                <BrightInputMoney v-if="filterIsTypeByTypeFilterName('money', filtering.selectedEditFilterCriteria)" v-model="filtering.selectedEditFilterValueMoney" v-bind="getFilterPopoverValueMoneyPropsAndAttrs('edit', filter)"/>
                                <BrightInputNumber v-if="filterIsTypeByTypeFilterName('number', filtering.selectedEditFilterCriteria)" v-model="filtering.selectedEditFilterValueNumber" v-bind="getFilterPopoverValueNumberPropsAndAttrs('edit', filter)"/>
                                <BrightInputText v-if="filterIsTypeByTypeFilterName('date', filtering.selectedEditFilterCriteria)" v-model="filtering.selectedEditFilterValueDateTo" v-bind="getFilterPopoverOperatorDateToPropsAndAttrs('edit', filter)"/>
                            </div>
                        </div>
                        <div v-bind="filterPopoverActionsContainerBindings">
                            <BrightButton
                                use="primary"
                                v-bind="filterPopoverActionBindings('edit', filter)"
                                @click="handleApplyFilter('edit', filter)"
                                @keydown.enter.space.prevent="handleApplyFilter('edit', filter)"
                            >Update Filter</BrightButton>
                            <BrightButton use="secondary" @click="handleCancelFilter('edit')" @keydown.enter.space.prevent="handleCancelFilter('edit')">Cancel</BrightButton>
                        </div>
                    </div>
                </template>
                <BrightTag
                    :ref="'editFilterTag-' + filter.columnKey"
                    v-bind="getEditFilterTagPropsAndAttrs(filter)"
                    rounded
                    @tag:remove="removeFilter(filter)"
                />
            </BrightPopover>
        </div>

        <!------------- BULK EDIT SECTION --------------->
        <div v-show="bulkEdit.whitelist.length" v-bind="bulkEditActionsContainerBindings">
            <BrightButton
                v-for="actionObject in bulkEditActions"
                :id="id + convertToPascalCase(actionObject.action)"
                :key="convertToPascalCase(actionObject.action)"
                use="primary"
                v-bind="bulkEditActionButtonBindings"
                @click="emitBulkEditActionEvent(actionObject.eventName)"
                @keydown.space="$emit(actionObject.eventName.toLowerCase() + 'bulkeditbutton:clicked', bulkEdit.whitelist)"
            >
                <BrightIcon v-show="actionObject.icon" :use="actionObject.icon"/> {{ actionObject.action }}
            </BrightButton>
            <span v-bind="bulkEditNumberOfSelectedRowsBindings">{{ selectedRowsVerbiage }}</span>
        </div>

        <!------------- TABLE SECTION --------------->
        <div style="overflow-x:auto; min-width: 100%">
            <table :id="id" :class="tableClassList" tabindex="0">
                <thead v-show="!hideHeader" v-if="columns.length > 0">
                    <tr>
                        <th v-show="Object.keys(bulkEditActions).length">
                            <BrightCheckbox
                                v-model="bulkEdit.all"
                                v-bind="bulkEditCheckboxBindings"
                                hide-meta-label
                                @click="handleAllRowsSelection"
                                @keydown.space="handleAllRowsSelection"
                            />
                        </th>
                        <th
                            v-for="column in columns"
                            v-show="column.hidden === undefined || column.hidden === false"
                            :ref="'column.' + column.key"
                            :key="column.key"
                            :class="columnClassObject(column)"
                            :style="(column.headerStyle !== undefined) ? column.headerStyle : ''"
                            tabindex="0"
                            scope="col"
                            @keydown="handlePageSortOnKeyDownEvent($event, column)"
                            @click="handlePageSortOnColumnClick($event, column)"
                        >
                            {{ column.name }}
                            <div v-show="column.key === sorting.column" class="inline-block">
                                <BrightIcon
                                    ref="sortIcon"
                                    :use="sortIcon[sorting.order]"
                                    v-bind="sortIconBindings"
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="rows.length > 0">
                    <tr
                        v-for="(row, rowIndex) in paginatedPages"
                        :id="id + 'Row' + uniqueRowID(row)"
                        :key="'row.' + rowIndex"
                        v-bind="tableBodyTableRowBindings(uniqueRowID(row))"
                        @click="handleRowClick(uniqueRowID(row))"
                    >
                        <td
                            v-show="Object.keys(bulkEditActions).length"
                            class="items-center"
                            @click.stop
                            @click.prevent
                        >
                            <BrightCheckbox
                                :id="id + 'BulkEditCheckbox' + (uniqueRowID(row))"
                                :checked="bulkEdit.whitelist.includes(id + 'Row' + uniqueRowID(row))"
                                v-bind="bulkEditCheckboxBindings"
                                hide-meta-label
                                @click.stop="handleSingleRowSelection(uniqueRowID(row))"
                                @keydown.space="handleSingleRowSelection(uniqueRowID(row))"
                            />
                        </td>
                        <td
                            v-for="(value, name) in row"
                            v-show="showRowItem(name)"
                            :key="rowIndex + '.' + name"
                            :class="cellClassObject(name)"
                            :style="cellStyleObject(name)"
                        >
                            <slot :name="getColumnSlotNameByKey(name)" v-bind="row">{{ getRowValue(value) }}</slot>
                        </td>
                    </tr>
                    <tr v-if="searchable && paginatedPages.length === 0">
                        <td :colspan="columns.length" class="text-center">No results found :(</td>
                    </tr>
                </tbody>
                <slot></slot> <!-- This slot is for the "simple" table -->
            </table>
        </div>

        <!------------- TABLE PAGINATION SECTION --------------->
        <BasePagination
            v-show="!hideFooter"
            ref="basePagination"
            v-bind="paginationBindings"
            v-model="pagination"
            @pagination:changed="emitPageUpdateEvent"
        />
    </BaseFormControl>
</template>

<script>
import { BrightTablePaginationMixin } from "./mixins/BrightTablePaginationMixin";
import { BrightTableSortMixin } from "./mixins/BrightTableSortMixin";
import { BrightTableSearchMixin } from "./mixins/BrightTableSearchMixin";
import { BrightTableFilterMixin } from "./mixins/BrightTableFilterMixin";
import { BrightTableBulkEditMixin } from "./mixins/BrightTableBulkEditMixin";
import BasePagination from "./BasePagination.vue";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
import BrightInputText from "Bright/components/input-library/text/BrightInputText.vue";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";
import BrightCheckbox from "Bright/components/input-library/checkbox/BrightCheckbox.vue";
import BrightInputCompound from "Bright/components/input-library/input-compound/BrightInputCompound.vue";
import BrightDropdownSelect from "Bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BaseFormControl from "Bright/components/input-library/base/BaseFormControl.vue";
import BrightPopover from "Bright/components/overlay-library/BrightPopover.vue";
import BrightTag from "Bright/components/core-library/tag/BrightTag.vue";
import BrightInputNumber from "Bright/components/input-library/number/BrightInputNumber.vue";
import BrightInputMoney from "Bright/components/input-library/money/BrightInputMoney.vue";
import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "BrightTable",
    components: {
        BaseFormControl,
        BrightDropdownSelect,
        BrightInputCompound,
        BrightButton,
        BrightCheckbox,
        BasePagination,
        BrightIcon,
        BrightInputText,
        BrightPopover,
        BrightTag,
        BrightInputNumber,
        BrightInputMoney,
    },
    mixins: [
        BrightTablePaginationMixin,
        BrightTableSortMixin,
        BrightTableSearchMixin,
        BrightTableFilterMixin,
        BrightTableBulkEditMixin,
    ],
    inheritAttrs: false,
    props: {
        /*****************************
        *         Table Props        *
        *****************************/
        id: {
            type: String,
            required: true,
            default: null,
        },
        columns: {
            type: Array,
            required: false,
            default: function() {
                return [];
            },
            validator: function(columns) {
                for (let [key, columnObject] of Object.entries(columns)) {
                    for (let [columnKey, columnValue] of Object.entries(columnObject)) {
                        let columnNumber = Number(key) + 1;
                        switch (columnKey) {
                            case 'name':
                            case 'key':
                                if (columnValue === '') {
                                    console.error("Missing '"+columnKey+"' in column #"+columnNumber);
                                    return false;
                                }
                                break;
                            case 'align':
                                if (!['', 'left', 'center', 'right'].includes(columnValue)) {
                                    console.error("Invalid '"+columnKey+"' value in column '"+columnObject['name']+"'");
                                    return false;
                                }
                                break;
                            case 'sort':
                                if (!['', 'asc', 'desc', 'none', false].includes(columnValue)) {
                                    console.error("Invalid '"+columnKey+"' value in column '"+columnObject['name']+"'");
                                    return false;
                                }
                                break;
                            case 'type':
                                if (!['string', 'number', 'money', 'date', 'array'].includes(columnValue)) {
                                    console.error("Invalid '"+columnKey+"' value in column '"+columnObject['name']+"'");
                                    return false;
                                }
                                break;
                            case 'filterable':
                                if (![true, false].includes(columnValue)) {
                                    console.error("Invalid boolean '"+columnKey+"' value in column '"+columnObject['name']+"'");
                                    return false;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
                return true;
            },
        },
        rows: {
            type: Array,
            required: false,
            default: function() {
                return [];
            },
        },
        showRefreshButton: {
            type: Boolean,
            default: false,
            required: false,
        },
        serverSideData: {
            type: Object,
            default: function() {
                return {};
            },
            required: false,
        },

        /*****************************
        *        Styling Props       *
        *****************************/
        bordered: {
            type: Boolean,
            default: true,
            required: false,
        },
        fullWidth: {
            type: Boolean,
            default: true,
            required: false,
        },
        formControl: {
            type: String,
            required: false,
            default: 'comfortable',
            validator(value) {
                return ['comfortable', 'tight', 'loose', 'none'].includes(value);
            },
        },
        hideHeader: {
            type: Boolean,
            default: false,
            required: false,
        },
        hideFooter: {
            type: Boolean,
            default: false,
            required: false,
        },
        padding: {
            type: [String],
            default: 'medium',
            required: false,
            validator: function(value) {
                return ['small', 'medium', 'large', 'none'].includes(value);
            },
        },
        rowClass: {
            type: [String, Object, Array],
            default: '',
            required: false,
        },
        rowStyle: {
            type: [String, Object, Array],
            default: '',
            required: false,
        },
        showHorizontalDivider: {
            type: Boolean,
            default: true,
            required: false,
        },
        showVerticalDivider: {
            type: Boolean,
            default: false,
            required: false,
        },
        size: {
            type: [String],
            default: 'medium',
            required: false,
            validator: function(value) {
                return ['small', 'medium', 'large'].includes(value);
            },
        },
        striped: {
            type: Boolean,
            default: true,
            required: false,
        },
    }, // Note: This was once set to "true". I (Mark) set it to "false" because $attrs was being bound to a nested element in the <template>.
    emits: [
        'row:click',
        'row:selected',
        'row:unselected',
        'refresh',
        'filter-update',
        'page-update',
        'search-update',
        'sort-update',
    ],
    data() {
        return {
            defaultRows: [],
            pages: [],
            columnStyling: {},
        };
    },
    computed: {
        isServerSide() {
            return !_isEmpty(this.serverSideData);
        },
        /**
         * Client-side: Retrieves the total # of rows in the table.
         * Server-side: Retrieves the total # of resources returned from the server.
         * @returns {number}
         */
        totalRowsCount() {
            return this.isServerSide ? this.serverSideData.total : this.pages.length;
        },
        tableContainerBindings() {
            return {
                class: {
                    'BrightTableContainer': true,
                },
                formControl: this.formControl,
                size: this.size,
            };
        },
        tableClassList() {
            return {
                'BrightTable': true,
                'BrightTable__bordered': this.bordered,
                'BrightTable__fullWidth': this.fullWidth,

                'BrightTable__padding--small': this.padding === 'small',
                'BrightTable__padding--medium': this.padding === 'medium',
                'BrightTable__padding--large': this.padding === 'large',
                'BrightTable__padding--none': this.padding === 'none',

                'BrightTable__showHorizontalDivider': this.showHorizontalDivider,
                'BrightTable__showVerticalDivider': this.showVerticalDivider,

                'BrightTable__size--small': this.size === 'small',
                'BrightTable__size--medium': this.size === 'medium',
                'BrightTable__size--large': this.size === 'large',

                'BrightTable__striped': this.striped,
            };
        },
        hiddenColumnKeys() {
            let hiddenColumnKeys = [];
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].hidden !== undefined && this.columns[i].hidden === true) {
                    hiddenColumnKeys.push(this.columns[i].key);
                }
            }
            return hiddenColumnKeys;
        },
        getRowValue() {
            return (value) => {
                return Array.isArray(value) ? value.join(', ') : value;
            };
        },
    },
    watch: {
        rows: {
            deep: true,
            handler(newVal, oldVal) {
                this.validateRowsProperty();

                // If rows are added or removed.
                if (!_isEqual(newVal, oldVal)) {
                    this.handleRowUpdates();
                }
            },
        },
        pages: {
            deep: true,
            handler: function() {
                if (this.filtering.edit.length) {
                    // When filters are added or removed, update the # of selected rows.
                    this.setSelectedRowsOnTableUpdate();
                }

                // Ensure the Bulk-Edit All checkbox is correctly updated.
                this.bulkEdit.all = this.bulkEditAll;
            },
        },
    },
    mounted() {
        // Save initial row order.
        this.defaultRows = _cloneDeep(this.rows);

        // Automatically sort columns if sort order is specified in the data object.
        this.applyInitialSort();

        this.updateTable();
    },
    created() {
        setRowUniqueID(this);

        // Determine Filters that can be Added vs. Edited (In this function, "Edited" refers to applying an Initial Filter to the table.)
        this.determineAddEditFilterData();

        /**
         * Sets a brightTableRowUID to each row.
         * @param thisComponent
         */
        function setRowUniqueID(thisComponent) {
            let rows = thisComponent.rows;

            for (let i = 0; i < rows.length; i++) {
                if (rows[i]['brightTableRowUID'] === undefined) {
                    rows[i]['brightTableRowUID'] = i+1;
                }
            }
        }
    },
    methods: {
        handleRowClick(rowID = '') {
            this.$emit('row:click', rowID);
        },

        showRowItem(itemName) {
            return (
                itemName !== 'brightTableRowUID'
                    && !this.hiddenColumnKeys.includes(itemName)
                    && this.columns.find(column => column.key === itemName)
            );
        },

        /**
         * Obtains the styling classes for Columns.
         * @param {Object} column
         * @returns {Object}
         */
        columnClassObject(column) {
            let classObject = {
                'whitespace-nowrap': true,
                'select-none': true,
                'outline-none': true, /* TODO: Eventually we need to decide on a proper focus outline */
            };

            const requiredColumnObjectKeys = ['name', 'align', 'sort', 'key'];
            let columnObjectKeys = Object.keys(column);

            requiredColumnObjectKeys.forEach(requiredColumnObjectKey => {
                if (requiredColumnObjectKey === 'align') {
                    if (!columnObjectKeys.includes(requiredColumnObjectKey)
                            || column[requiredColumnObjectKey] === '' || column[requiredColumnObjectKey] === 'left') {
                        this.columnStyling[column['key']] = 'left';
                        classObject['BrightTable__column--align--left'] = true;
                    }
                    if (column[requiredColumnObjectKey] === 'center') {
                        this.columnStyling[column['key']] = 'center';
                        classObject['BrightTable__column--align--center'] = true;
                    }
                    if (column[requiredColumnObjectKey] === 'right') {
                        this.columnStyling[column['key']] = 'right';
                        classObject['BrightTable__column--align--right'] = true;
                    }
                }
                if (requiredColumnObjectKey === 'sort') {
                    if (column[requiredColumnObjectKey] !== 'none') {
                        classObject['BrightTable__column--sort'] = true;
                    }
                }
            });

            if (column.headerClass) {
                Object.assign(classObject, this.getObjectForClassStyleBindingsFromVariable(column.headerClass));
            }

            return classObject;
        },

        getObjectForClassStyleBindingsFromVariable(input) {
            let returnedObject = {};

            if (Object.prototype.toString.call(input) === '[object String]') {
                returnedObject[input] = true;
            } else if (input.constructor === Array) {
                returnedObject[input.join(' ')] = true;
            } else {
                Object.assign(returnedObject, input);
            }

            return returnedObject;
        },

        /**
         * Obtains the styling classes for a Table Data Cell.
         * @param {String} cellName
         * @returns {Object}
         */
        cellClassObject(cellName) {
            let classObject = {};
            for (let columnName in this.columnStyling) {
                if (cellName === columnName) {
                    if (this.columnStyling[cellName] === 'left') {
                        classObject['BrightTable__row--align--left'] = true;
                    }
                    if (this.columnStyling[cellName] === 'center') {
                        classObject['BrightTable__row--align--center'] = true;
                    }
                    if (this.columnStyling[cellName] === 'right') {
                        classObject['BrightTable__row--align--right'] = true;
                    }
                }
            }

            // If this cell is in a column that has cellClass set, then apply it here
            // TODO: Performance optimization is possible by caching this in a key-value array computed property.
            const columnWithCellClass = this.columns.find(column => column.key === cellName);

            if (columnWithCellClass && columnWithCellClass.cellClass !== undefined) {
                Object.assign(classObject, this.getObjectForClassStyleBindingsFromVariable(columnWithCellClass.cellClass));
            }

            return classObject;
        },

        /**
         * Obtains the style attribute for a Table Data Cell.
         * @param {String} cellName
         * @returns {Object}
         */
        cellStyleObject(cellName) {
            const columnHeaderForCell = this.columns.find(column => column.key === cellName);
            return (columnHeaderForCell && columnHeaderForCell.cellStyle !== undefined) ? columnHeaderForCell.cellStyle : '';
        },

        /**
         * Returns a row's unique ID.
         */
        uniqueRowID(row) {
            return row.id !== undefined ? row.id : row.brightTableRowUID;
        },

        /**
         * Sets the <tbody> <tr> bindings.
         * @param {String} rowID
         * @returns {Object}
         */
        tableBodyTableRowBindings(rowID) {
            const rowClassObject = {
                'BrightTable__bulkEditable': this.bulkEditAll || this.bulkEdit.whitelist.includes(this.id + 'Row' + rowID),
            };

            return {
                ...{
                    class: this.mergeClassObjectWithRowClass(rowClassObject),
                    style: this.rowStyle,
                },
                ...this.$attrs,
            };
        },

        /**
         * Merges class objects with the rowClass object in order to apply multiple class objects.
         * @param {Object} classObject
         * @returns {Object}
         */
        mergeClassObjectWithRowClass(classObject = {}) {
            return {
                ...{
                    [this.rowClass]: true,
                },
                ...classObject,
            };
        },

        /**
         * Gets column types for filter feature.
         */
        getColumnType(column) {
            let type = column['type'];
            if (type === undefined) {
                return 'string';
            }
            return type;
        },

        /**
         * Runs necessary functions to update/refresh table.
         */
        updateTable() {
            this.setPages();

            if (this.shouldShowSearch) {
                this.handleSearch();
            }

            if (this.shouldShowFilters) {
                this.filterTable();
            }

            if (!this.isServerSide) {
                this.pagination.changeToFirstPage = true;
            }
        },

        emitRefreshEvent() {
            this.$emit('refresh', this.paginationEmittedEventPayload);
        },

        /**
         * Handles the table's reactivity when rows are added or removed.
         * This may occur when obtaining new row data from a server.
         */
        handleRowUpdates() {
            this.defaultRows = _cloneDeep(this.rows); // Save new default row order.
            this.setPages(this.rows);
            this.updateTable();
            this.handleRemovalOfSelectedRows();
            this.setSelectedRowsOnTableUpdate();
        },


        /*****************************
        *       Helper Methods       *
        *****************************/
        removeSpecialChars(string, runIntegerCheck = false, convertToLowerCase = true) {
            if (typeof string === 'number') return string;

            if (runIntegerCheck) {
                return string.toLowerCase().replace(/[^.0-9a-z]/gi, '');
            } else {
                if (convertToLowerCase) {
                    return string.toLowerCase().replace(/[^0-9a-z]/gi, '');
                }
                return string.replace(/[^0-9a-z]/gi, '');
            }
        },

        convertToNumberType(value) {
            if (/^\d*\.?\d*$/.test(value)) {
                return Number(value);
            }
        },

        convertToPascalCase(string) {
            if (string === undefined) return;

            let splitStr = string.toLowerCase().split(' ');
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join('');
        },

        convertToCamelCase(string) {
            if (typeof string !== 'string') return;
            string = string.split(' ');
            string[0] = string[0].toLowerCase();
            return string.join('');
        },

        /*****************************
        *     Validation Methods     *
        *****************************/
        validateRowsProperty() {
            for (let [, rowObject] of Object.entries(this.rows)) {
                if (Object.keys(this.bulkEditActions).length) {
                    if (!('id' in rowObject)) {
                        console.error("Since bulk editing is enabled, all row objects must contain an 'id' property");
                    }
                }
            }
        },
    },
};
</script>

<style scoped>

</style>
