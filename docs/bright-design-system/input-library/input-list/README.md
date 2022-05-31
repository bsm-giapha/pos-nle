# Input List

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundInputList from './components/VuePressUIPlaygroundInputList.vue';
import VuePressExampleInputListSorting from './components/VuePressExampleInputListSorting.vue';
import VuePressExampleAddingItems from './components/VuePressExampleAddingItems.vue';
import VuePressExampleAddingItemsWithAPopover from './components/VuePressExampleAddingItemsWithAPopover.vue';
import VuePressExampleRemovingItems from './components/VuePressExampleRemovingItems.vue';
export default {
    components: {
        VuePressUIPlaygroundInputList,
        VuePressExampleInputListSorting,
        VuePressExampleAddingItems,
        VuePressExampleAddingItemsWithAPopover,
        VuePressExampleRemovingItems,
    },
}
</script>

Use **Input Lists** to display and easily edit collections of simple objects.

<VuePressUIPlaygroundInputList/>

## Items
An **Input List** contains **Items** and aids in the displaying and editing of its **Items**.

### Item Object
Use the `items` property to pass items to an **Input List**. The `items` property expects an array of **Item** objects that each have a unique `id` key like so:

```javascript
let item = {
    id: 'ABCD1234', // REQUIRED {String|Number}. This must be a unique identifier for the item/object. Replace 'ABCD1234' with your own unique identifier.
    // Any data can be placed here that pertains to your data object.
};
```

Thus, an **Input List** can be populated with **Items** as:

<div class="code-example-box">
    <BrightInputList
        id="inputListItemObjectExample"
        label="Fruits"
        :items="[
            {
                id: 'apple',
                label: 'Apple',
                color: 'Red',
            },
            {
                id: 'banana',
                label: 'Banana',
                color: 'Yellow',
            },
            {
                id: 'tomato',
                label: 'Tomato',
                color: 'Red',
            },
        ]"
    >
        <template v-slot:primary-label="item">
            {{ item.label }}
        </template>
        <template v-slot:secondary-label="item">
            {{ item.color }}
        </template>
    </BrightInputList>
</div>

```vue{4-20}
<BrightInputList
    id="inputListItemObjectExample"
    label="Fruits"
    :items="[
        {
            id: 'apple',
            label: 'Apple',
            color: 'Red',
        },
        {
            id: 'banana',
            label: 'Banana',
            color: 'Yellow',
        },
        {
            id: 'tomato',
            label: 'Tomato',
            color: 'Red',
        },
    ]"
>
    <template v-slot:primary-label="item">
        {{ item.label }}
    </template>
    <template v-slot:secondary-label="item">
        {{ item.color }}
    </template>
</BrightInputList>
```

### Labeling
Using [Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots), it's easy to add your own labels to **Items**. 

There are three scoped slots that can be used to provide labels for **Items**:
- `label-primary`
- `label-secondary`
- `label-tertiary` (Note: Tertiary Labels are meant to be supplemental and will be hidden on Mobile devices. Don't put anything important in this slot.)

They can be used like so:

<div class="code-example-box">
    <BrightInputList
        id="inputListLabelExample"
        label="Vegetables"
        :items="[
            {
                id: 'carrot',
                label: 'Carrot',
                color: 'Orange',
                eatenInPastTwoWeeks: true,
            },
            {
                id: 'celery',
                label: 'Celery',
                color: 'Green',
                eatenInPastTwoWeeks: false,
            },
            {
                id: 'cauliflower',
                label: 'Cauliflower',
                color: 'White',
                eatenInPastTwoWeeks: false,
            },
            {
                id: 'potato',
                label: 'Potato',
                color: 'Brown',
                eatenInPastTwoWeeks: true,
            },
        ]"
    >
        <template v-slot:primary-label="item">
            {{ item.label }}
        </template>
        <template v-slot:secondary-label="item">
            {{ item.color }}
        </template>
        <template v-slot:tertiary-label="item">
            {{ item.eatenInPastTwoWeeks ? 'Eaten recently' : 'Not eaten recently' }}
        </template>
    </BrightInputList>
</div>

