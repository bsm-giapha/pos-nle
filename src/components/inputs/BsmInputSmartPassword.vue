<template>
    <BrightInputPassword
        ref="input"
        v-model="inputValue"
        v-bind="passwordBindings"
        @focus="handleFocus"
        @keydown="decrypt"
        @show-password="decrypt(true)"
    />
</template>

<script>
import axios from "axios";
import { BrightInputMixin } from "@/bright/mixins/inputs/BrightInputMixin.js";
import BrightInputPassword from "@/bright/components/input-library/password/BrightInputPassword.vue";

export default {
    name: "BsmInputSmartPassword",
    components: {
        BrightInputPassword,
    },
    mixins: [BrightInputMixin],
    inheritAttrs: true,
    props: {
        encryptedValue: {
            type: String,
            default: '',
            required: false,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            inputValue: this.modelValue,
            isLoading: false,
            isEncrypted: true, // Always assume it's encrypted.
            initialEncryptedValue: this.encryptedValue,
            initialDecryptedValue: '',
        };
    },
    computed: {
        passwordBindings() {
            return {
                ...this.$props,
                class: "BsmInputSmartPassword",
                showLoadingAnimation: this.isLoading,
                disabled: this.isLoading,
                modelValue: this.inputValue,
            };
        },
    },
    watch: {
        encryptedValue: function(newValue) {
            if (this.initialEncryptedValue !== newValue) {
                // Reset component
                this.isEncrypted = true;
                this.initialEncryptedValue = newValue;
                this.initialDecryptedValue = '';

                this.$refs.input.forceHidePassword();
                this.inputValue = newValue;
            }
        },
        modelValue: function(newValue) {
            if ((this.inputValue !== newValue && this.initialDecryptedValue !== newValue) || (this.initialEncryptedValue === "" && this.initialEncryptedValue === newValue)) {
                // Reset component
                if (this.initialEncryptedValue !== newValue) {
                    this.isEncrypted = true;
                    this.initialEncryptedValue = this.encryptedValue;
                    this.initialDecryptedValue = '';

                    this.$refs.input.forceHidePassword();
                    this.inputValue = newValue;
                } else {
                    if (this.isEncrypted) {
                        this.inputValue = newValue;
                        this.initialDecryptedValue = '';
                    } else {
                        this.inputValue = this.initialDecryptedValue;
                    }
                    this.$refs.input.forceHidePassword();
                }
            }
        },
        inputValue: function(newValue) {
            if (!this.isEncrypted) {
                // If the initial decrypted value is equal to the new value, then just emit the encrypted value to avoid throwing off the Differ.
                if (this.initialDecryptedValue === newValue) {
                    this.$emit('update:modelValue', this.initialEncryptedValue);
                } else {
                    this.$emit('update:modelValue', newValue);
                }
            }
        },
    },
    methods: {
        handleFocus() {
            if (this.inputValue.length > 0) {
                this.decrypt();
            }
        },
        decrypt(showPassword = false) {
            if (this.isEncrypted) {
                this.$refs.input.forceHidePassword();
                if (this.initialEncryptedValue.length > 0) {
                    this.isLoading = true;
                    axios.post(`/functions/decrypt`, {
                        value: this.initialEncryptedValue,
                        key: this.name || this.id,
                    }).then(response => {
                        this.inputValue = response.data.data.value;
                        this.initialDecryptedValue = this.inputValue;
                        this.isLoading = false;
                        this.isEncrypted = false;
                        if (showPassword) {
                            this.$refs.input.forceShowPassword();
                        }
                    });
                } else { // There was no value initially provided to the password
                    this.isEncrypted = false;
                    this.initialDecryptedValue = this.inputValue;
                }
            }
        },
    },
};
</script>
