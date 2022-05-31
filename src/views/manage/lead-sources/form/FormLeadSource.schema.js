import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        information: {
            name: {
                schemaType: SchemaTypes.Text,
                label: 'Name',
            },
            value: {
                schemaType: SchemaTypes.Text,
                label: 'Value',
            },
        },
        assignments: {
            loanOfficersAssigned: {
                schemaType: SchemaTypes.CustomObjectType,
                label: 'Loan Officers Assigned',
                optional: true,
            },
            branchesAssigned: {
                schemaType: SchemaTypes.InputList,
                label: 'Branches Assigned',
                optional: true,
            },
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
