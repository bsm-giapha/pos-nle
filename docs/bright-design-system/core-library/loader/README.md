# Loader

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundLoader from './components/VuePressUIPlaygroundLoader.vue';
export default {
    components: {
        VuePressUIPlaygroundLoader,
    },
}
</script>

Use **Loaders** when loading content asynchronously.

<VuePressUIPlaygroundLoader/>

## API

### `BrightLoader` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightLoader :isLoading="true"/>
</div>

```vue
<BrightLoader :isLoading="true"/>
```

### `BrightIcon` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightIcon` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [is-loading](#brightloader-minimum-required-template-mrt) | boolean | | `false` | ✅ |