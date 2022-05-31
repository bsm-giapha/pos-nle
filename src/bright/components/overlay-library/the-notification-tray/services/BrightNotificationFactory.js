export default class BrightNotificationFactory {
    createNotification(object) {
        //Create the event
        let event = new CustomEvent("BrightNotificationCreate", { "detail": object });

        //Dispatch/Trigger/Fire the event
        window.dispatchEvent(event);
    }
}
