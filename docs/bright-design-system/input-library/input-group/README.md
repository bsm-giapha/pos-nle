# Input Group

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundInputGroup from './components/VuePressUIPlaygroundInputGroup.vue';
export default {
    components: {
        VuePressUIPlaygroundInputGroup,
    },
}
</script>

Use **Input Groups** to group inputs when they have a similar purpose or category.

<VuePressUIPlaygroundInputGroup/>

## Best Practices

### When To Use
Use **Input Groups** to group inputs when they have a similar purpose or category **and** do not need to be visually joined together.

### Input Group vs. Input Compound
**Input Groups** and [Input Compounds](/bright-design-system/input-library/input-compound/) are similar in many capacities, but they have their differences and preferred use cases.

Use [Input Compounds](/bright-design-system/input-library/input-compound/) when:
- You need two or more inputs to appear joined together.
- You inputs that you are joining are [compatible](/bright-design-system/input-library/input-compound/#component-compatibility) components.

In all other cases, use **Input Groups**.

## Structure
Like [Input Compounds](/bright-design-system/input-library/input-compound/), **Input Groups** are semantically `<fieldset>` and `<legend>` elements that group inputs. To be explicit, the HTML structure for an **Input Group** is the following:

```html
<fieldset>
    <legend>Label (and optionally a Sub-Label)</legend>
    <slot>Content</slot>
</fieldset>
```

This semantic structure is ideal for accessibility and form design.

### Label
Use the `label` property to assign a primary label to an **Input Group**. This is a required property.

<div class="code-example-box">
    <BrightInputGroup label="Can I take your order?">
        <BrightCheckbox id="labelOption1" label="I'll have two number 9's"/>
        <BrightCheckbox id="labelOption2" label="A number 9 large"/>
        <BrightCheckbox id="labelOption3" label="A number 6 (with extra dip)"/>
        <BrightCheckbox id="labelOption4" label="A number 7"/>
        <BrightCheckbox id="labelOption5" label="Two number 45's"/>
        <BrightCheckbox id="labelOption6" label="One with cheese"/>
        <BrightCheckbox id="labelOption7" label="And a large soda"/>
    </BrightInputGroup>
</div>

```vue{1}
<BrightInputGroup label="Can I take your order?">
    <BrightCheckbox id="labelOption1" label="I'll have two number 9's"/>
    <BrightCheckbox id="labelOption2" label="A number 9 large"/>
    <BrightCheckbox id="labelOption3" label="A number 6 (with extra dip)"/>
    <BrightCheckbox id="labelOption4" label="A number 7"/>
    <BrightCheckbox id="labelOption5" label="Two number 45's"/>
    <BrightCheckbox id="labelOption6" label="One with cheese"/>
    <BrightCheckbox id="labelOption7" label="And a large soda"/>
</BrightInputGroup>
```

### Sub-Label
Use the `sub-label` property to assign a secondary label to an **Input Group**.

<div class="code-example-box">
    <BrightInputGroup label="Which meats do you eat?" sub-label="Meat is pretty tasty, but it's cool if you don't eat meat.">
        <BrightCheckbox id="sublabelOption1" label="Beef"/>
        <BrightCheckbox id="sublabelOption2" label="Chicken"/>
        <BrightCheckbox id="sublabelOption3" label="Duck"/>
        <BrightCheckbox id="sublabelOption4" label="Lamb"/>
        <BrightCheckbox id="sublabelOption5" label="Pork"/>
        <BrightCheckbox id="sublabelOption6" label="Turkey"/>
        <BrightCheckbox id="sublabelOption7" label="I don't eat meat"/>
    </BrightInputGroup>
</div>

```vue{1}
<BrightInputGroup label="Which meats do you eat?" sub-label="Meat is pretty tasty, but it's cool if you don't eat meat.">
    <BrightCheckbox id="sublabelOption1" label="Beef"/>
    <BrightCheckbox id="sublabelOption2" label="Chicken"/>
    <BrightCheckbox id="sublabelOption3" label="Duck"/>
    <BrightCheckbox id="sublabelOption4" label="Lamb"/>
    <BrightCheckbox id="sublabelOption5" label="Pork"/>
    <BrightCheckbox id="sublabelOption6" label="Turkey"/>
    <BrightCheckbox id="sublabelOption7" label="I don't eat meat"/>
</BrightInputGroup>
```

## Styling

### Size
Use the `size` property to change the text size of an **Input Group's** label and sub-label.

The `size` property accepts the string values `small`, `medium`, or `large`.

By default, all **Input Groups** have a size of `medium`.

<div class="code-example-box">
    <BrightInputGroup label="Large Input Group" size="large">
        <BrightCheckbox id="largeOption1" label="Text Input" size="large"/>
        <BrightCheckbox id="largeOption2" label="Another One" size="large"/>
    </BrightInputGroup>
    <BrightInputGroup label="Medium Input Group">
        <BrightCheckbox id="mediumOption1" label="Text Input"/>
        <BrightCheckbox id="mediumOption2" label="Another One"/>
    </BrightInputGroup>
    <BrightInputGroup label="Small Input Group" size="small">
        <BrightCheckbox id="smallOption1" label="Text Input" size="small"/>
        <BrightCheckbox id="smallOption2" label="Another One" size="small"/>
    </BrightInputGroup>
</div>

```vue{1,5,9}
<BrightInputGroup label="Large Input Group" size="large">
    <BrightCheckbox id="largeOption1" label="Text Input" size="large"/>
    <BrightCheckbox id="largeOption2" label="Another One" size="large"/>
</BrightInputGroup>
<BrightInputGroup label="Medium Input Group">
    <BrightCheckbox id="mediumOption1" label="Text Input"/>
    <BrightCheckbox id="mediumOption2" label="Another One"/>
</BrightInputGroup>
<BrightInputGroup label="Small Input Group" size="small">
    <BrightCheckbox id="smallOption1" label="Text Input" size="small"/>
    <BrightCheckbox id="smallOption2" label="Another One" size="small"/>
</BrightInputGroup>
```

### Hide Label
To hide an **Input Group's** label (or sub-label), use the `hide-label` and `hide-sub-label` properties respectively. This can be used to group Inputs without showing the label while still remaining accessible for screenreaders.

<div class="code-example-box">
    <BrightInputGroup label="Hidden Label" sub-label="Hidden Sub-Label" hide-label hide-sub-label>
        <BrightCheckbox id="hiddenLabel1" label="This group doesn't have a label shown"/>
        <BrightCheckbox id="hiddenLabel2" label="But it's still in the DOM"/>
    </BrightInputGroup>
    <BrightInputGroup label="Visible Label" sub-label="Visible Sub-Label">
        <BrightCheckbox id="visibleLabel1" label="This group has a label"/>
        <BrightCheckbox id="visibleLabel2" label="You can definitely see it"/>
    </BrightInputGroup>
</div>

```vue{1}
<BrightInputGroup label="Hidden Label" sub-label="Hidden Sub-Label" hide-label>
    <BrightCheckbox id="hiddenLabel1" label="This group doesn't have a label shown"/>
    <BrightCheckbox id="hiddenLabel2" label="But it's still in the DOM"/>
</BrightInputGroup>

<BrightInputGroup label="Visible Label" sub-label="Visible Sub-Label">
    <BrightCheckbox id="visibleLabel1" label="This group has a label"/>
    <BrightCheckbox id="visibleLabel2" label="You can definitely see it"/>
</BrightInputGroup>
```

### Form Control
Like [Inputs](/bright-design-system/input-library/overview/#input-components), all **Input Groups** have a moderately spaced [Form Control](/bright-design-system/input-library/overview/#form-control) that adds spacing between other [Inputs](/bright-design-system/input-library/overview/#input-components) and **Input Groups**. To change the spacing or disable it, use the `form-control` property.

<div class="code-example-box">
    <BrightInputGroup label="Loose Spacing" sub-label="There's quite a bit of margin below this group." form-control="loose">
        <BrightCheckbox id="loose1" label="Text Input"/>
        <BrightCheckbox id="loose2" label="Another One"/>
    </BrightInputGroup>
    <BrightInputGroup label="Comfortable Spacing (Default)" sub-label="There's a comfortable amount of margin below this group.">
        <BrightCheckbox id="comfortable1" label="Text Input"/>
        <BrightCheckbox id="comfortable2" label="Another One"/>
    </BrightInputGroup>
    <BrightInputGroup label="Tight Spacing" sub-label="There's a little bit of margin below this group." form-control="tight">
        <BrightCheckbox id="tight1" label="Text Input"/>
        <BrightCheckbox id="tight2" label="Another One"/>
    </BrightInputGroup>
    <BrightInputGroup label="No Spacing" sub-label="There's no margin below this group." form-control="none">
        <BrightCheckbox id="none1" label="Text Input"/>
        <BrightCheckbox id="none2" label="Another One"/>
    </BrightInputGroup>
</div>

```vue{1,6,11,16}
<BrightInputGroup label="Loose Spacing" sub-label="There's quite a bit of margin below this group." form-control="loose">
    <BrightCheckbox id="loose1" label="Text Input"/>
    <BrightCheckbox id="loose2" label="Another One"/>
</BrightInputGroup>

<BrightInputGroup label="Comfortable Spacing (Default)" sub-label="There's a comfortable amount of margin below this group.">
    <BrightCheckbox id="comfortable1" label="Text Input"/>
    <BrightCheckbox id="comfortable2" label="Another One"/>
</BrightInputGroup>

<BrightInputGroup label="Tight Spacing" sub-label="There's a little bit of margin below this group." form-control="tight">
    <BrightCheckbox id="tight1" label="Text Input"/>
    <BrightCheckbox id="tight2" label="Another One"/>
</BrightInputGroup>

<BrightInputGroup label="No Spacing" sub-label="There's no margin below this group." form-control="none">
    <BrightCheckbox id="none1" label="Text Input"/>
    <BrightCheckbox id="none2" label="Another One"/>
</BrightInputGroup>
```

### Optional
To mark an **Input Group** as optional, use the `optional` property.

<div class="code-example-box">
    <BrightInputGroup label="Optional Input Group" optional>
        <BrightCheckbox id="optionalOption1" label="Text Input"/>
        <BrightCheckbox id="optionalOption2" label="Another One"/>
    </BrightInputGroup>
</div>

```vue{1}
<BrightInputGroup label="Optional Input Group" optional>
    <BrightCheckbox id="optionalOption1" label="Text Input"/>
    <BrightCheckbox id="optionalOption2" label="Another One"/>
</BrightInputGroup>
```

### Hide Meta Label
By default, a meta label will only appear on an optional **Input Group**. A required **Input Group** does not present a red asterisk.

<div class="code-example-box">
    <BrightInputGroup label="Required Input Group" subLabel="Not optional, but also not marked with a red asterisk.">
        <BrightCheckbox id="optionalOption1" label="Some Option"/>
        <BrightCheckbox id="optionalOption2" label="Another One"/>
    </BrightInputGroup>
</div>

```vue
    <BrightInputGroup label="Required Input Group" subLabel="Not optional, but also not marked with a red asterisk.">
        <BrightCheckbox id="optionalOption1" label="Some Option"/>
        <BrightCheckbox id="optionalOption2" label="Another One"/>
    </BrightInputGroup>
```

A red asterisk can be forced to appear by the **Input Group**'s label by explicitly setting the `hide-meta-label` to `false`.

<div class="code-example-box">
    <BrightInputGroup label='"Loudly" Required Input Group' subLabel="A red asterisk has been forced." :hide-meta-label="false">
        <BrightCheckbox id="optionalOption1" label="Some Option"/>
        <BrightCheckbox id="optionalOption2" label="Another One"/>
    </BrightInputGroup>
</div>

```vue{1}
    <BrightInputGroup label='"Loudly" Required Input Group' subLabel="A red asterisk has been forced." :hide-meta-label="false">
        <BrightCheckbox id="optionalOption1" label="Some Option"/>
        <BrightCheckbox id="optionalOption2" label="Another One"/>
    </BrightInputGroup>
```

## Related Reading
- [Input Compound](/bright-design-system/input-library/input-compound/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)

## API

### `BrightInputGroup` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputGroup label="Input Group">
        <div>Content goes here</div>
    </BrightInputGroup>
</div>

```vue
<BrightInputGroup label="Input Group">
    <div>Content goes here</div>
</BrightInputGroup>
```

### `BrightInputGroup` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) and [Fieldset Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#Attributes), the `BrightInputGroup` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [label](#label) | string | | | ✅ |
| [form-control](#form-control) | string | `loose` `comfortable` `tight` `none` | `comfortable` | |
| [hide-label](#hide-label) | boolean | | `false` | |
| [hide-sub-label](#hide-label) | boolean | | `false` | |
| [optional](#optional) | boolean | | `false` | |
| [hide-meta-label](#hide-meta-label) | boolean | `true` `false` `null` | `null` | |
| [size](#size) | string | `small` `medium` `large` | `medium` | |
| [sub-label](#sub-label) | string | | `""` | |