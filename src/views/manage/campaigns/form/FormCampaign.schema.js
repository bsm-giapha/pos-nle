import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        information: {
            isActive: {
                schemaType: SchemaTypes.Switch,
                label: 'Is Active?',
                descriptionTrue: 'Active',
                descriptionFalse: 'Inactive',
            },
            name: {
                schemaType: SchemaTypes.Text,
            },
            urlName: {
                schemaType: SchemaTypes.Text,
                label: 'URL Name',
            },
            subscriptionType: {
                schemaType: SchemaTypes.RadioGroup,
                options: [
                    { label: 'Public', value: 'Public' },
                    { label: 'Loan Officer Specific', value: 'Loan Officer Specific' },
                ],
            },
            assignedLoanOfficers: {
                schemaType: SchemaTypes.InputList,
                label: 'Loan Officers assigned to this campaign',
            },
            loanOfficerAssignment: {
                schemaType: SchemaTypes.RadioGroup,
                subLabel: 'Loan officer subscriptions do not determine which loan officers are available to be assigned. If a loan officer would be assigned to a loan officer specific campaign they are not subscribed to, that campaign will not be honored.',
            },
            assignedSellingAgentID: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Assigned Selling Agent',
                optional: true,
            },
            assignedLeadSource: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            theme: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Application Theme',
                optional: true,
            },
            navbarCompanyLogo: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
            useLogoInSignupNavbar: {
                schemaType: SchemaTypes.Switch,
                label: 'Use the company logo in the Signup navbar',
            },
            coBrandLogo: {
                schemaType: SchemaTypes.Text,
                label: 'Co-brand Logo',
                optional: true,
            },
            useCoBrandLogoInPrequalAndApprovalLetter: {
                schemaType: SchemaTypes.Switch,
                label: 'Use the Co-brand Logo in the Pre-Qualification Letter & the Approval Letter',
            },
            useCoBrandAddressInPrequalAndApprovalLetter: {
                schemaType: SchemaTypes.Switch,
                label: 'Use the Co-brand Address in the Pre-Qualification Letter & Approval Letter',
            },
            useCoBrandLogoInSignupHeader: {
                schemaType: SchemaTypes.Switch,
                label: 'Use the Co-brand Logo in the header of the Signup page',
            },
            useCoBrandLogoInSignupFooter: {
                schemaType: SchemaTypes.Switch,
                label: 'Use the Co-brand Logo in the footer of the Signup page',
            },
            signupHeader: {
                schemaType: SchemaTypes.Text,
                label: 'Signup Header Verbiage',
                optional: true,
            },
            signupSubHeader: {
                schemaType: SchemaTypes.Text,
                label: 'Signup Sub-header Verbiage',
                optional: true,
            },
            emailCTAButtonColor: {
                schemaType: SchemaTypes.Text,
                optional: true,
            },
        },
        configurations: {
            showInCreateNewApplication: {
                schemaType: SchemaTypes.Switch,
                label: 'Include this campaign when creating a new application',
                subLabel: 'This occurs when an application is created by a Loan Officer or Loan Officer Assistant.',
            },
            checkForReturningUsers: {
                schemaType: SchemaTypes.Switch,
                label: 'Check for returning users',
                subLabel: 'This will provide a returning user with an option to login.',
            },
            applicationScope: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            jumboLoanCriteria: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'The criteria to determine a jumbo loan',
                options: [
                    { label: 'Loan Amount and Loan Product', value: '0' },
                    { label: 'Loan Amount only', value: '1' },
                    { label: 'Loan Product only', value: '2' },
                ],
            },
            allowMarriedCoBoSameEmail: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow a married co-borrower to share an email address with their spouse that\'s on the loan',
                subLabel: 'This allows spouses to be notified through a single email address.',
            },
            collectReferralSource: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'Allow the borrower to provide their referral source',
                options: [
                    { label: 'Yes, make this required', value: 'Required' },
                    { label: 'Yes, but make this optional', value: 'Optional' },
                    { label: 'No, do not ask the borrower for a referral source', value: 'No' },
                ],
            },
            autoAssignMortgageLienType: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Auto-Assign Mortgage Lien Type',
                optional: true,
                options: [
                    { label: 'Do Not Auto-Assign', value: '' },
                    { label: 'First Lien', value: 'FirstLien' },
                    { label: 'Subordinate Lien', value: 'SecondLien' },
                ],
            },
            collectAssets: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their assets',
            },
            showLTV: {
                schemaType: SchemaTypes.Switch,
                label: 'Show the borrower their LTV ratio',
                subLabel: 'This is displayed on the Verify Application page.',
            },
            ausApprovalRule: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'AUS Approval Rule',
                optional: true,
            },
            statusThatTriggersInitialConditionsCreation: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'The Status/Sub-Status that will automatically create a borrower\'s Initial Conditions',
                optional: true,
                options: [
                    { label: 'Loan Approval/Chose Loan', value: 'Loan Approval*Chose Loan' },
                    { label: 'Loan Approval/Disclosures Created', value: 'Loan Approval*Disclosures Created' },
                    { label: 'Loan Approval/Disclosures Signed', value: 'Loan Approval*Disclosures Signed' },
                    { label: 'Loan Approval/Submitted Application', value: 'Loan Approval*Submitted Application' },
                    { label: 'Verify Application/Application Created', value: 'Verify Application*Application Created' },
                    { label: 'Never', value: 'Never' },
                ],
            },
            allowCreditToRun: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'Allow the borrower\'s credit to run',
                options: [
                    { label: 'Yes', value: '0' },
                    { label: 'Yes, but give the borrower the option to opt-out of running credit', value: '1' },
                    { label: 'No, the borrower does not have the option to run credit', value: '2' },
                ],
            },
            creditPullType: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'The borrower\'s credit pull',
                options: [
                    { label: 'Should be an automatic pull', value: '0' },
                    { label: 'Should be a manual pull', subLabel: 'Turning this option to "Manual" prevents the application from automatically running credit. Instead, it will be up to the Loan Officer to go into the application and force a credit pull. Loan Applications set to "Manual" will ALWAYS be downgraded to "Application Only"', value: '1' },
                ],
            },
            collectEmployerStreetAddress: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their employer\'s street address',
            },
            collectEmployerCity: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their employer\'s city',
            },
            collectEmployerState: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their employer\'s state',
            },
            collectEmployerZipcode: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their employer\'s zipcode',
            },
            collectEmployerPhoneNumber: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their employer\'s phone number',
            },
            collectProposedRETaxForTBD: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide proposed RE taxes for TBD loans',
            },
            collectProposedHazardInsuranceForTBD: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide proposed hazard insurance for TBD loans',
            },
            showDTI: {
                schemaType: SchemaTypes.Switch,
                label: 'Show the borrower their DTI ratio',
                subLabel: 'This is displayed on the Verify Application page.',
            },
            collectLiabilities: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide their liabilities',
            },
            allowREOPropertyLinkToLiability: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to link REO Properties to liabilities',
            },
            defaultLoanTemplatePurchase: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Default Loan Creation Template - Purchase',
                searchable: true,
                optional: true,
            },
            defaultLoanTemplateRefinance: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Default Loan Creation Template - Refinance',
                searchable: true,
                optional: true,
            },
            customLoanTemplateList: {
                schemaType: SchemaTypes.InputList,
                label: 'Custom Loan Templates',
            },
            isForHELOC: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow HELOCs',
            },
            helocDisclosure: {
                schemaType: SchemaTypes.Text,
                label: 'Upload a HELOC Disclosure',
                subLabel: 'PDF files only',
            },
            isProductFHA: {
                schemaType: SchemaTypes.Switch,
                label: 'Offer FHA Products',
            },
            isProductVA: {
                schemaType: SchemaTypes.Switch,
                label: 'Offer VA Products',
            },
            useBeSmarteePPE: {
                schemaType: SchemaTypes.Switch,
                label: 'Use BeSmartee\'s PPE',
            },
            showAmortization: {
                schemaType: SchemaTypes.Switch,
                label: 'Show Amortization Details',
            },
            isPropertyKnownDefault: {
                schemaType: SchemaTypes.Switch,
                label: 'Ask for the borrower\'s known property address by default',
                subLabel: 'This field appears on the Start Personal page.',
            },
            allowedPropertyAddressInputFields: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Property address input fields that will be displayed to the borrower',
                subLabel: 'These fields appear on the Start Personal page.',
                optional: true,
                options: [
                    { label: 'TBD and Known Property Address', value: 'Both' },
                    { label: 'TBD Only', value: 'TBD' },
                    { label: 'Known Property Address Only', value: 'Known' },
                ],
            },
            setDefaultPropertyTypeForTBD: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'Set a default property type for TBD loans',
                options: [
                    { label: 'No', value: '0' },
                    { label: 'Yes and allow the borrower to override the default', value: '1' },
                    { label: 'Yes, but do not allow the borrower to override the default', value: '2' },
                ],
            },
            defaultPropertyTypeForTBD: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'Default property type for TBD loans',
                optional: true,
            },
            collectEstimatedPropertyValue: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to provide an estimated property value',
            },
            borrowerCombinedExperienceType: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'Combined Experience Rule',
                subLabel: 'This determines if the loan application will require the co-borrower\'s consent and verification of data.',
                options: [
                    {
                        label: 'Combined With Authorization',
                        subLabel: 'This will require co-borrower(s) on the loan to log in & provide consent to a credit report and consent to the lender. As a result, the primary borrower will be faced with a hard stop prior to the “Run Credit” step until consent from the co-borrower(s) is received.',
                        value: 'CombinedWithAuthorization',
                    },
                    {
                        label: 'Combined With Authorization Streamlined',
                        subLabel: 'Instead of making co-borrower(s) create an account, log in, and agree and consent, a page will be displayed to the co-borrower asking them to verify the last 4 digits of their social security number.',
                        value: 'CombinedWithAuthorizationStreamlined',
                    },
                    {
                        label: 'Combined Without Authorization',
                        subLabel: 'This eliminates the need for co-borrower(s) on the loan to log in & provide consent to a credit report and consent to the lender.',
                        value: 'CombinedWithoutAuthorization',
                    },
                ],
            },
            allowIdentityVerification: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to verify their identity',
            },
            allowBankImport: {
                schemaType: SchemaTypes.Switch,
                label: 'Allow the borrower to import their bank information',
            },
            allowAutomaticIncomeVerification: {
                schemaType: SchemaTypes.RadioGroup,
                label: 'Allow automatic income verification',
                options: [
                    { label: 'On', value: '1' },
                    { label: 'On and opt-in by default', value: '2' },
                    { label: 'Off', value: '0' },
                ],
            },
        },
        credentials: {
            creditVendor: {
                schemaType: SchemaTypes.DropdownSingle,
                optional: true,
            },
            creditLoginID: {
                schemaType: SchemaTypes.Text,
                label: 'Credit Login ID',
                autocomplete: 'new-password',
            },
            creditLoginPassword: {
                schemaType: SchemaTypes.Password,
                label: 'Credit Login Password',
                autocomplete: 'current-password',
            },
            creditInternalID: {
                schemaType: SchemaTypes.Text,
                label: 'Credit Internal ID',
                autocomplete: 'new-password',
                optional: true,
            },
            ppeUsername: {
                schemaType: SchemaTypes.Text,
                autocomplete: 'new-password',
            },
            ppePassword: {
                schemaType: SchemaTypes.Password,
                label: 'PPE Password',
                autocomplete: 'current-password',
            },
            ppeBranchID: {
                schemaType: SchemaTypes.Text,
                label: 'PPE Branch ID',
                autocomplete: 'new-password',
            },
            ppeUserID: {
                schemaType: SchemaTypes.Text,
                autocomplete: 'new-password',
            },
            ppeLeadID: {
                schemaType: SchemaTypes.Text,
                label: 'PPE Lead Source ID',
                autocomplete: 'new-password',
                optional: true,
            },
            ppeLeadName: {
                schemaType: SchemaTypes.Text,
                autocomplete: 'new-password',
                optional: true,
            },
        },
        customScripts: {
            customScriptHeadTop1: {
                schemaType: SchemaTypes.Text,
                label: 'Top Header Script (#1)',
                subLabel: 'This code snippet will be inserted right after the <head> tag.',
                optional: true,
            },
            customScriptHeadTop2: {
                schemaType: SchemaTypes.Text,
                label: 'Top Header Script (#2)',
                subLabel: 'This code snippet will be inserted right after the <head> tag.',
                optional: true,
            },
            customScriptHeadTop3: {
                schemaType: SchemaTypes.Text,
                label: 'Top Header Script (#3)',
                subLabel: 'This code snippet will be inserted right after the <head> tag.',
                optional: true,
            },
            customScriptHeadBottom1: {
                schemaType: SchemaTypes.Text,
                label: 'Bottom Header Script (#1)',
                subLabel: 'This code snippet will be inserted right before the <head> tag.',
                optional: true,
            },
            customScriptHeadBottom2: {
                schemaType: SchemaTypes.Text,
                label: 'Bottom Header Script (#2)',
                subLabel: 'This code snippet will be inserted right before the <head> tag.',
                optional: true,
            },
            customScriptHeadBottom3: {
                schemaType: SchemaTypes.Text,
                label: 'Bottom Header Script (#3)',
                subLabel: 'This code snippet will be inserted right before the <head> tag.',
                optional: true,
            },
            customScriptBetweenHeadBody1: {
                schemaType: SchemaTypes.Text,
                label: 'Between the Header and Body Script (#1)',
                subLabel: 'This code snippet will be inserted between the </head> and <body> tags.',
                optional: true,
            },
            customScriptBetweenHeadBody2: {
                schemaType: SchemaTypes.Text,
                label: 'Between the Header and Body Script (#2)',
                subLabel: 'This code snippet will be inserted between the </head> and <body> tags.',
                optional: true,
            },
            customScriptBetweenHeadBody3: {
                schemaType: SchemaTypes.Text,
                label: 'Between the Header and Body Script (#3)',
                subLabel: 'This code snippet will be inserted between the </head> and <body> tags.',
                optional: true,
            },
            customScriptBodyTop1: {
                schemaType: SchemaTypes.Text,
                label: 'Body Script (#1)',
                subLabel: 'This code snippet will be inserted right after the <body> tag.',
                optional: true,
            },
            customScriptBodyTop2: {
                schemaType: SchemaTypes.Text,
                label: 'Body Script (#2)',
                subLabel: 'This code snippet will be inserted right after the <body> tag.',
                optional: true,
            },
            customScriptBodyTop3: {
                schemaType: SchemaTypes.Text,
                label: 'Body Script (#3)',
                subLabel: 'This code snippet will be inserted right after the <body> tag.',
                optional: true,
            },
            customScriptFooter: {
                schemaType: SchemaTypes.Text,
                label: 'Footer Script',
                subLabel: 'This code snippet will be inserted right before the </body> tag.',
                optional: true,
            },
            customScriptHeadTop1LoPortal: {
                schemaType: SchemaTypes.Text,
                label: 'Top Header Script (#1)',
                subLabel: 'This code snippet will be inserted right after the <head> tag.',
                optional: true,
            },
        },
    };
};

