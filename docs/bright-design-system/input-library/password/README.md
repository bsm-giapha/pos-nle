# Password

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundPassword from './components/VuePressUIPlaygroundPassword.vue';
import VuePressInputPasswordLoadingAnimationDemo from './demos/VuePressInputPasswordLoadingAnimationDemo.vue';
export default {
    components: {
        VuePressUIPlaygroundPassword,
        VuePressInputPasswordLoadingAnimationDemo,
    },
}
</script>

Use **Password Inputs** to collect passwords and generic confidential inputs.

<VuePressUIPlaygroundPassword/>


## Best Practices

### When To Use
> Use **Password Inputs** to collect **passwords and generic confidential inputs**.

When dealing with **specialized confidential inputs**, consider the following **Input** components instead:

- Credit Card Numbers (see [Credit Card](/bright-design-system/input-library/credit-card/))
- Social Security Numbers (see [SSN](/bright-design-system/input-library/ssn/))

## Show Loading Animation
Use the `show-loading-animation` property to display a loading animation after the Show button is pressed. This is useful if showing a password could take a few moments.

Reference the example below to see how this can be utilized.

<VuePressInputPasswordLoadingAnimationDemo/>

<<< @/docs/bright-design-system/input-library/password/demos/VuePressInputPasswordLoadingAnimationDemo.vue

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Form](/bright-design-system/input-library/form/)
- [Credit Card](/bright-design-system/input-library/credit-card/)
- [SSN](/bright-design-system/input-library/ssn/)

## API

### `BrightInputPassword` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputPassword id="password" label="Password"/>
</div>

```vue
<BrightInputPassword id="password" label="Password"/>
```

### `BrightInputPassword` Properties
The `BrightInputPassword` component can receive the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties). It does not have any unique properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [show-loading-animation](#show-loading-animation) | boolean | | `false` | |

### `BrightInputPassword` v-model behavior
The `BrightInputPassword` component **does support** the `v-model` directive and will return a `string` on input.

### `BrightInputPassword` Refs
The `BrightInputPassword` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |