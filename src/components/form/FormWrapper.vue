<template>
    <div :id="id" class="FormWrapper">
        <slot></slot>

        <BaseFormReviewChangesPanel
            v-if="useReviewChangesPanel"
            v-bind="reviewChangesPanelBindings"
            @undo="handleUndo"
            @submit="handleFormSubmit"
            @discard="(isEditForm) ? showDiscardChangesModal = true : handleDiscardChanges()"
        />

        <span v-if="useDiscardChangesAndLeaveConfirmationModals">
            <FormDiscardChangesModal v-bind="discardChangesModalBindings"/>
            <FormLeaveConfirmationModal v-bind="leaveConfirmationModalBindings"/>
        </span>
    </div>
</template>

<script>
import BaseFormReviewChangesPanel from "@/components/form/base/BaseFormReviewChangesPanel.vue";
import FormDiscardChangesModal from "@/components/form/FormDiscardChangesModal.vue";
import FormLeaveConfirmationModal from "@/components/form/FormLeaveConfirmationModal.vue";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
const _BrightNotificationFactory = new BrightNotificationFactory();

/**
 * A component that handles the presentation of Forms (Edit Forms and Add Forms).
 *
 * It's essentially a wrapper that allows you to pass a Form's UI into its slot. The wrapper also provides common
 * functionality shared across forms, such as the Review Changes Panel (which has Form submission/cancel buttons in it),
 * Discard Changes Modal, and Leave Confirmation Modal.
 */
export default {
    name: "FormWrapper",
    components: {
        FormLeaveConfirmationModal,
        FormDiscardChangesModal,
        BaseFormReviewChangesPanel,
    },
    props: {
        /** Used to identify form-specific DOM elements. Required for accessibility. */
        id: {
            type: String,
            required: true,
        },

        /** Edit Forms and Add Forms have slightly different displays */
        isEditForm: {
            type: Boolean,
            required: true,
        },

        /** The submit button needs to be controlled based on form state. */
        disableSubmitButton: {
            type: Boolean,
            required: true,
        },

        /**
         * Will control the display of the Review Changes Panel.
         * If you use this, then you must provide a value for the `useReviewChangesPanel` prop as well.
         */
        useReviewChangesPanel: {
            type: Boolean,
            required: true,
        },

        /** Will control the display of the Discard Changes and Leave Confirmation Modals */
        useDiscardChangesAndLeaveConfirmationModals: {
            type: Boolean,
            required: true,
        },

        /**
         * The items that get shown when using the Review Changes panel.
         * If you use this, then you must provide set the `useReviewChangesPanel` prop to `true`.
         */
        reviewChangesPanelItems: {
            type: Object,
            required: false,
            default: () => {},
        },

        /** Whether to show the Leave Confirmation Modal. */
        leaveConfirmationModalShow: {
            type: Boolean,
            required: true,
        },

        /** The handler for when the User confirms that they want to leave the Form. */
        leaveConfirmationModalHandleConfirm: {
            type: Function,
            required: true,
        },

        /** The handler for when the User decides to not leave the Form. */
        leaveConfirmationModalHandleCancel: {
            type: Function,
            required: true,
        },

        /** The handler for when the User submits the Form. */
        handleFormSubmit: {
            type: Function,
            required: true,
            default: () => {},
        },

        /** The handler for when the User discards all changes in the Form. */
        handleDiscardChanges: {
            type: Function,
            required: true,
            default: () => {},
        },

        /**
         * The handler for when the User undos a specific input in the Form. There will be a 'formDataNesting' string
         * passed as an argument to this function prop, which will allow you to act upon the undo operation.
         */
        handleUndo: {
            type: Function,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            showDiscardChangesModal: false,
        };
    },
    computed: {
        reviewChangesPanelBindings() {
            return {
                ref: 'reviewChangesPanel',
                changes: this.reviewChangesPanelItems,
                isEditForm: this.isEditForm,
                disableSubmitButton: this.disableSubmitButton,
            };
        },

        discardChangesModalBindings() {
            return {
                id: `${this.id}-DiscardChangesModal`,
                show: this.showDiscardChangesModal,
                handleConfirm: () => {
                    _BrightNotificationFactory.createNotification({
                        type: 'info',
                        icon: 'delete_sweep',
                        duration: 4000,
                        label: 'Discard Changes',
                        subLabel: 'Changes were discarded.',
                    });
                    this.showDiscardChangesModal = false;
                    this.handleDiscardChanges();
                },
                handleCancel: () => this.showDiscardChangesModal = false,
            };
        },

        leaveConfirmationModalBindings() {
            return {
                id: `${this.id}-LeaveConfirmationModal`,
                show: this.leaveConfirmationModalShow,
                handleConfirm: this.leaveConfirmationModalHandleConfirm,
                handleCancel: this.leaveConfirmationModalHandleCancel,
            };
        },
    },
};
</script>