```vue{31-39}
<BrightInputList
    id="inputListLabelExample"
    label="Vegetables"
    :items="[
        {
            id: 'carrot',
            label: 'Carrot',
            color: 'Orange',
            eatenInPastTwoWeeks: true,
        },
        {
            id: 'celery',
            label: 'Celery',
            color: 'Green',
            eatenInPastTwoWeeks: false,
        },
        {
            id: 'cauliflower',
            label: 'Cauliflower',
            color: 'White',
            eatenInPastTwoWeeks: false,
        },
        {
            id: 'potato',
            label: 'Potato',
            color: 'Brown',
            eatenInPastTwoWeeks: true,
        },
    ]"
>
    <template v-slot:primary-label="item">
        {{ item.label }}
    </template>
    <template v-slot:secondary-label="item">
        {{ item.color }}
    </template>
    <template v-slot:tertiary-label="item">
        {{ item.eatenInPastTwoWeeks ? 'Eaten recently' : 'Not eaten recently' }}
    </template>
</BrightInputList>
```


### Left Section (Items)
By default, the `left-section` slot is not available for use. To use the `left-section` slot, pass `true` to the `show-left-section` property and specify a value for the `left-section` slot.

:::tip
For a good UX, it's recommended to include a visual representation of every item/object that you are listing. This helps visually distinguish and separate items from a layout perspective. For example, a list of Users could have a profile picture in an [Avatar](/bright-design-system/core-library/avatar/).
:::

<div class="code-example-box">
    <BrightInputList
        id="inputListLeftSectionExample"
        label="Registered Users"
        show-left-section
        :items="[
            {
                id: 1,
                name: 'Alice Firstimer',
                subscriptions: 42,
            },
            {
                id: 2,
                name: 'John Doe',
                subscriptions: 103,
            },
            {
                id: 3,
                name: 'Jane Doe',
                subscriptions: 29,
            },
            {
                id: 4,
                name: 'Ken Customer',
                subscriptions: 87,
            },
        ]"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" color="yellow" light/>
        </template>
        <template v-slot:primary-label="item">
            {{ item.name }}
        </template>
        <template v-slot:secondary-label="item">
            {{ item.subscriptions }}
        </template>
    </BrightInputList>
</div>

```vue{4,28-30}
<BrightInputList
    id="inputListLeftSectionExample"
    label="Registered Users"
    show-left-section
    :items="[
        {
            id: 1,
            name: 'Alice Firstimer',
            subscriptions: 42,
        },
        {
            id: 2,
            name: 'John Doe',
            subscriptions: 103,
        },
        {
            id: 3,
            name: 'Jane Doe',
            subscriptions: 29,
        },
        {
            id: 4,
            name: 'Ken Customer',
            subscriptions: 87,
        },
    ]"
>
    <template v-slot:left-section="item">
        <BrightAvatar :name="item.name" color="yellow" light/>
    </template>
    <template v-slot:primary-label="item">
        {{ item.name }}
    </template>
    <template v-slot:secondary-label="item">
        {{ item.subscriptions }}
    </template>
</BrightInputList>
```


### Actions (Items)
**Items** in an **Input List** will often have context actions, such as **Edit** or **Delete**, that allow a User to individually view or change an **Item**.

Use the `item-actions` property to specify the actions that will be available on all **Items**. The `item-actions` property expects an array of [Select Dropdown options](/bright-design-system/input-library/select-dropdown/#options).

:::tip Reacting to an Action
When an action is clicked, the **Input List** will emit an event `event` with a string payload `itemID`, where `action` is the value of the selected item action and `itemID` is the ID of the item that the action was requested on. The ID is obtained from `item.id`. See [Item Object](#item-object) for more information on the structure of an **Item Object**.

Use the Vue Dev Tool inspector to see the emitted events in the example below for a clear representation of how this works.
:::

<div class="code-example-box">
    <BrightInputList
        id="inputListActionsItemExample"
        label="Registered Users"
        :item-actions="[
            { value: 'edit', icon: 'edit', label: 'Edit' },
            { value: 'delete', icon: 'close', label: 'Remove' },
        ]"
        show-left-section
        :items="[
            {
                id: 1,
                name: 'Alice Firstimer',
                subscriptions: 42,
            },
            {
                id: 2,
                name: 'John Doe',
                subscriptions: 103,
            },
            {
                id: 3,
                name: 'Jane Doe',
                subscriptions: 29,
            },
            {
                id: 4,
                name: 'Ken Customer',
                subscriptions: 87,
            },
        ]"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" color="yellow" light/>
        </template>
        <template v-slot:primary-label="item">
            {{ item.name }}
        </template>
        <template v-slot:secondary-label="item">
            {{ item.subscriptions }}
        </template>
    </BrightInputList>
</div>

