# Introduction

## What is Ardent?
**Ardent** is an in-house, opinionated API framework built and maintained by BeSmartee. It makes building APIs simple, fast, and easy through pre-established patterns and interfaces.


Most notably, **Ardent** excels at:
- Easily building new REST and RPC API endpoints
- Defining and enforcing Access Control Policies for Resources
- Authenticating clients using BeSmartee's standard authentication methods
- Facilitating the reusability and composition of Resources for various clients and applications

The **New BeSmartee API** uses **Ardent** to implement all of its endpoints. As such, learning how to use **Ardent** effectively is key to working on future-facing BeSmartee projects such as the **New Lender Experience**.

## Why Ardent?
When re-building the MLO Command Center from the ground up as a Single-Page Application (SPA), it became clear that we needed a fast, scalable, and consistent way of building tens and eventually hundreds of REST API endpoints.

Quantity was not the only concern at the time; we also needed a way to ensure **quality**. We needed a way to ensure that patterns and best practices were in place. We needed to enforce access control and permissions so that only authenticated and privileged users could access and change resources. We wanted one source of truth per resource so that every client and page would have the same interface, albeit tailored to their needs.

To balance **quantity** and **quality**, we needed a solution that would work for BeSmartee. There were many REST API frameworks out there, but none were able to handle our needs without requiring a significant refactor of our library / devops tooling or were too hands-off / convoluted. So a simple, in-house solution was needed, and that solution is **Ardent**.


## Overview

### Model-View-Controller (MVC) Pattern
**Ardent** implements the common Model-View-Controller (MVC) pattern to better separate concerns and facilitate clean code.

