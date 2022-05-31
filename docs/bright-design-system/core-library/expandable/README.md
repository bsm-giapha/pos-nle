# Expandable

<div class="mb-16">
    <BrightTag color="blue" label="Core Library" href="/core-library/"/>
    <BrightTag color="blue" label="Introduced in Ardent v1.0"/>
</div>

Use **Expandables** when you want the ability to show and hide supplementary content.

## Anatomy
**Expandables** consist of a header and a container of additional content. When an **Expandable** is toggled into an 'opened' state, the container of additional content will be revealed. 

## Styling
An **Expandable** can be styled in CSS by passing the traditional styling properties (such as `padding`, `border`, and `color`) into the `class` attribute. 
Styling for an **Expandable's** header and content can be overridden by applying the classes directly onto the element itself.

<div class="code-example-box">
    <BrightExpandable id="stylingExample1" class="border border-grey-300 p-8 text-blue-500">
        <template v-slot:header>
            <span class="font-bold">Expandable 1</span>
        </template>
        <div class="tablet:flex tablet:flex-row tablet:m-8 text-black">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dui quam. Quisque tempor cursus metus, eleifend bibendum purus bibendum nec. Sed quis dui et arcu fringilla tristique. Aliquam erat volutpat. Phasellus sodales enim justo, eget pharetra diam scelerisque quis. Donec convallis a quam non sollicitudin. Nunc varius odio ac risus consectetur, vel egestas massa interdum. Quisque consectetur, massa ut maximus maximus, ligula velit tristique leo, in aliquam sapien velit ut leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus mauris felis, vestibulum a pharetra a, fermentum quis metus.</p>
        </div>
    </BrightExpandable>
    <BrightExpandable id="stylingExample2" class="border border-grey-300 p-8 text-blue-500">
        <template v-slot:header>
            <span class="font-bold">Expandable 2</span>
        </template>
        <div class="tablet:flex tablet:flex-row tablet:m-8 text-black">
            <p>Aenean placerat enim a nisi vehicula gravida. Morbi non felis sed metus fringilla vulputate ac vitae tellus. Vestibulum id magna ullamcorper, fringilla justo nec, congue urna. Nulla facilisi. Quisque ac sagittis eros. Fusce pellentesque, sapien vel euismod lobortis, ipsum tortor dignissim ipsum, eu feugiat felis tortor sit amet ipsum. Integer ut tortor dapibus, ultrices justo eget, feugiat libero. In consequat, ipsum quis ultrices accumsan, felis felis ornare nunc, a luctus enim metus ut turpis. Duis vel faucibus odio. Fusce elit dolor, efficitur nec varius et, consequat eu sem.</p>
        </div>
    </BrightExpandable>
    <BrightExpandable id="stylingExample3" class="border border-grey-300 p-8 text-blue-500">
        <template v-slot:header>
            <span class="font-bold">Expandable 3</span>
        </template>
        <div class="tablet:flex tablet:flex-row tablet:m-8 text-black">
            <p>Nunc rutrum, urna et malesuada congue, ex eros elementum nisl, dictum congue risus nunc eget sapien. Nullam facilisis tellus vitae velit faucibus pellentesque. Nullam rutrum aliquet ligula at maximus. In eu imperdiet ipsum, eget finibus justo. Praesent sodales, magna eu facilisis auctor, nisi ante varius purus, at faucibus nisi enim nec nibh. Curabitur id commodo orci, nec placerat metus. Vestibulum ac urna sit amet risus tempus tempus. Aenean a euismod tellus. Phasellus condimentum mi sit amet blandit mollis. Quisque efficitur tincidunt orci in auctor. Ut rutrum dui nec lectus iaculis suscipit eget a sem. Suspendisse at dictum lectus, quis aliquam lectus.</p>
        </div>
    </BrightExpandable>
</div>

