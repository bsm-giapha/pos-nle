<template>
    <component :is="isRouterLink ? 'router-link' : 'a'" v-bind="$attrs">
        <slot></slot>
    </component>
</template>

<script>
export default {
    name: "SmartLink",
    inheritAttrs: true,
    computed: {
        isRouterLink() {
            return 'to' in this.$attrs;
        },
    },
};
</script>
