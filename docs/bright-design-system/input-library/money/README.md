# Money

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundMoney from './components/VuePressUIPlaygroundMoney.vue';
export default {
    components: {
        VuePressUIPlaygroundMoney,
    },
}
</script>


Use **Money Inputs** to collect USD currency inputs.


<VuePressUIPlaygroundMoney/>

## Best Practices

### When To Use
> Use **Money Inputs** to collect **generic USD currency inputs**.

When dealing with **specialized numeric inputs**, consider the following **Input** components instead:

- Number (see [Number](/bright-design-system/input-library/number/))
- Phone Numbers (see [Phone Number](/bright-design-system/input-library/phone-number/))
- Percentages (see [Percent](/bright-design-system/input-library/percent/))
- Credit Card Numbers (see [Credit Card](/bright-design-system/input-library/credit-card/))
- Social Security Numbers (see [SSN](/bright-design-system/input-library/ssn/))

## Decimal
By default, **Money Inputs** will allow 2 decimals to be inputted and will auto-format to 2 decimals.

To disable this and only allow whole number inputs, use the `decimal` property.

<div class="code-example-box">
    <BrightInputMoney
        id="moneyYesDecimal"
        label="Decimal Number"
        sub-label="You can input decimal numbers with a precision of 2."
    />
    <BrightInputMoney
        id="moneyNoDecimal"
        label="Whole Number"
        sub-label="You can only input whole numbers. No decimals allowed."
        placeholder="This is the default setting for Money Inputs."
        :decimal="false"
    />
</div>

```vue {12}
<BrightInputMoney
    id="moneyYesDecimal"
    label="Decimal Number"
    sub-label="You can input decimal numbers with a precision of 2."
    decimal
/>
<BrightInputMoney
    id="moneyNoDecimal"
    label="Whole Number"
    sub-label="You can only input whole numbers. No decimals allowed."
    placeholder="This is the default setting for Money Inputs."
    :decimal="false"
/>
```

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Form](/bright-design-system/input-library/form/)
- [Number](/bright-design-system/input-library/number/)
- [Phone Number](/bright-design-system/input-library/phone-number/)
- [Percent](/bright-design-system/input-library/percent/)
- [Credit Card](/bright-design-system/input-library/credit-card/)
- [SSN](/bright-design-system/input-library/ssn/)


## API

### `BrightInputMoney` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputMoney id="money" label="Money Amount"/>
</div>

```vue
<BrightInputMoney id="money" label="Money Amount"/>
```

### `BrightInputMoney` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputMoney` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [decimal](#decimal) | boolean | | `true` | |

### `BrightInputMoney` v-model behavior
The `BrightInputMoney` component **does support** the `v-model` directive and will return a `string` on input. To return a `number` instead, use the `.number` modifier on v-model (e.g. `v-model.number="myDataBinding"`). See [here](https://vuejs.org/v2/guide/forms.html#number) for more information.

### `BrightInputMoney` Events
The `BrightInputMoney` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightinputmoney-v-model-behavior) | When a new value is inputted by the user. | The `string` value of the new input. |

### `BrightInputMoney` Refs
The `BrightInputMoney` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |

### `BrightInputMoney` Input Value
The `BrightInputMoney` component handles user input differently than other Bright Input components.  To the end users, the inputted value will be formatted and presented as money.  However, the data sent in the form data is the bare float value.  Example: A user inputs 25690.00.  It will be displayed as $25,690.00 but will be sent in the form data as 25690.00.