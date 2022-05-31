import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function () {
    return {
        applicationData: {
            collectMiddleName: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'Whether to ask the borrower for their Middle Name.',
            },
            normalizeBorrowerName: {
                schemaType: SchemaTypes.Switch,
                subLabel: 'Whether to normalize a borrower\'s name, which will help fix common spelling errors.',
            },
            requireBorrowerSSN: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Borrower SSN',
                subLabel: 'Whether the borrower’s Social Security Number is required. This allows borrowers to provide it later in the application workflow. Note that making Social Security Numbers optional may interfere with credit reports, AUS findings, and other SSN-dependent operations.',
            },
            maxNumberOfCoBorrowers: {
                schemaType: SchemaTypes.Number,
                label: 'Max Number of Co-Borrowers',
                subLabel: 'The maximum number of co-borrowers on a loan.',
            },
            allowMarriedBorrowersToUseSameEmail: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow Married Borrowers to Use Same Email',
                subLabel: 'Whether to allow the sharing of one email for two married borrowers.',
            },
            requireSourceOfDownPayment: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Source of Down Payment',
                subLabel: 'Whether to require the primary borrower to specify the source of the down payment.',
            },
            requireEmployerStreetAddress: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Employer Street Address',
                subLabel: 'Whether to require a street address when a borrower is adding a new employer\'s address on their application.',
            },
            requireEmployerAddressCity: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Employer City',
                subLabel: 'Whether to require a city when a borrower is adding a new employer\'s address on their application.',
            },
            requireEmployerAddressState: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Employer State',
                subLabel: 'Whether to require a state when a borrower is adding a new employer\'s address on their application.',
            },
            requireEmployerAddressZipcode: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Employer Zip Code',
                subLabel: 'Whether to require a zip code when a borrower is adding a new employer\'s address on their application.',
            },
            prePopulateDeclarationsPage: {
                schemaType: SchemaTypes.Switch,
                label: 'Pre-populate Declarations Page',
                subLabel: 'Whether to pre-populate default values on the Verify Declarations page of the application.',
            },
            subjectPropertyIsKnown: {
                schemaType: SchemaTypes.Switch,
                label: 'Assume Subject Property is Known',
                subLabel: 'Whether to assume that the borrower knows the exact address of the subject property. If this is disabled, then a TBD loan will be assumed instead.',
            },
            availableAddressTypesForSubjectProperty: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Available Address Types for Subject Property',
                subLabel: 'The available address types for borrowers when they provide a subject property.',
                options: [
                    { label: 'TBD and Known Property Address', value: 'Both' },
                    { label: 'TBD Only', value: 'TBD' },
                    { label: 'Known Property Address Only', value: 'Known' },
                ],
            },
            availableAddressTypesForTBDLoans: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Available Address Types for TBD Loans',
                subLabel: 'The available address types for borrowers when they are doing a TBD loan where the subject property address is not known.',
                options: [
                    { label: 'No Default Property Set', value: 'No Default Property Set' },
                    { label: 'Set Default Property & Allow Borrower Override', value: 'Set Default Property & Allow Borrower Override' },
                    { label: 'Set Default Property & No Borrower Override', value: 'Set Default Property & No Borrower Override' },
                ],
            },
        },
        workflowRules: {
            loanOfficerAssignmentMethod: {
                schemaType: SchemaTypes.DropdownSingle,
                subLabel: 'The method by which Loan Officers will be assigned to a borrower.',
                optional: true,
                options: [
                    { label: 'Random', subLabel: 'Loan Officers will be randomly assigned.', value: 'Random' },
                    { label: 'Round Robin', subLabel: 'Loan Officers will be assigned in a round-robin manner.', value: 'RoundRobin' },
                    { label: 'Head Shots', subLabel: 'Borrowers can choose their Loan Officer by clicking a Loan Officer\'s headshot image', value: 'HeadShots' },
                ],
            },
            shouldRoundRobinBranchSelection: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Branch Assignment Method',
                subLabel: 'The method by which branches should be considered when doing a round-robin assignment.',
                optional: true,
                options: [
                    { label: 'No', subLabel: 'Branches will not be considered in the round-robin.', value: 'No' },
                    { label: 'State', subLabel: 'Branches will be considered in the round-robin at the state level.', value: 'State' },
                    { label: 'Zip Code', subLabel: 'Branches will be considered at the zip code level.', value: 'Zipcode' },
                ],
            },
            lockPeriods: {
                schemaType: SchemaTypes.InputList,
                label: 'Rate Lock Periods',
                optional: true,
            },
            lockPeriodForPurchaseLoans: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Lock Period for Purchase Loans',
            },
            lockPeriodForRefinanceLoans: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Lock Period for Refinance Loans',
            },
            enablePPERateLock: {
                schemaType: SchemaTypes.Switch,
                label: 'Enable PPE Rate Lock',
            },
            maxLoanAmount: {
                schemaType: SchemaTypes.Money,
                label: 'Maximum Loan Amount',
                subLabel: 'The maximum possible loan amount that a borrower can apply for. Put 0 for no limits.',
            },
            minLoanAmount: {
                schemaType: SchemaTypes.Money,
                label: 'Minimum Loan Amount',
                subLabel: 'The minimum possible loan amount that a borrower can apply for. Put 0 for no limits.',
            },
            approvalVerb: {
                schemaType: SchemaTypes.Text,
                label: 'Approval Verb',
                subLabel: 'The verb that will show when a borrower chooses a loan via the pricing results page during an application. It will appear as a CTA button.',
            },
            approvalVerbiage: {
                schemaType: SchemaTypes.Text,
                label: 'Approval Verbiage',
                subLabel: 'The verbiage that will show when a borrower is approved for a loan.',
            },
            approvalAdverb: {
                schemaType: SchemaTypes.Text,
                label: 'Approval Adverb',
                subLabel: 'The adverb that will show when a borrower is approved for a loan.',
            },
            daysUntilApprovalLetterExpires: {
                schemaType: SchemaTypes.Number,
                label: 'Days Until Approval Letter Expires',
            },
            sendApprovalLetterToBorrower: {
                schemaType: SchemaTypes.Switch,
                label: 'Send Approval Letter to Borrower',
            },
            sendApprovalLetterToAgent: {
                schemaType: SchemaTypes.Switch,
                label: 'Send Approval Letter to Agent',
            },
            requireTwoFactorAuthentication: {
                schemaType: SchemaTypes.Switch,
                label: 'Require Two-Factor Authentication',
                subLabel: 'Whether 2FA is required for all users when logging in.',
            },
            jumboLoanDeterminationMethod: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Jumbo Loan Determination Method',
                subLabel: 'The method by which Jumbo Loans will be determined.',
                options: [
                    { label: 'Loan Amount and Loan Product', value: 0 },
                    { label: 'Loan Amount only', value: 1 },
                    { label: 'Loan Product only', value: 2 },
                ],
            },
            askBorrowerForRealtorOrAgentInformation: {
                schemaType: SchemaTypes.Switch,
                label: 'Ask Borrower for Realtor or Agent Information',
                subLabel: 'Whether to ask the borrower about their realtor / agent (if they\'re working with one).',
            },
            marketplaceCreditRanges: {
                schemaType: SchemaTypes.InputList,
                label: 'Borrower Marketplace Credit Ranges',
            },
        },
        userInterface: {
            checkForReturningUsersOnTheBorrowerSignupPage: {
                schemaType: SchemaTypes.Switch,
                label: 'Check for Returning Users on the Borrower Signup Page',
                subLabel: 'If enabled, the borrower will be asked if they already have an account on the application signup page, and then they will be directed to the login page.',
            },
            linkableCompanyLogo: {
                schemaType: SchemaTypes.Switch,
                label: 'Linkable Company Logo',
                subLabel: 'If enabled, the company logo on the borrower’s application navbar will link to the company’s website.',
            },
            displayCompanyFooterImageInBorrowerApplication: {
                schemaType: SchemaTypes.Switch,
                label: 'Display Company Footer Image in Borrower Application',
                subLabel: 'If enabled, a small logo of your company will be shown in the footer of every page in the borrower application.',
            },
            signupPageHeader: {
                schemaType: SchemaTypes.Text,
                subLabel: 'The page header to display on the borrower signup page. Leave this empty to use our default page header.',
                optional: true,
            },
            signupPageSubHeader: {
                schemaType: SchemaTypes.Text,
                label: 'Signup Page Sub-Header',
                subLabel: 'The page sub-header to display on the borrower signup page. Leave this empty to use our default page sub-header.',
                optional: true,
            },
            useDefaultTOUPP: {
                schemaType: SchemaTypes.Switch,
                label: 'Use Default Terms of Use and Privacy Policy',
                subLabel: 'If enabled, will display our default TOUPP to borrowers. If disabled, you can specify a link to your company’s own Terms of Use and Privacy Policy respectively.',
            },
            termsOfUseURL: {
                schemaType: SchemaTypes.Text,
                label: 'Terms of Use URL',
                subLabel: 'A link to your company’s Terms of Use statement.',
            },
            privacyPolicyURL: {
                schemaType: SchemaTypes.Text,
                label: 'Privacy Policy URL',
                subLabel: 'A link to your company’s Privacy Policy statement.',
            },
            numberOfDigitsToShowWhenDisplayingBorrowerAssetsAndLiabilities: {
                schemaType: SchemaTypes.Number,
                label: 'Number of Digits to Show When Displaying Borrower Assets and Liabilities',
                subLabel: 'If set to 0, will show all digits.',
            },
        },
    };
};

export default {
    createEditSchema() {
        let schema = getBaseSchema();
        schema.applicationData.namedRoute = 'ManageApplicationSettingsEditTabApplicationData';
        schema.workflowRules.namedRoute = 'ManageApplicationSettingsEditTabWorkflowRules';
        schema.userInterface.namedRoute = 'ManageApplicationSettingsEditTabUserInterface';
        return schema;
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
        // return data.information;
        return data;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        // return data.information;
        return data;
    },
};
