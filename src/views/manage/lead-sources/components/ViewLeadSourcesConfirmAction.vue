<template>
    <BaseConfirmAction v-bind="confirmActionBindings" @hide-confirmation-modal="$_hideModal()"/>
</template>

<script>
import BaseConfirmAction from "@/components/modal/BaseConfirmAction.vue";

export default {
    name: "ViewLeadSourcesConfirmAction",
    components: { BaseConfirmAction },
    data() {
        return {
            showConfirmationModal: false,
            actionName: "",
            actionVerbiage: "",
            additionalActionDetails: "",
            rowIDs: [],
            leadSourceName: "",
        };
    },
    computed: {
        resourceURL() {
            return `${this.baseLenderURL}/lead-sources`;
        },

        confirmActionBindings() {
            return {
                showConfirmationModal: this.showConfirmationModal,
                actionID: this.actionID,
                actionName: this.actionName,
                confirmationModalLabel: this.confirmationModalLabel,
                confirmationModalContent: this.confirmationModalContent,
                rowIDs: this.rowIDs,
            };
        },

        isOneRowSelected() {
            return this.rowIDs ? this.rowIDs.length === 1 : false;
        },

        leadSourceNoun() {
            const leadSourceNoun = this.isOneRowSelected ? 'lead source' : 'lead sources';
            return this.leadSourceName ? this.leadSourceName : leadSourceNoun;
        },

        confirmationModalLabel() {
            return `${this.actionName}?`;
        },

        confirmationModalContent() {
            let subject = `The ${this.leadSourceNoun} selected`;
            if (this.leadSourceName) subject = `The ${this.leadSourceName} lead source`;
            return `${subject} will be ${this.actionVerbiage}. ${this.additionalActionDetails}`;
        },
    },
    methods: {
        $_showModal() {
            this.showConfirmationModal = true;
        },

        $_hideModal() {
            this.showConfirmationModal = false;
        },

        $_assignToAllLoanOfficers(ids, leadSourceName = "") {
            this.actionID = 'assignToAllLoanOfficers';
            this.actionName = `Assign ${leadSourceName} to All Loan Officers`;
            this.actionVerbiage = "assigned to all loan officers";
            this.rowIDs = ids;
            this.leadSourceName = leadSourceName;
        },

        $_removeFromAllLoanOfficers(ids, leadSourceName = "") {
            this.actionID = 'removeFromAllLoanOfficers';
            this.actionName = `Remove ${leadSourceName} from All Loan Officers`;
            this.actionVerbiage = "removed from all loan officers";
            this.rowIDs = ids;
            this.leadSourceName = leadSourceName;
        },

        $_assignToAllBranches(ids, leadSourceName = "") {
            this.actionID = 'assignToAllBranches';
            this.actionName = `Assign ${leadSourceName} to All Branches`;
            this.actionVerbiage = "assigned to all branches";
            this.rowIDs = ids;
            this.leadSourceName = leadSourceName;
        },

        $_removeFromAllBranches(ids, leadSourceName = "") {
            this.actionID = 'removeFromAllBranches';
            this.actionName = `Remove ${leadSourceName} from All Branches`;
            this.actionVerbiage = "removed from all branches";
            this.rowIDs = ids;
            this.leadSourceName = leadSourceName;
        },

        $_delete(ids, leadSourceName = "") {
            this.actionID = 'delete';
            this.actionName = `Delete ${leadSourceName}`;
            this.actionVerbiage = "deleted";
            this.additionalActionDetails = "This action cannot be undone.";
            this.rowIDs = ids;
            this.leadSourceName = leadSourceName;
        },
    },
};
</script>
