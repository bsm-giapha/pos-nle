<template>
    <li v-bind="itemBindings" @click="$emit('click')">
        <SmartLink v-bind="linkBindings">
            <BrightIcon v-bind="iconBindings"/>
            <span v-bind="labelBindings">{{ label }}</span>
        </SmartLink>
    </li>
</template>

<script>
import BrightIcon from "../../../bright/components/core-library/icon/BrightIcon.vue";
import SmartLink from "../SmartLink.vue";
export default {
    name: "NavigationSidebarItem",
    components: { SmartLink, BrightIcon },
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            default: '',
            required: true,
        },
        icon: {
            type: String,
            default: '',
            required: true,
        },
        current: {
            type: Boolean,
            default: false,
            required: false,
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    emits: ['click'],
    computed: {
        itemBindings() {
            return {
                class: {
                    'NavigationSidebarItem': true,
                    'NavigationSidebarItem--current': this.current,
                    'NavigationSidebarItem--disabled': this.disabled,
                },
                role: 'none',
            };
        },
        linkBindings() {
            return {
                ...{
                    class: {
                        'NavigationSidebarItem__Anchor': true,
                        'NavigationSidebarItem__Anchor--disabled': this.disabled,
                    },
                    'aria-current': this.current,
                    'aria-disabled': this.disabled,
                    'aria-label': this.label,
                    role: 'menuitem',
                },
                ...this.$attrs,
            };
        },
        iconBindings() {
            return {
                class: {
                    'NavigationSidebarItem__Icon': true,
                    'NavigationSidebarItem__Icon--disabled': this.disabled,
                },
                use: this.icon,
            };
        },
        labelBindings() {
            return {
                class: {
                    'NavigationSidebarItem__Label': true,
                    'NavigationSidebarItem__Label--disabled': this.disabled,
                },
            };
        },
    },
};
</script>
