<template>
    <div class="bg-white">
        <BrightBanner
            type="info"
            announcement
            label="This is a TESTING environment, do not supply your personal information on any pages contained on this site.
Please contact your lending institution for details where to complete your loan application."
        />
        <div class="AppPagePadding mx-auto" style="max-width: 512px;">
            <div v-if="!formWasSuccessfullySubmitted">
                <div class="__typography--heading--4 text-center">
                    Forgot Your Password?
                </div>
                <div class="__typography--label--s font-secondary text-grey-600 text-center">
                    Don't worry; it happens to the best of us. Just provide your email address and we'll send you an email to reset your password.
                </div>
                <BrightInputText
                    id="email"
                    v-model="email"
                    class="my-20"
                    placeholder="Email address"
                    hide-label
                    label="Email"
                />
                <div v-if="errorMessage" class="text-red-600 text-center my-20">
                    {{ errorMessage }}
                </div>
                <div class="flex">
                    <BrightButton
                        use="primary"
                        class="w-1/2 mr-4"
                        :disabled="disableForm"
                        @click="submit"
                        @keydown.enter.space.prevent
                    >
                        Send Email
                    </BrightButton>
                    <BrightButton use="secondary" class="w-1/2 ml-4" @click="$router.push({ name: 'Login', params: { lenderId: lenderId } })">
                        Cancel
                    </BrightButton>
                </div>
            </div>
            <div v-else class="text-center">
                <div class="__typography--heading--4">
                    Check Your Email Inbox
                </div>
                <div class="__typography--label--s font-secondary text-grey-600 my-20">
                    An email was sent to your inbox. Please follow the instructions in the email to reset your password.
                </div>
                <BrightButton use="primary" class="mx-auto w-1/2" @click="$router.push({ name: 'Login', params: { lenderId: lenderId, prefilledEmail: email } })">
                    Login
                </BrightButton>
            </div>
        </div>
    </div>
</template>

<script>
import BrightBanner from "@/bright/components/layout-library/banner/BrightBanner.vue";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import { getCookie } from "@/helpers/CookieHelper.js";
import axios from "axios";

export default {
    name: "ForgotPassword",
    components: { BrightButton, BrightInputText, BrightBanner },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.formWasSuccessfullySubmitted = false;
        });
    },
    props: {
        lenderId: {
            type: String,
            required: false,
            default: getCookie('bsm-lenderPublicID'),
        },
        prefilledEmail: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            disableForm: false,
            email: this.prefilledEmail,
            errorMessage: '',
            formWasSuccessfullySubmitted: false,
        };
    },
    watch: {
        prefilledEmail: function(newValue) {
            this.email = newValue;
        },
    },
    methods: {
        submit() {
            const request = {
                email: this.email.trim(),
                lenderID: this.lenderId,
            };

            this.disableForm = true;
            axios.post('/forgot-password', request).then(() => {
                this.errorMessage = '';
                this.formWasSuccessfullySubmitted = true;
            }).catch((error) => {
                console.error(error);
                this.errorMessage = error.response.data.message;
            }).finally(() => {
                this.disableForm = false;
            });
        },
    },
};
</script>
