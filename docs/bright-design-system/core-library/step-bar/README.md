# Step Bar

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundStepBar from './components/VuePressUIPlaygroundStepBar.vue';
export default {
    components: {
        VuePressUIPlaygroundStepBar,
    },
}
</script>

Use **Step Bars** when the User needs to complete a series of linear actions (or steps) in a larger process.

<VuePressUIPlaygroundStepBar/>

## Structure & State

### Steps
Steps can be added to a **Step Bar** via the `steps` prop, which accepts an array of **Step** objects.

The schema for a **Step** object is the following:

```javascript
let step = {
    label: 'Step 1', // REQUIRED {String}.
    subLabel: 'This is the first step.', // Optional {String}. This is shown when a Step is selected.
};
```

Thus, a **Step Bar** can be populated with **Steps** like so:
<div class="code-example-box">
    <BrightStepBar
        id="stepsStepBar"
        :steps="[
            {
                label: 'Step 1',
            },
            {
                label: 'Step 2',
            },
            {
                label: 'Step 3',
            },
            {
                label: 'Step 4',
            },
        ]"
        :current-step="2"
    />
</div>

```vue
<BrightStepBar
    id="stepsStepBar"
    :steps="[
        {
            label: 'Step 1',
        },
        {
            label: 'Step 2',
        },
        {
            label: 'Step 3',
        },
        {
            label: 'Step 4',
        },
    ]"
    :current-step="2"
/>
```

### Current Step
The **Step Bar** needs to know what the **Current Step** is. You can specify the **Current Step** with the `current-step` prop. This should be 1-based (not 0-based), so if you mean to refer to the 1st Step, you should provide `1`.

## Styling

### Color
Use the `color` property to change the color of a **Step Bar**. By default, all **Step Bars** use the `primary` color (i.e. indigo).

<div class="code-example-box">
    <BrightStepBar
        id="colorStepBar1"
        :steps="[
            {
                label: 'Primary Step 1',
            },
            {
                label: 'Primary Step 2',
            },
            {
                label: 'Primary Step 3',
            },
            {
                label: 'Primary Step 4',
            },
        ]"
        :current-step="2"
    />
    <BrightDivider class="my-32"/>
    <BrightStepBar
        id="colorStepBar2"
        :steps="[
            {
                label: 'Secondary Step 1',
            },
            {
                label: 'Secondary Step 2',
            },
            {
                label: 'Secondary Step 3',
            },
            {
                label: 'Secondary Step 4',
            },
        ]"
        color="secondary"
        :current-step="3"
    />
</div>

```vue
<BrightStepBar
    id="colorStepBar1"
    :steps="[
        {
            label: 'Primary Step 1',
        },
        {
            label: 'Primary Step 2',
        },
        {
            label: 'Primary Step 3',
        },
        {
            label: 'Primary Step 4',
        },
    ]"
    :current-step="2"
/>
<BrightDivider class="my-32"/>
<BrightStepBar
    id="colorStepBar2"
    :steps="[
        {
            label: 'Secondary Step 1',
        },
        {
            label: 'Secondary Step 2',
        },
        {
            label: 'Secondary Step 3',
        },
        {
            label: 'Secondary Step 4',
        },
    ]"
    color="secondary"
    :current-step="3"
/>
```

## API

### `BrightStepBar` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightStepBar
        id="provideYourOwnUniqueIDHere"
        :steps="[
            {
                label: 'Step 1',
            },
            {
                label: 'Step 2',
            },
            {
                label: 'Step 3',
            },
        ]"
        :current-step="1"
    />
</div>

```vue
<BrightStepBar
    id="provideYourOwnUniqueIDHere"
    :steps="[
        {
            label: 'Step 1',
        },
        {
            label: 'Step 2',
        },
        {
            label: 'Step 3',
        },
    ]"
    :current-step="1"
/>
```

### `BrightStepBar` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightStepBar` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| **id** | string | | | ✅ |
| [steps](#steps) | Array of Step objects | | | ✅ |
| [current-step](#current-step) | Number | | | ✅ |
| [color](#color) | String | `primary` or `secondary` | `primary` | ✅ |
| [heading-level](#heading-level) | Number | 1, 2, 3, 4, 5, 6 | 2 | ✅ |

### `BrightStepBar` Events
The `BrightStepBar` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns |
| :- | :- | :- |
| `step-click` | When a **Step** is clicked or pressed. | The Number of the **Step** that was clicked.|
