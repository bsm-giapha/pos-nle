# Project Structure
The **New Lender Experience** has a project structure that is different from our usual setup. It is highly recommended that BeSmartee developers take the time to understand the project structure to be effective when working with the **New Lender Experience**.

## The Root Directory
In the very root of the `besmartee_dev` repository are a number of files that are used to build and assist in the development of the **New Lender Experience**. Such files include:
- A `package.json` file that contains our required npm modules and scripts
- A `vue.config.js` file that contains our [Vue-CLI](https://cli.vuejs.org/guide/) build setup
- A `eslintrc.js` file that contains our [eslint](https://eslint.org/) setup for JavaScript and Vue linting
- A `postcss.config.js` file that contains our [PostCSS](https://github.com/postcss/postcss) setup for transforming CSS
- A `jest.config.js` file that contains our [Jest](https://jestjs.io/) unit testing setup

## The App Directory
The **App Directory** for the project exists within the `resources/apps` directory. 

The "apps" directory implies the existence of many applications, and this is accurate; one day we will have an SPA for each core function of BeSmartee, including:
- The Lender MLO Command Center (i.e. the **New Lender Experience**)
- The Consumer Application
- Partner Marketplace and other supplementary services
- The BSM Admin Portal
- The Agent Portal
- And whatever else we decide to build in the future

### The App Common Directory
The **App Common Directory** exists within the `resources/apps/common` directory.

The **App Common Directory** contains all resources that are used across all BeSmartee applications (i.e. not just the **New Lender Experience**). Such resources include:
- [Bright](/bright-design-system/) itself (so that we can import and use **Bright** Vue components)
- Core build files for Webpack
- Common JavaScript classes
- Common Vue components
- [CSS](/besmartee/new-lender-experience/essentials/css-and-styling/#app-common-css-cirectory)
- Any helper JavaScript or common Vue mixins

## The Lender Directory
The path to the **Lender Directory** is `resources/apps/lender`.

The **Lender Directory** contains all resources that are used to build the **New Lender Experience**. Such resources include:
- The `lender.build.js` build file that compiles the **New Lender Experience**
- The core `lender.template.php` template that serves as the singular PHP template that delivers the **New Lender Experience** to clients
- The `AppLender.vue` component that is mounted in the `lender.template.php` template
- And more folders to house more specific Vue components and portals

### The Lender Common Directory
The path to the **Lender Common Directory** is `resources/apps/lender/common`.

The **Lender Common Directory** contains all resources that are used **exclusively** in the **New Lender Experience** and shared across many Lender-specific views and portals. Such resources include:
- Lender-specific Vue components (such as the Navigation sidebar, which is present in every Lender page)
- The Lender Store and its modules (again, they are always present in every Lender page)
- Helper JavaScript and Vue mixins

:::tip App Common Directory vs Lender Common Directory
It's important to understand the difference between the [App Common Directory](#the-app-common-directory) and the [Lender Common Directory](#the-lender-common-directory).

The [App Common Directory](#the-app-common-directory) contains things that are shared across **many BeSmartee applications**. For example, [Bright](/bright-design-system/) is in the [App Common Directory](#the-app-common-directory) because it will be used in all of our applications (i.e. the Consumer Application, the MLO Command Center, etc.).

The [Lender Common Directory](#the-lender-common-directory) contains things that are **only used within the MLO Command Center** and are **shared across many parts of the MLO Command Center**. For example, the Navigation Sidebar that appears on all Lender pages is in the [Lender Common Directory](#the-lender-common-directory).
:::