```vue{4-7}
<BrightInputList
    id="inputListActionsItemExample"
    label="Registered Users"
    :item-actions="[
        { value: 'edit', icon: 'edit', label: 'Edit' },
        { value: 'delete', icon: 'close', label: 'Remove' },
    ]"
    show-left-section
    :items="[
        {
            id: 1,
            name: 'Alice Firstimer',
            subscriptions: 42,
        },
        {
            id: 2,
            name: 'John Doe',
            subscriptions: 103,
        },
        {
            id: 3,
            name: 'Jane Doe',
            subscriptions: 29,
        },
        {
            id: 4,
            name: 'Ken Customer',
            subscriptions: 87,
        },
    ]"
>
    <template v-slot:left-section="item">
        <BrightAvatar :name="item.name" color="yellow" light/>
    </template>
    <template v-slot:primary-label="item">
        {{ item.name }}
    </template>
    <template v-slot:secondary-label="item">
        {{ item.subscriptions }}
    </template>
</BrightInputList>
```

#### Adding Custom Item Actions
Although the `item-actions` property may suffice in most cases for adding actions to an **Item**, there are cases where you may want to add conditional or unique **Actions**. To facilitate this, the **Input List** component has a `show-right-section` property and a `right-section` scoped slot.

By passing `true` to the `show-right-section` property, you can use the `right-section` scoped slot to put anything to the right of an **Item** (or all **Items**). Because it is a scoped slot, you have access to the **Item object**. Most notably, this is the only way to do conditional actions for certain **Items**.


### Clickable Items
By default, **Items** are not clickable or interactive. Use the `items-are-clickable` property to make **Items** clickable.

When this property is in use, the **Input List** will emit an `item-click` event that will contain the ID of the clicked **Item**. The ID is obtained from `item.id`. See [Item Object](#item-object) for more information on the structure of an **Item Object**.

:::tip
It's fairly common to use the `items-are-clickable` property to listen for the `item-click` event and trigger an Edit/View screen for the clicked **Item**.
:::

<div class="code-example-box">
    <BrightInputList
        id="inputListClickableItemsExample"
        label="Registered Users"
        items-are-clickable
        show-left-section
        :items="[
            {
                id: 1,
                name: 'Alice Firstimer',
                subscriptions: 42,
            },
            {
                id: 2,
                name: 'John Doe',
                subscriptions: 103,
            },
            {
                id: 3,
                name: 'Jane Doe',
                subscriptions: 29,
            },
            {
                id: 4,
                name: 'Ken Customer',
                subscriptions: 87,
            },
        ]"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.name" color="yellow" light/>
        </template>
        <template v-slot:primary-label="item">
            {{ item.name }}
        </template>
        <template v-slot:secondary-label="item">
            {{ item.subscriptions }}
        </template>
    </BrightInputList>
</div>

```vue{4}
<BrightInputList
    id="inputListClickableItemsExample"
    label="Registered Users"
    items-are-clickable
    show-left-section
    :items="[
        {
            id: 1,
            name: 'Alice Firstimer',
            subscriptions: 42,
        },
        {
            id: 2,
            name: 'John Doe',
            subscriptions: 103,
        },
        {
            id: 3,
            name: 'Jane Doe',
            subscriptions: 29,
        },
        {
            id: 4,
            name: 'Ken Customer',
            subscriptions: 87,
        },
    ]"
>
    <template v-slot:left-section="item">
        <BrightAvatar :name="item.name" color="yellow" light/>
    </template>
    <template v-slot:primary-label="item">
        {{ item.name }}
    </template>
    <template v-slot:secondary-label="item">
        {{ item.subscriptions }}
    </template>
</BrightInputList>
```

## Functionality
### Adding New Items
Most of the time, an **Input List** will allow a User to add a new **Item**. To easily facilitate this, the **Input List** component has a built-in Add Button.

By default, the Add Button is not shown. This is because developers must implement their own workflow and logic for add operations. Use the `show-add-button` property to show the Add Button, which will allow your Users to add **Items** to an **Input List**.

For a full-blown example of adding and editing **Items**, see the example below.

:::tip
Because adding and editing an **Item** often involve using the same **Inputs** to capture form data, it's recommended to re-use the same interface for adding and editing when possible to keep your code clean.

