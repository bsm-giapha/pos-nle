<template>
    <FormAddSuccessPage
        header="Team added successfully"
        :sub-header="`${teamName} has been created and is ready to be used.`"
        :card-label="teamName"
        :card-sub-label="description"
        singular-resource-label="Team"
        plural-resource-label="Teams"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "AddTeamSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        teamName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageTeams';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageTeam';
        },
    },
};
</script>
