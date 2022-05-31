import { useLenderStore } from "@/stores/lender";
import axios from "axios";
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";

export const FormLoanConditionMixin = {
    mixins: [FormAncestorMixin],
    methods: {
        fetchRequiredDataForFormAsPromise() {
            const lender = useLenderStore();
            let promises = [];

            const fetchBranches = lender.fetchBranches();
            if (lender.branches.length === 0) promises.push(fetchBranches);

            const fetchFormFields = axios.get(`${this.lenderBaseUrl}/loan-conditions/form-fields`).then(response => {
                response = response.data.data;
                this.formFields = {
                    ...this.formFields,
                    ...response,
                };
            });
            if (Object.keys(this.formFields).length === 0) promises.push(fetchFormFields);

            return promises;
        },

        updateSchemaWithFetchedRequiredData() {
            this.updateBaselineSchema('information.type', 'options', this.formFields.conditionTypes);
            this.updateBaselineSchema('information.docType', 'options', this.formFields.docTypes);
            this.updateBaselineSchema('information.resourceFile', 'options', this.formFields.resourceFiles);
        },

        updateNavigationOnPageLoad(updateNavigation) {
            const formType = this.isEditForm ? 'Edit' : 'Add';
            updateNavigation({
                pageName: `${formType} Loan Condition`,
                breadcrumbs: {
                    to: { name: 'ManageLoanConditions' },
                    label: 'Manage > Loan Conditions',
                },
                tabs: [
                    { label: 'Information', to: { name: `ManageLoanCondition${formType}TabInformation` } },
                    { label: 'Automatic Triggers', to: { name: `ManageLoanCondition${formType}TabAutomaticTriggers` } },
                ],
                backBar: {
                    to: { name: 'ManageLoanConditions' },
                    label: 'Loan Conditions',
                },
                localActions: [],
            });
        },
    },
};
