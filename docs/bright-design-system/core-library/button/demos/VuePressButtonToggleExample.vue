<template>
    <BrightButton use="primary" is-toggle-button v-model="active">
        Active: {{ active }}
    </BrightButton>
</template>

<script>
    import BrightButton from "@/bright/components/core-library/button/BrightButton";
    export default {
        name: "VuePressButtonToggleExample",
        components: {BrightButton},
        data() {
            return {
                active: false,
            }
        }
    }
</script>