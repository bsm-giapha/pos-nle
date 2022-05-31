// NLE-specific things
import { mapState } from "pinia";
import { useLenderStore } from "@/stores/lender";
import { useConfigurationsStore } from "@/stores/configurations";
import { usePermissionsStore } from "@/stores/permissions";
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser";
import FormPanel from "@/components/form/FormPanel.vue";
import BsmInputSmartPassword from "@/components/inputs/BsmInputSmartPassword.vue";

// Core Library Essentials
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";

// Input Library
import BrightInputAddress from "@/bright/components/input-library/address/BrightInputAddress.vue";
import BrightCheckbox from "@/bright/components/input-library/checkbox/BrightCheckbox.vue";
import BrightInputEmail from "@/bright/components/input-library/email/BrightInputEmail.vue";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup.vue";
import BrightInputMoney from "@/bright/components/input-library/money/BrightInputMoney.vue";
import BrightInputNumber from "@/bright/components/input-library/number/BrightInputNumber.vue";
import BrightInputPhoneNumber from "@/bright/components/input-library/phone-number/BrightInputPhoneNumber.vue";
import BrightRadioGroup from "@/bright/components/input-library/radio-group/BrightRadioGroup.vue";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch.vue";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText.vue";
import BrightInputTextarea from "@/bright/components/input-library/textarea/BrightInputTextarea.vue";

// Layout Library Essentials
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn.vue";
import BrightDivider from "@/bright/components/layout-library/divider/BrightDivider.vue";

// Overlay Library
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";

/**
 * The FormDescendantMixin is used by components that are located within an Ancestor Form.
 * Components that use this mixin are considered to be Descendants of an Ancestor Form.
 *
 * This mixin provides access to commonly used methods, props, and utilities that are useful when
 * dealing with Forms.
 *
 * Note the use of the following JSDoc block tags in this Mixin's values:
 *      @use = You can/should use this in your Form. Often times, this will be used for bindings/event listeners.
 *      @convenience = Useful fields/methods that make Forms easier to manage and more convenient.
 */
