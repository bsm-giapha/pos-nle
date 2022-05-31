<template>
    <FormAddSuccessPage
        header="Loan Condition added successfully"
        :sub-header="`The Loan Condition has been created and is ready to be used.`"
        :card-label="conditionName"
        :card-sub-label="conditionDocType"
        singular-resource-label="Loan Condition"
        plural-resource-label="Loan Conditions"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "FormLoanConditionAddSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        conditionName: {
            type: String,
            required: true,
        },
        conditionDocType: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageLoanConditions';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageLoanCondition';
        },
    },
};
</script>
