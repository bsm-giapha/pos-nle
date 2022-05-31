<template>
    <div v-bind="dividerBindings"></div>
</template>

<script>
export default {
    name: "BrightDivider",
    props: {
        onDark: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        dividerBindings() {
            return {
                class: {
                    'BrightDivider': true,
                    'BrightDivider--on-light': !this.onDark,
                    'BrightDivider--on-dark': this.onDark,
                },
                'role': 'separator',
            };
        },
    },
};
</script>
