import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        status: {
            schemaType: SchemaTypes.Switch,
            label: 'Is Active?',
            descriptionTrue: 'Active',
            descriptionFalse: 'Inactive',
        },
        name: {
            schemaType: SchemaTypes.Text,
            label: 'Name',
        },
        members: {
            schemaType: SchemaTypes.InputList,
            optional: true,
        },
        description: {
            schemaType: SchemaTypes.Text,
            label: 'Description',
            optional: true,
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
        return {
            information: data,
        };
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
