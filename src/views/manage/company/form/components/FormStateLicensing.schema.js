import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        state: {
            schemaType: SchemaTypes.StateSingle,
        },
        licenseNumber: {
            schemaType: SchemaTypes.Text,
        },
        productType: {
            schemaType: SchemaTypes.DropdownSingle,
            options: [
                { value: 'All', label: 'All' },
                { value: 'MortgageOnly', label: 'Mortgage Only' },
                { value: 'HomeEquityOnly', label: 'Home Equity Only' },
            ],
        },
        expirationDate: {
            schemaType: SchemaTypes.DateTime,
            optional: true,
        },
        licenseType: {
            schemaType: SchemaTypes.DropdownSingle,
            label: 'California License Type',
            optional: true,
            options: [
                { value: 'BRE', label: 'BRE' },
                { value: 'CFL', label: 'CFL' },
            ],
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
