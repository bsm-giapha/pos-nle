<template>
    <FormAddSuccessPage
        header="Branch added successfully"
        :sub-header="`${branchPreferredDisplayName} has been created and is ready to be used.`"
        :card-label="branchPreferredDisplayName"
        :card-sub-label="branchName"
        singular-resource-label="Branch"
        plural-resource-label="Branches"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "FormBranchAddSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        branchName: {
            type: String,
            required: true,
        },
        branchPreferredDisplayName: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageBranches';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageBranch';
        },
    },
};
</script>
