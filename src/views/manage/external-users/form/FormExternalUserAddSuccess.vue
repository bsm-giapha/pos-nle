<template>
    <FormAddSuccessPage
        header="User added successfully"
        :sub-header="`${userFullName}'s account has been created and is ready to be used.`"
        :card-label="userFullName"
        :card-sub-label="`${userAgentType} at ${company}`"
        singular-resource-label="User"
        plural-resource-label="Users"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "PageExternalUserAddSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        company: {
            type: String,
            required: true,
        },
        userFullName: {
            type: String,
            required: true,
        },
        userAgentType: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageExternalUsers';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageExternalUser';
        },
    },
};
</script>
