# Switch

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundSwitch from './components/VuePressUIPlaygroundSwitch.vue';
export default {
    components: {
        VuePressUIPlaygroundSwitch,
    },
}
</script>

Use **Switches** to collect boolean inputs that are often seen as "on / off" or "enabled / disabled" (i.e. settings).

<VuePressUIPlaygroundSwitch/>

## Best Practices

### When To Use
> Use **Switches** to collect boolean inputs that are often seen as **"on / off" or "enabled / disabled" (i.e. settings)**.

If you are dealing with generic boolean inputs that aren't settings, then use [Checkboxes](/bright-design-system/input-library/checkbox/) instead.

## Variant
Use the `variant` property to change the variant styling of a **Switch**.

By default, all **Switches** use the `standard` `variant`.

<div class="code-example-box">
    <BrightSwitch
        id="standardSwitchStandard"
        label="Standard Switch (Default)"
        sub-label="Use this in most layouts."
        :checked="true"
    />
    <BrightSwitch
        id="standardSwitchAlternative"
        label="Alternative Switch"
        sub-label="Use this sometimes in certain layouts."
        :checked="true"
        variant="alternative"
    />
</div>

```vue{10}
<BrightSwitch
    id="standardSwitchStandard"
    label="Standard Switch"
    sub-label="Use this in most layouts."
    :checked="true"
/>

<BrightSwitch
    id="standardSwitchAlternative"
    label="Alternative Switch"
    sub-label="Use this sometimes in certain layouts."
    :checked="true"
    variant="alternative"
/>
```

## Description
A **Switch's** description is used for enhancing accessibility.

### When True
When a **Switch** is toggled "on", use the `description-true` property to rename its description. The default toggled "on" description is `Yes`.

### When False
When a **Switch** is toggled "off", use the `description-false` property to rename its description. The default toggled "off" description is `No`.

<div class="code-example-box">
    <BrightSwitch
        id="description"
        label="Account Status"
        sub-label="Active accounts can login and perform duties as assigned."
        description-true="Active"
        description-false="Inactive"
    />
</div>

```vue{5,6}
<BrightSwitch
    id="description"
    label="Account Status"
    sub-label="Active accounts can login and perform duties as assigned."
    description-true="Active"
    description-false="Inactive"
/>
```

## Spacing
Like [Checkboxes](/bright-design-system/input-library/checkbox/#spacing), **Switches** have different spacing mechanics based on whether they are children of an [Input Group](/bright-design-system/input-library/input-group/).

If a **Switch** is a child of an [Input Group](/bright-design-system/input-library/input-group/), then it will have tighter spacing based on the [Input Group's Size](/bright-design-system/input-library/input-group/#size). This is ideal when placing several related **Switches** together. Note that the [`form-control`](/bright-design-system/input-library/overview/#form-control) property will not be able to be used on a **Switch** in this state.

If a **Switch** is **not** a child of an [Input Group](/bright-design-system/input-library/input-group/), then it will have normal [Form Control](/bright-design-system/input-library/overview/#form-control) spacing and can be further controlled via the [`form-control`](/bright-design-system/input-library/overview/#form-control) property if desired.

<div class="code-example-box">
    <BrightInputGroup label="Switch Input Group">
        <BrightSwitch
            id="spacingInputGroup1"
            label="This switch is in an Input Group"
            sub-label="It has a nice and snug fit with the switch below it."
            :checked="true"
        />
        <BrightSwitch
            id="spacingInputGroup2"
            label="This switch is in an Input Group too"
            sub-label="It has a nice and snug fit with the switches above and below it."
            :checked="false"
        />
        <BrightSwitch
            id="spacingInputGroup3"
            label="This switch is in an Input Group too"
            sub-label="It has a nice and snug fit with the switch above it."
            :checked="false"
        />
    </BrightInputGroup>
    <div class="border mb-16"></div>
    <BrightSwitch
        id="spacingNoInputGroup1"
        label="This switch isn't in an Input Group"
        sub-label="It has a lot of margin below it because it's the default Form Control amount."
        :checked="true"
    />
    <BrightSwitch
        id="spacingNoInputGroup2"
        label="This switch isn't in an Input Group too"
        sub-label="It has a lot of margin below it because it's the default Form Control amount."
        :checked="false"
    />
    <BrightSwitch
        id="spacingNoInputGroup3"
        label="This switch isn't in an Input Group too"
        sub-label="It has a lot of margin below it because it's the default Form Control amount."
        :checked="false"
    />
</div>

```vue
<BrightInputGroup label="Switch Input Group">
    <BrightSwitch
        id="spacingInputGroup1"
        label="This switch is in an Input Group"
        sub-label="It has a nice and snug fit with the switch below it."
        :checked="true"
    />
    <BrightSwitch
        id="spacingInputGroup2"
        label="This switch is in an Input Group too"
        sub-label="It has a nice and snug fit with the switches above and below it."
        :checked="false"
    />
    <BrightSwitch
        id="spacingInputGroup3"
        label="This switch is in an Input Group too"
        sub-label="It has a nice and snug fit with the switch above it."
        :checked="false"
    />
</BrightInputGroup>

<div class="border mb-16"></div>

<BrightSwitch
    id="spacingNoInputGroup1"
    label="This switch isn't in an Input Group"
    sub-label="It has a lot of margin below it because it's the default Form Control amount."
    :checked="true"
/>
<BrightSwitch
    id="spacingNoInputGroup2"
    label="This switch isn't in an Input Group too"
    sub-label="It has a lot of margin below it because it's the default Form Control amount."
    :checked="false"
/>
<BrightSwitch
    id="spacingNoInputGroup3"
    label="This switch isn't in an Input Group too"
    sub-label="It has a lot of margin below it because it's the default Form Control amount."
    :checked="false"
/>
```

## Related Reading
- [Checkbox](/bright-design-system/input-library/checkbox/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)

## API

### `BrightSwitch` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightSwitch id="switch" label="Switch"/>
</div>

```vue
<BrightSwitch id="switch" label="Switch"/>
```

### `BrightSwitch` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightSwitch` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [variant](#variant) | string | `standard` `alternative` | `standard` | |
| [description-true](#description) | string | | `Yes` | |
| [description-false](#description) | string | | `No` | |

### `BrightSwitch` v-model behavior
The `BrightSwitch` component **does support** the `v-model` directive and will return a `boolean` on change.

### `BrightSwitch` Events
The `BrightSwitch` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `input` [(v-model)](#brightswitch-v-model-behavior) | When the value is changed by the user. | The `boolean` value of the new input. |

### `BrightSwitch` Refs
The `BrightSwitch` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| input | `<input>` | The main input element. |