### REST and RPC Hybrid API Design
**Ardent** is flexible and can support REST (Representational State Transfer) endpoints (via [Resources and Collections](#resources-and-collections-rest)) as well as RPC (Remote Procedure Call) endpoints (via [Procedures](#procedures-rpc)).

Although **Ardent** is flexible, the BeSmartee API will prefer REST endpoints over RPC endpoints whenever possible as a best practice. Accordingly, RPC endpoints should only be used when absolutely required.

::: tip REST vs RPC
What's the difference between REST and RPC?

REST APIs are based around the organization and access of **Resources** (or objects). REST APIs will have URL endpoints like `/lenders/{id}/loans`, which signify that you can access an object or collection of objects (i.e. "I can access a Lender's Loans). Notice that there is no mention in the URL of a verb or action; it's just the **Resources** themselves. In a REST API, the action you perform on a **Resource** is determined by the HTTP Method used (i.e. GET, POST, PUT, PATCH, DELETE).

RPC APIs are different; they're based around the organization and access of **Procedures** (or functions). RPC APIs will have URL endpoints like `/run-pricing` or `/do-the-thing`. Notice that the URL endpoint starts with a verb ("run", "do"). These RPC endpoints are triggered by POST requests with a payload. As a practical example: Technically, our legacy API fits the RPC design pattern: we would POST to something like "scriptsLender" with an action ("editAdminUser") and a payload for the back-end script.

There is no API design that is objectively better in every scenario, but **Ardent** leans more toward REST principles knowing that access to objects within the BeSmartee system can arguably be best achieved and modeled through a REST API.
:::

### Versioning
**Ardent** requires versioning for its endpoints. This allows us to make big changes to endpoints and safely deprecate older endpoints until all clients have updated to a newer version.

### JSON Representation of Resources
By default, **Ardent** accepts JSON in requests and returns JSON in responses. XML is not currently supported, but could be added in the future if required for legacy systems.

### Resources and Collections (REST)
**Ardent** is primarily organized around **Resources** and **Collections**. They facilitate the design of REST endpoints, which are driven by the concept of **Resources**.

A **Resource** represents an object with a unique ID. **Resources** can be created, read, updated, and deleted. Examples of **Resources** in the BeSmartee system include Loans, Lenders, and Users.

A **Collection** is a container that has many **Resources** in it. **Collections** themselves can be read, updated, and deleted.

For example, we can access a **Collection** of Lenders like so:

```http request
GET /lenders
```

And we could access a particular Lender **Resource** with its ID:

```http request
GET /lenders/{id}
```

#### Filtering, Pagination, and Sorting
It's not uncommon for **Collections** to have hundreds, thousands, or tens of thousands of **Resources** within them. In such cases, there is a need to limit and query the **Collection** so that a client can get what they need (like view Loans in a Lender's Loan Pipeline) without overburdening the client or server.

**Ardent** has built-in support for common operations when performing a GET request on a **Collection**, such as:
- Limiting the number of **Resources** returned
- Paginating via offsets (e.g. "Page 2 of 34")
- Sorting by a field in ascending or descending order
- Searching by a search term
- Filtering via fields and flags

These common operations make it easy to do server-side data tables in applications.

### Procedures (RPC)
**Procedures** are siblings of **Resources** that can only receive POST requests. They facilitate the design of RPC endpoints, which are entirely driven by **Procedures**.

**Procedures** can be nested within **Collections** and other **Resources**, which allows for a lot of flexibility when designing API hierarchies.

As an example of what a **Procedure** could do, we can run pricing for a particular Loan like so:
```http request
POST /lenders/{id}/loans/{id}/run-pricing
```

### Hierarchy
**Resources**, **Procedures**, and **Collections** can be nested within each other to form a hierarchy.

For example, we can access a **Collection** of Branches within a particular Lender like so:

```http request
GET /lenders/{id}/branches
```

### Horizontal Access, Aliases, and Composition
**Resources**, **Procedures**, and **Collections** can access and re-use each other, which allows for easy access to common **Resources** / **Procedures** as well as aliases.

For example, 

### Session-Based Authentication
**Ardent** does not fully adhere to REST Principles; it allows stateful requests. This is intentional given BeSmartee's reliance on PHP Sessions to authenticate its Users. This may be phased out in the future in favor of other authentication methods, but for the near future, it will allow stateful requests.

### Access Control Policies
**Ardent's** most useful feature is its ability to automatically enforce and facilitate the building of **Access Control Policies** for **Resources**.

**Ardent** requires every **Resource**, **Procedure**, and **Collection** to define an **Access Control Policy** that takes into account many nuances and relationships in BeSmartee, such as:

- The type of User making the Request:
  - Lender
  - Consumer
  - BeSmartee Admins (i.e. our own internal staff)
  - Agents
  - And whatever else we have in the future
- Whether the User is in a Wholesale Lender or Broker
- Whether the User has the appropriate Role and Permissions to access the resource
- Whether the User can create, read, update, or delete the requested resource

Whenever an endpoint is accessed, **Ardent** will automatically check the endpoint's **Access Control Policy** against the User making the request. If the User has no access to the endpoint, then the request will fail.

For example, when a UserLender makes a GET request to a Lender like so:

```http request
GET /lenders/{id}
```

**Ardent** will check to make sure the UserLender meets the Lender **Access Control Policy**, which can be briefly summarized as:
- If the UserLender was a member of that Lender, then they would be able to access a limited subset of their Lender.
- If the User was an Admin of that Lender, then they would be able to access many fields that other non-Admin Users couldn't access.
- And finally if the User was not a member of that Lender, then they would not be able to access anything about that Lender.

#### Nested Access Control Policies

**Ardent** will also automatically check the **Access Control Policy** of any nested **Resources** being accessed in a request.

For example, when a UserLender makes a GET request to a Loan's Borrowers like so:

```http request
GET /lenders/{id}/loans/{id}/borrowers
```

**Ardent** will check to make sure the UserLender meets **all** of the following Access Control Policies:
- Lender (i.e. whether they can access the Lender)
- Loan (i.e. whether they can access the Loan)
- Borrowers (i.e. whether they can access Borrowers)

You could imagine how tedious this would be to implement in our legacy API (and we don't even check these things in quite a few of our scripts), but **Ardent's** #1 strength is enforcing these types of nested **Access Control Policies**. The core idea is "set it and forget it", meaning that you spend the time to define an **Access Control Policy** for a **Resource** once and that's it; Ardent will enforce that **Access Control Policy** whenever the **Resource** is accessed.

#### Multilateral Access Control Policies
As mentioned in [Horizontal Access, Aliases, and Composition](#horizontal-access-aliases-and-composition), it's possible for **Resources** to access other **Resources**.

Like with [Nested Access Control Policies](#nested-access-control-policies), **Ardent** will automatically check the **Access Control Policy** of any accessed **Resource** in a request.

For example, when a UserLender makes a POST request to an RPC endpoint `/get-loans-and-branches-for-a-lender`, **Ardent** will check to make sure the UserLender meets **all** of the following Access Control Policies:
- Loans (i.e. whether they can access the Loans)
  - Which triggers a check for Lender (i.e. whether they can access the Lender at all)
- Branches (i.e. whether they can access the Branches)
  - Which again triggers a check for Lender

## Conclusion and Next Steps
As you now know, **Ardent** takes care of a lot of things that would otherwise be a burden for our legacy API design to handle. It's meant to handle everything our legacy API can do, albeit with a better Developer Experience and more functionality. **Ardent** is the back-end equivalent of what the **Bright Design System** is for our front-end: a friendly, carefully architected, and fine-tuned framework.

For next steps on learning about **Ardent**, continue to the [Guide](/ardent-api/learn/guide/) for practical examples of how to use **Ardent**.