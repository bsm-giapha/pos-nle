<template>
    <FormAddSuccessPage
        header="User added successfully"
        :sub-header="`${userFullName}'s account has been created and is ready to be used.`"
        :card-label="userFullName"
        :card-sub-label="role"
        singular-resource-label="User"
        plural-resource-label="Users"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "FormInternalUserAddSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        userFullName: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageInternalUsers';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageInternalUser';
        },
    },
};
</script>
