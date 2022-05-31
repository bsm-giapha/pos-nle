# Popover

<script>
import VuePressPopoverMethodDemo from './VuePressPopoverMethodDemo.vue';
import VuePressUIPlaygroundPopover from './components/VuePressUIPlaygroundPopover.vue';
export default {
    components: {
        VuePressPopoverMethodDemo,
        VuePressUIPlaygroundPopover
    },
}
</script>

Use **Popovers** to attach a popover menu to an element.

<VuePressUIPlaygroundPopover/>


## Best Practices

### When To Use
Use **Popovers** to attach a popover menu to an element. **Popovers** can be used for a variety of use cases, including:
- Long-form descriptions (i.e. when [Tooltips](/bright-design-system/overlay-library/tooltip/) get too long).
- Small forms that relate to the source element.
- Quick modifications to fields or settings.

#### Popovers should be reasonably sized
Popovers should be reasonably sized and not occupy too much space on the screen. Unlike [Tooltips](/bright-design-system/overlay-library/tooltip/), Popovers do not have preset widths or dimensions and can be of any size. It's up to the designer / developer to define reasonable (and responsive) dimensions for a Popover.


## Anatomy
A **Popover** consists of its content and a source element. Although similar to [Tooltips](/bright-design-system/overlay-library/tooltip/) in appearance, **Popovers** are capable of housing more significant content and can be of any width or height.

### Popover Content
To define a **Popover's** content, use the named slot `popover`.

<div class="code-example-box">
    <BrightPopover>
        <template v-slot:popover>
            <div>
                <span class="__typography--heading--6 mb-0">Hey</span>
                <div class="mb-0">What's popping?</div>
            </div>
        </template>
        <BrightButton use="secondary">Click Me</BrightButton>
    </BrightPopover>
</div>

```vue{2-7}
<BrightPopover>
    <template v-slot:popover>
        <div>
            <span class="__typography--heading--6 mb-0">Hey</span>
            <div class="mb-0">What's popping?</div>
        </div>
    </template>
    <BrightButton use="secondary">Click Me</BrightButton>
</BrightPopover>
```

### Style Class
Use the `styleClass` property to attach classes to the Popover Menu itself.

<div class="code-example-box">
    <BrightPopover styleClass="text-green-500">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Popover Example</span>
                <ul class="mb-0">
                    <li>This is the first bullet point inside the popover.</li>
                    <li>This is the second bullet point inside the popover.</li>
                    <li>This is the third bullet point inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Lorem</BrightButton>
    </BrightPopover>
</div>

```vue{1}
<BrightPopover styleClass="text-green-500">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Popover Example</span>
            <ul class="mb-0">
                <li>This is the first bullet point inside the popover.</li>
                <li>This is the second bullet point inside the popover.</li>
                <li>This is the third bullet point inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Lorem</BrightButton>
</BrightPopover>
```

### Closable
To control whether or not to display a **Popover's** "close" button, use the `closable` property. By default, `closable` is set to `true`.

<div class="code-example-box">
    <BrightPopover closable=false arrow=false placement="bottom-start" styleClass="p-0">
        <template v-slot:popover>
            <div style="width: 250px">
                <ul class="list-none pl-0">
                    <li class="mt-18"><BrightButton use="tertiary" full-width class="text-left px-28">Menu Item #1</BrightButton></li>
                    <li><BrightButton use="tertiary" full-width class="text-left px-28">Menu Item #2</BrightButton></li>
                    <li><BrightButton use="tertiary" full-width class="text-left px-28">Menu Item #3</BrightButton></li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Menu</BrightButton>
    </BrightPopover>
</div>

```vue{1}
<BrightPopover closable=false arrow=false placement="bottom-start" styleClass="p-0">
    <template v-slot:popover>
        <div style="width: 250px">
            <ul class="list-none pl-0">
                <li class="mt-18"><BrightButton use="tertiary" full-width class="text-left px-28">Menu Item #1</BrightButton></li>
                <li><BrightButton use="tertiary" full-width class="text-left px-28">Menu Item #2</BrightButton></li>
                <li><BrightButton use="tertiary" full-width class="text-left px-28">Menu Item #3</BrightButton></li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Menu</BrightButton>
</BrightPopover>
```

