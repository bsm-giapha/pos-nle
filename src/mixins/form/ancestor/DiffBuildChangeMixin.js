import { SchemaTypes } from "@/helpers/SchemaHelper.js";
import SchemaHelper from "@/helpers/SchemaHelper.js";

import _isPlainObject from "lodash/isPlainObject";

/**
 * Builds Form Change objects for the main Diff mixin (`LenderFormDiffMixin`).
 */
export const DiffBuildChangeMixin = {
    methods: {
        /**
         * Builds a Form Change for a given form data set.
         *
         * @param {string} nesting
         * @returns {object}
         */
        buildFormChange(nesting) {
            let metadataForInput = SchemaHelper.getDataPropertyValueByNestingString(this.inputMetadata, nesting);
            if (!metadataForInput) return;

            const nestedFormData = SchemaHelper.getDataPropertyValueByNestingString(this.formDataCurrent, nesting);
            const splitNesting = nesting.split('.');
            const depth = splitNesting.length;

            const schemaType = ('schemaType' in metadataForInput) ? metadataForInput.schemaType : '';
            let { from, to, changeType } = this.getChangeDataForFormData(nestedFormData, metadataForInput, nesting);
            let inputId = metadataForInput.id;
            let focusId = metadataForInput.id;

            if ('buildChangeObject' in metadataForInput) { // It's possible to build your own change object. Could be useful for Custom Inputs.
                ({ changeType, inputId, focusId, from, to } = metadataForInput.buildChangeObject({
                    metadata: metadataForInput,
                    proposedChangeType: changeType,
                    oldValue: from,
                    newValue: to,
                }));
            } else if (schemaType === SchemaTypes.Address) {
                ({ from, to, changeType } = this.handleFormChangeForAddress(from, to));
                focusId = inputId + 'StreetAddress1';
            } else if (schemaType === SchemaTypes.InputList) {
                ({ from, to, changeType } = this.handleFormChangeForInputList());
            } else if (schemaType === SchemaTypes.Switch) {
                const descriptionTrue = metadataForInput?.descriptionTrue ?? 'Yes';
                const descriptionFalse = metadataForInput?.descriptionFalse ?? 'No';
                if (metadataForInput?.descriptionTrue && metadataForInput?.descriptionFalse) { // If Boolean-based, then transform the displayed 'from' and 'to' labels
                    from = (from) ? descriptionTrue : descriptionFalse;
                    to = (to) ? descriptionTrue : descriptionFalse;
                    changeType = 'edit';
                } else {
                    from = (from) ? descriptionTrue : descriptionFalse;
                    to = (to) ? descriptionTrue : descriptionFalse;
                }
                focusId += '-Knob';
            } else if (schemaType === SchemaTypes.Checkbox) {
                focusId += '-Box';
            } else if (schemaType === SchemaTypes.Password) {
                from = 'Changed';
                to = '';
            } else if (schemaType === SchemaTypes.RadioGroup) {
                focusId += '-' + to;
            } else if ([SchemaTypes.DropdownSingle, SchemaTypes.DropdownMultiple, SchemaTypes.StateSingle, SchemaTypes.StateMultiple].includes(schemaType)) {
                ({ from, to, focusId, changeType } = this.handleFormChangeForDropdownSelect(from, to, metadataForInput, focusId));
            } else if (schemaType === SchemaTypes.DateTime) {
                if (to === null) {
                    to = "No dates selected";
                }
            } else if ([SchemaTypes.Custom, SchemaTypes.CustomArrayType, SchemaTypes.CustomObjectType].includes(schemaType)) {
                if (!from && to) {
                    changeType = 'add';
                    from = 'Added';
                    to = '';
                } else if (from && !to) {
                    changeType = 'delete';
                    from = 'Removed';
                    to = '';
                } else {
                    changeType = 'edit';
                    from = 'Edited';
                    to = '';
                }
            } else if (!(schemaType in SchemaTypes)) {
                return false; // If a type is not supported, then throw it out.
            }

            if (this.isAddForm) changeType = 'priority_high'; // This is for validation.
            const inputValidation = SchemaHelper.getDataPropertyValueByNestingString(this.inputValidation, nesting);

            return {
                type: changeType,
                label: metadataForInput.label,
                depth: depth,
                namedRoute: metadataForInput.namedRoute,
                inputId: inputId,
                focusId: focusId,
                formDataNesting: nesting,
                from: from,
                to: to,
                validationError: inputValidation.validationMessage,
            };
        },

        /**
         * Returns important change-related data for the `buildFormChange()` function.
         *
         * @param {object} nestedFormData
         * @param {object} metadataForInput
         * @param {string} nesting
         * @returns {object}
         */
        getChangeDataForFormData(nestedFormData, metadataForInput, nesting) {
            let from = SchemaHelper.getDataPropertyValueByNestingString(this.formDataInitial, nesting, false);
            let to = nestedFormData;
            let changeType = 'edit';

            if (!from && to) { // Else, evaluate type normally
                changeType = 'add';
            } else if (from && !to) {
                changeType = 'delete';
            }

            return {
                from: from,
                to: to,
                changeType: changeType,
            };
        },

        /**
         * Handles form changes for `BrightInputAddress` components in the `buildFormChange()` method.
         *
         * @param {String} from
         * @param {String} to
         * @returns {{from: string, to: string, type: string}}
         */
        handleFormChangeForAddress(from, to) {
            const initialValueWasEmpty = Object.keys(from).every((addressField) => (from[addressField] + '').length === 0);
            const newValueIsEmpty = Object.keys(to).every((addressField) => (to[addressField] + '').length === 0);
            let changeType = 'edit';
            let buildAddressString = (addressObject) => {
                let addressString = '';
                if (addressObject.streetAddress1.length > 0) addressString = addressObject.streetAddress1;
                if (addressObject.streetAddress2.length > 0) addressString += ' ' + addressObject.streetAddress2;

                if (addressObject.city.length > 0) {
                    if (addressString.length > 0) {
                        addressString += ', ';
                    }
                    addressString += addressObject.city;
                }

                if (addressObject.state.length > 0) {
                    if (addressString.length > 0) {
                        addressString += ', ';
                    }
                    addressString += addressObject.state.toUpperCase();
                }

                if (addressObject.zip.length > 0) {
                    if (addressObject.state.length > 0) {
                        addressString += ' ';
                    }
                    addressString += addressObject.zip;
                }

                return addressString;
            };

            if (initialValueWasEmpty && !newValueIsEmpty) {
                changeType = 'add';
                from = buildAddressString(to);
                to = '';
            } else if (!initialValueWasEmpty && newValueIsEmpty) {
                changeType = 'delete';
                from = buildAddressString(from);
                to = '';
            } else {
                from = buildAddressString(from);
                to = buildAddressString(to);
            }

            return {
                changeType: changeType,
                from: from,
                to: to,
            };
        },

        /**
         * Handles form changes for `BrightInputList` components in the `buildFormChange()` method.
         * @returns {object}
         */
        handleFormChangeForInputList() {
            return {
                changeType: 'edit',
                from: 'Edited',
                to: '',
            };
        },

        /**
         * Handles form changes for `BrightDropdownSelect` components in the `buildFormChange()` method.
         *
         * @param {String} from
         * @param {String} to
         * @param {Object} metadataForInput
         * @param {String} focusId
         * @returns {object}
         */
        handleFormChangeForDropdownSelect(from, to, metadataForInput, focusId) {
            let optionLabels = metadataForInput?.metadataOptionLabels;

            const isMultiSelectDropdown = (typeof from !== 'string');
            let changeType = 'edit';
            if (isMultiSelectDropdown) { // We don't bother to construct these changes on Multi-Select Dropdowns at this time.
                from = 'Edited';
                to = '';
            } else if (!from && to) {
                changeType = 'add';
                from = (optionLabels && to in optionLabels) ? optionLabels[to] : 'Added';
                to = '';
            } else if (from && !to) {
                changeType = 'delete';
                from = (optionLabels && from in optionLabels) ? optionLabels[from] : 'Removed';
                to = '';
            } else {
                from = (optionLabels && from in optionLabels) ? optionLabels[from] : 'Edited';
                to = (optionLabels && to in optionLabels) ? optionLabels[to] : 'Edited';
                if (from === 'Edited' || to === 'Edited') { // If something broke with the labels/they weren't provided, then just show Edited
                    from = 'Edited';
                    to = '';
                }
            }

            return {
                changeType: changeType,
                from: from,
                to: to,
                focusId: focusId + '-Button',
            };
        },

        mergeInputValidationWithChangeObjects(originalNesting = '', inputValidation = this.inputValidation) {
            for (const [key, value] of Object.entries(inputValidation)) {
                if (!_isPlainObject(value)) continue;

                const isField = 'validationMessage' in value;
                let nesting = key;
                if (originalNesting.length > 0) {
                    nesting = originalNesting + '.' + key;
                }

                if (isField) {
                    let changeObject = this.getNestedReviewChangesPanelItems(nesting, false);
                    if (value.validationMessage) {
                        if (changeObject) {
                            changeObject.validationError = value.validationMessage;
                        } else {
                            this.addOrUpdateReviewChangesPanelItems(nesting);
                            let fieldChangeObject = this.buildFormChange(nesting);
                            if (fieldChangeObject) {
                                let reviewChangesPanelItems = this.getNestedReviewChangesPanelItems(nesting, false, true);
                                reviewChangesPanelItems[key] = fieldChangeObject;
                            }
                        }
                    } else {
                        if (changeObject) {
                            if (this.isAddForm) {
                                this.removeFromReviewChangesPanelItems(nesting);
                            } else if (changeObject.from !== changeObject.to) {
                                changeObject.validationError = '';
                            } else {
                                this.removeFromFormDataDiffAndReviewChangesPanelItems(nesting);
                            }
                        }
                    }
                } else {
                    this.mergeInputValidationWithChangeObjects(nesting, inputValidation[key]);
                }
            }
        },
    },
};
