# Store
The **New Lender Experience** uses a Vuex store to share global state across the many Vue components and pages that make up the **MLO Command Center**.

## Vuex
[Vuex](https://vuex.vuejs.org/) is part of the **Vue** ecosystem and serves as the official **Vue** state management solution.

In simplest terms, **Vuex** exposes a singleton object reference (called a **"Store"**) that all **Vue** components can access. The **Store** contains common data that is needed across many **Vue** components, such as verbiage, navigation, and permissions. This data is reactive and all **Vue** components can access or change this data.

This **Store** pattern is nice to have when you have many nested components and layouts (like we do in the **New Lender Experience**). The alternative to using a **Vuex Store** for reactive data is to pass props down a hierarchy of **Vue** components and emit events to change data (which can get repetitive really fast).

It is recommended that all BeSmartee developers become familiar with **Vuex** at a basic level. The [Vuex documentation site](https://vuex.vuejs.org/) is well-written and a good way to acquire a basic level of familiarity with **Vuex**.

## State Management in the New Lender Experience
The **New Lender Experience** has a certain pattern for managing state in an effective and organized manner.

### The Lender Store
In the [Lender Common Directory](/besmartee/new-lender-experience/essentials/project-structure/#the-lender-common-directory) is a `/store` directory that houses the main `StoreLender.js` file, which defines the **Lender Store**.

The `StoreLender.js` file itself is simple; it just registers Vuex to the `<AppLender>` Vue instance and defines various [modules](https://vuex.vuejs.org/guide/modules.html) that will be available for components to access.

<<< @/resources/apps/lender/common/store/StoreLender.js

### Accessing State (and Getters)
There are two ways to access data in the **Lender Store**: State and Getters.

#### State
State can be accessed through a variety of means. The simplest way is like so:

```javascript
this.$store.state.lender.name; // Get the `name` property in the Lender Module. This will return the name of the Lender.
```

There are other ways of accessing and mapping state as well. See the [Vuex documentation on State](https://vuex.vuejs.org/guide/state.html) for more information.

#### Getters
Some Store Modules define [Getters](https://vuex.vuejs.org/guide/getters.html) which are essentially Vuex-styled computed properties. These getters can be accessed like so:

```javascript
this.$store.getters["lender/baseURL"]; // Get the `baseURL` getter in the Lender Module. This will return the base URL used in all API requests.
```

There are other ways of accessing and mapping getters as well. See the [Vuex documentation on Getters](https://vuex.vuejs.org/guide/getters.html) for more information.

### Changing State Via Commits and Actions
A design pattern of Vuex is that state should not be mutated directly; it must be changed through a commit or an action.

#### Commits
Commits are **synchronous** operations that call exactly one mutation. See the [Vuex documentation on Mutations](https://vuex.vuejs.org/guide/mutations.html) for more information.

#### Actions
**Actions** are **asynchronous** operations that can call many mutations. See the [Vuex documentation on Actions](https://vuex.vuejs.org/guide/actions.html) for more information.

## Modules
The **Lender Store** consists of many modules that focus on one thing.

### Lender Module
The **Lender Module** contains general data about the current Lender. This includes their name, available entities (i.e. branches, teams, campaigns, etc.), and other useful metadata.

### Navigation Module
The **Navigation Module** controls the current state of the Navigation system within the New Lender Experience. This includes the current Page Name, available Tabs on the Page Header, and other navigation-related items.

Most notably, it exposes a commonly used `updateNavigation` action that is used to update the current Navigation state.

### Permissions Module
The **Permissions Module** serves as the one-stop location for all Permission-related needs in the New Lender Experience.

Most notably, it exposes several getters that allow you to easily check whether a permission exists or has a particular value. These are often injected into pages/components using [Vuex's `mapGetters` helper](https://vuex.vuejs.org/guide/getters.html#the-mapgetters-helper).

### Form Modules
**Form Modules** exist in nested folders and are prefixed with `Form` (e.g. `FormInternalUser`, `FormBranch`). They contain form data for a page or form. 

Most **Form Modules** make use of a `CommonForm` module, which encapsulates common form data structure for the majority of our Forms in the New Lender Experience.