export const FormDescendantMixin = {
    components: { FormPanel, BsmInputSmartPassword, BrightCard, BrightColumn, BrightRow, BrightGrid, BrightDivider, BrightModalPopup, BrightAvatar, BrightButton, BrightIcon, BrightLoader, BrightInputAddress, BrightCheckbox, BrightInputEmail, BrightInputGroup, BrightInputMoney, BrightInputNumber, BrightInputPhoneNumber, BrightRadioGroup, BrightDropdownSelect, BrightSwitch, BrightInputText, BrightInputTextarea },
    props: {
        /**
         * @use
         * This is the same exact method being used in the Ancestor Form (via FormAncestorMixin). The same rules apply:
         *
         * Use this to get common bindings for an Input.
         * It will automatically bind any schema entries as props/attributes.
         *
         * It is intended to be used on an Input component like so:
         *      `<BrightInputText v-bind="bindAncestorInput('account.firstName')"/>`
         *
         * This function is almost always used alongside the `handleAncestorInput()` function like so:
         *      `<BrightInputText
         *          v-bind="bindAncestorInput('account.firstName')"
         *          @update:modelValue="handleAncestorInput('account.firstName', $event)")
         *       />`
         *
         * @param schemaNest The location of the Input within the Form's Schema. For example, if you have a schema with
         * a structure of "account.firstName" then you would pass "account.firstName" here.
         */
        bindAncestorInput: {
            type: Function,
            required: false,
        },

        /**
         * @use
         * This is the same exact method being used in the Ancestor Form (via FormAncestorMixin). The same rules apply:
         *
         * Handles an input event from an input component in the Ancestor Form.
         *
         * It is intended to be used on an Input component like so:
         *      `<BrightInputText @update:modelValue="handleAncestorInput('account.firstName', $event)"/>`
         *
         * This function is almost always used alongside the `bindAncestorInput()` function like so:
         *      `<BrightInputText
         *          v-bind="bindAncestorInput('account.firstName')"
         *          @update:modelValue="handleAncestorInput('account.firstName', $event)")
         *       />`
         *
         * @param {String} schemaNest The location of the Input within the Form's Schema. For example, if you have a schema with
         * a structure of "account.firstName" then you would pass "account.firstName" here.
         * @param value The value being emitted from the Input component. This will almost always be `$event`.
         */
        handleAncestorInput: {
            type: Function,
            required: false,
        },

        /**
         * @use
         * This is the same exact method being used in the Ancestor Form (via FormAncestorMixin). The same rules apply:
         *
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
        updateBaselineSchemaInAncestor: {
            type: Function,
            required: false,
        },

        /**
         * @convenience
         * The Ancestor Form's API Resource URL.
         */
        ancestorApiResourceUrl: {
            type: String,
            required: false,
        },

        /**
         * @convenience
         * The Ancestor Form's HTTP submission method.
         */
        ancestorFormSubmissionHttpMethod: {
            type: String,
            required: false,
        },

        /**
         * @convenience
         * The Ancestor Form's computed userCanViewPage value.
         */
        userCanViewAncestorPage: {
            type: Boolean,
            required: false,
        },

        /**
         * @convenience
         * Whether the Ancestor Form is an Edit Form. Can be useful for doing v-if/v-show conditional rendering in templates.
         */
        ancestorIsEditForm: {
            type: Boolean,
            required: false,
        },

        /**
         * @convenience
         * The id of the Ancestor Form that this Descendant belongs under.
         * Useful for accessibility and setting up unique HTML IDs.
         */
        ancestorId: {
            type: String,
            required: false,
        },

        /**
         * @convenience
         * The initial data for the Ancestor Form. Previously known as "Old Form Data".
         */
        formDataInitialOfAncestor: {
            type: Object,
            required: false,
        },

        /**
         * @convenience
         * The current data for the Ancestor Form. Previously known as "New Form Data".
         */
        formDataCurrentOfAncestor: {
            type: Object,
            required: false,
        },

        /**
         * @convenience
         * The Ancestor's Form Fields object.
         */
        formFieldsOfAncestor: {
            type: Object,
            required: false,
        },

        /**
         * @convenience
         * The Ancestor Form's Input Validation object.
         */
        inputValidationOfAncestor: {
            type: Object,
            required: false,
        },

        /**
         * @convenience
         * The Ancestor Form's Input Metadata
         */
        inputMetadataOfAncestor: {
            type: Object,
            required: false,
        },
    },
    computed: {
        /**
         * @use
         * A convenience binding for any descendant components in the Ancestor Form.
         */
        bindDescendant() {
            return {
                ancestorId: this.ancestorId,
                bindAncestorInput: this.bindAncestorInput,
                handleAncestorInput: this.handleAncestorInput,
                updateBaselineSchemaInAncestor: this.updateBaselineSchemaInAncestor,
                ancestorApiResourceUrl: this.ancestorApiResourceUrl,
                ancestorFormSubmissionHttpMethod: this.ancestorFormSubmissionHttpMethod,
                userCanViewAncestorPage: this.userCanViewAncestorPage,
                ancestorIsEditForm: this.ancestorIsEditForm,
                formDataInitialOfAncestor: this.formDataInitialOfAncestor,
                formDataCurrentOfAncestor: this.formDataCurrentOfAncestor,
                formFieldsOfAncestor: this.formFieldsOfAncestor,
                inputValidationOfAncestor: this.inputValidationOfAncestor,
                inputMetadataOfAncestor: this.inputMetadataOfAncestor,
            };
        },

        /**
         * @convenience
         * These store getters are used in the majority of our Forms, so they're available here as a convenience
         */
        ...mapState(useLenderStore, {
            lenderBaseUrl: store => store.baseLenderURL,
        }),
        ...mapState(useConfigurationsStore, {
            lenderConfiguration: store => store.lenderConfiguration,
        }),
        ...mapState(usePermissionsStore, {
            hasPageVisitPermission: store => store.hasPageVisitPermission,
            hasGeneralPermission: store => store.hasGeneralPermission,
            ardentCanReadResource: store => store.ardentCanReadResource,
            ardentCanUpdateResource: store => store.ardentCanUpdateResource,
        }),
        ...mapState(useAuthenticatedUserStore, {
            isAuthenticatedUserAnAdmin: store => store.isAuthenticatedUserAnAdmin,
        }),

        /**
         * @convenience
         * Whether the Ancestor Form is an Add Form.
         * Can be useful for doing v-if/v-show conditional rendering in templates.
         */
        ancestorIsAddForm() {
            return !this.ancestorIsEditForm;
        },

        /**
         * @convenience
         *
         * In some cases (like on Add Success pages), you need to check if the User should
         * actually be in a Descendant. This is a quick and easy way to check.
         */
        userCanSeePage() {
            return typeof this.ancestorId !== 'undefined' && this.ancestorId.length > 0;
        },
    },
    methods: {
        /**
         * @use
         * A convenience binding that is used when you need to bind an Ancestor Form input AND pass descendant bindings to
         * a component.
         */
        ancestorBindDescendantInput(schemaNest) {
            return {
                ...this.bindAncestorInput(schemaNest),
                ...this.bindDescendant,
            };
        },
    },
};
