<template>
    <FormPanel v-show="userBeingEditedIsALoanOfficer && ardentCanUpdateResource('Lender.InternalUser.UserProfileCampaignAssignment')" label="Campaigns">
        <template v-slot:sub-label>
            All of the User's assigned campaigns. Note that public campaigns are not shown (because they are available to all users).
            <br><br>
            To view all of your company's available campaigns, <SmartLink href="/lender/admin/campaigns" target="_blank">click here</SmartLink>.
        </template>
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <InputCampaigns
                        v-bind="bindAncestorInput('assignments.campaigns')"
                        no-items-message="No Campaigns have been assigned to this User."
                        :all-possible-items="campaigns.map(campaign => campaign.id)"
                        :get-object-representation-of-item-by-id="getCampaignObjectById"
                        @update:modelValue="handleAncestorInput('assignments.campaigns', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import SmartLink from "@/components/navigation/SmartLink.vue";
import InputCampaigns from "@/views/manage/internal-users/form/tabs/assignments/components/InputCampaigns.vue";
import { useLenderStore } from '@/stores/lender';
import { mapState } from 'pinia';

export default {
    name: "PanelCampaigns",
    components: { InputCampaigns, SmartLink },
    mixins: [FormDescendantMixin],
    props: {
        userBeingEditedIsALoanOfficer: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState(useLenderStore, {
            campaigns: store => store.campaigns,
        }),
    },
    methods: {
        getCampaignObjectById(id) {
            let campaign = this.campaigns.find(campaign => campaign.id === id);
            return {
                id: id,
                name: campaign.information.name,
            };
        },
    },
};
</script>
