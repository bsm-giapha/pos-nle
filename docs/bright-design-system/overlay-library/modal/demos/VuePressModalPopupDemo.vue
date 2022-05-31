<template>
    <div class="border p-32">
        <BrightButton @click.stop="handleOnButtonClick(!showPopup)" @keydown.space.enter.stop.prevent="handleOnButtonClick(!showPopup)" v-bind="getPopupSourceBindings">Toggle Popup</BrightButton>
        <BrightModalPopup :show="showPopup" @closed="handleOnButtonClick(false)" v-bind="getPopupBindings"/>
    </div>
</template>

<script>
    import BrightButton from "@/bright/components/core-library/button/BrightButton";
    import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";

    export default {
        name: "VuePressModalPopupDemo",
        components: {BrightButton, BrightModalPopup},
        data() {
            return {
                showPopup: false,
            }
        },
        computed: {
            getPopupSourceBindings() {
                return {
                    id: 'togglePopupDemo',
                    use: 'primary',
                }
            },
            getPopupBindings() {
                return {
                    id: 'modalPopupDemo',
                    closeFocusID: 'togglePopupDemo',
                    label: "I'm a Popup!",
                }
            }
        },
        methods: {
            handleOnButtonClick(newValue) {
                this.showPopup = newValue;
            }
        },
    }
</script>