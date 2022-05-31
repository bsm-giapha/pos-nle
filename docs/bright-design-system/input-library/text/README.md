# Text

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundText from './components/VuePressUIPlaygroundText.vue';
export default {
    components: {
        VuePressUIPlaygroundText,
    },
}
</script>

Use **Text Inputs** to collect generic text input that is short in length.

<VuePressUIPlaygroundText/>

## Best Practices

### When To Use
> Use **Text Inputs** to collect **generic text input** that is **short in length** and isn't viable to collect via the [other available components in the Input Library](/bright-design-system/input-library/).

## Capitalization
Use the `capitalize` property to automatically capitalize words in **Text Inputs**.

<div class="code-example-box">
    <BrightInputText
        id="capitalizeWords"
        label="Full Name"
        sub-label="Please enter your First and Last Name."
        capitalize
    />
</div>

```vue{5}
<BrightInputText
    id="capitalizeWords"
    label="Full Name"
    sub-label="Please enter your First and Last Name."
    capitalize
/>
```

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)
- [Form](/bright-design-system/input-library/form/)
- [Textarea](/bright-design-system/input-library/textarea/)

## API

### `BrightInputText` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputText id="text" label="Text"/>
</div>

```vue
<BrightInputText id="text" label="Text"/>
```

### `BrightInputText` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputText` component can receive the following **properties**.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [capitalize](#capitalization) | boolean | | `false` | |

### `BrightInputText` v-model behavior
The `BrightInputText` component **does support** the `v-model` directive and will return a `string` on input.

### `BrightInputText` Events
The `BrightInputText` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightinputtext-v-model-behavior) | When a new value is inputted by the user. | The `string` value of the new input. |

### `BrightInputText` Refs
The `BrightInputText` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |