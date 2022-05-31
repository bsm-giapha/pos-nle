import { SchemaTypes } from "@/helpers/SchemaHelper.js";

const getBaseSchema = function() {
    return {
        role: {
            name: {
                schemaType: SchemaTypes.Text,
            },
            subroles: {
                schemaType: SchemaTypes.DropdownMultiple,
                label: "Role Types",
            },
        },
        generalPermissions: {}, // Will be dynamically added via Form Fields
        pageVisitPermissions: {}, // Will be dynamically added via Form Fields
        loanPageVisitPermissions: {}, // Will be dynamically added via Form Fields
    };
};

export default {
    createEditSchema() {
        let schema = getBaseSchema();
        schema.role.namedRoute = 'ManageRoleEditTabRole';
        schema.generalPermissions.namedRoute = 'ManageRoleEditTabGeneral';
        return schema;
    },
    createAddSchema() { // TODO
        return getBaseSchema();
    },
    // eslint-disable-next-line no-unused-vars
    convertClientDataFormatToApiDataFormat(data, isAddForm) {
        return data;
    },
    // eslint-disable-next-line no-unused-vars
    convertApiDataFormatToClientDataFormat(data, isAddForm, formFields) {
        /**
         * The Role form is a little different from other forms. It will create "dynamic" inputs in the front-end based
         * on the backend's form fields response.
         *
         * For an illustration of the full process (just in case we need to do this in another form/need to edit this form):
         *
         * 1) At initialization, the Form's Schema does not have any keys in its permission objects (i.e. generalPermissions,
         * pageVisitPermissions, etc.).
         *
         * 2) GET /lenders/{id}/roles/form-fields will return an array of schema objects for each permission object in the
         * shape of:
         *      {
         *          schemaType: 'Switch',
         *          label: '',
         *          subLabel: '',
         *      }
         *
         * 3) In the Form's updateSchemaWithFetchedRequiredData() method, it sets the permission objects' contents to
         * its Form Field value like so:
         *      this.updateBaselineSchema('', 'generalPermissions', {
         *          ...this.formFields.generalPermissions,
         *          namedRoute: 'ManageRoleEditTabGeneral',
         *      });
         *
         * 3a) Note: This effectively allows the Form to dynamically add/completely change the schema of the Form based
         * on the API's response. Think about that for a second; it's really eye-opening and allows us to do almost
         * anything in our Forms.
         *
         * 4) This method handles the Form Data aspect of this pattern. The Role Reader will send an array of strings,
         * which are Permission Keys. It then constructs the Form Data object/values based on whether the Form Field
         * permission objects contain the Role's keys.
         *
         * 5) The display of the dynamic inputs is interesting: You cannot guarantee that all Inputs will be present,
         * so you need to do conditional rendering based on whether the keys you're looking for exist in the Current
         * Form Data. You can also do list rendering with a v-for if you know that all the inputs have the same schemaType
         * (For an example: See how this is done in the Tabs for the Role Form).
         */
        let generalPermissions = {};
        Object.keys(formFields.generalPermissions).forEach(key => {
            generalPermissions[key] = data.generalPermissions.includes(key);
        });

        let pageVisitPermissions = {};
        Object.keys(formFields.pageVisitPermissions).forEach(key => {
            pageVisitPermissions[key] = data.pageVisitPermissions.includes(key);
        });

        let loanPageVisitPermissions = {};
        Object.keys(formFields.loanPageVisitPermissions).forEach(key => {
            loanPageVisitPermissions[key] = data.loanPageVisitPermissions.includes(key);
        });

        return {
            role: {
                name: data.name,
                subroles: data.subroles,
            },
            generalPermissions: generalPermissions,
            pageVisitPermissions: pageVisitPermissions,
            loanPageVisitPermissions: loanPageVisitPermissions,
        };
    },
    // eslint-disable-next-line no-unused-vars
    convertApiValidationFormatToClientValidationFormat(data, isAddForm) {
        return data;
    },
};
