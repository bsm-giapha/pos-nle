<template>
    <i
        :class="classObject"
        aria-hidden="true"
        role="img"
    >
        {{ use }}
    </i>
</template>

<script>
export default {
    name: "BrightIcon",
    inheritAttrs: true,
    props: {
        use: {
            type: String,
            required: true,
            default: "",
        },
    },
    computed: {
        classObject() {
            return {
                'material-symbols-outlined BrightIcon': true,
            };
        },
    },
};
</script>

<style scoped>

</style>
