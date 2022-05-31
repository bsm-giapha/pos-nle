<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <div class="BrightInputList">
            <input v-model="inputValue" v-bind="inputBindings"/>
            <div class="BrightInputList__Header">
                <div class="BrightInputList__Header__TotalCount">
                    <span class="font-bold">{{ `${numberOfTotalItems} total` }}</span>
                    {{ showingNumber }}
                </div>
                <div class="BrightInputList__Header__Buttons">
                    <BrightDropdownSelect v-if="showSortButton" v-bind="sortButtonBindings" @option:selected="handleSortSelect"/>
                    <component
                        :is="(useAddPopoverSlot) ? 'BrightPopover' : 'span'"
                        v-if="showAddButton"
                        ref="addButtonContainer"
                        :show="showAddPopover"
                        @popover:click-closed="handlePopoverClose"
                        @popover:keydown-closed="handlePopoverClose"
                    >
                        <template v-slot:popover>
                            <slot name="add-popover-form"></slot>
                        </template>
                        <BrightButton
                            v-bind="addButtonBindings"
                            @click="handleAddClick"
                            @keydown.space.enter="handleAddClick"
                        />
                    </component>
                </div>
            </div>
            <transition name="BrightInputList__animation__fade">
                <BrightInputText v-if="!hideSearch && numberOfTotalItems !== 0" v-model="searchInput" v-bind="searchBindings"/>
            </transition>
            <div v-if="selectedItems.length > 0" v-bind="bulkEditActionsContainerBindings">
                <BrightCheckbox
                    :id="`${id}-bulkEditSelectAllButton`"
                    :form-control-bindings="{ class: 'BrightInputList__BulkEditActionsContainer__SelectAllButton' }"
                    :checked="numberOfTotalItems === selectedItems.length || displayedItems.every(item => selectedItems.includes(item.id))"
                    label="Select/Unselect all"
                    hide-label
                    form-control="none"
                    @click.stop="handleBulkEditOnAllRows"
                    @keydown.space.prevent="handleBulkEditOnAllRows"
                />
                <BrightButton
                    v-for="actionObject in bulkEditActions"
                    :id="id + convertToPascalCase(actionObject.action)"
                    :key="convertToPascalCase(actionObject.action)"
                    class="BrightInputList__BulkEditActionsContainer__Button"
                    :disabled="selectedItems.length === 0"
                    use="primary"
                    size="small"
                    :icon="(actionObject.icon) ? actionObject.icon : ''"
                    @click.stop="$emit(actionObject.eventName.toLowerCase(), selectedItems)"
                    @keydown.space.prevent="$emit(actionObject.eventName.toLowerCase(), selectedItems)"
                >
                    {{ actionObject.action }}
                </BrightButton>
                <slot name="bulk-edit-actions"></slot>
                <span class="BrightInputList__BulkEditActionsContainer__NumberLabel">{{ selectedItems.length }} Selected</span>
            </div>
            <BrightDivider v-if="hideSearch || numberOfTotalItems === 0 || selectedItems.length > 0"/>
            <ul class="BrightInputList__List" :class="selectedItems.length > 0 ? '' : 'mt-12'">
                <li
                    v-for="item in displayedItems"
                    :key="item.id"
                    :data-index="item.id"
                    :aria-labelledby="`${id}-${item.id}-PrimaryLabel`"
                    v-bind="itemBindings"
                    @click="handleItemClick(item.id)"
                    @keydown.space.enter.self.prevent="handleItemClick(item.id)"
                >
                    <div v-if="bulkEditActions.length > 0" class="BrightInputList__Item__BulkEditCheckboxContainer">
                        <BrightCheckbox
                            :id="`${id}-BulkEditCheckbox-${item.id}`"
                            :checked="selectedItems.includes(item.id)"
                            :form-control-bindings="{ class: 'BrightInputList__Item__BulkEditCheckboxContainer__Checkbox' }"
                            label="Select this item"
                            hide-label
                            @click.stop="handleBulkEditClick(item.id)"
                            @keydown.space="handleBulkEditClick(item.id)"
                        />
                    </div>
                    <div v-if="showLeftSection" class="BrightInputList__Item__LeftSection">
                        <slot name="left-section" v-bind="item"></slot>
                    </div>
                    <div class="BrightInputList__Item__Labels">
                        <div class="BrightInputList__Item__Labels__Top">
                            <div :id="`${id}-${item.id}-PrimaryLabel`" class="BrightInputList__Item__Labels__Top__Primary">
                                <slot name="primary-label" v-bind="item"></slot>
                            </div>
                            <div class="BrightInputList__Item__Labels__Top__Tertiary">
                                <slot name="tertiary-label" v-bind="item"></slot>
                            </div>
                        </div>
                        <div class="BrightInputList__Item__Labels__Bottom__Secondary">
                            <slot name="secondary-label" v-bind="item"></slot>
                        </div>
                    </div>
                    <div v-if="itemActions.length > 0 || showRightSection" class="BrightInputList__Item__Actions">
                        <BrightButton
                            v-if="itemActions.length === 1"
                            :id="id + '-Action-' + item.id"
                            :icon="itemActions[0].icon ? itemActions[0].icon : ''"
                            :icon-position="itemActions[0].icon ? 'center' : 'prefix'"
                            v-bind="itemActionButtonBindings"
                            @click.stop="handleOptionActionSelect(itemActions[0].value, item.id)"
                            @keydown.space.enter="handleOptionActionSelect(itemActions[0].value, item.id)"
                        />
                        <BrightDropdownSelect
                            v-else-if="itemActions.length > 1"
                            :id="id + '-Actions-' + item.id"
                            v-bind="itemActionSelectBindings"
                            @click.stop="$emit('action:click', item.id)"
                            @option:selected="handleOptionActionSelect($event, item.id)"
                        />
                        <slot name="right-section"></slot>
                    </div>
                </li>
            </ul>
            <transition name="BrightInputList__animation__fade">
                <div v-if="numberOfTotalItems === 0" class="__typography--body--s mb-0">{{ noItemsMessage }}</div>
            </transition>
            <transition name="BrightInputList__animation__fade">
                <div v-if="searchInput.length > 0 && numberOfDisplayedItems === 0" class="__typography--body--s mb-0">{{ noSearchResultsMessage }}</div>
            </transition>
            <transition name="BrightInputList__animation__fade">
                <BrightButton
                    v-if="shouldDisplayShowAllButton"
                    class="BrightInputList__ShowAllButton"
                    use="tertiary"
                    size="small"
                    @click="handleShowAllClick"
                    @keydown.space.enter="handleShowAllClick"
                >
                    {{ `Show All` }}
                </BrightButton>
            </transition>
        </div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { BrightInputListSearchMixin } from "./mixins/BrightInputListSearchMixin";
