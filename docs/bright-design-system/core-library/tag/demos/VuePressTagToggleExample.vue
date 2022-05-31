<template>
    <BrightTag
        v-model="active"
        :label="'Active: ' + this.active"
        is-toggle-tag
        color="blue"
    />
</template>

<script>
import BrightTag from "@/bright/components/core-library/tag/BrightTag";
export default {
    name: "VuePressTagToggleExample",
    components: { BrightTag },
    data() {
        return {
            active: false,
        };
    },
};
</script>>
