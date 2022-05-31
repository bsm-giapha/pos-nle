/**
 * Implements the Add Item feature in BrightInputList.
 * Items can be added using either a Popover or custom method defined by the developer.
 */
export const BrightInputListAddMixin = {
    props: {
        showAddButton: {
            type: Boolean,
            default: false,
            required: false,
        },
        useAddPopoverSlot: {
            type: Boolean,
            default: false,
            required: false,
        },
        showAddPopover: {
            type: Boolean,
            default: false,
            required: false,
        },
    },

    data() {
        return {
            currentUniqueIDForNewItems: 0,
        };
    },

    computed: {
        addButtonBindings() {
            return {
                ref: 'add',
                id: this.id + '-Add',
                use: 'tertiary',
                size: 'small',
                icon: 'add',
                iconPosition: 'center',
                rounded: true,
            };
        },
    },

    methods: {
        /**
         * Use this to generate a unique identifier for a new Item in an Input List.
         *
         * IMPORTANT: When processing on the backend, be sure to listen for the pattern shown in the
         * return statement so that it can be treated as a new entity (as opposed to being treated
         * as an existing item).
         *
         * Long explanation:
         * We need to use this when adding a new Item because the main v-for loop that renders the
         * Items requires a unique :key identifier. If we don't have a truly unique identifier/key
         * for a new Item, then it has a chance of causing really odd state/render bugs.
         *
         * An Input List will automatically increment a unique ID in its state whenever this function
         * is called, so it solves this problem.
         *
         * @returns {String}
         */
        $_getUniqueIDForNewItem() {
            this.currentUniqueIDForNewItems += 1;
            return `id.${this.id}-NewItem-${this.currentUniqueIDForNewItems}`;
        },
        handlePopoverClose() {
            this.$emit('add-popover-close');
        },
        handleAddClick() {
            this.$emit('add');
        },
    },
};
