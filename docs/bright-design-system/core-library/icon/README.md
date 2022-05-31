# Icon

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

Use **Icons** to provide a visual supplement to a layout.

## Best Practices

### When To Use
Use **Icons** to provide a visual supplement to a layout.

#### Icons should be used sparingly
Icons can greatly enhance the usability of an interface, but they can be meaningless when drowned in a sea of other Icons. Prefer using them as needed to augment a Label or other content.


## Anatomy

**Icons** consist of an iconographic image that is one-toned and sized appropriately to **Bright's 4-Point Grid**. They are used intentionally in layouts to deliver a visual supplement to a message in a layout.

## Icon Library

**Bright** uses [Material Icons](https://material.io/resources/icons/?style=baseline) underneath the hood for its Icon Library. You can use the tool below to view and search through all of the available icons.

<iframe src="https://material.io/resources/icons/?style=baseline" width="100%" height="800"></iframe>

### Using an Icon

Once you have found an **Icon** that you like in the [Material Icons](https://material.io/resources/icons/?style=baseline) library, note its name beneath the **Icon**. For example, one is called "3d_rotation". To use this **Icon**, make use of the `use` property and pass in the **Icon's** name.

<div class="code-example-box">
    <div class="text-h2">
        <BrightIcon use="3d_rotation"/>
    </div>
</div>

```vue
<BrightIcon use="3d_rotation"/>
```

## Colors

**Icons** are one-toned and can be any color.

:::tip THE BRIGHT WAY
When deciding which color to use in a layout, we recommend using the **Bright Color Palette** to maintain consistency across layouts. 
:::

In the background, **Icons** are powered using an Icon Font, which means that they can be styled in CSS using traditional font styling properties (such as `color`, `font-size`, and `line-height`). 

By default, **Icons** will have the same color as any text in their position in the DOM. It is possible to change the color of an **Icon** using the `color` property.

<div class="code-example-box">
    <div class="text-h2">
        <BrightIcon use="face"/>  
        <BrightIcon use="face" class="text-blue-500"/>
        <span class="text-pink-500">
            <BrightIcon use="face"/>
        </span>
    </div>
</div>

```vue
<!-- This is a default Icon.-->
<BrightIcon use="face"/>

<!-- This Icon has a class that gives it its own color. -->
<BrightIcon use="face" class="text-blue-500"/>

<!-- This Icon gets its color from its parent container. -->
<span class="text-pink-500">
    <BrightIcon use="face"/>
</span>
```

## Sizing

**Icons** can be of any size, but be sure to exercise caution when deciding the size of an **Icon**.

:::tip THE BRIGHT WAY
When choosing the size of an **Icon**, we recommend the following:

- Match the `font-size` of an **Icon** to the `line-height` of other inline text that is near the **Icon**. This will make the Icon appear as though it is perfectly aligned with its neighboring text.
- Adhere to the **Bright 4-Point Grid** to maintain consistency across layouts.
:::

In the background, **Icons** are powered using an Icon Font, which means that they can be styled in CSS using traditional font styling properties (such as `color`, `font-size`, and `line-height`). 

By default, **Icons** will have the same `font-size` as any text in their position in the DOM and will have a `line-height` equal to their `font-size`. Thus, It is possible to change the size of an **Icon** using the `font-size` property. Finer control of an **Icon's** appearance can be achieved using the `line-height` property as well.

<div class="code-example-box">
    <BrightIcon use="home" role="button"/>
    <BrightIcon use="home" class="text-h2"/>
    <span class="text-h1">
        <BrightIcon use="home"/>
    </span>
</div>

```vue
<!-- This is a default Icon. -->
<BrightIcon use="home"/>

<!-- This Icon has a class that gives it its own size. -->
<BrightIcon use="home" class="text-h2"/>

<!-- This Icon gets its size from its parent container -->
<span class="text-h1">
    <BrightIcon use="home"/>
</span>
```

## Accessibility
By default, all **Icons** have the following accessibility properties and values automatically set:
- `role="img"`
- `aria-hidden="true"`

This default behavior is based on the premise that all **Icons** are strictly decorative and not semantic. If you pair an **Icon** with another semantic component/element, then be sure to add the appropriate accessibility markup for your use case. The common ARIA properties used in associating icons and images with other elements are (but are not limited to):
- [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)
- [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
- [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)

## API

### `BrightIcon` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightIcon use="star"/>
</div>

```vue
<BrightIcon use="star"/>
```

### `BrightIcon` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightIcon` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [use](#using-an-icon) | string | See the available options in the [Icon Library](#icon-library) | `null` | ✅ |