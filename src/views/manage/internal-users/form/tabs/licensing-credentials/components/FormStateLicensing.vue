<template>
    <FormModalPopout
        :bind-modal="bindModal"
        :bind-form-wrapper="bindFormWrapper"
        :handle-modal-close="handleModalClose"
    >
        <BrightInputState
            v-bind="bindInput('state')"
            @update:modelValue="handleInput('state', $event)"
        />
        <BrightInputText
            v-bind="bindInput('licenseNumber')"
            @update:modelValue="handleInput('licenseNumber', $event)"
        />
        <BrightDropdownSelect
            v-show="lenderConfiguration('allowsHELOC') || lenderConfiguration('allowsHELOAN')"
            v-bind="bindInput('productType')"
            @update:modelValue="handleInput('productType', $event)"
        />

        <BrightInputGroup v-show="!isTPO" id="assignmentRules" label="Assignment Rules">
            <BrightInputText
                v-show="lenderConfiguration('isLOFilteredByZipcode')"
                v-bind="bindInput('includeZipcodes')"
                @update:modelValue="handleInput('includeZipcodes', $event)"
            />
            <BrightCheckbox
                v-bind="bindInput('isInRoundRobin')"
                @update:modelValue="handleInput('isInRoundRobin', $event)"
            />
            <BrightCheckbox
                v-bind="bindInput('isInBranchRoundRobin')"
                @update:modelValue="handleInput('isInBranchRoundRobin', $event)"
            />
            <BrightCheckbox
                v-bind="bindInput('isInZipcodeRoundRobin')"
                @update:modelValue="handleInput('isInZipcodeRoundRobin', $event)"
            />
        </BrightInputGroup>

        <BrightInputNumber
            v-show="isTPO"
            v-bind="bindInput('expirationDate')"
            @update:modelValue="handleInput('expirationDate', $event)"
        />
        <BrightDropdownSelect
            v-show="formDataCurrent.state === 'CA'"
            v-bind="bindInput('licenseType')"
            @update:modelValue="handleInput('licenseType', $event)"
        />
    </FormModalPopout>
</template>

<script>
import { FormAncestorModalMixin } from "@/mixins/form/FormAncestorModalMixin.js";
import States from "@/bright/components/input-library/state/helper/states.js";
import Schema from "./FormStateLicensing.schema.js";
import BrightInputState from "@/bright/components/input-library/state/BrightInputState.vue";
import { useLenderStore } from '@/stores/lender.js';
import SchemaHelper from "@/helpers/SchemaHelper.js";

export default {
    name: "FormStateLicensing",
    components: { BrightInputState },
    mixins: [FormAncestorModalMixin],
    data() {
        return {
            ...this.getInitialDataFromSchema(Schema, this.isEditForm ? 'edit' : 'add'),
            getFormDataFromApiResourceUrl: false,
        };
    },
    computed: {
        isTPO() {
            const lender = useLenderStore();
            return lender.isTPO;
        },
        id() {
            return 'FormStateLicensing';
        },
        apiResourceUrl() {
            let baseUrl = this.addNewPostfixToAncestorApiResourceUrlIfNeeded(this.ancestorApiResourceUrl);
            return `${baseUrl}/state-licensing`;
        },
        formSubmissionHttpMethod() {
            return (this.formType === 'edit') ? 'PUT' : 'POST';
        },

        availableStates() {
            const statesLicensedIn = this.formDataCurrentOfAncestor.licensingCredentials.stateLicensing.map(stateLicense => stateLicense.state);
            return States.getStates()
                .map(entry => entry.abbreviation)
                .filter(abbreviation => !statesLicensedIn.includes(abbreviation) || this.formDataCurrent.state === abbreviation);
        },
    },
    watch: {
        show: function (isShowing) {
            if (isShowing) {
                this.updateBaselineSchema('state', 'states', this.availableStates);
            } else {
              let baselineSchemaState = SchemaHelper.getDataPropertyValueByNestingString(this.baselineSchema, 'state', false);
              delete baselineSchemaState.states;
            }
        },
    }
};
</script>
