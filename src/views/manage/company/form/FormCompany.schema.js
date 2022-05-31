import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function () {
    return {
        name: {
            schemaType: SchemaTypes.Text,
            label: 'Name',
            disabled: true,
            readonly: true,
        },
        nameLegal: {
            schemaType: SchemaTypes.Text,
            label: 'Name on Loan Docs',
            subLabel: 'This name will appear on documents.',
            optional: true,
        },
        nmls: {
            schemaType: SchemaTypes.Text,
            label: 'NMLS Number',
        },
        tin: {
            schemaType: SchemaTypes.Text,
            label: 'Tax Identification Number',
            optional: true,
        },
        urlName: {
            schemaType: SchemaTypes.Text,
            label: 'URL Name',
            subLabel: 'This URL name will appear in your application links.',
            optional: true,
        },
        urlEndpoint: {
            schemaType: SchemaTypes.Text,
            label: 'Endpoint URL',
            optional: true,
        },
        website: {
            schemaType: SchemaTypes.Text,
            label: 'Website',
            subLabel: 'The borrower will be redirected to this website when they log out.',
        },
        about: {
            schemaType: SchemaTypes.Text,
            label: 'About',
            placeholder: 'ABC Lender is a local lender located in California known for...',
            optional: true,
        },
        address: {
            schemaType: SchemaTypes.CustomObjectType,
            label: 'Street Address',
            includeStreetAddress2: false,
            includeCountry: false,
        },
        county: {
            schemaType: SchemaTypes.Text,
            label: 'County',
            placeholder: 'Orange',
        },
        country: {
            schemaType: SchemaTypes.Text,
            label: 'Country',
            placeholder: 'USA',
        },
        phoneNumber: {
            schemaType: SchemaTypes.PhoneNumber,
            label: 'Phone Number',
        },
        phoneExtension: {
            schemaType: SchemaTypes.Text,
            label: 'Phone Extension',
            optional: true,
        },
        faxNumber: {
            schemaType: SchemaTypes.Text,
            label: 'Fax Number',
            optional: true,
        },
        email: {
            schemaType: SchemaTypes.Text,
            label: 'Email',
            optional: true,
        },
        stateLicensing: {
            schemaType: SchemaTypes.InputList,
        },
    };
};

export default {
    createEditSchema() {
        let schema = getBaseSchema();
        schema.namedRoute = 'ManageCompanyEdit';
        return schema;
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
        return data.information;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        return data.information;
    },
};
