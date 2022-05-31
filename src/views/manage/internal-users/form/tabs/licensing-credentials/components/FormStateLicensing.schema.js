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
        includeZipcodes: {
            schemaType: SchemaTypes.Text,
            subLabel: 'Use comma-separated zipcodes to add multiple zipcodes.',
            optional: true,
        },
        isInRoundRobin: {
            schemaType: SchemaTypes.Checkbox,
            label: 'Include in Company Round Robin',
            optional: true,
            hideMetaLabel: true,
        },
        isInBranchRoundRobin: {
            schemaType: SchemaTypes.Checkbox,
            label: 'Include in Branch Round Robin',
            optional: true,
            hideMetaLabel: true,
        },
        isInZipcodeRoundRobin: {
            schemaType: SchemaTypes.Checkbox,
            label: 'Include in Zipcode Round Robin',
            optional: true,
            hideMetaLabel: true,
        },
        expirationDate: { // TODO This should be a Date. Not sure why we made this a number initially. Maybe we didn't have the Date input at the time?
            schemaType: SchemaTypes.Number,
            defaultValue: 0,
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
