import getDataPropertyValueByNestingString2 from "./FormNestingHelper.js";
import _isPlainObject from "lodash/isPlainObject";
import _cloneDeep from "lodash/cloneDeep";
import _startCase from "lodash/startCase";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
const _BrightNotificationFactory = new BrightNotificationFactory();

const ThrowFatalException = () => {
    _BrightNotificationFactory.createNotification({
        type: 'error',
        icon: 'warning',
        duration: 10000,
        label: 'Runtime Error',
        subLabel: 'The requested page could not be loaded at this time. Please try again and/or refresh the page. If this issue persists, please contact technical support.',
    });
    throw 'SchemaHelperFatalException';
};

/**
 * An object containing all of the natively supported NLE input types.
 *
 * Note: If you want to add a one-off type for a form, then consider using one of the "Custom" types.
 * We should only add more types to this list if they are commonly used between different forms.
 *
 * Important: If you add a new entry here, be sure to update DiffBuildChangeMixin's buildFormChange() function.
 */
export const SchemaTypes = {
    Address: "Address",
    Checkbox: "Checkbox",
    Custom: "Custom",
    CustomArrayType: "CustomArrayType",
    CustomObjectType: "CustomObjectType",
    DateTime: "DateTime",
    DropdownSingle: "DropdownSingle",
    DropdownMultiple: "DropdownMultiple",
    InputList: "InputList",
    Money: 'Money',
    Number: "Number",
    Password: "Password",
    PhoneNumber: "PhoneNumber",
    RadioGroup: "RadioGroup",
    StateSingle: "StateSingle",
    StateMultiple: "StateMultiple",
    Switch: "Switch",
    Table: "Table",
    Text: "Text",
};

export const constructInitialFormDataFromSchema = function(schema, isFirstIteration = true) {
    schema = _cloneDeep(schema);
    let initialFormData = {};
    if (isFirstIteration) initialFormData['id'] = '';
    for (const [key, value] of Object.entries(schema)) {
        if (['label', 'namedRoute', 'id'].includes(key)) { continue; } // Skips cases where sections have label keys sometimes.
        if ('schemaType' in value) { // This is a field
            initialFormData[key] = getDefaultValueForSchemaType(value.schemaType, value);
        } else { // This is a section
            initialFormData[key] = constructInitialFormDataFromSchema(value, false);
        }
    }
    return initialFormData;
};

function getDefaultValueForSchemaType(schemaType, schema) {
    if ('defaultValue' in schema) return schema.defaultValue;
    switch (schemaType) {

        case SchemaTypes.Address:
        case SchemaTypes.CustomObjectType:
            return {};

        case SchemaTypes.Checkbox:
        case SchemaTypes.Switch:
            return false;

        case SchemaTypes.Money: // Numbers and Money are always treated as strings
        case SchemaTypes.Number:
            return '0';

        case SchemaTypes.DropdownSingle:
        case SchemaTypes.DateTime:
        case SchemaTypes.Password:
        case SchemaTypes.PhoneNumber:
        case SchemaTypes.RadioGroup:
        case SchemaTypes.StateSingle:
        case SchemaTypes.Text:
            return '';

        case SchemaTypes.CustomArrayType:
        case SchemaTypes.DropdownMultiple:
        case SchemaTypes.InputList:
        case SchemaTypes.StateMultiple:
            return [];

        default:
            console.error(`FormSchema.getDefaultValueForSchemaType() invalid schemaType and/or no default value provided ('${schemaType}').`);
            ThrowFatalException();
    }
}

export const updateStateByNesting = function(state, stateKey, change) {
    let value = getDataPropertyValueByNestingString2(state[stateKey], change.nesting, false, true);
    const key = change.nesting.split(".").pop();
    value[key] = change.value;
};

/**
 * Constructs a new instance of an inputValidation object. This is intended to be
 * used in data.inputValidation. It should be called whenever there is a new instance
 * or structure of formData. Note: This is automatically called in most cases, so
 * you shouldn't have to interact with this directly.
 *
 * @param formData
 * @returns {Object}
 */
let buildInputValidation = function(formData) {
    formData = _cloneDeep(formData);
    let inputValidation = {};
    Object.keys(formData).forEach((section) => {
        inputValidation[section] = {};
        if (_isPlainObject(formData[section]) && Object.keys(formData[section]).length > 0) {
            inputValidation[section] = buildInputValidation(formData[section]);
        } else {
            inputValidation[section] = {
                validationType: 'none',
                validationMessage: '',
            };
        }
    });
    return inputValidation;
};

