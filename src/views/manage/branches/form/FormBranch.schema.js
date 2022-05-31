import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        information: {
            status: {
                schemaType: SchemaTypes.Switch,
                label: 'Is Active?',
                descriptionTrue: 'Active',
                descriptionFalse: 'Inactive',
            },
            logoURL: {
                schemaType: SchemaTypes.Text,
                label: 'Logo',
                optional: true,
            },
            urlName: {
                schemaType: SchemaTypes.Text,
                label: 'URL Name',
                optional: true,
            },
            name: {
                schemaType: SchemaTypes.Text,
                label: 'Name',
            },
            preferredDisplayName: {
                schemaType: SchemaTypes.Text,
                label: 'Preferred Display Name',
            },
            phoneNumber: {
                schemaType: SchemaTypes.PhoneNumber,
                label: 'Phone Number',
            },
            address: {
                schemaType: SchemaTypes.CustomObjectType,
                label: 'Office Address',
                includeStreetAddress2: false,
            },
            website: {
                schemaType: SchemaTypes.Text,
                label: 'Website',
                subLabel: 'When a user logs out, they will be redirected to this url.',
                optional: true,
            },
            organizationCode: {
                schemaType: SchemaTypes.Text,
                label: 'Organization Code',
                optional: true,

            },
        },
        configurations: {
            useLogoForDocs: {
                schemaType: SchemaTypes.Switch,
                label: 'Use Branch Logo for Docs?',
                subLabel: 'If this is enabled, a branch logo must be uploaded.',
                descriptionTrue: 'Yes',
                descriptionFalse: 'No',
            },
            docDisplayName: {
                schemaType: SchemaTypes.Text,
                label: 'Doc Display Name',
                subLabel: 'This name will be displayed on docs in place of the standard company name.',
            },
            companyDesignation: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Company Designation',
                subLabel: 'Configure company designation verbiage in letters for Texas.',
            },
            useLogoForConsumerEmails: {
                schemaType: SchemaTypes.Switch,
                label: 'Use Branch Logo for Consumer Emails?',
                subLabel: 'If this is enabled, a branch logo must be uploaded.',
                descriptionTrue: 'Yes',
                descriptionFalse: 'No',
                optional: true,
            },
            useNameForConsumerEmails: {
                schemaType: SchemaTypes.Switch,
                label: 'Use Branch Name for Consumer Emails?',
                descriptionTrue: 'Yes',
                descriptionFalse: 'No',
            },
            useCustomEmailButtonColor: {
                schemaType: SchemaTypes.Switch,
                label: 'Use Custom Email Button Color?',
                descriptionTrue: 'Yes',
                descriptionFalse: 'No',
            },
            emailButtonColor: {
                schemaType: SchemaTypes.Text,
                label: 'Email Button Color',
                subLabel: 'Placeholder for BrightInputColor',
                optional: true,
            },
            defaultLoanTemplatePurchase: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Default Loan Template - Purchase',
                searchable: true,
                buttonFullWidth: false,
                optional: true,
            },
            defaultLoanTemplateRefinance: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Default Loan Template - Refinance',
                searchable: true,
                buttonFullWidth: false,
                optional: true,
            },
            customLoanTemplateList: {
                schemaType: SchemaTypes.InputList,
            },
            useStandardTouAndPrivacyModal: {
                schemaType: SchemaTypes.Switch,
                label: 'Use Standard TOU and Privacy Modal?',
            },
            termsOfUseURL: {
                schemaType: SchemaTypes.Text,
                label: 'Terms of Use URL',

            },
            privacyPolicyURL: {
                schemaType: SchemaTypes.Text,
                label: 'Privacy Policy URL',
            },

        },
        assignments: {
            branchLeadSourcesList: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
            operationalZipcodes: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
        },
        credentials: {
            losUsername: {
                schemaType: SchemaTypes.Text,
                label: 'LOS Username',
                optional: true,
            },
            losPassword: {
                schemaType: SchemaTypes.Password,
                label: 'LOS Password',
                optional: true,
            },
            ppeUsername: {
                schemaType: SchemaTypes.Text,
                label: 'PPE Username',
                optional: true,
            },
            ppePassword: {
                schemaType: SchemaTypes.Password,
                label: 'PPE Password',
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
