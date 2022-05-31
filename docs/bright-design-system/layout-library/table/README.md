# Tables

<div class="mb-16">
    <BrightTag color="purple" label="Layout Library" href="/layout-library/"/>
    <BrightTag color="purple" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundTable from './components/VuePressUIPlaygroundTable.vue';
import VuePressTableBulkEditingDemo from './demos/VuePressTableBulkEditingDemo.vue';
export default {
    components: {
        VuePressUIPlaygroundTable,
        VuePressTableBulkEditingDemo,
    },
}
</script>

Use **Tables** to display, search, filter, and manipulate data in a tabular form.

<VuePressUIPlaygroundTable/>

## Best Practices
Use **Tables** when it makes sense to present two-dimensional data in a simple table format.

To offer a range of options, there are two types of tables: [Data Tables](#data-tables) and [Simple Tables](#simple-tables).

- Use [Data Tables](#data-tables) when transformative features (such as searching, sorting, filtering, and bulk editing) are desired and/or you want to use JavaScript / JSON to build a table.
- Use [Simple Tables](#simple-tables) when transformative features are not desired and/or you want to use native HTML table elements (`<thead>`, `<tr>`, `<th>`, `<td>`, `<tfoot>`, etc.)


## Structure

### Basics & Terminology

The following defines the standard terminology and structural blueprint for **Tables**.

#### Columns (term)
**Columns** are defined in the Table Header and determine the X-axis of a **Table**. A **Table** can have many **Columns**.

#### Rows (term)
**Rows** are defined in the Table Body and determine the Y-axis of a **Table**. A **Table** can have many **Rows**. A **Row** has a number of **Cells** equal to the number of **Columns** in a **Table**.

#### Cells (term)
**Cells** are defined in a **Row**. A **Cell** belongs to one **Row** and intersects with a **Column**.

### Structural differences between Data Tables and Simple Tables
Although [Data Tables](#data-tables) and [Simple Tables](#simple-tables) have the same basic structure (Columns, Rows, Cells), there are some differences between them in how they're rendered and built.

[Data Tables](#data-tables) are built using JavaScript. Additional functionality/structure that is not defined in the HTML table standard is possible as well, such as:
- [Searching](#searching)
- [Filtering](#filtering)
- [Sorting](#sorting)
- [Pagination](#pagination)

[Simple Tables](#simple-tables) are built using native HTML table elements.


## Data Tables
**Data Tables** require [Columns](#columns) and [Rows](#rows) to render correctly and have numerous features available, such as [searching](#searching), [filtering](#filtering), [pagination](#pagination), and [column sorting](#sorting).

### Columns
**Data Tables** require the use of the `columns` property, which accepts an array of **Column** objects.

#### Column Minimum Required Template (MRT)
The following code snippet is the minimum required template to build a **Column** object:

```javascript
let column = {
    name: 'Column One',
    key: 'columnOne',  
};
```

Accordingly, a `columns` property for a **Table** can be constructed out of similarly structured **Column** objects:
```vue
<BrightTable
    :columns="[
        { name: 'Column One', key: 'columnOne' },
        { name: 'Column Two', key: 'columnTwo' },
        { name: 'Column Three', key: 'columnThree' },
    ]"
/>
```

#### Column Object Properties

The available properties for a **Column** object are the following:

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: | :-: |
| [name](#name-columns) | string | | | ✅ |
| [key](#key-columns) | string | | | ✅ |
| [align](#align-columns) | string | `left` `right` `center` | `left` | |
| [type](#type-columns) | string | `string` `number` `money` `date` `array` | `string` | |
| [sort](#sort-columns) | string | `asc` `desc` `none` | `asc` on the 1st sortable column if an initial sort is never specified | |
| [filterable](#filterable-columns) | boolean | | `false` | |
| [hidden](#hidden-columns) | boolean | | `false` | |
| [excludeFromSearch](#exclude-from-search-columns) | boolean | | `false` | |
| [headerClass](#header-class-columns) | string, object, array | See [Class Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-HTML-Classes) in Vue docs. | `""` | |
| [headerStyle](#header-style-columns) | string, object, array | See [Style Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) in Vue docs. | `""` | |
| [cellClass](#cell-class-columns) | string, object, array | See [Class Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-HTML-Classes) in Vue docs. | `""` | |
| [cellStyle](#cell-style-columns) | string, object, array | See [Style Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) in Vue docs. | `""` | |

##### Name (columns)
Use the `name` column property to provide a user-friendly name/label.

This property is **required**.

##### Key (columns)
Use the `key` column property to provide a unique key/identifier for a **Column**. Prefer using camelCasing over other naming conventions (e.g. "firstName" over "first-name") for this property.

This property is **required**.

##### Align (columns)
Use the `align` column property to change the text-alignment of a **Column**.

By default, all **Columns** are **left-aligned**.

- `left` will align a column to the left (default).
- `center` will align a column to the center.
- `right` will align a column to the right.

##### Type (columns)
Use the `type` column property to define a **Column's** data type.

By default, all **Columns** are defined as **string** data types.

Other possible data type values:
- `number`
- `money`
- `date`
- `array`

##### Sort (columns)
Use the `sort` column property to determine the sort behavior of a column.

- `asc` will sort a column in **ascending** order.
- `desc` will sort a column in **descending** order.
- `none` will **remove the ability to sort** a column entirely.

##### Filterable (columns)
Use the `filterable` column property to determine whether or not a **Column** will be an available filter on the UI.

By default, all **Columns** are not filterable.

##### Hidden (columns)
Use the `hidden` column property to hide a column from view. Note that hidden columns can still be searched for.

By default, all **Columns** are visible.

##### Exclude From Search (columns)
Use the `excludeFromSearch` column property to exclude a column from being searched on.

By default, a column will be included in a table's search results.

##### Header Class (columns)
Use the `headerClass` column property to add classes to a column header.

##### Header Style (columns)
Use the `headerStyle` column property to add styles to a column header.

##### Cell Class (columns)
Use the `cellClass` column property to add classes to a column's cells in the table body.

##### Cell Style (columns)
Use the `cellStyle` column property to add styles to a column's cells in the table body.


### Rows
**Data Tables** require the use of the `rows` property, which accepts an array of **Row** objects.

It's important to note that **Rows** depend on [Columns](#columns) for their structure. Specifically, **Rows** must have the same [keys](#key-columns) as [Columns](#columns).

To illustrate this dependency, consider the following code for a **Table**:

```vue
<BrightTable
    :columns="[
        { 
            name: 'ID',
            key: 'id', 
        },
        { 
            name: 'First Name',
            key: 'firstName',
        },
        { 
            name: 'Last Name',
            key: 'lastName',
        },
    ]"
/>
```

Given that there are three [Columns](#columns) with the keys "id", "firstName", and "lastName" in a **Table**, a **Row** object can be constructed like so:

```javascript
let row = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
}
```

And the `rows` property can be constructed out of similarly structured **Row** objects:

```vue
<BrightTable
    :columns="..."
    :rows="[
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
        },
        {
            id: 3,
            firstName: 'First',
            lastName: 'Last',
        },
        /* etc. */
    ]"
/>
```

#### Row Data Types
Strings and Numbers can be safely passed to column-keyed properties in a **Row** object.

```javascript
let columns = [
    { name: 'ID', key: 'id' },
    { name: 'First Name', key: 'firstName' },
    { name: 'Products Bought', key: 'productsBought' },
];

let row = {
    id: 1, // Good: Numbers are supported.
    firstName: 'John', // Good: Strings are supported.
    productsBought: [ // Bad: Arrays and complicated structures aren't supported; consider making a formatted string.
        'Shirt',
        'Pants',
        'Shoes',
    ],
}
```

#### Adding Classes and Styles to All Rows
Use the `row-class` and `row-style` properties to add classes and styles to **all Rows** using Vue's [Class and Style Binding syntax](https://vuejs.org/v2/guide/class-and-style.html).

#### Extra Properties in Rows
It's worth noting that it's possible to include extra properties on **Row** objects. These extra properties won't be shown anywhere, won't be included in search results, and can be of any data type (including Objects and Functions) if the property name is not a [column key](#key-columns). These extra properties can be used for adding [Advanced Functionality and Alternative Layouts for Cells](#advanced-adding-functionality-and-alternative-layouts-for-cells) using [Hybrid Slots](#hybrid-slot).

### Pagination
[Data Tables](#data-tables) will automatically show **Pagination** controls at the bottom of the table if there are more **Rows** being shown than the [Rows Per Page](#rows-per-page-pagination) setting.

If **Pagination** is not desired, then it's possible to hide the **Pagination** controls using the [`hide-footer`](#hide-footer) property.

#### Rows Per Page (pagination)
Use the `rows-per-page-options` property to set the number of [Rows](#rows) per page. It's possible to provide different values in a numeric array format (e.g. `[10, 20, 30, 40, 50]`). If there is more than one option, then the **first** number will be used.

By default, **tables** will allow the options of showing 25, 50, or 100 rows per page, with 25 being the default.


### Sorting
By default, all [Columns](#columns) in a [Data Table](#data-tables) are sortable.

To disable sorting on a column, use the [`sort`](#sort-columns) column property and set it to `none`.

### Searching
Use the `searchable` property to enable searching in a table.

If you'd like to exclude a column from searching, use the [`excludeFromSearch`](#exclude-from-search-columns) column property.

### Filtering
Use the `filters` property to enable filtering for a **Table**.

To provide Initial Filters to a **Table**, all properties in the **Filter** object are required.

#### Filter Minimum Required Template (MRT)
The following code snippet is the minimum required template to build a **Filter** object:

```javascript
let filter = {
    columnKey: 'loanAmount',  
    name: 'Loan Amount',
};
```

Accordingly, a `filters` property for a **Table** can be constructed out of similarly structured **Filter** objects. The following example demonstrates a **Filter** object both enabling filters on a string column and setting initial filters on a table.
```vue
<BrightTable
    :filters="[
        { columnKey: 'loanOfficer', name: 'Loan Officer', pluralName: 'Loan Officers' },
        { columnKey: 'lastName', name: 'Last Name', pluralName: 'Last Names', operator: 'equalTo', value: ['Firstimer', 'Homeowner'] },
        { columnKey: 'loanAmount', name: 'Loan Amount', operator: 'greaterThan', value: '$200,000' },
        { columnKey: 'dateCreated', name: 'Date Created', value: ['01/01/2017', '12/31/2019'] },
        { columnKey: 'statesLivedIn', name: 'States Lived In', operator: 'doesntContain', value: ['TX'] },
    ]"
/>
```

:::tip
**Columns** are not filterable by default. Therefore, remember to add a [`filterable`](#filterable-columns) property inside a **Column** object to enable filtering on that particular **Column**.
:::

#### Filter Object Properties

The available properties for a **Filter** object are the following:

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: | :-: |
| [name](#name-filtering) | string | | | ✅ |
| [columnKey](#column-key-filtering) | string | | | ✅ |
| [pluralName](#plural-name-filtering) | string | | | ✅ (for **string** type columns only) |
| [operator](#operator-filtering) | string | `equalTo` `notEqualTo` `greaterThan` `lessThan` | | |
| [value](#value-filtering) | array, string | | | |

##### Name (filtering)
Use the `name` filter property to refer to a **Column's** user-friendly name/label.

::: tip Note
This must match the **Column's** given name.
:::

This property is **required**.

##### Column Key (filtering)
Use the `columnKey` filter property to refer to a **Column's** unique key/identifier.

::: tip Note
This must match the **Column's** given key.
:::

This property is **required**.

##### Plural Name (filtering)
Use the `pluralName` filter property to assign a **Column** name's plural form.

This property is **required** for _string_ type columns only.

##### Operator (filtering)
Use the `operator` filter property to provide an **Initial Filter** to a **Table**.

This is used in conjunction with the `value` filter property, excluding **date** type columns. _**Date** type columns do not accept the `operator` filter property._

The `operator` is determined by its associated Column’s type property. It can be one of many values, depending on the type.

**Available operators:**
| Column Type | Operators |
| :- | :- |
| string | `equalTo` `notEqualTo` |
| number, money | `greaterThan` `lessThan` |
| date | none |
| array | `contains` `doesntContain` |

##### Value (filtering)
Use the `value` filter property to provide an **Initial Filter** to a **Table**.

This is used in conjunction with the `operator` filter property, excluding **date** type columns. _**Date** type columns only require the `value` filter property._

- An array of strings are required for **array**, **string**, and **date** type columns.
- String values are required for **number** and **money** type columns.

#### Example of Filtering

<div class="code-example-box">
    <BrightTable
        id="filteringExample"
        :filters="[
            { name: 'Loan Officer', pluralName: 'Loan Officers', columnKey: 'loanOfficer' },
            { name: 'Last Name', pluralName: 'Last Names', columnKey: 'lastName' },
            { name: 'Loan Amount', columnKey: 'loanAmount', operator: 'greaterThan', value: '$190,000' },
            { name: 'Date Modified', columnKey: 'dateModified', value: ['03/30/2019', '10/01/2019'] },
            { name: 'States Lived In', columnKey: 'statesLivedIn', operator: 'contains', value: ['CA', 'TX', 'WA'] },
        ]"
        :columns="[
            { name: 'ID', key: 'id', type: 'number' },
            { name: 'First Name', key: 'firstName' },
            { name: 'Last Name', key: 'lastName', filterable: true },
            { name: 'Date Modified', key: 'dateModified', type: 'date', filterable: true },
            { name: 'Loan Officer', key: 'loanOfficer', filterable: true },
            { name: 'Loan Amount', key: 'loanAmount', type: 'money', filterable: true },
            { name: 'States Lived In', key: 'statesLivedIn', type: 'array', filterable: true },
        ]"
        :rows="[
            { id: '1', firstName: 'Alice', lastName: 'Firstimer', dateModified: '03/30/2019', loanOfficer: 'Leo Loan', loanAmount: '$190,000', statesLivedIn: ['CA', 'NY', 'TX'] },
            { id: '2', firstName: 'Suzi', lastName: 'Builder', dateModified: '01/01/2020', loanOfficer: 'Olive Officer', loanAmount: '$75,000', statesLivedIn: ['TX'] },
            { id: '3', firstName: 'John', lastName: 'Homeowner', dateModified: '09/17/2017', loanOfficer: 'Leo Loan', loanAmount: '$610,000', statesLivedIn: ['AL', 'CA', 'OR', 'TX', 'WY'] },
            { id: '4', firstName: 'Mary', lastName: 'Homeowner', dateModified: '03/30/2019', loanOfficer: 'Leo Loan', loanAmount: '$1,342,000', statesLivedIn: ['CA'] },
            { id: '5', firstName: 'Amy', lastName: 'America', dateModified: '05/11/2011', loanOfficer: 'Olive Officer', loanAmount: '$263,000', statesLivedIn: ['WA'] },
            { id: '6', firstName: 'Andy', lastName: 'America', dateModified: '10/01/2019', loanOfficer: 'Mort Gage', loanAmount: '$200,000', statesLivedIn: ['TX'] },
        ]"
    />
</div>

```vue {3-9,13-17}
<BrightTable
    id="filteringExample"
    :filters="[
        { name: 'Loan Officer', pluralName: 'Loan Officers', columnKey: 'loanOfficer' },
        { name: 'Last Name', pluralName: 'Last Names', columnKey: 'lastName' },
        { name: 'Loan Amount', columnKey: 'loanAmount', operator: 'greaterThan', value: '$190,000' },
        { name: 'Date Modified', columnKey: 'dateModified', value: ['03/30/2019', '10/01/2019'] },
        { name: 'States Lived In', columnKey: 'statesLivedIn', operator: 'contains', value: ['CA', 'TX', 'WA'] },
    ]"
    :columns="[
        { name: 'ID', key: 'id', type: 'number' },
        { name: 'First Name', key: 'firstName' },
        { name: 'Last Name', key: 'lastName', filterable: true },
        { name: 'Date Modified', key: 'dateModified', type: 'date', filterable: true },
        { name: 'Loan Officer', key: 'loanOfficer', filterable: true },
        { name: 'Loan Amount', key: 'loanAmount', type: 'money', filterable: true },
        { name: 'States Lived In', key: 'statesLivedIn', type: 'array', filterable: true },
    ]"
    :rows="[
        { id: '1', firstName: 'Alice', lastName: 'Firstimer', dateModified: '03/30/2019', loanOfficer: 'Leo Loan', loanAmount: '$190,000', statesLivedIn: ['CA', 'NY', 'TX'] },
        { id: '2', firstName: 'Suzi', lastName: 'Builder', dateModified: '01/01/2020', loanOfficer: 'Olive Officer', loanAmount: '$75,000', statesLivedIn: ['TX'] },
        { id: '3', firstName: 'John', lastName: 'Homeowner', dateModified: '09/17/2017', loanOfficer: 'Leo Loan', loanAmount: '$610,000', statesLivedIn: ['AL', 'CA', 'OR', 'TX', 'WY'] },
        { id: '4', firstName: 'Mary', lastName: 'Homeowner', dateModified: '03/30/2019', loanOfficer: 'Leo Loan', loanAmount: '$1,342,000', statesLivedIn: ['CA'] },
        { id: '5', firstName: 'Amy', lastName: 'America', dateModified: '05/11/2011', loanOfficer: 'Olive Officer', loanAmount: '$263,000', statesLivedIn: ['WA'] },
        { id: '6', firstName: 'Andy', lastName: 'America', dateModified: '10/01/2019', loanOfficer: 'Mort Gage', loanAmount: '$200,000', statesLivedIn: ['TX'] },
    ]"
/>
```

### Bulk Editing
Use the `bulk-edit-actions` property to enable bulk editing in a table.

This property accepts an array of **Action** objects. Each **Action** object requires an `eventName` property. This value is used by the [bulkeditbutton:clicked](#brighttable-events) event when the event is emitted.
Additionally, each **Action** object must contain either an `action` or `icon` property, or both. The `icon` property uses the same **Icon Library** as the <a href="/core-library/icon" target="_blank">**BrightIcon**</a> component.

When **Bulk Editing** is enabled, each **Row** object will require an `id` property. The value must be a unique `id` .

#### Example of Bulk Editing

<VuePressTableBulkEditingDemo/>

<<< @/docs/bright-design-system/layout-library/table/demos/VuePressTableBulkEditingDemo.vue

### Show Refresh Button
Use the `show-refresh-button` property to show a "refresh" button on a table. It will emit a `refresh` event when interacted with by the user.

### Server-Side Data
Use the `server-side-data` property to fetch row data using an API. This is recommended if the table will contain a very large number of records.

#### The Server-Side Data Object
At the very least, the `server-side-data` object requires a key-value pair that refers to the `total` number of resources returned from the server. It's imperative that a `total` property exists, as this is what will drive the pagination of a table.

To enable data table features like bulk editing, filtering, searching, and sorting, other properties are required as well. Your BrightTable will need to listen for various emitted events in order for these features to function correctly. Refer to the [BrightTable Events](#brighttable-events) section for a list of possible events.

##### Filters
In order for Filtering to work properly in a server-side BrightTable, it's important that a filter object is provided in the `server-side-data`. The filter object should consist of keys that map to a table's filterable columns. Their values must list all possible filter values in an array. See an example filter object below.

:::tip
In the Ardent API, values such as a lender's branches or roles are accessible using a Vuex Store. Utilize the Store to obtain data you might need to populate the filter object.
:::

##### Example of a `server-side-data` object
```js
let serverSideData = {
    total: 500,
    filter: {
        accountStatus: ['Active', 'Inactive'],
        branch: this.$store.state.lender.branches.map(branch => branch.information),
        role: this.$store.state.lender.roles,
    },
}
```

### (Advanced) Adding Functionality and Alternative Layouts for Cells
It's a common scenario to add links, different formatting, and other display/structure variations in a **Data Table**. To do so in **Data Tables**, we can use [Hybrid Slots](#hybrid-slot). In **Bright**, a [Hybrid Slot](#hybrid-slot) is a slot that has a [name](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) and [scope](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots).

If you are already familiar with **named slots** and **scoped slots** or just need a refresher on **Hybrid Slots**, feel free to reference the [Hybrid Slot](#hybrid-slot) documentation.

For everyone else, a short tutorial is available below.

#### Example of Using a Hybrid Slot
Suppose that we're building a **Data Table** for users. Let's start with a basic table like this:

<div class="code-example-box">
    <BrightTable
        id="addingLinksExample1"
        :columns="[
            { name: 'ID', key: 'id', type: 'number' },
            { name: 'User', key: 'user' },
        ]"
        :rows="[
            { id: '1', user: 'Alice Firstimer' },
            { id: '2', user: 'Suzi Builder' },
            { id: '3', user: 'John Homeowner' },
            { id: '4', user: 'Mary Homeowner' },
        ]"
    />
</div>

```vue
<BrightTable
    id="addingLinksExample1"
    :columns="[
        { name: 'ID', key: 'id', type: 'number' },
        { name: 'User', key: 'user' },
    ]"
    :rows="[
        { id: '1', user: 'Alice Firstimer' },
        { id: '2', user: 'Suzi Builder' },
        { id: '3', user: 'John Homeowner' },
        { id: '4', user: 'Mary Homeowner' },
    ]"
/>
```

Now that we have the table structure setup, let's add a link to each user's profile. The link will be friendly-looking, so it'll look something like `"/fake-link/users/1/alice-firstimer"`.

This is where [**named slots**](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) and [**scoped slots**](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) come into play. If you haven't used **named slots** or **scoped slots** before in Vue, then pay close attention to the highlighted syntax below in the code example.

<div class="code-example-box">
    <BrightTable
        id="addingLinksExample2"
        :columns="[
            { name: 'ID', key: 'id', type: 'number' },
            { name: 'User', key: 'user' },
        ]"
        :rows="[
            { id: '1', user: 'Alice Firstimer' },
            { id: '2', user: 'Suzi Builder' },
            { id: '3', user: 'John Homeowner' },
            { id: '4', user: 'Mary Homeowner' },
        ]"
    >
        <template v-slot:column:user="row">
            <a :href="'/fake-link/users/' + row.id + '/' + row.user.toLowerCase().replace(' ', '-')">
                {{row.user}} (hover over me and look at the URL)
            </a>
        </template>
    </BrightTable>
</div>

```vue{14-18}
<BrightTable
    id="addingLinksExample2"
    :columns="[
        { name: 'ID', key: 'id', type: 'number' },
        { name: 'User', key: 'user' },
    ]"
    :rows="[
        { id: '1', user: 'Alice Firstimer' },
        { id: '2', user: 'Suzi Builder' },
        { id: '3', user: 'John Homeowner' },
        { id: '4', user: 'Mary Homeowner' },
    ]"
>
    <template v-slot:column:user="row">
        <a :href="'/fake-link/users/' + row.id + '/' + row.user.toLowerCase().replace(' ', '-')">
            {{row.user}} (hover over me and look at the URL)
        </a>
    </template>
</BrightTable>
```

A lot of things are going on in those five lines of code, so let's break it down.

`<template v-slot:column:user="row">` is basically saying: "Apply this template to all cells in the **User column**. Also, make sure the template has access to **all properties in a Row**." This is a rather expressive (and magical) line, so be sure to re-read the last sentence and let it really sink in.

:::tip Dynamically Named Slot
In the example above, the `column:user` part is dynamic and can be expressed as `column:x` where `x` is the [Column Key](#key-columns). This means that you can apply this template to any column. Using the example as a reference, we could have applied this same template to the `id` keyed column by using `column:id` instead of `column:user`.
:::

The template itself consists of a single `<a>` element with dynamic content. Knowing that we have access to **all properties in a Row** in this template, we can build the URL using the format we described earlier `"/fake-link/users/1/alice-firstimer"` using JavaScript. We can then use Vue's string interpolation <code v-pre>{{ }}</code> to output the user's name.

With this knowledge, you can probably imagine the possibilities of the [Hybrid Slot](#hybrid-slot) used in the `BrightTable` component. Because any HTML, JavaScript, and Vue syntax can be used in a **Hybrid Slot**, you can pretty much do anything if you have the right data in a [Row](#rows) object and know the [Column Key](#key-columns) of the cell you'd like to target.

:::tip Using Extra Row Properties
It's possible to include [Extra Properties](#extra-properties-in-rows) in a [Row object](#rows). Because **Hybrid Slots** have access to **all properties in a Row**, it's possible to reference those extra properties in a **Hybrid Slot**. Pretty handy, huh?

For example, we could have included an extra Row property `url` that we could have used (via `row.url`) instead of building the URL in the template. This may simplify the template and make it more readable.
:::

## Simple Tables
**Simple Tables** are simple when compared to [Data Tables](#data-tables) (hence their name). This is because **Simple Tables** can be constructed using plain HTML.

Thus, a **Simple Table** can be made like the following:

<div class="code-example-box">
    <BrightTable
        id="simpleTableExample"
        class="text-left"
        style="width: 512px"
        :hide-footer="true"
    >
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Row 1, Cell 1</td>
                <td>Row 1, Cell 2</td>
                <td>Row 1, Cell 3</td>
            </tr>
            <tr>
                <td>Row 2, Cell 1</td>
                <td>Row 2, Cell 2</td>
                <td>Row 2, Cell 3</td>
            </tr>
            <tr>
                <td>Row 3, Cell 1</td>
                <td>Row 3, Cell 2</td>
                <td>Row 3, Cell 3</td>
            </tr>
        </tbody>
    </BrightTable>
</div>

```html
<BrightTable
    id="simpleTableExample"
    class="text-left"
    style="width: 512px"
    :hide-footer="true"
>
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
        </tr>
        <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
        </tr>
        <tr>
            <td>Row 3, Cell 1</td>
            <td>Row 3, Cell 2</td>
            <td>Row 3, Cell 3</td>
        </tr>
    </tbody>
</BrightTable>
```

:::tip
When working with **Simple Tables**, you'll probably want to use the [`hide-footer`](#hide-footer) property, as the pagination that appears in the footer depends on the [`rows`](#rows) and [`columns`](#columns) properties to be present.
:::

:::tip
Because of their simple nature, features found in [Data Tables](#data-tables) like sorting, searching, filtering, or bulk editing cannot be automatically applied to **Simple Tables**.
:::

## Styling

### Bordered
Use the `bordered` property to show or hide a border around a **Table**.

By default, **Tables** are bordered.

### Dividers
Use the `show-horizontal-divider` and `show-vertical-divider` properties to control whether or not there are horizontal or vertical dividers in a **Table**.

By default, **Tables** have a horizontal divider.

### Full-Width
Use the `full-width` property to make a **Table** full-width and extend to the width of its parent container.

By default, **Tables** are full-width.

### Form Control
Use the `form-control` property to control the **Form Control** of a **Table**.

By default, **Tables** have the "comfortable" setting.

:::tip
Note that this property has the same spacing mechanics as the [Form Control used in the Input Library](/bright-design-system/input-library/overview/#form-control)
:::

### Hide Header
Use the `hide-header` property to hide the header of a **Data Table** (i.e. the column header row). When working with **Simple Tables**, simply refrain from using the `<thead>` HTML tag.

By default, **Tables** have a visible header.

### Hide Footer
Use the `hide-footer` property to hide the "footer" of a table (i.e. the [Pagination](#pagination)).

By default, **Tables** have a visible footer.

### Padding
Use the `padding` property to control the padding of a **Table's** contents.

By default, **Tables** have a **medium** amount of padding.

### Size
Use the `size` property to control the default `font-size` of content.

By default, **Tables** have a **medium** size.

### Striped
Use the `striped` property to add a striped background color to even rows. In most cases, this will improve the readability of **Tables**.

By default, **Tables** are striped.


## Common Styling Patterns
Although **Tables** will look good out-of-the-box most of the time, there will be situations where you may want to optimize the display of certain columns or cells. This section details some reusable patterns that may be applicable to your situation.

It's worth briefly considering the following sections to understand the range of options you have for styling:
- [The Styling properties](#styling)
- [The `headerClass` and `headerStyle` column properties](#header-class-columns)
- [The `cellClass` and `cellStyle` column properties](#cell-class-columns)
- [The `row-class` and `row-style` properties](#adding-classes-and-styles-to-all-rows)

With knowledge of these four sections and a bit of CSS/Vue knowledge, you can creatively use CSS classes and styles to achieve remarkable results in regards to styling.

### Make a column a certain width
There will be cases where you'll want [Columns](#columns) to be a certain width. To do so, use the [`headerClass` column property](#header-class-columns) like so:

```javascript{4}
let column = {
    name: 'Column Name',
    key: 'columnName',
    headerClass: 'w-1/3', // Make this column 1/3rd width of the table
}
```

Taking this a step further, it's possible to use the **Responsive width variants** to change the width of content at certain breakpoints.

```javascript{4}
let column = {
    name: 'Column Name',
    key: 'columnName',
    headerClass: 'w-1/4 tablet:w-1/3 desktop:w-auto', // Three breakpoints
}
```

### Make all rows a certain height
If all [Rows](#rows) in a **Table** are the same height, it's significantly easier for a user to scan through the **Table**. If you know that your **Table** will have multi-line content intermingled with single-line content, then you may want to consider adding a consistent height value to all rows.

To easily do so, use the [`row-class` or `row-style` properties](#adding-classes-and-styles-to-all-rows) like so:

```vue{3}
<BrightTable
    id="tableWithFixedHeightRows"
    row-style="height: 64px"
/>
```

### Force all cells in a column to be on one line
Some data (such as phone numbers) are better presented on **one line** as opposed to many lines. To force all cells in a column to be on the same line (and not line break), use the [`cellClass` column property](#cell-class-columns) like so:

```javascript{4}
let column = {
    name: 'Phone Number',
    key: 'phoneNumber',
    cellClass: 'whitespace-no-wrap',
}
```

This will apply the `whitespace: no-wrap` CSS style to all cells in a column, which will force all cells in the column to not line break.

### Truncate cells in a column if they're too long
Some long-form data (such as a comma-delimited list of items) can skew a column to be wider than it should be and cause other columns to look small. In these cases, one possible solution is to use truncation. This is possible using the [`cellClass` column property](#cell-class-columns).

```javascript{4}
let column = {
    name: 'Really Long Column',
    key: 'reallyLongColumn',
    cellClass: 'truncate',
}
```


## Mobile Responsiveness
**Tables** are mobile responsive and will adopt a horizontal scrollbar on smaller screens. Having said that, there are ways to improve the mobile responsiveness of **Tables** for certain data formats and situations, as detailed in the [Common Styling Patterns](#common-styling-patterns) section.


## Related Reading
- [Layout Library](/bright-design-system/layout-library/)

## API

### `BrightTable` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightTable
        id="table"
        :columns='[
            { name: "Column One", key: "columnOne" },
            { name: "Column Two", key: "columnTwo" },
        ]'
        :rows='[
            {
                columnOne: "Row 1, Cell 1",
                columnTwo: "Row 1, Cell 2",
            },
            {
                columnOne: "Row 2, Cell 1",
                columnTwo: "Row 2, Cell 2",
            },
            {
                columnOne: "Row 3, Cell 1",
                columnTwo: "Row 3, Cell 2",
            },
        ]'
    />
</div>

```vue
<BrightTable
    id="table"
    :columns='[
        { name: "Column One", key: "columnOne" },
        { name: "Column Two", key: "columnTwo" },
    ]'
    :rows='[
        {
            columnOne: "Row 1, Cell 1",
            columnTwo: "Row 1, Cell 2",
        },
        {
            columnOne: "Row 2, Cell 1",
            columnTwo: "Row 2, Cell 2",
        },
        {
            columnOne: "Row 3, Cell 1",
            columnTwo: "Row 3, Cell 2",
        },
    ]'
/>
```


### `BrightTable` Slots
The `BrightTable` component has the following slots:
- A `default` slot for [Simple Tables](#simple-tables)
- A [Hybrid Slot](#hybrid-slot) for [Adding Functionality and Alternative Layouts for Cells](#advanced-adding-functionality-and-alternative-layouts-for-cells) ([Data Tables](#data-tables) only)
- An `actions` slot that allows you to insert buttons or other components into the Table. These "actions" will appear on the top-right of the Table on the same row as the [Search](#searching), [Add Filter](#filtering), and [Refresh](#show-refresh-button) buttons.

#### Hybrid Slot
In **Bright**, a **Hybrid Slot** is a slot that has a [name](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) and [scope](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots). The `BrightTable` component has a **Hybrid Slot** for every column. The structure is as follows:

```vue
<BrightTable>
    <template v-slot:column:x="row"> // "For all cells in the 'x' column, apply this template. Oh, and the template has access to all properties in a Row."
        <!-- Interpolation like {{row.myColumnKey}} can be done here as well as normal Vue syntax/JavaScript expressions -->
    </template>
</BrightTable>
```

### `BrightTable` Properties

#### Functional Properties
These properties are related to the core functionality of the **BrightTable** component.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: | :-: |
| **id** | string | | | ✅ |
| [columns](#columns) | array of objects | | `[]` | ✅ (if using [Data Tables](#data-tables)) |
| [rows](#rows) | array of objects | | `[]` | ✅ (if using [Data Tables](#data-tables)) |
| [hide-header](#hide-header) | boolean | | `false` | |
| [hide-footer](#hide-footer) | boolean | | `false` | |
| [rows-per-page-options](#rows-per-page-pagination) | array of numbers | | `[25, 50, 100]` | |
| [searchable](#searchable) | boolean | | `false` | |
| [filters](#filtering) | array of objects | | `[]` | |
| [bulk-edit-actions](#bulk-editing) | array of objects | | `[]` | |
| [show-refresh-button](#show-refresh-button) | boolean | | `false` | |
| [server-side-data](#server-side-data) | object | | `{}` | |

#### Style Properties
These properties are related to the styling of the **BrightTable** component.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [bordered](#bordered) | boolean | | `true` | |
| [full-width](#full-width) | boolean | | `true` | |
| [form-control](#form-control) | string | `loose` `comfortable` `tight` `none` | `comfortable` | |
| [padding](#padding) | string | `small` `medium` `large` `none` | `medium` | |
| [row-class](#adding-classes-and-styles-to-all-rows) | string, object, array | See [Class Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-HTML-Classes) in Vue docs. | `""` | |
| [row-style](#adding-classes-and-styles-to-all-rows) | string, object, array | See [Style Bindings](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) in Vue docs. | `""` | |
| [show-horizontal-divider](#dividers) | boolean | | `true` | |
| [show-vertical-divider](#dividers) | boolean | | `false` | |
| [size](#size) | string | `small` `medium` `large` | `medium` | |
| [striped](#striped) | boolean | | `true` | |

### `BrightTable` Events
The `BrightTable` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns |
| :- | :- | :- |
| `page-update` | When the pagination is updated. | An object containing the page number to fetch and the # of displayed rows per page.|
| `sort-update` | When the column sort is updated. | An object containing the sorted column name and the sort order.|
| `search-update` | When a search term is updated. | An object containing the searchKey and the searchValue.|
| `filter-update` | When a filter is updated. | An array containing objects filled with filter data.|
| `row:selected` | When a **Row** is selected. | **Client-Side Tables:** An object containing a boolean that indicates whether the "Select All" checkbox is **selected**, as well as, an array of the **Row** `id(s)` that are selected. <br><br> **Server-Side Tables:** An object that contains the data below. <ul><li>A boolean that indicates whether the "Select All" checkbox is **selected**.</li> <li>If the boolean is `false`, an array of the selected **Row** `id` will be returned. If the boolean is `true`, no **Row** `ids` will be returned. Developers are responsible for obtaining the list of all row `ids` using an API.</li></ul> |
| `row:unselected` | When a **Row** is unselected. | **Client-Side Tables:** An object containing a boolean that indicates whether the "Select All" checkbox is **unselected**, as well as, a string or array of the **Row** `id(s)` that are unselected. <br><br> **Server-Side Tables:** An object that contains the data below. <ul><li>A boolean that indicates whether the "Select All" checkbox is **unselected**.</li> <li>If the boolean is `false`, a string of the unselected **Row** `id` will be returned. If the boolean is `true`, no **Row** `ids` will be returned. Developers are responsible for obtaining the list of all row `ids` using an API. </li></ul> |
| [*eventName*](#bulk-editing)`bulkeditbutton:clicked` | When a **Bulk Edit Action** button is clicked. | **Client-Side Tables:** An object containing a boolean that indicates whether the "Select All" checkbox is selected, as well as, an array of the **Row** `id(s)` the bulk edit action applies to. <br><br> **Server-Side Tables:** An object that contains the data below. <ul><li>A boolean that indicates whether the "Select All" checkbox is selected.</li> <li>If the boolean is `false`, an array of **Row** `ids` that the bulk edit action applies to will be returned. If the boolean is `true`, no **Row** `ids` will be returned. Developers are responsible for obtaining the list of all row `ids` using an API.</li> <li>A filter object containing the filters that were applied to the table when the bulk edit action was clicked.</li> <li>A search object containing the search column and search terms that were applied to the table when the bulk edit action was clicked.</li></ul> _For server-side tables, developers can utilize the filter & search data to handle bulk edit operations._ |
| `refresh` | When the [Refresh Button](#show-refresh-button) is clicked (if enabled with the `show-refresh-button` prop) | Nothing |

### `BrightTable` Methods
The `BrightTable` component provides the following public-facing methods intended for use by developers. They can be accessed by assigning a [`ref`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements) to the component.

| Method Signature | Description | Returns |
| :- | :- | :- |
| `$_getBulkEditableSelectedRows()` | Gets the row(s) that are currently selected for bulk editing. | <p>If <strong>Rows</strong> are selected, it will return an <code>array</code>. If no <strong>Rows</strong> are selected, then it will return an empty <code>string</code>.</p> |