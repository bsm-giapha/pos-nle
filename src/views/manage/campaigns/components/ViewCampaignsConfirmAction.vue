<template>
    <BaseConfirmAction
        v-bind="confirmActionBindings"
        @hide-confirmation-modal="$_hideModal()"
        @perform-action="performAction($event)"
    />
</template>

<script>
import BaseConfirmAction from "@/components/modal/BaseConfirmAction.vue";
import axios from "axios";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "ViewCampaignsConfirmAction",
    components: { BaseConfirmAction },
    emits: ['action-complete'],
    data() {
        return {
            showConfirmationModal: false,
            actionName: "",
            actionVerbiage: "",
            additionalActionDetails: "",
            rowIDs: [],
            campaignName: "",
            isActionInProgress: false,
            isActionComplete: false,
            didActionFail: false,
        };
    },
    computed: {
        resourceURL() {
            const lender = useLenderStore();
            return `${lender.baseLenderURL}/campaigns`;
        },

        confirmActionBindings() {
            return {
                showConfirmationModal: this.showConfirmationModal,
                actionID: this.actionID,
                actionName: this.actionName,
                confirmationModalLabel: this.confirmationModalLabel,
                confirmationModalContent: this.confirmationModalContent,
                closeLabel: this.closeLabel,
                rowIDs: this.rowIDs,
                isActionInProgress: this.isActionInProgress,
                isActionComplete: this.isActionComplete,
                didActionFail: this.didActionFail,
            };
        },

        isOneRowSelected() {
            return this.rowIDs ? this.rowIDs.length === 1 : false;
        },

        campaignNoun() {
            const campaignNoun = this.isOneRowSelected ? 'campaign' : 'campaigns';
            return this.campaignName ? this.campaignName : campaignNoun;
        },

        confirmationModalLabel() {
            if (this.isActionInProgress) return `Loading...`;
            if (this.isActionComplete) return `Success!`;
            if (this.didActionFail) return `Cannot ${this.actionName.toLowerCase()} campaign at this time`;

            if (this.campaignName) return `${this.actionName} ${this.campaignName}?`;
            return `${this.actionName} ${this.isOneRowSelected ? ' this ' : ' these '} ${this.campaignNoun}?`;
        },

        confirmationModalContent() {
            let subject = `The ${this.campaignNoun} selected`;
            if (this.campaignName) subject = `The ${this.campaignName} campaign`;

            if (this.isActionInProgress) return '';
            if (this.isActionComplete) return `The ${this.actionName} action has been applied.`;
            if (this.didActionFail) return `Please contact customer support.`;

            return `${subject} will be ${this.actionVerbiage}. ${this.additionalActionDetails}`;
        },

        closeLabel() {
            if (this.isActionInProgress || this.isActionComplete || this.didActionFail) return "Close";
            return "Cancel";
        },
    },
    methods: {
        performAction(data) {
            let requests = [];

            switch (data.action) {
                case 'clone':
                    requests.push(this.postCampaigns(data));
                    break;
                case 'delete':
                    requests.push(this.deleteCampaigns());
                    break;
                default:
                    requests.push(this.patchCampaigns(data));
                    break;
            }

            Promise.all(requests)
                .then(() => {
                    this.isActionComplete = true;
                }).catch((error) => {
                    console.error(error);
                    this.didActionFail = true;
                }).finally(() => {
                    this.isActionInProgress = false;
                });
            this.isActionInProgress = true;
        },

        postCampaigns(data) {
            if (this.rowIDs.length === 1) {
                return axios.post(`${this.resourceURL}/${this.rowIDs[0]}/${data.action}`);
            }
            return "";
        },

        deleteCampaigns() {
            if (this.rowIDs.length === 1) {
                return axios.delete(`${this.resourceURL}/${this.rowIDs[0]}`);
            }
            return false;
        },

        patchCampaigns(data) {
            return axios.patch(this.resourceURL, this.getPatchRequestData(data));
        },

        getPatchRequestData(data) {
            const action = data.action;
            const rowIDs = data.rowIDs;

            let campaignUpdateData = [];
            let dataObject = {
                update: campaignUpdateData,
            };

            if (rowIDs.length) {
                rowIDs.forEach(rowID => {
                    const individualCampaignData = {
                        id: this.getRowID(rowID),
                        information: {},
                    };

                    individualCampaignData.information.isActive = action === 'resume';

                    campaignUpdateData.push(individualCampaignData);
                });
            }
            return dataObject;
        },

        /**
       * Ensure the rowID obtained from the BrightTable consists of the ID ONLY and not extra, unnecessary identifiers.
       * @param rowID
       * @returns string
       */
        getRowID(rowID) {
            if (rowID.includes('Row')) {
                return rowID.split('Row')[1];
            }
            return rowID;
        },

        resetModal() {
            this.isActionInProgress = false;
            this.isActionComplete = false;
            this.didActionFail = false;
        },

        $_showModal() {
            this.showConfirmationModal = true;
        },

        $_hideModal() {
            this.showConfirmationModal = false;

            if (this.isActionComplete) {
                this.$emit('action-complete');
            }

            // The modal resets too quickly. Delay this a bit.
            window.setTimeout(() => {
                this.resetModal();
            }, 500);
        },

        $_suspendCampaign(ids, campaignName = "") {
            this.actionID = "suspend";
            this.actionName = "Suspend";
            this.actionVerbiage = "marked as inactive";
            this.additionalActionDetails = "Existing links will be treated as normal non-campaign links. Campaigns can be marked as active again at a later date.";
            this.rowIDs = ids;
            this.campaignName = campaignName;
        },

        $_resumeCampaign(ids, campaignName = "") {
            this.actionID = "resume";
            this.actionName = "Resume";
            this.actionVerbiage = "marked as active";
            this.additionalActionDetails = "";
            this.rowIDs = ids;
            this.campaignName = campaignName;
        },

        $_cloneCampaign(ids, campaignName = "") {
            this.actionID = "clone";
            this.actionName = "Clone";
            this.actionVerbiage = "cloned";
            this.additionalActionDetails = "";
            this.rowIDs = ids;
            this.campaignName = campaignName;
        },

        $_deleteCampaign(ids, campaignName = "") {
            this.actionID = "delete";
            this.actionName = "Delete";
            this.actionVerbiage = "removed";
            this.additionalActionDetails = "This action cannot be undone.";
            this.rowIDs = ids;
            this.campaignName = campaignName;
        },
    },
};
</script>
