import _isPlainObject from "lodash/isPlainObject";
import _isEqual from "lodash/isEqual";
import _cloneDeep from "lodash/cloneDeep";
import SchemaHelper from "@/helpers/SchemaHelper.js";

export const DiffMixin = {
    data() {
        return {
            /** The delta between the Initial Form Data and Current Form Data. */
            formDataDiff: {},

            /** The actual change objects that have been built so far. Has a similar structure to Form Data Diff. */
            reviewChangesPanelItems: {},
        };
    },

    computed: {
        changesWereMade() {
            const numberOfChanges = Object.keys(this.formDataDiff).length;
            return numberOfChanges > 0 && !(numberOfChanges === 1 && 'id' in this.formDataDiff);
        },
    },

    methods: {
        /**
         * Will diff old/new form data and build the appropriate objects required for the Review Changes feature.
         *
         * @param {Object} oldValue
         * @param {Object} newValue
         * @param {String} nesting
         * @param {String} key
         */
        diffFormDataWithInput(oldValue, newValue, nesting, key) {
            oldValue = oldValue[key];
            newValue = newValue[key];
            const type = typeof oldValue;

            if (['string', 'number', 'boolean'].includes(type)) {
                this.handlePrimitiveDiff(oldValue, newValue, type, nesting);
            } else if (Array.isArray(oldValue)) {
                this.handleArrayDiff(oldValue, newValue, type, nesting);
            } else if (_isPlainObject(oldValue)) {
                this.handleObjectDiff(oldValue, newValue, type, nesting);
            } else {
                this.handleGenericDiff(oldValue, newValue, type, nesting);
            }
        },

        /**
         * @param {string|boolean|number} oldValue
         * @param {string|boolean|number} newValue
         * @param {string} type
         * @param {string} nesting
         */
        handlePrimitiveDiff(oldValue, newValue, type, nesting) {
            if (type === 'string') {
                oldValue = oldValue.trim();
                if (typeof newValue === 'number' || typeof newValue === 'boolean') {
                    newValue += ''; // Cast new values to string to avoid weird type issues
                }
                if (typeof newValue === 'undefined' || newValue === null) {
                    newValue = '';
                } else {
                    newValue = newValue.trim();
                }
            }
            if (oldValue === newValue) {
                this.removeFromFormDataDiffAndReviewChangesPanelItems(nesting);
            } else {
                this.addOrUpdateFormDataDiffAndReviewChangesPanelItems(newValue, nesting);
            }
        },

        /**
         * @param {[string|number|boolean]} oldValue
         * @param {[string|number|boolean]} newValue
         * @param {string} type
         * @param {string} nesting
         */
        handleArrayDiff(oldValue, newValue, type, nesting) {
            if (oldValue.length === newValue.length) {
                if (_isEqual(oldValue, newValue)) { // This will not work for arrays of Objects/Arrays. Only primitives are supported at this time.
                    this.removeFromFormDataDiffAndReviewChangesPanelItems(nesting);
                } else {
                    this.addOrUpdateFormDataDiffAndReviewChangesPanelItems(newValue, nesting);
                }
            } else {
                this.addOrUpdateFormDataDiffAndReviewChangesPanelItems(newValue, nesting);
            }
        },

        /**
         * @param {object} oldValue
         * @param {object} newValue
         * @param {string} type
         * @param {string} nesting
         */
        handleObjectDiff(oldValue, newValue, type, nesting) {
            if (Object.keys(oldValue).length === Object.keys(newValue).length) {
                if (_isEqual(oldValue, newValue)) {
                    this.removeFromFormDataDiffAndReviewChangesPanelItems(nesting);
                } else {
                    this.addOrUpdateFormDataDiffAndReviewChangesPanelItems(newValue, nesting);
                }
            } else {
                this.addOrUpdateFormDataDiffAndReviewChangesPanelItems(newValue, nesting);
            }
        },

        /**
         * @param {*} oldValue
         * @param {*} newValue
         * @param {string} type
         * @param {string} nesting
         */
        handleGenericDiff(oldValue, newValue, type, nesting) {
            if (_isEqual(oldValue, newValue)) {
                this.removeFromFormDataDiffAndReviewChangesPanelItems(nesting);
            } else {
                this.addOrUpdateFormDataDiffAndReviewChangesPanelItems(newValue, nesting);
            }
        },

        /**
         * Given a nesting string, remove a value in `this.formDataDiff` and `this.baseFormDataChangeObjects`.
         * This will retain reactivity.
         *
         * @param {string} nesting
         */
        removeFromFormDataDiffAndReviewChangesPanelItems(nesting) {
            let key = nesting;
            let formDataDiff = this.formDataDiff;
            let reviewChangesPanelItems = this.reviewChangesPanelItems;
            if (key.includes('.')) {
                const splitNesting = key.split('.');
                key = splitNesting[splitNesting.length - 1];
                formDataDiff = SchemaHelper.getDataPropertyValueByNestingString(this.formDataDiff, nesting, false, true);
                reviewChangesPanelItems = this.getNestedReviewChangesPanelItems(nesting, false, true);
            }
            if (typeof formDataDiff !== 'undefined' && key in formDataDiff) { // We're assuming formDataDiff and reviewChangesPanelItems have the same structure. If they don't, then there's a big problem.
                delete formDataDiff[key];
                delete reviewChangesPanelItems[key];

                if (Object.keys(formDataDiff).length === 0 && nesting.includes('.')) { // If there are no more keys in this object, then remove it
                    let newNesting = nesting.split('.');
                    newNesting.pop();
                    newNesting = newNesting.join('.');
                    this.removeFromFormDataDiffAndReviewChangesPanelItems(newNesting);
                }
            }
        },

        /**
         * Given a nesting string, remove a value in `this.baseFormDataChangeObjects`.
         * This will retain reactivity.
         *
         * Note: This is used ONLY in Add Forms when merging Input Validation against change objects
         * (i.e. mergeInputValidationWithChangeObjects()). This is because Add Forms have no awareness of Form Data Diff.
         *
         * @param nesting
         */
        removeFromReviewChangesPanelItems(nesting) {
            let key = nesting;
            let reviewChangesPanelItems = this.reviewChangesPanelItems;
            if (key.includes('.')) {
                const splitNesting = key.split('.');
                key = splitNesting[splitNesting.length - 1];
                reviewChangesPanelItems = this.getNestedReviewChangesPanelItems(nesting, false, true);
            }
            if (typeof reviewChangesPanelItems !== 'undefined' && key in reviewChangesPanelItems) {
                delete reviewChangesPanelItems[key];

                if (Object.keys(reviewChangesPanelItems).length === 0 && nesting.includes('.')) { // If there are no more keys in this object, then remove it
                    let newNesting = nesting.split('.');
                    newNesting.pop();
                    newNesting = newNesting.join('.');
                    this.removeFromReviewChangesPanelItems(newNesting);
                }
            }
        },

        /**
         * Add or update a value in `this.formDataDiff` and `this.reviewChangesPanelItems` as needed. This will retain reactivity.
         * @param {*} value
         * @param {string} nesting
         */
        addOrUpdateFormDataDiffAndReviewChangesPanelItems(value, nesting) {
            value = _cloneDeep(value);
            let originalNesting = nesting;
            let aggregateNesting = '';
            let formDataDiff = this.formDataDiff;
            let reviewChangesPanelItems = this.reviewChangesPanelItems;

            // eslint-disable-next-line no-constant-condition
            while (true) { // Create the keys for the given nesting string if needed
                if (!nesting.includes('.')) {
                    formDataDiff[nesting] = value;
                    let fieldChangeObject = this.buildFormChange(originalNesting);
                    if (fieldChangeObject) {
                        reviewChangesPanelItems[nesting] = fieldChangeObject;
                    }
                    break;
                }

                const splitNesting = nesting.split('.');
                const firstPossibleKey = splitNesting.shift();
                nesting = splitNesting.join('.');
                aggregateNesting += (aggregateNesting.length > 0) ? `.${firstPossibleKey}` : firstPossibleKey;

                if (!(firstPossibleKey in formDataDiff)) {
                    formDataDiff[firstPossibleKey] = {};
                    reviewChangesPanelItems[firstPossibleKey] = this.buildFormChangeSection(aggregateNesting);
                }

                formDataDiff = formDataDiff[firstPossibleKey]; // Step into the newly added key and see if we need to go deeper
                reviewChangesPanelItems = reviewChangesPanelItems[firstPossibleKey].children;
            }
        },

        /**
         * Add or update a value in `this.reviewChangesPanelItems` as needed. This will retain reactivity.
         * @param nesting
         */
        addOrUpdateReviewChangesPanelItems(nesting) {
            let originalNesting = nesting;
            let aggregateNesting = '';
            let reviewChangesPanelItems = this.reviewChangesPanelItems;

            // eslint-disable-next-line no-constant-condition
            while (true) { // Create the keys for the given nesting string if needed
                if (!nesting.includes('.')) {
                    let fieldChangeObject = this.buildFormChange(originalNesting);
                    if (fieldChangeObject) {
                        reviewChangesPanelItems[nesting] = fieldChangeObject;
                    }
                    break;
                }

                const splitNesting = nesting.split('.');
                const firstPossibleKey = splitNesting.shift();
                nesting = splitNesting.join('.');
                aggregateNesting += (aggregateNesting.length > 0) ? `.${firstPossibleKey}` : firstPossibleKey;

                if (!(firstPossibleKey in reviewChangesPanelItems)) {
                    reviewChangesPanelItems[firstPossibleKey] = this.buildFormChangeSection(aggregateNesting);
                }

                reviewChangesPanelItems = reviewChangesPanelItems[firstPossibleKey].children; // Step into the newly added key and see if we need to go deeper
            }
        },

        /**
         * Returns a Form Change Section object. This simply denotes a section in the Review Changes Panel.
         *
         * @param {string} nesting
         * @returns {{depth: number, label: string, isSection: boolean}}
         */
        buildFormChangeSection(nesting) {
            return {
                depth: nesting.split('.').length,
                label: this.getLabelForFormChangeSection(nesting),
                isSection: true,
                children: {},
            };
        },

        /**
         * Returns a label for a Form Change Section object.
         */
        getLabelForFormChangeSection(nesting) {
            const metadataForSection = SchemaHelper.getDataPropertyValueByNestingString(this.inputMetadata, nesting);
            return metadataForSection.label;
        },

        /**
         * Review Changes Panel Items have a different structure than the other Form-related data properties.
         * Children are nested within a "children" key for each nested structure, so you need to use this method
         * to properly access panel items.
         *
         * @param nesting
         * @param clone - This is the same as the getDataPropertyValueByNestingString() argument
         * @param skipLastNest - This is the same as the getDataPropertyValueByNestingString() argument
         * @returns {*}
         */
        getNestedReviewChangesPanelItems(nesting, clone = true, skipLastNest = false) {
            let nestingWithChildren = nesting.split('.').join('.children.');
            return SchemaHelper.getDataPropertyValueByNestingString(this.reviewChangesPanelItems, nestingWithChildren, clone, skipLastNest);
        },
    },
};
