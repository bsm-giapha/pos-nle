<template>
    <component
        :is="componentType"
        v-bind="buttonBindings"
        @click.prevent="handleUserInput()"
        @keydown.space.enter.prevent="handleUserInput()"
    >
        <span v-if="showLoadingAnimation">
            <BrightButtonLoader :is-loading="true"/>
        </span>
        <span v-else>
            <BrightIcon v-if="shouldShowPrefixIcon" :use="icon" :class="iconClassObject"/><span v-if="shouldShowPrefixIcon">&nbsp;&nbsp;</span>
            <BrightIcon v-if="shouldShowCenterIcon" :use="icon" :class="iconClassObject"/><span :class="labelClassObject"><slot></slot></span>
            <span v-if="shouldShowPostfixIcon">&nbsp;&nbsp;</span><BrightIcon v-if="shouldShowPostfixIcon" :use="icon" :class="iconClassObject"/>
        </span>
    </component>
</template>

<script>
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
import { SizeMixin } from "Bright/mixins/global/SizeMixin";
import BrightButtonLoader from "./BrightButtonLoader.vue";
export default {
    name: "BrightButton",
    components: {
        BrightButtonLoader,
        BrightIcon,
    },
    mixins: [SizeMixin],
    inheritAttrs: true,
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
            required: false,
        },
        href: { // If href, then render as link because only <a> elements have hrefs (buttons do not have href)
            type: String,
            default: '',
            required: false,
        },
        showLoadingAnimation: {
            type: Boolean,
            default: false,
            required: false,
        },
        icon: {
            type: String,
            default: '',
            required: false,
        },
        iconPosition: {
            type: String,
            default: 'prefix',
            required: false,
            validator(value) {
                return ['center', 'prefix', 'postfix'].includes(value);
            },
        },
        isToggleButton: {
            type: Boolean,
            required: false,
            default: false,
        },
        rounded: {
            type: Boolean,
            default: false,
            required: false,
        },
        use: { /* Note to future devs: DO NOT add a default value to `use`. It's intended that developers must think about hierarchy when constructing UIs */
            type: String,
            required: true,
            validator: function(value) {
                return ['primary', 'secondary', 'tertiary'].includes(value);
            },
        },
        variant: {
            type: String,
            default: 'standard',
            required: false,
            validator: function(value) {
                return ['standard', 'alternative', 'danger'].includes(value);
            },
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            toggle: {
                active: this.active,
            },
        };
    },
    computed: {
        buttonBindings() {
            let elementBindings = {
                class: {
                    'BrightButton': true,
                    'BrightButton__primary--standard': this.use === 'primary' && this.variant === 'standard',
                    'BrightButton__primary--alternative': this.use === 'primary' && this.variant === 'alternative',
                    'BrightButton__primary--danger': this.use === 'primary' && this.variant === 'danger',

                    'BrightButton__secondary--standard': this.use === 'secondary' && this.variant === 'standard',
                    'BrightButton__secondary--alternative': this.use === 'secondary' && this.variant === 'alternative',
                    'BrightButton__secondary--danger': this.use === 'secondary' && this.variant === 'danger',

                    'BrightButton__tertiary--standard': this.use === 'tertiary' && this.variant === 'standard',
                    'BrightButton__tertiary--alternative': this.use === 'tertiary' && this.variant === 'alternative',
                    'BrightButton__tertiary--danger': this.use === 'tertiary' && this.variant === 'danger',

                    'BrightButton__size--large': this.size === 'large',
                    'BrightButton__size--medium': this.size === 'medium',
                    'BrightButton__size--small': this.size === 'small',

                    'BrightButton__size--large--icon-and-text': this.size === 'large' && this.icon.length > 0 && !this.shouldShowCenterIcon,
                    'BrightButton__size--medium--icon-and-text': this.size === 'medium' && this.icon.length > 0 && !this.shouldShowCenterIcon,
                    'BrightButton__size--small--icon-and-text': this.size === 'small' && this.icon.length > 0 && !this.shouldShowCenterIcon,

                    'BrightButton__href': this.href !== undefined,
                    'BrightButton__rounded': this.rounded,
                    'BrightButton__active': this.isToggleButton && this.toggle.active,

                    'w-full': this.fullWidth,

                    'BrightButtonIcon__size--large--rounded': this.hasIcon && this.size === 'large' && this.iconPosition === 'center',
                    'BrightButtonIcon__size--medium--rounded': this.hasIcon && this.size === 'medium' && this.iconPosition === 'center',
                    'BrightButtonIcon__size--small--rounded': this.hasIcon && this.size === 'small' && this.iconPosition === 'center',
                },
            };

            // Differentiation between Link Buttons <a> and Normal Buttons <button>
            if (this.href) {
                elementBindings.href = this.getHref;
                elementBindings.role = 'button';
                elementBindings.tabindex = 0;
                elementBindings['data-disabled-link'] = this.disabled;
                elementBindings['aria-disabled'] = this.disabled;
            } else {
                elementBindings.disabled = this.disabled;
            }

            // Toggle Button State
            if (this.isToggleButton) {
                elementBindings['aria-pressed'] = this.toggle.active ? 'true' : 'false';
            }

            return elementBindings;
        },
        iconClassObject() {
            return {
                'BrightButtonIcon': true,

                'BrightButtonIcon__size--large': this.hasIcon && this.size === 'large',
                'BrightButtonIcon__size--medium': this.hasIcon && this.size === 'medium',
                'BrightButtonIcon__size--small': this.hasIcon && this.size === 'small',

                'cursor-not-allowed': this.hasIcon && this.disabled,

                'BrightButtonIcon__size--large--prefix': this.hasIcon && this.size === 'large' && this.iconPosition === 'prefix',
                'BrightButtonIcon__size--medium--prefix': this.hasIcon && this.size === 'medium' && this.iconPosition === 'prefix',
                'BrightButtonIcon__size--small--prefix': this.hasIcon && this.size === 'small' && this.iconPosition === 'prefix',
                'BrightButtonIcon__size--large--postfix': this.hasIcon && this.size === 'large' && this.iconPosition === 'postfix',
                'BrightButtonIcon__size--medium--postfix': this.hasIcon && this.size === 'medium' && this.iconPosition === 'postfix',
                'BrightButtonIcon__size--small--postfix': this.hasIcon && this.size === 'small' && this.iconPosition === 'postfix',

                '-mt-1 mb-1': this.size === 'large' && this.icon.length > 0 && !this.shouldShowCenterIcon,
            };
        },
        labelClassObject() {
            return {
                'inline-block pt-2': this.size === 'medium' && this.icon.length > 0 && !this.shouldShowCenterIcon,
                'inline-block pt-1': this.size === 'small' && this.icon.length > 0 && !this.shouldShowCenterIcon,
            };
        },
        componentType() {
            return (this.href) ? 'a' : 'button';
        },
        getHref() {
            if (this.href) {
                return (!this.disabled) ? this.href : "javascript:void(0)";
            } else {
                return "";
            }
        },
        hasIcon() {
            return this.icon.length > 0;
        },
        shouldShowPrefixIcon() {
            return this.hasIcon && this.iconPosition === 'prefix';
        },
        shouldShowCenterIcon() {
            return this.hasIcon && this.iconPosition !== 'prefix' && this.iconPosition !== 'postfix';
        },
        shouldShowPostfixIcon() {
            return this.hasIcon && this.iconPosition === 'postfix';
        },
    },
    methods: {
        handleUserInput() {
            if (!this.disabled && this.isToggleButton) {
                this.toggle.active = !this.toggle.active;
                this.$emit('update:modelValue', this.toggle.active);
            }
        },
    },
};
</script>

<style scoped>

</style>
