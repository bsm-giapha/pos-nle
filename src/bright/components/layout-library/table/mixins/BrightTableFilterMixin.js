import { nextTick } from "vue";

/**
 * Implements the Filter feature in the BrightTable.
 * Filtering can be enabled with the `filters` property.
 * Initial Filters can be applied by setting all required properties in the Filter object.
 */
export const BrightTableFilterMixin = {
    props: {
        filters: {
            type: Array,
            required: false,
            default: function() {
                return [];
            },
        },
    },

    data() {
        return {
            filtering: {
                add: [],
                selectedAddFilterCriteria: '',
                selectedAddFilterOperator: '',
                selectedAddFilterValue: '',
                selectedAddFilterValueMoney: '',
                selectedAddFilterValueNumber: '',
                selectedAddFilterValueDateFrom: '',
                selectedAddFilterValueDateTo: '',

                edit: [],
                editPopoverCurrentlyOpen: '',
                editPopoverRecentlyClosed: '',
                selectedEditFilterCriteria: '',
                selectedEditFilterOperator: '',
                selectedEditFilterValue: '',
                selectedEditFilterValueMoney: '',
                selectedEditFilterValueNumber: '',
                selectedEditFilterValueDateFrom: '',
                selectedEditFilterValueDateTo: '',
            },
        };
    },

    computed: {
        shouldShowFilters() {
            return this.filters.length !== 0;
        },

        getFilterPopoverPropsAndAttrs() {
            return (action) => {
                if (action === 'add') {
                    return {
                        placement: 'bottom-start',
                        arrow: false,
                        disabled: this.filtering.add.length === this.filtering.edit.length,
                    };
                }

                if (action === 'edit') {
                    return {
                        placement: 'bottom-start',
                        arrow: false,
                    };
                }
            };
        },
        filterPopoverTemplateContainerBindings() {
            return {
                style: 'width: 340px; max-width: 340px',
            };
        },
        filterPopoverHeaderDivBindings() {
            return {
                class: 'mb-16',
            };
        },
        filterPopoverHeaderSpanBindings() {
            return {
                class: 'font-primary font-semibold',
            };
        },
        filterPopoverOperatorValueBindings() {
            return {
                class: 'flex',
            };
        },
        filterPopoverOperatorBindings() {
            return {
                class: 'w-full mr-16',
            };
        },
        filterPopoverValueBindings() {
            return {
                class: 'w-full',
            };
        },
        filterPopoverActionsContainerBindings() {
            return {
                class: 'float-right',
            };
        },
        getFilterPopoverCriteriaPropsAndAttrs() {
            return (action, filter = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterCriteria',
                    label: 'Criteria',
                    placeholder: 'Select Criteria',
                    'menu-full-width': true,
                    hideLabel: true,
                    class: 'mt-16',
                    options: this.getFilterDropdownCriteriaOptions(action),
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterCriteria-' + filter.columnKey;
                    bindingObject['options'] = this.getFilterDropdownCriteriaOptions(action, filter.name);
                    bindingObject['disabled'] = true;
                }
                return bindingObject;
            };
        },
        getFilterPopoverOperatorPropsAndAttrs() {
            return (action, filter = '', ref = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterOperator',
                    label: 'Operator',
                    placeholder: '',
                    'menu-full-width': true,
                    disabled: this.filtering.selectedAddFilterCriteria === '',
                    options: this.getFilterDropdownOperatorOptions(action),
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterOperator-' + filter.columnKey;
                    bindingObject['options'] = this.getFilterDropdownOperatorOptions(action, filter.name, ref);
                    bindingObject['disabled'] = false;
                }
                return bindingObject;
            };
        },
        getFilterPopoverOperatorDateFromPropsAndAttrs() {
            return (action, filter = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterDateFrom',
                    label: 'From',
                    placeholder: 'mm/dd/yyyy',
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterDateFrom-' + filter.columnKey;
                }
                return bindingObject;
            };
        },
        getFilterPopoverOperatorDateToPropsAndAttrs() {
            return (action, filter = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterDateTo',
                    label: 'To',
                    placeholder: 'mm/dd/yyyy',
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterDateTo-' + filter.columnKey;
                }
                return bindingObject;
            };
        },
        getFilterPopoverValuePropsAndAttrs() {
            return (action, filter = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterValue',
                    label: 'Value',
                    placeholder: '',
                    'menu-full-width': true,
                    disabled: this.filtering.selectedAddFilterCriteria === '',
                    multiple: this.filterIsTypeStringOrArrayByAction(action),
                    options: this.getFilterDropdownValueOptions(action),
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterValue-' + filter.columnKey;
                    bindingObject['options'] = this.getFilterDropdownValueOptions(action, filter.name);
                    bindingObject['multiple'] = this.filterIsTypeStringOrArrayByAction(action);
                    bindingObject['disabled'] = false;
                }
                return bindingObject;
            };
        },
        getFilterPopoverValueMoneyPropsAndAttrs() {
            return (action, filter = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterValueMoney',
                    label: 'Value',
                    placeholder: '',
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterValueMoney-' + filter.columnKey;
                }
                return bindingObject;
            };
        },
        getFilterPopoverValueNumberPropsAndAttrs() {
            return (action, filter = '') => {
                let bindingObject = {
                    id: this.id + 'AddFilterValueNumber',
                    label: 'Value',
                    placeholder: '',
                };

                if (action === 'edit') {
                    bindingObject['id'] = this.id + 'EditFilterValueNumber-' + filter.columnKey;
                }
                return bindingObject;
            };
        },
        getAddFilterButtonPropsAndAttrs() {
            return {
                class: 'tablet:ml-12 addFilterButton__enabled',
                use: "secondary",
                size: "small",
                icon: "filter_list",
                iconPosition: "center",
                isToggleButton: true,
                disabled: this.filtering.add.length === this.filtering.edit.length,
            };
        },
        getEditFilterTagPropsAndAttrs() {
            return filter => {
                return {
                    id: 'editFilterTag-' + filter.columnKey,
                    label: this.getEditFilterTagLabel(filter),
                    isToggleTag: true,
                    removable: true,
                    active: this.filtering.editPopoverCurrentlyOpen.columnKey === filter.columnKey,
                    class: 'mb-12 mr-4',
                    color: 'blue',
                };
            };
        },
        filterPopoverActionBindings() {
            return (action, filter) => {
                return {
                    class: 'mr-8 ' + action + 'FilterActionButton',
                    disabled: this.filterActionButtonIsDisabled(action, filter),
                };
            };
        },

        actionCapitalized() {
            return (action) => {
                return action.charAt(0).toUpperCase() + action.slice(1);
            };
        },
        filterIsTypeStringOrArrayByAction() {
            return (action) => {
                if (action === 'add') {
                    let hasNoSelection = this.filtering.selectedAddFilterCriteria === '';
                    return hasNoSelection || this.filterAddIsTypeByType('string') || this.filterAddIsTypeByType('array');
                } else if (action === 'edit') {
                    return this.filterEditIsTypeByType('string') || this.filterEditIsTypeByType('array');
                }
            };
        },
        filterAddIsTypeByType() {
            return (type) => {
                let criteria = this.filtering.selectedAddFilterCriteria;
                if (criteria === '') return false;

                let column = this.filtering.add.find(object => object.name === criteria);
                if (column === undefined) return false;

                let columnType = this.filtering.add.find(object => object.name === criteria).type;
                return columnType === type;
            };
        },
        filterEditIsTypeByType() {
            return (type) => {
                if (this.filtering.editPopoverCurrentlyOpen === undefined) return false;
                let filterableColumn = this.filtering.add.find(filterableColumn => filterableColumn.name === this.filtering.editPopoverCurrentlyOpen.name);
                return filterableColumn !== undefined && (filterableColumn.type === type);
            };
        },
        filterIsTypeByTypeFilterName() {
            return (type, filterName) => {
                if (filterName === '') return false;
                let filterObject = this.filtering.add.find(object => object.name === filterName);
                return (filterObject.type + '') === (type + '');
            };
        },
        filterInputHasErrorByTypeAction() {
            return (type, action) => {
                let dateFromValue = this.filtering[this.selectedFilter(action, 'FilterValueDateFrom')];
                let dateToValue = this.filtering[this.selectedFilter(action, 'FilterValueDateTo')];
                let moneyValue = this.filtering[this.selectedFilter(action, 'FilterValueMoney')];
                let numberValue = this.filtering[this.selectedFilter(action, 'FilterValueNumber')];
                let dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

                switch (type) {
                    case 'dateFrom':
                        return !dateRegex.test(dateFromValue);
                    case 'dateTo':
                        return !dateRegex.test(dateToValue);
                    case 'money':
                        return moneyValue === '$' || moneyValue === '';
                    case 'number':
                        return numberValue === '';
                    default:
                        break;
                }
            };
        },

        /**
         * Returns the selected filter property given the action & the filter name.
         * "filterName" must be in PascalCase.
         * @returns {string}
         */
        selectedFilter() {
            return (action, filterName) => {
                let actionCapitalized = this.actionCapitalized(action);
                return 'selected' + actionCapitalized + filterName;
            };
        },

        /**
         * Returns all of the filterable columns.
         * @returns {[]}
         */
        getFilterableColumns() {
            let columns = [];
            for (const column in this.columns) {
                let filterable = this.columns[column]['filterable'];
                if (filterable === true) {
                    columns.push(this.columns[column]);
                }
            }
            return columns;
        },

        /**
         * Gets a filter's selected Criteria name.
         * @returns {string}
         */
        getSelectedFilterCriteria() {
            return (action, filterName = '') => {
                let criteria = this.filtering.selectedAddFilterCriteria;
                if (action === 'edit' && filterName !== '') {
                    criteria = this.filtering.selectedEditFilterCriteria;
                }
                return criteria;
            };
        },

        /**
         * Gets a filter's selected Operator option.
         * @returns {string}
         */
        getSelectedFilterOperator() {
            return (action, filterName = '') => {
                let operator = this.filtering.selectedAddFilterOperator;
                if (action === 'edit' && filterName !== '') {
                    operator = this.filtering.selectedEditFilterOperator;
                }
                return operator;
            };
        },

        /**
         * Gets a filter's selected Value option.
         * @returns {string}
         */
        getSelectedFilterValue() {
            return (action, filterName = '') => {
                let value = this.filtering.selectedAddFilterValue;
                if (action === 'edit' && filterName !== '') {
                    value = this.filtering.selectedEditFilterValue;
                }
                return value;
            };
        },

        /**
         * Determines a filter's type.
         * @returns {string}
         */
        determineFilterType() {
            return (action, type) => {
                return (action === 'add') ? this.filterAddIsTypeByType(type): this.filterEditIsTypeByType(type);
            };
        },

        /**
         * Determines if the filter dropdown's date inputs are valid & completely populated.
         * @returns {string}
         */
        operatorDateInputsAreValid() {
            return (action) => {
                let operatorDateFromHasInputError = this.filterInputHasErrorByTypeAction('dateFrom', action);
                let operatorDateToHasInputError = this.filterInputHasErrorByTypeAction('dateTo', action);
                let operatorDateInputsArePopulated = this.filtering[this.selectedFilter(action, 'FilterValueDateFrom')] !== '' && this.filtering[this.selectedFilter(action, 'FilterValueDateTo')] !== '';
                return ((operatorDateFromHasInputError === false && operatorDateToHasInputError === false) && operatorDateInputsArePopulated);
            };
        },
    },

    watch: {
        filters: {
            deep: true,
            handler() {
                this.validateFiltersProperty();
            },
        },
        'filtering.edit': {
            deep: true,
            handler() {
                this.updateTable();
                this.$emit('filter-update', this.filtering.edit);

                if (this.isServerSide) {
                    this.resetSelection();
                    this.pagination.changeToFirstPage = true;
                }
            },
        },
        'filtering.selectedAddFilterCriteria': function() {
            this.handleResettingFilterPopoverInputValues('add', true);
        },
        'filtering.editPopoverCurrentlyOpen': function(filter) {
            if (filter === '') return;

            this.filtering.selectedEditFilterCriteria = filter.name;
            this.resetFilterPopoverInputValues('Edit');
        },
        'filtering.editPopoverRecentlyClosed': function() {
            this.filtering.selectedEditFilterCriteria = this.filtering.editPopoverCurrentlyOpen.name;
        },
    },

    created() {
        this.validateFiltersProperty();
    },

    methods: {
        /**
         * Determines Add vs. Edit Filter data.
         */
        determineAddEditFilterData() {
            this.storeAddFilterData();
            this.storeEditFilterData();
        },

        /**
         * Stores the data needed for adding a filter.
         */
        storeAddFilterData() {
            this.filtering.add = [];
            let filterableColumns = this.getFilterableColumns;
            filterableColumns.forEach((column) => {
                let filterObject = {};
                let pluralName = '';

                filterObject.columnKey = column['key'];
                filterObject.type = this.getColumnType(column);
                filterObject.name = column['name'];

                if (column['type'] === undefined || column['type'] === 'string') {
                    let filters = this.filters.find(object => object.columnKey === column['key']);
                    if (filters !== undefined) {
                        pluralName = filters.pluralName;
                    }
                }
                if (pluralName !== '') {
                    filterObject.pluralName = pluralName;
                }

                this.filtering.add.push(filterObject);
            });
        },

        /**
         * Stores the data needed for editing an existing filter.
         * This is also used to capture values set for initial filters.
         */
        storeEditFilterData() {
            this.filtering.edit = [];
            for (const filter in this.filters) {
                if (this.filters[filter]['value'] !== undefined) {
                    this.filtering.edit.push(this.filters[filter]);
                }
            }
        },

        /**
         * Gets the Criteria Filter dropdown options.
         */
        getFilterDropdownCriteriaOptions(action, filterName = '') {
            let options = [];
            let filterNamesList = [];
            this.filtering.add.forEach(filter => filterNamesList.push(filter.name));

            let filters = {};
            this.filtering.add.forEach(filter => filters[filter.columnKey] = filter.name);

            // Construct options list.
            for (const [columnKey, name] of Object.entries(filters)) {
                let optionsObject = {};
                let isDisabled = this.filtering.edit.some(object => object.name === name);

                optionsObject['columnKey'] = columnKey;
                optionsObject['label'] = name;
                optionsObject['value'] = name;
                optionsObject['disabled'] = isDisabled;

                if (action === 'edit' && filterName !== '') {
                    if (name === filterName) {
                        optionsObject['selected'] = true;
                        optionsObject['disabled'] = !isDisabled;
                    }
                }
                options.push(optionsObject);
            }

            // Alphabetize options list by Criteria label.
            options.sort((a, b) => (a.label > b.label) ? 1 : -1);
            return options;
        },

        /**
         * Gets the Operator Filter dropdown options.
         */
        getFilterDropdownOperatorOptions(action, filterName = '') {
            let options = [];
            let optionsText = [];

            if (action === 'add') {
                let criteria = this.filtering.selectedAddFilterCriteria;
                if (criteria === '') return;

                let column = this.filtering[action].find(object => object.name === criteria);
                if (column !== undefined) {
                    let columnType = this.filtering[action].find(object => object.name === criteria).type;
                    optionsText = this.getFilterDropdownOperatorOptionsText(columnType);
                }
            }

            if (action === 'edit' && filterName !== '') {
                let criteria = this.filtering.selectedEditFilterCriteria;
                if (criteria === '') return;

                let filterObject = this.filtering.add.find(object => object['name'] === criteria);
                optionsText = this.getFilterDropdownOperatorOptionsText(filterObject.type);
            }

            // Build the dropdown's options object.
            optionsText.forEach((text) => {
                const value = this.removeSpecialChars(this.convertToCamelCase(text), false, false);
                options.push({ label: text, value: value });
            });
            return options;
        },

        /**
         * Returns a list of a filter's Operator dropdown options.
         * @param filterType
         * @returns {string[]|*[]}
         */
        getFilterDropdownOperatorOptionsText(filterType) {
            switch (filterType) {
                case 'string':
                    return ['Equal To', 'Not Equal To'];
                case 'number':
                case 'money':
                    return ['Greater Than', 'Less Than'];
                case 'array':
                    return ['Contains', 'Doesn\'t Contain'];
                default:
                    return [];
            }
        },

        /**
         * Gets the Value Filter dropdown options.
         */
        getFilterDropdownValueOptions(action, filterName = '') {
            let criteria = this.getSelectedFilterCriteria(action, filterName);
            if (criteria === '') return;

            let options = [];
            let optionsList = [];

            if (this.isServerSide) {
                optionsList = this.serverSideData.filter[this.convertToCamelCase(criteria)];
                optionsList.forEach((option) => {
                    options.push({ columnKey: option.columnKey ?? option.name, label: option.name, value: option.name });
                });
            } else {
                optionsList = this.getFilterDropdownValueOptionsList(criteria);
                optionsList.forEach((option) => {
                    options.push({ columnKey: this.convertToCamelCase(option), label: option, value: option });
                });
            }
            return options;
        },

        /**
         * Gets a list of options for the Value filter dropdown.
         * @param {string} criteria
         * @returns {[]} The options list.
         */
        getFilterDropdownValueOptionsList(criteria) {
            let optionsList = [];
            let flags = {};
            let criteriaCamelCase = this.convertToCamelCase(criteria);

            // Get rows with unique row values.
            let rows = this.rows.filter(row => {
                if (flags[row[criteriaCamelCase]]) return false;
                flags[row[criteriaCamelCase]] = true;
                return true;
            });

            // Collect row values only.
            rows.forEach(row => optionsList.push(row[criteriaCamelCase]));
            return this.sortFilterDropdownValueOptionsList(optionsList, criteria);
        },

        /**
         * Sorts the options for the Value filter dropdown.
         * @param {[]} optionsList
         * @param {string} criteria
         * @returns {[]} The sorted options list.
         */
        sortFilterDropdownValueOptionsList(optionsList, criteria) {
            if (!optionsList) return [];

            // Get value type.
            let addFilterObject = this.filtering.add.find(object => object['name'] === criteria);
            let valueType = addFilterObject ? addFilterObject.type : '';

            // Arrange options order.
            if (valueType === 'string') {
                optionsList.sort().join('');
            } else if (valueType === 'array') {
                let extractedStates = [];
                // Extract the states listed in each array inside the optionsList.
                optionsList.map(option => option.map(state => extractedStates.push(state)));
                // Eliminate duplicate states.
                const uniqueOptions = extractedStates.filter((state, index, arr) => arr.indexOf(state) === index);
                // Alphabetize states.
                optionsList = uniqueOptions.sort();
            }
            return optionsList;
        },

        /**
         * Handles the event for an opened Filter Popover.
         */
        handleFilterPopoverOpenedEvent(action, sourceElement, filter = '') {
            if (action === 'add') {
                this.setActiveToggleForFilterPopoverSourceElement(sourceElement);
            }

            if (action === 'edit' && filter !== '') {
                this.filtering.editPopoverCurrentlyOpen = filter;
                this.filtering.selectedEditFilterCriteria = filter.name;
                this.setActiveToggleForFilterPopoverSourceElement(sourceElement);
            }

            nextTick(() => {
                // Pre-select input data.
                this.handlePreSelectedFilterInputData(action, '', filter);
            });
        },

        /**
         * Calls functions responsible for pre-selecting Filter input data.
         */
        handlePreSelectedFilterInputData(action, $event = '', filter = '') {
            if (action === '') return '';

            let inputType = '';
            let criteriaName = '';

            // Get selected criteria name.
            if (action === 'add' && $event !== '') criteriaName = $event;
            if (action === 'edit' && filter !== '') criteriaName = filter.name;

            if (criteriaName !== '') {
                // Obtain filter type.
                let filterableColumn = this.filtering.add.find(filterableColumn => filterableColumn.name === criteriaName);
                if (filterableColumn !== undefined) inputType = filterableColumn.type;
            }

            // Pre-select input data.
            nextTick(() => {
                this.setPreSelectedFilterInputOperator(action, inputType, filter);
                this.setPreSelectedFilterInputValue(action, inputType, filter);
            });
        },

        /**
         * Sets the pre-selected operator when adding/editing a filter.
         */
        setPreSelectedFilterInputOperator(action, inputType, filter = '') {
            if (action === '' || inputType === 'date') return '';

            let operatorSelected = '';
            if (action === 'add') {
                if (inputType === 'string') {
                    operatorSelected = 'equalTo';
                } else if (inputType === 'number' || inputType === 'money') {
                    operatorSelected = 'greaterThan';
                } else if (inputType === 'array') {
                    operatorSelected = 'contains';
                }
            }

            if (action === 'edit' && filter !== '') {
                let editFilterObject = this.filtering.edit.find(object => object.name === filter.name);
                if (editFilterObject !== undefined) operatorSelected = editFilterObject.operator;
            }

            // Pre-select Operator input data.
            let actionCapitalized = this.actionCapitalized(action);
            let selectedActionFilterOperator = 'selected' + actionCapitalized + 'FilterOperator';
            this.filtering[selectedActionFilterOperator] = operatorSelected;
        },

        /**
         * Sets the pre-selected value when adding/editing a filter.
         */
        setPreSelectedFilterInputValue(action, inputType, filter) {
            if (action === '' || filter === '') return '';

            let valueSelected = '';
            if (action === 'edit' && filter !== '') {
                let editFilterObject = this.filtering.edit.find(object => object.name === filter.name);
                if (editFilterObject.value) {
                    valueSelected = editFilterObject.value;

                    if (inputType === 'date') {
                        inputType = ['DateFrom', 'DateTo'];
                    }
                }
            }

            // Capitalize action.
            action = this.actionCapitalized(action);
            let selectedActionFilterValue = 'selected' + action + 'FilterValue';

            // Pre-select Value input data.
            if (inputType === 'string' || inputType === 'array') {
                this.filtering[selectedActionFilterValue] = valueSelected;

            } else if (inputType.length === 2) { // This is a date input.
                if (valueSelected.length === 2) {
                    valueSelected.forEach((date, index) => {
                        let selectedActionFilterValue = 'selected' + action + 'FilterValue' + inputType[index];
                        this.filtering[selectedActionFilterValue] = valueSelected[index];
                    });
                }
            } else { // This is a number or money input.
                inputType = this.actionCapitalized(inputType);
                selectedActionFilterValue += inputType;
                this.filtering[selectedActionFilterValue] = valueSelected;
            }
        },

        /**
         * Handle event for a closed Filter Popover.
         */
        handleFilterPopoverClosedEvent(action, sourceElement, filter = '') {
            if (action === 'add') {
                this.handleResettingFilterPopoverInputValues(action);
                this.setInactiveToggleForFilterPopoverSourceElement(sourceElement);
            }

            if (action === 'edit' && filter !== '') {
                this.filtering.editPopoverRecentlyClosed = filter;
                this.handleResettingFilterPopoverInputValues(action);
                this.setInactiveToggleForFilterPopoverSourceElement(sourceElement);
            }
        },

        /**
         * Sets the toggle to active for the 'Add Filter' button and 'Edit Filter' tags.
         */
        setActiveToggleForFilterPopoverSourceElement(sourceRef) {
            for (const [key] of Object.entries(this.$refs)) {
                // Toggle filter button as active.
                if (key === sourceRef && key.includes('FilterButton')) {
                    this.$refs.addFilterButton.toggle.active = true;
                }

                // Toggle filter tag as active.
                if (key === sourceRef && key.includes('FilterTag')) {
                    let ref = this.$refs[key][0].$vnode.data.ref;
                    let lowerCaseRef = ref.toLowerCase();
                    this.$refs[sourceRef][0].toggle.active = this.filtering.editPopoverCurrentlyOpen.columnKey !== undefined && lowerCaseRef.includes(this.filtering.editPopoverCurrentlyOpen.columnKey.toLowerCase());
                }
            }
        },

        /**
         * Sets the toggle to inactive for the 'Add Filter' button and 'Edit Filter' tags.
         */
        setInactiveToggleForFilterPopoverSourceElement(sourceRef) {
            for (const [key] of Object.entries(this.$refs)) {
                // Toggle filter button as inactive.
                if (key === sourceRef && key.includes('FilterButton')) {
                    this.$refs.addFilterButton.toggle.active = false;
                }

                // Toggle filter tag as inactive.
                if (key === sourceRef && key.includes('FilterTag')) {
                    this.$refs[sourceRef][0].toggle.active = false;
                }
            }
        },

        /**
         * Handles functionality for cancelling a Filter.
         */
        handleCancelFilter(action) {
            this.closeFilterPopover(action);
            this.handleResettingFilterPopoverInputValues(action);
        },

        /**
         * Disables the Add Filter/Edit Filter button until all values have been inputted.
         */
        filterActionButtonIsDisabled(action, filter = '') {
            if (action === 'edit' && filter !== '' && filter.name !== this.filtering.selectedEditFilterCriteria) return;

            let criteria = this.getSelectedFilterCriteria(action, filter);
            let operator = this.getSelectedFilterOperator(action, filter);
            let value = this.getSelectedFilterValue(action, filter);

            let isDateType = this.determineFilterType(action, 'date');
            let dateInputsAreInvalid = !this.operatorDateInputsAreValid(action);

            let isMoneyType = this.determineFilterType(action, 'money');
            let valueMoneyHasInputError = this.filterInputHasErrorByTypeAction('money', action);

            let isNumberType = this.determineFilterType(action, 'number');
            let valueNumberHasInputError = this.filterInputHasErrorByTypeAction('number', action);

            if (isDateType) {
                return criteria === '' || dateInputsAreInvalid;
            }
            if (isMoneyType) {
                return criteria === '' || operator === '' || valueMoneyHasInputError;
            }
            if (isNumberType) {
                return criteria === '' || operator === '' || valueNumberHasInputError;
            }
            return criteria === '' || operator === '' || (!value.length || value === '');
        },

        /**
         * Handles functionality for applying a new Filter.
         */
        handleApplyFilter(action) {
            this.storeFilterObjectData(action);
            this.closeFilterPopover(action);
        },

        /**
         * Stores filter data in order to apply filter to the data.
         * @param {string} action
         */
        storeFilterObjectData(action) {
            let filterObject = this.buildFilterObjectForStoring(action);
            if (Object.keys(filterObject).length) {
                // If filter is currently set, update values.
                if (action !== 'add' && this.filtering.edit.find(filter => filter.columnKey === filterObject['columnKey'])) {
                    this.filtering.edit.forEach(function(filter) {
                        if (filter.columnKey === filterObject['columnKey']) {
                            filter.operator = filterObject['operator'];
                            filter.value = filterObject['value'];
                        }
                    });
                } else {
                    // Else, save new filter object data.
                    if (action === 'add') {
                        // Obtain filter's plural name, if available.
                        let filters = this.filters.find(object => object['name'] === this.filtering.selectedAddFilterCriteria);
                        if (filters !== undefined) {
                            filterObject['pluralName'] = filters.pluralName;
                        }
                    }
                    // Save Edit Filter data.
                    this.filtering.edit.push(filterObject);
                }
            }
        },

        /**
         * Builds the filter object needed to prepare for storing filter data.
         * @param {string} action
         * @returns {{}}
         */
        buildFilterObjectForStoring(action) {
            let filterObject = {};
            let criteria = this.filtering[this.selectedFilter(action, 'FilterCriteria')];
            let operator = this.filtering[this.selectedFilter(action, 'FilterOperator')];
            let value = this.filtering[this.selectedFilter(action, 'FilterValue')];
            const initialFiltersObject = this.filters.find(filter => (filter.name === criteria));

            filterObject['columnKey'] = initialFiltersObject ? initialFiltersObject.columnKey : this.filtering.add.find(filter => (filter.name === criteria)).columnKey;
            filterObject['name'] = criteria;

            if (operator !== '') {
                filterObject['operator'] = operator;
            }

            if (value !== '') {
                // String or Array value.
                filterObject['value'] = value;
            } else {
                value = this.filtering[this.selectedFilter(action, 'FilterValueMoney')] || this.filtering[this.selectedFilter(action, 'FilterValueNumber')];
                if (value) {
                    // Money or Number value.
                    filterObject['value'] = value;
                } else {
                    // Else, it's a Date value.
                    filterObject['value'] = [this.filtering[this.selectedFilter(action, 'FilterValueDateFrom')], this.filtering[this.selectedFilter(action, 'FilterValueDateTo')]];
                }
            }
            return filterObject;
        },

        /**
         * Closes open popovers.
         */
        closeFilterPopover(action) {
            if (action === 'add') {
                this.$refs.addFilterPopover.$_closePopover();

            } else if (action === 'edit') {
                // Close all Edit Filter popovers.
                for (const [key] of Object.entries(this.$refs)) {
                    if (key.includes('editFilterPopover')) {
                        if (this.$refs[key][0] !== undefined) {
                            this.$refs[key][0].$_closePopover();
                        }
                    }
                }
            }
        },

        /**
         * Handles the functionality for resetting the filter popovers' input values.
         * @param {string} action
         * @param {boolean} excludeCriteria. Default = false.
         */
        handleResettingFilterPopoverInputValues(action, excludeCriteria = false) {
            if (action === 'add' || action === 'all') {
                if (!excludeCriteria) {
                    this.filtering.selectedAddFilterCriteria = '';
                }
                this.resetFilterPopoverInputValues('Add');
            }
            if (action === 'edit') {
                // Only reset values if the currently open popover is being removed or if all values must be reset.
                if (this.filtering.editPopoverCurrentlyOpen !== ''
                    && this.filtering.editPopoverCurrentlyOpen.name !== this.filtering.selectedEditFilterCriteria
                ) {
                    this.resetFilterPopoverInputValues('Edit');
                }
            }
        },

        /**
         * Resets the input values inside the Filter Popover.
         * @param {string} action
         */
        resetFilterPopoverInputValues(action) {
            this.filtering[this.selectedFilter(action, 'FilterOperator')] = '';
            this.filtering[this.selectedFilter(action, 'FilterValue')] = '';
            this.filtering[this.selectedFilter(action, 'FilterValueMoney')] = '';
            this.filtering[this.selectedFilter(action, 'FilterValueNumber')] = '';
            this.filtering[this.selectedFilter(action, 'FilterValueDateFrom')] = '';
            this.filtering[this.selectedFilter(action, 'FilterValueDateTo')] = '';
        },

        /**
         * Removes filters from the table.
         */
        removeFilter(filter) {
            // Delete filter.
            const indexToRemove = this.filtering.edit.map(object => object.columnKey).indexOf(filter.columnKey);
            this.filtering.edit.splice(indexToRemove, 1);

            // Clear tracking of currently opened Edit Filter popover.
            if (this.filtering.selectedEditFilterCriteria !== this.filtering.editPopoverCurrentlyOpen.name) {
                this.filtering.editPopoverCurrentlyOpen = '';
            }

            this.updateTable();

            // Ensure Add Filter button toggle is inactive.
            this.setInactiveToggleForFilterPopoverSourceElement('addFilterButton');
        },

        /**
         * Gets the label for the Edit Filter Tag.
         */
        getEditFilterTagLabel(filter) {
            let filterColumnKey = filter.columnKey;
            let filterName = filter.name;
            let pluralName = filter.pluralName;
            let filterOperator = filter.operator;
            let filterValue = filter.value;

            let type = 'string';
            this.columns.forEach((column) => {
                if (column['key'] === filterColumnKey) {
                    type = this.getColumnType(column);
                }
            });

            // String or Array Types.
            if (type === 'string' || type === 'array') {
                let actionVerbiage = '';
                if (filterOperator === 'notEqualTo' || filterOperator === 'doesntContain') {
                    actionVerbiage = 'Excluding ';
                }

                if (filterValue.length > 1) {
                    if (pluralName !== undefined) {
                        filterName = pluralName;
                    }

                    if (filterValue.length >= 4) {
                        return actionVerbiage + filterValue.length + ' ' + filterName;
                    }
                    return filterName + ': ' + actionVerbiage + filterValue.join(', ');
                }
                return filterName + ': ' + actionVerbiage + filterValue;
            }

            // Number & Money Types.
            let operator = 'greaterThan';
            if (type === 'number' || type === 'money') {
                if (type === 'number') {
                    filterValue = filterValue.toString();
                }

                if (operator === filterOperator) {
                    return filterName + ' > ' + filterValue;
                }
                return filterName + ' < ' + filterValue;
            }

            // Date Types.
            if (type === 'date') {
                return filterName + ': ' + filterValue[0] + ' - ' + filterValue[1];
            }
        },

        /**
         * Applies the selected filters to the table.
         */
        filterTable() {
            if (!this.filtering.edit.length || this.isServerSide) return;

            let filterObjects = {};
            if (this.filtering.edit.length > 0) {
                this.filtering.edit.forEach(function(column) {
                    filterObjects[column.columnKey] = column;
                });
            }

            let filteredRows = []; // Filtered rows that will be displayed.
            let filterValues = []; // To be filled with strings of "criteria-operator-values-type".
            let columns = this.columns;

            this.rows.forEach((row) => {
                for (const [columnKey, filter] of Object.entries(filterObjects)) {
                    let type = 'string';
                    columns.forEach((column) => {
                        if (column['key'] === columnKey) {
                            type = this.getColumnType(column);
                        }
                    });

                    // Collect all criteria-operator-values-type that need to be filtered.
                    let filterString = getFilterString(columnKey, type, filter);
                    if (filterValues.indexOf(filterString) === -1) filterValues.push(filterString);
                }

                let filterCount = this.getFilterCount(filterValues, row);
                if (filterCount === filterValues.length) {
                    // Display rows that pass the filter values.
                    if (filteredRows.indexOf(row) === -1) filteredRows.push(row);
                }
            });

            // Executes search in case a search term was entered. Otherwise, this execution will return every row in the table.
            let searchedRows = this.executeSearch();
            let finalFilteredRows = getFinalFilteredRows(filteredRows, searchedRows);

            // Ensure the pages are sorted correctly.
            this.setPages(finalFilteredRows);

            // Reset filter values.
            this.handleResettingFilterPopoverInputValues('all');

            /************************************
            *       filterTable() Methods       *
            ************************************/
            /**
             * Gets the filter string that needs to be filtered.
             * @param {string} columnKey
             * @param {string} type
             * @param {{}} filter
             * @returns {string} Will be in "criteria-operator-values-type" format.
             */
            function getFilterString(columnKey, type, filter) {
                // Get filterOperator value.
                let filterOperator = filter.operator;
                if (filterOperator === undefined) {
                    // This is a date value.
                    filterOperator = 'between';
                }
                // Collect all criteria-operator-values-type that need to be filtered.
                return columnKey + '-' + filterOperator + '-' + filter.value + '-' + type;
            }

            /**
             * Returns the final filtered rows.
             * @returns {[]}
             */
            function getFinalFilteredRows(filteredRows, searchedRows) {
                let finalFilteredRows = [];
                filteredRows.forEach(filteredRow => {
                    searchedRows.forEach(searchedRow => {
                        // Determine final filtered rows by searching for matches between the filteredRows and searchedRows.
                        if (JSON.stringify(filteredRow) === JSON.stringify(searchedRow)) {
                            finalFilteredRows.push(filteredRow);
                        }
                    });
                });
                return finalFilteredRows;
            }
        },

        /**
         * Returns the number of filters that return matching rows.
         * @param {[]} filterValues - The filter values that are comprised like so: "criteria-operator-values-type"
         * @param {[]} row - This "row" array is passed as an argument using a forEach.
         * @returns {number}
         */
        getFilterCount(filterValues, row) {
            let filterCount = 0;
            filterValues.forEach((filter) => {
                const filterSplit = filter.split("-");
                const criteria = filterSplit[0];
                const operator = filterSplit[1];
                let values = filterSplit[2].split(",");
                const type = filterSplit[3];

                // If number or money, change value to Number type & remove special characters.
                let rowColumnKey = row[criteria];
                if (type === 'number' || type === 'money') {
                    values = filterSplit[2];
                    rowColumnKey = this.convertToNumberType(this.removeSpecialChars(rowColumnKey, true));
                    values = this.convertToNumberType(this.removeSpecialChars(values, true));
                }

                // Determine if row should be displayed.
                if (shouldIncludeRow(operator, rowColumnKey, values)) {
                    filterCount++;
                }
            });
            return filterCount;

            /***************************************
            *       getFilterCount() Methods       *
            ***************************************/
            /**
             * Determines whether or not a row should be included in the table.
             */
            function shouldIncludeRow(operator, rowValue, filterValue) {
                let filterValueAmount = 1;
                if (filterValue.length > 1) {
                    filterValueAmount = filterValue.length;
                }

                let shouldIncludeRow = false;
                switch (operator) {
                    case 'equalTo':
                        if (filterValueAmount > 1) {
                            for (let i = 0 ; i < filterValueAmount; i++) {
                                if (rowValue === filterValue[i]) {
                                    shouldIncludeRow = true;
                                }
                            }
                        } else {
                            return rowValue === filterValue[0];
                        }
                        return shouldIncludeRow;
                    case 'notEqualTo':
                        return !(filterValue.indexOf(rowValue) !== -1);
                    case 'greaterThan':
                        return rowValue > filterValue;
                    case 'lessThan':
                        return rowValue < filterValue;
                    case 'between':
                        if (filterValueAmount === 2) {
                            let date1 = filterValue[0].split('/');
                            let date2 = filterValue[1].split('/');
                            let dateToCheck = rowValue.split('/');

                            date1 = new Date(date1[2], date1[0], parseInt(date1[1]) - 1);
                            date2 = new Date(date2[2], date2[0], parseInt(date2[1]) - 1);
                            dateToCheck = new Date(dateToCheck[2], dateToCheck[0], parseInt(dateToCheck[1]) - 1);
                            return (filterValue[0] === filterValue[1]) && (filterValue[0] === dateToCheck) || (dateToCheck >= date1 && dateToCheck <= date2);
                        }
                        return false;
                    case 'contains':
                        if (filterValueAmount === 1) {
                            return rowValue.includes(filterValue[0]);
                        } else if (filterValueAmount > 1) {
                            return rowValue.some((row) => filterValue.indexOf(row) >= 0);
                        }
                        return false;
                    case 'doesntContain':
                        if (filterValueAmount === 1) {
                            return !rowValue.includes(filterValue[0]);
                        } else if (filterValueAmount > 1) {
                            let shouldIncludeRow = true;
                            filterValue.some((filter) => {
                                if (rowValue.includes(filter)) {
                                    shouldIncludeRow = false;
                                }
                            });
                            return shouldIncludeRow;
                        }
                        return false;
                    default:
                        break;
                }
            }
        },

        /**********************************
        *        Validation Methods       *
        **********************************/
        validateFiltersProperty() {
            let hasAllRequiredBaseProperties = true;

            // Require columnKey & name properties for all Filter objects.
            for (let [key, filterObject] of Object.entries(this.filters)) {
                const filterNumber = Number(key) + 1;
                const requiredFilterProperties = ['columnKey', 'name']; // Required Filter properties for non-string type columns.

                requiredFilterProperties.forEach(requiredFilterProperty => {
                    if (!(requiredFilterProperty in filterObject)) {
                        hasAllRequiredBaseProperties = false;
                        console.error("Missing '" + requiredFilterProperty + "' property in Filter object #" + filterNumber + ".");
                    }
                });
            }

            // The name property must match an existing Column name, 1 time.
            for (let [, filterObject] of Object.entries(this.filters)) {
                if (!this.columns.some(column => column.name === filterObject.name)) {
                    console.error("The filter name '" + filterObject.name + "' does not match a Column name. A filter's 'name' property must match its Column's 'name' property.");
                }
            }

            // The columnKey property must match an existing Column columnKey, 1 time.

            // Return console error if column is not filterable.
            for (let [, filterObject] of Object.entries(this.filters)) {
                const column = this.columns.filter(col => (col.filterable === undefined || !col.filterable) && (filterObject.columnKey === col.key));
                if (column.length) {
                    console.error("The " + filterObject.name + " column is not filterable."); return;
                }
            }

            // Require pluralName property for string type columns.
            const stringTypeColumns = this.columns.filter(col => col.filterable !== undefined && col.filterable && (col.type === undefined || col.type === 'string'));
            for (let [, columnObject] of Object.entries(stringTypeColumns)) {
                const stringTypeColumn = this.filters.find(filter => filter.columnKey === columnObject.key || filter.name === columnObject.name);
                if (stringTypeColumn !== undefined) {
                    if (stringTypeColumn.pluralName === undefined) {
                        console.error("Invalid Filters object. The 'pluralName' property is required for column: "+ stringTypeColumn.name); return;
                    }
                } else if (hasAllRequiredBaseProperties) {
                    console.error("Missing a Filter object for column: "+ columnObject.name); return;
                }
            }

            // For Pre-Filtered tables, require the remaining Filter object properties.
            for (let [key, filterObject] of Object.entries(this.filters)) {
                const filterNumber = Number(key) + 1;

                const dateTypeColumns = this.columns.filter(col => col.filterable !== undefined && col.filterable && col.type === 'date' && (col.key === filterObject.columnKey));
                const isDateColumn = dateTypeColumns.length > 0;
                const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
                let isDateProperlyFormatted = false;

                const stringTypeColumns = this.columns.filter(col => col.filterable !== undefined && col.filterable && (col.type === undefined || col.type === 'string') && (col.key === filterObject.columnKey));
                const isStringColumn = stringTypeColumns.length > 0;

                const arrayTypeColumns = this.columns.filter(col => col.filterable !== undefined && col.filterable && (col.type === undefined || col.type === 'array') && (col.key === filterObject.columnKey));
                const isArrayColumn = arrayTypeColumns.length > 0;

                if (hasAllRequiredBaseProperties) {
                    if (isStringColumn && ('value' in filterObject)) {
                        // Accept array of strings for 'value' only.
                        if (typeof filterObject.value !== 'object') {
                            console.error("The 'value' property accepts an array of strings in Filter object #" + filterNumber + ". Example: ['String1', 'String2']"); return;
                        }
                    }

                    if (isDateColumn) {
                        // Do not allow the 'operator' property.
                        if ('operator' in filterObject) {
                            console.error("Date type columns do not accept the 'operator' filter property. Error found in Filter object #" + filterNumber + "."); return;
                        }

                        if ('value' in filterObject) {
                            // Accept array length of 2 for 'value' only.
                            if (filterObject.value.length !== 2) {
                                console.error("The 'value' property accepts an array of strings in Filter object #" + filterNumber + ". Example: ['Date_From', 'Date_To']"); return;
                            }

                            // Dates must be in mm/dd/yyyy format.
                            filterObject.value.forEach(value => {
                                isDateProperlyFormatted = dateRegex.test(value);
                            });
                            if (!isDateProperlyFormatted) {
                                console.error("Dates in 'value' must be in 'mm/dd/yyyy' date format in Filter object #" + filterNumber + "."); return;
                            }
                        }

                    // Else if a column is either a number, money, or array type.
                    } else if (!isStringColumn && !isDateColumn) {
                        // Require both 'operator' and 'value' properties.
                        if (('operator' in filterObject) || ('value' in filterObject)) {
                            if (!('operator' in filterObject) || !('value' in filterObject)) {
                                console.error("Both the 'operator' and 'value' properties are required in Filter object #" + filterNumber + "."); return;
                            }
                        }

                        // If a column is either a number or money type.
                        if (!isArrayColumn) {
                            // Accept string values for 'value' only.
                            if (('value' in filterObject) && typeof filterObject.value !== 'string') {
                                console.error("The 'value' property must be a string value in Filter object #" + filterNumber + "."); return;
                            }
                        }
                    }
                }
            }
        },
    },
};
