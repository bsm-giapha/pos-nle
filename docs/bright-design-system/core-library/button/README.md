# Button

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundButton from './components/VuePressUIPlaygroundButton.vue';
import VuePressButtonToggleExample from './demos/VuePressButtonToggleExample.vue';
import VuePressButtonLoadingAnimationDemo from './demos/VuePressButtonLoadingAnimationDemo.vue';
export default {
    components: {
        VuePressUIPlaygroundButton,
        VuePressButtonToggleExample,
        VuePressButtonLoadingAnimationDemo,
    },
}
</script>

Use **Buttons** to communicate the availability of an action to the user and subsequently trigger the action when activated.

<VuePressUIPlaygroundButton/>

## Best Practices

### When To Use
Use **Buttons** to communicate the availability of an action to the user and subsequently trigger the action when activated.

## Anatomy
**Buttons** consist of at least one of the following:
* A **string of text**
* An **icon**

### Text Buttons
Use **Text Buttons** when a simple label (such as "Continue" or "Delete") can sufficiently inform the user of an action.

Labels for **Text Buttons** should be less than 15 characters, be in common language (e.g. "Continue" vs "Keep Going"), contain no spaces, and contain no special characters.

**Text Buttons** always have capitalized labels. *Developer Note: All Button components use CSS to display labels in uppercase format.*

<div class="code-example-box">
    <BrightButton use="primary">lorem</BrightButton>
    <BrightButton use="secondary">lorem</BrightButton>
    <BrightButton use="tertiary">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary">lorem</BrightButton>
<BrightButton use="secondary">lorem</BrightButton>
<BrightButton use="tertiary">lorem</BrightButton>
```

### Icon Buttons
Use **Icon Buttons** when iconography can sufficiently inform the user of an action.

For a list of all available **Icons** in **Bright**, see the [Icon Library](/bright-design-system/core-library/icon/#icon-library).

<div class="code-example-box">
    <BrightButton use="primary" icon="star"/>
    <BrightButton use="secondary" icon="star"/>
    <BrightButton use="tertiary" icon="star"/>
</div>

```vue
<BrightButton use="primary" icon="star"/>
<BrightButton use="secondary" icon="star"/>
<BrightButton use="tertiary" icon="star"/>
```

### Icon & Text Buttons
Use **Icon & Text Buttons** when the combination of a label and icon is the best way to inform the user of an action.

Labels for **Icon & Text Buttons** should be less than 15 characters, be in common language (e.g. "Continue" vs "Advance"), contain no spaces, and contain no special characters.

**Icon & Text Buttons** always have capitalized labels. *Developer Note: All Button components use CSS to display labels in uppercase format.*

For a list of all available **Icons** in **Bright**, see the [Icon Library](/bright-design-system/core-library/icon/#icon-library).

<div class="code-example-box">
    <BrightButton use="primary" icon="star" icon-position="prefix">lorem</BrightButton>
    <BrightButton use="secondary" icon="star" icon-position="prefix">lorem</BrightButton>
    <BrightButton use="tertiary" icon="star" icon-position="prefix">lorem</BrightButton>
    <br><br>
    <BrightButton use="primary" icon="star" icon-position="postfix">lorem</BrightButton>
    <BrightButton use="secondary" icon="star" icon-position="postfix">lorem</BrightButton>
    <BrightButton use="tertiary" icon="star" icon-position="postfix">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" icon="star" icon-position="prefix">lorem</BrightButton>
<BrightButton use="secondary" icon="star" icon-position="prefix">lorem</BrightButton>
<BrightButton use="tertiary" icon="star" icon-position="prefix">lorem</BrightButton>

<BrightButton use="primary" icon="star" icon-position="postfix">lorem</BrightButton>
<BrightButton use="secondary" icon="star" icon-position="postfix">lorem</BrightButton>
<BrightButton use="tertiary" icon="star" icon-position="postfix">lorem</BrightButton>
```


## Hierarchy
The `primary`, `secondary`, and `tertiary` **hierarchy** types in conjunction with the `standard` **styling** can be used to establish a primary visual hierarchy in a layout.

If another secondary visual hierarchy is desired, the `alternative` **theme** can be utilized, although this should be avoided to avoid complicating a layout.

### Primary Buttons
Use a **Primary Button** to convey the most important action in a layout.

:::tip THE BRIGHT WAY
Prefer using only one **Primary Button** in a layout. **Primary Buttons** stand apart from their other **Button** peers because they are meant to draw attention to the most important action in a layout. If there are many of them in a layout, then they will lose their effectiveness and blend together.
:::

<div class="code-example-box">
    <BrightButton use="primary">lorem</BrightButton>
    <BrightButton use="primary" variant="alternative">lorem</BrightButton>
    <BrightButton use="primary" variant="danger">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary">lorem</BrightButton>
