<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel :id="idList.label" v-bind="getLabelProps" :for-value="idList.button"/>
        <div v-bind="dropdownSelectBindings">
            <input v-bind="inputBinding"/>
            <component
                :is="(hierarchy === 'input') ? 'button' : 'BrightButton'"
                ref="selectButton"
                v-bind="selectButtonBindings"
                @click="handleSelectButtonClick()"
                @keydown.self="handleSelectButtonKeyDownEvent($event)"
            >
                <ul v-if="shouldShowTagList" v-bind="tagListBindings">
                    <li v-for="(selectedOption, index) in selectedOptionList" :key="'Tag-' + selectedOption.label + '-' + index">
                        <BrightTag
                            :ref="'Tag-' + selectedOption.id"
                            v-bind="getTagIteratorBindings(selectedOption)"
                            @tag:remove="handleTagRemove($event)"
                            @click.stop="handleTagSelect($event)"
                            @keydown="handleTagKeyDownEvent($event)"
                        />
                    </li>
                </ul>
                <span v-else-if="shouldShowMultipleTruncation">{{ multipleTruncationLabel }}</span>
                <span v-else>{{ getSelectButtonLabel }}</span>
                <span v-if="!hideArrow">&nbsp;</span><BrightIcon v-if="!hideArrow" v-bind="caretIconBindings"/>
            </component>
            <BrightCard ref="dropdownMenu" v-bind="menuBindings">
                <div v-bind="searchInputContainingBindings">
                    <BrightInputText
                        ref="searchbox"
                        v-bind="searchInputBindings"
                        v-model="searchInputValue"
                        @keydown="handleSearchBoxKeyDownEvent($event)"
                    />
                </div>
                <ul v-if="displayedOptionListHasAtLeastOneItem()" v-bind="optionListContainerBindings">
                    <li v-if="showSelectAllOption" data-iterator-class="BaseSelectOption">
                        <BaseSelectOption
                            ref="selectAllButton"
                            v-bind="{
                                optionData: {
                                    id: idList.selectAll,
                                    label: 'Select All',
                                    value: 'BrightSelectAll',
                                },
                            }"
                            @option:event="handleSelectAllEvent($event)"
                        />
                    </li>
                    <li v-else-if="showUnselectAllOption" data-iterator-class="BaseSelectOption">
                        <BaseSelectOption
                            ref="unselectAllButton"
                            v-bind="{
                                optionData: {
                                    id: idList.unselectAll,
                                    label: 'Unselect All',
                                    value: 'BrightUnselectAll',
                                },
                            }"
                            @option:event="handleUnselectAllEvent($event)"
                        />
                    </li>
                    <li v-for="(item, index) in displayedOptionList" :key="item.label + '-' + index" :data-iterator-class="getOptionIteratorComponent(item)">
                        <component
                            :is="getOptionIteratorComponent(item)"
                            :ref="item.id"
                            v-bind="getOptionIteratorBindings(item)"
                            @option:event="handleOptionEvent($event)"
                        >
                            <ul v-if="item.options !== undefined">
                                <li v-for="(optionItem, optionIndex) in item.options" :key="item.label + '-' + optionIndex">
                                    <BaseSelectOption
                                        :ref="optionItem.id"
                                        v-bind="getOptionIteratorBindings(optionItem)"
                                        @option:event="handleOptionEvent($event)"
                                    />
                                </li>
                            </ul>
                        </component>
                    </li>
                </ul>
                <ul v-else-if="isSearching" v-bind="optionListContainerBindings">
                    <li>
                        <BaseSelectOptionGroup label="Search Results">
                            <BaseSelectOption :option-data="{ value: 'noResults', label: 'No match found', icon: 'search' }">
                            </BaseSelectOption>
                        </BaseSelectOptionGroup>
                    </li>
                </ul>
            </BrightCard>
        </div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { nextTick } from "vue";
/* Components */
import BaseSelectOptionGroup from "./base/BaseSelectOptionGroup.vue";
import BaseSelectOption from "./base/BaseSelectOption.vue";
import BrightCard from "Bright/components/layout-library/card/BrightCard.vue";
import BrightForm from "Bright/components/input-library/form/BrightForm.vue";
import BrightInputText from "Bright/components/input-library/text/BrightInputText.vue";
import BrightTag from "Bright/components/core-library/tag/BrightTag.vue";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";

/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { BrightDropdownCommonPropsMixin } from "Bright/mixins/inputs/BrightDropdownCommonPropsMixin";

/* Functions */
import _cloneDeep from "lodash/cloneDeep";

/* Constants */
const LABEL_EXACT_MATCH_WEIGHT = 100;
const LABEL_BEGINNING_MATCH_WEIGHT = 5;
const LABEL_CENTER_MATCH_WEIGHT = 2;
const TAG_EXACT_MATCH_WEIGHT = 51;
const TAG_BEGINNING_MATCH_WEIGHT = 3;
const TAG_CENTER_MATCH_WEIGHT = 1;