```vue {2,5,8,14,17,20,26,29,32}
<!-- This expandable gets its border, padding, and text color from the parent container. -->
<BrightExpandable id="stylingExample1" class="border border-grey-300 p-8 text-blue-500">
    <template v-slot:header>
        <!-- The expandable header has a class that changes it to bold text. -->
        <span class="font-bold">Expandable 1</span>
    </template>
    <!-- The expandable content has classes that modify its positioning, margin, and text color. -->
    <div class="tablet:flex tablet:flex-row tablet:m-8 text-black">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dui quam. Quisque tempor cursus metus, eleifend bibendum purus bibendum nec. Sed quis dui et arcu fringilla tristique. Aliquam erat volutpat. Phasellus sodales enim justo, eget pharetra diam scelerisque quis. Donec convallis a quam non sollicitudin. Nunc varius odio ac risus consectetur, vel egestas massa interdum. Quisque consectetur, massa ut maximus maximus, ligula velit tristique leo, in aliquam sapien velit ut leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus mauris felis, vestibulum a pharetra a, fermentum quis metus.</p>
    </div>
</BrightExpandable>

<!-- This expandable gets its border, padding, and text color from the parent container. -->
<BrightExpandable id="stylingExample2" class="border border-grey-300 p-8 text-blue-500">
    <template v-slot:header>
        <!-- The expandable header has a class that changes it to bold text. -->
        <span class="font-bold">Expandable 2</span>
    </template>
    <!-- The expandable content has classes that modify its positioning, margin, and text color. -->
    <div class="tablet:flex tablet:flex-row tablet:m-8 text-black">
        <p>Aenean placerat enim a nisi vehicula gravida. Morbi non felis sed metus fringilla vulputate ac vitae tellus. Vestibulum id magna ullamcorper, fringilla justo nec, congue urna. Nulla facilisi. Quisque ac sagittis eros. Fusce pellentesque, sapien vel euismod lobortis, ipsum tortor dignissim ipsum, eu feugiat felis tortor sit amet ipsum. Integer ut tortor dapibus, ultrices justo eget, feugiat libero. In consequat, ipsum quis ultrices accumsan, felis felis ornare nunc, a luctus enim metus ut turpis. Duis vel faucibus odio. Fusce elit dolor, efficitur nec varius et, consequat eu sem.</p>
    </div>
</BrightExpandable>

<!-- This expandable gets its border, padding, and text color from the parent container. -->
<BrightExpandable id="stylingExample3" class="border border-grey-300 p-8 text-blue-500">
    <template v-slot:header>
        <!-- The expandable header has a class that changes it to bold text. -->
        <span class="font-bold">Expandable 3</span>
    </template>
    <!-- The expandable content has classes that modify its positioning, margin, and text color. -->
    <div class="tablet:flex tablet:flex-row tablet:m-8 text-black">
        <p>Nunc rutrum, urna et malesuada congue, ex eros elementum nisl, dictum congue risus nunc eget sapien. Nullam facilisis tellus vitae velit faucibus pellentesque. Nullam rutrum aliquet ligula at maximus. In eu imperdiet ipsum, eget finibus justo. Praesent sodales, magna eu facilisis auctor, nisi ante varius purus, at faucibus nisi enim nec nibh. Curabitur id commodo orci, nec placerat metus. Vestibulum ac urna sit amet risus tempus tempus. Aenean a euismod tellus. Phasellus condimentum mi sit amet blandit mollis. Quisque efficitur tincidunt orci in auctor. Ut rutrum dui nec lectus iaculis suscipit eget a sem. Suspendisse at dictum lectus, quis aliquam lectus.</p>
    </div>
</BrightExpandable>
```

## Expanded

Use the `expanded` property to open an **Expandable** by default.

<div class="code-example-box">
    <BrightExpandable id="expanded" expanded>
        <template v-slot:header>
            <span class="font-bold">Loan Amount</span>
        </template>
        <div class="tablet:flex tablet:flex-row">
            <BrightDropdownSelect
                id="expandedCondition"
                label="Condition"
                :options="[
                    { label: 'Greater than', value: 'greater', selected: true },
                    { label: 'Equal to', value: 'equal' },
                    { label: 'Less than', value: 'less' },
                ]"
                :menu-full-width="true"
                class="tablet:flex-grow tablet:mr-16"
            />
            <BrightInputNumber id="expandedValue" label="Value" class="tablet:flex-grow"/>
        </div>
    </BrightExpandable>
