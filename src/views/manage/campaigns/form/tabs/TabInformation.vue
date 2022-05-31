<template>
    <div class="TabInformation">
        <PanelStatus v-bind="bindDescendant"/>
        <PanelAbout v-bind="bindDescendant"/>
        <PanelAssignments v-bind="bindDescendant"/>
        <PanelBranding v-bind="bindDescendant"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelStatus from "@/views/manage/campaigns/form/tabs/information/PanelStatus.vue";
import PanelAbout from "@/views/manage/campaigns/form/tabs/information/PanelAbout.vue";
import PanelAssignments from "@/views/manage/campaigns/form/tabs/information/PanelAssignments.vue";
import PanelBranding from "@/views/manage/campaigns/form/tabs/information/PanelBranding.vue";

export default {
    name: "TabInformation",
    components: { PanelStatus, PanelAbout, PanelAssignments, PanelBranding },
    mixins: [FormDescendantMixin],
};
</script>
