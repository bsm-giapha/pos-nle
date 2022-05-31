# Banner

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundBanner from './components/VuePressUIPlaygroundBanner.vue';
export default {
    components: {
        VuePressUIPlaygroundBanner,
    },
}
</script>

Use **Banners** to display important information or announcements.

<VuePressUIPlaygroundBanner/>

## Best Practices

### When To Use

#### Different Banner Types
Use **Info Banners** to convey helpful or important information.

Use **Error Banners** to convey critical information or bad news.

Use **Warning Banners** to convey cautionary information.

Use **Success Banners** to convey positive information or good news.

#### Announcement Banner
Use [Announcement Banners](#announcement) when you need to convey something extremely important.


## Anatomy
**Banners** consist of an [Icon](/bright-design-system/core-library/icon/), a [Header Label](#label), a [Body](#body), and optionally a [Removable Button](#removable).

## Structure & State

### Label
Use the `label` property to provide a **primary label** for a **Banner**.

<div class="code-example-box">
    <BrightBanner
        label="Check out this label"
        body="Cool, huh?"
    />
</div>

```vue{2}
<BrightBanner
    label="Check out this label"
    body="Cool, huh?"
/>
```

### Body
Use the `body` property to provide a body message for a **Banner**.

<div class="code-example-box">
    <BrightBanner
        label="Look below"
        body="This is the body. Wow."
    />
</div>

```vue{3}
<BrightBanner
    label="Look below"
    body="This is the body. Wow."
/>
```

#### Body Slot
It's also possible to provide body content through the default slot of the **Banner** like this:

<div class="code-example-box">
    <BrightBanner label="Slotted Body">
        This is pretty useful for doing more intricate layouts for Banners, although they should probably be short.
    </BrightBanner>
</div>

```vue{2}
<BrightBanner label="Slotted Body">
    This is pretty useful for doing more intricate layouts for Banners, although they should probably be short.
</BrightBanner>
```

### Removable
Use the `removable` property to indicate whether a **Banner** can be removed by the User.

By default, all **Banners** are not removable.

<div class="code-example-box">
    <BrightBanner
        type="success"
        label="You can remove this"
        body="It's okay. I give you permission, but only if you want to remove this."
        removable
    />
</div>

```vue{5}
<BrightBanner
    type="success"
    label="You can remove this"
    body="It's okay. I give you permission, but only if you want to remove this."
    removable
/>
```

## Styling

### Type
**Banners** have built-in styling that changes based on the `type` property. 

By default, all **Banners** are styled as **Info Banners**

<div class="code-example-box">
    <BrightBanner
        label="Info Banner"
        body="Use this for general announcements."
        removable
    />
    <br>
    <BrightBanner
        label="Error Banner"
        body="Use this for critical system errors."
        type="error"
        removable
    />
    <br>
    <BrightBanner
        label="Warning Banner"
        body="Use this for important warnings or cautions."
        type="warning"
        removable
    />
    <br>
    <BrightBanner
        label="Success Banner"
        body="Use this for important good things."
        type="success"
        removable
    />
</div>

```vue
<BrightBanner
    label="Info Banner"
    body="Use this for general announcements."
    removable
/>

<BrightBanner
    label="Error Banner"
    body="Use this for critical system errors."
    type="error"
    removable
/>

<BrightBanner
    label="Warning Banner"
    body="Use this for important warnings or cautions."
    type="warning"
    removable
/>

<BrightBanner
    label="Success Banner"
    body="Use this for important good things."
    type="success"
    removable
/>
```

### Announcement
**Announcement Banners** appear more prominent in a layout with their bolder and brighter colors. Use **Announcement Banners** for important announcements, preferably toward the top of the page.

::: tip
**Announcement Banners** need to stand out, so they don't respect the [`bordered`](#bordered) and [`rounded`](#rounded) properties.
:::

By default, all **Banners** are not **Announcement Banners**.

<div class="code-example-box">
    <BrightBanner
        label="Info Banner"
        body="Use this for general announcements."
        removable
        announcement
    />
    <br>
    <BrightBanner
        label="Error Banner"
        body="Use this for critical system errors."
        type="error"
        removable
        announcement
    />
    <br>
    <BrightBanner
        label="Warning Banner"
        body="Use this for important warnings or cautions."
        type="warning"
        removable
        announcement
    />
    <br>
    <BrightBanner
        label="Success Banner"
        body="Use this for important good things."
        type="success"
        removable
        announcement
    />
</div>

```vue
<BrightBanner
    label="Info Banner"
    body="Use this for general announcements."
    removable
    announcement
/>

<BrightBanner
    label="Error Banner"
    body="Use this for critical system errors."
    type="error"
    removable
    announcement
/>

<BrightBanner
    label="Warning Banner"
    body="Use this for important warnings or cautions."
    type="warning"
    removable
    announcement
/>

<BrightBanner
    label="Success Banner"
    body="Use this for important good things."
    type="success"
    removable
    announcement
/>
```

### Bordered
Use the `bordered` property to specify whether a **Banner** has a border around it. Note that [Announcement Banners](#announcement) do not have borders and will not respect this property.

By default, **Banners** have borders.

<div class="code-example-box">
    <BrightBanner
        label="Borderless Banner"
        body="Dang check this out. This Banner has no borders. It looks really sleek and blends in nicely."
        :bordered="false"
    />
</div>

```vue{4}
<BrightBanner
    label="Borderless Banner"
    body="Dang check this out. This Banner has no borders. It looks really sleek and blends in nicely."
    :bordered="false"
/>
```

### Rounded
Use the `rounded` property to specify whether a **Banner** is rounded. Note that [Announcement Banners](#announcement) are never rounded will not respect this property.

By default, **Banners** are rounded.

<div class="code-example-box">
    <BrightBanner
        label="Stiff Banner"
        body="This is a serious Banner and isn't curvy like the other ones."
        :rounded="false"
    />
</div>

```vue{4}
<BrightBanner
    label="Stiff Banner"
    body="This is a serious Banner and isn't curvy like the other ones."
    :rounded="false"
/>
```

## Accessibility
Banners have a role of "region" and can be removed/dismissed with the enter, space, and backspace/delete keys.

## Related Reading
- [Cards](/bright-design-system/layout-library/card/)

## API
### `BrightBanner` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightBanner
        label="Banner" 
        body="Body"
    />
</div>

```vue
<BrightBanner
    label="Banner" 
    body="Body"
/>
```

### `BrightBanner` Slots
The `BrightBanner` component has **one** slot:
- A `default` slot for the [Body](#body-slot) of a **Banner** (optional, prefer using the [`body`](#body) property)

### `BrightBanner` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightBanner` component can receive the following properties.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [type](#type) | string | `info` `error` `warning` | `success` | |
| [label](#label) | string | | `""` | |
| [body](#body) | string | | `""` | |
| [removable](#removable) | boolean | | `false` | |
| [announcement](#announcement) | boolean | | `false` | |
| [bordered](#bordered) | boolean | | `true` | |
| [rounded](#rounded) | boolean | | `true` | |