### Show
Use the `show` property to close a **Popover** without calling [the `$_closePopover()` method](#brightpopover-methods).

### Arrow
To control the visibility of a **Popover's** arrow, use the `arrow` property. The `arrow` property is set to `true` by default.

<div class="code-example-box">
    <BrightPopover arrow=false>
        <template v-slot:popover>
            <div style="width: 300px">
                <span>This popover has no arrow.</span>
            </div>
        </template>
        <BrightButton use="secondary">Lorem</BrightButton>
    </BrightPopover>
</div>

```vue{1}
<BrightPopover arrow=false>
    <template v-slot:popover>
        <div style="width: 300px">
            <span>This popover has no arrow.</span>
        </div>
    </template>
    <BrightButton use="secondary">Lorem</BrightButton>
</BrightPopover>
```


## State

### Placement
There are 15 different placement options. By default, all **Popovers** open on top of their source element. If desired, **Popovers** can be positioned to the `bottom`, `left`, or `right` of their source element using the `placement` property.
**Popovers** can also be `auto` positioned. The **Popover** will then be placed on the side with the most space.

Each `placement` can accept an additional `-start` or `-end` variation.

A **Popover's** positioning will adapt based on the available screen space and may shift as a result. This ensures a user's screen size does not obstruct a **Popover's** information.

<div class="code-example-box">
    <BrightPopover placement="top-start">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Top-Start</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Top-Start</BrightButton>
    </BrightPopover>
    <BrightPopover placement="top">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Top (Default)</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Top</BrightButton>
    </BrightPopover>
    <BrightPopover placement="top-end">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Top-End</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Top-End</BrightButton>
    </BrightPopover>
    <br><br>
    <BrightPopover placement="bottom-start">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Bottom-Start</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Bottom-Start</BrightButton>
    </BrightPopover>
    <BrightPopover placement="bottom">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Bottom</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Bottom</BrightButton>
    </BrightPopover>
    <BrightPopover placement="bottom-end">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Bottom-End</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Bottom-End</BrightButton>
    </BrightPopover>
    <br><br>
    <BrightPopover placement="left-start">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Left-Start</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Left-Start</BrightButton>
    </BrightPopover>
    <BrightPopover placement="left">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Left</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Left</BrightButton>
    </BrightPopover>
    <BrightPopover placement="left-end">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Left-End</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Left-End</BrightButton>
    </BrightPopover>
    <br><br>
    <BrightPopover placement="right-start">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Right-Start</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Right-Start</BrightButton>
    </BrightPopover>
    <BrightPopover placement="right">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Right</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Right</BrightButton>
    </BrightPopover>
    <BrightPopover placement="right-end">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Right-End</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Right-End</BrightButton>
    </BrightPopover>
    <br><br>
    <BrightPopover placement="auto-start">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Auto-Start</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Auto-Start</BrightButton>
    </BrightPopover>
    <BrightPopover placement="auto">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Auto</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="secondary">Auto</BrightButton>
    </BrightPopover>
    <BrightPopover placement="auto-end">
        <template v-slot:popover>
            <div style="width: 200px">
                <span class="text-base font-bold">Auto-End</span>
                <ul class="mb-0">
                    <li>This is the information inside the popover.</li>
                </ul>
            </div>
        </template>
        <BrightButton use="primary">Auto-End</BrightButton>
    </BrightPopover>
</div>

```vue{1,12,23,35,46,57,69,80,91,103,114,125,137,148,159}
<BrightPopover placement="top-start">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Top-Start</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Top-Start</BrightButton>
</BrightPopover>
<BrightPopover placement="top">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Top (Default)</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Top</BrightButton>
</BrightPopover>
<BrightPopover placement="top-end">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Top-End</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Top-End</BrightButton>
</BrightPopover>
<br><br>
<BrightPopover placement="bottom-start">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Bottom-Start</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Bottom-Start</BrightButton>
</BrightPopover>
<BrightPopover placement="bottom">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Bottom</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Bottom</BrightButton>
</BrightPopover>
<BrightPopover placement="bottom-end">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Bottom-End</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Bottom-End</BrightButton>
</BrightPopover>
<br><br>
<BrightPopover placement="left-start">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Left-Start</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Left-Start</BrightButton>
</BrightPopover>
<BrightPopover placement="left">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Left</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Left</BrightButton>
</BrightPopover>
<BrightPopover placement="left-end">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Left-End</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Left-End</BrightButton>
</BrightPopover>
<br><br>
<BrightPopover placement="right-start">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Right-Start</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Right-Start</BrightButton>
</BrightPopover>
<BrightPopover placement="right">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Right</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Right</BrightButton>
</BrightPopover>
<BrightPopover placement="right-end">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Right-End</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Right-End</BrightButton>
</BrightPopover>
<br><br>
<BrightPopover placement="auto-start">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Auto-Start</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Auto-Start</BrightButton>
</BrightPopover>
<BrightPopover placement="auto">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Auto</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="secondary">Auto</BrightButton>
</BrightPopover>
<BrightPopover placement="auto-end">
    <template v-slot:popover>
        <div style="width: 200px">
            <span class="text-base font-bold">Auto-End</span>
            <ul class="mb-0">
                <li>This is the information inside the popover.</li>
            </ul>
        </div>
    </template>
    <BrightButton use="primary">Auto-End</BrightButton>
</BrightPopover>
```

### First Focused Element
Use the `firstFocusedElement` property to apply automatic focus to an element inside a **BrightPopover**. 
This property accepts the **id** of an element inside a **BrightPopover**.

If no `firstFocusedElement` value is specified, a **BrightPopover's** 'close' button will become the first element focused when it's opened using the **space** or **enter** keys.

<div class="code-example-box">
    <BrightPopover firstFocusedElement="firstFocusedElementTextInput2">
        <template v-slot:popover>
            <div style="width: 300px">
                <span class="__typography--heading--6">First Focused Element</span>
                <BrightInputText id="firstFocusedElementTextInput1" class="mt-8" label="Text Input 1"/>
                <BrightInputText id="firstFocusedElementTextInput2" label="Text Input 2"/>
            </div>
        </template>
        <BrightButton use="primary" label="focusedElement">Lorem</BrightButton>
    </BrightPopover>
</div>

```vue{1,5}
<BrightPopover firstFocusedElement="firstFocusedElementTextInput2">
    <template v-slot:popover>
        <div style="width: 300px">
            <span class="__typography--heading--6">First Focused Element</span>
            <BrightInputText id="firstFocusedElementTextInput1" class="mt-8" label="Text Input 1"/>
            <BrightInputText id="firstFocusedElementTextInput2" label="Text Input 2"/>
        </div>
    </template>
    <BrightButton use="primary" label="focusedElement">Lorem</BrightButton>
</BrightPopover>
```

### Disabled
Use the `disabled` property to prevent a **BrightPopover** from appearing at all.

Using a **BrightPopover** will be visible by default.

<div class="code-example-box">
    <BrightPopover disabled>
        <template v-slot:popover>
            <p>You won't be able to see this.</p>
        </template>
        <BrightButton use="primary" label="focusedElement">Click Me</BrightButton>
    </BrightPopover>
</div>

```vue{1}
<BrightPopover disabled>
    <template v-slot:popover>
        <p>You won't be able to see this.</p>
    </template>
    <BrightButton use="primary" label="focusedElement">Click Me</BrightButton>
</BrightPopover>
```


## Accessibility
By default, all **Popovers** have the following accessibility properties and values automatically set:

- `role="dialog"`

Be sure to add the appropriate accessibility markup for your use case. The common ARIA properties associated with a dialog are:
- [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute)
- [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute)


## API
### `BrightPopover` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<div class="code-example-box">
    <BrightPopover>
        <template v-slot:popover>
            <div style="width: 256px">This is a popover.</div>
        </template>
        <BrightButton use="secondary">Click Me</BrightButton>
    </BrightPopover>
</div>

```vue{1-6}
<BrightPopover>
    <template v-slot:popover>
        <div style="width: 256px">This is a popover.</div>
    </template>
    <BrightButton use="secondary">Click Me</BrightButton>
</BrightPopover>
```

### `BrightPopover` Slots
The `BrightPopover` component uses **2** slots.

- A `default` slot for the origination source
- A `popover` slot for the origination source's content `<template v-slot:popover>`

### `BrightPopover` Properties
In addition to the [Global HTML Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes), the `BrightPopover` component can receive the following properties.

| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [disabled](#disabled) | boolean | | `false` | |
| [closable](#closable) | boolean | | `true` | |
| [show](#show) | boolean | | `true` | |
| [arrow](#arrow) | boolean | | `true` | |
| [firstFocusedElement](#first-focused-element) | string | | `null` | |
| [placement](#placement) | string | `top-start` `top` `top-end`<br/><br/> `bottom-start` `bottom` `bottom-end`<br/><br/> `left-start` `left` `left-end`<br/><br/> `right-start` `right` `right-end`<br/><br/> `auto-start` `auto` `auto-end` | `top` | |
| [styleClass](#style-class) | string | | `""` | |

### `BrightPopover` Events
The `BrightPopover` component will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

<table>
    <tr style="font-weight: bold">
        <td>Event Name</td>
        <td>Trigger</td>
        <td>Returns</td>
    </tr>
    <tr>
        <td><code>popover:click-opened</code></td>
        <td>When the <strong>Popover</strong> is clicked opened.</td>
        <td>Nothing.</td>
    </tr>
    <tr>
        <td><code>popover:click-closed</code></td>
        <td>When the <strong>Popover</strong> is clicked closed.</td>
        <td>Nothing.</td>
    </tr>
    <tr>
        <td><code>popover:keydown-opened</code></td>
        <td>When the <strong>Popover</strong> is opened using the 'Enter' or 'Space' keys.</td>
        <td>Nothing.</td>
    </tr>
    <tr>
        <td><code>popover:keydown-closed</code></td>
        <td>When the <strong>Popover</strong> is closed using the 'Enter' or 'Space' keys.</td>
        <td>Nothing.</td>
    </tr>
</table>

### `BrightPopover` Methods
The `BrightPopover` component provides the following public-facing methods intended for use by developers. They can be accessed by assigning a [`ref`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements) to the component.

<table>
    <tr style="font-weight: bold">
        <td>Method Signature</td>
        <td>Description</td>
        <td>Returns</td>
    </tr>
    <tr>
        <td><code>$_openPopover()</code></td>
        <td>Opens the <strong>Popover</strong>.</td>
        <td><code>void</code></td>
    </tr>
    <tr>
        <td><code>$_closePopover()</code></td>
        <td>Closes the <strong>Popover</strong>.</td>
        <td><code>void</code></td>
    </tr>
    <tr>
        <td><code>$_togglePopover()</code></td>
        <td>Toggles the <strong>Popover</strong> (e.g. if it's closed, then it will open).</td>
        <td><code>void</code></td>
    </tr>
</table>

#### Method Playground
Here is a playground that demonstrates the usage of the `BrightPopover` Methods.

<VuePressPopoverMethodDemo/>

 <<< @/docs/bright-design-system/overlay-library//popover/VuePressPopoverMethodDemo.vue
 
 ### `BrightPopover` Refs
 The `BrightPopover` component has the following refs.
 
 | Ref | Element Type | Notes | 
 | :- | :- | :- |
 | <div class="inline-block" style="width: 128px">**popper**</div> | `<div>` | The popover menu / card. |
 | **close** | `<i>` | The popover close button. |
 | **arrow** | `<div>` | The popover arrow. |
 | **sourceElement** | `<div>` | The popover's source element. |