<BrightButton use="primary" variant="alternative">lorem</BrightButton>
<BrightButton use="primary" variant="danger">lorem</BrightButton>
```

### Secondary Buttons
Use **Secondary Buttons** to convey secondary actions in a layout.

<div class="code-example-box">
    <BrightButton use="secondary">lorem</BrightButton>
    <BrightButton use="secondary" variant="alternative">lorem</BrightButton>
    <BrightButton use="secondary" variant="danger">lorem</BrightButton>
</div>

```vue
<BrightButton use="secondary">lorem</BrightButton>
<BrightButton use="secondary" variant="alternative">lorem</BrightButton>
<BrightButton use="secondary" variant="danger">lorem</BrightButton>
```

### Tertiary Buttons
Use **Tertiary Buttons** to convey tertiary actions in a layout. 

<div class="code-example-box">
    <BrightButton use="tertiary">lorem</BrightButton>
    <BrightButton use="tertiary" variant="alternative">lorem</BrightButton>
    <BrightButton use="tertiary" variant="danger">lorem</BrightButton>
</div>

```vue
<BrightButton use="tertiary">lorem</BrightButton>
<BrightButton use="tertiary" variant="alternative">lorem</BrightButton>
<BrightButton use="tertiary" variant="danger">lorem</BrightButton>
```


## Styling

### Variants

#### Standard
Use the **Standard** styling option to establish a primary visual hierarchy in a layout.

<div class="code-example-box">
    <BrightButton use="primary">lorem</BrightButton>
    <BrightButton use="secondary">lorem</BrightButton>
    <BrightButton use="tertiary">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary">lorem</BrightButton>
<BrightButton use="secondary">lorem</BrightButton>
<BrightButton use="tertiary">lorem</BrightButton>
```

#### Alternative
Use the **Alternative** styling option to establish a secondary visual hierarchy in a layout. Use sparingly.

<div class="code-example-box">
        <BrightButton use="primary" variant="alternative">lorem</BrightButton>
        <BrightButton use="secondary" variant="alternative">lorem</BrightButton>
        <BrightButton use="tertiary" variant="alternative">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" variant="alternative">lorem</BrightButton>
<BrightButton use="secondary" variant="alternative">lorem</BrightButton>
<BrightButton use="tertiary" variant="alternative">lorem</BrightButton>
```

#### Danger
Use the **Danger** styling option to convey that a button has a destructive action associated with it. Use intentionally.

<div class="code-example-box">
    <BrightButton use="primary" variant="danger">lorem</BrightButton>
    <BrightButton use="secondary" variant="danger">lorem</BrightButton>
    <BrightButton use="tertiary" variant="danger">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" variant="danger">lorem</BrightButton>
<BrightButton use="secondary" variant="danger">lorem</BrightButton>
<BrightButton use="tertiary" variant="danger">lorem</BrightButton>
```


### Sizing
<div class="code-example-box">
    <BrightButton use="primary" size="large">lorem</BrightButton>
    <BrightButton use="primary">lorem</BrightButton>
    <BrightButton use="primary" size="small">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" size="large">lorem</BrightButton>
<BrightButton use="primary">lorem</BrightButton>
<BrightButton use="primary" size="small">lorem</BrightButton>
```

### Full-Width
By default, all **Buttons** occupy a width relative to their content.

Use the `full-width` property to make a **Button** go full-width and occupy the width of its parent container.

<div class="code-example-box">
    <BrightButton use="primary" full-width>lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" full-width>lorem</BrightButton>
```

### Rounded
By default, all **Buttons** have a rounded rectangle appearance.

Use the `rounded` property when a rounded pill-like appearance is desired.

<div class="code-example-box">
    <BrightButton use="primary" rounded>lorem</BrightButton>
    <BrightButton use="secondary" rounded>lorem</BrightButton>
    <BrightButton use="tertiary" rounded>lorem</BrightButton>
    <br><br>
    <BrightButton use="primary" rounded icon="star"/>
    <BrightButton use="secondary" rounded icon="star"/>
    <BrightButton use="tertiary" rounded icon="star"/>
</div>

```vue
<BrightButton use="primary" rounded>lorem</BrightButton>
<BrightButton use="secondary" rounded>lorem</BrightButton>
<BrightButton use="tertiary" rounded>lorem</BrightButton>

<BrightButton use="primary" rounded icon="star"/>
<BrightButton use="secondary" rounded icon="star"/>
<BrightButton use="tertiary" rounded icon="star"/>
```


## Structure & State

### As a Link
By default, all **Buttons** will be rendered as `<button>` elements.

Use the `href` property when you want a **Button** to be rendered as an `<a>` element with a destination (i.e. a link).

Note that the standard [Anchor Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes) are available for use when this property is in use.

