# Overlay Library

<script>
import VuePressModalPopoutDemo from './modal/demos/VuePressModalPopoutDemo';
import VuePressModalPopupDemo from './modal/demos/VuePressModalPopupDemo';
import VuePressTheNotificationTrayDemo from './the-notification-tray/demos/VuePressTheNotificationTrayDemo';
export default {
    components: {
        VuePressModalPopoutDemo,
        VuePressModalPopupDemo,
        VuePressTheNotificationTrayDemo,
    },
}
</script>

The **Overlay Library** consists of components that are commonly found on top of other components (i.e. overlayed). 

## Modal
Use [Modals](/bright-design-system/overlay-library/modal/) to inform users about specific tasks or critical information.

<VuePressModalPopoutDemo/>
<VuePressModalPopupDemo/>
<br>

## Popover
Use [Popovers](/bright-design-system/overlay-library/popover/) to attach a popover menu to an element.

<div>
    <BrightPopover>
        <template v-slot:popover>
            <div style="width:300px">
                <BrightInputText
                    id="examplePopover"
                    label="Your favorite restaurant"
                    sub-label="Where do you go the most? Be honest."
                    placeholder="(e.g. Chipotle)"
                />
            </div>
        </template>
        <BrightButton use="primary">Click Me</BrightButton>
    </BrightPopover>
</div>
<br>

## The Notification Tray
Use the [Notification Tray](/bright-design-system/overlay-library/the-notification-tray/) to display brief messages to a user.

<VuePressTheNotificationTrayDemo/>
<br>

## Tooltip
Use [Tooltips](/bright-design-system/overlay-library/tooltip/) to attach a short, descriptive tooltip to an element.

<div>
    <BrightTooltip
        title="Important Information"
        text="This is the information."
        placement="top"
    >
        <a href="#tooltip">Hover over me</a>
    </BrightTooltip>
</div>