# CSS and Styling
**The New Lender Experience** uses a combination of [PostCSS](https://postcss.org/), [Tailwind](https://v1.tailwindcss.com/), and [Bright](/bright-design-system/) to compose CSS and provide styling.

With [Bright](/bright-design-system/) and [Tailwind](https://v1.tailwindcss.com/) providing the majority of our styling needs, you'll find yourself rarely writing CSS when working on the **New Lender Experience**. Thus, knowledge of how our CSS works is optional for most BeSmartee developers.

## App Common CSS Directory
All **CSS** for the **New Lender Experience** can be found in the `resources/apps/common/css` directory (i.e. within the the [App Common](/besmartee/new-lender-experience/essentials/project-structure/#the-app-common-directory) directory).

## Organization
Within the [App Common CSS Directory](#app-common-css-directory) is a specific set of files and folders that comprise our CSS and styling rules.

### Root Style File
A `styles.css` file (i.e. the **Root Style File**) is present in the [App Common CSS Directory](#app-common-css-directory) that serves as our main Webpack entry for CSS. It uses `@import` statements (via [postcss-import](https://github.com/postcss/postcss-import)) to import other CSS files into a final CSS stylesheet. This final CSS stylesheet is then served to clients when they request one of our applications.

As a visual, the current **Root Style File** has the following contents:

<<< @/resources/apps/common/css/styles.css

### Import Order
The [Root Style File](#root-style-file) imports **"Layers"** in a certain order. **Layers** are collections of related CSS styling rules that help us organize styling rules. These **Layers** are:

1. [Base](#base-layer)
2. [Components](#component-layer)
3. [Layouts](#layout-layer)
4. [Utilities](#utility-layer)

#### Base Layer
The **Base Layer** is composed of numerous global styling rules that form the base foundation for all styling. It consists of global styling for things such as:

- Typography
- Spacing
- Normalization / Resets (i.e. CSS rules that reset all web browsers' default styling to a common base)

#### Component Layer
The **Component Layer** is composed of many **"Components"** (a [Tailwind concept](https://v1.tailwindcss.com/docs/extracting-components)) that are reusable classes for common UI components such as:

- [Buttons](/bright-design-system/core-library/button/)
- [Cards](/bright-design-system/layout-library/card/)
- [Text Inputs](/bright-design-system/input-library/text/)

#### Layout Layer
The **Layout Layer** is a subset of the [Component Layer](#component-layer) that is focused entirely on layout-specific CSS classes. For example, styling for the **New Lender Experience's** navigation layout is handled in the **Layout Layer**.

#### Utility Layer
The **Utility Layer** houses all of our utility CSS classes (including our Tailwind and Bright utility classes).

### Advanced: Source Order

:::warning Advanced
This is an advanced topic and should be skipped until you are familiar with the **New Lender Experience**.
:::

As mentioned in the [Import Order](#import-order), the [Root Style File](#root-style-file) imports Layers in a certain order. Within that **Import Order** is one extra order for each **Layer**: the **Source Order**.

The **Source Order** describes the order by which we import each **Layer's** **sources**. Typically, there are three **sources** for each **Layer**:

1. Tailwind
2. Bright
3. Our styles (the **New Lender Experience** falls under this **source**)

As an example of the **Source Order** for the [Base Layer](#base-layer), see the following and observe the **Source Order**:

```javascript
@import "../../../../node_modules/tailwindcss/base.css"; /* Tailwind base styles (including a variant of normalize). */
@import "../bright/css/base/_import.css"; /* Bright's base styles. These can be overridden by components and utilities. */
@import "base/_import.css"; /* Our base styles */
```

This means that Tailwind's styles and classes will be imported first, then Bright's, and then the **New Lender Experience**. This means that our styles take priority over Tailwind and Bright.

As one might imagine, this has some implications for styling and dealing with CSS specificity. Knowledge of this cascade may help with troubleshooting quirks with CSS classes/styles being overridden.

## Tailwind
The **New Lender Experience** uses [Tailwind](https://v1.tailwindcss.com/) to compose CSS. It's highly recommended for BeSmartee developers to know how to use **Tailwind** at a basic level. The following **Tailwind** documentation pages can provide a good introduction to **Tailwind**:

- [What Is Tailwind?](https://v1.tailwindcss.com/#what-is-tailwind)
- [Core Concept: Utility-First](https://v1.tailwindcss.com/docs/utility-first)
- [Core Concept: Responsive Design](https://v1.tailwindcss.com/docs/responsive-design)
- [Core Concepts: Pseudo-Class Variants](https://v1.tailwindcss.com/docs/pseudo-class-variants)
- [Core Concepts: Base Styles](https://v1.tailwindcss.com/docs/adding-base-styles)
- [Core Concepts: Extracting Components](https://v1.tailwindcss.com/docs/extracting-components)
- [Core Concepts: Adding New Utilities](https://v1.tailwindcss.com/docs/adding-new-utilities)
- [Core Concepts: Functions and Directives](https://v1.tailwindcss.com/docs/functions-and-directives)

## PostCSS
The **New Lender Experience** uses several **PostCSS** plugins to augment our ability to write CSS.

### PostCSS Import
As mentioned in the [Root Style File](#root-style-file) section, we use `@import` statements to import CSS files into a main entrypoint CSS file.

The `@import` statement is possible through the use of the [postcss-import](https://github.com/postcss/postcss-import) module.

#### When to use `@import`
Use the `@import` statement to organize CSS into clean, isolated folders.

For example, [Bright](/bright-design-system/) uses `@import` statements to organize the styling for its many Vue components. Each component has its own folder structure like so:

```text
/components
    _import.css (imports all `_import.css` files in the directories below)
    /avatars
        _import.css (imports `BrightAvatar.css`)
        BrightAvatar.css
    /buttons
        _import.css (imports all CSS files in the directory; 3 in this case)
        BrightButton.css
        BrightButtonIcon.css
        BrightButtonLoader.css
```

The idea is that each directory imports all of its immediate files in a `_import.css` file (e.g. `components/avatars/_import.css` and `components/buttons/_import.css`). A higher-order file (`components/_import.css` in this case) then imports those directory import files.

The benefit of using `@import` statements becomes apparent when you consider the alternative: putting all of our styling in one file (i.e. what we did in the legacy application). This is far more organized and easier for teams of developers to work on. It also allows us to keep our CSS files small and understandable, especially when you use the [`&` PostCSS nested operator](#postcss-nested)

### PostCSS Nested
With the [postcss-nested](https://github.com/postcss/postcss-nested) plugin, we can nest CSS (like in SASS) and use a `&` operator to write less CSS.

See the following documentation for an example of what's possible with **PostCSS Nested**: [https://github.com/postcss/postcss-nested](https://github.com/postcss/postcss-nested)