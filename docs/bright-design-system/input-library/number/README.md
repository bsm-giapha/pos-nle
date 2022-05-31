# Number

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundNumber from './components/VuePressUIPlaygroundNumber.vue';
export default {
    components: {
        VuePressUIPlaygroundNumber,
    },
}
</script>

Use **Number Inputs** to collect generic numeric inputs.

<VuePressUIPlaygroundNumber/>


## Best Practices

### When To Use
> Use **Number Inputs** to collect **generic numeric inputs**.

When dealing with **specialized numeric inputs**, consider the following **Input** components instead:

- Money (see [Money](/bright-design-system/input-library/money/))
- Phone Numbers (see [Phone Number](/bright-design-system/input-library/phone-number/))
- Percentages (see [Percent](/bright-design-system/input-library/percent/))
- Credit Card Numbers (see [Credit Card](/bright-design-system/input-library/credit-card/))
- Social Security Numbers (see [SSN](/bright-design-system/input-library/ssn/))

## Decimal
By default, **Number Inputs** will only allow integers (whole numbers) to be inputted.

To allow decimal input, use the `decimal` property.
- If the `decimal` property is set, then the **Number Input** will allow decimal values with unlimited precision.
- If the `decimal` property is set to an integer, then the **Number Input** will allow decimal values up to the specified precision.

<div class="code-example-box">
    <BrightInputNumber
        id="numberNoDecimal"
        label="Whole Number"
        sub-label="You can only input whole numbers. No decimals allowed."
        placeholder="This is the default setting for Number Inputs."
    />
    <BrightInputNumber
        id="numberYesDecimal"
        label="Decimal Number (Unlimited)"
        sub-label="You can input decimal numbers with unlimited precision."
        decimal
    />
    <BrightInputNumber
        id="numberLimitedDecimal"
        label="Decimal Number (Limited to 2 Decimal Places)"
        sub-label="You can input decimal numbers with a precision of 2."
        decimal="2"
    />
</div>

```vue{11,17}
<BrightInputNumber
    id="numberNoDecimal"
    label="Whole Number"
    sub-label="You can only input whole numbers. No decimals allowed."
    placeholder="This is the default setting for Number Inputs."
/>
<BrightInputNumber
    id="numberYesDecimal"
    label="Decimal Number (Unlimited)"
    sub-label="You can input decimal numbers with unlimited precision."
    decimal
/>
<BrightInputNumber
    id="numberLimitedDecimal"
    label="Decimal Number (Limited to 2 Decimal Places)"
    sub-label="You can input decimal numbers with a precision of 2."
    decimal="2"
/>
```

## Percent
Use the `percent` property to display a percent sign in the **Number Input**. This will signify that the value inputted is a percentage.

- If the `percent` property is set, then the **Number Input** will append a percent sign (%) to the **Number Input**.
- If the `percent` property is not set, then a percent sign will not be appended to the **Number Input**.

<div class="code-example-box">
    <BrightInputNumber
        id="numberNoPercent"
        label="Number"
        sub-label="You can only input numbers without a percent."
        placeholder="This is the default setting for Number Inputs."
    />
    <BrightInputNumber
        id="numberYesPercent"
        label="Percentage"
        sub-label="Numbers inputted will be displayed as a percentage."
        percent
    />
</div>

```vue{11}
<BrightInputNumber
    id="numberNoPercent"
    label="Number"
    sub-label="You can only input numbers without a percent."
    placeholder="This is the default setting for Number Inputs."
/>
<BrightInputNumber
    id="numberYesPercent"
    label="Percentage"
    sub-label="Numbers inputted will be displayed as a percentage."
    percent
/>
```

## Negative
By default, a **Number Input** only allows positive numbers.

Use the `negative` property to have a **Number Input** accept negative numbers.

<div class="code-example-box">
    <BrightInputNumber
        id="numberPositive"
        label="Only positive numbers are allowed"
        sub-label="You can only input a positive number."
        placeholder="This is the default setting for Number Inputs."
    />
    <BrightInputNumber
        id="numberNegative"
        label="Negative numbers are allowed"
        sub-label="You can input a positive or negative number."
        negative
    />
</div>

```vue{11}
<BrightInputNumber
    id="numberPositive"
    label="Only positive numbers are allowed"
    sub-label="You can only input a positive number."
    placeholder="This is the default setting for Number Inputs."
/>
<BrightInputNumber
    id="numberNegative"
    label="Negative numbers are allowed"
    sub-label="You can input a positive or negative number."
    negative
/>
```

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Form](/bright-design-system/input-library/form/)
- [Money](/bright-design-system/input-library/money/)
- [Phone Number](/bright-design-system/input-library/phone-number/)
- [Percent](/bright-design-system/input-library/percent/)
- [Credit Card](/bright-design-system/input-library/credit-card/)
- [SSN](/bright-design-system/input-library/ssn/)


## API

### `BrightInputNumber` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputNumber id="number" label="Number"/>
</div>

```vue
<BrightInputNumber id="number" label="Number"/>
```

### `BrightInputNumber` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputNumber` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [decimal](#decimal) | boolean, number | `true` `false` `any integer` | `false` | |
| [percent](#percent) | boolean | | `false` | |
| [negative](#negative) | boolean | | `false` | |

### `BrightInputNumber` v-model behavior
The `BrightInputNumber` component **does support** the `v-model` directive and will return a `string` on input. To return a `number` instead, use the `.number` modifier on v-model (e.g. `v-model.number="myDataBinding"`). See [here](https://vuejs.org/v2/guide/forms.html#number) for more information.

### `BrightInputNumber` Events
The `BrightInputNumber` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightinputnumber-v-model-behavior) | When a new value is inputted by the user. | The `string` value of the new input. |

### `BrightInputNumber` Refs
The `BrightInputNumber` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |