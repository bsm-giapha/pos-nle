# Forms
One of the most common patterns one will see in the **New Lender Experience** is **Forms**. Almost all pages in the **New Lender Experience** have a **Form** (or many **Forms**) in them. To help with this reality, the **New Lender Experience** provides a standard way of defining and collecting **Form** data.

## Features
At a high-level, **Forms** can do the following:

- Show validation messages under each Input ([Granular Input Validation](/bright-design-system/input-library/overview/#input-validation))
- Automatically validate **Forms** while the User is editing data (**Live Validation**)
- Present a summary of changes that the User is making when editing data (**Form Diffing**)
- Allow the User to jump to a field or undo a change (or all changes) when editing data
- Automatically send requests to our API based on the state of **Form** to add or update data on the back-end
- Automatically prompt the User if they'd like to leave a **Form** before saving

These features are exclusive to the **New Lender Experience** and dramatically improve the User Experience when our Users interact with **Forms** in the **New Lender Experience**. In addition, these features are simple to enable from a development standpoint with a standard interface and documentation.

## Forms vs Sub-Forms
**Forms** can either be **Forms** or **Sub-Forms**.

**Forms** are full-fledged Forms that take up the whole screen, support all [Form Features](#features), and typically have many Inputs. Most **Forms** in the **New Lender Experience** are **Forms**.

**Sub-Forms** are streamlined Forms that are typically only shown in [Modals](/bright-design-system/overlay-library/modal/), support **some** [Form Features](#features), and have a couple of Inputs. **Sub-Forms** are used to handle supplementary form data that otherwise wouldn't necessitate the use of a **Form**.

### Feature Sets of Forms and Sub-Forms
**Forms** can use all [Form Features](#features) without restriction. This makes them well-suited for handling the most important **Form** in a layout.

**Sub-Forms** have a limited set of features and can only do the following:

- Show validation messages under each Input ([Granular Input Validation](/bright-design-system/input-library/overview/#input-validation))
- Automatically validate **Forms** while the User is editing data (**Live Validation**)
- Automatically send requests to our API based on the state of **Form** to add or update data on the back-end

This limited feature set of **Sub-Forms** allows them to be used in more agile and space-restricted parts of the **New Lender Experience**. Although it seems like a weakness / deficiency, it's actually a good thing and promotes focus when designing and implementing a layout.

## Forms
As mentioned in [Forms vs Sub-Forms](#forms-vs-sub-forms), **Forms** are full-fledged Forms that take up the whole screen, support all [Form Features](#features), and typically have many Inputs.

**Forms** are comprised of and implemented by three core sub-systems:
- A particular [Vue component structure](#vue-component-structure-for-forms)
- A [Vue Mixin](#the-form-mixin) that contains essential Form state and behavior 
- A [Vuex Store module](#store-modules-for-forms) (all Form Data will reside in the **Lender Store**)

### Vue Component Structure for Forms
**Forms** have a number of required implementation details in the Vue component that they reside in. See below for an annotated overview of how the Vue component structure for a **Form** should look:

```vue
<!-- 1. This <template> is the same for all Forms. -->
<template>
    <keep-alive>
        <router-view v-bind="currentFormSectionBindings">
            <FormReviewChangesPanel v-bind="reviewChangesPanelBindings">
                <FormButtons v-bind="formButtonsBindings" @submit="handleFormSubmit" @discard="discardChangesModalShow"/>
            </FormReviewChangesPanel>
            <FormDiscardChangesModal v-bind="discardChangesModalBindings"/>
            <FormLeaveConfirmationModal v-bind="leaveConfirmationModalBindings"/>
        </router-view>
    </keep-alive>
</template>

<script>
// 2. These `import` statements are always needed.
import { LenderFormMixin } from "Lender/common/mixins/form/LenderFormMixin";
import FormReviewChangesPanel from "Apps/common/components/form/FormReviewChangesPanel";
import FormButtons from "Apps/common/components/form/FormButtons";
import FormDiscardChangesModal from "Apps/common/components/form/FormDiscardChangesModal";
import FormLeaveConfirmationModal from "Apps/common/components/form/FormLeaveConfirmationModal";
import { mapState } from "vuex";

export default {
    name: "MyFormName",

    // 3. These components are always needed.
    components: {
        FormLeaveConfirmationModal,
        FormDiscardChangesModal,
        FormButtons,
        FormReviewChangesPanel,
    },

    // 4. Important: You need to use the LenderFormMixin to enable Form functionality in a Vue component.
    mixins: [LenderFormMixin],

    // 5. Data must include the following fields:
    data() {
        return {
            /** @override LenderFormMixin */
            id: 'internalUserEdit', // Must be a unique string. This `id` will be used in the DOM as an `id` attribute.

            /** @override LenderFormMixin */
            editMethod: 'PATCH', // Must be 'PATCH' or 'PUT'. This will be the HTTP method that the Form will use automatically when validating and submitting the Form.

            /** @override LenderFormMixin */
            modulePath: 'lender/manage/users/internal/FormInternalUser', // Must be a valid Store Module path. As an example, the value shown here is the modulePath variable for the `InternalUserEdit.vue` component (a Form). This means that all Forms need to have a Module in the Lender Store.
        };
    },

    // 6. The following computed properties will need to be set
    computed: mapState({
        formState(state) { // You will need to provide the state of the Form Module (from our Lender Store)
            return state.lender.manage.users.internal.FormInternalUser; // As an example, the value shown here is the formState value for the `InternalUserEdit.vue` component (a Form).
        },
        
        resourceURL() { // The URL provided here will be used to automatically submit requests for the Form (validation, submission)
            return `${this.$store.getters["lender/baseLenderURL"]}/internal-users/${this.userPublicID}`; // As an example, the value shown here is the resourceURL value for the `InternalUserEdit.vue` component (a Form).
        },
    }),

    methods: {
        // 7. Optional, but you'll most likely need to update some things before the Router enters this page.
        beforeRouteEnterExec() {
            this.$store.commit(`${this.modulePath}/updateIsEditForm`, true); // Set to true or false depending on whether your Form is an Add or Edit Form.
            this.getData(); // This is typically where you'll get data from the back-end API.
            this.$store.dispatch('navigation/updateNavigation', { // Updating the Navigation is always a good idea to ensure that the User sees the most accurate navigation items.
                pageName: 'My Form', // The name that shows on top of the Page Header
                breadcrumbs: { // The breadcrumbs that show below the Page Name in the Page Header
                    to: { name: 'ManageUsersInternal' }, // Should be a named route.
                    label: 'Manage > Users > Internal', // The displayed breadcrumb text. Should match the hierarchy of the application.
                },
                tabs: [ // If you need to show tabs, then update this with your tabs. 
                    { to: { name: 'ManageUsersInternalEditAccount' }, label: 'Account' }, // An object with a named Route and a display label for the tab
                    { to: { name: 'ManageUsersInternalEditAssignments' }, label: 'Assignments' }, // And so forth
                    { to: { name: 'ManageUsersInternalEditLicensingCredentials' }, label: 'Licensing & Credentials' },
                    { label: 'Recent Changes' },
                    { label: 'Actions' },
                ],
                backBar: { // Set this if you want to have a Back Bar on top of the page (which is normally a good idea).
                    to: { name: 'ManageUsersInternal' },
                    label: 'Internal Users',
                },
            });
        },
        
        /**
            8. Required if you have Form Sections.
         
            The mapping should be the Named Route for the Form Section to the object in Form Data that it corresponds to.
         
            The below example demonstrates how the `InternalUserEdit.vue` component does its mapping.
            This only makes sense when you know that the Form Data in the Internal Users Form has a structure like so:
         
            {
                account: {}, // The Account Tab (Form Section)
                assignments: {}, // The Assignments Tab (Form Section)
                licensingCredentials: {}, // The Licensing & Credentials (Form Section)
            }
         */
        getFormSectionRouterNameToPathMapping() {
            return {
                'ManageUsersInternalEditAccount': 'account',
                'ManageUsersInternalEditAssignments': 'assignments',
                'ManageUsersInternalEditLicensingCredentials': 'licensingCredentials',
            };
        },

        // 9. Optional, highly recommended if you need to get Form Data from the back-end.
        getData() {
            this.$store.dispatch('lender/navigation/startLoadingAnimation'); // Starting the Loading Animation is a good idea to prevent a jarring experience for the User.
            Promise.all([
                axios.get(this.resourceURL), // Request your data here.
            ]).then((response) => {
                let newData = response[0].data.data[0];
                this.reinitializeFormDataWithNewData(newData); // Important: You need to call this or else the Form will not work with the new data.
            }).catch((error) => {
                console.error(error);
                this.handle500Errors();
            }).then(() => {
                this.$store.dispatch('lender/navigation/stopLoadingAnimation'); // Always stop the Loading Animation.
            });
        },
    },
};
</script>
```

### The Form Mixin
**Forms** import and use a [Mixin](https://vuejs.org/v2/guide/mixins.html) that encapsulates everything it means to be a **Form**. 

This **Mixin** is located within the [Lender Common Directory](/besmartee/new-lender-experience/essentials/project-structure/#the-lender-common-directory) under `/mixins/form/LenderFormMixin.js`. It will be referred to as the **Form Mixin** from here on out in this documentation page.

#### Form Navigation Guards
The **Form Mixin** makes use of [Vue Router's Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards). Thus, the following in-component navigation guards cannot be implemented directly in a **Form**:

- `beforeRouteEnter()`
- `beforeRouteUpdate()`
- `beforeRouteLeave()`

Instead, there are three callback methods that can be used to hook into the above in-component navigation guards:

- `beforeRouteEnterExec()`
- `beforeRouteUpdateExec()`
- `beforeRouteLeaveExec()`

These "exec" callback functions will be called by the **Form Mixin's** implementation of the in-component navigation guards.

#### Form Mixin Data Properties
The **Form Mixin** exposes a number of `data()` properties, some of which must be overridden by developers when they implement a **Form**.

##### Override Data Properties (Form)
The following data properties must be overridden when using the **Form Mixin**:

###### `id: String`
This must be a unique string. It will be outputted to the DOM as an `id` attribute and used as a prefix in a number of other elements and constructs.

###### `editMethod: 'PATCH' | 'PUT'`
This must be either `'PATCH'` or `'PUT'`. This must match the HTTP method that your **Form** will use to edit its Resource. The **Form Mixin** will use this method when making validation and submission requests to the back-end API.

###### `modulePath: String`
This must be a valid path to the Store Module that has the **Form's** data. Because all **Forms** store their data in a Store Module, the **Form Mixin** will use this path to make commits and dispatch actions as needed.

#### Form Mixin Computed Properties
The **Form Mixin** has a number of computed properties, some of which must be overridden by developers when they implement a **Form**.

##### Override Computed Properties (Form)
The following computed properties must be overridden when using the **Form Mixin**:

###### `resourceURL: String`
This will be the URL that the **Form Mixin** will send validation and form submission requests to.

###### `formState: Object`
This will be a reference to the Store Module's state that holds the **Form's** data.

##### Available Computed Properties (Form)
The following computed properties are available when using the **Form Mixin**:

###### `oldFormData: Object`
This holds the **"Old Form Data"** for the **Form**.

For **Add Forms**, this will be the initial blank state of the **Form**.

For **Edit Forms**, this will be the initial values that were obtained from the back-end.

###### `newFormData: Object`
This holds the **"New Form Data"** for the **Form**. This will be the current data for the **Form** and reflects all changes the User makes to a **Form**.

###### `changedFormData: Object`
This holds the **"Changed Form Data"** for the **Form**. This will be the difference between **Old Form Data** and **New Form Data**.

For example, if **Old Form Data** consisted of the following:
```json
{
    "contact": {
        "firstName": "Joe",
        "lastName": "Maryland"
    }
}
```

And the User changed the First Name to be "Joseph", then **Changed Form Data** will be:
```json
{
    "contact": {
        "firstName": "Joseph"
    }
}
```

###### `formWasSubmitted: Boolean`
Returns true if the **Form** was submitted.

###### `changesWereMade: Boolean`
Returns true if the User made any changes to the **Form**.


#### Form Mixin Methods
The **Form Mixin** has a number of methods, some of which must be overridden by developers when they implement a **Form**.

##### Override Methods (Form)
The following methods must be overridden when using the **Form Mixin**:

###### `handleFormSubmitSuccessFinal(): Void`
This is a callback method that can be overridden. It will be executed when a **Form** is successfully submitted (i.e. validation passes and the back-end has been updated).

###### `handleFormSubmitError(error: Object): Void`
This is a callback method that can be overridden. It will be executed when a **Form** encounters an error while submitting to the back-end (i.e. when it automatically validates or the submit button is pressed).

###### `getFormSectionRouterNameToPathMapping(): Object`
*Note: This method only needs to be overridden if your **Form** uses [Form Sections](#form-sections).*

This method should return a mapping object that maps the Named Route of a **Form Section** to its **Form Data** key. This will allow the **Form Mixin** to function correctly when using [Form Sections](#form-sections).

As an example, the Internal Users Form (`InternalUsersEdit.vue`) implements this method like so:

```javascript
/**
 * Note: The Internal Users Form has its Form Data split into three keys like so:
 *
 * {
 *     "account": {},
 *     "assignments": {},
 *     "licensingCredentials": {}
 * }
 */
getFormSectionRouterNameToPathMapping() {
    return {
        'ManageUsersInternalEditAccount': 'account', // Map the Account Tab route to formData.account
        'ManageUsersInternalEditAssignments': 'assignments', // Map the Assignments Tab route to formData.assignments
        'ManageUsersInternalEditLicensingCredentials': 'licensingCredentials', // Map the Licensing & Credentials Tab route to formData.licensingCredentials
    };
},
```

##### Available Methods (Form)
The following methods are available when using the **Form Mixin**:

###### `reinitializeFormDataWithNewData(formData: Object): Void`
This method will reinitialize the **Form's Store Module** with the provided `formData` object. This is required whenever you need to reset a **Form** with fresh data from the back-end.

###### `resetFormData(): Void`
This method will reset the **Form Data** to the value provided in the **Form's Store Module's** `getInitialFormData()` method.

### Store Modules for Forms
**Forms** must have a **Store Module** registered in our [Lender Store](/besmartee/new-lender-experience/essentials/store/#the-lender-store).

This **Store Module** should be located within the [Module Hierarchy](/besmartee/new-lender-experience/essentials/store/#module-hierarchy), albeit with a naming pattern of **Form\*.js** (e.g. "FormInternalUser.js")

#### Structure for Form Store Modules
The following code snippet explains what should be present in all **Form Store Modules**.

```javascript
import CommonForm from "Lender/common/store/modules/CommonForm"; // The CommonForm module exposes a function that can be exported directly. It provide a common template for all Form Modules to follow.

// Here is where you provide your own schema for the Form Data that your form will need.
export default CommonForm(function() {
    return {
        account: {
            accountStatus: false,
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            phoneExtension: '',
            timezone: '',
        },
        assignments: {
            role: '',
            title: '',
            region: '',
            loanOfficerAssistant: '',
            processor: '',
            campaigns: [],
            primaryBranch: '',
            branches: [],
            teams: [],
            canCreateTestApplications: false,
            isInTaskRoundRobin: false,
        },
        licensingCredentials: {
            nmlsNumber: '',
            nameFriendly: '',
            stateLicensing: [],
            losUsername: '',
            crmUID: '',
            ppeEmail: '',
            ppeUserID: '',
            ppeBranchID: '',
            creditVendor: '',
            creditLoginID: '',
            creditLoginPassword: '',
            creditInternalID: '',
            duUsername: '',
            duPassword: '',
            duCreditUsername: '',
            duCreditPassword: '',
            lpUsername: '',
            lpPassword: '',
        },
    };
});
```

#### Lender Form Helper
To assist with building [Store Modules for Forms](#store-modules-for-forms), there is a `LenderFormHelper` module located within the [Lender Common Directory](/besmartee/new-lender-experience/essentials/project-structure/#the-lender-common-directory) in the `/helper` sub-directory.

This **Lender Form Helper** module exposes the following methods to assist with building a **Form Store Module**:

### Form Sections
**Form Sections** are sub-divisions of **Forms** that handle more specialized parts of **Form Data**. This often manifested in the UI through tabs in the Page Header.

**Form Sections** help with organizing large **Forms** and presenting them to the User, at the cost of some setup on the developer's part.

#### Form Section Requirements
Each **Form Section** must have:
- A [dedicated Vue component](#vue-component-structure-for-form-sections) that uses the `LenderFormSectionMixin.js` mixin
- A [key in Form Data](#form-section-data-key) that can be used to nest **Form Section** data
- A Named Route (that maps to its component)

#### Vue Component Structure for Form Sections
**Form Sections** have a number of required implementation details in the Vue component that they reside in. See below for an annotated overview of how the Vue component structure for a **Form Section** should look:

```vue
<template>
    <BrightForm autocomplete="off">
        <slot></slot>
    </BrightForm>
</template>

<script>
import { LenderFormSectionMixin } from "Lender/common/mixins/form/LenderFormSectionMixin";
import BrightForm from "Apps/common/bright/components/input-library/form/BrightForm";

export default {
    name: "MyFormSection",
    components: {
        BrightForm,
    },
    mixins: [LenderFormSectionMixin],
};
</script>
```

#### Form Section Data Key
A **Form Section** must map to a specific key in **Form Data** in its parent **Form**. See [here](#getformsectionrouternametopathmapping-object) for more information.

#### The Form Section Mixin
**Form Sections** import and use a [Mixin](https://vuejs.org/v2/guide/mixins.html) that encapsulates everything it means to be a **Form Section**.

This **Mixin** is located within the [Lender Common Directory](/besmartee/new-lender-experience/essentials/project-structure/#the-lender-common-directory) under `/mixins/form/LenderFormSectionMixin.js`.

##### `getFormInputBindings(relativeFormDataNestingLocation: String): Object`
**Form Sections** are relatively simple to implement, and there's only one method you need to use: `getFormInputBindings()`. This method must be used with all Inputs in the **Form Section** and be bound to it using `v-bind` like so:

```vue
<BrightInputText
    v-bind="getFormInputBindings('firstName')"
    label="First Name"
/>
```

This method requires a "relative nesting" string to work correctly. The above example is from the `Account.vue` **Form Section** component that is used in the `InternalUserEdit.vue` **Form** component. The Account **Form Section** maps to the Internal User's `formData.account` key with a schema like so:

```json
{
    "account": {
        "firstName": "Alice",
        "otherAccountKeys": "",
    },
    "otherFormSectionKeys": {}
}
```

So the Account **Form Section** only needs to provide "firstName" to `getFormInputBindings()` and not the full nesting string (i.e. "account.firstName").

## Sub-Forms
Coming soon™ to a browser near you. Just look at how the Internal Users' State Licensing Form is done for now ¯\\\_(ツ)\_/¯
