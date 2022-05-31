import { ArdentResponseMixin } from "@/mixins/form/ArdentResponseMixin.js";
import { DiffBuildChangeMixin } from "@/mixins/form/ancestor/DiffBuildChangeMixin.js";
import { DiffMixin } from "@/mixins/form/ancestor/DiffMixin.js";
import { LifecycleMixin } from "@/mixins/form/ancestor/LifecycleMixin.js";
import { ValidationMixin } from "@/mixins/form/ancestor/ValidationMixin.js";
import { InternalFormDetailsMixin } from "@/mixins/form/ancestor/InternalFormDetailsMixin.js";
import SchemaHelper from "@/helpers/SchemaHelper.js";
import FormWrapper from "@/components/form/FormWrapper.vue";
import _cloneDeep from "lodash/cloneDeep.js";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import { mapState } from "pinia";
import { useNavigationStore } from "@/stores/navigation";

/**
 * A mixin that allows a component to be an "Ancestor Form" (or just a "Form", although the ancestry reference is important to
 * understand, as will be explained below.)
 *
 * An Ancestor Form is a Form that serves as the main handler for Form Data.
 * An Ancestor Form can have inputs or "descendants" that can be infinitely nested within the Ancestor Form.
 * Ancestor Forms can have other Forms nested within them and can use routing as desired.
 *
 * Note the use of the following JSDoc block tags in this Mixin's values:
 *      @required = You MUST override this in your Form.
 *      @optional = You can optionally override this in your Form.
 *      @use = You can/should use this in your Form. Often times, this will be used for bindings/event listeners.
 *      @convenience = Useful fields/methods that make Forms easier to manage and more convenient.
 */
