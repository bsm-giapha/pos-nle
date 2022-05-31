<template>
    <div class="TabCredentials">
        <PanelCredentialsCredit v-show="formDataCurrentOfAncestor.configurations.applicationScope === 'Pre-qualification'" v-bind="bindDescendant"/>
        <PanelPPE v-show="showPPEPanel" v-bind="bindPPE"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelCredentialsCredit from "@/views/manage/campaigns/form/tabs/credentials/PanelCredentialsCredit.vue";
import PanelPPE from "@/views/manage/campaigns/form/tabs/credentials/PanelPPE.vue";

export default {
    name: "TabCredentials",
    components: { PanelCredentialsCredit, PanelPPE },
    mixins: [FormDescendantMixin],
    computed: {
        bindPPE() {
            return {
                ...this.bindDescendant,
                isOptimalBlue: this.isOptimalBlue,
                isEllieMae: this.isEllieMae,
                isPML: this.isPML,
                isMortech: this.isMortech,
            };
        },

        // VISIBILITY //
        isOptimalBlue() {
            return this.ardentCanUpdateResource('Lender.Campaign.OptimalBlueApiPPE') || this.ardentCanUpdateResource('Lender.Campaign.OB3PPE');
        },
        isEllieMae() {
            return this.ardentCanUpdateResource('Lender.Campaign.EllieMaePPE');
        },
        isPML() {
            return this.ardentCanUpdateResource('Lender.Campaign.PMLPPE');
        },
        isMortech() {
            return this.ardentCanUpdateResource('Lender.Campaign.MortechPPE');
        },
        showPPEPanel() {
            return this.isOptimalBlue || this.isEllieMae || this.isPML || this.isMortech;
        },
    },
};
</script>
