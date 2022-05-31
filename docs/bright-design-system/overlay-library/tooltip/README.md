# Tooltip

<script>
import VuePressUIPlaygroundTooltip from './components/VuePressUIPlaygroundTooltip.vue';
export default {
    components: {
        VuePressUIPlaygroundTooltip,
    },
}
</script>

Use **Tooltips** to attach a short, descriptive tooltip to an element.

<VuePressUIPlaygroundTooltip/>


## Best Practices

### When To Use
Use **Tooltips** to attach a tooltip to an element and provide a quick description related to the element.

#### Tooltips should be short in length
Tooltips should be short in length. They're meant to provide a quick description of the element that they're attached to and nothing more.


## Anatomy
**Tooltips** consist of a [title](#title) and [text](#text). Its [placement](#placement) can be set to be placed at the top, bottom, left, or right of an element.

### Text
Use the `text` property to attach a text description to a **BrightTooltip**. This should briefly describe the element that the **Tooltip** is attached to.

<div class="code-example-box">
    <BrightTooltip text="Hovering over the button below will trigger this tooltip.">
        <BrightButton use="secondary">Hover Over Me</BrightButton>
    </BrightTooltip>
</div>

```vue{1}
<BrightTooltip text="Hovering over the button below will trigger this tooltip.">
    <BrightButton use="secondary">Hover Over Me</BrightButton>
</BrightTooltip>
```

### Title
In some cases, having a titled tooltip is preferred. Use the `title` property to attach a title to a **BrightTooltip**. Titles should always be accompanied by [text](#text).

<div class="code-example-box">
    <BrightTooltip title="Tooltips" text="Tooltips can help users understand things.">
        <BrightButton use="secondary">Hover Over Me</BrightButton>
    </BrightTooltip>
</div>

```vue{1}
<BrightTooltip title="Tooltips" text="Tooltips can help users understand things.">
    <BrightButton use="secondary">Hover Over Me</BrightButton>
</BrightTooltip>
```

### Style Class
Use the `styleClass` property to attach classes to the Tooltip Menu itself.

<div class="code-example-box">
    <BrightTooltip
        title="🌮 Fun Fact (Palindrome)"
        text="The word 'tacocat' is 'tacocat' spelled backwards."
        styleClass="text-center"
    >
        <BrightButton use="secondary">Hover Over Me</BrightButton>
    </BrightTooltip>
</div>

```vue{4}
<BrightTooltip
    title="🌮 Fun Fact (Palindrome)"
    text="The word 'tacocat' is 'tacocat' spelled backwards."
    styleClass="text-center"
>
    <BrightButton use="secondary">Hover Over Me</BrightButton>
</BrightTooltip>
```

### Arrow
To control the visibility of a **Tooltip's** arrow, use the `arrow` property. The `arrow` property is set to `true` by default.

<div class="code-example-box">
    <BrightTooltip text="This tooltip has no arrow." arrow=false>
        <BrightButton use="secondary">Hover Over Me</BrightButton>
    </BrightTooltip>
</div>

```vue{1}
<BrightTooltip text="This tooltip has no arrow." arrow=false>
    <BrightButton use="secondary">Hover Over Me</BrightButton>
</BrightTooltip>
```


## State

### Disabled
Use the `disabled` property to prevent a **BrightTooltip** from appearing at all.

<div class="code-example-box">
    <BrightTooltip text="You won't be able to see this." disabled>
        <BrightButton use="secondary">Hover Over Me</BrightButton>
    </BrightTooltip>
</div>

```vue{1}
<BrightTooltip text="You won't be able to see this." disabled>
    <BrightButton use="secondary">Hover Over Me</BrightButton>
</BrightTooltip>
```

### Placement
There are 15 different placement options. By default, all **Tooltips** open on top of their source element. If desired, **Tooltips** can be positioned to the `bottom`, `left`, or `right` of their source element using the `placement` property.
**Tooltips** can also be `auto` positioned. The **Tooltip** will then be placed on the side with the most space.

Each `placement` can accept an additional `-start` or `-end` variation.

A **Tooltip's** positioning will adapt based on the available screen space and may shift as a result. This ensures a user's screen size does not obstruct a **Tooltip's** information.

<div class="code-example-box">
    <BrightTooltip title="Top-Start" text="This one opens at top-start." placement="top-start">
        <BrightButton use="primary">Top-Start</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Top (Default)" text="This one opens on the top." placement="top">
        <BrightButton use="secondary">Top</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Top-End" text="This one opens at top-end." placement="top-end">
        <BrightButton use="primary">Top-End</BrightButton>
    </BrightTooltip>
    <br><br>
    <BrightTooltip title="Bottom-Start" text="This one opens at bottom-start." placement="bottom-start">
        <BrightButton use="primary">Bottom-Start</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Bottom" text="This one opens on the bottom." placement="bottom">
        <BrightButton use="secondary">Bottom</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Bottom-End" text="This one opens at bottom-end." placement="bottom-end">
        <BrightButton use="primary">Bottom-End</BrightButton>
    </BrightTooltip>
    <br><br>
    <BrightTooltip title="Left-Start" text="This one opens at left-start." placement="left-start">
        <BrightButton use="primary">Left-Start</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Left" text="This one opens on the left." placement="left">
        <BrightButton use="secondary">Left</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Left-End" text="This one opens at left-end." placement="left-end">
        <BrightButton use="primary">Left-End</BrightButton>
    </BrightTooltip>
    <br><br>
    <BrightTooltip title="Right-Start" text="This one opens at right-start." placement="right-start">
        <BrightButton use="primary">Right-Start</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Right" text="This one opens on the right." placement="right">
        <BrightButton use="secondary">Right</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Right-End" text="This one opens at right-end." placement="right-end">
        <BrightButton use="primary">Right-End</BrightButton>
    </BrightTooltip>
    <br><br>
    <BrightTooltip title="Auto-Start" text="This one opens on the side with the most space at auto-start." placement="auto-start">
        <BrightButton use="primary">Auto-Start</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Auto" text="This one opens on the side with the most space." placement="auto">
        <BrightButton use="secondary">Auto</BrightButton>
    </BrightTooltip>
    <BrightTooltip title="Auto-End" text="This one opens on the side with the most space at auto-end." placement="auto-end">
        <BrightButton use="primary">Auto-End</BrightButton>
    </BrightTooltip>
</div>

```vue{1,4,7,11,14,17,21,24,27,31,34,37,41,44,47}
<BrightTooltip title="Top-Start" text="This one opens at top-start." placement="top-start">
    <BrightButton use="primary">Top-Start</BrightButton>
</BrightTooltip>
<BrightTooltip title="Top (Default)" text="This one opens on the top." placement="top">
    <BrightButton use="secondary">Top</BrightButton>
</BrightTooltip>
<BrightTooltip title="Top-End" text="This one opens at top-end." placement="top-end">
    <BrightButton use="primary">Top-End</BrightButton>
</BrightTooltip>
<br><br>
<BrightTooltip title="Bottom-Start" text="This one opens at bottom-start." placement="bottom-start">
    <BrightButton use="primary">Bottom-Start</BrightButton>
</BrightTooltip>
<BrightTooltip title="Bottom" text="This one opens on the bottom." placement="bottom">
    <BrightButton use="secondary">Bottom</BrightButton>
</BrightTooltip>
<BrightTooltip title="Bottom-End" text="This one opens at bottom-end." placement="bottom-end">
    <BrightButton use="primary">Bottom-End</BrightButton>
</BrightTooltip>
<br><br>
<BrightTooltip title="Left-Start" text="This one opens at left-start." placement="left-start">
    <BrightButton use="primary">Left-Start</BrightButton>
</BrightTooltip>
<BrightTooltip title="Left" text="This one opens on the left." placement="left">
    <BrightButton use="secondary">Left</BrightButton>
</BrightTooltip>
<BrightTooltip title="Left-End" text="This one opens at left-end." placement="left-end">
    <BrightButton use="primary">Left-End</BrightButton>
</BrightTooltip>
<br><br>
<BrightTooltip title="Right-Start" text="This one opens at right-start." placement="right-start">
    <BrightButton use="primary">Right-Start</BrightButton>
</BrightTooltip>
<BrightTooltip title="Right" text="This one opens on the right." placement="right">
    <BrightButton use="secondary">Right</BrightButton>
</BrightTooltip>
<BrightTooltip title="Right-End" text="This one opens at right-end." placement="right-end">
    <BrightButton use="primary">Right-End</BrightButton>
</BrightTooltip>
<br><br>
<BrightTooltip title="Auto-Start" text="This one opens on the side with the most space at auto-start." placement="auto-start">
    <BrightButton use="primary">Auto-Start</BrightButton>
</BrightTooltip>
<BrightTooltip title="Auto" text="This one opens on the side with the most space." placement="auto">
    <BrightButton use="secondary">Auto</BrightButton>
</BrightTooltip>
<BrightTooltip title="Auto-End" text="This one opens on the side with the most space at auto-end." placement="auto-end">
    <BrightButton use="primary">Auto-End</BrightButton>
</BrightTooltip>
```


## Accessibility
By default, all **Tooltips** have the following accessibility properties and values automatically set:

- `role="tooltip"`

Be sure to add the appropriate accessibility markup for your use case. The common ARIA properties associated with a tooltip are:
- [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
- [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)


## API
### `BrightTooltip` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightTooltip text="Tooltip">
        <a href="javascript:void(0)">Hover over me</a>
    </BrightTooltip>
</div>

```vue{1-3}
<BrightTooltip text="Tooltip">
    <a href="javascript:void(0)">Hover over me</a>
</BrightTooltip>
```

### `BrightTooltip` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightTooltip` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [disabled](#disabled) | boolean | | `false` | |
| [arrow](#arrow) | boolean | | `true` | |
| [placement](#placement) | string | `top-start` `top` `top-end`<br/><br/> `bottom-start` `bottom` `bottom-end`<br/><br/> `left-start` `left` `left-end`<br/><br/> `right-start` `right` `right-end`<br/><br/> `auto-start` `auto` `auto-end` | `top` | |
| [text](#text) | string | | `""` | |
| [title](#title) | string | | `""` | |
| [styleClass](#style-class) | string | | `""` | |

 ### `BrightTooltip` Refs
 The `BrightTooltip` component has the following refs.
 
 | Ref | Element Type | Notes | 
 | :- | :- | :- |
 | <div class="inline-block" style="width: 128px">**popper**</div> | `<div>` | The tooltip card. |
 | **arrow** | `<div>` | The tooltip arrow. |
 | **sourceElement** | `<div>` | The tooltip's source element. |