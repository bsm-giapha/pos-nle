# The Notification Tray

<div class="mb-16">
    <BrightTag color="purple" label="Overlay Library" href="/overlay-library/"/>
    <BrightTag color="purple" label="Introduced in Ardent v1.0"/>
</div>

<script>
import VuePressUIPlaygroundTheNotificationTray from './components/VuePressUIPlaygroundTheNotificationTray';
export default {
    components: {
        VuePressUIPlaygroundTheNotificationTray,
    },
}
</script>

Use the **Notification Tray** to display brief messages to a user.

<VuePressUIPlaygroundTheNotificationTray/>

## Best Practices

### When To Use
Use the **Notification Tray** to send alerts to a user after actions are performed. Users have the option of dismissing 
a single notification or letting it auto-dismiss after 4.5 seconds.

### Singleton Status
There should only ever be one instance of the **Notification Tray**. Notifications are not meant to be stacked on top of each other. 
You should expect to see a **Notification** pop up one at a time.

## Create A Notification
In order to create a **Notification** from anywhere, you need to import the `BrightNotificationFactory.js` module and use 
the included `BrightNotificationFactory.createNotification(object)` method as needed. 

The `BrightNotificationFactory.createNotification(object)` method accepts a **Notification** object. The schema for the 
object is the following:

```js
let object = {
    type: 'info', // This is the type of notification.
    icon: 'notifications', // You can reference the name of an Icon in our Icon Library.
    label: 'Borrower Completed Application', // This is a notification's main label.
    subLabel: 'Alice Firstimer has completed their application.', // This is a sub-label that goes under the main label. Use this as needed to provide more details about a notification.
    cta: 'Go to Loan', // This is the text displayed on the CTA button.
    duration: 4500, // The time in milliseconds that the notification will be displayed. It will be autodismissed after this time. By default, it's 4500 (4.5 seconds). 
    clickCallback: function(){alert('CTA was clicked.')}, // This is a function to execute if the notification CTA is clicked.
}
```
| Property | Type | Options | Default | Required |
| :- | :- | :- | :- | :-: | :-: | :-: |
| **type** | string | `info` `success` `error` | `info` | |
| **icon** | string | | `notifications` | |
| **label** | string | | | |
| **subLabel** | string | | | |
| **cta** | string | | | |
| **clickCallback** | function | | | |

## Accessibility
By default, all **Notifications** have the following accessibility properties and values automatically set:
- `role="alert"`
- `aria-live="polite"`

:::tip
Keep in mind that focus should not move to a **Notification**. If a **Notification** contains interactive content (like actions) 
that requires focus, consider using components like modals or popovers in order to provide those using assistive technologies
with the best possible user experience.
:::