import FormAddSuccessButtonGroup from "@/components/form/base/BaseFormAddSuccessButtonGroup.vue";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
import FormAddSuccessPage from "@/components/form/FormAddSuccessPage.vue";
const _BrightNotificationFactory = new BrightNotificationFactory();

/**
 * A mixin for Add Success Pages.
 */
export const FormAddSuccessMixin = {
    components: { FormAddSuccessButtonGroup, FormAddSuccessPage },
    /**
     * @internal
     * Block the User from seeing this page if there is no ID pushed to this page as a param.
     * Note: If you need to do something in this navigation guard, then override this and retain the below code.
     */
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.idOfResourceThatWasCreated) {
                vm.$router.push({ name: vm.namedRouteOfViewAllResourcesPage });
            }
        });
    },
    props: {
        idOfResourceThatWasCreated: {
            type: String,
            required: true,
        },
    },
    computed: {
        /**
         * @required
         * The named route of the page you'd like to direct the User to when they click the "View All" button.
         */
        namedRouteOfViewAllResourcesPage() {
            console.error(`Form Add Success Page Error [id='${this.ancestorId}']: The Form's Add Success Page does not have an 'namedRouteOfViewAllResourcesPage' computed property defined.\n\nPossible Solution: Define this computed property for the Add Success Page.`);
            this.throwFatalException();
            return '';
        },

        /**
         * @required
         * The 'base' named route of the Forms.
         * For example, the Internal User forms have named routes of:
         *      - ManageExternalUserEdit
         *      - ManageExternalUserAdd
         * so it will return 'ManageExternalUser' here.
         */
        baseNamedRouteOfFormPage() {
            console.error(`Form Add Success Page Error [id='${this.ancestorId}']: The Form's Add Success Page does not have an 'baseNamedRouteOfFormPage' computed property defined.\n\nPossible Solution: Define this computed property for the Add Success Page.`);
            this.throwFatalException();
            return '';
        },

        /**
         * @use
         * Bind this to the <FormAddSuccessButtonGroup> component used in your template.
         */
        bindButtons() {
            return {
                handleViewNewResource: this.handleViewNewResource,
                handleViewAllResources: this.handleViewAllResources,
                handleCreateNewResource: this.handleCreateNewResource,
            };
        },
    },
    methods: {
        /**
         * @internal
         * A handler for when the User decides to view the newly created resource.
         */
        handleViewNewResource() {
            this.$router.push({
                name: `${this.baseNamedRouteOfFormPage}Edit`, // Assumes your named routes follow our standard Form convention.
                params: {
                    publicId: this.idOfResourceThatWasCreated, // Assumes that the Form has a `publicId` property. If yours doesn't, then override this method in your Add Success Page component.
                },
            });
        },

        /**
         * @internal
         * A handler for when the User decides to view all resources.
         */
        handleViewAllResources() {
            this.$router.push({ name: this.namedRouteOfViewAllResourcesPage });
        },

        /**
         * @internal
         * A handler for when the User wants to create another resource.
         */
        handleCreateNewResource() {
            this.$router.push({ name: `${this.baseNamedRouteOfFormPage}Add` }); // Assumes your named routes follow our standard Form convention.
        },

        /**
         * @internal
         */
        throwFatalException() {
            _BrightNotificationFactory.createNotification({
                type: 'error',
                icon: 'warning',
                duration: 10000,
                label: 'Runtime Error',
                subLabel: 'The requested page could not be loaded at this time. Please try again and/or refresh the page. If this issue persists, please contact technical support.',
            });
            throw 'FormAddSuccessMixin';
        },
    },
};
