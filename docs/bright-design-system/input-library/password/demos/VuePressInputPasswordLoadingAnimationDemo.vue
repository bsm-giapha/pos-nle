<template>
    <div class="border p-32">
        <BrightInputPassword
            ref="passwordInput"
            v-model="password"
            v-bind="inputBindings"
            @show-password="handleShowPassword"
        />
    </div>
</template>

<script>
import BrightInputPassword from "@/bright/components/input-library/password/BrightInputPassword";

export default {
    name: "VuePressInputPasswordLoadingAnimationDemo",
    components: { BrightInputPassword },
    data() {
        return {
            isLoading: false,
            showLoadingAnimation: false,
            password: '',
        };
    },
    computed: {
        inputBindings() {
            return {
                id: 'loadingAnimationExample',
                label: 'Password',
                subLabel: 'Please provide your password.',
                showLoadingAnimation: this.isLoading,
            };
        },
    },
    methods: {
        handleShowPassword() {
            // setTimeout is used for demo purposes.
            // Normally you'd make a request to an endpoint to fetch password data.
            // Then, you'd handle the loading animation logic here.
            setTimeout(() => {
                this.isLoading = false;
                this.$refs.passwordInput.forceShowPassword();
            }, 1000);
            this.isLoading = true;
            this.$refs.passwordInput.forceHidePassword();
        },
    },
};
</script>
