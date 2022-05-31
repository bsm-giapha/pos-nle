import axios from "axios";
import { useLenderStore } from '@/stores/modules/lender/lenderStore';
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
const _BrightNotificationFactory = new BrightNotificationFactory();

// Configure global axios settings
// axios.defaults.withCredentials = true; // Allows cookies to be set from cross-origin server
axios.defaults.baseURL = import.meta.env.VITE_SERVER_API;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.response.use(function (response) {
    return response; // A successful response; don't do anything to it and return it as-is
}, function (error) { // An error. We can handle global errors here.
    const whitelistedURLs = [
        '/functions/session-ping', // Session Ping is exempt because it will always throw a CORS issue on its first attempt if the User doesn't have a Session yet.
    ];
    const detailedErrorMessage = error.toJSON();
    const requestURL = detailedErrorMessage.config.url;

    const currentLender = useLenderStore.publicLenderID ?? null;
    const loginUrl = currentLender ? '/login/' + 'currentLender' : '/login/';

    if (detailedErrorMessage.message === 'Network Error') { // Likely a CSRF/CORS issue
        if (!whitelistedURLs.includes(requestURL)) {
            window.location.replace(loginUrl);
        }
    } else if (error.response) {
        switch (error.response.status) {
            case 401: // User isn't logged-in and trying to access a page behind the SPA. Direct the user to the login page.
                if (!whitelistedURLs.includes(requestURL)) {
                    // window.location.replace(loginUrl);
                }
                break;
            case 429: // Too Many Requests
                _BrightNotificationFactory.createNotification({
                    type: 'error',
                    icon: 'warning',
                    duration: 10000,
                    label: 'Too Many Requests',
                    subLabel: 'It appears as though you\'re making too many requests to the server. Please wait a minute before continuing. If this issue persists, please contact technical support.',
                });
                break;
            case 500: // Server error. Show a generic modal.
                _BrightNotificationFactory.createNotification({
                    type: 'error',
                    icon: 'warning',
                    duration: 10000,
                    label: 'Internal Server Error',
                    subLabel: 'There was a server-side problem; please refresh the page and try again. If this issue persists, please contact technical support.',
                });
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
});
