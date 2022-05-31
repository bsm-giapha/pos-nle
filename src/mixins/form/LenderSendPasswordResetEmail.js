import axios from "axios";
import { useLenderStore } from "@/stores/lender";

/**
 *  Use this to handle resetting a user's password.
 */
export const LenderSendPasswordResetEmail = {
    data() {
        return {
            isPopupShowing: false,
            isSendingEmail: false,
            isEmailSent: false,
            didEmailFailToSend: false,
        };
    },
    emits: ['close'],
    computed: {
        resourceURL() {
            const lender = useLenderStore();
            return `${lender.baseLenderURL}${this.source}/${this.userID}/send-password-reset-email`;
        },
        resetPasswordLabel() {
            if (this.isSendingEmail) {
                return 'Sending...';
            }
            if (this.isEmailSent) {
                return 'Email Sent';
            }
            if (this.didEmailFailToSend) {
                return 'Email Failed to Send';
            }
            return 'Reset Password?';
        },
    },
    methods: {
        resetAndShowPopup() {
            this.resetResetPasswordModal();
            this.isPopupShowing = true;
        },
        resetResetPasswordModal() {
            this.isSendingEmail = false;
            this.isEmailSent = false;
            this.didEmailFailToSend = false;
        },
        closePopup() {
            this.isPopupShowing = false;
            this.$emit('close');
        },
        sendResetPasswordEmail() {
            axios.post(this.resourceURL)
                .then(() => {
                    this.isEmailSent = true;
                }).catch((error) => {
                    console.error(error);
                    this.didEmailFailToSend = true;
                }).finally(() => {
                    this.isSendingEmail = false;
                });
            this.isSendingEmail = true;
        },
    },
};
