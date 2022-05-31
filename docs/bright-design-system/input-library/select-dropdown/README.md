# Select Dropdown

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundSelectDropdown from './components/VuePressUIPlaygroundSelectDropdown.vue';
import VuePressDropdownMethodDemo from './demos/VuePressDropdownMethodDemo.vue';
import VuePressVModelSingleSelectDropdownDemo from './demos/VuePressVModelSingleSelectDropdownDemo.vue';
import VuePressVModelMultipleSelectDropdownDemo from './demos/VuePressVModelMultipleSelectDropdownDemo.vue';
export default {
    components: {
        VuePressUIPlaygroundSelectDropdown,
        VuePressDropdownMethodDemo, 
        VuePressVModelSingleSelectDropdownDemo, 
        VuePressVModelMultipleSelectDropdownDemo
    },
}
</script>

Use **Select Dropdowns** to collect a value (or many values) amongst many similar options.

<VuePressUIPlaygroundSelectDropdown/>

## Best Practices

### When To Use
> Use **Select Dropdowns** to collect a single or multiple values amongst similar options when there are **more than five options** or there **isn't enough space** to present all options in a layout.

If this is not true, then use [Checkboxes](/bright-design-system/input-library/checkbox/), [Switches](/bright-design-system/input-library/switch/), or [Radio Groups](/bright-design-system/input-library/radio-group/) (depending on your situation)

## Structure

### Options
**Options** can be added to a **Select Dropdown** via the `options` prop, which accepts an array of objects containing **Option** data. 

The schema for an **Option** data object is the following:
```js
let option = {
    value: 'orange', // REQUIRED {String}. This is what gets submitted upon Form Submission.
    label: 'Orange', // REQUIRED {String}. This is what gets displayed to the User.
    subLabel: 'Orange consists of red and yellow.', // Optional {String}. This is an optional sub-label that goes under the main label. Use this as needed to provide more details about an option.
    searchTags: ['pumpkin', 'carrot', 'apricot'], // Optional {String[]}. When searching the dropdown, an option will be included in the filtered list if either its label or one of its searchTags matches the inputted search term.
    icon: 'palette', // Optional {String}. You can reference the name of an Icon in our Icon Library.
    selected: false, // Optional {Boolean}. NOTE: DO NOT USE when you're using v-model. This will cause v-model to behave incorrectly on the Dropdown.
    disabled: false, // Optional {Boolean}. Can be true or false.
}
```

Thus, a **Select Dropdown** can be populated with **Options** like so:

<div class="code-example-box">
    <BrightDropdownSelect
        id="optionSchemaExample"
        label="Which of these primary colors is your favorite?"
        :button-full-width="false"
        :options="[
            { label: 'Blue', value: 'blue', icon: 'palette', selected: true },
            { label: 'Red', value: 'red', icon: 'palette',},
            { label: 'Yellow', value: 'yellow', icon: 'palette', },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{5-10}
<BrightDropdownSelect
    id="optionSchemaExample"
    label="Which of these primary colors is your favorite?"
    :button-full-width="false"
    :options="[
        { label: 'Blue', value: 'blue', icon: 'palette', selected: true },
        { label: 'Red', value: 'red', icon: 'palette',},
        { label: 'Yellow', value: 'yellow', icon: 'palette', },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

### Option Groups
**Option Groups** can be added to a **Select Dropdown** via the `options` prop in a manner similar to normal [Options](#options).

The schema for an **Option Group** data object is the following:
```js
let optionGroup = {
    value: 'Primary Colors', // REQUIRED {String}. This is what gets submitted upon Form Submission.
    options: [] // REQUIRED {Array}. This is an array of Option data objects.
}
```

Thus, a **Select Dropdown** can be populated with **Option Groups** like so:

<div class="code-example-box">
    <BrightDropdownSelect
        id="optionGroupSchemaExample"
        label="Which of these (new) primary colors is your favorite?"
        :button-full-width="false"
        :options="[
            { label: 'Primary Colors', options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Red', value: 'red' },
                { label: 'Yellow', value: 'yellow' },
            ]},
            { label: 'Imaginary Primary Colors', options: [
                { label: 'Blured', value: 'blured', icon: 'palette' },
                { label: 'Redlow', value: 'redlow', icon: 'palette' },
                { label: 'Yellue', value: 'yellue', icon: 'palette' },
            ]},
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{6,10-11,15}
<BrightDropdownSelect
    id="optionGroupSchemaExample"
    label="Which of these (new) primary colors is your favorite?"
    :button-full-width="false"
    :options="[
        { label: 'Primary Colors', options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Red', value: 'red' },
            { label: 'Yellow', value: 'yellow' },
        ]},
        { label: 'Imaginary Primary Colors', options: [
            { label: 'Blured', value: 'blured', icon: 'palette' },
            { label: 'Redlow', value: 'redlow', icon: 'palette' },
            { label: 'Yellue', value: 'yellue', icon: 'palette' },
        ]},
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', value: 'idk', disabled: true }
    ]"
