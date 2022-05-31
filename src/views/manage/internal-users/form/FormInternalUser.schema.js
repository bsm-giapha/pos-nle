import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        account: {
            firstName: {
                schemaType: SchemaTypes.Text,
            },
            middleName: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            lastName: {
                schemaType: SchemaTypes.Text,
            },
            title: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            email: {
                schemaType: SchemaTypes.Text,
            },
            timezone: {
                schemaType: SchemaTypes.DropdownSingle,
                options: [
                    { id: 'timezoneHST', label: 'HST', value: 'HST' },
                    { id: 'timezoneAKST', label: 'AKST', value: 'AKST' },
                    { id: 'timezonePST', label: 'PST', value: 'PST' },
                    { id: 'timezoneMST', label: 'MST', value: 'MST' },
                    { id: 'timezoneCST', label: 'CST', value: 'CST' },
                    { id: 'timezoneEST', label: 'EST', value: 'EST' },
                ],
            },
            phoneNumber: {
                schemaType: SchemaTypes.PhoneNumber,
            },
            phoneExtension: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            accountStatus: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'Active accounts can login and perform duties as assigned. Inactive accounts cannot login or originate loans. Note: For auditing purposes, we do not delete users and instead mark them as “inactive”.',
                descriptionTrue: 'Active',
                descriptionFalse: 'Inactive',
            },
            canCreateTestApplications: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'Whitelisting a User for test applications means that they can perform test applications with approved testcases. For a list of approved testcases for your company, please contact Support.',
            },
            isInTaskRoundRobin: {
                schemaType: SchemaTypes.Switch,
            },
            preferredLanguage: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
                options: [
                    { id: 'preferredLanguageEnglish', label: 'English', value: 'English' },
                    { id: 'preferredLanguageSpanish', label: 'Spanish', value: 'Spanish' },
                ],
            },
            emailCCList: {
                schemaType: SchemaTypes.InputList,
                label: 'Email CC List',
                subLabel: 'The following email addresses are CC\'d on all borrower-related system emails sent to the User.',
                optional: true,
            },
            enableSMS: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'SMS messages will only be sent out within Available Hours. Available Hours must be set in the Availability panel below.',
                optional: true,
            },
            smsPhoneType: {
                schemaType: SchemaTypes.DropdownSingle,
                options: [
                    { id: 'phoneType', label: 'Primary Phone', value: 'phonePrimary' },
                    { id: 'phoneTypeSecondary', label: 'Secondary Phone', value: 'phoneSecondary' },
                    { id: 'phoneTypeWork', label: 'Work Phone', value: 'workPhone' },
                ],
            },
            smsNotificationLogs: {
                schemaType: SchemaTypes.InputList,
            },
            availability: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'Setting this value to \'Unavailable\' will ensure that the User will receive new loans during the specified date and time range.',
                descriptionTrue: 'Available',
                descriptionFalse: 'Unavailable',
                optional: true,
            },
            unavailableDates: {
                schemaType: SchemaTypes.DateTime,
                subLabel: 'First, select the Unavailable From date and then select a corresponding time. Then, proceed to selecting the Unavailable Until date and time.',
            },
            availableHours: {
                schemaType: SchemaTypes.CustomArrayType,
                subLabel: 'If the User has opted-in for SMS, notifications will be sent during the Available Hours below.',
                optional: true,
            },
        },
        assignments: {
            role: {
                schemaType: SchemaTypes.DropdownSingle,
            },
            region: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            urlName: {
                label: 'URL Name',
                subLabel: "If desired, specify a unique keyword to use in this User's signup link. This will show as something like 'https://www.besmartee.com/app/signup/mylendername/{your value here}'",
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            vanityURL: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            preferredLoanOfficerAssistant: {
                schemaType: SchemaTypes.DropdownSingle,
                subLabel: 'A user can have a preferred Loan Officer Assistant. A preferred Loan Officer Assistants will be assigned to all new loans that are created with the User by default.',
                optional: true,
            },
            loanOfficerAssistants: {
                schemaType: SchemaTypes.InputList,
                subLabel: 'Here are all of the Loan Officer Assistants that have been assigned to this User.',
                optional: true,
            },
            processor: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            preferredLOAToTheseLOs: {
                schemaType: SchemaTypes.DropdownMultiple,
                label: 'Loan Officers for whom this User is the preferred Loan Officer Assistant',
                optional: true,
            },
            loanOfficersTheLOAIsAssignedTo: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
            campaigns: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
            primaryBranch: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            branches: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
            teams: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
            defaultLeadSource: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            leadSources: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
            certifications: {
                schemaType: SchemaTypes.DropdownMultiple,
                optional: true,
                options: [
                    { id: 'constructionRenovation', label: 'Construction/Renovation', value: 'Construction/Renovation' },
                    { id: 'foreignNational', label: 'Foreign National', value: 'Foreign National' },
                ],
            },
        },
        licensingCredentials: {
            label: 'Licensing & Credentials',
            nmlsNumber: {
                label: 'Nationwide Multistate Licensing System (NMLS) Number',
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            stateLicensing: {
                schemaType: SchemaTypes.InputList,
                optional: true,
            },
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
            crmUID: {
                schemaType: SchemaTypes.Text,
                label: 'CRM UID',
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
            ppeEmail: {
                schemaType: SchemaTypes.Text,
                label: 'PPE Email',
                optional: true,
            },
            ppeBranchID: {
                schemaType: SchemaTypes.Number,
                label: 'PPE Branch ID',
                optional: true,
            },
            ppeUserID: {
                schemaType: SchemaTypes.Number,
                label: 'PPE User ID',
                optional: true,
            },
            creditVendor: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            creditLoginID: {
                schemaType: SchemaTypes.Text,
                label: 'Credit Login ID',
                optional: true,
            },
            creditLoginPassword: {
                schemaType: SchemaTypes.Password,
                optional: true,
            },
            creditInternalID: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            creditSurrogateLoginID: {
                schemaType: SchemaTypes.Password,
                optional: true,
            },
            doUsername: {
                schemaType: SchemaTypes.Text,
                label: 'DO Username',
                optional: true,
            },
            doPassword: {
                schemaType: SchemaTypes.Password,
                label: 'DO Password',
                optional: true,
            },
            doCreditUsername: {
                schemaType: SchemaTypes.Text,
                label: 'DO Credit Username',
                optional: true,
            },
            doCreditPassword: {
                schemaType: SchemaTypes.Password,
                label: 'DO Credit Password',
                optional: true,
            },
            duUsername: {
                schemaType: SchemaTypes.Text,
                label: 'DU Username',
                optional: true,
            },
            duPassword: {
                schemaType: SchemaTypes.Password,
                label: 'DU Password',
                optional: true,
            },
            duCreditUsername: {
                schemaType: SchemaTypes.Text,
                label: 'DU Credit Username',
                optional: true,
            },
            duCreditPassword: {
                schemaType: SchemaTypes.Password,
                label: 'DU Credit Password',
                optional: true,
            },
            lpUsername: {
                schemaType: SchemaTypes.Text,
                label: 'LP Username',
                optional: true,
            },
            lpPassword: {
                schemaType: SchemaTypes.Password,
                label: 'LP Password',
                optional: true,
            },
        },
    };
};

export default {
    createEditSchema() {
        let schema = getBaseSchema();
        schema.account.namedRoute = 'ManageInternalUserEditTabAccount';
        schema.assignments.namedRoute = 'ManageInternalUserEditTabAssignments';
        schema.licensingCredentials.namedRoute = 'ManageInternalUserEditTabLicensingCredentials';
        return schema;
    },
    createAddSchema() {
        let baseSchema = getBaseSchema();

        let platformPanel = {
            accountStatus: baseSchema.account.accountStatus,
            sendEmailToUserOnCreation: {
                schemaType: SchemaTypes.Checkbox,
                label: 'Send Welcome Email to User',
                subLabel: 'The email will contain the user name, a temporary password, and the login link the user can use to login to the Lender Portal.',
                hideMetaLabel: true,
            },
            canCreateTestApplications: baseSchema.account.canCreateTestApplications,
        };

        let contactPanel = {
            firstName: baseSchema.account.firstName,
            middleName: baseSchema.account.middleName,
            lastName: baseSchema.account.lastName,
            title: baseSchema.account.title,
            email: baseSchema.account.email,
            timezone: baseSchema.account.timezone,
            phoneNumber: baseSchema.account.phoneNumber,
            phoneExtension: baseSchema.account.phoneExtension,
        };

        let companyPanel = {
            role: baseSchema.assignments.role,
        };

        return {
            account: {
                ...platformPanel,
                ...contactPanel,
            },
            assignments: {
                ...companyPanel,
            },
        };
    },
    // eslint-disable-next-line no-unused-vars
    convertClientDataFormatToApiDataFormat(data, isAddForm) {
        return data;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiDataFormatToClientDataFormat(data, isAddForm) {
        if (isAddForm) {
            let assignments = data.assignments;
            assignments.role = assignments.role.id;
        } else {
            let account = data.account;
            account.smsNotificationLogs = account.smsNotificationLogs.map(log => {
                return { id: log.date, value: log.value };
            });

            let assignments = data.assignments;
            assignments.role = assignments.role.id;
            assignments.preferredLoanOfficerAssistant = assignments.preferredLoanOfficerAssistant?.id ?? "";
            assignments.processor = assignments.processor?.id ?? "";
            assignments.preferredLOAToTheseLOs = assignments.preferredLOAToTheseLOs.map(lo => lo.id);
            assignments.loanOfficersTheLOAIsAssignedTo = assignments.loanOfficersTheLOAIsAssignedTo.map(lo => lo.id);
            assignments.primaryBranch = assignments.primaryBranch?.id ?? "";
            assignments.branches = assignments.branches.map(branch => branch.id);
            assignments.campaigns = assignments.campaigns.map(campaign => campaign.id);
            assignments.teams = assignments.teams.map(team => team.id);
            assignments.defaultLeadSource = assignments.defaultLeadSource?.id ?? null;
            assignments.leadSources = assignments.leadSources.map(leadSource => leadSource.id);
        }
        return data;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        return data;
    },
};
