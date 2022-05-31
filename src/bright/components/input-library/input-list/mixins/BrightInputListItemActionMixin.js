/**
 * Implements the Item Actions feature in BrightInputList.
 * Items have context actions (i.e. clicking on the items, clicking the 3-dot menu).
 */
export const BrightInputListItemActionMixin = {
    props: {
        itemActions: {
            type: Array,
            default() {
                return [];
            },
            required: false,
        },
        itemsAreClickable: {
            type: Boolean,
            default: false,
            required: false,
        },
    },

    computed: {
        itemActionButtonBindings() {
            return {
                class: 'align-middle',
                use: 'tertiary',
                size: 'small',
                rounded: true,
            };
        },
        itemActionSelectBindings() {
            return {
                class: 'inline-block align-middle',
                hierarchy: 'tertiary',
                size: 'small',
                icon: 'more_vert',
                iconPosition: 'center',
                rounded: true,
                dummy: true,
                hideArrow: true,
                label: 'Actions',
                hideLabel: true,
                formControl: 'none',
                placeholder: '',
                options: this.itemActions,
            };
        },
    },

    methods: {
        handleItemClick(itemID) {
            if (this.itemsAreClickable) {
                this.$emit('item-click', itemID);
            }
        },
        handleOptionActionSelect(action, itemID) {
            this.$emit(action, [itemID]);
            this.$emit('action:click', itemID);
        },
    },
};
