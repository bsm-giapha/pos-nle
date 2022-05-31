# Address

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundAddress from './components/VuePressUIPlaygroundAddress.vue';
export default {
    components: {
        VuePressUIPlaygroundAddress,
    },
}
</script>

Use **Address Inputs** to collect domestic and international address inputs.

<VuePressUIPlaygroundAddress/>

## Best Practices

### When To Use
> Use **Address Inputs** to collect domestic and international address inputs.

- **Domestic Address Inputs** will show a `State` dropdown menu that lists U.S. States and Territories.
- **International Address Inputs** will show a `Country` text input and a `State` text input.

## Value
Similar to how the HTML`<input>`'s value attribute works, use the `value` property to fill **Address Inputs** with initial values.
This property accepts an object with keys that refer to each **Address Input's** name.

The following code snippet is the minimum required template to build a **Value** object:

```javascript
let value = {
    streetAddress1: '123 Main Street',
    streetAddress2: '#A1',
    city: 'Huntington Beach',
    state: 'CA',
    zip: '92649',
};
```

<div class="code-example-box">
    <BrightInputAddress 
        id="valueAddress" 
        label="Mailing Address"
        :value="{
            streetAddress1: '123 Main Street',
            streetAddress2: '#A1',
            city: 'Huntington Beach',
            state: 'CA',
            zip: '92649',
        }"
    />
</div>

```vue{4-10}
<BrightInputAddress 
    id="valueAddress" 
    label="Mailing Address"
    :value="{
        streetAddress1: '123 Main Street',
        streetAddress2: '#A1',
        city: 'Huntington Beach',
        state: 'CA',
        zip: '92649',
    }"
/>
```

## Street Address 2
By default, all Address inputs collect Street Address 2 (which is often used to denote Apartment/Unit numbers).

To disable the collection of Street Address 2, use the `include-street-address2` prop.

<div class="code-example-box">
    <BrightInputAddress
        id="doNotIncludeStreetAddress2"
        label="Don't collect Street Address 2"
        :include-street-address2="false"
    />
</div>

```vue{4}
    <BrightInputAddress
        id="doNotIncludeStreetAddress2"
        label="Don't collect Street Address 2"
        :include-street-address2="false"
    />
```

## International Addresses
Use the `include-country` property to collect international address inputs.

<div class="code-example-box">
    <BrightInputAddress id="includeCountryAddress" label="Mailing Address" include-country/>
</div>

```vue{1}
<BrightInputAddress id="includeCountryAddress" label="Mailing Address" include-country/>
```

## Error Messages
Use the `error-messages` property to add custom error messages to an input element after it loses focus and if the input contains no value.
This property accepts an object with keys that refer to each **Address Input's** name.

The following code snippet is the minimum required template to build an **Error Messages** object:

```javascript
let errorMessages = {
    streetAddress1: 'This is not a valid street address.',
    city: 'Please enter a city.',
    state: 'Please select a U.S. State/Territory.',
    zip: 'Please enter a ZIP/Postal code.',
};
```

<div class="code-example-box">
    <BrightInputAddress 
        id="errorMessagesAddress" 
        label="Mailing Address"
        :error-messages="{
            streetAddress1: 'This is not a valid street address.',
            city: 'Please enter a city.',
            state: 'Please select a U.S. State/Territory.',
            zip: 'Please enter a ZIP/Postal code.',
        }"
    />
</div>

```vue{4-9}
<BrightInputAddress 
    id="errorMessagesAddress" 
    label="Mailing Address"
    :error-messages="{
        streetAddress1: 'This is not a valid street address.',
        city: 'Please enter a city.',
        state: 'Please select a U.S. State/Territory.',
        zip: 'Please enter a ZIP/Postal code.',
    }"
/>
```

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)
- [Form](/bright-design-system/input-library/form/)
- [Text](/bright-design-system/input-library/text/)

## API

### `BrightInputAddress` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputAddress id="address" label="Mailing Address"/>
</div>

```vue
<BrightInputAddress id="address" label="Mailing Address"/>
```

### `BrightInputAddress` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputAddress` component can receive the following **properties**.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [value](#value) | object | | `{}` | |
| [include-country](#international-addresses) | boolean | | `false` | |
| [include-street-address2](#street-address-2) | boolean | | `true` | |
| [error-messages](#error-messages) | object | | `{}` | |

### `BrightInputAddress` v-model behavior
The `BrightInputAddress` component **does support** the `v-model` directive and will return an `object` of all address [value](#value) on input.

### `BrightInputAddress` Events
The `BrightInputAddress` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns |
| :- | :- | :- |
| `input` [(v-model)](#brightinputaddress-v-model-behavior) | When a new value is inputted by the user. | The `object` containing the [value](#value) of the full address form. |

### `BrightInputAddress` Refs
The `BrightInputAddress` component has the following refs.

| Ref | Element Type | Notes |
| :- | :- | :- |
| countryInput | `<input>` | The input element for Country. |
| streetAddress1Input | `<input>` | The input element for Street Address 1. |
| streetAddress2Input | `<input>` | The input element for Street Address 2. |
| cityInput | `<input>` | The input element for City. |
| stateDropdown | `<button>` | The Select Button that contains the currently selected option for the State dropdown menu. This dropdown appears for domestic address inputs only. |
| stateInput | `<input>` | The input element for State. This input appears for international address inputs only. |
| zipInput | `<input>` | The input element for ZIP/Postal Code. |