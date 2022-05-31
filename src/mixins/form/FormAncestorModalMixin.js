import FormModalPopout from "@/components/form/FormModalPopout.vue";
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";

/**
 * A mixin that provides useful Modal Form-specific things (in addition to all of the things provided in the
 * FormAncestorMixin).
 *
 * Tip: You will almost always use either the FormModalPopout or FormModalPopup components in the component that
 * uses this mixin.
 *
 * Tip: A component that uses this mixin is often a child of another component that uses the FormDescendantInputListMixin.
 *
 * Note the use of the following JSDoc block tags in this Mixin's values:
 *      @required = You MUST override this in your Form.
 *      @optional = You can optionally override this in your Form.
 *      @use = You can/should use this in your Form. Often times, this will be used for bindings/event listeners.
 *      @convenience = Useful fields/methods that make Forms easier to manage and more convenient.
 */
export const FormAncestorModalMixin = {
    components: { FormModalPopout },
    mixins: [FormAncestorMixin],
    data() {
        return {
            isModalForm: true,
        };
    },
    props: {
        /** The type of form that this Form should be. Must be either 'edit' or 'add'. */
        formType: {
            type: String,
            required: true,
            validator: function(value) {
                return ['edit', 'add'].includes(value);
            },
        },

        /**
         * The singular label for the resource being worked with.
         * For example, if you were dealing State Licenses, then you would pass 'State License' here.
         *
         * Other examples:
         *      - Users => User
         *      - Geese => Goose
         *      - Elves => Elf
         *      - Boxes => Box
         *      - And so forth. Just google something if you don't know the Singular form of a Plural word.
         */
        singularResourceLabel: {
            type: String,
            required: true,
        },

        /** Controls the display of the modal. */
        show: {
            type: Boolean,
            required: true,
        },

        /**
         * Handler for when the modal closes.
         * In most cases, you would simply close the modal in this handler.
         */
        handleModalClose: {
            type: Function,
            required: true,
        },

        /**
         * @required for Edit Forms to function. Intended to be used alongside the `allObjectsThatCanBeEdited` prop.
         *
         * The ID of the item object being edited.
         * The item object must exist within the `allObjectsThatCanBeEdited` prop.
         * The item object must also have an `id` property at its root level.
         */
        idOfItemBeingEdited: {
            type: String,
            required: false,
            default: '',
        },

        /**
         * @required for Edit Forms to function. Intended to be used alongside the `idOfItemBeingEdited` prop.
         *
         * This is an array of objects that can be edited by this Modal. All objects in the array MUST have an `id` property
         * at their root level.
         *
         * For example, if you have a Modal Form that allows you to edit State Licenses, then you might have the following
         * array of State Licensing objects:
         *
         *      [
         *          {
         *              id: 'ABCD1234',
         *              state: 'CA',
         *              licenseNumber: 'CA-123456',
         *          },
         *          {
         *              id: 'EFGH5678',
         *              state: 'TX',
         *              licenseNumber: 'TX-123456',
         *          }
         *      ]
         */
        allObjectsThatCanBeEdited: {
            type: Array,
            required: false,
            default: [],
        },
    },

    computed: {
        /**
         * @use
         * Bind this object to the FormModalPopout or FormModalPopup component that you're using.
         */
        bindModal() {
            return {
                id: this.id + 'Popout',
                label: (this.isEditForm) ? `Edit ${this.singularResourceLabel}` : `Add ${this.singularResourceLabel}`,
                show: this.show,
                closeFocusID: '',
            };
        },

        /**
         * @convenience
         * Modal Forms will almost always use their ancestor's view permissions.
         * Override this if this is not true for your use-case.
         */
        userCanViewPage() {
            return this.userCanViewAncestorPage;
        },

        /**
         * @convenience
         * Modal Forms will almost always suppress form submission.
         * Override this if this is not true for your use-case.
         */
        suppressFormSubmission() {
            return true;
        },

        /**
         * @convenience
         * Modal Forms will almost always never use the Review Changes Panel.
         * Override this if this is not true for your use-case.
         */
        useReviewChangesPanel() {
            return false;
        },

        /**
         * @convenience
         * Modal Forms will almost always never use the Discard Changes and Leave Confirmation Modals.
         * Override this if this is not true for your use-case.
         */
        useDiscardChangesAndLeaveConfirmationModals() {
            return false;
        },
    },

    methods: {
        /**
         * @convenience
         * Most Modal Forms don't do anything after a successful form submit.
         * You can override this if needed.
         */
        // eslint-disable-next-line no-unused-vars
        formSubmitSuccessHandler(navigation) {},

        /**
         * @convenience
         * Most Modal Forms do not change the Navigation of the app on page load.
         * You can override this if needed.
         */
        // eslint-disable-next-line no-unused-vars
        updateNavigationOnPageLoad(updateNavigation) {},
    },

    watch: {
        show: function(isBeingShown) {
            this.userIsSeeingForm = isBeingShown;
            if (isBeingShown) {
                // If we have a value for `idOfItemBeingEdited`, then this must be an Edit Form. Find the Item in allObjectsThatCanBeEdited and reinitialize the form with a shape equal to the Item's value.
                const itemBeingEdited = this.allObjectsThatCanBeEdited.find(item => String(item.id) === String(this.idOfItemBeingEdited));
                if (itemBeingEdited) {
                    this.reinitializeFormDataWithNewData(itemBeingEdited); // Assumes that the shape of the item matches the schema of the Edit Form
                }
                
                this.getFormDataFromApi(); // This mimics the LifecycleMixin's beforeRouteEnter navigation guards.
            } else {
                window.setTimeout(this.handleResetForm, 250); // The timeout allows the modal to disappear before the inputs get emptied out, which is a better UX than just losing them all in one flash
            }
        },
    },
};
