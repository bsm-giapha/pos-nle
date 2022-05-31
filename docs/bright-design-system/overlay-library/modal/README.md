# Modal

<div class="mb-16">
    <BrightTag color="purple" label="Overlay Library" href="/overlay-library/"/>
    <BrightTag color="purple" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundModalPopoutPopup from './components/VuePressUIPlaygroundModalPopoutPopup';
import VuePressModalPopoutDemo from './demos/VuePressModalPopoutDemo';
import VuePressModalPopupDemo from './demos/VuePressModalPopupDemo';
export default {
    components: {
        VuePressUIPlaygroundModalPopoutPopup,
        VuePressModalPopoutDemo,
        VuePressModalPopupDemo,
    },
}
</script>

Use **Modals** to inform users about specific tasks or critical information.

<VuePressUIPlaygroundModalPopoutPopup/>

## Best Practices

### When To Use
Use **Modals** to allow further interactivity of the page without navigating away from the current content in the browser.
There are two types of modals: [BrightModalPopouts](#popouts) and [BrightModalPopups](#popups).

- Use **BrightModalPopouts** to extend the interface without directing the user to a new page. This is often used for more complex tasks.
- Use **BrightModalPopups** for simple tasks, critical information, or destructive actions.

## Structure
### Show
Use the `show` property to control the modal's display state. Ideally, the developer will need to set up the source element's Event handlers that are responsible for toggling this property.

To set this up, consider the following code that handles the `show` property:

<VuePressModalPopupDemo/>

<<< @/docs/bright-design-system/overlay-library//modal/demos/VuePressModalPopupDemo.vue

### Close Label
Use the `close-label` property change the default verbiage of "Close" for a **Modal's** Close button. This is used in the Footer slot to populate the default button that closes the modal.

### Close Focus ID
Use the `close-focus-id` property to identify a **Modal's** source element. This is used when maintaining accessibility. When a **Modal** is closed, it will lead the user back to the source that triggered the **Modal** open.

## Styling

### Close Button Type
Use the `close-button-type` property to set the style of the **Modal's** close button. Options are `primary`, `secondary`, and `tertiary`, with `primary` being the default.

Refer to the <a href="/bright-design-system/core-library/button/" target="_blank">Button's</a> `use` property for more information.


### Width
Use the `width` property to control the width of a **Modal**. This is the width and max-width of the Modal. Options include `large`, `medium`, or `small` with `small` being the default width.

### Invert Labels
Use the `invert-labels` property to invert the layout of a Label and Sub-Label. This will cause the **Sub-Label** to be on top of the **Label**.

### Breakpoint Header Left
Use the `breakpoint-header-left` property to determine when (if at all) a **Modal's** Left Header should be on its own line.

Refer to the <a href="/layout-library/card/#header" target="_blank">Card's</a> `breakpoint-header-left` property for more information.

### Breakpoint Header Right
Use the `breakpoint-header-right` property to determine when (if at all) a **Modal's** Right Header should be on its own line.

Refer to the <a href="/layout-library/card/#header" target="_blank">Card's</a> `breakpoint-header-right` property for more information.

## Popouts
**BrightModalPopouts** extend the user interface without directing the user to a new page. This is often used for more complex tasks.

### From
Use the `from` property to specify which side a **BrightModalPopout** will emerge from. There are 2 possible options: `left` and `right`.
Mobile-sized screens will always originate from the bottom unless the `disable-mobile-breakpoint` property is set to **true**.

### Disable Mobile Breakpoint
If the `disable-mobile-breakpoint` property is set to **true**, a **BrightModalPopout** coming from the left will come out of the left on mobile as well.
If it's set to **false**, this will cause the **BrightModalPopout** to come from the bottom on mobile.

### Simple Mode
It's possible to have a **Simple Popout** that does not have many of the default styling that come with Popouts. This is useful when you want to create a different type of layout for a Popout (e.g. a navigation sidebar) Use the `simple` property to enable **Simple Mode**. 

Be aware of the following changes when using **Simple Mode**:
- The only properties that work are:
    - `id`
    - [`show`](#show)
    - [`from`](#from)
    - [`disable-mobile-breakpoint`](#disable-mobile-breakpoint)
- Only the `default` slot is available. [All other slots](#modal-slots) are not available.
- You must provide your own content for the **Popout**, including width and accessibility.

## Popups
**BrightModalPopups** are used for simple tasks, critical information, or destructive actions.

## Related Reading
- [Card](/bright-design-system/layout-library/card/)

## API
### `BrightModalPopout` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<VuePressModalPopoutDemo/>

<<< @/docs/bright-design-system/overlay-library//modal/demos/VuePressModalPopoutDemo.vue

### `BrightModalPopup` Minimum Required Template (MRT)
Copy and paste the below code snippet to get this component in your codebase with minimal effort.

<VuePressModalPopupDemo/>

<<< @/docs/bright-design-system/overlay-library//modal/demos/VuePressModalPopupDemo.vue

### Modal Slots
Both the `BrightModalPopout` and the `BrightModalPopup` components have **six** slots.

:::tip
The `BrightModalPopout` and the `BrightModalPopup` components utilize the same `media`, `left`, `center`, and `right` slots as the Card component.
Refer to the <a href="/layout-library/card/#brightcard-slots" target="_blank">Card</a> slot documentation for all available slots and examples.
:::

- A `media` slot for the Media section of a **Modal**
- A `left` slot for the Left section of a **Modal's** Left Header
- A `center` slot for the Center section of a **Modal's** Center Header
- A `right` slot for the Right section of a **Modal's** Right Header
- A `default` slot for the Body of a **Modal**
- A `footer` slot for the Footer section

:::tip Note to Developers:
If anything is placed inside the Footer slot, then you will have to provide your own Close button and listen for the closed Event.
:::

:::warning
[Simple Popouts](#simple-mode) only have a `default` slot.
:::

### Shared Properties
The `BrightModalPopout` and `BrightModalPopup` components share the following properties:

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| id | string | | | ✅ |
| label | string | | `""` | |
| sub-label | string | | `""` | |
| [invert-labels](#invert-labels) | boolean | `true` `false` | `false` | |
| [show](#show) | boolean | `true` `false` | `false` | |
| [width](#width) | string | `large` `medium` `small` | `small` | |
| [close-label](#close-label) | string | | `close` | |
| [close-focus-id](#close-focus-id) | string | | | ✅ |
| [breakpoint-header-left](#breakpoint-header-left) | string | `never` `tablet` `always` | `never` | |
| [breakpoint-header-right](#breakpoint-header-right) | string | `never` `tablet` `always` | `never` | |

### BrightModalPopout Properties
The `BrightModalPopout` component has 2 additional properties:

| <div style="width: 180px">Property</div> | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: |
| [from](#from) | string | `left` `right` | `right` | |
| [disable-mobile-breakpoint](#disable-mobile-breakpoint) | boolean | `true` `false` | `false` | |
| [simple](#simple-mode) | boolean | `true` `false` | `false` | |

### Modal Events
The `BrightModalPopout` and `BrightModalPopup` components will emit the following events. You can listen for them and respond accordingly in your Vue components that incorporate this component.

| Event Name | Trigger | Returns | 
| :- | :- | :- |
| `closed` | When a **Modal** is closed. | |