/>
```

## Behavior
### Single-Select vs. Multi-Select
**Select Dropdowns** are **Single-Select Dropdowns** by default. To create a **Multi-Select Dropdown** and allow multiple options to be selected, use the `multiple` property. 

:::tip Consider Checkboxes
If you know you will be presenting **less than six options** to the user, then consider using [Checkboxes](/bright-design-system/input-library/checkbox/) instead. **Multi-Select Dropdowns** should be used sparingly to present **six or more** options to a user.
:::

<div class="code-example-box">
    <BrightDropdownSelect
        id="multipleDropdownExample"
        label="Which of these (new) secondary colors is your favorite?"
        multiple
        :button-full-width="false"
        :options="[
            { label: 'Secondary Colors', options: [
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            ]},
            { label: 'Imaginary Secondary Colors', options: [
                { label: 'Pureen', subLabel: 'Consists of purple and green.', value: 'pureen' },
                { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge' },
                { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple' },
            ]},
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{4}
<BrightDropdownSelect
    id="multipleDropdownExample"
    label="Which of these (new) secondary colors is your favorite?"
    multiple
    :button-full-width="false"
    :options="[
        { label: 'Secondary Colors', options: [
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        ]},
        { label: 'Imaginary Secondary Colors', options: [
            { label: 'Pureen', subLabel: 'Consists of purple and green.', value: 'pureen' },
            { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge' },
            { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple' },
        ]},
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

#### Truncate Multiple Items
By default, all **Multi-Select Dropdowns** will truncate the label that gets displayed in their buttons in a format of "X selected" if more than one item is selected. 

It's possible to disable this truncation and show a [Tag](/bright-design-system/core-library/tag/)-delimited list of selected options by using the `multiple-item-truncation` property.

<div class="code-example-box">
    <BrightDropdownSelect
        id="multipleTruncationDropdownExample"
        label="Which of these (new) secondary colors is your favorite?"
        multiple
        :multiple-item-truncation="false"
        :button-full-width="false"
        :options="[
            { label: 'Secondary Colors', options: [
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            ]},
            { label: 'Imaginary Secondary Colors', options: [
                { label: 'Pureen', subLabel: 'Consists of purple and green.', value: 'pureen' },
                { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge' },
                { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple' },
            ]},
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{5}
<BrightDropdownSelect
    id="multipleTruncationDropdownExample"
    label="Which of these (new) secondary colors is your favorite?"
    multiple
    :multiple-item-truncation="false"
    :button-full-width="false"
    :options="[
        { label: 'Secondary Colors', options: [
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        ]},
        { label: 'Imaginary Secondary Colors', options: [
            { label: 'Pureen', subLabel: 'Consists of purple and green.', value: 'pureen' },
            { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge' },
            { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple' },
        ]},
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

#### Select All Options
By default, all **Multi-Select Dropdowns** will show a **Select All** option for the user's convenience.

It's possible to disable this **Select All** option by using the `multiple-select-all` property.

<div class="code-example-box">
    <BrightDropdownSelect
        id="multipleSelectAllDropdownExample"
        label="Which of these (new) secondary colors is your favorite?"
        multiple
        :multiple-select-all="false"
        :button-full-width="false"
        :options="[
            { label: 'Secondary Colors', options: [
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            ]},
            { label: 'Imaginary Secondary Colors', options: [
                { label: 'Pureen', subLabel: 'Consists of purple and green.', value: 'pureen' },
                { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge' },
                { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple' },
            ]},
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{5}
<BrightDropdownSelect
    id="multipleSelectAllDropdownExample"
    label="Which of these (new) secondary colors is your favorite?"
    multiple
    :multiple-select-all="false"
    :button-full-width="false"
    :options="[
        { label: 'Secondary Colors', options: [
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        ]},
        { label: 'Imaginary Secondary Colors', options: [
            { label: 'Pureen', subLabel: 'Consists of purple and green.', value: 'pureen' },
            { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge' },
            { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple' },
        ]},
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

### Searchable
All **Select Dropdowns** are searchable if the user starts typing while focused on them. To always show a searchbox on a **Select Dropdown**, use the `searchable` prop.

<div class="code-example-box">
    <BrightDropdownSelect
        id="searchableDropdownExample"
        label="Which of these random nice-sounding words is your favorite?"
        sub-label="You can only pick one. It's a tough choice."
        searchable
        :button-full-width="false"
        :options="[
            { label: 'Aurora', value: 'aurora' },
            { label: 'Bliss', value: 'bliss', searchTags: ['happiness', 'joy', 'paradise'] },
            { label: 'Cherish', value: 'cherish', searchTags: ['adore', 'treasure'] },
            { label: 'Demure', value: 'demure', searchTags: ['reticent', 'timid'] },
            { label: 'Elegant', value: 'elegant', searchTags: ['refined', 'opulent'] },
            { label: 'Floral', value: 'floral', searchTags: ['flowery', 'decorative'] },
            { label: 'Glen', value: 'glen', searchTags: ['glade'] },
            { label: 'Hana', value: 'hana' },
            { label: 'Iridescent', value: 'iridescent', searchTags: ['shimmering', 'lustrous'] },
            { label: 'Jasmine', value: 'jasmine' },
            { label: 'Kind', value: 'kind', searchTags: ['friendly', 'gracious'] },
            { label: 'Luminous', value: 'luminous', searchTags: ['incandescent', 'lustrous'] },
            { label: 'Magical', value: 'magical', searchTags: ['enchanting', 'wondrous'] },
            { label: 'Numeric', value: 'numeric' },
            { label: 'Opera', value: 'opera' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{5}
<BrightDropdownSelect
    id="searchableDropdownExample"
    label="Which of these random nice-sounding words is your favorite?"
    sub-label="You can only pick one. It's a tough choice."
    searchable
    :button-full-width="false"
    :options="[
        { label: 'Aurora', value: 'aurora' },
        { label: 'Bliss', value: 'bliss', searchTags: ['happiness', 'joy', 'paradise'] },
        { label: 'Cherish', value: 'cherish', searchTags: ['adore', 'treasure'] },
        { label: 'Demure', value: 'demure', searchTags: ['reticent', 'timid'] },
        { label: 'Elegant', value: 'elegant', searchTags: ['refined', 'opulent'] },
        { label: 'Floral', value: 'floral', searchTags: ['flowery', 'decorative'] },
        { label: 'Glen', value: 'glen', searchTags: ['glade'] },
        { label: 'Hana', value: 'hana' },
        { label: 'Iridescent', value: 'iridescent', searchTags: ['shimmering', 'lustrous'] },
        { label: 'Jasmine', value: 'jasmine' },
        { label: 'Kind', value: 'kind', searchTags: ['friendly', 'gracious'] },
        { label: 'Luminous', value: 'luminous', searchTags: ['incandescent', 'lustrous'] },
        { label: 'Magical', value: 'magical', searchTags: ['enchanting', 'wondrous'] },
        { label: 'Numeric', value: 'numeric' },
        { label: 'Opera', value: 'opera' },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

### Dummy
By default, all **Select Dropdowns** are "smart" and act as Inputs. There are cases where you'll need a Select Dropdown that is simple and only presents options or actions to choose from. For such cases, we have the `dummy` property, which does the following:
- Prevents the selecting of an option
- Prevents [searching](#searchable)
- Will emit an event of `option:selected` when an option is selected

:::warning Not compatible with Multi-Select Dropdown
**Dummy Select Dropdowns** are not compatible with [Multi-Select Dropdowns](#single-select-vs-multi-select). **Dummy Select Dropdowns** can only ever be **Single-Select Dropdowns**.
:::

<div class="code-example-box">
    <BrightDropdownSelect
        id="dummyDropdownExample"
        dummy
        label="Actions"
        hide-label
        placeholder="Select an Action"
        :button-full-width="false"
        :options="[
            { label: 'Actions', options: [
                { label: 'Add', icon: 'add', value: 'add' },
                { label: 'Edit', icon: 'edit', value: 'edit' },
                { label: 'Delete', icon: 'delete', value: 'delete' },
            ] },
        ]"
    />
</div>

```vue{3}
<BrightDropdownSelect
    id="dummyDropdownExample"
    dummy
    label="Actions"
    hide-label
    placeholder="Select an Action"
    :button-full-width="false"
    :options="[
        { label: 'Actions', options: [
            { label: 'Add', icon: 'add', value: 'add' },
            { label: 'Edit', icon: 'edit', value: 'edit' },
            { label: 'Delete', icon: 'delete', value: 'delete' },
        ] },
    ]"
