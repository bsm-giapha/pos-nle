# Application Architecture
The **New Lender Experience** has a different **Application Architecture** than our Legacy Application. BeSmartee developers must understand this new **Application Architecture** to work on the **New Lender Experience** with confidence.

## SPA vs MPA
The **New Lender Experience** is a Single Page Application (SPA), which is fundamentally different than our Legacy Application, which is a Multi-Page Application (MPA).

This means that the entire **New Lender Experience** is served on **one page**. A front-end JavaScript framework (Vue) is used to handle client-side template rendering. A front-end router (Vue Router) handles navigation between pages. Data is asynchronously fetched from our API to display new pages, which is (often) managed through a state management pattern (Vuex).

This is a dramatic change from our Legacy MPA, which is served across **many pages**. Templates are rendered using PHP on the server. A back-end router (i.e. `.htaccess` and `index-*.php`) handles navigation between pages. Data is fetched on page load and is sometimes asynchronously fetched through our API.

Understanding the differences between SPAs and MPAs is critical to understanding the new **Application Architecture** because every architectural detail covered in this documentation page is based on the fact that the **New Lender Experience** is an SPA.

## Templating and Client-Side Rendering
The **New Lender Experience** uses Vue to render templates on the client-side, which is wholly capable of handling our existing presentation logic in a more performant and reusable manner. No PHP is used whatsoever to render templates.

## Front-End Routing
The **New Lender Experience** uses Vue Router (a front-end routing system) to handle page navigation. It is equivalent to our Legacy Application's `.htaccess` and `index-*.php` pattern for handling back-end navigation.

:::tip What about security and denying access to pages/workflows?
It sounds controversial to allow the front-end to define routing and page navigation when you know the security maxim "never trust the front-end." 

This is still true for us in the **New Lender Experience**; we don't trust the front-end. The front-end is deliberately "dumb" by default because it depends on the back-end for data, authentication, and access control for every page and API request.

This means that the **New Lender Experience's** front-end is just as secure (if not more secure) than our Legacy Application's front-end. Why? Because the **New Lender Experience** makes use of a new **REST API** powered by our in-house [Ardent](/ardent-api/learn/) API framework, which requires and enforces strict access control policies for all resources being accessed in a request.

This is in contrast to our Legacy Application, which will sometimes fail to enforce proper access control policies for resources being accessed on a page or in a back-end script request.
:::

## API
An **SPA** is only feasible with a strong API to support its asynchronous requests. The **New Lender Experience** has a strong **REST API** powered by [Ardent](/ardent-api/learn/) to handle the **SPA's** need for data access and transformation.

## Request Lifecycle
The **New Lender Experience's SPA** has a different **Request Lifecycle** than our Legacy MPA. In many ways, they are similar, but there are key differences in how each part is handled.

### 1. Apache

A client request is first handled in `.htaccess` and caught by a single `RewriteRule` statement:
```apacheconf
RewriteRule ^new/lender/(.*)?$ routers/apps/router-lender.php [QSA,NC]
```

### 2. Application Router
The request is then handled by a catch-all application router (equivalent to our Legacy Application's `index-*.php` files) like so:
```php
<?php
$action = "";
require_once("./router-lender-preflight.php"); // Standard authentication and setup
require_once("../../../resources/apps/lender/lender.template.php"); // Renders the single HTML page that the SPA lives in
require_once("./router-lender-postflight.php"); // Exit cleanup (i.e. closing database connections)
```

### 3. Bootstrap Template
The application router will always use a `lender.template.php` file to render the HTML page that the **SPA** lives in.

The `lender.template.php` file is essentially a bootstrapper to start the **MLO Command Center**. Its only purpose is to:
- Load all minimum required files (i.e. JavaScript, CSS)
- Setup CSRF
- Instantiate and mount an `AppLender` Vue component that renders the **MLO Command Center**

### 4. Vue Templating, Routing, and API Requests
From then on, the `AppLender` Vue component handles all rendering of pages and navigation via a front-end router. It will make asynchronous requests to the **REST API** as needed to fetch data and perform checks.