import _isPlainObject from "lodash/isPlainObject";
import _cloneDeep from "lodash/cloneDeep";

/**
 * Implements the Search feature in BrightInputList.
 * Items can be searched if they contain `data` and/or `metadata` keys.
 */
export const BrightInputListSearchMixin = {
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
        hideSearch: {
            type: Boolean,
            default: false,
            required: false,
        },
        noSearchResultsMessage: {
            type: String,
            default: 'Unfortunately, no search results were found.',
            required: false,
        },
    },

    data() {
        return {
            searchInput: '',
        };
    },

    computed: {
        searchBindings() {
            return {
                ref: 'search',
                id: this.id + '-Search',
                class: 'BrightInputList__Search',
                label: 'Search',
                hideLabel: true,
                placeholder: 'Search',
                size: 'small',
                formControl: 'none',
                optional: true,
                autocomplete: 'new-password',
            };
        },
    },

    watch: {
        searchInput: function() {
            this.debounce.calculateDisplayedItems();
        },
    },

    methods: {
        calculateMostRelevantItemsForSearch() {
            let currentHighestSearchPoints = 0;
            let mostRelevantItems = [];

            this.items.forEach((item) => {
                let searchPointsForItem = this.calculateSearchPointsForItem(item);
                if (searchPointsForItem > currentHighestSearchPoints) {
                    mostRelevantItems.push(_cloneDeep(item));
                    currentHighestSearchPoints = searchPointsForItem;
                } else if (searchPointsForItem === currentHighestSearchPoints && currentHighestSearchPoints !== 0) {
                    mostRelevantItems.push(_cloneDeep(item));
                }
            });

            return {
                searchResultsWereFound: (currentHighestSearchPoints > 0),
                mostRelevantItems: mostRelevantItems,
            };
        },

        calculateSearchPointsForItem(item) {
            const searchTerms = this.getSearchTerms();
            let searchPointsForItem = 0;
            for (const [, value] of Object.entries(item)) {
                if (typeof value === 'string') {
                    for (let i = 0; i < searchTerms.length; i++) {
                        if (value.toLowerCase().indexOf(searchTerms[i]) > -1) {
                            searchPointsForItem++;
                        }
                    }
                } else if (_isPlainObject(value)) {
                    searchPointsForItem += this.calculateSearchPointsForItem(value);
                }
            }
            return searchPointsForItem;
        },

        getSearchTerms() {
            let searchTerms = [];
            this.searchInput.split(' ').forEach(searchTerm => {
                if (searchTerm.length > 0) {
                    searchTerms.push(searchTerm.toLowerCase());
                }
            });
            return searchTerms;
        },
    },
};