export default {
    name: "BrightDropdownSelect",
    components: {
        BaseSelectOptionGroup,
        BaseSelectOption,
        BrightCard,
        BrightForm,
        BrightInputText,
        BrightTag,
        BrightButton,
        BrightIcon,
    },
    mixins: [BrightInputMixin, BrightDropdownCommonPropsMixin],
    inheritAttrs: false,
    props: {
        options: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    emits: [
        'option:selected',
        'option:unselected',
        'menu:opened',
        'menu:closed',
    ],
    data() {
        return {
            idList: {
                button: this.id + '-Button',
                label: this.id + '-Label',
                listbox: this.id + '-Listbox',
                searchInput: this.id + '-SearchInput',
                selectAll: this.id + '-SelectAll',
                unselectAll: this.id + '-UnselectAll',
            },
            animation: {
                dropIn: false,
                dropOut: false,
            },
            state: {
                isExpanded: false, // Whether or not the Listbox/Menu is shown on the screen
                isNavigatingTags: false,
                currentTagDescendantID: '', // The current active descendant (tag) of the Multi-Select button (only applicable for Multi-Select; Single-Select does not use this)
                currentListboxDescendantID: '', // The current active descendant (searchbox or option) of the Listbox.
            },
            userStartedSearching: false,
            searchInputValue: '',
            selectedOptionList: [],
            tagDescendantList: [], // A list of all tag descendants (i.e. the Tag itself and its remove button)
            processedOptionsValue: [], // The processed form of the `options` prop. Contains some extra metadata. Should be READ-ONLY.
            optionData: [], // An array of objects that contain Option data. Use this to easily reference Options.
            numberOfOptionsThatAreNotDisabled: 0, // Exactly what it says. This is used in the Select All feature to decide whether to select or unselect all.
        };
    },
    computed: {
        /**
             * State
             */
        isSingle() {
            return !this.multiple;
        },
        isSearching() {
            return this.searchInputValue.length > 0;
        },
        userCanSearch() {
            return (this.searchable || this.userStartedSearching);
        },
        showSelectAllOption() {
            return !this.isSearching
                    && this.multiple
                    && this.multipleSelectAll
                    && this.selectedOptionList.length < this.numberOfOptionsThatAreNotDisabled;
        },
        showUnselectAllOption() {
            return !this.isSearching
                    && this.multiple
                    && this.multipleSelectAll
                    && this.selectedOptionList.length === this.numberOfOptionsThatAreNotDisabled;
        },
        /**
         * @return Array
         */
        displayedOptionList() {
            if (this.userCanSearch && this.searchInputValue.length) {

                const searchTerms = this.searchInputValue.trim().toLowerCase().split(' ');

                let wrappedOptions = [];

                this.optionData.forEach((option) => {
                    let points = 0;
                    const label = option.label.toLowerCase();

                    searchTerms.forEach(searchTerm => {
                        const indexOfMatch = label.indexOf(searchTerm);
                        if (indexOfMatch === 0) {
                            if (searchTerm === label) {
                                points += LABEL_EXACT_MATCH_WEIGHT;
                            } else {
                                points += LABEL_BEGINNING_MATCH_WEIGHT;
                            }
                        } else if (indexOfMatch > 0) {
                            points += LABEL_CENTER_MATCH_WEIGHT;
                        }
                    });

                    if (option?.searchTags) {
                        searchTerms.forEach(searchTerm => {
                            option.searchTags.forEach(searchTag => {
                                searchTag = searchTag.toLowerCase();
                                const indexOfMatch = searchTag.indexOf(searchTerm);
                                if (indexOfMatch === 0) {
                                    if (searchTerm === searchTag) {
                                        points += TAG_EXACT_MATCH_WEIGHT;
                                    } else {
                                        points += TAG_BEGINNING_MATCH_WEIGHT;
                                    }
                                } else if (indexOfMatch > 0) {
                                    points += TAG_CENTER_MATCH_WEIGHT;
                                }
                            });
                        });
                    }

                    if (points) {
                        wrappedOptions.push({
                            option: option,
                            points: points,
                        });
                    }
                });

                let searchResults = wrappedOptions
                    .sort((a, b) => b.points - a.points)
                    .map(prioritizedOption => prioritizedOption.option);

                return [{
                    label: 'Search Results',
                    options: searchResults,
                }];
            } else {
                return this.processedOptionsValue;
            }
        },

        /**
             * Bindings
             */
        dropdownSelectBindings() {
            return {
                ...{
                    class: this.mergeClassObjectWithAttributeClass({
                        'BrightDropdownSelect': true,
                    }),
                },
            };
        },
        inputBinding() {
            return {
                ...this.getBaseInputProps,
                ...{
                    type: 'hidden',
                    value: this.dropdownInputValue,
                },
                ...this.$attrs,
            };
        },
        selectButtonBindings() {
            let selectButtonBindings = {
                id: this.idList.button,
                type: 'button',
                name: this.idList.button,
                'aria-labelledby': this.idList.label,
                'aria-haspopup': 'listbox',
                'aria-owns': this.idList.listbox,
                'aria-expanded': this.state.isExpanded,
                disabled: this.disabled,
                required: true,
                tabindex: this.tabindex,
                'aria-activedescendant': (this.state.isNavigatingTags) ? this.state.currentTagDescendantID : null,
            };

            if (this.hierarchy !== 'input') {
                selectButtonBindings.use = this.hierarchy;
                selectButtonBindings.variant = this.variant;
                selectButtonBindings.icon = this.icon;
                selectButtonBindings.iconPosition = this.iconPosition;
                selectButtonBindings.size = this.size;
                selectButtonBindings.rounded = this.rounded;
                selectButtonBindings.class = {
                    'BrightDropdownSelect__SelectButton': true,
                    'rounded-full': this.rounded,
                    'w-full': this.buttonFullWidth,

                    'BrightDropdownSelect__SelectButton__validationType--error': this.validationType === 'error',
                    'BrightDropdownSelect__SelectButton__validationType--success': this.validationType === 'success',
                };
            } else {
                selectButtonBindings.class = {
                    'BrightDropdownSelect__SelectButton': true,
                    'w-full': this.buttonFullWidth,

                    'BrightDropdownSelect__SelectButton--rounded': this.rounded,

                    'BrightDropdownSelect__SelectButton__size--large': this.size === 'large',
                    'BrightDropdownSelect__SelectButton__size--medium': (this.size !== 'large' && this.size !== 'small'),
                    'BrightDropdownSelect__SelectButton__size--small': this.size === 'small',

                    'BrightDropdownSelect__SelectButton__validationType--none': (this.validationType !== 'error' && this.validationType !== 'success'),
                    'BrightDropdownSelect__SelectButton__validationType--error': this.validationType === 'error',
                    'BrightDropdownSelect__SelectButton__validationType--success': this.validationType === 'success',
                };
            }

            return selectButtonBindings;
        },
        dropdownInputValue() {
            return this.$_getCurrentlySelectedOptions();
        },
        shouldShowTagList() {
            return this.multiple && !this.multipleItemTruncation && this.atLeastOneOptionIsSelected() && this.hierarchy === 'input';
        },
        shouldShowMultipleTruncation() {
            return this.multiple && (this.multipleItemTruncation || this.hierarchy !== 'input') && this.atLeastOneOptionIsSelected();
        },
        multipleTruncationLabel() {
            if (this.selectedOptionList.length > 1) {
                return this.selectedOptionList.length + " selected";
            } else {
                return this.selectedOptionList[0].label;
            }
        },
        getSelectButtonLabel() {
            if (this.isSingle && this.atLeastOneOptionIsSelected() && !this.dummy) {
                return this.selectedOptionList[0].label;
            } else {
                return this.placeholder;
            }
        },
        tagListBindings() {
            return {
                class: {
                    'BrightDropdownSelect__SelectButton__TagList': true,
                },
            };
        },
        caretIconBindings() {
            let caretIconBindings = {
                use: 'arrow_drop_down',
            };

            if (this.hierarchy === 'input') {
                caretIconBindings.class = {
                    'BrightDropdownSelect__SelectButton__CaretIcon': true,
                    'BrightDropdownSelect__SelectButton__CaretIcon__size--large': this.size === 'large',
                    'BrightDropdownSelect__SelectButton__CaretIcon__size--medium': this.size === 'medium',
                    'BrightDropdownSelect__SelectButton__CaretIcon__size--small': this.size === 'small',
                };
            } else {
                caretIconBindings.class = {
                    'BrightButtonIcon ml-auto': true,

                    'BrightButtonIcon__size--large': this.size === 'large',
                    'BrightButtonIcon__size--medium': this.size === 'medium',
                    'BrightButtonIcon__size--small': this.size === 'small',

                    'cursor-not-allowed': this.disabled,

                    'BrightButtonIcon__size--large--postfix': this.size === 'large' && this.iconPosition === 'postfix',
                    'BrightButtonIcon__size--medium--postfix': this.size === 'medium' && this.iconPosition === 'postfix',
                    'BrightButtonIcon__size--small--postfix': this.size === 'small' && this.iconPosition === 'postfix',
                };
                caretIconBindings.style = 'font-size: 22px; line-height: 0.9;';
            }

            return caretIconBindings;
        },
        menuBindings() {
            return {
                id: this.idList.listbox,
                class: {
                    'BrightDropdownSelect__Menu': true,
                    'hidden': !this.state.isExpanded,
                    'w-full': this.menuFullWidth,
                    'animation__dropdown--in': this.animation.dropIn,
                    'animation__dropdown--out': this.animation.dropOut,
                },
                raised: true,
                role: 'listbox',
                // eslint-disable-next-line no-nested-ternary
                'aria-activedescendant': (this.isSearching) ? this.idList.searchInput : (this.state.isExpanded) ? this.state.currentListboxDescendantID : null,
                'aria-multiselectable': this.multiple,
                'aria-labelledby': this.idList.label,
            };
        },
        searchInputContainingBindings() {
            return {
                class: {
                    'BrightDropdownSelect__Menu__SearchInputContainer': true,
                    'hidden': !this.userCanSearch,
                },
            };
        },
        searchInputBindings() {
            return {
                id: this.idList.searchInput,
                class: 'BrightDropdownSelect__Menu__SearchInputContainer__Input',
                label: 'Search',
                placeholder: 'Search',
                role: 'searchbox',
                tabindex: -1,
                autocomplete: 'new-password',
                'aria-controls': this.idList.listbox,
                'aria-disabled': !this.userCanSearch,
                'aria-labelledby': this.idList.label,
            };
        },
        optionListContainerBindings() {
            return {
                class: {
                    'BrightDropdownSelect__Menu__OptionListContainer': true,
                },
            };
        },
    },
    watch: {
        optionData: {
            handler: function() {
                this.processOptionsArray(this.processedOptionsValue, true);
            },
            deep: true,
        },
        options: {
            handler: function(newValue) {
                let processedOptions = this.processOptionsArray(newValue, false);
                this.state.currentTagDescendantID = processedOptions.currentTagDescendantID;
                this.state.currentListboxDescendantID = processedOptions.currentListboxDescendantID;
                this.selectedOptionList = processedOptions.selectedOptionList;
                this.tagDescendantList = processedOptions.tagDescendantList;
                this.processedOptionsValue = processedOptions.processedOptionsValue;
                this.optionData = processedOptions.optionData;
                this.numberOfOptionsThatAreNotDisabled = processedOptions.numberOfOptionsThatAreNotDisabled;
            },
            deep: true,
        },
        modelValue: {
            deep: true,
            handler: function(newValue) {
                if (typeof newValue === 'undefined') return;
                if (this.isSingle) {
                    // newValue is a string here.

                    // If empty string, then unselect the current option if it exists.
                    if (newValue.length < 1) {
                        if (this.atLeastOneOptionIsSelected()) {
                            this.unselectOption(this.getFirstSelectedOption());
                        }
                        return;
                    }

                    // If the currently selected option is the newValue, then don't do anything.
                    if (this.atLeastOneOptionIsSelected() && this.getFirstSelectedOption().value === newValue) {
                        return;
                    }

                    let newlySelectedOption = this.getOptionInDataByValue(newValue);
                    if (newlySelectedOption !== null) {
                        this.selectOption(newlySelectedOption);
                    } else {
                        // Correct the data-binding by emitting the input again if value isn't found.
                        this.emitInputEvent();
                    }
                } else {
                    // newValue is an array here.

                    // Sanitize newValue for invalid options that don't exist
                    let sanitizedNewValue = [];
                    for (let i = 0; i < newValue.length; i++) {
                        if (this.getOptionInDataByValue(newValue[i]) !== null) {
                            sanitizedNewValue.push(newValue[i]);
                        }
                    }

                    // If empty array, then unselect the current options if they exist.
                    if (sanitizedNewValue.length < 1) {
                        if (this.atLeastOneOptionIsSelected()) {
                            this.$_unselectAllOptions();
                        }
                        return;
                    }

                    const currentlySelectedOptions = this.$_getCurrentlySelectedOptions();

                    // If the currently selected options are EXACTLY the sanitizedNewValue items, then don't do anything.
                    if (this.atLeastOneOptionIsSelected() && currentlySelectedOptions.length === sanitizedNewValue.length) {
                        let exactMatch = true;
                        for (let a = 0; a < currentlySelectedOptions.length; a++) {
                            let innerMatch = false;
                            for (let b = 0; b < sanitizedNewValue.length; b++) {
                                if (currentlySelectedOptions[a] === sanitizedNewValue[b]) {
                                    innerMatch = true;
                                    break;
                                }
                            }
                            if (innerMatch === false) {
                                exactMatch = false;
                                break;
                            }
                        }

                        if (exactMatch) {
                            if (newValue.length !== sanitizedNewValue.length) {
                                // Correct the data-binding by emitting the input again if value isn't found.
                                this.emitInputEvent();
                            }
                            return;
                        }
                    }

                    // Cleanup and unselect anything that wasn't in the sanitizedNewValue array
                    if (this.atLeastOneOptionIsSelected()) {
                        let currentlySelectedOptions = this.$_getCurrentlySelectedOptions();
                        for (let i = 0; i < currentlySelectedOptions.length; i++) {
                            if (sanitizedNewValue.findIndex(option => option === currentlySelectedOptions[i]) === -1) {
                                let toBeRemovedOption = this.getOptionInDataByValue(currentlySelectedOptions[i]);
                                this.unselectOption(toBeRemovedOption);
                            }
                        }
                    }

                    // Select
                    for (let i = 0; i < sanitizedNewValue.length; i++) {
                        if (this.checkIfOptionIsSelectedByValue(sanitizedNewValue[i]) === false) {
                            let newlySelectedOption = this.getOptionInDataByValue(sanitizedNewValue[i]);
                            this.selectOption(newlySelectedOption);
                        }
                    }
                }
            },
        },
    },
    created() {
        let processedOptions = this.processOptionsArray(this.options, false);
        this.state.currentTagDescendantID = processedOptions.currentTagDescendantID;
        this.state.currentListboxDescendantID = processedOptions.currentListboxDescendantID;
        this.selectedOptionList = processedOptions.selectedOptionList;
        this.tagDescendantList = processedOptions.tagDescendantList;
        this.processedOptionsValue = processedOptions.processedOptionsValue;
        this.optionData = processedOptions.optionData;
        this.numberOfOptionsThatAreNotDisabled = processedOptions.numberOfOptionsThatAreNotDisabled;
    },
    mounted() {
        this.emitInputEvent();
        window.addEventListener('keydown', this.handleEscapeKeyDown);
        window.addEventListener('click', this.handleExternalClick);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleEscapeKeyDown);
        window.removeEventListener('click', this.handleExternalClick);
    },
    methods: {
        /**
             * Public Methods
             */

        /**
             * Gets the currently selected option(s).
             *
             * If this is a Single-Select Dropdown, then it will return a string containing
             * the value of the currently selected option (if one is selected). If an option
             * is NOT selected, then it will return an empty string.
             *
             * If this is a Multi-Select Dropdown, then it will return an array containing
             * the string values of the currently selected options (if any are selected). If
             * an option IS NOT selected, then it will return an empty array.
             *
             * @public
             * @return {String|Array}
             */
        $_getCurrentlySelectedOptions() {
            if (this.isSingle) {
                if (this.atLeastOneOptionIsSelected()) {
                    return this.selectedOptionList[0].value;
                } else {
                    return '';
                }
            } else {
                let currentlySelectedOptions = [];
                for (let i = 0; i < this.selectedOptionList.length; i++) {
                    currentlySelectedOptions.push(this.selectedOptionList[i].value);
                }
                return currentlySelectedOptions;
            }
        },

        /**
             * Selects all possible options that are NOT disabled and NOT already selected.
             * NOTE: Will only work if this is a multi-select dropdown.
             *
             * @public
             * @return {Boolean} True if this is a multi-select dropdown. False if this is a single-select dropdown.
             */
        $_selectAllPossibleOptions() {
            if (this.isSingle) {
                return false;
            }
            for (let i = 0; i < this.optionData.length; i++) {
                let option = this.optionData[i];
                if (!option.disabled && !this.selectedOptionList.includes(option)) {
                    this.selectOption(this.optionData[i], true);
                }
            }
            this.emitInputEvent();
            return true;
        },

        /**
             * Unselects all currently selected options.
             * NOTE: If this is used in a single-select dropdown, it will unselect the currently selected option.
             *
             * @return {Boolean} True if at least one option was unselected. False if no option was unselected.
             */
        $_unselectAllOptions() {
            if (this.atLeastOneOptionIsSelected()) {
                if (this.isSingle) {
                    this.unselectCurrentOption();
                } else {
                    for (let i = this.selectedOptionList.length - 1; i > -1; i--) {
                        this.unselectOption(this.selectedOptionList[i], false, true);
                    }
                    this.emitInputEvent();
                }
                return true;
            }
            return false;
        },

        /**
             * Toggles the selected status of an option by its value (e.g. if it's selected, it will be unselected).
             *
             * @return {Boolean} True if the option exists and was toggled. False otherwise.
             */
        $_toggleOptionByValue(value) {
            const optionIndex = this.optionData.findIndex(option => option.value === value);
            if (optionIndex > -1) {
                let option = this.optionData[optionIndex];
                if (this.multiple) {
                    this.toggleMultiSelectOption(option);
                } else if (!this.selectedOptionList.includes(option)) {
                    this.selectOption(option);
                } else {
                    this.unselectOption(option, true);
                }
                return true;
            }
            return false;
        },

        /**
             * Selects an option by value.
             *
             * @return {Boolean} True if the option was selected. False if the option was already selected or it doesn't exist.
             */
        $_selectOptionByValue(value) {
            const optionIndex = this.optionData.findIndex(option => option.value === value);
            if (optionIndex > -1) {
                let option = this.optionData[optionIndex];
                if (!this.selectedOptionList.includes(option)) {
                    this.selectOption(option);
                    return true;
                }
            }
            return false;
        },

        /**
             * Unselects an option by value.
             *
             * @return {Boolean} True if the option was unselected. False if the option was already unselected or it doesn't exist.
             */
        $_unselectOptionByValue(value) {
            const optionIndex = this.optionData.findIndex(option => option.value === value);
            if (optionIndex > -1) {
                let option = this.optionData[optionIndex];
                if (this.selectedOptionList.includes(option)) {
                    this.unselectOption(option, true);
                    return true;
                }
            }
            return false;
        },

        /**
             * Opens the Dropdown Menu.
             */
        $_openDropdownMenu() {
            nextTick(() => {
                this.openDropdownMenu();
            });
        },

        /**
             * Closes the Dropdown Menu.
             */
        $_closeDropdownMenu() {
            nextTick(() => {
                this.closeDropdownMenu();
            });
        },

        /**
             * Toggles the Dropdown Menu (e.g. if it's closed, it will open).
             */
        $_toggleDropdownMenu() {
            nextTick(() => {
                if (this.state.isExpanded) {
                    this.closeDropdownMenu();
                } else {
                    this.openDropdownMenu();
                }
            });
        },

        /**
             * Event Methods
             */
        emitInputEvent() {
            this.$emit('update:modelValue', this.$_getCurrentlySelectedOptions());
        },
        emitOptionSelectedEvent(option) {
            this.$emit('option:selected', option.value);
        },
        emitOptionUnselectedEvent(option) {
            this.$emit('option:unselected', option.value);
        },
        emitMenuOpenedEvent() {
            this.$emit('menu:opened');
        },
        emitMenuClosedEvent() {
            this.$emit('menu:closed');
        },

        /**
             * Initialization Methods
             */

        /*
             *  Processes the raw data from the `option` prop and returns meaningful data for this component.
             */
        processOptionsArray(rawOptionData, useNewOptionData) {
            const componentValue = this.modelValue;
            const componentID = this.id;
            const componentMultiple = this.multiple;
            const getOptionInDataByID = this.getOptionInDataByID;

            let optionData = [];
            let processedOptionsValue = _cloneDeep(rawOptionData);

            let numberOfOptionsThatAreNotDisabled = 0;

            let currentTagDescendantID = null;
            let tagDescendantList = [];

            let currentListboxDescendantID = null;
            let selectedOptionList = [];

            function optionIsSelected(option) {
                if (componentValue === undefined) return false;
                if (!componentMultiple) {
                    return componentValue === option.value;
                } else {
                    if (Array.isArray(componentValue)) {
                        return componentValue.includes(option.value);
                    }
                    return false;
                }
            }

            function processOption(option) {
                const newID = componentID + '-' + optionData.length.toString();
                option.id = newID;
                if (useNewOptionData) {
                    option.selected = getOptionInDataByID(newID).selected;
                } else {
                    if (option.selected === undefined) {
                        option.selected = false;
                    }
                    if (option.disabled === undefined) {
                        option.disabled = false;
                    }
                }
                optionData.push(option);

                if (option.selected === true || optionIsSelected(option)) {
                    selectOption(option);
                }

                if (option.disabled === false) {
                    numberOfOptionsThatAreNotDisabled++;
                }

                function selectOption(selectedOption) {
                    if (currentListboxDescendantID === null) {
                        currentListboxDescendantID = newID;
                    }
                    if (componentMultiple) {
                        tagDescendantList.push('Tag-' + newID);
                        tagDescendantList.push('RemoveTag-' + newID);
                        if (currentTagDescendantID === null) {
                            currentTagDescendantID = 'Tag-' + newID;
                        }
                        selectedOptionList.push(selectedOption);
                    } else {
                        selectedOptionList = [selectedOption];
                    }
                }
            }

            for (let a = 0; a < processedOptionsValue.length; a++) {
                if (processedOptionsValue[a].options !== undefined) {
                    for (let b = 0; b < processedOptionsValue[a].options.length; b++) {
                        processedOptionsValue[a].options[b].isInMultiSelectDropdown = this.multiple;
                        processOption(processedOptionsValue[a].options[b]);
                    }
                } else {
                    processedOptionsValue[a].isInMultiSelectDropdown = this.multiple;
                    processOption(processedOptionsValue[a]);
                }
            }

            return {
                optionData: optionData,
                processedOptionsValue: processedOptionsValue,
                currentTagDescendantID: currentTagDescendantID,
                tagDescendantList: tagDescendantList,
                currentListboxDescendantID: currentListboxDescendantID,
                selectedOptionList: selectedOptionList,
                numberOfOptionsThatAreNotDisabled: numberOfOptionsThatAreNotDisabled,
            };
        },

        /*
             *  Returns the component name of an item based on the presence of the options property.
             */
        getOptionIteratorComponent(item) {
            return (item.options !== undefined) ? 'BaseSelectOptionGroup' : 'BaseSelectOption';
        },

        /*
             *  Returns the object bindings that are required in the <template>'s double for-loop.
             */
        getOptionIteratorBindings(item) {
            if (item.options !== undefined) {
                return { // BaseSelectOptionGroup
                    label: item.label,
                    items: item.options,
                };
            } else { // BaseSelectOption
                let optionData = item;
                if (this.selectedOptionList.findIndex(selectedOption => selectedOption.value === item.value) !== -1) {
                    optionData.selected = true;
                } else {
                    optionData.selected = false;
                }

                return {
                    optionData: optionData,
                };
            }
        },
        getTagIteratorBindings(tag) {
            return {
                id: 'Tag-' + tag.id,
                class: 'BrightDropdownSelect__SelectButton__TagList__Tag',
                label: tag.label,
                removable: true,
                removableElementId: 'RemoveTag-' + tag.id,
                size: this.size,
                tabindex: -1,
            };
        },

        /**
             * Button Methods
             */
        handleSelectButtonKeyDownEvent(event) {
            if (event === undefined) { return; }
            switch (event.key) {
                case 'Tab':
                    this.handleTab();
                    break;
                case 'ArrowUp':
                    if (this.state.isExpanded) {
                        event.preventDefault();
                    }
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.handleButtonDownKey();
                    break;
                case 'ArrowRight':
                    this.handleButtonRightKey();
                    break;
                case 'Backspace':
                case 'Delete':
                    event.preventDefault();
                    this.unselectLastOptionInTagList();
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.handleSelectButton();
                    break;
                default:
                    this.handleButtonGenericKeyDown(event);
                    break;
            }
        },
        focusOnSelectButton() {
            nextTick(() => {
                if (this.hierarchy === 'input') {
                    this.$refs.selectButton.focus();
                } else {
                    this.$refs.selectButton.$el.focus();
                }
            });
        },
        focusOnSelectAllButton() {
            nextTick(() => {
                if (this.showSelectAllOption) {
                    this.$refs.selectAllButton.$el.focus();
                } else if (this.showUnselectAllOption) {
                    this.$refs.unselectAllButton.$el.focus();
                }
            });
        },
        handleButtonDownKey() {
            if (this.userCanSearch) {
                this.focusOnSearchbox();
            } else if (!this.dummy && (this.showSelectAllOption || this.showUnselectAllOption)) {
                this.focusOnSelectAllButton();
            } else {
                this.focusOnOptionList();
            }
        },
        handleButtonRightKey() {
            if (this.multiple && this.tagDescendantListHasAtLeastOneItem()) {
                this.focusOnTagDescendantByID(this.state.currentTagDescendantID);
            }
        },
        handleSelectButtonClick() {
            this.state.isNavigatingTags = false;
            if (this.state.isExpanded) {
                this.closeDropdownMenu();
            } else {
                this.openDropdownMenu();
            }
        },
        handleSelectButton() {
            this.state.isNavigatingTags = false;
            if (this.state.isExpanded) {
                this.closeDropdownMenu();
            } else {
                this.openDropdownMenu();
                this.focusOnOptionList();
            }
        },
        handleButtonGenericKeyDown(event) {
            if (event === undefined) { return; }
            if (event.key.length === 1 && event.key.match(/^[a-z0-9]+$/i)) {
                this.userStartedSearching = true;
                this.focusOnSearchboxAndEnterLetter(event.key);
            }
        },
        handleEscapeKeyDown(event) {
            if (event === undefined) { return; }
            if (event.key === 'Escape' && this.state.isExpanded) {
                this.closeDropdownMenu();
            }
        },
        handleExternalClick(event) {
            if (event === undefined) { return; }
            if (!this.$el.contains(event.target) && this.state.isExpanded) {
                this.closeDropdownMenu(false);
            }
        },
        focusOnOptionList(optionIDToFocusOn) {
            if (this.displayedOptionListHasAtLeastOneItem()) {
                if (optionIDToFocusOn === undefined) {
                    if (this.atLeastOneOptionIsSelected()) {
                        optionIDToFocusOn = this.getIDOfFirstSelectedOption();
                    } else {
                        optionIDToFocusOn = this.getFirstDisplayedOption().id;
                    }
                }
                this.setCurrentFocusedOptionByID(optionIDToFocusOn);
                if (this.isSingle && !this.getCurrentOptionInData().disabled && !this.dummy) {
                    this.selectCurrentOption();
                }
            }
        },
        atLeastOneOptionIsSelected() {
            return this.selectedOptionList.length > 0;
        },
        getFirstSelectedOption() {
            if (this.atLeastOneOptionIsSelected()) {
                return this.selectedOptionList[0];
            }
        },
        getIDOfFirstSelectedOption() {
            if (this.atLeastOneOptionIsSelected()) {
                return this.selectedOptionList[0].id;
            }
        },
        checkIfOptionIsSelectedByValue(value) {
            return this.selectedOptionList.findIndex(option => option.value === value) !== -1;
        },

        /**
             * Dropdown Menu Methods
             */
        openDropdownMenu() {
            if (this.state.isExpanded === false) {
                this.animation.dropIn = true;
                this.state.isExpanded = true;
                let thisComponent = this;
                this.$el.addEventListener('animationend', function handler() {
                    nextTick(() => {
                        if (thisComponent.dropdownMenuIsFullyVisibleOnScreen() === false) {
                            thisComponent.scrollToBottomOfDropdownMenu();
                        }
                    });
                    thisComponent.$el.removeEventListener('animationend', this.handler);
                    thisComponent.animation.dropIn = false;
                });
                thisComponent.emitMenuOpenedEvent();
            }
        },
        closeDropdownMenu(focusOnDropdownMenu) {
            if (focusOnDropdownMenu === undefined) {
                focusOnDropdownMenu = true;
            }

            if (this.state.isExpanded) {
                this.animation.dropOut = true;
                let thisComponent = this;
                if (focusOnDropdownMenu) {
                    thisComponent.focusOnSelectButton();
                }
                this.$el.addEventListener('animationend', function closeHandler() {
                    thisComponent.userStartedSearching = false;
                    thisComponent.state.isExpanded = false;
                    if (thisComponent.searchInputValue.length > 0) {
                        thisComponent.searchInputValue = '';
                    }

                    thisComponent.$el.removeEventListener('animationend', closeHandler);
                    thisComponent.animation.dropOut = false;
                });
                thisComponent.emitMenuClosedEvent();
            }
        },
        dropdownMenuIsFullyVisibleOnScreen() {
            let rect = this.$refs.dropdownMenu.$el.getBoundingClientRect();
            return (rect.top >= 0) && (rect.bottom <= window.innerHeight);
        },
        scrollToBottomOfDropdownMenu() {
            this.$refs.dropdownMenu.$el.scrollIntoView(false);
        },

        /**
             * Search Input Methods
             */
        handleSearchBoxKeyDownEvent(event) {
            if (event === undefined) { return; }
            switch (event.key) {
                case 'Tab':
                    this.handleTab();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.focusOnSelectButton();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (this.showSelectAllOption || this.showUnselectAllOption) {
                        this.focusOnSelectAllButton();
                    } else {
                        this.focusOnFirstOptionInDisplayedList();
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    this.handleSearchEnter();
                    break;
                default:
                    break;
            }
        },
        focusOnSearchbox() {
            this.state.isNavigatingTags = false;
            this.openDropdownMenu();
            nextTick(() => {
                this.$refs.searchbox.focus();
            });
        },
        handleSearchEnter() {
            if (this.displayedOptionListHasAtLeastOneItem()) {
                const firstDisplayedSearchResult = this.getFirstDisplayedOption();
                if (!firstDisplayedSearchResult.disabled) {
                    if (this.multiple) {
                        this.toggleMultiSelectOption(firstDisplayedSearchResult);
                    } else {
                        this.selectOption(firstDisplayedSearchResult);
                        this.closeDropdownMenu();
                    }
                }
            }
        },

        /**
             * Option Methods
             */
        handleOptionEvent(event) {
            if (event === undefined || this.getIndexOfOptionInDataByID(event.target.id) === -1) { return; }
            if (event.type === 'click') {
                if (this.dummy) {
                    let optionInData = this.getOptionInDataByID(event.target.id);
                    if (!optionInData.disabled) {
                        this.emitOptionSelectedEvent(optionInData);
                        this.closeDropdownMenu();
                    }
                } else {
                    this.handleOptionClick(event);
                }
            } else if (event.type === 'keydown') {
                this.handleOptionKeyDown(event);
            }
        },
        handleSelectAllEvent(event) {
            if (event === undefined) { return; }
            if (event instanceof MouseEvent) {
                this.$_selectAllPossibleOptions();
            } else if (event.key && (event.key === ' ' || event.key === 'Enter')) {
                event.preventDefault();
                this.$_selectAllPossibleOptions();
                if (event.key === 'Enter') {
                    this.closeDropdownMenu();
                }
            } else {
                this.handleOptionKeyDown(event);
            }
        },
        handleUnselectAllEvent(event) {
            if (event === undefined) { return; }
            if (event instanceof MouseEvent) {
                this.$_unselectAllOptions();
            } else if (event.key && (event.key === ' ' || event.key === 'Enter')) {
                event.preventDefault();
                this.$_unselectAllOptions();
                if (event.key === 'Enter') {
                    this.closeDropdownMenu();
                }
            } else {
                this.handleOptionKeyDown(event);
            }
        },
        handleOptionClick(event) {
            let optionInData = this.getOptionInDataByID(event.target.id);
            if (optionInData.disabled) { return; }

            if (this.multiple) {
                this.setCurrentFocusedOptionByID(optionInData.id);
                this.toggleMultiSelectOption(optionInData);
            } else {
                if (this.state.currentListboxDescendantID !== null) {
                    this.unselectCurrentOption();
                }
                this.setCurrentFocusedOptionByID(optionInData.id);
                this.selectCurrentOption();
                this.closeDropdownMenu();
            }
        },
        handleOptionKeyDown(event) {
            const key = event.key;
            if (key === " ") { // aka Space
                this.handleOptionSpaceKey(event);
            } else if (key === "Enter") {
                this.handleOptionEnterKey(event);
            } else if (key === "ArrowUp" || key === "ArrowDown") {
                this.handleOptionMovement(event);
            } else if (key === "Backspace" || key === "Delete") {
                this.unselectCurrentOption();
            } else if (key === "Tab") {
                this.handleTab();
            } else if (key === "Home") {
                event.preventDefault();
                this.focusOnFirstOptionInDisplayedList();
            } else if (key === "End") {
                event.preventDefault();
                this.focusOnLastOptionInDisplayedList();
            } else {
                this.handleButtonGenericKeyDown(event);
            }
        },
        handleOptionSpaceKey(event) {
            event.preventDefault();
            let optionInData = this.getOptionInDataByID(event.target.id);
            if (optionInData.disabled) { return; }

            if (this.multiple) {
                this.setCurrentFocusedOptionByID(optionInData.id);
                this.toggleMultiSelectOption(optionInData);
            } else {
                this.closeDropdownMenu();
            }
            if (this.dummy) {
                this.emitOptionSelectedEvent(optionInData);
            }
        },
        handleOptionEnterKey(event) {
            event.preventDefault();
            let optionInData = this.getOptionInDataByID(event.target.id);
            if (optionInData.disabled) { return; }

            if (this.multiple) {
                this.setCurrentFocusedOptionByID(optionInData.id);
                if (!optionInData.selected) {
                    this.toggleMultiSelectOption(optionInData);
                }
            }
            if (this.dummy) {
                this.emitOptionSelectedEvent(optionInData);
            }
            this.closeDropdownMenu();
        },
        getCurrentOptionInData() {
            return this.getOptionInDataByID(this.state.currentListboxDescendantID);
        },
        getOptionInDataByID(optionID) {
            const indexOfOptionInData = this.getIndexOfOptionInDataByID(optionID);
            return this.optionData[indexOfOptionInData];
        },
        getOptionInDataByValue(optionValue) {
            const indexOfOptionInData = this.getIndexOfOptionInDataByValue(optionValue);
            if (indexOfOptionInData > -1) {
                return this.optionData[indexOfOptionInData];
            } else {
                return null;
            }
        },
        getIndexOfOptionInDataByID(optionID) {
            return this.optionData.findIndex(option => option.id === optionID);
        },
        getIndexOfOptionInDataByValue(optionValue) {
            return this.optionData.findIndex(option => option.value === optionValue);
        },
        setCurrentFocusedOptionByID(optionID) {
            let focusedItem = document.getElementById(optionID);
            if (focusedItem) {
                this.state.currentListboxDescendantID = optionID;
                this.openDropdownMenu();
                this.state.isNavigatingTags = false;
                nextTick(() => {
                    focusedItem.focus();
                });
            }
        },
        selectOption(option, suppressEvents) {
            const optionDataIndex = this.getIndexOfOptionInDataByID(option.id);

            if (this.isSingle && this.atLeastOneOptionIsSelected()) {
                this.unselectOption(this.getOptionInDataByID(this.getIDOfFirstSelectedOption()));
            }

            this.optionData[optionDataIndex].selected = true;
            let newlySelectedOption = this.getOptionInDataByID(option.id);

            if (suppressEvents !== true) {
                this.emitOptionSelectedEvent(newlySelectedOption);
            }

            if (this.multiple) {
                this.selectedOptionList.push(newlySelectedOption);
                this.addTagToTagDescendantList(newlySelectedOption);
            } else {
                this.selectedOptionList = [newlySelectedOption];
            }

            if (suppressEvents !== true) {
                this.emitInputEvent();
            }
        },
        selectCurrentOption() {
            this.selectOption(this.getCurrentOptionInData());
        },
        toggleMultiSelectOption(option) {
            if (option.selected) {
                this.unselectOption(option);
            } else {
                this.selectOption(option);
            }
        },
        unselectOption(option, isBeingUnselectedFromTag, suppressEvents) {
            const optionID = option.id;
            const optionIndex = this.getIndexOfOptionInDataByID(optionID);

            this.optionData[optionIndex].selected = false;
            option.selected = false;

            if (suppressEvents !== true) {
                this.emitOptionUnselectedEvent(option);
            }

            if (this.multiple) {
                const indexOfOptionInDisplayValues = this.selectedOptionList.findIndex(item => item.id === optionID);
                this.selectedOptionList.splice(indexOfOptionInDisplayValues, 1);
                this.removeTagsAssociatedWithOptionID(optionID, isBeingUnselectedFromTag);
            } else {
                this.selectedOptionList = [];
            }

            if (suppressEvents !== true) {
                this.emitInputEvent();
            }
        },
        removeTagsAssociatedWithOptionID(optionID, isBeingUnselectedFromTag) {
            if (this.tagDescendantListHasAtLeastTwoItems()) {
                const currentTagDescendantIndex = this.getIndexOfDescendantInTagDescendantList('Tag-' + optionID);
                if (this.tagDescendantListHasAtLeastTwoItems()) {
                    let indexToShiftTo = null;

                    if (currentTagDescendantIndex > 0) {
                        indexToShiftTo = currentTagDescendantIndex - 2;
                    } else {
                        indexToShiftTo = currentTagDescendantIndex + 2;
                    }

                    this.state.currentTagDescendantID = this.tagDescendantList[indexToShiftTo];

                    if (isBeingUnselectedFromTag) {
                        this.focusOnTagDescendantByID(this.tagDescendantList[indexToShiftTo]);
                    } else {
                        this.state.currentTagDescendantID = this.tagDescendantList[indexToShiftTo];
                    }
                }
            } else {
                this.state.currentTagDescendantID = null;
                if (isBeingUnselectedFromTag) {
                    this.state.isNavigatingTags = false;
                    this.focusOnSelectButton();
                }
            }
            let indexToRemove = this.tagDescendantList.findIndex(descendant => descendant === 'Tag-' + optionID);
            this.tagDescendantList.splice(indexToRemove, 2);
        },
        unselectLastOptionInTagList() {
            if (this.multiple && this.atLeastOneOptionIsSelected()) {
                let lastOptionInTagList = this.selectedOptionList[this.selectedOptionList.length - 1];
                this.unselectOption(lastOptionInTagList, true);
            }
        },
        unselectCurrentOption() {
            this.unselectOption(this.getCurrentOptionInData(), false);
        },
        addTagToTagDescendantList(option) {
            this.tagDescendantList.push('Tag-' + option.id);
            this.tagDescendantList.push('RemoveTag-' + option.id);
            if (this.state.currentTagDescendantID === null) {
                this.state.currentTagDescendantID = 'Tag-' + option.id;
            }
        },
        handleTab() {
            this.state.isNavigatingTags = false;
            if (this.state.isExpanded) {
                this.closeDropdownMenu();
            }
        },
        handleOptionMovement(event) {
            event.preventDefault();
            const eventOptionID = event.target.id;
            let focusableOptionID = null;

            if (event.key === 'ArrowUp') {
                if (eventOptionID === this.idList.selectAll || eventOptionID === this.idList.unselectAll) {
                    if (this.userCanSearch) {
                        this.focusOnSearchbox();
                    } else {
                        this.focusOnSelectButton();
                    }
                    return;
                }
                focusableOptionID = this.getPreviousFocusableOptionIDRelativeToOptionID(eventOptionID);
            } else if (event.key === 'ArrowDown') {
                focusableOptionID = this.getNextFocusableOptionIDRelativeToOptionID(eventOptionID);
            }

            if (focusableOptionID !== null) { // i.e. ArrowDown
                const focusableOption = this.getOptionInDataByID(focusableOptionID);
                this.setCurrentFocusedOptionByID(focusableOptionID);
                if (this.isSingle && !focusableOption.disabled && !this.dummy) {
                    this.selectCurrentOption();
                }
            } else if (event.key === 'ArrowUp') {
                if ((this.showSelectAllOption || this.showUnselectAllOption) && focusableOptionID === null) {
                    this.focusOnSelectAllButton();
                } else if (this.userCanSearch) {
                    this.focusOnSearchbox();
                } else {
                    this.focusOnSelectButton();
                }
            }
        },
        getPreviousFocusableOptionIDRelativeToOptionID(optionID) {
            const indexOfOptionID = this.getIndexOfOptionInDisplayedOptionList(optionID);
            if (indexOfOptionID > 0) {
                return this.getDisplayedOptionByIndex(indexOfOptionID - 1).id;
            } else {
                return null;
            }
        },
        getNextFocusableOptionIDRelativeToOptionID(optionID) {
            const indexOfOptionID = this.getIndexOfOptionInDisplayedOptionList(optionID);
            if (indexOfOptionID < this.getDisplayedOptionsList().length - 1) {
                return this.getDisplayedOptionByIndex(indexOfOptionID + 1).id;
            } else {
                return null;
            }
        },
        focusOnFirstOptionInDisplayedList() {
            if (this.displayedOptionListHasAtLeastOneItem()) {
                this.setCurrentFocusedOptionByID(this.getFirstDisplayedOption().id);
                if (this.isSingle && !this.getFirstDisplayedOption().disabled && !this.dummy) {
                    this.selectCurrentOption();
                }
            }
        },
        focusOnLastOptionInDisplayedList() {
            if (this.displayedOptionListHasAtLeastOneItem()) {
                this.setCurrentFocusedOptionByID(this.getLastDisplayedOption().id);
                if (this.isSingle && !this.getLastDisplayedOption().disabled && !this.dummy) {
                    this.selectCurrentOption();
                }
            }
        },
        focusOnSearchboxAndEnterLetter(letter) {
            if (this.userCanSearch) {
                this.focusOnSearchbox();
                this.searchInputValue += letter;
                this.searchInputValue = this.searchInputValue.substring(0, this.searchInputValue.length - 1);
            }
        },

        /**
             * Tag Methods
             */
        handleTagKeyDownEvent(event) {
            if (event === undefined) { return; }
            switch (event.key) {
                case 'Tab':
                    this.handleTab();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.state.isNavigatingTags = false;
                    this.focusOnSelectButton();
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.handleButtonDownKey();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.handlePreviousTagDescendant();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.handleNextTagDescendant();
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.handleTagSelect(event);
                    break;
                default:
                    break;
            }
        },
        handleTagSelect(event) {
            if (event === undefined) { return; }
            this.state.currentListboxDescendantID = event.currentTarget.id.substr(4, event.currentTarget.id.length);
            this.state.isNavigatingTags = false;
            this.openDropdownMenu();
            this.focusOnOptionList(this.state.currentListboxDescendantID);
        },
        handleTagRemove(removedTagLabel) {
            let indexOfOptionInDisplayValues = this.selectedOptionList.findIndex(item => item.label === removedTagLabel);
            if (indexOfOptionInDisplayValues > -1) {
                let removedID = this.selectedOptionList[indexOfOptionInDisplayValues].id;
                this.unselectOption(this.getOptionInDataByID(removedID), true);
            }
        },
        focusOnTagDescendantByID(descendantID) {
            let focusedItem = document.getElementById(descendantID);
            if (focusedItem) {
                this.state.isNavigatingTags = true;
                this.state.currentTagDescendantID = descendantID;
                nextTick(() => {
                    focusedItem.focus();
                });
            }
        },
        getTagDescendantByIndex(index) {
            return this.tagDescendantList[index];
        },
        getIndexOfDescendantInTagDescendantList(descendantID) {
            return this.tagDescendantList.findIndex((descendant) => descendant === descendantID);
        },
        tagDescendantListHasAtLeastOneItem() { // "One Item" is really two items in the list. It's the Tag and its Remove Button.
            return this.getTagDescendantByIndex(0) !== undefined && this.getTagDescendantByIndex(1) !== undefined;
        },
        tagDescendantListHasAtLeastTwoItems() { // "One Item" is really two items in the list. It's the Tag and its Remove Button.
            return this.tagDescendantListHasAtLeastOneItem() && this.getTagDescendantByIndex(2) !== undefined && this.getTagDescendantByIndex(3) !== undefined;
        },
        handlePreviousTagDescendant() {
            let currentTagDescendantIndex = this.getIndexOfDescendantInTagDescendantList(this.state.currentTagDescendantID);
            if (currentTagDescendantIndex > 0) {
                this.focusOnTagDescendantByID(this.tagDescendantList[currentTagDescendantIndex - 1]);
            } else {
                this.state.isNavigatingTags = false;
                this.focusOnSelectButton();
            }
        },
        handleNextTagDescendant() {
            let currentTagDescendantIndex = this.getIndexOfDescendantInTagDescendantList(this.state.currentTagDescendantID);
            if (currentTagDescendantIndex < this.tagDescendantList.length - 1) {
                this.focusOnTagDescendantByID(this.tagDescendantList[currentTagDescendantIndex + 1]);
            } else {
                this.state.isNavigatingTags = false;
                this.focusOnSelectButton();
            }
        },

        /**
             * Displayed Option List Methods
             */
        getDisplayedOptionsList() {
            if (this.isSearching) {
                return this.displayedOptionList[0].options;
            } else {
                return this.optionData;
            }
        },
        displayedOptionListHasAtLeastOneItem() {
            return this.getFirstDisplayedOption() !== undefined;
        },
        getFirstDisplayedOption() {
            return this.getDisplayedOptionByIndex(0);
        },
        getLastDisplayedOption() {
            if (this.displayedOptionListHasAtLeastOneItem()) {
                return this.getDisplayedOptionByIndex(this.getDisplayedOptionsList().length - 1);
            }
        },
        getDisplayedOptionByIndex(index) {
            return this.getDisplayedOptionsList()[index];
        },
        getIndexOfOptionInDisplayedOptionList(optionID) {
            return this.getDisplayedOptionsList().findIndex((option) => option.id === optionID);
        },
    },
};
</script>

<style scoped>

</style>
