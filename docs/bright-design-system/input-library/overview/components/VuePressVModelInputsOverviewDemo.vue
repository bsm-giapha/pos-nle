<template>
    <div>
        <BrightInputText id="firstName" label="What is your first name?" v-model="firstName" autocomplete="new-password"/>
        <div v-if="firstName">So your first name is <strong>{{firstName}}</strong>, right?</div>
    </div>
</template>

<script>
    import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
    export default {
        name: "VuePressVModelInputsOverviewDemo",
        components: {BrightInputText},
        data() {
            return {
                firstName: ''
            }
        }
    }
</script>