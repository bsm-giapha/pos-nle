import axios from "axios";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
import _cloneDeep from "lodash/cloneDeep.js";
import _isPlainObject from "lodash/isPlainObject.js";
import SchemaHelper from "@/helpers/SchemaHelper.js";
import UniqueIDGenerator from "@/classes/form/uniqueIDGenerator/UniqueIDGenerator.js";
import { useNavigationStore } from "@/stores/navigation";
const _BrightNotificationFactory = new BrightNotificationFactory();

export const InternalFormDetailsMixin = {
    data() {
        return {
            /**
             * The baseline schema for all form-related objects
             * (i.e. formDataCurrent, formDataInitial, formDataDiff, inputValidation, inputMetadata).
             *
             * This can be modified at runtime via the `updateBaselineSchema` method.
             */
            baselineSchema: {},

            /** The initial data for the form. Previously known as "Old Form Data" */
            formDataInitial: {},

            /** The current data for the form. Previously known as "New Form Data" */
            formDataCurrent: {},

            /** Any required fields to render the form. These are often dynamic and vary per lender/resource. */
            formFields: {},

            /** The difference between the Initial Form Data and the Current Form Data */
            formDataDiff: {},

            /** The input validation object that controls the granular validation feature of each input */
            inputValidation: {},

            /** The processed Metadata for Inputs. This is derived from Schema. */
            inputMetadata: {},

            /** Internal Detail: Whether the form was submitted or not. Will affect automatic validation behavior. */
            formWasSubmitted: false,

            /** Internal Detail: Used to suppress false-positives in error messages when a User leaves a form. */
            userIsSeeingForm: false,

            /** Internal Detail: Whether the Form's submit button in the <FormButtons> component is disabled */
            disableSubmitButton: false,

            /**
             * Internal Detail: The Form will keep track of the time that has elapsed since the last request for Form Data.
             * If less than X minutes have passed since the last fetch, then it will not wait for form fields to be
             * obtained from the API.
             */
            timestampWhenRequiredFormDataWasLastFetched: 0,

            /**
             * Internal Detail: Modal Forms have slightly different workflows than normal Full Page Forms, so this is
             * needed to be able to distinguish between the two.
             */
            isModalForm: false,

            /**
             * Internal Detail: Some Add Forms need to make use of a local unique ID generator because they don't submit
             * to remote API endpoints (which would have otherwise returned a unique ID from the database).
             */
            uniqueIdGenerator: new UniqueIDGenerator(String(Date.now())),
        };
    },
    computed: {
        /**
         * Makes use of the `timestampWhenRequiredFormDataWasLastFetched` data value to determine whether the Form
         * should wait for all form data to be obtained before letting the User interact with the form.
         */
        shouldWaitForRequiredFormDataToFinishFetching() {
            const MINUTE_IN_MILLISECONDS = 60000;
            return Date.now() - (5 * MINUTE_IN_MILLISECONDS) > this.timestampWhenRequiredFormDataWasLastFetched;
        },
    },
    methods: {
        getInitialDataFromSchema(schema, formType) {
            if (formType.toLowerCase() === 'edit' && !('createEditSchema' in schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Edit Form's schema does not have an 'createEditSchema()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            } else if (!('createAddSchema' in schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Add Form's schema does not have an 'createAddSchema()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            }

            let baselineSchema = (formType.toLowerCase() === 'edit') ? schema.createEditSchema() : schema.createAddSchema();
            const baseFormData = SchemaHelper.constructInitialFormDataFromSchema(baselineSchema);
            return {
                schema: schema,
                baselineSchema: baselineSchema,
                formDataInitial: _cloneDeep(baseFormData),
                formDataCurrent: _cloneDeep(baseFormData),
                inputValidation: SchemaHelper.constructInitialInputValidationFromFormData(baseFormData),
                inputMetadata: SchemaHelper.constructInitialInputMetadataFromSchema(baselineSchema),
            };
        },

        /**
         * Call this when you need to restart/refresh form data (i.e. this.formDataCurrent and/or this.formDataInitial). It will trigger
         * essential updates for the Mixin to function correctly after the update.
         * @param formData
         */
        reinitializeFormDataWithNewData(formData) {
            const freshInitialFormData = this.getBaselineFormDataFromSchema();
            SchemaHelper.replaceValuesInFormData(formData, freshInitialFormData); // This will normalize the new form data

            this.vue2SetFormDataToNewValue(this.formDataInitial, formData);
            this.vue2SetFormDataToNewValue(this.formDataCurrent, formData);
            this.vue2ClearOutFormDataDiffAndChangeObjects();
            this.vue2ResetInputValidation(freshInitialFormData);
        },

        /**
         * Resets the ENTIRE form (not just the data). This will make the Form behave as if the User
         * just navigated to the Form and it will reset state.
         */
        handleResetForm() {
            this.formWasSubmitted = false;
            const freshInitialFormData = this.getBaselineFormDataFromSchema();

            this.vue2SetFormDataToNewValue(this.formDataInitial, freshInitialFormData);
            this.vue2SetFormDataToNewValue(this.formDataCurrent, freshInitialFormData);
            this.vue2ClearOutFormDataDiffAndChangeObjects();
            this.vue2ResetInputValidation(freshInitialFormData);
        },

        getBaselineFormDataFromSchema() {
            if (this.isEditForm && !('createEditSchema' in this.schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Edit Form's schema does not have an 'createEditSchema()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            } else if (!('createAddSchema' in this.schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Add Form's schema does not have an 'createAddSchema()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            }
            return SchemaHelper.constructInitialFormDataFromSchema(this.baselineSchema);
        },

        vue2ClearOutFormDataDiffAndChangeObjects() {
            Object.keys(this.formDataDiff).forEach((key) => {
                delete this.formDataDiff[key];
            });
            Object.keys(this.reviewChangesPanelItems).forEach((key) => {
                delete this.reviewChangesPanelItems[key];
            });
        },

        getFormDataFromApi() {
            const navigation = useNavigationStore();
            this.formIsLoading = true;
            if (!this.isModalForm) {
                navigation.startLoadingAnimation();
            }
            let allPromises = [];

            if (this.isEditForm && this.getFormDataFromApiResourceUrl) {
                allPromises.push(axios.get(`${this.apiResourceUrl}?fields=adminFields`));
            } else if (this.isAddForm) {
                this.handleResetForm();
            }
            let requiredDataForFormPromises = this.fetchRequiredDataForFormAsPromise();

            if (requiredDataForFormPromises.length > 0 && this.shouldWaitForRequiredFormDataToFinishFetching) {
                allPromises.push(Promise.all(requiredDataForFormPromises));
            }

            Promise.all(allPromises).then((response) => {
                this.timestampWhenRequiredFormDataWasLastFetched = Date.now();
                this.updateSchemaWithFetchedRequiredData();
                if (this.isEditForm && this.getFormDataFromApiResourceUrl) {
                    let data = this.getDataFromResponse(response);
                    let id = data.id;
                    let convertedData = this.convertApiDataFormatToClientDataFormat(data);
                    convertedData.id = id;
                    this.reinitializeFormDataWithNewData(convertedData);
                }
            }).catch((error) => {
                console.error(error);
            }).then(() => {
                let finishUp = () => {
                    const navigation = useNavigationStore();
                    this.updateNavigationAfterFetchingDataFromApi(navigation);
                    this.formIsLoading = false;
                    if (!this.isModalForm) {
                        navigation.stopLoadingAnimation();
                    }
                };
                if (this.isAddForm && !this.shouldWaitForRequiredFormDataToFinishFetching) {
                    // Add Forms without promises to fulfill load TOO quickly and are jarring on the UX. This introduces a small, artificial load to make the User feel like something substantial is happening.
                    window.setTimeout(finishUp, 500);
                } else {
                    finishUp();
                }
            });
        },

        /**
         * Override this if needed, but if you do, good luck.
         */
        handleFormSubmit() {
            if (!this.userIsSeeingForm) return;

            this.formWasSubmitted = true;
            this.disableSubmitButton = true;

            if (this.suppressFormSubmission) {
                this.validate(true);
            } else {
                let data = {};
                if (this.isEditForm) {
                    let convertedData;
                    if (this.formSubmissionHttpMethod.toUpperCase() === 'PATCH') {
                        convertedData = this.getConvertedDataForApiRequest(this.formDataDiff);
                    } else {
                        convertedData = this.getConvertedDataForApiRequest(this.formDataCurrent);
                    }
                    data.update = [convertedData];
                } else {
                    data.create = [this.getConvertedDataForApiRequest(this.formDataCurrent)];
                }

                axios({
                    method: this.formSubmissionHttpMethod.toUpperCase(),
                    url: this.apiResourceUrl,
                    data: data,
                }).then((response) => {
                    const navigation = useNavigationStore();
                    _BrightNotificationFactory.createNotification({
                        type: 'success',
                        icon: 'check_circle',
                        duration: 4000,
                        label: 'Save Successful',
                        subLabel: 'Changes were saved successfully.',
                    });
                    if (this.isAddForm) {
                        const id = response.data.data[0];
                        this.formDataCurrent.id = id;
                    }
                    this.reinitializeFormDataWithNewData(this.formDataCurrent);
                    this.$emit('submit', this.formDataCurrent);
                    this.upsertPermissionsFromResponse(response);
                    this.formSubmitSuccessHandler(navigation);
                    this.resetModalFormIfNeeded();
                }).catch((error) => {
                    console.error(error);
                    if (!this.userIsSeeingForm) return;
                    if (error.response.status === 400) {
                        _BrightNotificationFactory.createNotification({
                            type: 'error',
                            icon: 'warning',
                            duration: 7500,
                            label: 'Validation Error',
                            subLabel: 'There was a validation error. Check it out and see what went wrong.',
                        });
                        this.handleValidateResponse(error.response);
                    }
                    this.upsertPermissionsFromResponse(error.response);
                    this.handleFormSubmitError(error);
                }).finally(() => {
                    this.disableSubmitButton = false;
                });
            }
        },

        /**
         * Override this if needed to respond to errors in a special way.
         * @param {Object} error
         */
        // eslint-disable-next-line no-unused-vars
        handleFormSubmitError(error) {
            this.$emit('error', error);
        },

        /**
         * Will recursively remove undefined values from the given data object
         * @param data
         */
        getConvertedDataForApiRequest(data) {
            let convertedData = this.convertClientDataFormatToApiDataFormat(_cloneDeep(data));

            let removeUndefinedValuesFromObjectAndReturnNumberOfKeysLeftInObject = (obj) => {
                for (const [key, value] of Object.entries(obj)) {
                    if (typeof value === 'undefined') {
                        delete obj[key];
                    } else if (_isPlainObject(value)) {
                        let keysLeftInObject = removeUndefinedValuesFromObjectAndReturnNumberOfKeysLeftInObject(value);
                        if (keysLeftInObject === 0) delete obj[key];
                    }
                }
                return Object.keys(obj).length;
            };
            removeUndefinedValuesFromObjectAndReturnNumberOfKeysLeftInObject(convertedData);
            
            if (this.isEditForm) {
                convertedData.id = this.formDataInitial.id;
            } else if (this.isAddForm && 'id' in convertedData) {
                delete convertedData.id; // Need to remove this for Add Forms. Add Forms should not submit any IDs to the backend.
            }
            
            return convertedData;
        },
        /**
         * Calls the Schema's convertApiDataFormatToClientDataFormat() function. This must be defined at the Schema level.
         *
         * Converts the API data format to the client's data format. This is specifically concerned about the structure
         * of the data. A common situation is that we'll sometimes need to groom API data and remove unneeded data
         * (like names of objects/resources and other "noise" data for the form).
         */
        convertApiDataFormatToClientDataFormat(data) {
            if (!('convertApiDataFormatToClientDataFormat' in this.schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Edit Form's schema does not have an 'convertApiDataFormatToClientDataFormat()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            }
            let convertedData;
            try {
                convertedData = this.schema.convertApiDataFormatToClientDataFormat(data, this.isAddForm, this.formFields);
            } catch (e) {
                console.error(`Root Form Error [id='${this.id}']: Could not convert API's Data Format to Client's Data Format (isAddForm='${this.isAddForm}').\n\nPossible Solution: Ensure that the API's Data Format is able to be converted to the Client's Data Format. See below for the contents of the API Data Format and Failed Client Data Format at runtime. Look for any 'undefined' or unexpected values in the Failed Client Data Format.`);
                console.error('Error Message:');
                console.error(e);
                console.error('API Validation Format:');
                console.error(data);
                console.error('Failed Client Validation Format:');
                console.error(convertedData);
                
                this.throwFatalException();
            }
            return convertedData;
        },
        /**
         * Calls the Schema's convertApiValidationFormatToClientValidationFormat() function. This must be defined at the Schema level.
         *
         * Converts the API validation format to the client's validation format. This is specifically concerned about the structure
         * of the Input Validation object. Sometimes, this will be different than the Data Format (i.e. what's defined in
         * convertApiDataFormatToClientDataFormat(), so you can adjust here as needed.
         */
        convertApiValidationFormatToClientValidationFormat(data) {
            if (!('convertApiValidationFormatToClientValidationFormat' in this.schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Edit Form's schema does not have an 'convertApiValidationFormatToClientValidationFormat()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            }
            let convertedData;
            try {
                convertedData = this.schema.convertApiValidationFormatToClientValidationFormat(_cloneDeep(data), this.isAddForm);
                let checkForUndefinedValuesInObject = (obj) => {
                    for (const [key, value] of Object.entries(obj)) {
                        if (typeof value === 'undefined') {
                            throw `convertApiValidationFormatToClientValidationFormat Error: A value was undefined (key='${key}'). Input Validation objects can never be undefined.').`;
                        } else if (_isPlainObject(value)) {
                            checkForUndefinedValuesInObject(value);
                        }
                    }
                };
                checkForUndefinedValuesInObject(convertedData);
            } catch (e) {
                console.error(`Root Form Error [id='${this.id}']: Could not convert API's Validation Format to Client's Validation Format (isAddForm='${this.isAddForm}').\n\nPossible Solution: Ensure that the API's Validation Format is able to be converted to the Client's Validation Format. See below for the contents of the API Validation Format and Failed Client Validation Format at runtime. Look for any 'undefined' values, primitives, and objects that are not Validation Objects in the Failed Client Validation Format. For reference, Validation Objects have a shape of { validationType: 'none|error', validationMessage: '' }.`);
                console.error('Error Message:');
                console.error(e);
                console.error('API Validation Format:');
                console.error(data);
                console.error('Failed Client Validation Format:');
                console.error(convertedData);
                this.throwFatalException();
            }
            return convertedData;
        },

        /** Converts the client format to the expected API format. */
        convertClientDataFormatToApiDataFormat(data) {
            if (!('convertClientDataFormatToApiDataFormat' in this.schema)) {
                console.error(`Root Form Error [id='${this.id}']: The Edit Form's schema does not have an 'convertClientDataFormatToApiDataFormat()' method defined.\n\nPossible Solution: Define this method in the form's schema and/or double-check that you're using the right schema.`);
                this.throwFatalException();
            }
            let convertedData;
            try {
                convertedData = this.schema.convertClientDataFormatToApiDataFormat(data, this.isAddForm);
            } catch (e) {
                console.error(`Root Form Error [id='${this.id}']: Could not convert Client's Data Format to API's Data Format (isAddForm='${this.isAddForm}').\n\nPossible Solution: Ensure that the Client's Data Format is able to be converted to the API's Data Format. See below for the contents of the Client Data Format and Failed API Data Format at runtime. Look for any 'undefined' or unexpected values in the Failed Client Data Format.`);
                console.error('Error Message:');
                console.error(e);
                console.error('API Validation Format:');
                console.error(data);
                console.error('Failed Client Validation Format:');
                console.error(convertedData);
                
                this.throwFatalException();
            }
            return convertedData;
        },
        vue2SetFormDataToNewValue(targetFormData, newValue) {
            newValue = _cloneDeep(newValue);

            // First, remove all unneeded keys.
            Object.keys(targetFormData).forEach((key) => {
                if (!(key in newValue)) {
                    delete targetFormData[key];
                }
            });
            // Then set the remaining keys.
            for (const [key, value] of Object.entries(newValue)) {
                if (key in targetFormData) {
                    targetFormData[key] = value;
                }
            }
        },

        vue2ResetInputValidation(freshInitialFormData) {
            const freshInputValidation = SchemaHelper.constructInitialInputValidationFromFormData(freshInitialFormData);
            this.vue2SetFormDataToNewValue(this.inputValidation, freshInputValidation);
        },

        /**
         * Modal Forms need to do things.
         */
        resetModalFormIfNeeded() {
            if (this.isModalForm) {
                this.handleModalClose(); // This is only defined in the FormAncestorModalMixin
            }
        },

        throwFatalException() {
            _BrightNotificationFactory.createNotification({
                type: 'error',
                icon: 'warning',
                duration: 10000,
                label: 'Runtime Error',
                subLabel: 'The requested page could not be loaded at this time. Please try again and/or refresh the page. If this issue persists, please contact technical support.',
            });
            throw 'FormAncestorMixinFatalException';
        },
    },
    watch: {
        /**
         * Any modification to the Baseline Schema will trigger a rebuild of inputMetadata.
         */
        baselineSchema: {
            deep: true,
            handler: function(newValue) {
                this.vue2SetFormDataToNewValue(this.inputMetadata, SchemaHelper.constructInitialInputMetadataFromSchema(newValue));
            },
        },
    },
};