/>
```

## Styling
**Select Dropdowns** have a number of styling properties that can be used in a variety of layouts.

### Hierarchy
Like [Buttons](/bright-design-system/core-library/button#hierarchy), **Select Dropdowns** can belong to a visual hierarchy.

By default, all **Select Dropdowns** don't belong to a hierarchy and instead look like regular select inputs.

<div class="code-example-box">
    <BrightDropdownSelect
        id="hierarchyExampleInput"
        label="Input Hierarchy"
        sub-label="This is the default look. It looks just like an input."
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="hierarchyExamplePrimary"
        hierarchy="primary"
        label="Primary Hierarchy"
        sub-label="This looks like a Primary Button."
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="hierarchyExampleSecondary"
        hierarchy="secondary"
        label="Secondary Hierarchy"
        sub-label="This looks like a Secondary Button."
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="hierarchyExampleTertiary"
        hierarchy="tertiary"
        label="Tertiary Hierarchy"
        sub-label="This looks like a Tertiary Button."
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{17,32,47}
<BrightDropdownSelect
    id="hierarchyExampleInput"
    label="Input Hierarchy"
    sub-label="This is the default look. It looks just like an input."
    placeholder="Pick your favorite"
    :button-full-width="false"
    :options="[
        { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
        { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
        { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>

<BrightDropdownSelect
    id="hierarchyExamplePrimary"
    hierarchy="primary"
    label="Primary Hierarchy"
    sub-label="This looks like a Primary Button."
    placeholder="Pick your favorite"
    :button-full-width="false"
    :options="[
        { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
        { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
        { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>

<BrightDropdownSelect
    id="hierarchyExampleSecondary"
    hierarchy="secondary"
    label="Secondary Hierarchy"
    sub-label="This looks like a Secondary Button."
    placeholder="Pick your favorite"
    :button-full-width="false"
    :options="[
        { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
        { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
        { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>

<BrightDropdownSelect
    id="hierarchyExampleTertiary"
    hierarchy="tertiary"
    label="Tertiary Hierarchy"
    sub-label="This looks like a Tertiary Button."
    placeholder="Pick your favorite"
    :button-full-width="false"
    :options="[
        { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
        { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
        { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

### Variant
Like [Buttons](/bright-design-system/core-library/button#variant), **Select Dropdowns** have variants that change their appearance.

By default, all **Select Dropdowns** with a non-Input [`hierarchy`](#hierarchy) have a **Standard** variant. Note that variants are only available to **Select Dropdowns** that have a non-Input `hierarchy` value (i.e. Primary, Secondary, or Tertiary hierarchies).

<div class="code-example-box">
    <div class="flex justify-between">
        <BrightDropdownSelect
            id="variantExampleStandard1"
            style="width: 256px"
            hierarchy="primary"
            variant="standard"
            label="Standard Primary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
        <BrightDropdownSelect
            id="variantExampleStandard2"
            style="width: 256px"
            hierarchy="secondary"
            variant="standard"
            label="Standard Secondary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
        <BrightDropdownSelect
            id="variantExampleStandard3"
            style="width: 256px"
            hierarchy="tertiary"
            variant="standard"
            label="Standard Tertiary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
    </div>
    <div class="flex justify-between">
        <BrightDropdownSelect
            id="variantExampleAlternative1"
            style="width: 256px"
            hierarchy="primary"
            variant="alternative"
            label="Alternative Primary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
        <BrightDropdownSelect
            id="variantExampleAlternative2"
            style="width: 256px"
            hierarchy="secondary"
            variant="alternative"
            label="Alternative Secondary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
        <BrightDropdownSelect
            id="variantExampleAlternative3"
            style="width: 256px"
            hierarchy="tertiary"
            variant="alternative"
            label="Alternative Tertiary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
    </div>
    <div class="flex justify-between">
        <BrightDropdownSelect
            id="variantExampleDanger1"
            style="width: 256px"
            hierarchy="primary"
            variant="danger"
            label="Danger Primary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
        <BrightDropdownSelect
            id="variantExampleDanger2"
            style="width: 256px"
            hierarchy="secondary"
            variant="danger"
            label="Danger Secondary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
        <BrightDropdownSelect
            id="variantExampleDanger3"
            style="width: 256px"
            hierarchy="tertiary"
            variant="danger"
            label="Danger Tertiary"
            placeholder="Pick your favorite"
            :button-full-width="false"
            :options="[
                { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
                { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
                { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
            ]"
        />
    </div>
</div>

```vue
<div class="flex justify-between">
    <BrightDropdownSelect
        id="variantExampleStandard1"
        hierarchy="primary"
        variant="standard"
        label="Standard Primary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="variantExampleStandard2"
        hierarchy="secondary"
        variant="standard"
        label="Standard Secondary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="variantExampleStandard3"
        hierarchy="tertiary"
        variant="standard"
        label="Standard Tertiary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

