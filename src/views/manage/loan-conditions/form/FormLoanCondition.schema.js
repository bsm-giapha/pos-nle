import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        information: {
            isActive: {
                schemaType: SchemaTypes.Switch,
                label: 'Can Be Created',
                subLabel: 'Whether this Condition can be created in your company\'s loan applications.',
                descriptionTrue: 'Yes',
                descriptionFalse: 'No',
            },
            name: {
                schemaType: SchemaTypes.Text,
                label: 'Internal Name',
                subLabel: 'The internal name for this Condition. This name will only appear for your company\'s Internal Staff (including Loan Officers, Processors, and Underwriters); it will never be shown to Borrowers.',
            },
            description: {
                schemaType: SchemaTypes.Text,
                label: 'Internal Description',
                subLabel: 'The description for this Condition that provides more details and instructions for users to follow. Internal Staff will always see this description. Borrowers will only see this description if a Borrower Description is not set.',
            },
            friendlyDescription: {
                schemaType: SchemaTypes.Text,
                label: 'Borrower Description',
                subLabel: 'A friendlier description for this Condition that will only be seen by Borrowers. You can provide a more straightforward or simpler description of what the Borrower needs to do to fulfill this Condition.',
                optional: true,
            },
            type: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Priority',
                subLabel: 'An indicator of when this Condition should be completed.',
            },
            status: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Initial Status',
                subLabel: 'The initial status that the condition will be in when it is created.',
                options: [
                    {
                        id: 'New',
                        value: 'New',
                        label: 'New',
                        subLabel: 'Indicates to the Borrower that they need to satisfy this condition.',
                    },
                    {
                        id: 'In Process',
                        value: 'In Process',
                        label: 'In Process',
                        subLabel: 'Indicates to the Borrower that the condition is being handled/will be handled in the near future.',
                    },
                ],
            },
            docType: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Category',
                subLabel: 'The category that best describes this Condition.',
                searchable: true,
            },
            fees: {
                schemaType: SchemaTypes.InputList,
                label: 'Condition Fees',
                subLabel: 'Fees (such as those relating to Appraisal or Credit Report) can be associated with a Condition, which the borrower(s) can pay at their convenience.',
                optional: true,
            },
            payStubRequestedNumberOfDays: {
                schemaType: SchemaTypes.Number,
                label: 'Pay Stub Requested Number of Days',
                subLabel: '(Only applicable to Pay Stub conditions) How many days of paystubs to import if the Borrower on a loan chooses to import their paystubs.',
                optional: true,
            },
            wetSignInitDocName: {
                schemaType: SchemaTypes.Text,
                label: 'Wet Sign Docs Name',
                optional: true,
            },
            isBorrowerSpecific: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Borrowers Who Should Receive This Condition',
                defaultValue: '0',
                options: [
                    { id: "0", label: 'Loan-Level', subLabel: 'This condition is intended to be provided once for the loan or affects all borrowers', value: "0" },
                    { id: "1", label: 'Per Borrower', subLabel: 'Each borrower should receive this condition', value: "1" },
                    { id: "2", label: 'Primary Borrower only', subLabel: 'Only Primary Borrowers should receive this condition.', value: "2" },
                    { id: "3", label: 'Co-Borrowers only', subLabel: 'Only Co-Borrowers should receive this condition.', value: "3" },
                ],
            },
            assignedTo: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Initial Assignee',
                subLabel: 'The person who will be assigned to this Condition when it is created.',
                options: [
                    { id: 'none', value: 'none', label: 'None' },
                    { id: 'agent', value: 'agent', label: 'Agent' },
                ],
                defaultValue: 'none',
            },
            resourceFile: {
                schemaType: SchemaTypes.DropdownSingle,
                label: 'Resource Link',
                subLabel: 'You can link a company resource to this Condition. It will be displayed to the borrower.',
                optional: true,
            },
        },
        automaticTriggers: {
            isAutomatic: {
                schemaType: SchemaTypes.Switch,
                label: 'Automatic Triggering',
                subLabel: 'Whether this Condition will automatically trigger in your company’s loan applications when certain criteria are met.',
                descriptionTrue: 'Enabled',
                descriptionFalse: 'Disabled',
            },
            loanPurpose: {
                schemaType: SchemaTypes.DropdownSingle,
                subLabel: 'Specifies the loan purpose that will trigger this Condition.',
                hideMetaLabel: true,
                defaultValue: 'All',
                options: [
                    { id: "All", value: "All", label: "All" },
                    { id: "Purchase", value: "Purchase", label: "Purchase" },
                    { id: "Refinance", value: "Refinance", label: "Refinance" },
                ],
            },
            productProgram: {
                schemaType: SchemaTypes.DropdownSingle,
                subLabel: 'Specifies the loan product program that will trigger this Condition.',
                hideMetaLabel: true,
                defaultValue: 'All',
                options: [
                    { label: 'All', value: 'All' },
                    { label: 'Conventional', value: 'Conventional' },
                    { label: 'FHA', value: 'FHA' },
                    { label: 'VA', value: 'VA' },
                    { label: 'USDA', value: 'USDA' },
                ],
            },
            occupancyType: {
                schemaType: SchemaTypes.DropdownSingle,
                subLabel: 'Specifies the intended occupancy type that will trigger this Condition.',
                hideMetaLabel: true,
                defaultValue: 'All',
                options: [
                    { label: 'All', value: 'All' },
                    { label: 'Primary residence', value: 'PrimaryResidence' },
                    { label: 'Second/vacation home', value: 'SecondHome' },
                    { label: 'Investment/rental', value: 'Investor' },
                ],
            },
            employmentStatus: {
                schemaType: SchemaTypes.DropdownMultiple,
                label: 'Employment Statuses',
                subLabel: 'Specifies the borrower employment statuses that will trigger this Condition.',
                hideMetaLabel: true,
                searchable: true,
                options: [
                    { label: 'Employed', value: 'Employed' },
                    { label: 'Retired', value: 'Retired' },
                    { label: 'Student', value: 'Student' },
                    { label: 'Unemployed', value: 'Unemployed' },
                    { label: 'Self Employed', value: 'SelfEmployed' },
                    { label: 'Homemaker', value: 'Homemaker' },
                    { label: 'Other', value: 'Other' },
                ],
            },
            states: {
                schemaType: SchemaTypes.StateMultiple,
                label: 'Subject Property States',
                subLabel: 'Specifies the subject property states that will trigger this Condition.',
                hideMetaLabel: true,
            },
            branches: {
                schemaType: SchemaTypes.InputList,
                hideMetaLabel: true,
            },
            minimumLoanAmount: {
                schemaType: SchemaTypes.Money,
                subLabel: 'Specifies the minimum loan amount that will trigger this Condition (i.e. a loan amount over the provided value will trigger this condition).',
                hideMetaLabel: true,
            },
            isSelfEmployed: {
                schemaType: SchemaTypes.Switch,
                label: 'Income from Self-Employment',
                subLabel: 'This condition will trigger if a borrower has any self-employment income.',
                hideMetaLabel: true,
            },
            isEmployedLess2Years: {
                schemaType: SchemaTypes.Switch,
                label: 'Employed Less Than 2 Years',
                subLabel: 'This condition will trigger if a borrower has less than 2 years of employment history.',
                hideMetaLabel: true,
            },
            isRetired: {
                schemaType: SchemaTypes.Switch,
                label: 'Retired',
                subLabel: 'This condition will trigger if a borrower is retired.',
                hideMetaLabel: true,
            },
            isIncomeEmployment: {
                schemaType: SchemaTypes.Switch,
                label: 'Income from Regular Employment',
                subLabel: 'This condition will trigger if a borrower has any regular employment income.',
                hideMetaLabel: true,
            },
            isIncomeSocialSecurity: {
                schemaType: SchemaTypes.Switch,
                label: 'Income from Social Security',
                subLabel: 'This condition will trigger if a borrower has any social security income.',
                hideMetaLabel: true,
            },
            isIncomeVABenefits: {
                schemaType: SchemaTypes.Switch,
                label: 'Income from VA Benefits',
                subLabel: 'This condition will trigger if a borrower has income from VA Benefits.',
                hideMetaLabel: true,
            },
            isIncomeCommission: {
                schemaType: SchemaTypes.Switch,
                label: 'Income from Commissions',
                subLabel: 'This condition will trigger if a borrower has income from Commissions.',
                hideMetaLabel: true,
            },
            isDivorced: {
                schemaType: SchemaTypes.Switch,
                label: 'Divorced',
                subLabel: 'This condition will trigger if a borrower is divorced.',
                hideMetaLabel: true,
            },
            isPayAlimonyChildSupport: {
                schemaType: SchemaTypes.Switch,
                label: 'Pay Alimony or Child Support',
                subLabel: 'This condition will trigger if a borrower pays alimony or child support.',
                hideMetaLabel: true,
            },
            isReceiveAlimonyChildSupport: {
                schemaType: SchemaTypes.Switch,
                label: 'Receive Alimony or Child Support',
                subLabel: 'This condition will trigger if a borrower receives alimony or child support.',
                hideMetaLabel: true,
            },
            isBankruptcy: {
                schemaType: SchemaTypes.Switch,
                label: 'Bankruptcy',
                subLabel: 'This condition will trigger if a borrower was bankrupt within the last 7 years.',
                hideMetaLabel: true,
            },
            isLatesPublicRecords: {
                schemaType: SchemaTypes.Switch,
                label: 'Lates, Collections, Bankruptcies or Judgments',
                subLabel: 'This condition will trigger if a borrower has any recent late payments, collections, bankruptcies, or legal judgments.',
                hideMetaLabel: true,
            },
            isShortSalePreForeclosureDeedInLieu: {
                schemaType: SchemaTypes.Switch,
                label: 'Short Sale, Pre/Foreclosure, Deed-In-Lieu',
                subLabel: 'This condition will trigger if a borrower was involved in a short sale, pre-foreclosure, or deed-in-lieu from declarations.',
                hideMetaLabel: true,
            },
            isLargeDeposit: {
                schemaType: SchemaTypes.Switch,
                label: 'Large Deposits',
                subLabel: 'This condition will trigger if a borrower has made large checking/savings deposits recently.',
                hideMetaLabel: true,
            },
            isBankStatement: {
                schemaType: SchemaTypes.Switch,
                label: 'Bank Statements',
                subLabel: 'This condition will trigger once per checking / savings account asset. (You can use this to easily request Bank Statements for each account.)',
                hideMetaLabel: true,
            },
            isTBDProperty: {
                schemaType: SchemaTypes.Switch,
                label: 'TBD Property',
                subLabel: 'This condition will trigger if the loan is for a TBD subject property.',
                hideMetaLabel: true,
            },
            hasAnyREO: {
                schemaType: SchemaTypes.Switch,
                label: 'Has Any REO Properties',
                subLabel: 'This condition will trigger if a borrower has any Real-Estate Owned Properties.',
                hideMetaLabel: true,
            },
            hasREOMortgage: {
                schemaType: SchemaTypes.Switch,
                label: 'Mortgage on REO Property',
                subLabel: 'This condition will trigger if a borrower has a mortgage on a Real-Estate Owned Property.',
                hideMetaLabel: true,
            },
            hasREOFreeAndClear: {
                schemaType: SchemaTypes.Switch,
                label: 'Free and Clear REO Property',
                subLabel: 'This condition will trigger if a borrower has a Real-Estate Owned that is free and clear.',
                hideMetaLabel: true,
            },
            hasREORental: {
                schemaType: SchemaTypes.Switch,
                label: 'Rental REO Property',
                subLabel: 'This condition will trigger if a borrower has a Real-Estate Owned that is a rental.',
                hideMetaLabel: true,
            },
            isPermanentResidencyAlien: {
                schemaType: SchemaTypes.Switch,
                label: 'Permanent Residency Alien',
                subLabel: 'This condition will trigger if a borrower’s residency type is that of a Permanent Resident Alien.',
                hideMetaLabel: true,
            },
            isDependentsUnder18: {
                schemaType: SchemaTypes.Switch,
                label: 'Dependents Under 18',
                subLabel: 'This condition will trigger if a borrower has dependents under the age of 18.',
                hideMetaLabel: true,
            },
            isNoMortgage: {
                schemaType: SchemaTypes.Switch,
                label: 'No Mortgage',
                subLabel: 'This condition will trigger if a borrower does not provide a mortgage in their expenses (useful for Refinance loans).',
                hideMetaLabel: true,
            },
        },
    };
};

export default {
    createEditSchema() {
        let schema = getBaseSchema();
        schema.information.namedRoute = 'ManageLoanConditionEditTabInformation';
        schema.automaticTriggers.namedRoute = 'ManageLoanConditionEditTabAutomaticTriggers';
        return schema;
    },
    createAddSchema() {
        let schema = getBaseSchema();
        schema.information.namedRoute = 'ManageLoanConditionAddTabInformation';
        schema.automaticTriggers.namedRoute = 'ManageLoanConditionAddTabAutomaticTriggers';
        return schema;
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
