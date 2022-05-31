<template>
    <div class="TabAccount">
        <PanelProfile v-bind="bindDescendant"/>
        <PanelContact v-bind="bindDescendant"/>
        <PanelPlatform v-bind="bindDescendant"/>
        <PanelCommunication v-bind="bindDescendant"/>
        <PanelAvailability v-bind="bindDescendant"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelProfile from "@/views/manage/internal-users/form/tabs/account/PanelProfile.vue";
import PanelContact from "@/views/manage/internal-users/form/tabs/account/PanelContact.vue";
import PanelPlatform from "@/views/manage/internal-users/form/tabs/account/PanelPlatform.vue";
import PanelCommunication from "@/views/manage/internal-users/form/tabs/account/PanelCommunication.vue";
import PanelAvailability from "@/views/manage/internal-users/form/tabs/account/PanelAvailability.vue";

export default {
    name: "TabAccount",
    components: { PanelAvailability, PanelCommunication, PanelPlatform, PanelContact, PanelProfile },
    mixins: [FormDescendantMixin],
};
</script>