To demonstrate this best practice, see the example below: A [Popout](/bright-design-system/overlay-library/modal/#popouts) is being used to present the form data for the adding and editing of State Licenses. 
:::

<VuePressExampleAddingItems/>

<<< @/docs/bright-design-system/input-library/input-list/components/VuePressExampleAddingItems.vue

### Adding New Items with a Popover
As demonstrated in [Adding New Items](#adding-new-items), the developer is responsible for implementing an interface for adding items.

To assist developers, the **Input List** component exposes a built-in [Popover](/bright-design-system/overlay-library/popover/) that can be used to provide a short form for adding simple items (i.e. items with 1-2 fields). This is often preferred over a full-blown [Popout](/bright-design-system/overlay-library/modal/#popouts) solution from a UX perspective.

To use the **Add Popover**, you will need to enable the following:
- Pass `true` to the `use-add-popover-slot` property.
- Bind `show-add-popover` to the Input List and react to the `add-popover-close` event (which will fire when the **Add Popover** is closed).
- Use the `add-popover-form` slot to provide a form.

This is quite a lot to understand just by reading it, so see the example below for an illustration of how it all works.

:::warning Known Restrictions
As you'll see in the example, there is no way to edit an item once it has been added. This is a known restriction and a sign that you may need a more robust form (as shown in [Adding New Items](#adding-new-items)). 

One workaround for this "no edit" restriction is to use [Item Actions](#actions-items) (i.e. the 3-dot menu) and/or [Bulk Edit Actions](#bulk-editing) for simple operations on an item.
:::

<VuePressExampleAddingItemsWithAPopover/>

<<< @/docs/bright-design-system/input-library/input-list/components/VuePressExampleAddingItemsWithAPopover.vue


### Using $_getUniqueIDForNewItem
It's very important to emphasize that **every** **Item** must have a unique value for its key in the `items` property (See [Item Object](#item-object) for more information on the structure of an **Item Object**). If this is not followed, then you will experience state and visual bugs. This is rooted in [Vue's `v-for` and `:key` requirements](https://vuejs.org/v2/guide/list.html#Maintaining-State).

Thus, this is called the **Unique Item ID Requirement**. Remember it well and never forget it.

When editing existing **Items**, every **Item** will already have a unique ID/key combination from the back-end or database (if not, then you probably have a bigger problem on your hands). Thus, it's easy to meet the **Unique Item ID Requirement** for existing **Items**.

It gets a little trickier when adding new **Items**. New **Items** on the front-end often don't have the luxury of making a full pass to the back-end to obtain a unique ID. 

Thankfully, there is an easy way to obtain unique IDs for newly created **Items**. **Input Lists** will individually track and increment their own unique IDs for new **Items** in the format of `${this.id}-NewItem-${this.currentUniqueIDForNewItems}`.

Thus, you can obtain a unique ID for a newly added **Item** by using the `$_getUniqueIDForNewItem()` function (via a `ref` to the **Input List**). It's worth noting that each **Input List** will individually increment their own ID values when this method is called.

For a practical demonstration of the intended usage of the function, see the example in [Adding New Items](#adding-new-items).


### Sorting
It's a common request/good practice to allow some type of sorting for an **Input List**. To easily facilitate this, the **Input List** component has a built-in Sort Button.

By default, the Sort Button is not shown. This is because developers must implement their own sorting algorithms and opt into sorting an **Input List**.

Use the `show-sort-button` property to show the Sort Button, which will allow you to use the `sort-actions` property to specify the available sorts to the User.

The `sort-actions` property expects an array of [Select Dropdown options](/bright-design-system/input-library/select-dropdown/#options). Option objects are expected to have a `sort` property that has a `function` that implements their respective sorting algorithm (see the [MDN Documention on Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters) for more information).

<div class="code-example-box">
    <VuePressExampleInputListSorting/>
</div>

<<< @/docs/bright-design-system/input-library/input-list/components/VuePressExampleInputListSorting.vue

#### Specifying a default sort
It's possible specify a default sort for an **Input List** by using the `current-sort` property, which should be equal to value of the desired default **Sort**. This property is reactive and can be programmatically changed if desired.

#### Reacting to a sort change
An **Input List** will emit a `sort` event that contains the value of a newly selected Sort. It will trigger whenever the User (or developer) changes the Current Sort. Although you probably won't have to, it's possible to listen for this event and react to changes. For an example of this two-way binding, see the code example in [Sorting](#sorting).

### Searching
By default, all **Input Lists** are searchable. To disable the search functionality, use the `hide-search` property.

### Bulk Editing
Use the `bulk-edtion-actions` property to enable **Bulk Editing** in an **Input List**.

This property accepts an array of **Bulk Edit Action** objects. The schema for a **Bulk Edit Action** is as follows:

```javascript
let bulkEditAction = {
    eventName: 'edit', // REQUIRED {String}. The value provided here will be emitted whenever the Bulk Edit Action is clicked. You can listen for this event using `@edit` (where "edit" is the eventName). This will be converted to lowercase when emitted (see the warning below for details)
    action: 'Edit Item', // REQUIRED {String}. This is the label of the Action and will be shown to the User.
    icon: 'edit', // Optional {String}. You can provide a helpful icon here for Users to easily identify their intended Action.
};
```

:::warning eventName will be emitted in lowercase
It's important to know that the value provided to `eventName` for a **Bulk Edit Action** will be emitted in lowercase. This means that if you provide an `eventName` of `"editThis"`, then it will be emitted as `"editthis"`. To avoid complications and misunderstandings, prefer writing your eventNames in lowercase.
:::

For a demonstration of **Bulk Editing**, see the example below.

<VuePressExampleRemovingItems/>

<<< @/docs/bright-design-system/input-library/input-list/components/VuePressExampleRemovingItems.vue


#### Adding Custom Bulk Edit Actions
There is a `bulk-edit-actions` slot available as well. This slot can be used with the `bulk-edit-actions` property. Any content in the slot will be placed **after** the actions specified in the `bulk-edit-actions` property. 

With this slot, you can add special buttons and interactions that would otherwise not be possible using only the `bulk-edit-actions` property.

#### Listening for Selected Items
Whenever an **Item** is selected or unselected, an **Input List** will emit a `selected-items-change` event that contains an array of all the currently selected **Items'** IDs (which is obtained from `item.id`). You can listen for this event and keep track of the currently selected **Items** in an **Input List**.


## Empty State
### No Items
Use the `no-items-message` to specify the displayed message when there are no **Items** in the **Input List**.

### No Search Results
Use the `no-search-results-message` to specify the displayed message when there are no search results in an **Input List**. Note that this requires the **Input List** to be [searchable](#searching).

## Styling
### Number of Items Shown Initially
Use the `number-of-items-shown-initially` property to specify how many **Items** are shown initially on page load.

:::tip
Pass `-1` to this property to show all items.
:::

### Item Height
If you are providing content for **Items** that is shorter or taller than the average **Item**, then you must specify an appropriate height for the **Item** using the `item-height` property. By default, the average **Item** is `2.1em`.

## Related Reading
- [Table](/bright-design-system/layout-library/table/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)

## API

### `BrightInputList` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputList
        id="inputList"
        label="Input List"
        :items="[
            {
                id: 1,
                name: 'Item 1',
            },
            {
                id: 2,
                name: 'Item 2',
            }
        ]"
    >
        <template v-slot:primary-label="item">
            {{ item.name }}
        </template>
    </BrightInputList>
</div>

```vue
<BrightInputList
    id="inputList"
    label="Input List"
    :items="[
        {
            id: 1,
            name: 'Item 1',
        },
        {
            id: 2,
            name: 'Item 2',
        }
    ]"
>
    <template v-slot:primary-label="item">
        {{ item.name }}
    </template>
</BrightInputList>
```

### `BrightInputList` Slots
The `BrightInputList` component has the following slots:
- A `left-section` scoped slot. See [Left Section (Items)](#left-section-items) for more information.
- A `primary-label` scoped slot. See [Labeling](#labeling) for more information.
- A `secondary-label` scoped slot. See [Labeling](#labeling) for more information.
- A `tertiary-label` scoped slot. See [Labeling](#labeling) for more information.
- A `right-section` scoped slot. See [Adding Custom Item Actions](#adding-custom-item-actions) for more information.
- A `add-popover-form` slot. See [Adding New Items with a Popover](#adding-new-items-with-a-popover) for more information.
- A `bulk-edit-actions` slot. See [Bulk Edit (Slot)](#bulk-editing) for more information.

### `BrightInputList` Properties
In addition to most of the [Common Properties shared between all Inputs](/bright-design-system/input-library/overview/#common-input-properties), the `BrightInputList` component can receive the following **properties**.

| <div style="width: 160px">Property</div>  | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| **id** | string | | | ✅ |
| **label** | string | | | ✅ |
| [items](#items) | array of [Item Objects](#item-object) | See [Items](#items) for more information | `[]` | ✅ |
| [bulk-edit-actions](#bulk-editing) | array of [Bulk Edit Action Objects](#bulk-editing) | See [Bulk Editing](#bulk-editing) for more information | `[]` | |
| [current-sort](#sorting) | string | A value of a [Sort object](#sorting) | `""` | |
| [hide-search](#searching) | boolean | | `false` | |
| [item-actions](#actions-items) | array of [Select Dropdown Options](/bright-design-system/input-library/select-dropdown/#options) and/or [Select Dropdown Option Groups](/bright-design-system/input-library/select-dropdown/#option-groups) | See [Item Actions](#actions-items) for more information | `[]` | |
| [item-height](#item-height) | string representation of a [valid CSS height property value](https://developer.mozilla.org/en-US/docs/Web/CSS/height) | | `2.1em` | |
| [items-are-clickable](#clickable-items) | boolean | | `false` | |
| [no-items-message](#no-items) | string | | `No entries were found.` | |
| [no-search-results-message](#no-search-results) | string | | `Unfortunately, no search results were found.` | |
| [number-of-items-shown-initially](#number-of-items-shown-initially) | number | | `10` | |
| [show-add-button](#adding-new-items) | boolean | | `false` | |
| [show-add-popover](#adding-new-items-with-a-popover) | boolean | | `false` | |
| [show-left-section](#left-section-items) | boolean | | `false` | |
| [show-right-section](#adding-custom-item-actions) | boolean | | `false` | |
| [show-sort-button](#sorting) | boolean | | `false` | |
| [sort-options](#sorting) | Array of **modified** [Select Dropdown Options](/bright-design-system/input-library/select-dropdown/#options) and/or [Select Dropdown Option Groups](/bright-design-system/input-library/select-dropdown/#option-groups)  | See [Sorting](#sorting) for more information | `[]` | |
| [use-add-popover-slot](#adding-new-items-with-a-popover) | boolean | | `false` | |

### `BrightInputList` v-model behavior
The `BrightInputList` component **does support** the `v-model` directive, and will emit the current value of the [`items`](#items) prop (which will be an array of [Item Objects](#item-object)).

### `BrightInputList` Events
The `BrightInputList` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| <span style="display: inline-block; min-width: 120px">Event Name</span> | Trigger | Returns | 
| :- | :- | :- |
| `input` | When the [items](#items) prop is changed | The value of the [items](#items) prop (which will be an array of **Item** objects). |
| `sort` | When a [Sort](#sorting) is clicked. | The value of the Sort option. |
| `add` | When the [Add Button](#adding-new-items) is clicked. | Nothing |
| `add-popover-close` | When the [Add Popover](#adding-new-items) is closed. | Nothing |
| `item-click` | When an **Item** [is clicked](#clickable-items) | The ID of the clicked item. The ID is obtained from `item.id`. See [Item Object](#item-object) for more information on the structure of an **Item Object**. |
| `item-action` | When an [Action](#actions-items) is clicked on an **Item**. | An `object` in the format of `{ action: action, itemID: [itemID] }` where `action` is the value of the selected item action and `itemID` is the ID of the item that the action was requested on. The ID is obtained from `item.id`, See [Item Object](#item-object) for more information on the structure of an **Item Object**. |
| `selected-items-change` | When an **Item** is selected (only available for [Bulk Editing](#bulk-editing)) | An array containing the IDs of the currently selected **Items**. The ID is obtained from `item.id`. See [Item Object](#item-object) for more information on the structure of an **Item Object**. |
| [*`bulkEditAction.eventName`*](#bulk-editing) | When a [Bulk Edit Action](#bulk-editing) button is clicked. Note that this is defined by the developer for each **Bulk Edit Action**. Also note that the event name will be emitted in lower-case (e.g. if you had an eventName of 'editThis' it would become 'editthis'). | An array containing the IDs of the currently selected **Items**. The ID is obtained from `item.id`, See [Item Object](#item-object) for more information on the structure of an **Item Object**. |


### `BrightInputList` Methods
The `BrightInputList` component provides the following public-facing methods intended for use by developers. They can be accessed by assigning a [`ref`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements) to the component.

| Method Signature | Description | Returns | 
| :- | :- | :- |
| `$_getUniqueIDForNewItem()` | Use this to generate a unique identifier for a new **Item** in an **Input List**. | <p>Returns a `string` in the format of: `${this.id}-NewItem-${this.currentUniqueIDForNewItems}`. This ID can be used to uniquely identify newly added **Items**.</p><p>It's worth noting that each **Input List** will individually increment their own ID values when their method is called. See [Adding New Items](#using-getuniqueidfornewitem) for more information.</p> |