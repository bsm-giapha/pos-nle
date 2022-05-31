# Introduction

## What is the New Lender Experience?
The **New Lender Experience** (often abbreviated as "the NLE") is the next major version of the MLO Command Center. The NLE provides a new modern, future-facing foundation for future BeSmartee application endeavors by utilizing a new design language, new technologies, and new patterns and methodologies.

The NLE's most standout features include:
- A [Vue 2-powered](https://vuejs.org/v2/guide/), Single Page Application (SPA) front-end that uses:
    - ES6+ (via CoreJS/Babel)
    - Webpack
    - [Tailwind](https://v1.tailwindcss.com/)
- A REST API back-end service (powered by our own [Ardent API framework](/ardent-api/learn/introduction/)) that complements our new SPA front-end
- A new look and feel, powered by our own [Bright Design System](/bright-design-system/)
- Unit tests, linting, and documentation powered by [Jest](https://jestjs.io/), [eslint](https://eslint.org/), and [VuePress](https://vuepress.vuejs.org/)

## Why the New Lender Experience?

### The Past
Once upon a time when BeSmartee began, the UI was amazing and modern. Pages and workflows were designed extraordinarily well, focused on doing one thing, and were intuitive. Although difficult at the time, things were relatively great, and BeSmartee inevitably experienced rapid growth and success due to the efforts of its co-founders and early employees.

Fast-forward to 2021, and the BeSmartee UI / UX had changed. To say that it got more complex is an understatement. Configurations upon configuration altered workflows and UIs, introducing multi-layered edge-cases. A codebase that was once maintained by a small team of 2-3 developers grew and was now maintained by tens of developers around the clock in two countries. Hard-earned contracts and future-facing clients challenged us to move quickly and grow just as quickly.

It's clear that BeSmartee succeeded and overcame all the challenges put before it, but it was at the cost of some quality. This was readily apparent in the UI for all to see.

Things were misaligned for no reason. There were multiple ways of showing the same thing on the UI, and all of them were done a little differently, resulting in bugs and inconsistent behavior (or visual oddities). Accessibility and responsive design were afterthoughts. Animations and excitement were all but non-existent.

The visual quirks were only half of the picture. BeSmartee developers who worked on our legacy UI knew first-hand that working on our front-end, implementing complex UI widgets, and handling back-end forms could be a tedious and inconsistent process full of copying-and-pasting and making incremental tweaks to make something work for a specific edge-case. 

### The Present and Future
Something had to change, and it had to deal with two things: the User Experience and the Developer Experience. Not only did our end-users need a pleasing experience when interacting with BeSmartee's products, but our own internal staff needed the tools and patterns to deliver that User Experience consistently and painlessly.

Two years in the making, that change is the **New Lender Experience**.

With the goal of offering the best experience to all of our users and internal staff, the **New Lender Experience** provides a unified solution that makes use of a new front-end architecture, REST API, and design system that were all built from the ground-up to meet BeSmartee's needs. It provides a fresh platform and allows us to:

- Re-brand ourselves as a true first-class solution for new and existing clients
- Offer a better and more consistent User Experience that truly puts the user's needs first
- Have a dramatically improved Developer Experience when building UIs and Forms
- Provide tools and support for our own Internal Staff to better support our clients
- Address technical debt in our codebase

As much as it is a technical change, the **New Lender Experience** is a symbolic revival and rebirth of BeSmartee, borne of a passion for excellence and the belief that the future can be brighter if we build it together. It is a paradigm shift for anyone who interacts with its systems. It challenges people to think differently and pursue their best work by providing a framework and toolset to do so.

## Overview

### Front-End Architecture
At the heart of **New Lender Experience** is a new front-end architecture that builds the MLO Command Center from the ground-up using modern web technologies such as Vue, Webpack, ES6+, and Tailwind. Notable changes include:

- A [Vue-powered](https://vuejs.org/v2/guide/) Single Page Application (SPA) that uses a [front-end router](https://router.vuejs.org/guide/) and [state management system](https://vuex.vuejs.org/guide/) to deliver a seamless and scalable experience for our users
- The full deprecation of Bootstrap in favor of our very own [Bright Design System](/bright-design-system/), which has a full library of re-usable Vue UI components
- The full deprecation of jQuery in favor of modern ES6+ JavaScript that runs in IE 11, possible via polyfills / transpiling via [core-js](https://github.com/zloirock/core-js) and [Babel](https://babeljs.io/)
- The use of [Tailwind](https://v1.tailwindcss.com/) and [PostCSS](https://github.com/postcss/postcss) to facilitate utility-first CSS and a better experience when writing CSS

### REST API
A new **Rest API** complements and supports the **New Lender Experience's** [Front-End Architecture](#front-end-architecture) by providing a re-usable and well-documented interface for accessing BeSmartee resources. The new **Rest API** is powered by our own [Ardent API](/ardent-api/learn/) framework, which standardizes the building and structure of API endpoints.

### Application UX
The **New Lender Experience** provides an entirely new UI for the MLO Command Center that retains all legacy features and incrementally improves them. New features and quality-of-life improvements have been made where possible, in addition to improved mobile responsiveness, IE 11 support, and accessibility.

## Conclusion and Next Steps
As is now apparent, the **New Lender Experience** is a fresh and exciting chapter for BeSmartee. It offers a modern, scalable framework for building and maintaining a first-class user experience for our clients. 

For next steps on learning about the **New Lender Experience**, continue to the [Guide](/besmartee/new-lender-experience/learn/guide/) for practical examples of how to use the **New Lender Experience**.