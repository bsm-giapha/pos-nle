/**
 * Implements the Sort Items feature in BrightInputList.
 * Items can be sorted using developer-defined algorithms.
 */
export const BrightInputListSortMixin = {
    props: {
        showSortButton: {
            type: Boolean,
            default: false,
            required: false,
        },
        sortOptions: {
            type: Array,
            default() {
                return [];
            },
            required: false,
        },
        currentSort: {
            type: String,
            default: '',
            required: false,
        },
    },

    data() {
        return {
            currentSortValue: this.currentSort,
        };
    },

    computed: {
        sortButtonBindings() {
            return {
                ref: 'sort',
                id: this.id + '-Sort',
                class: 'inline-block align-middle',
                hierarchy: 'tertiary',
                size: 'small',
                icon: 'sort',
                iconPosition: 'center',
                rounded: true,
                dummy: true,
                hideArrow: true,
                label: 'Sort',
                hideLabel: true,
                formControl: 'none',
                placeholder: '',
                disabled: this.numberOfTotalItems === 0,
                options: [
                    { label: 'Sort', options: this.sortOptions },
                ],
            };
        },
    },

    watch: {
        currentSort: function(newValue) {
            this.currentSortValue = newValue;
        },
    },

    methods: {
        handleSortSelect(sort) {
            this.$emit('sort', sort);
            this.currentSortValue = sort;
            this.calculateDisplayedItems();
        },
        sortItems(items, shouldSlice = false) {
            if (items && items.some(item => typeof item === "undefined")) return [];
            if (this.currentSortValue.length > 0) {
                let sortOption = null;
                for (const option of this.sortOptions) {
                    if (option.value === this.currentSortValue) {
                        sortOption = option;
                        break;
                    }
                }
                if (sortOption && 'sort' in sortOption) {
                    let sortedItems = items.sort(sortOption.sort);
                    if (shouldSlice) {
                        sortedItems = sortedItems.slice(0, this.numberOfItemsShownInitially);
                    }
                    return sortedItems;
                }
            } else if (shouldSlice) {
                items = items.slice(0, this.numberOfItemsShownInitially);
            }
            return items;
        },
    },
};
