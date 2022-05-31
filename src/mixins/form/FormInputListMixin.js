import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList.vue";
import _cloneDeep from "lodash/cloneDeep.js";
import { BrightInputMixin } from "@/bright/mixins/inputs/BrightInputMixin.js";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";

/**
 * A mixin that allows a component to easily work with Input Lists
 * Previously known as "LenderInputListMixin".
 *
 * Note the use of the following JSDoc block tags in this Mixin's values:
 *      @use = You can/should use this in your Form. Often times, this will be used for bindings/event listeners.
 *      @convenience = Useful fields/methods that make Forms easier to manage and more convenient.
 *      @internal = Things that are internal details. You don't need to know how these work to use this mixin.
 */
export const FormInputListMixin = {
    components: { BrightInputList, BrightButton, BrightDropdownSelect, BrightAvatar },
    emits: ['remove'], // If you use custom itemActions, then you'll need to define them here as well.
    mixins: [BrightInputMixin],
    props: {
        /**
         * You can provide the "noItemsMessage" BrightInputList prop here and it'll automatically be passed to the
         * Input List via a computed binding property.
         */
        noItemsMessage: {
            type: String,
            required: true,
        },

        /**
         * Whether the User can freely add any data they want.
         *
         * This is not used often, but it makes sense when you need to allow the User to add a lot of things that
         * we couldn't possibly know at runtime (e.g. an email CC list where we can't know the emails they'll add).
         */
        allowFreeInput: {
            type: Boolean,
            required: false,
            default: false,
        },

        /**
         * This is where you will define the possible items that can be added in the Input List.
         *
         * For example, if you were creating a Branch Input List in an Internal User Form, then you would provide all
         * Branches in the lender here.
         *
         * If your Input List is readonly or allows free input, then don't pass anything here.
         */
        allPossibleItems: {
            type: Array,
            required: false,
            default: () => [],
        },

        /**
         * Given an ID of an Item, this function will return an Object representation of the Item. At the bare minimum,
         * it should include an 'id' and 'name' property so that the things work as expected. You can technically shape
         * the Object in any form you want.
         *
         * Whatever is passed here will be available in the named slots used in the BrightInputList component, so you
         * should include any data you'd need to render that part.
         *
         * Almost all Input Lists will want to override this because the automatic sorting feature in Input Lists depends
         * on the 'name' property to function correctly. You'll also likely need to provide useful names for things to
         * show in the Input List to the User (i.e. just showing an ID to the User often won't be good enough).
         *
         * For example, if you had an Input List full of Internal User objects, you could provide a function that returns
         * useful data like:
         *
         *      const lender = useLenderStore();
         *      const internalUser = lender.processors.find(processor => processor.id === id);
         *      return {
         *          id: id,
         *          name: `${internalUser.account.firstName} ${internalUser.account.lastName}`,
         *          role: internalUser.assignments.role,
         *      };
         *
         * @return {String}
         */
        getObjectRepresentationOfItemById: {
            type: Function,
            required: false,
            default: function (item) {
                return {
                    id: item,
                    name: item,
                };
            },
        },

        /**
         * Whether the items in the list will be objects.
         * False by default.
         */
        itemsInListAreObjects: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            /**
             * @use
             * @convenience
             * A decent amount of our Input Lists allow the adding of multiple IDs/objects from a Multi-Select Dropdown
             * input. Because it's so common, this `multiselectDropdownValue` data value can be used to v-model onto that Dropdown.
             * It can then be used in the BrightButton click/submit handler like `@click="addItems(multiselectDropdownValue)`
             */
            multiselectDropdownValue: [],

            /**
             * @internal
             * Whether to show the Input List's associated form.
             * It is highly recommend to control the display of the Form using the following helper methods:
             *      - showAddForm()
             *      - showEditForm(itemId)
             *      - hideForm()
             */
            showInputListForm: false,

            /**
             * @internal
             * The ID of the item being edited.
             * It is highly recommend to set this using the showEditForm(itemId) method.
             */
            idOfItemBeingEdited: '',
        };
    },
    computed: {
        /**
         * @use
         * Use this if you're using a Popover Form with your Input List and it allows free inputs.
         */
        formPopoverBindings() {
            return {
                ...this.baseBindings,
                showAddPopover: this.showInputListForm,
                useAddPopoverSlot: true,
            };
        },

        /**
         * @use
         * Use this if you're using a Modal Form.
         */
        formModalBindings() {
            return {
                ...this.baseBindings,
                itemsAreClickable: true,
            };
        },

        /**
         * @use
         * Use this if you're doing a Readonly Input List (i.e. a Read List).
         */
        readonlyBindings() {
            return {
                ...this.baseBindings,
                hideSearch: true,
                hideMetaLabel: true,
                showAddPopover: false,
                useAddPopoverSlot: false,
                numberOfItemsShownInitially: 10,
                showLeftSection: false,
                bulkEditActions: [],
                itemActions: [],
            };
        },

        /**
         * @use
         * If you are using a Popover Form, then you can use this computed property to easily provide accurate options
         * to a Select Dropdown.
         *
         * Note that there is a dependency on the `getObjectRepresentationOfItemById()` method to get an accurate label for the options.
         * It will look for a 'name' property to pass as a label.
         */
        selectDropdownOptionsForItemsNotInList() {
            let options = [];
            this.itemsNotInList.forEach((item) => {
                let id = (this.itemsInListAreObjects) ? item.id : item;
                options.push({
                    value: id,
                    label: this.getObjectRepresentationOfItemById(id).name,
                });
            });
            return options;
        },

        /**
         * @convenience
         * You can use this to easily get the displayed items in the Input List.
         * It's really just this Input List's value prop, but it's a little more intuitive this way.
         */
        itemsInList() {
            return this.modelValue;
        },

        /**
         * @internal
         * The items that are NOT in the Input List. This is the delta between `itemsInList` and `allPossibleItems`.
         */
        itemsNotInList() {
            let itemsNotInList = [];
            this.allPossibleItems.forEach((possibleItem) => {
                let possibleItemId = String((this.itemsInListAreObjects) ? possibleItem.id : possibleItem);
                if (
                    (this.itemsInListAreObjects && !this.itemsInList.some(itemInList => String(itemInList.id) === possibleItemId))
                    || (!this.itemsInListAreObjects && !this.itemsInList.some(idOfItemInList => String(idOfItemInList) === possibleItemId))
                ) {
                    itemsNotInList.push(possibleItem);
                }
            });
            return itemsNotInList;
        },

        /**
         * @internal
         * Can be given to the Input List component's showAddButton prop. This is automatically done in inputBindings().
         *
         * You can override this if you need custom behavior (e.g. Show an Add Button only to Admins/Users who have a
         * certain permission.
         *
         * If free-form inputs are allowed, then this will always be true. Else, it'll be based on whether any items
         * can be added to the list.
         */
        showAddButton() {
            return (this.allowFreeInput && !this.readonly) ? true : !this.readonly && this.itemsNotInList.length > 0;
        },

        /**
         * @internal
         * Can be given to the Input List component's itemActions prop. This is automatically done in baseBindings().
         *
         * You can override this to add any custom item actions for an Input List.
         */
        itemActions() {
            return [
                { value: 'remove', icon: 'close', label: 'Remove' },
            ];
        },

        /**
         * @internal
         * Can be given to the Input List component's sortOptions prop. This is automatically done in baseBindings().
         *
         * You can override this to add any custom sort options for an Input List.
         */
        sortOptions() {
            return [
                { value: 'asc', label: 'Alphabetical (A to Z)', sort: this.sortByNameAscending },
                { value: 'desc', label: 'Alphabetical (Z to A)', sort: this.sortByNameDescending },
            ];
        },

        /**
         * @internal
         * A common base to depend on for most Input Lists
         */
        baseBindings() {
            let items = this.itemsInList.map(item => {
                let id = (this.itemsInListAreObjects) ? item.id : item;
                return this.getObjectRepresentationOfItemById(id);
            });
            return {
                ...this.getFormControlProps,
                ...this.getLabelProps,
                ...this.getBaseInputProps,
                ...this.getInputValidationProps,
                items: items,
                noItemsMessage: this.noItemsMessage,
                hideLabel: false,
                hideSubLabel: false,
                showLeftSection: true,
                showSortButton: true,
                showAddButton: this.showAddButton,
                currentSort: 'asc',
                sortOptions: this.sortOptions,
                bulkEditActions: [
                    { eventName: 'remove', action: 'Remove', icon: 'delete' },
                ],
                itemActions: this.itemActions,
            };
        },
    },
    methods: {
        /**
         * @use
         * Adds an array of Items to the Input List. Items can be primitives (i.e. strings, numbers, etc.) or complex objects.
         * Note: Primitives MUST be unique and Complex objects MUST have an 'id' property.
         *
         * For primitive items, you're often dealing with an array of IDs like:
         *      ['ABCD1234', 'EFGH5678']
         *
         * For object items, you're often dealing with an array of objects like:
         *      [
         *          { id: 'blue', colorName: 'Blue', description: 'A very calm and secure color.' },
         *          { id: 'red', colorName: 'Red', description: 'A bold, sometimes aggressive color.' },
         *      ]
         *
         * @param {Array} itemsToBeAdded
         */
        addItems(itemsToBeAdded) {
            let itemsInList = _cloneDeep(this.itemsInList);
            let itemsWereAdded = false;
            itemsToBeAdded.forEach(itemToBeAdded => {
                const idOfItemBeingAdded = String((this.itemsInListAreObjects) ? itemToBeAdded.id : itemToBeAdded);
                if (
                    (this.itemsInListAreObjects && !itemsInList.some(item => String(item.id) === idOfItemBeingAdded))
                    || (!this.itemsInListAreObjects && !itemsInList.some(itemID => String(itemID) === idOfItemBeingAdded))
                ) {
                    let toAdd;
                    if (this.allowFreeInput) {
                        toAdd = itemToBeAdded;
                    } else if (this.itemsInListAreObjects) {
                        toAdd = this.allPossibleItems.find(item => String(item.id) === idOfItemBeingAdded);
                    } else {
                        toAdd = this.allPossibleItems.find(itemID => String(itemID) === idOfItemBeingAdded);
                    }
                    itemsInList.push(toAdd);
                    itemsWereAdded = true;
                }
            });
            if (itemsWereAdded) {
                this.$emit('update:modelValue', itemsInList);
            }
            this.hideForm();
        },

        /**
         * @use
         * A convenience method that allows you to easily add a SINGLE item (i.e. not an array of items).
         * This is useful for Modal Forms, where you will often only add a single thing.
         *
         * @param {Any} itemToBeAdded
         */
        addItem(itemToBeAdded) {
            this.addItems([itemToBeAdded]);
        },

        /**
         * @use
         * Use this to edit an array of Item objects in a list.
         * Note: This only works for Object-based Items.
         *
         * @param {Object[]} itemsToEdit
         */
        editItems(itemsToEdit) {
            let itemsInList = _cloneDeep(this.itemsInList);
            let itemsWereEdited = false;
            itemsToEdit.forEach(itemToEdit => {
                let indexOfItem = itemsInList.findIndex(item => String(item.id) === String(itemToEdit.id));
                if (indexOfItem > -1) {
                    itemsInList[indexOfItem] = itemToEdit;
                    itemsWereEdited = true;
                }
            });
            if (itemsWereEdited) {
                this.$emit('update:modelValue', itemsInList);
                this.hideForm();
            }
        },

        /**
         * @use
         * Use this to edit a single Item object in a list.
         * Note: This only works for an Object-based Item.
         *
         * @param {Object} itemToEdit
         */
        editItem(itemToEdit) {
            this.editItems([itemToEdit]);
        },

        /**
         * @use
         * Will upsert an array of Items into this list.
         * If they already exist, then they will be edited. Otherwise they'll be added.
         *
         * @param {Any[]} itemsToUpsert
         */
        upsertItems(itemsToUpsert) {
            if (this.itemsInListAreObjects) {
                this.editItems(itemsToUpsert); // The editItems() method checks for existence, so it's safe to do this.
                this.addItems(itemsToUpsert); // The addItems() method checks for duplicates, so it's safe to do this.
            } else {
                // Primitive-based Items can be blindly added because Primitive-based Items cannot be edited and the addItems() method already checks for duplicates.
                this.addItems(itemsToUpsert);
            }
        },

        /**
         * @use
         * Use this to upsert a single Item into a list.
         *
         * @param {Any} itemToUpsert
         */
        upsertItem(itemToUpsert) {
            this.upsertItems([itemToUpsert]);
        },

        /**
         * @use
         * Given an array of Item IDs (string or number), will remove all given items from the Input List.
         *
         * @param {Number[]|String[]} idsOfItemsToBeRemoved
         */
        removeItems(idsOfItemsToBeRemoved) {
            let itemsInList = _cloneDeep(this.itemsInList);
            let itemsWereRemoved = false;
            idsOfItemsToBeRemoved.forEach(id => {
                id = String(id);
                let index = -1;
                if (this.itemsInListAreObjects) {
                    index = itemsInList.findIndex(item => String(item.id) === id);
                } else { // If the Items are not objects, then they must be ID primitives
                    index = itemsInList.findIndex(itemID => String(itemID) === id);
                }
                if (index > -1) {
                    itemsInList.splice(index, 1);
                    itemsWereRemoved = true;
                }
            });
            if (itemsWereRemoved) {
                this.$emit('update:modelValue', itemsInList);
            }
        },

        /**
         * @use
         * Shows an Add Form if it's properly setup.
         */
        showAddForm() {
            this.showInputListForm = true;
            this.idOfItemBeingEdited = '';
        },

        /**
         * @use
         * Shows an Edit Form if it's properly setup.
         * Pass the ID of the item you're editing as well.
         *
         * @param {String|Number} itemId
         */
        showEditForm(itemId) {
            this.showInputListForm = true;
            this.idOfItemBeingEdited = itemId;
        },

        /**
         * @use
         * Hides a Form if it's properly setup.
         */
        hideForm() {
            this.showInputListForm = false;
            this.multiselectDropdownValue.splice(0); // Empty out the multi-select value if it's closed. This is harmless in components that don't use this value.
        },

        /**
         * @internal
         * A default sort for the Input List.
         */
        sortByNameAscending(a, b) {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        },

        /**
         * @internal
         * A default sort for the Input List.
         */
        sortByNameDescending(a, b) {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
        },
    },
};
