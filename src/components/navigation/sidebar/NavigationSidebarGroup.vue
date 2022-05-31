<template>
    <ul v-bind="groupBindings">
        <li class="NavigationSidebarGroup__Label" role="none" aria-hidden="true">
            {{ label }}
        </li>
        <slot></slot>
    </ul>
</template>

<script>
export default {
    name: "NavigationSidebarGroup",
    props: {
        label: {
            type: String,
            default: '',
            required: true,
        },
    },
    computed: {
        groupBindings() {
            return {
                class: {
                    'NavigationSidebarGroup': true,
                },
                'aria-label': this.label,
                role: 'menu',
            };
        },
    },
};
</script>
