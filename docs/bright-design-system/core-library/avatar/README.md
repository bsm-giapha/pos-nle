# Avatar

<script>
import VuePressUIPlaygroundAvatar from './components/VuePressUIPlaygroundAvatar.vue';
export default {
    components: {
        VuePressUIPlaygroundAvatar,
    },
}
</script>

Use **Avatars** to visually represent a user in a layout.

<VuePressUIPlaygroundAvatar/>

## Best Practices

### When To Use
Use **Avatars** to visually represent a user in a layout.


## Anatomy

### Name
Use the `name` property to provide a name for the Avatar. This will be used in the `alt` text for the Avatar and will be placed in the Avatar if there is no [Image](#image) provided.

This is a required property for all Avatars.

<div class="code-example-box">
    <BrightAvatar name="Alice Firstimer"/>
</div>

```vue
<BrightAvatar name="Alice Firstimer"/>
```

### Image
Use the `src` property to provide an image for the Avatar. For best results, use a square image that clearly shows the User or subject.

<div class="code-example-box">
    <BrightAvatar
        name="Random Stock Photo On Google"
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
        size="extra-extra-large"    
    />
</div>

```vue{3}
<BrightAvatar
    name="Random Stock Photo On Google"
    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
    size="extra-extra-large"    
/>
```


## Styling

### Color
Use the `color` property to specify the color of an Avatar that does not have an [image](#image).

By default, all Avatars are blue.

<div class="code-example-box">
    <div class="flex justify-between" style="max-width: 400px">
        <BrightAvatar name="Alice Firstimer"/>
        <BrightAvatar name="Alice Firstimer" color="aqua"/>
        <BrightAvatar name="Alice Firstimer" color="pink"/>
        <BrightAvatar name="Alice Firstimer" color="yellow"/>
        <BrightAvatar name="Alice Firstimer" color="green"/>
        <BrightAvatar name="Alice Firstimer" color="red"/>
        <BrightAvatar name="Alice Firstimer" color="orange"/>
        <BrightAvatar name="Alice Firstimer" color="purple"/>
        <BrightAvatar name="Alice Firstimer" color="indigo"/>
        <BrightAvatar name="Alice Firstimer" color="grey"/>
    </div>
</div>

```vue
<div class="flex justify-between" style="max-width: 400px">
    <BrightAvatar name="Alice Firstimer"/>
    <BrightAvatar name="Alice Firstimer" color="aqua"/>
    <BrightAvatar name="Alice Firstimer" color="pink"/>
    <BrightAvatar name="Alice Firstimer" color="yellow"/>
    <BrightAvatar name="Alice Firstimer" color="green"/>
    <BrightAvatar name="Alice Firstimer" color="red"/>
    <BrightAvatar name="Alice Firstimer" color="orange"/>
    <BrightAvatar name="Alice Firstimer" color="purple"/>
    <BrightAvatar name="Alice Firstimer" color="indigo"/>
    <BrightAvatar name="Alice Firstimer" color="grey"/>
</div>
```

### Disabled
Use the `disabled` property to indicate that an Avatar should appear to be disabled.

<div class="code-example-box">
    <BrightAvatar name="Alice Firstimer" :disabled="true"/>
</div>

```vue
<BrightAvatar name="Alice Firstimer" :disabled="true"/>
```

### Light
Use the `light` property to make an Avatar appear in its "light" mode.

<div class="code-example-box">
    <div class="flex justify-between" style="max-width: 400px">
        <BrightAvatar name="Alice Firstimer" light/>
        <BrightAvatar name="Alice Firstimer" color="aqua" light/>
        <BrightAvatar name="Alice Firstimer" color="pink" light/>
        <BrightAvatar name="Alice Firstimer" color="yellow" light/>
        <BrightAvatar name="Alice Firstimer" color="green" light/>
        <BrightAvatar name="Alice Firstimer" color="red" light/>
        <BrightAvatar name="Alice Firstimer" color="orange" light/>
        <BrightAvatar name="Alice Firstimer" color="purple" light/>
        <BrightAvatar name="Alice Firstimer" color="indigo" light/>
        <BrightAvatar name="Alice Firstimer" color="grey" light/>
    </div>
</div>

```vue
<div class="flex justify-between" style="max-width: 400px">
    <BrightAvatar name="Alice Firstimer" light/>
    <BrightAvatar name="Alice Firstimer" color="aqua" light/>
    <BrightAvatar name="Alice Firstimer" color="pink" light/>
    <BrightAvatar name="Alice Firstimer" color="yellow" light/>
    <BrightAvatar name="Alice Firstimer" color="green" light/>
    <BrightAvatar name="Alice Firstimer" color="red" light/>
    <BrightAvatar name="Alice Firstimer" color="orange" light/>
    <BrightAvatar name="Alice Firstimer" color="purple" light/>
    <BrightAvatar name="Alice Firstimer" color="indigo" light/>
    <BrightAvatar name="Alice Firstimer" color="grey" light/>
</div>
```

### Size
Use the `size` property to specify the size of an Avatar.

By default, all Avatars are medium-sized.

<div class="code-example-box">
    <div class="flex justify-between" style="max-width: 320px">
        <BrightAvatar name="Alice Firstimer" size="extra-extra-large"/>
        <BrightAvatar name="Alice Firstimer" size="extra-large"/>
        <BrightAvatar name="Alice Firstimer" size="large"/>
        <BrightAvatar name="Alice Firstimer" size="medium"/>
        <BrightAvatar name="Alice Firstimer" size="small"/>
    </div>
</div>

```vue
<div class="flex justify-between" style="max-width: 320px">
    <BrightAvatar name="Alice Firstimer" size="extra-extra-large"/>
    <BrightAvatar name="Alice Firstimer" size="extra-large"/>
    <BrightAvatar name="Alice Firstimer" size="large"/>
    <BrightAvatar name="Alice Firstimer" size="medium"/>
    <BrightAvatar name="Alice Firstimer" size="small"/>
</div>
```



## Related Reading
- [Core Library](/bright-design-system/core-library/)

## API
### `BrightAvatar` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightAvatar name="Alice Firstimer"/>
</div>

```vue
<BrightCard label="Card"/>
```

### `BrightAvatar` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightAvatar` component can receive the following properties.

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [name](#name) | string | | `""` | ✅ |
| [color](#color) | string | <BrightTag label="blue" color="blue" class="mb-4"/> <BrightTag label="pink" color="pink" class="mb-4"/> <BrightTag label="aqua" color="aqua" class="mb-4"/> <BrightTag label="yellow" color="yellow" class="mb-4"/> <BrightTag label="green" color="green" class="mb-4"/> <BrightTag label="red" color="red" class="mb-4"/> <BrightTag label="orange" color="orange" class="mb-4"/> <BrightTag label="purple" color="purple" class="mb-4"/> <BrightTag label="indigo" color="indigo" class="mb-4"/> <BrightTag label="grey" color="grey" class="mb-4"/> | `blue` | |
| [disabled](#disabled) | boolean | | `false` | |
| [light](#light) | boolean | | `false` | |
| [size](#size) | string |`small` `medium` `large` `extra-large` `extra-extra-large` | `medium` | |
| [src](#image) | string | | `""` | |