# Guide

## Pre-Requisites for Development
The **New Lender Experience** requires a couple of things to be handled first before you can develop for it or even see it in your browser.

### Node and NPM
You must install the latest LTS version of Node (which also typically includes a built-in installation of npm). Depending on your computer's policy with InfoSec, you may need to request InfoSec for a Node installation. 

As of July 23rd, 2021 (when this documentation section was last checked), the LTS version was **14.17.3 (includes npm 6.14.13)**

### Minimum Branch Version
The **New Lender Experience** only exists on branches that have v2.80 of our code or newer.

### Composer
Run `composer install` to ensure that the required PSR namespaces for the **New Lender Experience** are setup correctly.

## Compiling the Lender App
After completing the [Pre-Requisites for Development](#pre-requisites-for-development) section, you can compile the **New Lender Experience** app (i.e. the MLO Command Center).

In a terminal window:
- Install composer packages and setup PSR namespaces with `composer install`
- Run required migrations
- Install npm packages with `npm install`
- Compile using `npm run build:dev`

After compiling, navigate to the MLO Command Center and click the **New Lender Experience** navbar item. You will be taken to a page in the **New Lender Experience** and should see a functioning page.

:::tip Using watch:dev
The `build:dev` script will build the **New Lender Experience** once. This is ideal when you just need to see something working, but it's not suited for localhost development where you need to make code changes and see them on the screen quickly.

For active development, you can use the `watch:dev` script, which will initiate an npm file watcher that checks for changes and `ctrl+s` saves to files in your IDE. When either event happens, it will re-compile the **New Lender Experience**, which will allow you to see your code changes fairly quickly.
:::

## Implement a new Portal

## Implement a new Page

## Implement a new Form

## Implement a new Form Section