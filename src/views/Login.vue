<template>
    <div>
        <div v-if="showLoadingAnimation" class="w-screen h-screen flex content-center flex-wrap justify-center">
            <div>
                <div class="inline-block text-center font-bold mx-auto font-primary text-indigo-400 mb-12">{{ userName ? `Hey, ${userName}` : 'Loading' }}. Please wait a moment.</div>
                <BrightLoader class="mx-auto text-center" :is-loading="showLoadingAnimation"/>
            </div>
        </div>
        <div v-else class="bg-white">
            <BrightBanner
                v-if="isDevelopment()"
                type="info"
                announcement
                label="This is a TESTING environment, do not supply your personal information on any pages contained on this site.
Please contact your lending institution for details where to complete your loan application."
            />
            <div class="AppPagePadding mx-auto max-w-[512px]" @keydown.enter="submit">
                <div class="place-content-center mb-[30px]">
                    <img
                        v-if="pingData.logo && pingData.logo.length > 0"
                        class="align-middle mx-auto"
                        :src="pingData.logo"
                        :alt="pingData.name ? pingData.name : ''"
                    />
                </div>
            
                <div class="__typography--heading--4 text-center">
                    Login
                </div>

                <BrightInputText
                    id="email"
                    v-model="email"
                    class="my-20"
                    label="Email"
                />
                <BrightInputPassword
                    id="password"
                    v-model="password"
                    class=""
                    label="Password"
                />
                <div v-if="errorMessage" class="text-red-600 text-center my-20">
                    {{ errorMessage }}
                </div>
                <BrightButton
                    use="primary"
                    full-width
                    :disabled="disableForm"
                    @click="submit"
                    @keydown.enter.space.prevent
                >
                    Login
                </BrightButton>
                <div class="my-20 text-center">
                    <router-link :to="{ name: 'ForgotPassword', params: { lenderId: lenderId, prefilledEmail: email } }">Forgot password?</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BrightInputText from "@/bright/components/input-library/text/BrightInputText.vue";
import BrightInputPassword from "@/bright/components/input-library/password/BrightInputPassword.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightBanner from "@/bright/components/layout-library/banner/BrightBanner.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import { ArdentResponseMixin } from "@/mixins/form/ArdentResponseMixin";
import { StringMixin } from "@/mixins/helpers/StringMixin";
import { setCookie, getCookie } from "@/helpers/CookieHelper";
import { useLenderStore } from "@/stores/modules/lender/lenderStore";
import { useAuthenticationStore } from "@/stores/modules/auth/authenticationStore";
import { mapState } from "pinia";

export default {
    name: "Login",
    components: { BrightLoader, BrightBanner, BrightButton, BrightInputPassword, BrightInputText },
    mixins: [ArdentResponseMixin, StringMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.showLoadingAnimation = true;
            const lenderStore = useLenderStore();
            let lenderID = vm.$route.params.lenderId;

            if (vm.isEmptyString(lenderID)) {
                lenderID = getCookie('bsm-lenderPublicID');
            }
            
            if (!vm.isEmptyString(lenderID) && !lenderStore.lenderPingData.lenderID) {
                lenderStore.pingTenant(lenderID).then((res) => {
                    if (res) {
                        setCookie('bsm-lenderPublicID', lenderID);
                    } else {
                        vm.notifyInvalidLender();
                    }
                });
                vm.showLoadingAnimation = false;
            } else {
                vm.notifyInvalidLender();
            }
            vm.clearOutForm();
        });
    },
    props: {
        prefilledEmail: {
            type: String,
            required: false,
            default: '',
        },
        redirect: {
            type: String,
            required: false,
            default: '/manage/settings',
        },
        lenderId: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            userName: getCookie('bsm-userLenderFirstName'),
            showLoadingAnimation: true,
            disableForm: false,
            email: this.prefilledEmail,
            password: '',
            errorMessage: '',
        };
    },
    computed: {
        ...mapState(useLenderStore, {
            pingData: 'lenderPingData',
        }),
        ...mapState(useAuthenticationStore, {
            isAuthenticated: 'accessToken',
        }),
    },
    watch: {
        prefilledEmail: function(newValue) {
            this.email = newValue;
        },
        isAuthenticated: function() {
            this.$router.push(this.redirect);
        },
    },
    methods: {
        submit() {
            const credentials = {
                email: this.email.trim(),
                password: this.password,
                lenderID: this.lenderId,
            };

            this.disableForm = true;
            this.showLoadingAnimation = true;
            const authenticationStore = useAuthenticationStore();
            authenticationStore.userLenderLogin(credentials);
            this.showLoadingAnimation = false;
            this.disableForm = false;
        },
        clearOutForm() {
            this.showLoadingAnimation = false;
            this.email = '';
            this.password = '';
            this.errorMessage = '';
        },
        notifyInvalidLender() {
            this.errorMessage = 'Please obtain a valid Login link from your Lender.';
            this.disableForm = true;
        },
    },
};
</script>
