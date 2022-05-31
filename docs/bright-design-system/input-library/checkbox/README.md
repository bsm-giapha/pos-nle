# Checkbox

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundCheckbox from './components/VuePressUIPlaygroundCheckbox.vue';
export default {
    components: {
        VuePressUIPlaygroundCheckbox,
    },
}
</script>

Use **Checkboxes** to collect generic boolean inputs.

<VuePressUIPlaygroundCheckbox/>

## Best Practices

### When To Use
> Use **Checkboxes** to collect **generic boolean inputs** that are **not "on / off" or "enable / disable" settings**. 

If you are dealing with boolean inputs that are "on / off" or "enable / disable" settings, then use [Switches](/bright-design-system/input-library/switch/) instead.

## Variant
Use the `variant` property to change the variant styling of a **Checkbox**.

By default, all **Checkboxes** use the `standard` variant.

<div class="code-example-box">
    <BrightCheckbox
        id="standardCheckboxStandard"
        label="Standard Checkbox (Default)"
        sub-label="Use this in most layouts."
        :checked="true"
    />
    <BrightCheckbox
        id="standardCheckboxAlternative"
        label="Alternative Checkbox"
        sub-label="Use this sometimes in certain layouts."
        :checked="true"
        variant="alternative"
    />
</div>

```vue{10}
<BrightCheckbox
    id="standardCheckboxStandard"
    label="Standard Checkbox"
    sub-label="Use this in most layouts."
    :checked="true"
/>

<BrightCheckbox
    id="standardCheckboxAlternative"
    label="Alternative Checkbox"
    sub-label="Use this sometimes in certain layouts."
    :checked="true"
    variant="alternative"
/>
```

## Spacing
Like [Switches](/bright-design-system/input-library/switch/#spacing), **Checkboxes** have different spacing mechanics based on whether they are children of an [Input Group](/bright-design-system/input-library/input-group/).

If a **Checkbox** is a child of an [Input Group](/bright-design-system/input-library/input-group/), then it will have tighter spacing based on the [Input Group's Size](/bright-design-system/input-library/input-group/#size). This is ideal when placing several related **Checkboxes** together. Note that the [`form-control`](/bright-design-system/input-library/overview/#form-control) property will not be able to be used on a **Checkbox** in this state.

If a **Checkbox** is **not** a child of an [Input Group](/bright-design-system/input-library/input-group/), then it will have normal [Form Control](/bright-design-system/input-library/overview/#form-control) spacing and can be further controlled via the [`form-control`](/bright-design-system/input-library/overview/#form-control) property if desired.

<div class="code-example-box">
    <BrightInputGroup label="Checkbox Input Group">
        <BrightCheckbox
            id="spacingInputGroup1"
            label="This checkbox is in an Input Group"
            sub-label="It has a nice and snug fit with the checkbox below it."
            :checked="true"
        />
        <BrightCheckbox
            id="spacingInputGroup2"
            label="This checkbox is in an Input Group too"
            sub-label="It has a nice and snug fit with the checkboxes above and below it."
            :checked="false"
        />
        <BrightCheckbox
            id="spacingInputGroup3"
            label="This checkbox is in an Input Group too"
            sub-label="It has a nice and snug fit with the checkbox above it."
            :checked="false"
        />
    </BrightInputGroup>
    <div class="border mb-16"></div>
    <BrightCheckbox
        id="spacingNoInputGroup1"
        label="This checkbox isn't in an Input Group"
        sub-label="It has a lot of margin below it because it's the default Form Control amount."
        :checked="true"
    />
    <BrightCheckbox
        id="spacingNoInputGroup2"
        label="This checkbox isn't in an Input Group too"
        sub-label="It has a lot of margin below it because it's the default Form Control amount."
        :checked="false"
    />
    <BrightCheckbox
        id="spacingNoInputGroup3"
        label="This checkbox isn't in an Input Group too"
        sub-label="It has a lot of margin below it because it's the default Form Control amount."
        :checked="false"
    />
</div>

```vue
<BrightInputGroup label="Checkbox Input Group">
    <BrightCheckbox
        id="spacingInputGroup1"
        label="This checkbox is in an Input Group"
        sub-label="It has a nice and snug fit with the checkbox below it."
        :checked="true"
    />
    <BrightCheckbox
        id="spacingInputGroup2"
        label="This checkbox is in an Input Group too"
        sub-label="It has a nice and snug fit with the checkboxes above and below it."
        :checked="false"
    />
    <BrightCheckbox
        id="spacingInputGroup3"
        label="This checkbox is in an Input Group too"
        sub-label="It has a nice and snug fit with the checkbox above it."
        :checked="false"
    />
</BrightInputGroup>

<div class="border mb-16"></div>

<BrightCheckbox
    id="spacingNoInputGroup1"
    label="This checkbox isn't in an Input Group"
    sub-label="It has a lot of margin below it because it's the default Form Control amount."
    :checked="true"
/>
<BrightCheckbox
    id="spacingNoInputGroup2"
    label="This checkbox isn't in an Input Group too"
    sub-label="It has a lot of margin below it because it's the default Form Control amount."
    :checked="false"
/>
<BrightCheckbox
    id="spacingNoInputGroup3"
    label="This checkbox isn't in an Input Group too"
    sub-label="It has a lot of margin below it because it's the default Form Control amount."
    :checked="false"
/>
```

## Related Reading
- [Switch](/bright-design-system/input-library/switch/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)

## API

### `BrightCheckbox` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightCheckbox id="checkbox" label="Checkbox"/>
</div>

```vue
<BrightCheckbox id="textarea" label="Textarea"/>
```

### `BrightCheckbox` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightCheckbox` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [variant](#variant) | string | `standard` `alternative` | `standard` | |

### `BrightCheckbox` v-model behavior
The `BrightCheckbox` component **does support** the `v-model` directive and will return a `boolean` on change.

### `BrightCheckbox` Events
The `BrightCheckbox` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightcheckbox-v-model-behavior) | When the value is changed by the user. | The `boolean` value of the new input. |

### `BrightCheckbox` Refs
The `BrightCheckbox` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |