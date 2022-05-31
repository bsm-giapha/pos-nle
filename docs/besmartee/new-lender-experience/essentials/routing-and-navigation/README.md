# Routing and Navigation
The **New Lender Experience** uses a front-end router (powered by [Vue Router](https://router.vuejs.org/guide/)) to handle user navigation. This is significantly different from our Legacy Application's back-end routing system, which relies on `.htaccess` and `index-*.php` files to route URLs to their correct template.

## Vue Router
[Vue Router](https://router.vuejs.org/guide/) is a part of the **Vue** ecosystem and serves as the official **Vue** routing solution.

In simplest terms, **Vue Router** is a way for us to match routes to pages in the **New Lender Experience**. For example, we can define a route as `"/my-new-page"` and have a `MyNewPage".vue` component show when it matches in a client's web browser. This is the same as what we'd do when defining routes and actions in our Legacy Application's `.htaccess` and `index-*.php` files; the only major difference is that it's being done in the front-end and not the back-end.

It is recommended that all BeSmartee developers step through the **Essential** documentation on the [Vue Router guide](https://router.vuejs.org/guide/) so that they can understand how to effectively route URLs to views using **Vue Router**.

## Routing in the New Lender Experience
Due to its large number of pages, the **New Lender Experience** makes use of a particular routing pattern in an effort to organize and simplify routing as much as possible.

### The `<AppLender>` component
The **New Lender Experience** is rendered entirely in one Vue component: `<AppLender>`. This component exists in the [Lender Directory](/besmartee/new-lender-experience/essentials/project-structure/#the-lender-directory) (i.e. `/resources/apps/lender`). Its file contents are:

<<< @/resources/apps/lender/AppLender.vue

The `<AppLender>` component wraps the current page in a `<NavigationLender>` component, which is a component that handles all global navigation presentation logic (including the Sidebar and Page Headers).

By itself, the `<AppLender>` component doesn't do much; it's just a container that contains the navigation and currently matched route / page (which is rendered in the `<router-view>` component).

### Registering Front-End Routes
Front-end routes are registered in the `lender.build.js` file, which exists in the [Lender Common Directory](/besmartee/new-lender-experience/essentials/project-structure/#the-lender-common-directory) `/resources/apps/lender/common`.

The `lender.build.js` file, in addition to importing a number of essential modules, composes the final list of routes to use in the **New Lender Experience**. This can be seen below in the `routes` property of the object passed in to the `new VueRouter()` constructor:

<<< @/resources/apps/lender/lender.build.js {11-14}

You will notice toward the very beginning of the file that various Route arrays are imported in the `lender.build.js` file like so:

```javascript
import { LenderManageUsersRoutes } from "Lender/manage/users/LenderManageUsers.routes";
import { LenderManageHierarchyRoutes } from "Lender/manage/hierarchy/LenderManageHierarchy.routes";
```

These imported Route arrays are arrays of `RouteConfig` objects from **Vue Router**. These `RouteConfig` objects are how we define Routes for Vue Router. See the [Vue Router API documentation](https://router.vuejs.org/api/#router-construction-options) for more information on the structure of `RouteConfig` objects.

As a practical example, the **Manage Users** portal (i.e. where the **Internal Users** and **External Users** pages are) keeps its routes in a `LenderManageUsers.routes.js` file, which has contents like so:

```javascript
export const LenderManageUsersRoutes = [
    {
        name: 'ManageUsers', // We can assign names to Routes to easily reference them in code later
        path: '/manage/users/', // This is relative to "/new/lenders". So "/new/lenders/manage/users" will match here
        redirect: { name: 'ManageUsersInternal' }, // If "/new/lenders/manage/users" is matched directly, then redirect to the Internal Users page (i.e. 'ManageUsersInternal')
        // // When this route is matched, replace the `<router-view>` in the `<AppLender>` component with this component. Note: we use lazy loading for webpack optimization (i.e. chunk-splitting).
        component: () => import(
            /* webpackChunkName: "lender/manage/users/AppLenderManageUsers" */
            `Lender/manage/users/AppLenderManageUsers`
            ),
        children: [
            { // Shows the Internal Users page and matches with "/new/lenders/manage/users/internal"
                name: 'ManageUsersInternal',
                path: 'internal',
                component: () => import(
                    /* webpackChunkName: "lender/manage/users/internal/users/AppLenderManageUsers" */
                    `Lender/manage/users/internal/ViewInternalUsers`
                    ),
            },
            { // Shows the External Users page and matches with "/new/lenders/manage/users/external"
                name: 'ManageUsersExternal',
                path: 'external',
                component: () => import(
                    /* webpackChunkName: "lender/manage/users/external/users/AppLenderManageUsers" */
                    `Lender/manage/users/external/users/ViewExternalUsers`
                    ),
            },
        ],
    },
    {
        name: 'ManageUsersInternalEdit', // The Internal User Edit page
        path: '/manage/users/internal/:publicID/:nameFriendly', // matches to "/new/lenders/manage/users/internal/:publicID/:nameFriendly"
        component: () => import(
            /* webpackChunkName: "lender/manage/users/internal/InternalUserEdit" */
            `Lender/manage/users/internal/InternalUserEdit`
            ),
        children: [
            {
                name: 'ManageUsersInternalEditAccount', // The Account tab
                path: 'account', // matches to "/new/lenders/manage/users/internal/:publicID/:nameFriendly/account"
                component: () => import(
                    /* webpackChunkName: "lender/manage/users/internal/InternalUserEdit" */
                    `Lender/manage/users/internal/user/common/Account`
                    ),
            },
            {
                name: 'ManageUsersInternalEditAssignments', // The Assignments tab
                path: 'assignments', // matches to "/new/lenders/manage/users/internal/:publicID/:nameFriendly/assignments"
                component: () => import(
                    /* webpackChunkName: "lender/manage/users/internal/InternalUserEdit" */
                    `Lender/manage/users/internal/user/common/Assignments`
                    ),
            },
            {
                name: 'ManageUsersInternalEditLicensingCredentials', // The Licensing & Credentials tab
                path: 'licensingCredentials', // matches to "/new/lenders/manage/users/internal/:publicID/:nameFriendly/licensingCredentials"
                component: () => import(
                    /* webpackChunkName: "lender/manage/users/internal/InternalUserEdit" */
                    `Lender/manage/users/internal/user/common/LicensingCredentials`
                    ),
            },
        ],
    },
];
```

### Lazy-Loading Components
As one might imagine, a large **SPA** like the **New Lender Experience** would be immensely slow if clients had to download each and every single Vue component (page) in our system.

**Vue Router** deals with this concern by [lazy loading routes](https://router.vuejs.org/guide/advanced/lazy-loading.html), which defers the download and loading of Vue components until they are needed. This is highly efficient and similar to how our Legacy MPA behaves: each page only downloads what it needs.

To lazy load a component for a Route, you will need to define an async Vue component with an import statement like so:
```javascript
const MyComponent = () => import('./MyComponent.vue');
```

More commonly in our `.route.js` files, we use a function to return this definition like so:
```javascript
export const LenderManageUsersRoutes = [
    {
        name: 'ManageUsers',
        path: '/manage/users/',
        redirect: { name: 'ManageUsersInternal' },
        component: lazyLoadApp(), // This is where we lazy-load the component
        children: [ /* ... */ ],
    },
    /* More routes... */
];

function lazyLoadApp() {
    return () => import(
        /* webpackChunkName: "lender/manage/users/AppLenderManageUsers" */
        `Lender/manage/users/AppLenderManageUsers`
    );
}
```

:::tip Webpack Named Chunks
Although optional and advanced, it's recommended to manually define named chunks so that Webpack can group common components together into the same chunk. This is visible in the above example with the `/* webpackChunkName: */` comments in the route example above. Webpack will combine components together into one chunk, which will improve the rendering performance when a user views the page(s).

The performance gain from doing this is minimal on most components, but large pages that are composed of many components may want to leverage Named Chunks to more efficiently split code.

For more information, see the [Webpack documentation on Magic Comments (and Named Chunks)](https://webpack.js.org/api/module-methods/#magic-comments)
:::