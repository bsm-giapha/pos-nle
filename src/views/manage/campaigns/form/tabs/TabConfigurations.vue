<template>
    <div class="TabConfigurations">
        <PanelCampaign v-bind="bindDescendant"/>
        <PanelApplication v-bind="bindDescendant"/>
        <PanelAssets v-bind="bindDescendant"/>
        <PanelAUS v-bind="bindDescendant"/>
        <PanelConditions v-bind="bindDescendant"/>
        <PanelConfigurationsCredit v-bind="bindDescendant"/>
        <PanelEmployer v-bind="bindDescendant"/>
        <PanelIncomeAndExpenses v-bind="bindDescendant"/>
        <PanelLiabilities v-bind="bindDescendant"/>
        <PanelLOS v-bind="bindDescendant"/>
        <PanelProductAndPricing v-bind="bindDescendant"/>
        <PanelProperty v-bind="bindDescendant"/>
        <PanelVerificationAndImportOfData v-bind="bindDescendant"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelCampaign from "@/views/manage/campaigns/form/tabs/configurations/PanelCampaign.vue";
import PanelApplication from "@/views/manage/campaigns/form/tabs/configurations/PanelApplication.vue";
import PanelAssets from "@/views/manage/campaigns/form/tabs/configurations/PanelAssets.vue";
import PanelAUS from "@/views/manage/campaigns/form/tabs/configurations/PanelAUS.vue";
import PanelConditions from "@/views/manage/campaigns/form/tabs/configurations/PanelConditions.vue";
import PanelConfigurationsCredit from "@/views/manage/campaigns/form/tabs/configurations/PanelConfigurationsCredit.vue";
import PanelEmployer from "@/views/manage/campaigns/form/tabs/configurations/PanelEmployer.vue";
import PanelIncomeAndExpenses from "@/views/manage/campaigns/form/tabs/configurations/PanelIncomeAndExpenses.vue";
import PanelLiabilities from "@/views/manage/campaigns/form/tabs/configurations/PanelLiabilities.vue";
import PanelLOS from "@/views/manage/campaigns/form/tabs/configurations/PanelLOS.vue";
import PanelProductAndPricing from "@/views/manage/campaigns/form/tabs/configurations/PanelProductAndPricing.vue";
import PanelProperty from "@/views/manage/campaigns/form/tabs/configurations/PanelProperty.vue";
import PanelVerificationAndImportOfData from "@/views/manage/campaigns/form/tabs/configurations/PanelVerificationAndImportOfData.vue";

export default {
    name: "TabConfigurations",
    components: { PanelCampaign, PanelApplication, PanelAssets, PanelAUS, PanelConditions, PanelConfigurationsCredit, PanelEmployer, PanelIncomeAndExpenses, PanelLiabilities, PanelLOS, PanelProductAndPricing, PanelProperty, PanelVerificationAndImportOfData },
    mixins: [FormDescendantMixin],
};
</script>
