import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        platform: {
            accountStatus: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'Active accounts can login; Inactive accounts cannot. Note: For auditing purposes, users cannot be deleted but instead can be marked “inactive”.',
                descriptionTrue: 'Active',
                descriptionFalse: 'Inactive',
            },
        },
        contact: {
            firstName: {
                schemaType: SchemaTypes.Text,
            },
            lastName: {
                schemaType: SchemaTypes.Text,
            },
            email: {
                schemaType: SchemaTypes.Text,
                subLabel: 'The User will use this Email to login to their account and receive essential communication.',
            },
            phoneNumber: {
                schemaType: SchemaTypes.PhoneNumber,
            },
        },
        company: {
            company: {
                schemaType: SchemaTypes.Text,
            },
            office: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            officeState: {
                schemaType: SchemaTypes.StateSingle,
                optional: true,
            },
        },
        licensing: {
            agentType: {
                schemaType: SchemaTypes.DropdownSingle,
                options: [
                    { id: 'BuyerAgent', label: 'Buyer Agent', value: 'BuyerAgent' },
                    { id: 'SellerAgent', label: 'Seller Agent', value: 'SellerAgent' },
                    { id: 'HOIAgent', label: 'HOI Agent', value: 'HOIAgent' },
                    { id: 'TitleAgent', label: 'Title Agent', value: 'TitleAgent' },
                    { id: 'BuyerAttorney', label: 'Buyer Attorney', value: 'BuyerAttorney' },
                ],
            },
            license: {
                schemaType: SchemaTypes.Text,
            },
        },
    };
};

export default {
    createEditSchema() {
        return getBaseSchema();
    },
    createAddSchema() {
        let schema = getBaseSchema();
        schema.platform.sendEmail = {
            schemaType: SchemaTypes.Checkbox,
            label: 'Send Welcome Email to User',
            subLabel: 'The email will contain the user name, a temporary password, and the login link the user can use to login to the Agent Portal.',
            hideMetaLabel: true,
        };
        return schema;
    },
    convertClientDataFormatToApiDataFormat(data, isAddForm) {
        let apiFormat = {
            accountStatus: data?.platform?.accountStatus,
            firstName: data?.contact?.firstName,
            lastName: data?.contact?.lastName,
            email: data?.contact?.email,
            phoneNumber: data?.contact?.phoneNumber,
            company: data?.company?.company,
            office: data?.company?.office,
            officeState: data?.company?.officeState,
            agentType: data?.licensing?.agentType,
            license: data?.licensing?.license,
        };
        if (isAddForm) {
            apiFormat.sendEmail = data?.platform?.sendEmail;
        }
        return apiFormat;
    },
    convertApiDataFormatToClientDataFormat(data, isAddForm) {
        let clientFormat = {
            platform: {
                accountStatus: data.accountStatus,
            },
            contact: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
            },
            company: {
                company: data.company,
                office: data.office,
                officeState: data.officeState,
            },
            licensing: {
                agentType: data.agentType,
                license: data.license,
            },
        };
        if (isAddForm) {
            clientFormat.platform.sendEmail = data.sendEmail;
        }
        return clientFormat;
    },
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        return this.convertApiDataFormatToClientDataFormat(data, isAddForm);
    },
};
