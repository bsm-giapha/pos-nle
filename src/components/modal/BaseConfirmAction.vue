<template>
    <BrightModalPopup
        id="confirmationModal"
        :close-focus-i-d="rowIDs[0] + '-Actions-Button'"
        width="medium"
        :close-label="closeLabel"
        close-button-type="secondary"
        :label="confirmationModalLabel"
        :show="showConfirmationModal"
        @closed="$emit('hide-confirmation-modal')"
    >
        <BrightRow>
            <BrightColumn>
                <div class="text-center">
                    {{ confirmationModalContent }}
                    <div v-show="!isActionInProgress && !isActionComplete && !didActionFail" class="font-bold">Are you sure you want to continue?</div>
                </div>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none">
            <BrightColumn class="text-center">
                <BrightLoader :is-loading="isActionInProgress"/>
                <BrightIcon v-show="isActionComplete" class="text-h1 text-green-500" use="check_circle"/>
                <BrightIcon v-show="didActionFail" class="text-h1 text-yellow-500" use="report_problem"/>
                <BrightButton
                    v-show="!isActionInProgress && !isActionComplete && !didActionFail"
                    class="mt-16 -mb-8"
                    full-width
                    use="primary"
                    @click="handlePerformAction"
                    @keydown.space.enter="handlePerformAction"
                >
                    {{ actionName }}
                </BrightButton>
            </BrightColumn>
        </BrightRow>
    </BrightModalPopup>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow.vue";
import { LenderConfirmAction } from "@/mixins/form/LenderConfirmAction";

export default {
    name: "BaseConfirmAction",
    components: {
        BrightButton,
        BrightColumn,
        BrightIcon,
        BrightLoader,
        BrightModalPopup,
        BrightRow,
    },
    mixins: [LenderConfirmAction], // TODO: It's important to import this mixin. It contains overrideable properties that can be utilized.
    props: {
        showConfirmationModal: {
            type: Boolean,
            default: false,
            required: false,
        },
        /**
         * This must be a unique identifier that will be used in identifying which specific action must be performed.
         */
        actionID: {
            type: String,
            default: '',
            required: true,
        },
        /**
         * This refers to the verbiage used for the modal's Action button. It can also be referenced in the modal's label and/or content, if needed.
         */
        actionName: {
            type: String,
            required: true,
        },
        confirmationModalLabel: {
            type: String,
            default: "",
            required: false,
        },
        confirmationModalContent: {
            type: String,
            default: "",
            required: false,
        },
        closeLabel: {
            type: String,
            default: "Close",
            required: false,
        },
        rowIDs: {
            type: Array,
            default: () => [],
            required: false,
        },
        isActionInProgress: {
            type: Boolean,
            default: false,
            required: false,
        },
        isActionComplete: {
            type: Boolean,
            default: false,
            required: false,
        },
        didActionFail: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    emits: ['perform-action', 'hide-confirmation-modal'],
    methods: {
        handlePerformAction() {
            const data = {
                action: this.actionID,
                rowIDs: this.rowIDs,
            };
            this.$emit('perform-action', data);
        },
    },
};
</script>
