<template>
    <div class="FormExternalUser">
        <PanelPlatform v-bind="bindDescendant"/>
        <PanelContact v-bind="bindDescendant"/>
        <PanelCompany v-bind="bindDescendant"/>
        <PanelLicensing v-bind="bindDescendant"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelContact from "@/views/manage/external-users/form/panels/PanelContact.vue";
import PanelPlatform from "@/views/manage/external-users/form/panels/PanelPlatform.vue";
import PanelCompany from "@/views/manage/external-users/form/panels/PanelCompany.vue";
import PanelLicensing from "@/views/manage/external-users/form/panels/PanelLicensing.vue";

export default {
    name: "FormExternalUser",
    components: {
        PanelLicensing,
        PanelCompany,
        PanelPlatform,
        PanelContact,
    },
    mixins: [FormDescendantMixin],
};
</script>