<div class="flex justify-between">
    <BrightDropdownSelect
        id="variantExampleAlternative1"
        hierarchy="primary"
        variant="alternative"
        label="Alternative Primary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="variantExampleAlternative2"
        hierarchy="secondary"
        variant="alternative"
        label="Alternative Secondary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="variantExampleAlternative3"
        hierarchy="tertiary"
        variant="alternative"
        label="Alternative Tertiary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

<div class="flex justify-between">
    <BrightDropdownSelect
        id="variantExampleDanger1"
        hierarchy="primary"
        variant="danger"
        label="Danger Primary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="variantExampleDanger2"
        hierarchy="secondary"
        variant="danger"
        label="Danger Secondary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
    <BrightDropdownSelect
        id="variantExampleDanger3"
        hierarchy="tertiary"
        variant="danger"
        label="Danger Tertiary"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>
```


### Placeholder
By default, a placeholder text of "Select" will display for a **Select Dropdown** if no **Option** is selected. To change this, use the `placeholder` prop.

<div class="code-example-box">
    <BrightDropdownSelect
        id="placeholderExample"
        label="Which of these secondary colors is your favorite?"
        placeholder="Pick your favorite"
        :button-full-width="false"
        :options="[
            { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
            { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
            { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
            { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
        ]"
    />
</div>

```vue{4}
<BrightDropdownSelect
    id="placeholderExample"
    label="Which of these secondary colors is your favorite?"
    placeholder="Pick your favorite"
    :button-full-width="false"
    :options="[
        { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple' },
        { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
        { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange' },
        { label: 'I don\'t like any of them', subLabel: 'Too bad.', icon: 'thumb_down', value: 'idk', disabled: true }
    ]"
/>
```

### Full-Width
**Select Dropdowns** have two customizable width properties for their [Select Buttons](#full-width-buttons) and [Dropdown Menus](#full-width-menus) parts respectively.

#### Full-Width Buttons
**Select Dropdowns** have full-width **Select Buttons** by default. To turn off this full-width preference, use the `button-full-width` prop.

<div class="code-example-box">
    <BrightDropdownSelect
        id="fullwidthTrue"
        label="What's going on?"
        :options="[
            { label: 'It\'s annoying or not interesting', value: '1' },
            { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
            { label: 'I think it shouldn\'t be on Bright', value: '3' },
            { label: 'It\'s spam', value: '4' },
        ]"
    />
    <BrightDropdownSelect
        id="fullwidthFalse"
        label="What's going on?"
        :button-full-width="false"
        :options="[
            { label: 'It\'s annoying or not interesting', value: '1' },
            { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
            { label: 'I think it shouldn\'t be on Bright', value: '3' },
            { label: 'It\'s spam', value: '4' },
        ]"
    />
</div>

```vue{14}
<BrightDropdownSelect
    id="fullwidthTrue"
    label="What's going on?"
    :options="[
        { label: 'It\'s annoying or not interesting', value: '1' },
        { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
        { label: 'I think it shouldn\'t be on Bright', value: '3' },
        { label: 'It\'s spam', value: '4' },
    ]"
/>
<BrightDropdownSelect
    id="fullwidthFalse"
    label="What's going on?"
    :button-full-width="false"
    :options="[
        { label: 'It\'s annoying or not interesting', value: '1' },
        { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
        { label: 'I think it shouldn\'t be on Bright', value: '3' },
        { label: 'It\'s spam', value: '4' },
    ]"
/>
```

#### Full-Width Menus
**Select Dropdowns** have fitted **Dropdown Menus** that automatically adjust to their content's width by default. To enable full-width **Dropdown Menus**, use the `menu-full-width` prop.

<div class="code-example-box">
    <BrightDropdownSelect
        id="fullwidthMenuTrue"
        label="What's going on?"
        :options="[
            { label: 'It\'s annoying or not interesting', value: '1' },
            { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
            { label: 'I think it shouldn\'t be on Bright', value: '3' },
            { label: 'It\'s spam', value: '4' },
        ]"
    />
    <BrightDropdownSelect
        id="fullwidthMenuFalse"
        label="What's going on?"
        :menu-full-width="true"
        :options="[
            { label: 'It\'s annoying or not interesting', value: '1' },
            { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
            { label: 'I think it shouldn\'t be on Bright', value: '3' },
            { label: 'It\'s spam', value: '4' },
        ]"
    />
</div>

```vue{14}
<BrightDropdownSelect
    id="fullwidthMenuTrue"
    label="What's going on?"
    :options="[
        { label: 'It\'s annoying or not interesting', value: '1' },
        { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
        { label: 'I think it shouldn\'t be on Bright', value: '3' },
        { label: 'It\'s spam', value: '4' },
    ]"
/>
<BrightDropdownSelect
    id="fullwidthMenuFalse"
    label="What's going on?"
    :menu-full-width="true"
    :options="[
        { label: 'It\'s annoying or not interesting', value: '1' },
        { label: 'I\'m in this photo and I don\'t like it', value: '2', selected: true },
        { label: 'I think it shouldn\'t be on Bright', value: '3' },
        { label: 'It\'s spam', value: '4' },
    ]"
/>
```

### Icon
**Select Dropdowns** that belong to a [hierarchy](#hierarchy) can have an Icon in their [placeholder](#placeholder).

Use the `icon` and `icon-position` properties to add an Icon to a **Select Dropdown** in a hierarchy. 

For a list of all available **Icons** in **Bright**, see the [Icon Library](/bright-design-system/core-library/icon/#icon-library).

<div class="code-example-box">
    <BrightDropdownSelect
        id="iconExample"
        hierarchy="primary"
        icon="more_vert"
        label="Actions"
        hide-label
        dummy
        placeholder="Actions"
        :button-full-width="false"
        :options="[
            { label: 'Edit', icon: 'edit', value: 'edit' },
            { label: 'Delete', icon: 'delete', value: 'delete' },
        ]"
    />
</div>

```vue{4}
<BrightDropdownSelect
    id="iconExample"
    hierarchy="primary"
    icon="more_vert"
    label="Actions"
    hide-label
    placeholder="Actions"
    :button-full-width="false"
    :options="[
        { label: 'Edit', icon: 'edit', value: 'edit' },
        { label: 'Delete', icon: 'delete', value: 'delete' },
    ]"
