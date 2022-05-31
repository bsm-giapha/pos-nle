# Card

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundCard from './components/VuePressUIPlaygroundCard.vue';
export default {
    components: {
        VuePressUIPlaygroundCard,
    },
}
</script>

Use **Cards** to group content that share a common purpose or function.

<VuePressUIPlaygroundCard/>

## Best Practices

### When To Use
Use **Cards** to group content that share a common purpose or function.


## Anatomy
**Cards** are containers that offer built-in styling and structure for common layouts and UI patterns. Structurally, **Cards** consist of three main sections:
- [Media](#media)
- [Header](#header)
- [Body](#body)

### Media
The **Media** section of a **Card** is located above the [Header](#header). Images, videos, and illustrations are prime candidates for the **Media** section, although any content may be placed inside the **Media** section.

<div class="code-example-box">
    <BrightCard label="Media Card">
        <template v-slot:media>
            <div class="bg-grey-200 w-full" style="height: 256px;"></div>
        </template>
    </BrightCard>
</div>

```vue
<BrightCard label="Media Card">
    <template v-slot:media>
        <div class="bg-grey-200 w-full" style="height: 256px;"></div>
    </template>
</BrightCard>
```

### Header
The **Header** section of a **Card** is located below the [Media](#media) section and above the [Body](#body). [Labels](#label) and [Sub-Labels](#sub-label) are often placed in the **Header**, optionally with [Left](#left-header), [Center](#center-header), and [Right](#right-header) sub-sections.

<div class="code-example-box">
    <BrightCard label="This is the label" sub-label="This is the sub-label">
        <template v-slot:left>
            <div class="inline-block bg-blue-50 p-10 rounded-6">
                <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
            </div>
        </template>
        <template v-slot:right>
            <BrightButton use="primary">View</BrightButton>
        </template>
    </BrightCard>
</div>

```vue
<BrightCard label="This is the label" sub-label="This is the sub-label">
    <template v-slot:left>
        <div class="inline-block bg-blue-50 p-10 rounded-6">
            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
        </div>
    </template>
    <template v-slot:right>
        <BrightButton use="primary">View</BrightButton>
    </template>
</BrightCard>
```

#### Left Header
Use the `left` slot to add content to the **Left** section of a [Header](#header). It will render **before** the [Center Header](#center-header).

<div class="code-example-box">
    <BrightCard label="This is the label" sub-label="This is the sub-label">
        <template v-slot:left>
            <div class="inline-block bg-blue-50 p-10 rounded-6">
                <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
            </div>
        </template>
    </BrightCard>
</div>

```vue
<BrightCard label="This is the label" sub-label="This is the sub-label">
    <template v-slot:left>
        <div class="inline-block bg-blue-50 p-10 rounded-6">
            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
        </div>
    </template>
</BrightCard>
```

##### Left Header Responsiveness
Use the `breakpoint-header-left` property to determine when (if at all) the [Left Header](#left-header) should be on its own line. The valid values are:
- `never` (Default) Never move the **Left Header** to its own line.
- `always` Always move the **Left Header** to its own line.
- `tablet` Only move the **Left Header** to its own line at the **Tablet** media breakpoint (i.e. between 640px and 1440px)

<div class="code-example-box">
    <BrightCard
        label="Never"
        sub-label="The Left Header will never be on its own line."
        class="mb-8"
    >
        <template v-slot:left>
            <div class="inline-block bg-blue-50 p-10 rounded-6">
                <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
            </div>
        </template>
    </BrightCard>
    <BrightCard
        label="Always"
        sub-label="The Left Header will always be on its own line."
        breakpoint-header-left="always"
        class="mb-8"
    >
        <template v-slot:left>
            <div class="inline-block bg-blue-50 p-10 rounded-6">
                <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
            </div>
        </template>
    </BrightCard>
    <BrightCard
        label="Tablet"
        sub-label="The Left Header will only be on its own line at the Tablet media breakpoint."
        breakpoint-header-left="tablet"
    >
        <template v-slot:left>
            <div class="inline-block bg-blue-50 p-10 rounded-6">
                <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
            </div>
        </template>
    </BrightCard>
</div>

```vue
<BrightCard
    label="Never"
    sub-label="The Left Header will never be on its own line."
>
    <template v-slot:left>
        <div class="inline-block bg-blue-50 p-10 rounded-6">
            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
        </div>
    </template>
</BrightCard>

<BrightCard
    label="Always"
    sub-label="The Left Header will always be on its own line."
    breakpoint-header-left="always"
>
    <template v-slot:left>
        <div class="inline-block bg-blue-50 p-10 rounded-6">
            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
        </div>
    </template>
</BrightCard>

<BrightCard
    label="Tablet"
    sub-label="The Left Header will only be on its own line at the Tablet media breakpoint."
    breakpoint-header-left="tablet"
>
    <template v-slot:left>
        <div class="inline-block bg-blue-50 p-10 rounded-6">
            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
        </div>
    </template>
</BrightCard>
```

#### Center Header
Use the `center` slot to add content to the **Center** section of a [Header](#header). It will render **after** the  [Left Header](#left-header) and **before** the [Right Header](#right-header).

:::tip
The [Label](#label) and [Sub-Label](#sub-label) of a **Card** are located in the **Center Header**. They will render **before** the `center` slot.
:::

<div class="code-example-box">
    <BrightCard label="This is the label" sub-label="This is the sub-label">
        <template v-slot:center>
            This is the center slot.
        </template>
    </BrightCard>
</div>

```vue
<BrightCard label="This is the label" sub-label="This is the sub-label">
    <template v-slot:center>
        This is the center slot.
    </template>
</BrightCard>
```

#### Right Header
Use the `right` slot to add content to the **Right** section of a [Header](#header). It will render **after** the [Center Header](#center-header).

<div class="code-example-box">
    <BrightCard label="This is the label" sub-label="This is the sub-label">
        <template v-slot:right>
            <BrightButton use="primary">View</BrightButton>
        </template>
    </BrightCard>
</div>

```vue
<BrightCard label="This is the label" sub-label="This is the sub-label">
    <template v-slot:right>
        <BrightButton use="primary">View</BrightButton>
    </template>
</BrightCard>
```


##### Right Header Responsiveness
Use the `breakpoint-header-right` property to determine when (if at all) the [Right Header](#right-header) should be on its own line. The valid values are:
- `never` (Default) Never move the **Right Header** to its own line.
- `always` Always move the **Right Header** to its own line.
- `tablet` Only move the **Right Header** to its own line at the **Tablet** media breakpoint (i.e. between 640px and 1440px)

<div class="code-example-box">
    <BrightCard
        label="Never"
        sub-label="The Right Header will never be on its own line."
        class="mb-8"
    >
        <template v-slot:right>
            <BrightButton use="primary">View</BrightButton>
        </template>
    </BrightCard>
    <BrightCard
        label="Always"
        sub-label="The Right Header will always be on its own line."
        breakpoint-header-right="always"
        class="mb-8"
    >
        <template v-slot:right>
            <BrightButton use="primary">View</BrightButton>
        </template>
    </BrightCard>
    <BrightCard
        label="Tablet"
        sub-label="The Right Header will only be on its own line at the Tablet media breakpoint."
        breakpoint-header-right="tablet"
    >
        <template v-slot:right>
            <BrightButton use="primary">View</BrightButton>
        </template>
    </BrightCard>
</div>

```vue
<BrightCard
    label="Never"
    sub-label="The Right Header will never be on its own line."
>
    <template v-slot:right>
        <BrightButton use="primary">View</BrightButton>
    </template>
</BrightCard>

<BrightCard
    label="Always"
    sub-label="The Right Header will always be on its own line."
    breakpoint-header-right="always"
>
    <template v-slot:right>
        <BrightButton use="primary">View</BrightButton>
    </template>
</BrightCard>

<BrightCard
    label="Tablet"
    sub-label="The Right Header will only be on its own line at the Tablet media breakpoint."
    breakpoint-header-right="tablet"
>
    <template v-slot:right>
        <BrightButton use="primary">View</BrightButton>
    </template>
</BrightCard>
```


### Body
The **Body** section of a **Card** is located below the [Header](#header). Anything can be placed inside of the **Body**.

<div class="code-example-box">
    <BrightCard label="This is the label" sub-label="This is the sub-label">
        This is the body of the card. You can literally put anything here. Text, buttons, images, <strong>anything.</strong>
    </BrightCard>
</div>

```vue
<BrightCard label="This is the label" sub-label="This is the sub-label">
    This is the body of the card. You can literally put anything here. Text, buttons, images, <strong>anything.</strong>
</BrightCard>
```

## Structure & State

### Label
Use the `label` property to provide a **primary label** for a **Card**.

:::tip
The size of a **Label** is determined by the [`size`](#size) property and is structurally located in the [Center Header](#center-header).
:::

<div class="code-example-box">
    <BrightCard label="This is a label"/>
</div>

```vue
<BrightCard label="This is a label"/>
```

### Sub-Label
Use the `sub-label` property to provide a **secondary label** for a **Card**. Prefer using a [Label](#label) with a **Sub-Label** and avoid using a **Sub-Label** by itself.

:::tip
The size of a **Sub-Label** is determined by the [`size`](#size) property and is structurally located in the [Center Header](#center-header).
:::

<div class="code-example-box">
    <BrightCard label="This is a label" sub-label="This is a sub-label."/>
</div>

```vue
<BrightCard label="This is a label" sub-label="This is a sub-label."/>
```

### Label Position
Use the `label-position` property to control a **Card** label's text alignment.

<div class="code-example-box">
    <BrightCard label="This is a label" label-position="center"/>
</div>

```vue
<BrightCard label="This is a label" label-position="center"/>
```

### Label Element
Use the `label-element` property to turn the Primary label of a **Card** into any HTML element type. Since **Cards** will be used in 
layouts, they must convey semantic importance.

<div class="code-example-box">
    <BrightCard label="Primary label" sub-label="Use the inspector in your browser to see this Card's Primary label HTML element type." label-element="h2"/>
</div>

```vue
<BrightCard label="Primary label" sub-label="Use the inspector in your browser to see this Card's Primary label HTML element type." label-element="h2"/>
```

### Invert Labels
Use the `invert-labels` property to invert the layout of a [Label](#label) and [Sub-Label](#sub-label). This will cause the **Sub-Label** to be on top of the **Label**.

<div class="code-example-box">
    <BrightCard
        label="This is a label"
        sub-label="This is a sub-label."
        invert-labels
    />
</div>

```vue{4}
<BrightCard
    label="This is a label"
    sub-label="This is a sub-label."
    invert-labels
/>
```

### Expandable
Use the `expandable` property to make an **Expandable Card**. The [Body](#body) of an **Expandable Card** will be hidden until it's expanded.

:::warning ID IS REQUIRED FOR EXPANDABLE CARDS
All **Expandable Cards** must have a unique `id` attribute. This is because each **Expandable Card** has to toggle its own collapsible sections and tell screenreaders about them. The only way to do this in an accessible manner is by providing a unique `id` for each **Expandable Card**.
:::

<div class="code-example-box">
    <BrightCard
        label="This is an Expandable Card"
        sub-label="Click it and see what happens."
        id="expandableExample"
        expandable
    >
        This is the body content. You can put anything in here. It'll be hidden until the Card is Expanded.
    </BrightCard>
</div>

```vue{4-5}
<BrightCard
    label="This is an Expandable Card"
    sub-label="Click it and see what happens."
    id="expandableExample"
    expandable
>
    This is the body content. You can put anything in here. It'll be hidden until the Card is Expanded.
</BrightCard>
```

#### Expanded
Use the `expanded` property to make an [Expandable Card](#expandable) expanded on initial page load.

<div class="code-example-box">
    <BrightCard
        label="This Card was expanded on initial page load"
        sub-label="You can still collapse it if you don't want to see it."
        id="expandedExample"
        expandable
        expanded
    >
        This is the body content. You can put anything in here. It was visible the moment this page loaded.
    </BrightCard>
</div>

```vue{6}
<BrightCard
    label="This Card was expanded on initial page load"
    sub-label="You can still collapse it if you don't want to see it."
    id="expandedExample"
    expandable
    expanded
>
    This is the body content. You can put anything in here. It was visible the moment this page loaded.
</BrightCard>
```

#### Hide Expandable Arrow
Use the `expandable-hide-arrow` property to hide an [Expandable Card's](#expandable) arrow icon.

:::tip
If you use this property, you'll want to strongly consider adding some sort of visual cue to the User to let them know that the card is expandable. It won't be obvious without an icon or equivalent affordance.
:::

<div class="code-example-box">
    <BrightCard
        label="This is an Expandable Card without an arrow"
        sub-label="It's kind of hard to tell, but you can expand it by clicking the card."
        id="hideExpandableArrowExample"
        expandable
        expandable-hide-arrow
    >
        This is the body content. You can put anything in here. It'll be hidden until the Card is Expanded.
    </BrightCard>
</div>

```vue{6}
<BrightCard
    label="This is an Expandable Card without an arrow"
    sub-label="It's kind of hard to tell, but you can expand it by clicking the card."
    id="hideExpandableArrowExample"
    expandable
    expandable-hide-arrow
>
    This is the body content. You can put anything in here. It'll be hidden until the Card is Expanded.
</BrightCard>
```

### As A Link
Use the `href` property to make a **Link Card**. Prefer using this property over wrapping a **Card** in an `<a>` element because this property will toggle helpful styles to make the **Card** behave normally as a link.

<div class="code-example-box">
    <BrightCard
        label="This is a Link Card"
        sub-label="You can click it."
        href="#as-a-link"
    />
</div>

```vue{4}
<BrightCard
    label="This is a Link Card"
    sub-label="You can click it."
    href="#as-a-link"
/>
```

## Styling

### Size
**Cards** have built-in padding and typography styles that change based on the `size` property. 

By default, all **Cards** are **medium-sized**.

<div class="code-example-box">
    <BrightCard
        label="Large Card"
        sub-label="Notice the larger typography and increased padding."
        size="large"
    />
    <br>
    <BrightCard
        label="Medium Card"
        sub-label="This is the default size for all Cards. It's reasonably sized and good in a wide range of layouts."
    />
    <br>
    <BrightCard
        label="Small Card"
        sub-label="Notice the smaller typography and tighter padding."
        size="small"
    />
</div>

```vue
<BrightCard
    label="Large Card"
    sub-label="Notice the larger typography and increased padding."
    size="large"
/>

<BrightCard
    label="Medium Card"
    sub-label="This is the default size for all Cards. It's reasonably sized and good in a wide range of layouts."
/>

<BrightCard
    label="Small Card"
    sub-label="Notice the smaller typography and tighter padding."
    size="small"
/>
```

### Elevation

#### Flat
By default, all **Cards** are **Flat Cards**. Prefer using **Flat Cards** on lightly colored backgrounds (white, in particular).

<div class="code-example-box">
    <BrightCard
        label="Flat Card"
        sub-label="It's pretty flat and looks nice on light backgrounds."
    />
</div>

```vue
<BrightCard
    label="Flat Card"
    sub-label="It's pretty flat and looks nice on light backgrounds."
/>
```

#### Raised
Use the `raised` property to make a **Raised Card**. Prefer using **Raised Cards** on shaded backgrounds (grey, in particular).

<div class="code-example-box">
    <BrightCard
        label="Raised Card"
        sub-label="It's poppin' and looks nice on shaded backgrounds."
        raised
    />
</div>

```vue{4}
<BrightCard
    label="Raised Card"
    sub-label="It's poppin' and looks nice on shaded backgrounds."
    raised
/>
```

### Ribbons
Use **Ribboned Cards** to draw attention to important or new content.

<div class="code-example-box">
    <BrightCard
        ribbon="grey"
        class="mb-8"
        label="Grey Card"
        sub-label="Grey is GREY-t."
    />
    <BrightCard
        ribbon="pink"
        class="mb-8"
        label="Pink Card"
        sub-label="Try using more pink; just PINK about it."
    />
    <BrightCard
        ribbon="aqua"
        class="mb-8"
        label="Aqua Card"
        sub-label="AQUA-st the ocean, there is an island where great puns are told."
    />
    <BrightCard
        ribbon="yellow"
        class="mb-8"
        label="Yellow Card"
        sub-label="YELLOW? I can't hear you. You're cutting out on the phone."
    />
    <BrightCard
        ribbon="green"
        class="mb-8"
        label="Green Card"
        sub-label="I'm just GREEN with envy whenever someone gets to use this green card."
    />
    <BrightCard
        ribbon="red"
        class="mb-8"
        label="Red Card"
        sub-label="I've already RED these docs, but I'm re-reading them anyway for the puns."
    />
    <BrightCard
        ribbon="orange"
        class="mb-8"
        label="Orange Card"
        sub-label="ORANGE you glad we're writing good doc examples with bad puns?"
    />
    <BrightCard
        ribbon="purple"
        class="mb-8"
        label="Purple Card"
        sub-label="I can't think of a pun with purple. It's sad, really. If you can think of one, submit a PR-ple."
    />
    <BrightCard
        ribbon="indigo"
        class="mb-8"
        label="Indigo Card"
        sub-label="Drowning in a vat of indigo may be considered a violet death."
    />
</div>

```vue
<BrightCard
    ribbon="grey"
    class="mb-8"
    label="Grey Card"
    sub-label="Grey is GREY-t."
/>

<BrightCard
    ribbon="pink"
    class="mb-8"
    label="Pink Card"
    sub-label="Try using more pink; just PINK about it."
/>

<BrightCard
    ribbon="aqua"
    class="mb-8"
    label="Aqua Card"
    sub-label="AQUA-st the ocean, there is an island where great puns are told."
/>

<BrightCard
    ribbon="yellow"
    class="mb-8"
    label="Yellow Card"
    sub-label="YELLOW? I can't hear you. You're cutting out on the phone."
/>

<BrightCard
    ribbon="green"
    class="mb-8"
    label="Green Card"
    sub-label="I'm just GREEN with envy whenever someone gets to use this green card."
/>

<BrightCard
    ribbon="red"
    class="mb-8"
    label="Red Card"
    sub-label="I've already RED these docs, but I'm re-reading them anyway for the puns."
/>

<BrightCard
    ribbon="orange"
    class="mb-8"
    label="Orange Card"
    sub-label="ORANGE you glad we're writing good doc examples with bad puns?"
/>

<BrightCard
    ribbon="purple"
    class="mb-8"
    label="Purple Card"
    sub-label="I can't think of a pun with purple. It's sad, really. If you can think of one, submit a PR-ple."
/>

<BrightCard
    ribbon="indigo"
    class="mb-8"
    label="Indigo Card"
    sub-label="Drowning in a vat of indigo may be considered a violet death."
/>
```

### Bordered
By default, all **Cards** have a light border. To turn off the border, use the `bordered` property.

<div class="code-example-box">
    <BrightCard
        label="Borderless Card"
        sub-label="Truly without limits, this Card can be used anywhere."
        :bordered="false"
    />
</div>

```vue{1}
<BrightCard
    label="Borderless Card"
    sub-label="Truly without limits, this Borderless Card can be used anywhere."
    :bordered="false"
/>
```

### Rounded
By default, all **Cards** have a slightly rounded appearance. To turn off the rounded borders, use the `rounded` property.

<div class="code-example-box">
    <BrightCard
        label="Square Card"
        sub-label="Notice how the Card has straight edges on its border."
        :rounded="false"
    />
</div>

```vue{1}
<BrightCard
    label="Square Card"
    sub-label="Notice how the Card has straight edges on its border."
    :rounded="false"
/>
```

## Related Reading
- [Expandable](/bright-design-system/core-library/expandable/)

## API
### `BrightCard` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightCard label="Card"/>
</div>

```vue
<BrightCard label="Card"/>
```

### `BrightCard` Slots
The `BrightCard` component has **five** slots:
- A `default` slot for the [Body](#body) of a **Card**
- A `media` slot for the [Media](#media) section of a **Card**
- A `left` slot for the Left section of a Card's [Left Header](#left-header)
- A `center` slot for the Center section of a Card's [Center Header](#center-header)
- A `right` slot for the Right section of a Card's [Right Header](#right-header)

Here is an example of **all** slots being used at once:

<div class="code-example-box">
    <BrightCard label="This is the label" sub-label="This is the sub-label">
        <template v-slot:left>
            <div class="inline-block bg-blue-50 p-10 rounded-6">
                <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
            </div>
        </template>
        <template v-slot:center>
            <span>This is the center slot.</span>
        </template>
        <template v-slot:right>
            <BrightButton use="primary">View</BrightButton>
        </template>
        This is the default slot.
    </BrightCard>
</div>

```vue
<BrightCard label="This is the label" sub-label="This is the sub-label">
    <template v-slot:left>
        <div class="inline-block bg-blue-50 p-10 rounded-6">
            <BrightIcon use="star" class="text-blue-500" style="font-size: 28px;"/>
        </div>
    </template>

    <template v-slot:center>
        <span>This is the center slot.</span>
    </template>

    <template v-slot:right>
        <BrightButton use="primary">View</BrightButton>
    </template>

    This is the default slot.
</BrightCard>
```

### `BrightCard` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightCard` component can receive the following properties.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [label](#label) | string | | `""` | |
| [sub-label](#sub-label) | string | | `""` | |
| [label-position](#label-position) | string | `left` `center` `right` | `left` | |
| [label-element](#label-element) | string | | `""` | |
| [bordered](#bordered) | boolean | | `true` | |
| [breakpoint-header-left](#left-header-responsiveness) | string | `never` `tablet` `always` | `never` | |
| [breakpoint-header-right](#right-header-responsiveness) | string | `never` `tablet` `always` | `never` | |
| [expandable](#expandable) | boolean | | `false` | |
| [expanded](#expanded) | boolean | | `false` | |
| [expandable-hide-arrow](#hide-expandable-arrow) | boolean | | `false` | |
| [href](#as-a-link) | string | | `""` | |
| [id](#expandable) | string | | `""` | Only for [Expandable Cards](#expandable) |
| [invert-labels](#invert-labels) | boolean | | `false` | |
| [raised](#raised) | boolean | | `false` | |
| [ribbon](#ribbons) | string | `none` <BrightTag label="grey" color="grey" class="mb-4"/> <BrightTag label="blue" color="blue" class="mb-4"/> <BrightTag label="pink" color="pink" class="mb-4"/> <BrightTag label="aqua" color="aqua" class="mb-4"/> <BrightTag label="yellow" color="yellow" class="mb-4"/> <BrightTag label="green" color="green" class="mb-4"/> <BrightTag label="red" color="red" class="mb-4"/> <BrightTag label="orange" color="orange" class="mb-4"/> <BrightTag label="purple" color="purple" class="mb-4"/> <BrightTag label="indigo" color="indigo" class="mb-4"/> | `none` | |
| [rounded](#rounded) | boolean | | `true` | |
| [size](#size) | string | `large` `medium` `small` | `medium` | |
