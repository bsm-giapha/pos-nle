import SchemaHelper from "@/helpers/SchemaHelper.js";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
const _BrightNotificationFactory = new BrightNotificationFactory();
import _cloneDeep from "lodash/cloneDeep";
import { useNavigationStore } from "@/stores/navigation";

/**
 * Handles Vue lifecycle/Vue router guards. Summary:
 *      - Handles Vue Router nevigation guards.
 *      - Will automatically handle `input` and `undo` events.
 */
export const LifecycleMixin = {
    data() {
        return {
            leaveConfirmationModal: {
                show: false,
                handleConfirm: () => {},
                handleCancel: () => {},
            },
        };
    },
    methods: {
        beforeRouteEnterGuard() {
            if (!this.userCanViewPage) {
                this.$router.push({ name: "UnAuthorized403" });
                return;
            }
            this.$nextTick(() => { // Next tick is needed here because the Root Form hasn't fully rendered yet.
                this.userIsSeeingForm = true;
                const navigation = useNavigationStore();
                this.updateNavigationOnPageLoad(navigation.updateNavigation);
                this.getFormDataFromApi();
            });
        },

        beforeRouteLeaveGuard(to, from, beforeRouteLeaveFunction = () => {}) {
            const resolveLeave = () => {
                const navigation = useNavigationStore();
                navigation.tabs = []; // When using tabs in an edit form, you NEED to clear them out or else Vue Router will get mad about missing required :publicId props
                beforeRouteLeaveFunction(to, from);
                this.handleResetForm();
                this.userIsSeeingForm = false;
                window.scrollTo(0, 0);
                return true;
            };
    
            // Show the Leave Confirmation Modal if the User needs to review something before leaving.
            if (this.changesWereMade || (this.isAddForm && !this.formDataCurrent.id)) {
                return this.leaveConfirmationModalShow()
                    .then(resolveLeave)
                    .catch(() => false);
            } else {
                return resolveLeave();
            }
        },

        leaveConfirmationModalShow() {
            return new Promise((res, rej) => {
                const resolve = () => {
                    this.leaveConfirmationModal.show = false;
                    res();
                };

                const reject = () => {
                    this.leaveConfirmationModal.show = false;
                    rej();
                };

                this.leaveConfirmationModal.show = true;
                this.leaveConfirmationModal.handleConfirm = resolve;
                this.leaveConfirmationModal.handleCancel = reject;
            });
        },

        /**
         * Whenever a Recent Change Panel emits an undo event, reset the value of the related input to its initial value.
         * @param formDataNesting
         */
        handleUndo(formDataNesting) {
            const key = formDataNesting.split('.').pop();
            const nestedInitialFormData = SchemaHelper.getDataPropertyValueByNestingString(this.formDataInitial, formDataNesting);
            const metadataForInput = SchemaHelper.getDataPropertyValueByNestingString(this.inputMetadata, formDataNesting);

            this.removeFromFormDataDiffAndReviewChangesPanelItems(formDataNesting);

            let nestedCurrentFormData = SchemaHelper.getDataPropertyValueByNestingString(this.formDataCurrent, formDataNesting, false, true);
            nestedCurrentFormData[key] = nestedInitialFormData;

            _BrightNotificationFactory.createNotification({
                type: 'info',
                icon: 'undo',
                duration: 3000,
                label: `${metadataForInput.label}`,
                subLabel: 'Changes were undone successfully.',
            });

            if (this.shouldValidate) {
                this.debouncedValidate();
            }
        },

        handleDiscardChanges() {
            this.reinitializeFormDataWithNewData(_cloneDeep(this.formDataInitial));
            if (this.isAddForm) {
                const navigation = useNavigationStore();
                this.$router.push(navigation.backBar.to); // This (hopefully) means you're using the Back Bar. Otherwise this will throw an error.
            }
        },
    },
    watch: {
        isEditForm: function(newValue) {
            let baselineSchema = (newValue) ? this.schema.createEditSchema() : this.schema.createAddSchema();
            const baseFormData = SchemaHelper.constructInitialFormDataFromSchema(baselineSchema);
            this.vue2SetFormDataToNewValue(this.baselineSchema, baselineSchema);
            this.reinitializeFormDataWithNewData(baseFormData);
        },
    },
};
