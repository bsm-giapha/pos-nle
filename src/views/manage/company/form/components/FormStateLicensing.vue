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
        <BrightInputDate
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
import BrightInputState from "@/bright/components/input-library/state/BrightInputState.vue";
import Schema from './FormStateLicensing.schema.js';
import BrightInputDate from '@/bright/components/input-library/date/BrightInputDate.vue';
import SchemaHelper from "@/helpers/SchemaHelper.js";

export default {
    name: "FormStateLicensing",
    components: { BrightInputDate, BrightInputState },
    mixins: [FormAncestorModalMixin],
    data() {
        return {
            ...this.getInitialDataFromSchema(Schema, this.isEditForm ? 'edit' : 'add'),
            getFormDataFromApiResourceUrl: false,
        };
    },
    computed: {
        id() {
            return 'FormStateLicensing';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/state-licensing`;
        },
        formSubmissionHttpMethod() {
            return (this.formType === 'edit') ? 'PUT' : 'POST';
        },
        availableStates() {
            const statesLicensedIn = this.formDataCurrentOfAncestor.stateLicensing.map(stateLicense => stateLicense.state);
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
    },
};
</script>