/>
```

### Hide Arrow
Use the `hide-arrow` property to hide the little arrow/caret that shows to the right of a **Select Dropdown**.

<div class="code-example-box">
    <BrightDropdownSelect
        id="hideArrowExample"
        hierarchy="tertiary"
        icon="more_vert"
        icon-position="center"
        label="Actions"
        placeholder=""
        dummy
        rounded
        hide-arrow
        hide-label
        :button-full-width="false"
        :options="[
            { label: 'Edit', icon: 'edit', value: 'edit' },
            { label: 'Delete', icon: 'delete', value: 'delete' },
        ]"
    />
</div>

```vue{10}
<BrightDropdownSelect
    id="hideArrowExample"
    hierarchy="tertiary"
    icon="more_vert"
    icon-position="center"
    label="Actions"
    placeholder=""
    dummy
    rounded
    hide-arrow
    hide-label
    :button-full-width="false"
    :options="[
        { label: 'Edit', icon: 'edit', value: 'edit' },
        { label: 'Delete', icon: 'delete', value: 'delete' },
    ]"
/>
```

## Accessibility
**Select Dropdowns** meet the [W3C ARIA 1.1 spec for listboxes](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox) for all of its included functionality.

### Keyboard Controls
**Select Dropdowns** have the following keyboard controls:

#### Arrow Key Movement

- **Select Button**
    - **Down:** Open **Dropdown Menu** and move to the first available UI element.
    - **Right:** Move to the last focused option (**Multi-Select Dropdown** only).
- **Selected Options** (**Multi-Select Dropdown** only)
    - **Up:** Focus on **Select Button**.
    - **Down:** Move to the **Dropdown Menu**.
    - **Right:** Move to the next UI element.
    - **Left:** Move to the previous UI element.
- **Dropdown Menu**
    - **Down:** Move to next UI element.
    - **Up:** Move to the previous UI element.

#### Other Keys

- **Select Button**
    - **Space/Enter:** Open/close the **Dropdown Menu** and focus on the first option that has already been selected. If no option has been selected already, then focus on the first option.
    - **Backspace/Delete:** Unselect the most recently selected option.
    - **Any alphanumeric key:** Open the **Dropdown Menu** and begin searching.
- **Selected Options** (**Multi-Select Dropdown** only)
    - **Space/Enter:** Open the **Dropdown Menu** and focus on the current option in the menu.
    - **Backspace/Delete:** Unselect the current option.
- **Dropdown Menu (Search Box)**
    - **Enter:** Select the first displayed option.
- **Dropdown Menu (Options)**
    - **Space:** Select the current option (**Single-Select Dropdown**) or toggle the current option (**Multi-Select Dropdown**).
    - **Enter:** Select the current option and close the **Dropdown Menu**.
    - **Backspace/Delete:** Unselect the current option.
    - **Home:** Focus on the first option.
    - **End:** Focus on the last option.
    - **Any alphanumeric key:** Begin searching.

## Related Reading
- [Checkbox](/bright-design-system/input-library/checkbox/)
- [Switch](/bright-design-system/input-library/switch/)
- [Radio Group](/bright-design-system/input-library/radio-group/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)


## API

### `BrightDropdownSelect` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightDropdownSelect
        id="select"
        label="Select"
        :options="[
            { id: 'option1', label: 'Option 1', value: 'option1', selected: true },
            { id: 'option2', label: 'Option 2', value: 'option2' }
        ]"
    />
</div>

```vue
<BrightDropdownSelect
    id="select"
    label="Select"
    :options="[
        { id: 'option1', label: 'Option 1', value: 'option1', selected: true },
        { id: 'option2', label: 'Option 2', value: 'option2' }
    ]"