import { BrightInputListBulkEditingMixin } from "./mixins/BrightInputListBulkEditingMixin";
import { BrightInputListSortMixin } from "./mixins/BrightInputListSortMixin";
import { BrightInputListAddMixin } from "./mixins/BrightInputListAddMixin";
import { BrightInputListItemActionMixin } from "./mixins/BrightInputListItemActionMixin";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";
import BrightInputText from "Bright/components/input-library/text/BrightInputText.vue";
import BrightDivider from "Bright/components/layout-library/divider/BrightDivider.vue";
import BrightDropdownSelect from "Bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightCheckbox from "Bright/components/input-library/checkbox/BrightCheckbox.vue";
import BrightPopover from "Bright/components/overlay-library/BrightPopover.vue";
import _debounce from "lodash/debounce";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "BrightInputList",
    components: {
        BrightPopover,
        BrightCheckbox,
        BrightDropdownSelect,
        BrightDivider,
        BrightInputText,
        BrightButton,
    },
    mixins: [
        BrightInputMixin,
        BrightInputListSearchMixin,
        BrightInputListBulkEditingMixin,
        BrightInputListSortMixin,
        BrightInputListAddMixin,
        BrightInputListItemActionMixin,
    ],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Array,
            required: false,
            default: () => {},
        },
        items: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
        /** @override */
        hideLabel: {
            type: Boolean,
            required: false,
            default: true,
        },
        /** @override */
        hideSubLabel: {
            type: Boolean,
            required: false,
            default: true,
        },
        itemHeight: {
            type: String,
            default: '2.1em',
            required: false,
        },
        noItemsMessage: {
            type: String,
            default: 'No entries were found.',
            required: false,
        },
        numberOfItemsShownInitially: {
            type: [Number, String],
            default: 10,
            required: false,
        },
        showLeftSection: {
            type: Boolean,
            default: false,
            required: false,
        },
        showRightSection: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    emits: [
        'action:click',
        'item-click',
        'sort',
        'selected-items-change',
        'add-popover-close',
        'add',
    ],
    data() {
        return {
            inputValue: this.items,
            showAllWasClicked: this.numberOfItemsShownInitially === -1,
            debounce: {
                calculateDisplayedItems: _debounce(this.calculateDisplayedItems, 350, { trailing: true }),
            },
        };
    },
    computed: {
        inputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    value: this.inputValue,
                    ref: 'input',
                    type: 'hidden',
                },
            };
        },
        itemBindings() {
            return {
                class: {
                    'BrightInputList__Item': true,
                    'BrightInputList__Item--clickable': this.itemsAreClickable,
                },
                tabindex: 0,
                role: (this.itemsAreClickable) ? 'button': null,
            };
        },
        numberOfTotalItems() {
            return this.items.length;
        },
        numberOfDisplayedItems() {
            return this.displayedItems.length;
        },
        shouldDisplayShowAllButton() {
            if (this.searchInput.length > 0) return false;
            return !this.isShowingAllItems;
        },
        isShowingAllItems() {
            return this.numberOfTotalItems < this.numberOfItemsShownInitially || this.numberOfTotalItems === this.numberOfItemsShownInitially || this.showAllWasClicked;
        },
        showingNumber() {
            if (this.numberOfTotalItems === this.numberOfDisplayedItems && this.numberOfTotalItems !== 0) {
                return ` (showing all)`;
            }
            if (!this.isShowingAllItems || this.searchInput.length > 0) {
                if (this.numberOfItemsShownInitially > this.numberOfDisplayedItems) {
                    return ` (showing ${this.numberOfDisplayedItems})`;
                }
                return ` (showing ${this.numberOfItemsShownInitially})`;
            }
            return '';
        },
    },
    watch: {
        modelValue: function(newValue) {
            this.inputValue = newValue;
        },
        items: {
            handler: function(newValue) {
                this.debounce.calculateDisplayedItems();
                this.selectedItems = this.selectedItems.filter(itemID => this.items.some(item => item.id === itemID)); // Required for Bulk Editing to function correctly when items are added/removed
                this.$emit('update:modelValue', newValue);
            },
            deep: true,
        },
        isShowingAllItems: function() {
            this.calculateDisplayedItems();
        },
        numberOfItemsShownInitially: function() {
            this.calculateDisplayedItems();
        },
    },
    mounted() {
        this.calculateDisplayedItems();
    },
    methods: {
        handleShowAllClick() {
            this.showAllWasClicked = true;
        },
        calculateDisplayedItems() {
            if (this.searchInput.length > 0) {
                let { searchResultsWereFound, mostRelevantItems } = this.calculateMostRelevantItemsForSearch();
                if (!searchResultsWereFound) {
                    this.displayedItems = [];
                } else {
                    this.displayedItems = this.sortItems(mostRelevantItems); // Else, return the matching items.
                }
                return;
            }

            if (this.isShowingAllItems) {
                this.displayedItems = this.sortItems(_cloneDeep(this.items));
            } else {
                this.displayedItems = this.sortItems(_cloneDeep(this.items), true);
            }
        },
        convertToPascalCase(string) {
            if (string === undefined) return;

            let splitStr = ('' + string.toLowerCase()).split(' ');
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join('');
        },
    },
};
</script>