export const FormAncestorMixin = {
    components: { FormWrapper },
    mixins: [
        ArdentResponseMixin,
        DiffBuildChangeMixin,
        DiffMixin,
        LifecycleMixin,
        ValidationMixin,
        InternalFormDetailsMixin,
        FormDescendantMixin, // Ancestors can be descendants too
    ],
    emits: ['submit', 'error'],
    data() {
        return {
            /**
             * @required
             * You must provide a schema for a form.
             * Schemas do not need to be unique and can be shared across other Forms/mixed.
             */
            schema: {},

            /**
             * @use
             * You can use this to know if a Form is loading or not. You typically don't need to care about this in
             * Full Page Forms, but Modal Forms can show an isolated loader with this value.
             */
            formIsLoading: false,

            /**
             * @optional
             * If your Form does not need to get its Form Data from the API then you can pass `false` here.
             *
             * Modal Forms that are nested within another Form often have their Form Data supplied locally, so they
             * will often pass `false` here.
             */
            getFormDataFromApiResourceUrl: true,
        };
    },
    computed: {
        ...mapState(useNavigationStore, {
            showFormWrapper: store => !store.isLoading,
        }),
        /**
         * @required
         * Used to identify form-specific DOM elements. Required for accessibility.
         * @return string
         */
        id() {
            console.error(`Ancestor Form Error [id='Unknown']: A Form does not have an 'id' computed property defined.\n\nPossible Solution: Define an 'id' computed property for the Form. See the stack trace below to find the Form component that is missing this property:`);
            console.trace();
            this.throwFatalException();
            return '';
        },

        /**
         * @required
         * The URL that this Form will submit against. This should always be an Ardent API endpoint.
         */
        apiResourceUrl() {
            console.error(`Ancestor Form Error [id='${this.id}']: A Form does not have an 'apiResourceUrl' computed property defined.\n\nPossible Solution: Define an 'apiResourceUrl' computed property for the Form. It should be an Ardent API endpoint (e.g. For an Edit Form: '\${lenderBaseUrl}/external-users/\${userPublicId}' and for an Add Form: '\${lenderBaseUrl}/external-users').`);
            this.throwFatalException();
            return '';
        },

        /**
         * @required
         * This HTTP method will be used when the form is submitted.
         */
        formSubmissionHttpMethod() {
            console.error(`Ancestor Form Error [id='${this.id}']: A Form does not have a 'formSubmissionHttpMethod' computed property defined.\n\nPossible Solution: Define an 'formSubmissionHttpMethod' computed property for the Form. It should return one of the accepted HTTP methods (i.e. "PATCH", "PUT", "POST").`);
            this.throwFatalException();
            return '';
        },

        /**
         * @required
         * Whether the user can view the Form. This is often based on a Page Visit Permission, which can be easily
         * accessed via the `hasPageVisitPermission` computed function.
         */
        userCanViewPage() {
            console.error(`Ancestor Form Error [id='${this.id}']: A Form does not have a 'userCanViewPage' computed property defined.\n\nPossible Solution: Define an 'userCanViewPage' computed property for the Form. It should check for page visit permissions using the hasPageVisitPermission getter (e.g. 'return this.hasPageVisitPermission('AdminUsers');'`);
            this.throwFatalException();
            return false;
        },

        /**
         * @optional
         * Whether to suppress form submission. By default, form submissions are not suppressed. Can be overridden.
         *
         * If true, it will NOT submit the form to the backend. This is useful for Modal Forms, which do not necessarily push any changes to the backend until their Ancestor Form is ready to submit everything.
         * If false, it will submit the form to the backend.
         */
        suppressFormSubmission() {
            return false;
        },

        /**
         * @optional
         * Will control the display of the Review Changes Panel. By default, the Review Changes Panel is shown. Can be overridden.
         */
        useReviewChangesPanel() {
            return true;
        },

        /**
         * @optional
         * Will control the display of the Discard Changes and Leave Confirmation Modals. By default, both are shown. Can be overridden.
         */
        useDiscardChangesAndLeaveConfirmationModals() {
            return true;
        },

        /**
         * @use
         * A convenience binding for the <FormWrapper> component that is used in most forms.
         */
        bindFormWrapper() {
            return {
                id: this.id,
                isEditForm: this.isEditForm,
                disableSubmitButton: this.disableSubmitButton,
                useReviewChangesPanel: this.useReviewChangesPanel,
                useDiscardChangesAndLeaveConfirmationModals: this.useDiscardChangesAndLeaveConfirmationModals,
                reviewChangesPanelItems: this.reviewChangesPanelItems,
                leaveConfirmationModalShow: this.leaveConfirmationModal.show,
                leaveConfirmationModalHandleConfirm: this.leaveConfirmationModal.handleConfirm,
                leaveConfirmationModalHandleCancel: this.leaveConfirmationModal.handleCancel,
                handleFormSubmit: this.handleFormSubmit,
                handleDiscardChanges: this.handleDiscardChanges,
                handleUndo: this.handleUndo,
            };
        },

        /**
         * @use
         * A convenience binding for any descendant components in the Ancestor Form.
         */
        bindDescendant() {
            return {
                ancestorId: this.id,
                bindAncestorInput: this.bindInput,
                handleAncestorInput: this.handleInput,
                updateBaselineSchemaInAncestor: this.updateBaselineSchema,
                ancestorApiResourceUrl: this.apiResourceUrl,
                ancestorFormSubmissionHttpMethod: this.formSubmissionHttpMethod,
                userCanViewAncestorPage: this.userCanViewPage,
                ancestorIsEditForm: this.isEditForm,
                formDataInitialOfAncestor: this.formDataInitial,
                formDataCurrentOfAncestor: this.formDataCurrent,
                formFieldsOfAncestor: this.formFields,
                inputValidationOfAncestor: this.inputValidation,
                inputMetadataOfAncestor: this.inputMetadata,
            };
        },

        /**
         * @convenience
         * Returns true if the form is an Edit Form (i.e. uses the PATCH or PUT HTTP methods)
         */
        isEditForm() {
            return ["PATCH", "PUT"].includes(this.formSubmissionHttpMethod.toUpperCase());
        },

        /**
         * @convenience
         * Returns true if the form is an Add Form (i.e. user the POST HTTP method)
         */
        isAddForm() {
            return !this.isEditForm;
        },
    },
    methods: {
        /**
         * @required
         * Previously known as `handleFormSubmitSuccessFinal()`. Almost all Forms need to do something after a successful
         * form submission, so it's required for this mixin.
         *
         * A common scenario for Add Forms is that you need to direct the User to the Add Success Page. This is where
         * you can do things like that.
         *
         * Another common scenario for Edit Forms is that you sometimes need to update the Navigation/Page Name.
         *
         * If you happen to be working on a Form that does not need to do anything after a Form Submit (for some reason),
         * then you can just define this method and leave it empty.
         * @param {useNavigationStore} navigation The Navigation Store.
         */
        // eslint-disable-next-line no-unused-vars
        formSubmitSuccessHandler(navigation) {
            // This is an example of what you might do for an Add Form:
            // this.$router.push({
            //     name: 'ManageExternalUserAddSuccess',
            //     params: this.getAddSuccessPageRouterParams(),
            // });
            //
            // And this is what you might do for an Edit Form:
            // navigation.updatePageName('Updated Page Name Based On Current Form Data');
            console.error(`Ancestor Form Error [id='${this.id}']: A Form does not have an 'formSubmitSuccessHandler' method defined.\n\nPossible Solution: Define a 'formSubmitSuccessHandler' method for the Form.`);
            this.throwFatalException();
        },

        /**
         * @required
         * Updates any Navigation elements as needed whenever the page loads. This is required for most forms, so you will
         * need to override it.
         *
         * You would typically assign a basic placeholder page name (like "Edit User") here, as well as
         * update any essential nav items like tabs, breadcrumbs, and the backbar.
         * @param {Function} updateNavigation The Navigation store's updateNavigation action.
         */
        // eslint-disable-next-line no-unused-vars
        updateNavigationOnPageLoad(updateNavigation) {
            // Here is an example of what you might do.
            // updateNavigation({
            //     pageName: 'Page Name',
            //     breadcrumbs: {
            //         label: 'Page > Name', to: { name: 'NamedRouteOfPage' },
            //     },
            //     tabs: [
            //         { label: 'Tab Name', to: { name: 'NamedRouteOfTab' } },
            //     ],
            //     backBar: {
            //         label: 'Back Bar Page Name', to: { name: 'NamedRouteOfPage' },
            //     },
            //     localActions: [],
            // });
            console.error(`Ancestor Form Error [id='${this.id}']: A Form does not have an 'updateNavigationOnPageLoad' method defined.\n\nPossible Solution: Define a 'updateNavigationOnPageLoad' method for the Form. Because this method is executed on initial page load, you'll typically want to "setup" the navigation using the 'navigation/updateNavigation' store action.`);
            this.throwFatalException();
        },

        /**
         * @optional
         * Updates any Navigation elements as needed whenever data is successfully fetched from the API. Can be overridden as needed.
         * This is executed on page load in Edit Forms.
         * @param {useNavigationStore} navigation The Navigation Store.
         */
        // eslint-disable-next-line no-unused-vars
        updateNavigationAfterFetchingDataFromApi(navigation) {
            // This is an example of what you might do:
            // navigation.updatePageName('Page Name');
        },

        /**
         * @optional
         * Fetch all required data for the form and return it as a promise. Can be overridden as needed. You would typically
         * override this if your Form needs to modify its schema to account for dynamic values obtained at runtime
         * (e.g. Form Fields, other data that can only be obtained via an API request).
         *
         * If you use this method, then you will also need to override updateSchemaWithFetchedRequiredData() as well,
         * which is where you'll explicitly update the schema with dynamic values/options as needed.
         */
        fetchRequiredDataForFormAsPromise() {
            let promises = [];

            /*
            // TODO Form Fields can be added like this:

            const fetchFormFields = axios.get(`${this.lenderBaseUrl}/roles/form-fields`).then(response => {
                response = response.data.data;
                this.formFields = {
                    ...this.formFields,
                    ...response,
                };
            });
            if (Object.keys(this.formFields).length === 0) promises.push(fetchFormFields);

            */

            /*
            // TODO Store modules can be polled like this:

            const lender = useLenderStore();
            const fetchBranches = lender.fetchBranches();
            if (lender.branches.length === 0) promises.push(fetchBranches);

            */

            // TODO Note: You'll likely need to modify the schema of the form to add in the newly fetched/acquired options.

            return promises;
        },

        /**
         * @optional
         * This is where you would modify schema to account for Form Fields and other dynamic schema/metadata changes.
         *
         * If you use this method, then you will also need to override fetchRequiredDataForFormAsPromise() as well,
         * which is where you'll fetch the data you need for this method.
         */
        updateSchemaWithFetchedRequiredData() {

        },

        /**
         * @use
         * Use this to get common bindings for an Input.
         * It will automatically bind any schema entries as props/attributes.
         *
         * It is intended to be used on an Input component like so:
         *      `<BrightInputText v-bind="bindInput('account.firstName')"/>`
         *
         * This function is almost always used alongside the `handleInput()` function like so:
         *      `<BrightInputText
         *          v-bind="bindInput('account.firstName')"
         *          @update:modelValue="handleInput('account.firstName', $event)")
         *       />`
         *
         * @param schemaNest The location of the Input within the Form's Schema. For example, if you have a schema with
         * a structure of "account.firstName" then you would pass "account.firstName" here.
         */
        bindInput(schemaNest) {
            const valueForInput = SchemaHelper.getDataPropertyValueByNestingString(this.formDataCurrent, schemaNest);
            const metadataForInput = SchemaHelper.getDataPropertyValueByNestingString(this.inputMetadata, schemaNest);
            const validationForInput = SchemaHelper.getDataPropertyValueByNestingString(this.inputValidation, schemaNest);

            if (typeof valueForInput === 'undefined') {
                console.error(`Ancestor Form Error [id='${this.id}']: A schemaNest from an Input Binding is invalid (schemaNest='${schemaNest}', trying to access formDataCurrent).\n\nPossible Solution: Verify that the schemaNest matches what is actually defined in the schema. Tip: Remember that Add Forms and Edit Forms can have different schemas. The contents of currentFormData at runtime are below for easy reference.`);
                console.log(this.formDataCurrent);
                this.throwFatalException();
            } else if (typeof metadataForInput === 'undefined') {
                console.error(`Ancestor Form Error [id='${this.id}']: A schemaNest from an Input Binding is invalid (schemaNest='${schemaNest}', trying to access inputMetadata).\n\nPossible Solution: Verify that the schemaNest matches what is actually defined in the schema. Tip: Remember that Add Forms and Edit Forms can have different schemas. The contents of inputMetadata at runtime are below for easy reference.`);
                console.log(this.inputMetadata);
                this.throwFatalException();
            } else if (typeof validationForInput === 'undefined') {
                console.error(`Ancestor Form Error [id='${this.id}']: A schemaNest from an Input Binding is invalid (schemaNest='${schemaNest}', trying to access inputValidation).\n\nPossible Solution: Verify that the schemaNest matches what is actually defined in the schema. Tip: Remember that Add Forms and Edit Forms can have different schemas. The contents of inputValidation at runtime are below for easy reference.`);
                console.log(this.inputValidation);
                this.throwFatalException();
            }

            return {
                ...metadataForInput,
                validationType: validationForInput?.validationType ?? 'none',
                validationMessage: validationForInput?.validationMessage ?? '',
                modelValue: valueForInput,
            };
        },

        /**
         * @use
         * A convenience binding that is used when you need to bind an Form input AND pass descendant bindings to
         * a component.
         */
        bindDescendantInput(schemaNest) {
            return {
                ...this.bindInput(schemaNest),
                ...this.bindDescendant,
            };
        },

        /**
         * @use
         * Handles an input event from an input component in the Ancestor Form.
         *
         * It is intended to be used on an Input component like so:
         *      `<BrightInputText @update:modelValue="handleInput('account.firstName', $event)"/>`
         *
         * This function is almost always used alongside the `bindInput()` function like so:
         *      `<BrightInputText
         *          v-bind="bindInput('account.firstName')"
         *          @update:modelValue="handleInput('account.firstName', $event)")
         *       />`
         *
         * @param {String} schemaNest The location of the Input within the Form's Schema. For example, if you have a schema with
         * a structure of "account.firstName" then you would pass "account.firstName" here.
         * @param value The value being emitted from the Input component. This will almost always be `$event`.
         */
        handleInput(schemaNest, value) {
            if (typeof value === 'undefined') {
                console.error(`Ancestor Form Error [id='${this.id}']: A value from an input event is undefined (schemaNest='${schemaNest}').\n\nPossible Solution: Verify that you're including the '$event' emitted from an input event listener in the call to handleInput(). A properly setup input event listener + handler should look like: <BrightInputText @update:modelValue="handleInput('account.firstName', $event)"/>.`);
                this.throwFatalException();
            }

            let nestedCurrentFormData = SchemaHelper.getDataPropertyValueByNestingString(this.formDataCurrent, schemaNest, false, true);

            if (typeof nestedCurrentFormData === 'undefined') {
                console.error(`Ancestor Form Error [id='${this.id}']: A schemaNest from an input event is invalid (schemaNest='${schemaNest}').\n\nPossible Solution: Verify that the schemaNest matches what is actually defined in the schema. Tip: Remember that Add Forms and Edit Forms can have different schemas. The contents of the current schema (i.e. the Current Form Data structure) at runtime are below for easy reference.`);
                console.log(this.formDataCurrent);
                this.throwFatalException();
            }

            const key = schemaNest.split('.').pop();
            nestedCurrentFormData[key] = value;

            let nestedInitialFormData = SchemaHelper.getDataPropertyValueByNestingString(this.formDataInitial, schemaNest, true, true);

            if (this.isEditForm) {
                this.diffFormDataWithInput(nestedInitialFormData, _cloneDeep(nestedCurrentFormData), schemaNest, key);
            }

            if (this.shouldValidate) {
                this.debouncedValidate();
            }
        },

        /**
         * @use
         * Allows you to easily update the Schema for a Form. This is how you would add Form Field-related/dynamic options and values.
         * Without this, our Diff feature would not be able to show the User what changed in Radio Groups and Select Dropdowns.
         *
         * Note: You only need to call this if the input you're concerned about will be shown in the Diff/Review Changes panel.
         *
         * @param {String} baseSchemaNest The "base" schema. For example, if you were trying to add/update 'assignments.branches.options',
         * then you would provide 'assignments.branches' here. IMPORTANT: Be sure that the base schema actually exists.
         *
         * @param {String} keyToAddOrUpdate The key to add or update on the base schema in the first argument. For example, if you were
         * trying to add/update 'assignments.branches.options', then you would provide 'options' here. Note: This key doesn't have to exist
         * in the Edit/Add Schema; it will be added to the base schema if it does not exist.
         *
         * @param value The value to set.
         */
        updateBaselineSchema(baseSchemaNest, keyToAddOrUpdate, value) {
            let baselineSchema = SchemaHelper.getDataPropertyValueByNestingString(this.baselineSchema, baseSchemaNest, false);

            if (typeof baselineSchema === 'undefined') {
                console.error(`Ancestor Form Error [id='${this.id}']: Could not update baseline schema (baseSchemaNest='${baseSchemaNest}').\n\nPossible Solution: Verify that the baseSchemaNest matches what is actually defined in the schema.`);
                console.log(this.formDataCurrent);
                this.throwFatalException();
            }

            baselineSchema[keyToAddOrUpdate] = value;
        },

        /**
         * @use
         * Only for Add Forms with nested forms.
         *
         * Use this to automatically postfix a '/NEW' id to a resource URL. This is needed for Ardent API to pick up on
         * the fact that we are trying to validate against a Resource that has not been created yet.
         *
         * For example: The Internal User Form used to allow Admins to add State Licensing while creating a new
         * Internal User. Validation could not happen unless an ID was passed, so we needed to pass a 'NEW' URI like so:
         *          '/lenders/{lenderID}/internal-users/NEW/state-licensing
         * so that we could validate against the endpoint.
         *
         * @param url
         * @returns {string|*}
         */
        addNewPostfixToAncestorApiResourceUrlIfNeeded(url) {
            return (this.ancestorIsAddForm) ? `${url}/NEW` : url;
        },
    },
};
