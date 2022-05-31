# Textarea

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundTextarea from './components/VuePressUIPlaygroundTextarea.vue';
export default {
    components: {
        VuePressUIPlaygroundTextarea,
    },
}
</script>

Use **Textarea Inputs** to collect long-form or multi-line text input.

<VuePressUIPlaygroundTextarea/>


## Best Practices

### When To Use
> Use **Textarea Inputs** to collect **long-form or multi-line text input**.

## Resize
Use the `resize` property to control whether or not a **Textarea Input** should be vertically resizable. If a **Textarea Input** is resizable, then it will have a draggable interaction point in the bottom-right corner of its input area. The appearance of this interaction point varies based on browsers and is generally not available on mobile / touch screens.

By default, a **Textarea Input** is resizable.

<div class="code-example-box">
    <BrightInputTextarea
        id="textareaResizableTrue"
        label="Resizable Textarea"
        sub-label="This Textarea Input is vertically resizable by default."
        placeholder="Try dragging it around (if you can)."
    />
    <BrightInputTextarea
        id="textareaResizableFalse"
        label="Static Textarea"
        sub-label="This Textarea Input is not vertically resizable."
        placeholder="You can't drag this around, unfortunately."
        :resize="false"
    />
</div>

```vue{13}
<BrightInputTextarea
    id="textareaResizableTrue"
    label="Resizable Textarea"
    sub-label="This Textarea Input is vertically resizable by default."
    placeholder="Try dragging it around (if you can)."
/>

<BrightInputTextarea
    id="textareaResizableFalse"
    label="Static Textarea"
    sub-label="This Textarea Input is not vertically resizable."
    placeholder="You can't drag this around, unfortunately."
    :resize="false"
/>
```

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Form](/bright-design-system/input-library/form/)
- [Text](/bright-design-system/input-library/text/)

## API

### `BrightInputTextarea` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputTextarea id="textarea" label="Textarea"/>
</div>

```vue
<BrightInputTextarea id="textarea" label="Textarea"/>
```

### `BrightInputTextarea` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputTextarea` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [resize](#resize) | boolean | | `true` | |

### `BrightInputTextarea` v-model behavior
The `BrightInputTextarea` component **does support** the `v-model` directive and will return a `string` on input.

### `BrightInputTextarea` Events
The `BrightInputTextarea` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightinputtextarea-v-model-behavior) | When a new value is inputted by the user. | The `string` value of the new input. |

### `BrightInputTextarea` Refs
The `BrightInputTextarea` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<textarea>` | The main textarea element. |