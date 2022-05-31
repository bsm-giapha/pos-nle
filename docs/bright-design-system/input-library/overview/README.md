# Overview
With the exception of [Forms](/bright-design-system/input-library/form/), [Input Compounds](/bright-design-system/input-library/input-compound/), and [Input Groups](/bright-design-system/input-library/input-group/), all components in the **Input Library** share common properties and behaviors. This page focuses on documenting the commonality between them and their differences when applicable. This page is considered essential reading for any developer using the **Input Library**.

<script>
import VuePressVModelInputsOverviewDemo from './components/VuePressVModelInputsOverviewDemo.vue';
export default {
    components: {
        VuePressVModelInputsOverviewDemo
    }
}
</script>

## Common Input Behavior

Although different in many ways, nearly all of the **Inputs** have the following common behavior:

- Support the standard [Global HTML Attributes and Input Attributes](#global-html-attributes).
- Are wrapped in a [Form Control](#form-control), which is a `<div>` that provides uniform vertical spacing between other **Inputs**.
- Have a [Label](#labels-sub-labels), which is a `<label>` that is bound to the primary `<input>` element.
- Support granular [Input Validation](#input-validation), which allows for state-driven highlighting and validation messages on a per-input basis.
- Are required in a [Form](../form) unless marked as [Optional Inputs](#optional) with the [`optional`](#optional) property.
- Support the [`v-model` directive](#v-model-support) for two-way data binding.
- Have a width equal to the width of their container.
- Have [common properties](#common-input-properties) amongst each other.

### Global HTML Attributes
All [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) and [Input Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) can be used with **Inputs**. With the [exception](#on-class-and-style-global-attributes-merging) of `class` and `style`, these attributes will be transferred to the main `<input>` element of an **Input**.

<div class="code-example-box">
    <BrightInputText
        id="globalHTMLAttributeExample"
        label="This Input Component has a data-attribute"
        placeholder="Inspect this <input> element to see for yourself"
        data-my-custom-data-attribute="Notice how this data-attribute isn't on other nearby elements. Just this one."
    />
</div>

```vue
<BrightInputText
    id="globalHTMLAttributeExample"
    label="This Input Component has a data-attribute"
    placeholder="Inspect this <input> element to see for yourself"
    data-my-custom-data-attribute="Notice how this data-attribute isn't on other nearby elements. Just this one."
/>
```

#### On Class and Style Global Attributes (Merging)
The `class` and `style` attributes have a special merging behavior in Vue, as documented [here](https://vuejs.org/v2/guide/class-and-style.html#With-Components).

If a `class` or `style` attribute is used in an **Input**, then the attribute values will be merged together with the **Root Component's** internal class and style list. They will be put **before** the **Root Component's** internal class and style list. In most cases, the **Root Component** of an **Input** is its [Form Control](#form-control).

::: tip
If you need to pass classes directly to an **Input's** primary `<input>` element, then use the [`inputClass`](#input-class) property. Classes passed through this property will be put **before** the `<input>`'s internal class list.
:::

<div class="code-example-box">
    <BrightInputText
        id="classMergingExample"
        class="containerClass anotherContainerClass"
        style="border-top: 1px dashed pink"
        input-class="myClass anotherClass"
        label="The root container of this Input Component has 2 user-defined classes and 1 user-defined style"
        subLabel="Additionally, the main <input> element has 2 unique classes of its own."
        placeholder="Inspect this <input> element to see for yourself"
    />
</div>

```vue
<BrightInputText
    id="classMergingExample"
    class="containerClass anotherContainerClass"
    style="border-top: 1px dashed pink"
    input-class="myClass anotherClass"
    label="The root container of this Input Component has 2 user-defined classes and 1 user-defined style"
    subLabel="Additionally, the main <input> element has 2 unique classes of its own."
    placeholder="Inspect this <input> element to see for yourself"
/>
```

### Form Control
All **Inputs** are wrapped in a **Form Control** container, which is a `div` that provides uniform spacing between other **Inputs**. This uniformity results in highly consistent and visually pleasing form layouts.

**Form Controls** are automatically added to all **Inputs** and adjusted to match an **Input's** [`size`](#size) property.

Additionally, it's possible to control (or disable) an **Input's Form Control** using the [`form-control`](#form-control-property) property.

### Labels & Sub-Labels
All **Inputs** have a [Label](#label) that is automatically paired to their main `<input>` element. This is required to meet accessibility and usability standards.

Optionally, an **Input** can have a [Sub-Label](#sub-label) that can provide further guidance or information to a user.

<div class="code-example-box">
    <BrightInputText
        id="labelExample"
        label="Label Example"
        placeholder="This input has a label."
    />
    <BrightInputText
        id="subLabelExample"
        label="Label Example"
        sub-label="Sub-Label Example"
        placeholder="This input has a label AND a sub-label."
    />
</div>

```vue
<BrightInputText
    id="labelExample"
    label="Label Example"
    placeholder="This input has a label."
/>

<BrightInputText
    id="subLabelExample"
    label="Label Example"
    sub-label="Sub-Label Example"
    placeholder="This input has a label AND a sub-label."
/>
```

### Input Validation
All **Inputs** (except [Input Lists](/bright-design-system/input-library/input-list/)) support granular **Input Validation**. This allows for an **Input** to be highlighted in red or green when an error or success validation occurs. This allows the user to clearly see an error or success message, which results in a better user experience.

See also: [Validation Message](#validation-message) and [Validation Type](#validation-type).

<div class="code-example-box">
    <BrightInputText
        id="inputValidationExampleError"
        label="Error Input"
        validation-type="error"
        validation-message="This is required. We really need this to continue."
    />
    <BrightInputText
        id="inputValidationExampleSuccess"
        label="Success Input"
        validation-type="success"
        validation-message="Good job! I don't know what you did, but you did great. You're the best."
    />
</div>

```vue
<BrightInputText
    id="inputValidationExampleError"
    label="Error Input"
    validation-type="error"
    validation-message="This is required. We really need this to continue."
/>

<BrightInputText
    id="inputValidationExampleSuccess"
    label="Success Input"
    validation-type="success"
    validation-message="Good job! I don't know what you did, but you did great. You're the best."
/>
```

### `v-model` Support
All **Inputs** support the `v-model` directive, which allows two-way data binding for reactive interfaces. Each **Input** has their own API documentation regarding `v-model` support, so reference accordingly as needed. See below for an example using the [Text Input](/bright-design-system/input-library/text/) component.

<div class="code-example-box">
    <VuePressVModelInputsOverviewDemo/>
</div>

 <<< @/docs/bright-design-system/input-library/overview/components/VuePressVModelInputsOverviewDemo.vue

## Common Input Properties
In addition to the standard [Global HTML Attributes and Input Attributes](#global-html-attributes), all **Inputs** can receive a number of **common properties**.

| Property | Type | Options | Default | Required |
| :-       | :-   | :-      | :-      | :-:      |
| [id](#id) | string | | | ✅ |
| [label](#label) | string | | | ✅ |
| [hide-label](#hide-labels) | boolean | | `false` | |
| [hide-meta-label](#hide-meta-label) | boolean | | `false` | |
| [hide-sub-label](#hide-labels) | boolean | | `false` | |
| [form-control](#form-control) | string | `loose` `comfortable` `tight` `none` | `comfortable` | |
| [input-class](#input-class) | string | | `null` | |
| [optional](#optional) | boolean | | `false` | |
| [rounded](#rounded) | boolean | | `false` | |
| [size](#size) | string | `small` `medium` `large` | `medium` | |
| [sub-label](#sub-label) | string | | `null` | |
| [validation-message](#validation-message) | string | | `null` | |
| [validation-type](#validation-type) | string | `none` `error` `success` | `none` | |

### Required Properties
The following properties are required on all [Inputs](#input-components).

#### ID
Use the `id` property to specify the value of the `id` attribute for an **Input**. This is a required property on all **Inputs**.

Just like the attribute it emulates, the value of an **Input's** `id` property must be **unique** in a page.

::: tip
The value of the `id` property will be used as the value of the [`name`](#name) property by default **if** a value was not assigned to the [`name`](#name) property.
:::

<div class="code-example-box">
    <BrightInputText
        id="idExample"
        label="ID Example"
        sub-label="This input has an `id` attribute equal to 'idExample'."
        placeholder="Additionally, the `name` attribute is equal to 'idExample' as well."
    />
</div>

```vue
<BrightInputText
    id="idExample"
    label="ID Example"
    sub-label="This input has an `id` attribute equal to 'idExample'."
    placeholder="Additionally, the `name` attribute is equal to 'idExample' as well."
/>
```

#### Label
Use the `label` property to specify the **Label** that is used to describe an **Input**. This is a required property on all **Inputs**.

**Labels** should be short, to the point, and use common language. If an **Input** requires further description, then consider using [Sub-Labels](#sub-label).

**Developer Note:** A `<label>` element is automatically created for an **Input** with a value equal to the **Input's** `label` property and a `for` attribute equal to the **Input's** [`id`](#id) property.

See also: [Sub-Labels](#sub-label).

<div class="code-example-box">
    <BrightInputText
        id="labelExample2"
        label="Label Example"
        placeholder="This input has a label."
    />
</div>

```vue
<BrightInputText
    id="labelExample2"
    label="Label Example"
/>
```


### Bright Properties
The following properties are unique to **Bright** and are available on all [Inputs](#input-components). The only exception is the `rounded` property, which is available on some **Inputs**.

#### Hide Labels
There are some cases where you'll need to hide an Input's label (or sub-label). To do so, use the `hide-label` and `hide-sub-label` properties respectively.

:::tip An exception for Input Lists
Because of how they're commonly used in forms, [Input Lists](/bright-design-system/input-library/input-list/) hide their labels (and sub-labels) by default. They can be shown again by passing `false` to `hide-label` and `hide-sub-label` respectively.
:::

<div class="code-example-box">
    <BrightInputText
        id="hideLabelExample"
        label="You can't see this"
        sub-label="You can't see this either"
        placeholder="The labels are only hidden and will remain accessible to screen-readers"
        hide-label
        hide-sub-label
    />
</div>

```vue{6-7}
<BrightInputText
    id="hideLabelExample"
    label="You can't see this"
    sub-label="You can't see this either"
    placeholder="The labels are only hidden and will remain accessible to screenreaders"
    hide-label
    hide-sub-label
/>
```

#### Hide Meta Label
Most **inputs**' labels can denote whether the input is required or optional. Use the `hide-meta-label` to control this behavior.

:::tip An exception for Switches
[Switch](/input-library/switch/)
:::

<div class="code-example-box">
    <BrightInputText
        id="hiddenMetaLabel"
        label='"Quietly" Required Input'
        placeholder="This input is required, but the red asterisk is hidden."
        hide-meta-label
    />
    <BrightInputText
        id="hiddenOptionalMetaLabel"
        label="Optional labels can be hidden too"
        placeholder='This input is optional, but the label does not say "(optional)"'
        optional
        hide-meta-label
    />
</div>

```vue {5,12}
<BrightInputText
    id="hiddenMetaLabel"
    label='"Quietly" Required Input'
    placeholder="This input is required, but the red asterisk is hidden."
    hide-meta-label
/>
<BrightInputText
    id="hiddenOptionalMetaLabel"
    label="Optional labels can be hidden too"
    placeholder='This input is optional, but the label does not say "(optional)"'
    optional
    hide-meta-label
/>
```

#### Form Control (property)
By default, all **Inputs** have a moderately spaced [Form Control](#form-control) that adds spacing between other [Inputs](#input-components) and compatible components. To change the spacing or disable it, use the `form-control` property.

<div class="code-example-box">
    <BrightInputText
        id="formControlLoose"
        label="Loose Spacing"
        placeholder="There's quite a bit of margin below this input."
        form-control="loose"
    />
    <BrightInputText
        id="formControlComfortable"
        class="border-t border-blue-500"
        label="Comfortable Spacing (Default)"
        placeholder="There's a comfortable amount of margin below this input."
    />
    <BrightInputText
        id="formControlTight"
        class="border-t border-blue-500"
        label="Tight Spacing"
        placeholder="There's a little bit of margin below this input."
        form-control="tight"
    />
    <BrightInputText
        id="formControlNone"
        class="border-t border-blue-500"
        label="No Spacing"
        placeholder="There's no margin below this input."
        form-control="none"
    />
</div>

```vue{5,20,28}
<BrightInputText
    id="formControlLoose"
    label="Loose Spacing"
    placeholder="There's quite a bit of margin below this input."
    form-control="loose"
/>

<BrightInputText
    id="formControlComfortable"
    class="border-t border-blue-500"
    label="Comfortable Spacing (Default)"
    placeholder="There's a comfortable amount of margin below this input."
/>

<BrightInputText
    id="formControlTight"
    class="border-t border-blue-500"
    label="Tight Spacing"
    placeholder="There's a little bit of margin below this input."
    form-control="tight"
/>

<BrightInputText
    id="formControlNone"
    class="border-t border-blue-500"
    label="No Spacing"
    placeholder="There's no margin below this input."
    form-control="none"
/>
```

#### Input Class
As mentioned in [On Class and Style Global Attributes (Merging)](#on-class-and-style-global-attributes-merging), the `class` attribute will apply classes to the **Root Container** in most cases. 

Use the `input-class` property to pass classes directly to an **Input's** primary `<input>` element. Classes passed through this property will be put **before** the `<input>`'s internal class list.

<div class="code-example-box">
    <BrightInputText
        id="inputClassExample"
        input-class="myClass anotherClass"
        label="Input Class Example"
        subLabel="The classes `myClass` and `anotherClass` are on the main <input> element."
        placeholder="Inspect this <input> element to see for yourself."
    />
</div>

```vue
<BrightInputText
    id="inputClassExample"
    input-class="myClass anotherClass"
    label="Input Class Example"
    subLabel="The classes `myClass` and `anotherClass` are on the main <input> element."
    placeholder="Inspect this <input> element to see for yourself."
/>
```

#### Optional
By default, all **Inputs** are required in a **Form**. This is a reasonable default because most **Forms** have more required **Inputs** than optional **Inputs**.

Use the `optional` property if you want to mark an **Input** as optional. 

<div class="code-example-box">
    <BrightInputText
        id="optionalExample"
        label="Optional Example"
        placeholder="Notice the (optional) text appended to the Label."
        optional
    />
    <BrightInputText
        id="optionalExample2"
        label="Optional Example with Sub Label"
        sub-label="This one has a sub-label."
        placeholder="Notice the (optional) text appended to the Label."
        optional
    />
</div>

```vue
<BrightInputText
    id="optionalExample"
    label="Optional Example"
    placeholder="Notice the (optional) text appended to the Label."
    optional
/>

<BrightInputText
    id="optionalExample2"
    label="Optional Example with Sub Label"
    sub-label="This one has a sub-label."
    placeholder="Notice the (optional) text appended to the Label."
    optional
/>
```

#### Rounded
Use the `rounded` property if you want a smooth rounded look for an **Input**.

:::warning Not All Inputs Can Be Rounded
The following **Inputs** can't be rounded:
- [Checkboxes](/bright-design-system/input-library/checkbox/)
- [Radio Groups](/bright-design-system/input-library/radio-group/)
- [Switches](/bright-design-system/input-library/switch/)
- [Input Lists](/bright-design-system/input-library/input-list/)
:::

<div class="code-example-box">
    <BrightInputText
        id="textRounded"
        label="Rounded Input"
        placeholder="This can be used in layouts seeking a different look."
        rounded
    />
</div>

```vue
<BrightInputText
    id="textRounded"
    label="Rounded Input"
    placeholder="This can be used in layouts seeking a different look."
    rounded
/>
```

#### Size
By default, all **Inputs** have a medium size with uniform padding and margins. This is a reasonable default that works well in most layouts on large and small screens. 

Use the `size` property to manually specify the size of an **Input** if a smaller or larger size is desired.

::: tip THE BRIGHT WAY
Prefer using the same `size` property value across all **Inputs** in a [Form](#form). Inconsistent usage of the `size` property in the same layout must be deliberate and carefully balanced from a design standpoint.
:::

:::warning Not All Inputs Support Sizing
The following **Inputs** don't support sizing:
- [Input Lists](/bright-design-system/input-library/input-list/)
:::

<div class="code-example-box">
    <BrightInputText
        id="sizeLargeExample"
        label="Large Input"
        placeholder="This is a large input."
        size="large"
    />
    <BrightInputText
        id="sizeMediumExample"
        label="Medium Input (default)"
        placeholder="This is a medium input."
    />
    <BrightInputText
        id="sizeSmallExample"
        label="Small Input"
        placeholder="This is a small input."
        size="small"
    />
</div>

```vue
<BrightInputText
    id="sizeLargeExample"
    label="Large Input"
    placeholder="This is a large input."
    size="large"
/>

<BrightInputText
    id="sizeMediumExample"
    label="Medium Input (default)"
    placeholder="This is a medium input."
/>

<BrightInputText
    id="sizeSmallExample"
    label="Small Input"
    placeholder="This is a small input."
    size="small"
/>
```

#### Sub-Label
Use the `sub-label` property to specify the **Sub-Label** that is used to provide further guidance or information to a user regarding an **Input**.

**Sub-Labels** should be contextually relevant and brief in length.

See also: [Labels](#label).

<div class="code-example-box">
    <BrightInputText
        id="subLabelExample2"
        label="Sub-Label Example"
        sub-label="This input has a sub-label."
    />
</div>

```vue
<BrightInputText
    id="subLabelExample2"
    label="Sub-Label Example"
    sub-label="This input has a sub-label."
/>
```

#### Validation Message
As mentioned in [Input Validation](#input-validation), all **Inputs** can receive granular **Input Validation**.

In conjunction with the [`validation-type`](#validation-type) property, use the `validation-message` property to output a **Validation Message** to the user in close proximity to an **Input**.

:::warning Not All Inputs Support Validation
The following **Inputs** don't support validation:
- [Input Lists](/bright-design-system/input-library/input-list/)
:::

<div class="code-example-box">
    <BrightInputText
        id="successValidationMessageExample"
        label="Successful Validation Message Example"
        validation-type="success"
        validation-message="This is a successful validation message."
    />
    <BrightInputText
        id="errorValidationMessageExample"
        label="Error Validation Message Example"
        validation-type="error"
        validation-message="This is an error validation message."
    />
</div>

```vue
<BrightInputText
    id="successValidationMessageExample"
    label="Successful Validation Message Example"
    validation-type="success"
    validation-message="This is a successful validation message."
/>

<BrightInputText
    id="errorValidationMessageExample"
    label="Error Validation Message Example"
    validation-type="error"
    validation-message="This is an error validation message."
/>
```

#### Validation Type
As mentioned in [Input Validation](#input-validation), all **Inputs** can receive granular **Input Validation**.

In conjunction with the [`validation-message`](#validation-message) property, use the `validation-type` property to show an error or successful validation to the user.

::: tip
Validation can be disabled by setting the `validation-type` property to `none`.
:::

:::warning Not All Inputs Support Validation
The following **Inputs** don't support validation:
- [Input Lists](/bright-design-system/input-library/input-list/)
:::

<div class="code-example-box">
    <BrightInputText
        id="noValidationTypeExample"
        label="No Validation Type Example"
        validation-type="none"
        validation-message="This message won't show because the `validation-type` property is set to 'none'."
    />
    <BrightInputText
        id="successValidationTypeExample"
        label="Successful Validation Type Example"
        validation-type="success"
        validation-message="This is a successful validation message."
    />
    <BrightInputText
        id="errorValidationTypeExample"
        label="Error Validation Type Example"
        validation-type="error"
        validation-message="This is an error validation message."
    />
</div>

```vue
<BrightInputText
    id="noValidationTypeExample"
    label="No Validation Type Example"
    validation-type="none"
    validation-message="This message won't show because the `validation-type` property is set to 'none'."
/>

<BrightInputText
    id="successValidationTypeExample"
    label="Successful Validation Type Example"
    validation-type="success"
    validation-message="This is a successful validation message."
/>

<BrightInputText
    id="errorValidationTypeExample"
    label="Error Validation Type Example"
    validation-type="error"
    validation-message="This is an error validation message."
/>
```