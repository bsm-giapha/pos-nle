# Input Compound

<div class="mb-16">
    <BrightTag color="pink" label="Input Library" href="/input-library/"/>
    <BrightTag color="pink" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundInputCompound from './components/VuePressUIPlaygroundInputCompound.vue';
export default {
    components: {
        VuePressUIPlaygroundInputCompound,
    },
}
</script>

Use **Input Compounds** to create a compound input out of two or more inputs.

<VuePressUIPlaygroundInputCompound/>

## Best Practices

### When To Use
Use **Input Compounds** as needed to compose a hybrid component from two or more components. Treat **Input Compounds** like "glue" in the sense that they glue two or more components together.

### Input Group vs. Input Compound
[Input Groups](/bright-design-system/input-library/input-group/) and **Input Compounds** are similar in many capacities, but they have their differences and preferred use cases.

Use **Input Compounds** when:
- You need two or more inputs to appear joined together.
- The inputs that you are joining are [compatible](#component-compatibility) components.

In all other cases, use [Input Groups](/bright-design-system/input-library/input-group/).

### Component Compatibility
Technically, **any** component or HTML can be used with the **Input Compound** component because it is essentially a CSS container with no functionality of its own. Having said that, the **Input Compound** component was intended to group **Inputs** together and thus should be used exclusively for this purpose.

The following components have been evaluated and optimized to work with the **Input Compound** component:

- [Email](/bright-design-system/input-library/email/)
- [Number](/bright-design-system/input-library/number/)
- [Password](/bright-design-system/input-library/password/)
- [Select-Dropdown (Single-Select only)](/bright-design-system/input-library/select-dropdown/)
- [Text](/bright-design-system/input-library/text/)

In the future, more components will be added to this compatibility list.

## Structure
Like [Input Groups](/bright-design-system/input-library/input-group/), **Input Compounds** are semantically `<fieldset>` and `<legend>` elements that group inputs. To be explicit, the HTML structure for an **Input Compound** is the following:

```html
<fieldset>
    <legend>Label (and optionally a Sub-Label)</legend>
    <div>
        <slot>Content</slot>
    </div>
</fieldset>
```

This semantic structure is ideal for accessibility and form design.

### Label
Use the `label` property to assign a primary label to an **Input Compound**. This is a required property.

<div class="code-example-box">
    <BrightInputCompound id="labelExample" label="Label">
        <BrightInputText id="labelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="labelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{1}
<BrightInputCompound id="labelExample" label="Label">
    <BrightInputText id="labelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="labelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### Sub-Label
Use the `sub-label` property to assign a secondary label to an **Input Compound**.

<div class="code-example-box">
    <BrightInputCompound id="subLabelExample" label="Label" sub-label="Sub Label">
        <BrightInputText id="subLabelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="subLabelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{1}
<BrightInputCompound id="subLabelExample" label="Label" sub-label="Sub Label">
    <BrightInputText id="subLabelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="subLabelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### Validation
Like [Inputs](/bright-design-system/input-library/overview/#input-validation), **Input Compounds** can receive granular **Input Validation**, albeit with some differences.

:::warning Setting Up Granular Validation
**Input Compounds** can only control themselves and **do not** change their children's validation properties. This means that their children's `validation-type` will need to be set on the appropriate child(ren) for granular validation to work correctly. See the example below for a visual.
:::

<div class="code-example-box">
    <BrightInputCompound
        id="validationExample"
        label="Validation Example"
        validation-type="error"
        validation-message="Uh oh. Something is wrong with the highlighted red input."
    >
        <BrightInputText
            id="validationExample1"
            class="flex-1"
            label="Text 1"
            form-control="none"
        />
        <BrightInputText
            id="validationExample2"
            class="flex-1"
            label="Text 2"
            form-control="none"
            validation-type="error"
        />
        <BrightInputText
            id="validationExample3"
            class="flex-1"
            label="Text 3"
            form-control="none"
        />
    </BrightInputCompound>
</div>

```vue{4-5,18}
<BrightInputCompound
    id="validationExample"
    label="Validation Example"
    validation-type="error"
    validation-message="Uh oh. Something is wrong with the highlighted red input."
>
    <BrightInputText
        id="validationExample1"
        class="flex-1"
        label="Text 1"
        form-control="none"
    />
    <BrightInputText
        id="validationExample2"
        class="flex-1"
        label="Text 2"
        form-control="none"
        validation-type="error"
    />
    <BrightInputText
        id="validationExample3"
        class="flex-1"
        label="Text 3"
        form-control="none"
    />
</BrightInputCompound>
```

## Styling

### Important Styling Considerations
The **Input Compound** component is one of the few components in the **Bright Component Library** that is not very opinionated. Beyond useful CSS styling, it does not exert any control over its children. It is meant to be a facilitator to help solve problems; it is not the full solution itself. It is up to the developer to connect the dots and arrive at the solution.

Keeping this in mind, the following should be observed when using **Input Compounds**:
- Unless you have a good reason not to, always set `form-control="none"` in child Inputs.
- Be mindful of the [`display-class`](#display-class) property and its default value (flex).
- Always remember to set an appropriate display class for child Inputs.
- Think of mobile responsiveness and whether or not you'll need to define styles at screen breakpoints.

### Display Class
By default, all **Input Compounds** have a CSS `display` value of `flex`. This is useful for automatically spacing out Inputs.

If a different type of display is desired, then use the `displayClass` prop to override this flex behavior and provide unique display options. If this prop is used in coordination with child Input classes, it's possible to have a wide range of mobile responsiveness and other unique layouts.

:::tip
Although this property is called `displayClass`, it's not controlling the CSS `display` value of the **Input Compound**; it's actually a direct binding to the `class` attribute of the `<div>` parent container of the `<slot>`. This means that you can pass **any** classes here to the parent container. The name of the property comes from its intended usage: to affect the display of the container.
:::

<div class="code-example-box">
    <BrightInputCompound
        id="displayClassExample"
        label="Display Classes are cool"
        sub-label="This is technically mobile responsive. Try resizing the screen."
        display-class="block tablet:flex"
    >
        <BrightInputText id="displayClassExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="displayClassExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{5}
<BrightInputCompound
    id="displayClassExample"
    label="Display Classes are cool"
    sub-label="This is technically mobile responsive. Try resizing the screen."
    display-class="block tablet:flex"
>
    <BrightInputText id="displayClassExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="displayClassExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### Size
Use the `size` property to change the text size of an **Input Compound's** label and sub-label.

The `size` property accepts the string values `small`, `medium`, or `large`.

By default, all **Input Compounds** have a size of `medium`.

:::warning Size Will Not Pass to Children
Because **Input Compounds** do not modify their children's properties, the `size` property will not pass to children. Child **Inputs** will need to have their `size` property set appropriately to (ideally) match their parent **Input Compound**.
:::

<div class="code-example-box">
    <BrightInputCompound
        id="smallExample"
        label="Small Input Compound"
        sub-label="Remember to set the child Inputs' `size` property to match."
        size="small"
    >
        <BrightInputText id="smallExampleText1" class="flex-1" label="Text 1" form-control="none" size="small"/>
        <BrightInputText id="smallExampleText2" class="flex-1" label="Text 2" form-control="none" size="small"/>
    </BrightInputCompound>
    <BrightInputCompound
        id="mediumExample"
        label="Medium Input Compound (default)"
        sub-label="This is the default size in most cases, so you shouldn't need to explicitly set the child Inputs' `size` property."
    >
        <BrightInputText id="mediumExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="mediumExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
    <BrightInputCompound
        id="largeExample"
        label="Large Input Compound"
        sub-label="Remember to set the child Inputs' `size` property to match."
        size="large"
    >
        <BrightInputText id="largeExampleText1" class="flex-1" label="Text 1" form-control="none" size="large"/>
        <BrightInputText id="largeExampleText2" class="flex-1" label="Text 2" form-control="none" size="large"/>
    </BrightInputCompound>
</div>

```vue{5,24}
<BrightInputCompound
    id="smallExample"
    label="Small Input Compound"
    sub-label="Remember to set the child Inputs' `size` property to match."
    size="small"
>
    <BrightInputText id="smallExampleText1" class="flex-1" label="Text 1" form-control="none" size="small"/>
    <BrightInputText id="smallExampleText2" class="flex-1" label="Text 2" form-control="none" size="small"/>
</BrightInputCompound>

<BrightInputCompound
    id="mediumExample"
    label="Medium Input Compound (default)"
    sub-label="This is the default size in most cases, so you shouldn't need to explicitly set the child Inputs' `size` property."
>
    <BrightInputText id="mediumExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="mediumExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>

<BrightInputCompound
    id="largeExample"
    label="Large Input Compound"
    sub-label="Remember to set the child Inputs' `size` property to match."
    size="large"
>
    <BrightInputText id="largeExampleText1" class="flex-1" label="Text 1" form-control="none" size="large"/>
    <BrightInputText id="largeExampleText2" class="flex-1" label="Text 2" form-control="none" size="large"/>
</BrightInputCompound>
```

### Hide Label

#### Hide Compound Label

By default, an **Input Compound** will have a visible label (and sub-label).

To hide an **Input Compound's** label (and sub-label), use the `hide-compound-label` property. This can be used to group Inputs without showing the label while still remaining accessible for screenreaders.

<div class="code-example-box">
    <BrightInputCompound
        id="hideCompoundLabelExample"
        label="Hidden label"
        sub-label="Hidden sub-label. Why would you want to do this? I'm sure there's a use-case somewhere, but it's probably really rare. It took 5 minutes to implement, so I figured, 'What's the harm? Someone might need this someday.' If you happen to be the poor soul who needs this prop, you're welcome."
        hide-compound-label
    >
        <BrightInputText id="hideCompoundLabelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="hideCompoundLabelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{5}
<BrightInputCompound
    id="hideCompoundLabelExample"
    label="Hidden label"
    sub-label="Hidden sub-label. Why would you want to do this? I'm sure there's a use-case somewhere, but it's probably really rare. It took 5 minutes to implement, so I figured, 'What's the harm? Someone might need this someday.' If you happen to be the poor soul who needs this prop, you're welcome."
    hide-compound-label
>
    <BrightInputText id="hideCompoundLabelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="hideCompoundLabelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

#### Hide Input Labels

By default, an **Input Compound's** child ([Inputs](/bright-design-system/input-library/overview/#input-components) will have hidden labels (and sub-labels). This is reasonable in most cases when you're building a compound input.

It's possible to show the child [Inputs'](/bright-design-system/input-library/overview/#input-components) labels (and sub-labels) with the `hide-input-labels` prop.

<div class="code-example-box">
    <BrightInputCompound
        id="hideInputLabelExample"
        label="Label"
        :hide-input-labels="false"
    >
        <BrightInputText id="hideInputLabelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="hideInputLabelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{4}
<BrightInputCompound
    id="hideInputLabelExample"
    label="Label"
    :hide-input-labels="false"
>
    <BrightInputText id="hideInputLabelExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="hideInputLabelExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### Form Control
Like [Inputs](/bright-design-system/input-library/overview/#input-components), all **Input Compounds** have a moderately spaced [Form Control](/bright-design-system/input-library/overview/#form-control) that adds spacing between other [Inputs](/bright-design-system/input-library/overview/#input-components) and **Input Groups**. To change the spacing or disable it, use the `form-control` property.

:::warning Form Control Will Not Pass To Children
Because **Input Compounds** do not modify their children's properties, the `form-control` property will not pass to children. Child **Inputs** will need to have their `form-control` property set appropriately to (ideally) match their parent **Input Compound**.
:::

<div class="code-example-box">
    <BrightInputCompound id="formControlExample1" label="Loose Spacing" sub-label="There's quite a bit of margin below this group." form-control="loose">
        <BrightInputText id="formControlExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="formControlExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
    <BrightInputCompound id="formControlExample2" label="Comfortable Spacing (Default)" sub-label="There's a comfortable amount of margin below this group.">
        <BrightInputText id="formControlExampleText3" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="formControlExampleText4" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
    <BrightInputCompound id="formControlExample3" label="Tight Spacing" sub-label="There's a little bit of margin below this group." form-control="tight">
        <BrightInputText id="formControlExampleText5" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="formControlExampleText6" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
    <BrightInputCompound id="formControlExample4" label="No Spacing" sub-label="There's no margin below this group." form-control="none">
        <BrightInputText id="formControlExampleText7" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="formControlExampleText8" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{1,6,11,16}
<BrightInputCompound id="formControlExample1" label="Loose Spacing" sub-label="There's quite a bit of margin below this group." form-control="loose">
    <BrightInputText id="formControlExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="formControlExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>

<BrightInputCompound id="formControlExample2" label="Comfortable Spacing (Default)" sub-label="There's a comfortable amount of margin below this group.">
    <BrightInputText id="formControlExampleText3" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="formControlExampleText4" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>

<BrightInputCompound id="formControlExample3" label="Tight Spacing" sub-label="There's a little bit of margin below this group." form-control="tight">
    <BrightInputText id="formControlExampleText5" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="formControlExampleText6" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>

<BrightInputCompound id="formControlExample4" label="No Spacing" sub-label="There's no margin below this group." form-control="none">
    <BrightInputText id="formControlExampleText7" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="formControlExampleText8" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### Optional
To mark an **Input Compound** as optional, use the `optional` property.

<div class="code-example-box">
    <BrightInputCompound
        id="optionalExample"
        label="This is optional"
        optional
    >
        <BrightInputText id="optionalExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="optionalExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{4}
<BrightInputCompound
    id="optionalExample"
    label="This is optional"
    optional
>
    <BrightInputText id="optionalExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="optionalExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### Rounded
To make an **Input Compound** rounded, use the `rounded` property.

<div class="code-example-box">
    <BrightInputCompound
        id="roundedExample"
        label="This is rounded"
        sub-label="Notice how the Inputs inside of this Input Compound are also rounded. Wow."
        rounded
    >
        <BrightInputText id="roundedExampleText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="roundedExampleText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue{5}
<BrightInputCompound
    id="roundedExample"
    label="This is rounded"
    sub-label="Notice how the inputs inside of this Input Compound are also rounded. Wow."
    rounded
>
    <BrightInputText id="roundedExampleText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="roundedExampleText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

## Related Reading
- [Input Group](/bright-design-system/input-library/input-group/)
- [Inputs Overview](/bright-design-system/input-library/overview/)
- [Input Library](/bright-design-system/input-library/)

## API

### `BrightInputCompound` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightInputCompound
        id="compound"
        label="Compound"
        sub-label="Remember to set the children's display class and set their `form-control` prop to 'none'"
    >
        <BrightInputText id="compoundText1" class="flex-1" label="Text 1" form-control="none"/>
        <BrightInputText id="compoundText2" class="flex-1" label="Text 2" form-control="none"/>
    </BrightInputCompound>
</div>

```vue
<BrightInputCompound
    id="compound"
    label="Compound"
    sub-label="Remember to set the children's display class and set their `form-control` prop to 'none'"
>
    <BrightInputText id="compoundText1" class="flex-1" label="Text 1" form-control="none"/>
    <BrightInputText id="compoundText2" class="flex-1" label="Text 2" form-control="none"/>
</BrightInputCompound>
```

### `BrightInputCompound` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) and [Fieldset Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#Attributes), the `BrightInputCompound` component can receive the following **properties**.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [id](#id) | string | | | ✅ |
| [label](#label) | string | | | ✅ |
| [displayClass](#display-class) | string | a space-delimited format like `"class1 class2 class3 etc"` | `flex` | |
| [form-control](#form-control) | string | `loose` `comfortable` `tight` `none` | `comfortable` | |
| [hide-compound-label](#hide-compound-label) | boolean | | `false` | |
| [hide-input-labels](#hide-input-labels) | boolean | | `true` | |
| [optional](#optional) | boolean | | `false` | |
| [rounded](#rounded) | boolean | | `false` | |
| [size](#size) | string | `small` `medium` `large` | `medium` | |
| [sub-label](#sub-label) | string | | `""` | |
| [validation-message](#validation) | string | | `null` | |
| [validation-type](#validation) | string | `none` `error` `success` | `null` | |