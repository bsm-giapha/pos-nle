# Email

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundEmail from './components/VuePressUIPlaygroundEmail.vue';
export default {
    components: {
        VuePressUIPlaygroundEmail,
    },
}
</script>

Use **Email Inputs** to collect email inputs.

<VuePressUIPlaygroundEmail/>


## Best Practices

### When To Use
> Use **Email Inputs** to collect **email inputs**.

## Multiple
Use the `multiple` property to allow multiple comma-separated email addresses in an **Email Input**. Any trailing and leading whitespace is removed from each address in the **Email Input** upon [Form Submission](/bright-design-system/input-library/form/#submitting-data).

<div class="code-example-box">
    <BrightInputEmail
        id="emailMultiple"
        label="Multiple Emails"
        sub-label="This input can receive multiple comma-separated email addresses."
        placeholder="(e.g. example@domain.com, another@domain.com)"
        multiple
    />
</div>

```vue
<BrightInputEmail
    id="emailMultiple"
    label="Multiple Emails"
    sub-label="This Email Input can receive multiple comma-separated email addresses."
    placeholder="(e.g. example@domain.com, another@domain.com)"
    multiple
/>
```

## Related Reading
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Form](/bright-design-system/input-library/form/)

## API

### `BrightInputEmail` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputEmail id="email" label="Email"/>
</div>

```vue
<BrightInputEmail id="email" label="Email"/>
```

### `BrightInputEmail` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputEmail` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [multiple](#multiple) | boolean | | `false` | |

### `BrightInputEmail` v-model behavior
The `BrightInputEmail` component **does support** the `v-model` directive and will return a `string` on input.

### `BrightInputEmail` Events
The `BrightInputEmail` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightinputemail-v-model-behavior) | When a new value is inputted by the user. | The `string` value of the new input. |

### `BrightInputEmail` Refs
The `BrightInputEmail` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |