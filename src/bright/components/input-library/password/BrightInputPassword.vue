<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <div class="flex">
            <input
                ref="input"
                v-bind="passwordInputBindings"
                @input="handleInput"
            />
            <BrightTooltip :text="helperText">
                <BrightButton
                    use="secondary"
                    class="flex-shrink ml-8"
                    :icon="(isShowingPassword) ? 'visibility_off' : 'visibility'"
                    icon-position="center"
                    :size="size"
                    :rounded="rounded"
                    :disabled="disabled"
                    :aria-label="helperText"
                    :show-loading-animation="showLoadingAnimation"
                    @click="handleShowHidePassword"
                    @keydown.space.enter.prevent="handleShowHidePassword"
                />
            </BrightTooltip>
        </div>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
/* Mixins */
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";
import { InputStandardStyleMixin } from "Bright/mixins/inputs/styles/InputStandardStyleMixin";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";
import BrightTooltip from "Bright/components/overlay-library/BrightTooltip.vue";

export default {
    name: "BrightInputPassword",
    components: {
        BrightTooltip,
        BrightButton,
    },
    mixins: [BrightInputMixin, InputStandardStyleMixin],
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
        showLoadingAnimation: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    emits: [
        'show-password',
        'hide-password',
    ],
    data() {
        return {
            isShowingPassword: false,
            inputValue: this.modelValue,
        };
    },
    computed: {
        passwordInputBindings() {
            return {
                ...this.getBaseInputProps,
                ...this.$attrs,
                ...{
                    class: this.mergeClassObjectWithAttributeClass(this.inputStandardStyleClassObject),
                    type: (this.isShowingPassword) ? 'text' : 'password',
                    value: this.inputValue,
                },
            };
        },
        helperText() {
            return (this.isShowingPassword) ? 'Hide' : 'Show';
        },
    },
    methods: {
        handleInput(event) {
            let value = event.target.value;

            this.inputValue = value;
            this.$emit('update:modelValue', value);
        },
        handleShowHidePassword() {
            this.isShowingPassword = !this.isShowingPassword;
            if (this.isShowingPassword) {
                this.$emit("show-password");
            } else {
                this.$emit("hide-password");
            }
        },
        forceShowPassword() {
            this.isShowingPassword = true;
        },
        forceHidePassword() {
            this.isShowingPassword = false;
        },
    },
};
</script>
