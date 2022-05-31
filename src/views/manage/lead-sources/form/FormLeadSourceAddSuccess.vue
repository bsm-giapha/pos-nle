<template>
    <FormAddSuccessPage
        header="Lead Source added successfully"
        :sub-header="`${leadSourceName} has been created and is ready to be used.`"
        :card-label="leadSourceName"
        :card-sub-label="leadSourceValue"
        singular-resource-label="Lead Source"
        plural-resource-label="Lead Sources"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "AddLeadSourceSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        leadSourceName: {
            type: String,
            required: true,
        },
        leadSourceValue: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageLeadSources';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageLeadSource';
        },
    },
};
</script>