export default {
    createEditSchema() {
        let schema = getBaseSchema();
        schema.information.namedRoute = 'ManageCampaignEditTabInformation';
        schema.configurations.namedRoute = 'ManageCampaignEditTabConfigurations';
        schema.credentials.namedRoute = 'ManageCampaignEditTabCredentials';
        schema.customScripts.namedRoute = 'ManageCampaignEditTabCustomScripts';
        return schema;
    },
    createAddSchema() {
        let baseSchema = getBaseSchema();

        const information = baseSchema.information;
        const configurations = baseSchema.configurations;

        let ppePanel = {
            ppeUsername: baseSchema.credentials.ppeUsername,
            ppePassword: baseSchema.credentials.ppePassword,
            ppeBranchID: baseSchema.credentials.ppeBranchID,
            ppeUserID: baseSchema.credentials.ppeUserID,
            ppeLeadID: baseSchema.credentials.ppeLeadID,
            ppeLeadName: baseSchema.credentials.ppeLeadName,
        };

        return {
            information: {
                ...information,
            },
            configurations: {
                ...configurations,
            },
            credentials: {
                ...ppePanel,
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
            // let assignments = data.assignments;
            // assignments.role = assignments.role.id;
        } else {
            let information = data.information;
            information.assignedLoanOfficers = information.assignedLoanOfficers.map(assignedLoanOfficer => assignedLoanOfficer.id);
        }
        return data;
    },
    // convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
    convertApiValidationFormatToClientValidationFormat(data) {
        return data;
    },
};
