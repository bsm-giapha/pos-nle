# Radio Group

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundRadioGroup from './components/VuePressUIPlaygroundRadioGroup.vue';
export default {
    components: {
        VuePressUIPlaygroundRadioGroup,
    },
}
</script>

Use **Radio Groups** to collect a single value amongst similar options.

<VuePressUIPlaygroundRadioGroup/>

## Best Practices

### When To Use
Use **Radio Groups** to collect a single value amongst similar options when the following statements are all true:
- There are **at least two options** and they **are not boolean answers** (e.g. "Yes" / "No" or "Subscribe" / "Unsubscribe").
    - If this is not true, then use [Checkboxes](/bright-design-system/input-library/checkbox/) or [Switches](/bright-design-system/input-library/switch/) instead (depending on your situation). [Checkboxes](/bright-design-system/input-library/checkbox/) and [Switches](/bright-design-system/input-library/switch/) are designed to collect boolean inputs and make more sense than using a **Radio Group** to present two inverse options.
- There are **less than six options**.
    - If this is not true, then use [Single-Select Dropdowns](/bright-design-system/input-library/select-dropdown/) instead. [Single-Select Dropdowns](/bright-design-system/input-library/select-dropdown/) have a built-in search functionality and can better present a large amount of options.
- There is **enough space** to present all options in a layout.
    - If this is not true, then consider using [Single-Select Dropdowns](/bright-design-system/input-library/select-dropdown/) instead. [Single-Select Dropdowns](/bright-design-system/input-library/select-dropdown/) are space-efficient and will allow many options to be presented in a compact space.


## Options (Radio Buttons)
Use the `options` property to specify an array of **Radio Buttons** that will be shown in a **Radio Group**.

:::tip Note
**Radio Group** will automatically pass appropriate values to its **Radio Buttons**, such as `name`, `disabled`, and `optional`. 
:::

The schema for a **Radio Button** data object is the following:
```js
let option = {
    id: 'imInThisPhoto', // REQUIRED {String}. This will also automatically populate the `value` attribute if the `value` is not specified.
    label: 'I\'m in this photo and I don\'t like it', // REQUIRED {String}. This is what gets displayed to the User.
    subLabel: 'Please delete immediately.', // Optional {String}. This is an optional sub-label that goes under the main label. Use this as needed to provide more details about an option.
    checked: false, // Optional {Boolean}. Can be true or false. Note that only ONE option can be checked at a time in a Radio Group.
    disabled: false, // Optional {Boolean}. Can be true or false. Note that if the Radio Group is disabled, all options will be disabled as well.
    value: 'iDontLikeIt', // Optional {String}. By default, an option's value will be equal to the option's `id` attribute, but you can manually specify it here if desired.
}
```

Thus, a **Radio Group** can be populated with **Radio Buttons** like so:

<div class="code-example-box">
    <BrightRadioGroup
        id="whatsGoingOn"
        label="What's going on?"
        :options="[
            { id: 'annoying', label: 'It\'s annoying or not interesting' },
            { id: 'imInThisPhoto', label: 'I\'m in this photo and I don\'t like it', checked: true },
            { id: 'shouldntBeHere', label: 'I think it shouldn\'t be on here' },
            { id: 'spam', label: 'It\'s spam' },
        ]"
    />
</div>

```vue{4-9}
<BrightRadioGroup
    id="whatsGoingOn"
    label="What's going on?"
    :options="[
        { id: 'annoying', label: 'It\'s annoying or not interesting' },
        { id: 'dontLikeIt', label: 'I\'m in this photo and I don\'t like it', checked: true },
        { id: 'shouldntBeHere', label: 'I think it shouldn\'t be on here' },
        { id: 'spam', label: 'It\'s spam' },
    ]"
/>
```

## Variant
Use the `variant` property to change the variant styling of a **Radio Group**.

By default, all **Radio Groups** use the `standard` variant.

<div class="code-example-box">
    <BrightRadioGroup
        id="chickenWingsVariantStandard"
        label="Your chicken wing preference"
        :options="[
            { id: 'boneIn', label: 'Bone-in wings are vastly superior', subLabel: 'Boneless wings are just overpriced chicken nuggets', checked: true },
            { id: 'boneless', label: 'I vibe with boneless wings', subLabel: 'Ain\'t nobody got time for bones in wings' },
        ]"
    />
    <BrightRadioGroup
        id="chickenWingsVariantAlternative"
        label="Your chicken wing preference"
        variant="alternative"
        :options="[
            { id: 'boneIn', label: 'Bone-in wings are vastly superior', subLabel: 'Boneless wings are just overpriced chicken nuggets', checked: true },
            { id: 'boneless', label: 'I vibe with boneless wings', subLabel: 'Ain\'t nobody got time for bones in wings' },
        ]"
    />
</div>

```vue{12}
<BrightRadioGroup
    id="chickenWingsVariantStandard"
    label="Your chicken wing preference"
    :options="[
        { id: 'boneIn', label: 'Bone-in wings are vastly superior', subLabel: 'Boneless wings are just overpriced chicken nuggets', checked: true },
        { id: 'boneless', label: 'I vibe with boneless wings', subLabel: 'Ain\'t nobody got time for bones in wings' },
    ]"
/>
<BrightRadioGroup
    id="chickenWingsVariantAlternative"
    label="Your chicken wing preference"
    variant="alternative"
    :options="[
        { id: 'boneIn', label: 'Bone-in wings are vastly superior', subLabel: 'Boneless wings are just overpriced chicken nuggets', checked: true },
        { id: 'boneless', label: 'I vibe with boneless wings', subLabel: 'Ain\'t nobody got time for bones in wings' },
    ]"
/>
```

## Related Reading
- [Select Dropdown](/bright-design-system/input-library/select-dropdown/)
- [Checkbox](/bright-design-system/input-library/checkbox/)
- [Switch](/bright-design-system/input-library/switch/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)

## API

### `BrightRadioGroup` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightRadioGroup
        id="radiogroup"
        label="Radio Group"
        :options="[
            { id: 'option1', label: 'Option 1', checked: true },
            { id: 'option2', label: 'Option 2' }
        ]"
    />
</div>

```vue
<BrightRadioGroup
    id="radiogroup"
    label="Radio Group"
    :options="[
        { id: 'option1', label: 'Option 1', checked: true },
        { id: 'option2', label: 'Option 2' }
    ]"
/>
```

### `BrightRadioGroup` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightRadioGroup` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [options](#options-radio-buttons) | array | | | ✅ |
| [variant](#variant) | string | `standard` `alternative` | `standard` | |

### `BrightRadioGroup` v-model behavior
The `BrightRadioGroup` component **does support** the `v-model` directive and will return a `string` on change that will be the **value** of the selected option.

### `BrightRadioGroup` Events
The `BrightRadioGroup` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightradiogroup-v-model-behavior) | When the value is changed by the user. | The `boolean` value of the new input. |

### `BrightRadioGroup` Refs
The `BrightRadioGroup` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| <div class="inline-block" style="width: 128px">`value` (dynamic)</div> | `<input>` | All radio input buttons have a ref with a name equal to their `value` (or `id` if no value is present). *For example: If a Radio Button has a schema of `{ id: 'hello', label: 'Hello' }`, then its ref name would be **hello**.* |