/>
```


### `BrightDropdownSelect` Properties
In addition to the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightDropdownSelect` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [options](#options) | array | | | ✅ |
| [button-full-width](#full-width-buttons) | boolean | | `true` | |
| [dummy](#dummy) | boolean | | `false` | |
| [hide-arrow](#hide-arrow) | boolean | | `false` | |
| [hierarchy](#hierarchy) | string | `input` `primary` `secondary` `tertiary` | `input` | |
| [icon](#icon) | string | See the available icons in our [Icon Library](/bright-design-system/core-library/icon/) | `""` | |
| [icon-position](#icon) | string | `center` `prefix` `postfix` | `prefix` | |
| [menu-full-width](#full-width-menus) | boolean | | `false` | |
| [multiple](#single-select-vs-multi-select) | boolean | | `false` | |
| [multiple-item-truncation](#truncate-multiple-items) | boolean | | `true` | |
| [multiple-select-all](#select-all-options) | boolean | | `true` | |
| [placeholder](#placeholder) | string | | `'Select'` | |
| [searchable](#searchable) | boolean | | `false` | |
| [variant](#variant) | string | `standard` `alternative` `danger` | `standard` | |

### `BrightDropdownSelect` v-model behavior
The `BrightDropdownSelect` component **does support** the v-model directive and will return either a `string` for **Single-Select Dropdowns** or `array` for **Multi-Select Dropdowns**.

#### `BrightDropdownSelect` Single-Select v-model Behavior
For **Single-Select Dropdowns**, your data binding should be a `string`. The `string` emitted from the `input` event will be the currently selected **Option's** value. If no **Option** selected, then the emitted `string` will be empty (i.e. ''). See below for an example.

<VuePressVModelSingleSelectDropdownDemo/>

<<< @/docs/bright-design-system/input-library/select-dropdown/demos/VuePressVModelSingleSelectDropdownDemo.vue


#### `BrightDropdownSelect` Multi-Select v-model Behavior
For **Multi-Select Dropdowns**, your data binding should be an `array`. The `array` emitted from the `input` event will be the currently selected **Options'** values in `string` format. If no **Option** selected, then the emitted `array` will be empty(i.e. []). See below for an example.

<VuePressVModelMultipleSelectDropdownDemo/>

<<< @/docs/bright-design-system/input-library/select-dropdown/demos/VuePressVModelMultipleSelectDropdownDemo.vue


### `BrightDropdownSelect` Events
The `BrightDropdownSelect` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| <div style="width: 140px">`input` [(v-model)](#brightdropdownselect-v-model-behavior)</div> | When an **Option** is either selected or unselected. | <p>If this is a <strong>Single-Select Dropdown</strong>, then it will return a <code>string</code> containing the value of the currently selected <strong>Option</strong> (if one is selected). If an <strong>option</strong> is NOT selected, then it will return an empty <code>string</code>.</p><p>If this is a <strong>Multi-Select Dropdown</strong>, then it will return an <code>array</code> containing the <code>string</code> values of the currently selected <strong>Options</strong> (if any are selected). If an <strong>option</strong> is NOT selected, then it will return an empty <code>array</code>.</p> |
| `option:selected` | When an **Option** is selected. | The `string` value of the selected **Option**.|
| `option:unselected` | When an **Option** is unselected. | The `string` value of the unselected **Option**.|
| `menu:opened` | When the **Dropdown Menu** is opened. | Nothing.|
| `menu:closed` | When the **Dropdown Menu** is closed. | Nothing.|

### `BrightDropdownSelect` Methods
The `BrightDropdownSelect` component provides the following public-facing methods intended for use by developers. They can be accessed by assigning a [`ref`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements) to the component.

| Method Signature | Description | Returns | 
| :- | :- | :- |
| `$_getCurrentlySelectedOptions()` | Gets the currently selected option(s). | <p>If this is a <strong>Single-Select Dropdown</strong>, then it will return a <code>string</code> containing the value of the currently selected <strong>Option</strong> (if one is selected). If an <strong>option</strong> is NOT selected, then it will return an empty <code>string</code>.</p><p>If this is a <strong>Multi-Select Dropdown</strong>, then it will return an <code>array</code> containing the <code>string</code> values of the currently selected <strong>Options</strong> (if any are selected). If an <strong>option</strong> is NOT selected, then it will return an empty <code>array</code>.</p> |
| `$_selectAllPossibleOptions()` | Selects all **Options** that are **not** disabled and **not** already selected. Will only work for **Multi-Select Dropdowns**. | `boolean` `true` if this is a **Multi-Select Dropdown**. `false` if this is a **Single-Select Dropdown**. Yes, you read that right. |
| `$_unselectAllOptions()` | Unselects all currently selected **Options**. If this is used in a **Single-Select Dropdown**, it will unselect the currently selected **Option** (if one is currently selected). | `boolean` `true` if at least one **Option** was unselected. `false` if no **Option** was unselected. |
| `$_selectOptionByValue(string:value)` | Selects an **Option** by value. | `boolean` `true` if the **Option** was selected. `false` if the **Option** was already selected or it doesn't exist. |
| `$_unselectOptionByValue(string:value)` | Unselects an **Option** by value. | `boolean` `true` if the **Option** was unselected. `false` if the **Option** was already unselected or it doesn't exist. |
| `$_toggleOptionByValue(string:value)` | Toggles the selected status of an **Option** by its value (e.g. if it's selected, then it will be unselected). | `boolean` `true` if the **Option** exists and was toggled. `false` otherwise. |
| `$_openDropdownMenu()` | Opens the **Dropdown Menu**. | `void` |
| `$_closeDropdownMenu()` | Closes the **Dropdown Menu**. | `void` |
| `$_toggleDropdownMenu()` | Toggles the **Dropdown Menu** (e.g. if it's closed, then it will open). | `void` |

#### Method Playground
Here is a playground that demonstrates the usage of the `BrightDropdownSelect` Methods.

<VuePressDropdownMethodDemo/>

 <<< @/docs/bright-design-system/input-library/select-dropdown/demos/VuePressDropdownMethodDemo.vue
 
 
### `BrightDropdownSelect` Refs
The `BrightDropdownSelect` component has the following refs.

| Ref | Element Type | Notes | 
| :- | :- | :- |
| <div class="inline-block" style="width: 128px">**selectButton**</div> | `<button>` | The main Select Button that contains the currently selected option(s). |
| **dropdownMenu** | `<div>` | The dropdown menu itself. |
| **searchbox** | `<input>` | The search input. |