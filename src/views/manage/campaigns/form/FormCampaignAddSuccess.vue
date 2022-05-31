<template>
    <FormAddSuccessPage
        header="Campaign added successfully"
        :sub-header="`The ${campaignName} campaign has been created and is ready to be used.`"
        :card-label="campaignName"
        singular-resource-label="Campaign"
        plural-resource-label="Campaigns"
        :bind-buttons="bindButtons"
    />
</template>

<script>
import { FormAddSuccessMixin } from "@/mixins/form/FormAddSuccessMixin.js";

export default {
    name: "FormCampaignAddSuccess",
    mixins: [FormAddSuccessMixin],
    props: {
        campaignName: {
            type: String,
            required: true,
        },
    },
    computed: {
        namedRouteOfViewAllResourcesPage() {
            return 'ManageCampaigns';
        },
        baseNamedRouteOfFormPage() {
            return 'ManageCampaign';
        },
    },
};
</script>