</div>

```vue {1}
<BrightExpandable id="expanded" expanded>
    <template v-slot:header>
        <span class="font-bold">Loan Amount</span>
    </template>
    <div class="tablet:flex tablet:flex-row">
        <BrightDropdownSelect
            id="expandedCondition"
            label="Condition"
            :options="[
                { label: 'Greater than', value: 'greater', selected: true },
                { label: 'Equal to', value: 'equal' },
                { label: 'Less than', value: 'less' },
            ]"
            :menu-full-width="true"
            class="tablet:flex-grow tablet:mr-16"
        />
        <BrightInputNumber id="expandedValue" label="Value" class="tablet:flex-grow"/>
    </div>
</BrightExpandable>
```

## Hide Arrow

Use the `hide-arrow` property to hide an **Expandable** header's arrow. 

<div class="code-example-box">
    <BrightExpandable id="hideArrow" hide-arrow>
        <template v-slot:header>
            <strong>Click for more information.</strong>
        </template>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id posuere turpis, a rutrum est. Quisque vehicula ante nulla, sit amet sollicitudin odio gravida ut. Sed non purus sapien. Vivamus mi ligula, cursus id enim vel, volutpat aliquet nibh. Proin porta ornare arcu, nec sodales tortor tristique nec. Donec bibendum magna at dolor mollis dapibus. Cras ac nisi sapien. Aenean id leo a diam pellentesque molestie. Praesent tempus turpis vitae tincidunt dictum. Nullam hendrerit nibh at lacinia tincidunt. Sed accumsan dignissim rutrum. Vivamus rutrum est neque, nec ullamcorper magna condimentum quis. Morbi vitae turpis ut turpis ultrices ornare. Vestibulum sed lorem eget lectus sodales sollicitudin. Donec nec justo arcu.</p>
    </BrightExpandable>
</div>

```vue {1}
<BrightExpandable id="hideArrow" hide-arrow>
    <template v-slot:header>
        <strong>Click for more information.</strong>
    </template>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id posuere turpis, a rutrum est. Quisque vehicula ante nulla, sit amet sollicitudin odio gravida ut. Sed non purus sapien. Vivamus mi ligula, cursus id enim vel, volutpat aliquet nibh. Proin porta ornare arcu, nec sodales tortor tristique nec. Donec bibendum magna at dolor mollis dapibus. Cras ac nisi sapien. Aenean id leo a diam pellentesque molestie. Praesent tempus turpis vitae tincidunt dictum. Nullam hendrerit nibh at lacinia tincidunt. Sed accumsan dignissim rutrum. Vivamus rutrum est neque, nec ullamcorper magna condimentum quis. Morbi vitae turpis ut turpis ultrices ornare. Vestibulum sed lorem eget lectus sodales sollicitudin. Donec nec justo arcu.</p>
</BrightExpandable>
```

## Arrow Size

Use the `arrow-size` property to adjust the size of an **Expandable** header's arrow. This property accepts pixel `number` values, as well as, the standard `large` (32px), `medium` (24px), `small` (16px) sizing.

<div class="code-example-box">
    <BrightExpandable id="customArrowSize" arrow-size=50>
        <template v-slot:header>
            <span class="font-bold text-h3">Number Range</span>
        </template>
        <div class="tablet:flex tablet:flex-row">
            <BrightInputNumber id="customArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
            <BrightInputNumber id="customArrowSizeTo" label="To" class="tablet:flex-grow"/>
        </div>
    </BrightExpandable>
    <div class="mb-16"/>
    <BrightExpandable id="largeArrowSize" arrow-size="large">
        <template v-slot:header>
            <span class="font-bold text-h4">Number Range</span>
        </template>
        <div class="tablet:flex tablet:flex-row">
            <BrightInputNumber id="largeArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
            <BrightInputNumber id="largeArrowSizeTo" label="To" class="tablet:flex-grow"/>
        </div>
    </BrightExpandable>
    <div class="mb-16"/>
    <BrightExpandable id="mediumArrowSize" arrow-size="medium">
        <template v-slot:header>
            <span class="font-bold text-h5">Number Range</span>
        </template>
        <div class="tablet:flex tablet:flex-row">
            <BrightInputNumber id="mediumArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
            <BrightInputNumber id="mediumArrowSizeTo" label="To" class="tablet:flex-grow"/>
        </div>
    </BrightExpandable>
    <div class="mb-16"/>
    <BrightExpandable id="smallArrowSize" arrow-size="small">
        <template v-slot:header>
            <span class="font-bold text-h6">Number Range</span>
        </template>
        <div class="tablet:flex tablet:flex-row">
            <BrightInputNumber id="smallArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
            <BrightInputNumber id="smallArrowSizeTo" label="To" class="tablet:flex-grow"/>
        </div>
    </BrightExpandable>