let buildInputMetadata = function(schema, parentNestedID = '', defaultNamedRoute = '') {
    schema = _cloneDeep(schema);
    let inputMetadata = {};

    // We'll always check for a high-level route default and override if needed.
    defaultNamedRoute = schema?.namedRoute ?? defaultNamedRoute;

    for (const [key, inputSchema] of Object.entries(schema)) {
        if (['label', 'namedRoute', 'id'].includes(key)) { continue; } // Skips cases where sections have label keys sometimes.
        let nestedID = (parentNestedID.length === 0) ? key : `${parentNestedID}-${key}`;
        if ('schemaType' in inputSchema) { // This is an input
            inputMetadata[key] = inputSchema;
        } else { // This is a section
            inputMetadata[key] = buildInputMetadata(inputSchema, nestedID);
        }

        inputMetadata[key].id = inputSchema?.id ?? nestedID; // IDs are automatically generated based on the key.
        inputMetadata[key].label = inputSchema?.label ?? _startCase(key); // Labels can be automatically inferred from the key if they aren't present in the schema
        inputMetadata[key].subLabel = inputSchema?.subLabel ?? '';
        inputMetadata[key].namedRoute = inputSchema?.namedRoute ?? defaultNamedRoute; // Individual inputs can define their own route (if needed)

        if ('options' in inputSchema) { // Some components have options (like Dropdowns and Radio Groups). This will extract labels for easy reference when building change objects for the Review Changes panel.
            let optionLabels = {};
            inputSchema.options.forEach(option => {
                if ('options' in option) { // Select Dropdowns can have nested options via an option group
                    option.options.forEach(nestedOption => {
                        optionLabels[nestedOption.value] = nestedOption.label;
                    });
                } else {
                    optionLabels[option.value] = option.label;
                }
            });
            inputMetadata[key].metadataOptionLabels = optionLabels;
        } else if ([SchemaTypes.DropdownSingle, SchemaTypes.DropdownMultiple, SchemaTypes.RadioGroup].includes(inputSchema.schemaType)) {
            // Always have an empty options prop for these component types. State Dropdowns don't need it because they have them provided already.
            inputMetadata[key].options = [];
        }
        if ([SchemaTypes.DropdownMultiple, SchemaTypes.StateMultiple].includes(inputSchema.schemaType)) {
            // Multi-Select Dropdowns will automatically include a "multiple" prop set to true.
            inputMetadata[key].multiple = true;
        }
    }

    return inputMetadata;
};

/**
 * Will step through a formData object and replace null values with default values from getInitialFormData().
 * Null values cause false-positives in the diff function, so we need to handle them this way.
 *
 * It will also replace all numeric inputs with strings. This is needed because HTML inputs always store
 * numeric inputs as strings.
 *
 * Override this if you deal with dynamic formData that does not conform to the usual schema being defined.
 * Note that this is a recursive function, and any overrides will need to be recursive as well.
 *
 * @param {Object} formData
 * @param {Object} initialFormData
 */
export const replaceValuesInFormData = function(formData, initialFormData) {

    for (const [key, value] of Object.entries(initialFormData)) {
        if (formData[key] === null) {
            formData[key] = _cloneDeep(value);
        } else if (typeof value === 'number') {
            formData[key] = formData[key] + '';
        } else if (typeof value === 'boolean') {
            formData[key] = !!formData[key];
        } else if (_isPlainObject(value)) {
            if (Array.isArray(formData[key])) { // Deal with the common case where the back-end sends an empty array for an object input
                formData[key] = {};
            }
            replaceValuesInFormData(formData[key], initialFormData[key]);
        }
    }
};

/**
 * Gets the initial inputValidation.
 * @returns {Object}
 */
export const constructInitialInputValidationFromFormData = function(initialFormData) {
    return buildInputValidation(initialFormData);
};

export const constructInitialInputMetadataFromSchema = function(initialFormData) {
    return buildInputMetadata(initialFormData);
};

export const getDataPropertyValueByNestingString = getDataPropertyValueByNestingString2;

export default {
    SchemaTypes: SchemaTypes,
    constructInitialFormDataFromSchema: constructInitialFormDataFromSchema,
    constructInitialInputValidationFromFormData: constructInitialInputValidationFromFormData,
    constructInitialInputMetadataFromSchema: constructInitialInputMetadataFromSchema,
    updateStateByNesting: updateStateByNesting,
    replaceValuesInFormData: replaceValuesInFormData,
    getDataPropertyValueByNestingString: getDataPropertyValueByNestingString,
};
