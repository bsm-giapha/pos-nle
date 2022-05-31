<template>
    <div class="border p-32">
        <BrightButton v-bind="getPopoutSourceBindings" @click.stop="handleOnButtonClick(!showPopout)" @keydown.space.enter.stop.prevent="handleOnButtonClick(!showPopout)">Toggle Popout</BrightButton>
        <BrightModalPopout :show="showPopout" v-bind="getPopoutBindings" @closed="handleOnButtonClick(false)">
            <template v-slot:media>
                <img src="../images/ace-confused.png" alt="Photo of Confused Ace" class="w-full"/>
            </template>
            <div>
                Details here.
            </div>
        </BrightModalPopout>
    </div>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout.vue";

export default {
    name: "VuePressModalPopoutDemo",
    components: { BrightButton, BrightModalPopout },
    data() {
        return {
            showPopout: false,
        };
    },
    computed: {
        getPopoutSourceBindings() {
            return {
                id: 'togglePopoutDemo',
                use: 'primary',
            };
        },
        getPopoutBindings() {
            return {
                id: 'modalPopoutDemo',
                closeFocusID: 'togglePopoutDemo',
                label: "I'm a Popout!",
            };
        },
    },
    methods: {
        handleOnButtonClick(newValue) {
            this.showPopout = newValue;
        },
    },
};
</script>
