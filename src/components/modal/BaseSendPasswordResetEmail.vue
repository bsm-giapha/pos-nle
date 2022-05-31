<template>
    <BrightModalPopup
        id="resetPasswordModal"
        close-focus-i-d="resetPasswordButton"
        :label="resetPasswordLabel"
        :show="isPopupShowing"
        @closed="closePopup"
    >
        <BrightRow>
            <BrightColumn>
                <div class="text-center">
                    <div v-show="!isSendingEmail && !isEmailSent && !didEmailFailToSend">
                        A password reset email will be sent to {{ userEmail }}.
                    </div>
                    <div v-show="isEmailSent">A password reset email has successfully been sent to {{ userEmail }}.</div>
                    <div v-show="didEmailFailToSend">Please contact customer support.</div>
                </div>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none">
            <BrightColumn class="text-center">
                <BrightLoader :is-loading="isSendingEmail"/>
                <BrightIcon v-show="isEmailSent" class="text-h1 text-green-500" use="check_circle"/>
                <BrightIcon v-show="didEmailFailToSend" class="text-h1 text-yellow-500" use="report_problem"/>
                <BrightButton
                    v-show="!isSendingEmail && !isEmailSent && !didEmailFailToSend"
                    class="mt-16 -mb-8"
                    full-width
                    use="primary"
                    @click="sendResetPasswordEmail"
                    @keydown.space.enter="sendResetPasswordEmail"
                >
                    Reset Password
                </BrightButton>
            </BrightColumn>
        </BrightRow>
    </BrightModalPopup>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow.vue";
import { LenderSendPasswordResetEmail } from "@/mixins/form/LenderSendPasswordResetEmail.js";

export default {
    name: "BaseSendPasswordResetEmail",
    components: {
        BrightButton,
        BrightColumn,
        BrightIcon,
        BrightLoader,
        BrightModalPopup,
        BrightRow,
    },
    mixins: [LenderSendPasswordResetEmail],
    props: {
        source: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            default: "",
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        showModal: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    watch: {
        showModal: {
            handler: function(newValue) {
                if (newValue) {
                    this.resetAndShowPopup();
                } else {
                    this.closePopup();
                }
            },
        },
    },
};
</script>
