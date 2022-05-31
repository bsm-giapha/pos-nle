import axios from "axios";
import _merge from "lodash/merge.js";
import _cloneDeep from "lodash/cloneDeep.js";
import _debounce from "lodash/debounce.js";

export const ValidationMixin = {
    data() {
        return {
            debouncedValidate: _debounce(this.validate, 2000, { trailing: true }),
        };
    },
    computed: {
        shouldValidate() {
            return (this.isEditForm && this.formDataCurrent?.id) || (this.isAddForm && this.formWasSubmitted);
        },
        validationIsStrict() {
            return this.isAddForm || (this.isEditForm && this.formSubmissionHttpMethod.toUpperCase() === "PUT");
        },
    },
    methods: {
        validate(isSuppressedFormSubmit = false) {
            if (this.apiResourceUrl.length === 0 || !this.userIsSeeingForm) return;
            axios.post(`${this.apiResourceUrl}/validate-request`, this.getValidateRequestData()).then((response) => {
                this.handleValidateResponse(response);
                if (isSuppressedFormSubmit) {
                    if (this.isModalForm && this.isAddForm) {
                        this.formDataCurrent.id = this.uniqueIdGenerator.getUniqueIDForNewItem();
                    }
                    this.$emit('submit', _cloneDeep(this.formDataCurrent)); // TODO Not sure why but _cloneDeep() is the only way to properly emit current form data. When we go to Vue 3 try to get rid of this.
                    this.resetModalFormIfNeeded();
                }
            }).catch((error) => {
                if (!this.userIsSeeingForm) return;
                this.handleValidateResponse(error.response);
                this.handleFormSubmitError(error);
            }).finally(() => {
                this.disableSubmitButton = false;
            });
        },

        getValidateRequestData() {
            let request = {
                useStrictValidation: this.validationIsStrict,
                validationMethod: this.formSubmissionHttpMethod,
            };

            let data;
            if (this.formSubmissionHttpMethod.toUpperCase() === 'PATCH') {
                data = this.formDataDiff;
            } else {
                data = this.formDataCurrent;
            }

            let convertedData = this.getConvertedDataForApiRequest(data);
            if (this.isAddForm) {
                request.create = [convertedData];
            } else {
                request.update = [convertedData];
            }

            return request;
        },

        /**
         * Call this in validate() if you override it.
         * @param {AxiosResponse<any>} response
         */
        handleValidateResponse(response) {
            if (typeof response !== 'undefined') {
                this.upsertPermissionsFromResponse(response);
                if (this.shouldValidate) {
                    const validationRootObject = response.data['__metadata__'].validation.result[0];
                    this.vue2SetFormDataToNewValue(this.inputValidation, _merge(_cloneDeep(this.inputValidation), this.convertApiValidationFormatToClientValidationFormat(validationRootObject)));
                }
                // Forms build Change Objects to be shown on a Review Changes panel. Sub Forms do not.
                this.mergeInputValidationWithChangeObjects();
            }
        },
    },
};
