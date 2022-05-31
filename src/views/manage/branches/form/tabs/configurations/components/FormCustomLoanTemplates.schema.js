import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        program: {
            schemaType: SchemaTypes.DropdownSingle,
            label: 'Loan Program',
            options: [
                { label: 'Conventional', value: 'Conventional' },
                { label: 'FHA', value: 'FHA' },
                { label: 'VA', value: 'VA' },
                { label: 'USDA', value: 'USDA' },
            ],
        },
        purpose: {
            schemaType: SchemaTypes.DropdownSingle,
            label: 'Loan Purpose',
            options: [
                { label: 'Purchase', value: 'Purchase' },
                { label: 'Refinance', value: 'Refinance' },
            ],
        },
        amortization: {
            schemaType: SchemaTypes.DropdownSingle,
            label: 'Amortization Type',
            optional: true,
            options: [
                { label: 'None', value: '' },
                { label: 'Fixed', value: 'Fixed' },
                { label: 'ARM', value: 'AdjustableRate' },
            ],
        },
        losLoanTemplate: {
            schemaType: SchemaTypes.DropdownSingle,
            label: 'LOS Loan Template',
            searchable: true,
        },
    };
};

export default {
    createEditSchema() {
        return getBaseSchema();
    },
    createAddSchema() {
        return getBaseSchema();
    },
    // eslint-disable-next-line no-unused-vars
    convertClientDataFormatToApiDataFormat(data, isAddForm) {
        return data;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiDataFormatToClientDataFormat(data, isAddForm) {
        return data;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        return data;
    },
};
