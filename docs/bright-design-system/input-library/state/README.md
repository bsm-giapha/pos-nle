# State

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundState from './components/VuePressUIPlaygroundState.vue';
export default {
    components: {
        VuePressUIPlaygroundState,
    },
}
</script>

Use a **State Input** to collect a U.S. state or territory.

<VuePressUIPlaygroundState/>

## Best Practices

### When To Use
> Use a **State Input** to collect a U.S. state or territory.

Currently, only U.S. States and Territories are supported. A regular [Text Input](/bright-design-system/input-library/text/) can be used in cases where a country or region outside the U.S. is to be inputted.

## The List of State Options
The `BrightInputState` component is designed to make it easy to generate a standard list of options. It also provides a way to specify a custom list if only certain states should be included.

By default, the **State Input** will be a dropdown list containing an option for every U.S. state plus the District of Columbia.

<div class="code-example-box">
    <BrightInputState
        id="statesOnly"
        sub-label="By default, the list of options consists only of U.S. States and the District of Columbia."
    />
</div>

```vue
<BrightInputState
    id="statesOnly"
    sub-label="By default, the list of options consists only of U.S. States and the District of Columbia."
/>
```

#### Include Territories

The default list of states can be expanded to include U.S. territories by setting the `include-territories` prop equal to `true`.

<div class="code-example-box">
    <BrightInputState
        id="statesAndTerritories"
        sub-label="Now U.S. territories are also in the list."
        :include-territories="true"
    />
</div>

```vue{4}
<BrightInputState
    id="statesAndTerritories"
    sub-label="Now U.S. territories are also in the list."
    :include-territories="true"
/>
```

#### Custom States

At times it may be necessary to specify an arbitrary subset of states and/or territories. Pass an array of state or territory abbreviations into the `states` prop to choose which options appear in the dropdown list.

<div class="code-example-box">
    <BrightInputState
        id="statesThatStartWithA"
        sub-label="Only U.S. states and territories that start with the letter A."
        :states="['AL', 'AK', 'AS', 'AZ', 'AR']"
    />
</div>

```vue{4}
<BrightInputState
    id="statesThatStartWithA"
    sub-label="Only U.S. states and territories that start with the letter A."
    :states="['AL', 'AK', 'AS', 'AZ', 'AR']"
/>
```
No options will appear if an empty array `[]` is passed to `states`, and the default list of states will appear if `states` is not specified or if `null` is passed in.

## Related Reading
- [Select Dropdown](/bright-design-system/input-library/select-dropdown/)
- [Address Input](/bright-design-system/input-library/address/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)


## API

### `BrightInputState` Minimum Required Template (MRT)

Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputState id="state"/>
</div>

```vue
<BrightInputState id="state"/>
```


### `BrightInputState` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputState` can receive [all properties that the `BrightDropdownSelect` input can receive](/bright-design-system/input-library/select-dropdown/#brightdropdownselect-properties), with the exception of the `options` property. The following **properties** are unique to `BrightInputState`: 

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [states](#custom-states) | Array | | `null` | |
| [includeTerritories](#include-territories) | boolean | | `false` | |

#### Special Behavior

Some properties common to the `BrightInputState`'s ancestors work differently in `BrightInputState` itself.

The [`options` property](/bright-design-system/input-library/select-dropdown/#options) is required in the `BrightDropdownSelect`, but is not a property of the `BrightInputState`.

The [`searchable` property](/bright-design-system/input-library/select-dropdown/#searchable) is `true` by default in the `BrightInputState`, unlike the `BrightDropdownSelect` where it defaults to `false`.

The [`label` property](/bright-design-system/input-library/overview/#label) is optional and defaults to `'State'` in the `BrightInputState`, unlike all other inputs in which case it is required.


| Property | Type | Borrowed From | Behavior in Parent | Behavior in BrightInputState |
| :- | :- | :- | :- | :- |
| [options](/bright-design-system/input-library/select-dropdown/#options) | array | [BrightSelectDropdown](/bright-design-system/input-library/select-dropdown/#options) | required | not used |
| [searchable](/bright-design-system/input-library/select-dropdown/#searchable) | boolean | [BrightSelectDropdown](/bright-design-system/input-library/select-dropdown/#searchable) | defaults to `true` | defaults to `false` |
| [label](/bright-design-system/input-library/overview/#label) | string | [Input Library](/bright-design-system/input-library/overview/#label) | required | defaults to `'State'` |