</div>

```vue {1,11,21,31}
<BrightExpandable id="customArrowSize" arrow-size=50>
    <template v-slot:header>
        <span class="font-bold text-h3">Number Range</span>
    </template>
    <div class="tablet:flex tablet:flex-row">
        <BrightInputNumber id="customArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
        <BrightInputNumber id="customArrowSizeTo" label="To" class="tablet:flex-grow"/>
    </div>
</BrightExpandable>
<div class="mb-16"/>
<BrightExpandable id="largeArrowSize" arrow-size="large">
    <template v-slot:header>
        <span class="font-bold text-h4">Number Range</span>
    </template>
    <div class="tablet:flex tablet:flex-row">
        <BrightInputNumber id="largeArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
        <BrightInputNumber id="largeArrowSizeTo" label="To" class="tablet:flex-grow"/>
    </div>
</BrightExpandable>
<div class="mb-16"/>
<BrightExpandable id="mediumArrowSize" arrow-size="medium">
    <template v-slot:header>
        <span class="font-bold text-h5">Number Range</span>
    </template>
    <div class="tablet:flex tablet:flex-row">
        <BrightInputNumber id="mediumArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
        <BrightInputNumber id="mediumArrowSizeTo" label="To" class="tablet:flex-grow"/>
    </div>
</BrightExpandable>
<div class="mb-16"/>
<BrightExpandable id="smallArrowSize" arrow-size="small">
    <template v-slot:header>
        <span class="font-bold text-h6">Number Range</span>
    </template>
    <div class="tablet:flex tablet:flex-row">
        <BrightInputNumber id="smallArrowSizeFrom" label="From" class="tablet:flex-grow tablet:mr-16"/>
        <BrightInputNumber id="smallArrowSizeTo" label="To" class="tablet:flex-grow"/>
    </div>
</BrightExpandable>
```

## Accessibility
By default, all **Expandables** have the following accessibility properties and values automatically set:
- `role="region"`
- `aria-disabled="false"` - (For the **Expandable** header)
- `aria-controls` - (For the **Expandable** header) _Value depends on your **Expandable's** id name_
- `aria-expanded` - (For the **Expandable** header) _Value depends on the expanded state_
- `aria-labelledby` - (For the **Expandable** content) _Value depends on your **Expandable's** id name_

## API

### `BrightExpandable` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightExpandable id="expandableMRT">
        <template v-slot:header>
            <span>Expandable Header</span>
        </template>
        <p>Expandable content.</p>
    </BrightExpandable>
</div>

```vue {1-6}
<BrightExpandable id="expandableMRT">
    <template v-slot:header>
        <span>Expandable Header</span>
    </template>
    <p>Expandable content.</p>
</BrightExpandable>
```

### `BrightExpandable` Slots
The `BrightExpandable` component uses **2** slots.

- A `header` slot for the expandable's header `<template v-slot:header>`
- A `default` slot for the expandable's content

### `BrightExpandable` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightExpandable` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| id | string | | `true` | |
| [expanded](#expanded) | boolean | | `false` | |
| [hide-arrow](#hide-arrow) | boolean | | `false` | |
| [arrow-size](#arrow-size) | number, string | `large` `medium` `small`<br/> or any number that references a pixel size (i.e. `20`) | `medium` | |