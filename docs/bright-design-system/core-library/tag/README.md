# Tag

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundTag from './components/VuePressUIPlaygroundTag.vue';
import VuePressTagToggleExample from './demos/VuePressTagToggleExample.vue';
export default {
    components: {
        VuePressUIPlaygroundTag,
        VuePressTagToggleExample,
    },
}
</script>

Use **Tags** to present micro units of content and provide interaction opportunities with content.

<VuePressUIPlaygroundTag/>

## Best Practices

### When To Use
Use **Tags** to present micro units of content and provide interaction opportunities with content. Common use cases include:

- Tags for content
- Labels (with optional clickable links)
- Filtering
- [Multi-Select Dropdown Options](/bright-design-system/input-library/select-dropdown/#single-select-vs-multi-select)


## Anatomy
**Tags** consist of a [label](#label) with a padded, colored, and bordered container. Optionally, they can have colored [placeholders](#image-placeholder) to the left of their label and can be [removed](#removable) from display with a close button to the right of their label.

### Label
**Tags** have a **label**. Ideally, this **label** should be short, sweet, and to the point.

:::tip THE BRIGHT WAY
If a **Tag** has a **label** that is rather long, consider using [Truncation](#truncation) to shorten the displayed text. If needed, a user can mouse over the **Tag** and see the full **label**.
:::

<div class="code-example-box">
    <BrightTag label="Lorem Ipsum"/>
</div>

```vue
<BrightTag label="Lorem Ipsum"/>
```

### Icon
**Tags** can optionally have an **icon** that appears before the [label](#label). The color of the **icon** will match the [color](#color) of the **Tag**.

For a list of all available **Icons** in **Bright**, see the [Icon Library](/bright-design-system/core-library/icon/#icon-library).

<div class="code-example-box">
    <BrightTag label="Lorem Ipsum" icon="star"/>
</div>

```vue
<BrightTag label="Lorem Ipsum" icon="star"/>
```

### Image Placeholder
**Tags** can optionally have an **image placeholder** that appears before the [label](#label). The color of the **image placeholder** will match the [color](#color) of the **Tag**.

:::tip
If the [`icon`](#icon) property is set, then an **image placeholder** will not be shown.
:::

<div class="code-example-box">
    <BrightTag label="Lorem Ipsum" image-placeholder/>
</div>

```vue
<BrightTag label="Lorem Ipsum" image-placeholder/>
```

### Removable
**Tags** can optionally be **removed** from the display by the user. [Disabled Tags](#disabled) cannot be removed by the user.

<div class="code-example-box">
    <BrightTag label="This can be removed" removable/>
    <BrightTag label="This is disabled and can't be removed" removable disabled/>
</div>

```vue
<BrightTag label="This can be removed" removable/>
<BrightTag label="This is disabled and can't be removed" removable disabled/>
```

#### Removable Element ID
By default, the close 'x' button on a **Removable Tag** does not have an ID associated with it. If desired, an ID can be assigned to it by using the `removable-element-id` prop.

<div class="code-example-box">
    <BrightTag label="This tag DOES NOT have an ID on its close button" removable/>
    <BrightTag label="This tag DOES have an ID on its close button" removable removable-element-id="sup"/>
</div>

```vue
<BrightTag label="This tag DOES NOT have an ID on its close button" removable/>
<BrightTag label="This tag DOES have an ID on its close button" removable removable-element-id="sup"/>
```


## Styling
**Tags** have a number of styling properties that can be used in a variety of layouts.

### Color
**Tags** have numerous color options, as shown below. The default color for **Tags** is **grey**.

<div class="code-example-box">
    <BrightTag label="Grey (default)" image-placeholder removable/>
    <BrightTag label="Blue" color="blue" image-placeholder removable/>
    <BrightTag label="Aqua" color="aqua" image-placeholder removable/>
    <br>
    <BrightTag label="Pink" color="pink" image-placeholder removable/>
    <BrightTag label="Yellow" color="yellow" image-placeholder removable/>
    <BrightTag label="Green" color="green" image-placeholder removable/>
    <br>
    <BrightTag label="Red" color="red" image-placeholder removable/>
    <BrightTag label="Orange" color="orange" image-placeholder removable/>
    <BrightTag label="Purple" color="purple" image-placeholder removable/>
    <BrightTag label="Indigo" color="indigo" image-placeholder removable/>
</div>

```vue
<BrightTag label="Grey (default)" image-placeholder removable/>
<BrightTag label="Blue" color="blue" image-placeholder removable/>
<BrightTag label="Aqua" color="aqua" image-placeholder removable/>

<BrightTag label="Pink" color="pink" image-placeholder removable/>
<BrightTag label="Yellow" color="yellow" image-placeholder removable/>
<BrightTag label="Green" color="green" image-placeholder removable/>

<BrightTag label="Red" color="red" image-placeholder removable/>
<BrightTag label="Orange" color="orange" image-placeholder removable/>
<BrightTag label="Purple" color="purple" image-placeholder removable/>
<BrightTag label="Indigo" color="indigo" image-placeholder removable/>
```

### Size
**Tags** can be sized differently as needed. The default size for **Tags** is **medium**.

<div class="code-example-box">
    <BrightTag label="Large" size="large" image-placeholder removable/>
    <BrightTag label="Medium (default)" image-placeholder removable/>
    <BrightTag label="Small" size="small" image-placeholder removable/>
</div>

```vue
<BrightTag label="Large" size="large" image-placeholder removable/>
<BrightTag label="Medium (default)" image-placeholder removable/>
<BrightTag label="Small" size="small" image-placeholder removable/>
```

### Borderless
**Tags** can be borderless if desired. **Tags** have borders by default.

<div class="code-example-box">
    <BrightTag label="Borderless" borderless image-placeholder removable/>
    <BrightTag label="Bordered" image-placeholder removable/>
</div>

```vue
<BrightTag label="Borderless" borderless image-placeholder removable/>
<BrightTag label="Bordered" image-placeholder removable/>
```

### Rounded
**Tags** can be rounded if desired. **Tags** are not rounded by default.

<div class="code-example-box">
    <BrightTag label="Rounded" rounded image-placeholder removable/>
    <BrightTag label="Not Rounded" image-placeholder removable/>
</div>

```vue
<BrightTag label="Rounded" rounded image-placeholder removable/>
<BrightTag label="Not Rounded" image-placeholder removable/>
```

## Structure & State
**Tags** have dynamic structures and states that can be used to adapt **Tags** to a variety of use cases and layouts.

### As a Link
By default, all **Tags** are rendered as `<span>` elements.

Use the `href` property when you want a **Tag** to be rendered as an `<a>` element with a destination (i.e. a link).

Note that the standard [Anchor Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes) are available for use when this property is in use.

<div class="code-example-box">
    <BrightTag label="This is a Link" href="#as-a-link"/>
</div>

```vue
<BrightTag label="This is a Link" href="#as-a-link"/>
```

### Disabled
**Tags** can be disabled as needed. **Disabled Tags** cannot be [removed](#removable) by the user.

<div class="code-example-box">
    <BrightTag label="Disabled" disabled image-placeholder removable/>
    <BrightTag label="Not Disabled" image-placeholder removable/>
</div>

```vue
<BrightTag label="Disabled" disabled image-placeholder removable/>
<BrightTag label="Not Disabled" image-placeholder removable/>
```

### Truncation
**Tags** can be **truncated** to prevent excessively long [labels](#label) from taking up too much space in a layout. **Tags** are not **truncated** by default.

<div class="code-example-box">
    <BrightTag label="user-with-a-really-long-email@emailprovider.com" truncate-at="18"/>
    <BrightTag label="user-with-a-really-long-email@emailprovider.com"/>
</div>

```vue
<BrightTag label="user-with-a-really-long-email@emailprovider.com" truncate-at="18"/>
<BrightTag label="user-with-a-really-long-email@emailprovider.com"/>
```

### Toggle Tag
It's possible to make a **Toggle Tag** by using the `isToggleButton` property. A **Toggle Tag** will retain [state](#toggle-active) and know when it has been interacted with by the end-user.

<div class="code-example-box">
    <BrightTag label="Click Me" is-toggle-tag color="blue"/>
</div>

```vue
<BrightTag label="Click Me" is-toggle-tag/>
```

#### Toggle Active
[Toggle Tags](#toggle-tag) are **off** by default. To turn them on programatically, use the `active` property.

:::tip
The `active` property is reactive. This means that programmatically changing the `active` property will change the tag's active state in real-time. 
:::

<div class="code-example-box">
    <BrightTag label="I was active on page load" is-toggle-tag active color="blue"/>
</div>

```vue{1}
<BrightTag label="I was active on page load" is-toggle-tag active color="blue"/>
```

#### Toggle Tag v-model
[Toggle Tags](#toggle-tag) support the `v-model` directive. This allows you to react to user input. They will emit a `boolean` indicating whether a **Toggle Tag** is pressed or not.

<div class="code-example-box">
    <VuePressTagToggleExample/>
</div>

<<< @/docs/bright-design-system/core-library/tag/demos/VuePressTagToggleExample.vue{3,17}

## Accessibility

### Tabindex
By default, all **Tags** have a tabindex of 0. This means that they can be tabbed onto. Additionally, [Removable Tags](#removable) also have their 'x' close button set to a tabindex of 0.

This is ideal for accessibility when **Tags** are on their own, but may not be preferred for composite components that use **Tags** in their composition. In such cases, you can assign a new tabindex using the `tabindex` property. The value passed to the `tabindex` property will be applied to the **Tag** itself and its 'x' close button (if it's a [Removable Tag](#removable)).

<div class="code-example-box">
    <BrightTag label="Tabindex 0 (Default)"/>
    <BrightTag label="Tabindex -1" tabindex="-1"/>
</div>

```vue
<BrightTag label="Tabindex 0 (Default)"/>
<BrightTag label="Tabindex -1" tabindex="-1"/>
```


## API

### `BrightTag` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightTag label="Tag"/>
</div>

```vue
<BrightTag label="Tag"/>
```

### `BrightTag` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightTag` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| <div style="width: 170px">[label](#label)</div> | string | | `null` | ✅ |
| [active](#toggle-active) | boolean | | `false` | |
| [borderless](#borderless) | boolean | | `false` | |
| [color](#color) | string | <BrightTag label="grey" color="grey" class="mb-4"/> <BrightTag label="blue" color="blue" class="mb-4"/> <BrightTag label="pink" color="pink" class="mb-4"/> <BrightTag label="aqua" color="aqua" class="mb-4"/> <BrightTag label="yellow" color="yellow" class="mb-4"/> <BrightTag label="green" color="green" class="mb-4"/> <BrightTag label="red" color="red" class="mb-4"/> <BrightTag label="orange" color="orange" class="mb-4"/> <BrightTag label="purple" color="purple" class="mb-4"/> <BrightTag label="indigo" color="indigo" class="mb-4"/> | <BrightTag label="grey" color="grey" class="mb-4"/> | |
| [disabled](#disabled) | boolean | | `false` | |
| [href](#as-a-link) | string | | `null` | |
| [icon](#icon) | string | See the available icons in our [Icon Library](/bright-design-system/core-library/icon/) | `""` | |
| [image-placeholder](#image-placeholder) | boolean | | `false` | |
| [is-toggle-tag](#toggle-tag) | boolean | | `false` | |
| [removable](#removable) | boolean | | `false` | |
| [removable-element-id](#removable-element-id) | string | | `null` | |
| [rounded](#rounded) | boolean | | `false` | |
| [size](#size) | string | `large` `medium` `small` | `medium` | |
| [tabindex](#tabindex) | number | | `0` | |
| [truncate-at](#truncation) | number | | `-1` | |

### `BrightTag` v-model behavior
The `BrightTag` component **supports** the v-model directive when it is a [Toggle Tag](#toggle-tag).

Learn more and see an example [here](#toggle-tag-v-model).

### `BrightTag` Events
The `BrightTag` component will emit the following events when it is a [Toggle Tag](#toggle-tag). You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#toggle-tag-v-model) | When the user toggles the tag. | A `boolean` value indicating the state of the **Toggle Tag** (i.e. pressed vs not pressed). |
