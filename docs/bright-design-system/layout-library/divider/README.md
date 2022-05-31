# Divider

<div class="mb-16">
    <BrightTag color="purple" label="Layout Library" href="/layout-library/"/>
    <BrightTag color="purple" label="Introduced in Ardent v1.0"/>
</div>

Use **Dividers** to divide or separate content as needed.

## Best Practices
### When To Use
Before using a **Divider**, prefer using whitespace and other components to divide content in a more natural way.


## Anatomy
**Dividers** consist of a simple HTML `<div>` that runs the entire width of its parent element.

## Styling

### On-Dark
By default, all **Dividers** are "light" and appear as light grey lines. This works well for most cases involving a light or white background.

Use the `on-dark` property to change the color and opacity of the **Divider** so that it looks good on dark backgrounds.

<div class="code-example-box bg-grey-800">
    <BrightDivider on-dark/>
</div>

```vue
<BrightDivider on-dark/>
```

## Accessibility
**Dividers** have a role of "separator", which conveys its semantic role in a layout.

## Related Reading
- [Layout Library](/bright-design-system/layout-library/)

## API
### `BrightDivider` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightDivider/>
</div>

```vue
<BrightDivider/>
```

### `BrightDivider` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightDivider` component can receive the following properties.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [on-dark](#on-dark) | boolean | | `false` | |