:::tip THE BRIGHT WAY
It can be tricky knowing whether to use a **Button** as a link. As a general guideline, here are two tips:
- Use a **Button** as a link if clicking the **Button** has no side-effects other than navigating the User to a new page.
- Use a **Button** as its default when there **will** be side-effects other than navigation (like submitting a form).
:::

<div class="code-example-box">
    <BrightButton use="primary" href="#as-a-link">lorem</BrightButton>
    <BrightButton use="secondary" href="#as-a-link">lorem</BrightButton>
    <BrightButton use="tertiary" href="#as-a-link">lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" href="#">lorem</BrightButton>
<BrightButton use="secondary" href="#">lorem</BrightButton>
<BrightButton use="tertiary" href="#">lorem</BrightButton>
```


### Disabled
To disable a **Button**, use the `disabled` property.

<div class="code-example-box">
    <BrightButton use="primary" disabled>lorem</BrightButton>
    <BrightButton use="secondary" disabled>lorem</BrightButton>
    <BrightButton use="tertiary" disabled>lorem</BrightButton>
</div>

```vue
<BrightButton use="primary" disabled>lorem</BrightButton>
<BrightButton use="secondary" disabled>lorem</BrightButton>
<BrightButton use="tertiary" disabled>lorem</BrightButton>
```

### Toggle Button
It's possible to make a **Toggle Button** by using the `isToggleButton` property. A **Toggle Button** will retain [state](#toggle-active) and know when it has been interacted with by the end-user.

<div class="code-example-box">
    <BrightButton use="primary" is-toggle-button>
        Toggle Button
    </BrightButton>
</div>

```vue{1}
<BrightButton use="primary" is-toggle-button>
    Toggle Button
</BrightButton>
```

#### Toggle Active
[Toggle Buttons](#toggle-button) are **off** by default. To turn them on programatically, use the `active` property.

:::tip
The `active` property is reactive. This means that programmatically changing the `active` property will change the button's active state in real-time. 
:::

<div class="code-example-box">
    <BrightButton use="primary" is-toggle-button active>
        Toggle Button (this is on by default)
    </BrightButton>
</div>

```vue{1}
<BrightButton use="primary" is-toggle-button active>
    Toggle Button (this is on by default)
</BrightButton>
```

#### Toggle Button v-model
[Toggle Buttons](#toggle-button) support the `v-model` directive. This allows you to react to user input. They will emit a `boolean` indicating whether the button is pressed or not.

<div class="code-example-box">
    <VuePressButtonToggleExample/>
</div>

<<< @/docs/bright-design-system/core-library/button/demos/VuePressButtonToggleExample.vue{2,14}

### Show Loading Animation
Use the `show-loading-animation` property to display a loading animation.

<VuePressButtonLoadingAnimationDemo/>

<<< @/docs/bright-design-system/core-library/button/demos/VuePressButtonLoadingAnimationDemo.vue

## API

### `BrightButton` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

Note that the `use` property is required and has three values:
- [`primary`](#primary-buttons)
- [`secondary`](#secondary-buttons)
- [`tertiary`](#tertiary-buttons)

<div class="code-example-box">
    <BrightButton use="secondary">Button</BrightButton>
</div>

```vue
<BrightButton use="secondary">Button</BrightButton>
```

### `BrightButton` Properties
In addition to the properties mentioned below, all **Buttons** can receive the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

If a **Button** is using the `href` property, then it can also receive the standard [Anchor Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes). Otherwise, it can receive the standard [Button Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes).

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [use](#hierarchy) | string | `primary` `secondary` `tertiary` | | ✅ |
| [active](#toggle-button-active) | boolean | | `false` | |
| [disabled](#disabled) | boolean | | `false` | |
| [full-width](#full-width) | boolean | | `false` | |
| [href](#as-a-link) | string | | `""` | |
| [icon](#icon-buttons) | string | See the available icons in our [Icon Library](/bright-design-system/core-library/icon/) | `""` | |
| [icon-position](#icon-text-buttons) | string | `center` `prefix` `postfix` | `prefix` | |
| [is-toggle-button](#toggle-button) | boolean | | `false` | |
| [rounded](#rounded) | boolean | | `false` | |
| [show-loading-animation](#show-loading-animation) | boolean | | `false` | |
| [size](#size) | string | `large` `medium` `small` | `medium` | |
| [variant](#variant) | string | `standard` `alternative` `danger` | `standard` | |

### `BrightButton` v-model behavior
A `BrightButton` **supports** the v-model directive when it is a [Toggle Buttons](#toggle-button).

Learn more and see an example [here](#toggle-button-v-model).

### `BrightButton` Events
The `BrightButton` components will emit the following events when they are [Toggle Buttons](#toggle-button). You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#toggle-button-v-model) | When the user toggles the button. | A `boolean` value indicating the state of the **Toggle Button** (i.e. pressed vs not pressed). |