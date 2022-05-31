# Phone Number

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundPhoneNumber from './components/VuePressUIPlaygroundPhoneNumber.vue';
export default {
    components: {
        VuePressUIPlaygroundPhoneNumber,
    },
}
</script>

Use **Phone Number Inputs** to collect phone number inputs with smart-formatting.

<VuePressUIPlaygroundPhoneNumber/>

## Best Practices

### When To Use
Use **Phone Number Inputs** to collect phone number inputs with smart-formatting.

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)
- [Form](/bright-design-system/input-library/form/)

## API

### `BrightInputPhoneNumber` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputPhoneNumber id="phoneNumber" label="Phone Number"/>
</div>

```vue
<BrightInputPhoneNumber id="phoneNumber" label="Phone Number"/>
```

### `BrightInputPhoneNumber` Properties
The `BrightInputPhoneNumber` component can receive the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties). It does not have any unique properties.

### `BrightInputPhoneNumber` v-model behavior
The `BrightInputPhoneNumber` component **does support** the `v-model` directive and will return a `string` on input.

### `BrightInputPhoneNumber` Events
The `BrightInputPhoneNumber` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightinputphonenumber-v-model-behavior) | When a new value is inputted by the user. | The `string` value of the new input. |

### `BrightInputPhoneNumber` Refs
The `BrightInputPhoneNumber` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |