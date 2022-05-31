<template>
    <form
        :action="action"
        :method="method"
        :enctype="encodingType"
        :target="target"
        :accept-charset="acceptCharset"
    >
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: "BrightForm",
    props: {
        action: {
            type: String,
            required: false,
            default: null,
        },
        method: {
            type: String,
            required: false,
            default: 'get',
            validator: function(value) {
                return ['get', 'post'].includes(value.toLowerCase());
            },
        },
        hasFileInput: {
            type: Boolean,
            required: false,
            default: false,
        },
        target: {
            type: String,
            required: false,
            default: 'self',
        },
        acceptCharset: {
            type: String,
            required: false,
            default: 'utf-8',
        },
    },
    computed: {
        encodingType: function() {
            return (this.hasFileInput ? 'multipart/form-data' : 'application/x-www-form-urlencoded');
        },
    },
};
</script>

<style scoped>

</style>
