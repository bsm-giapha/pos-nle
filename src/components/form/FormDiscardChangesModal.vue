<template>
    <BrightModalPopup v-bind="modalBindings" @closed="handleCancel">
        <template v-slot:footer>
            <div class="block tablet:flex">
                <BrightButton
                    class="block w-full mr-0 mb-8 tablet:flex-1 tablet:mr-8 tablet:mb-0"
                    use="primary"
                    @click="handleCancel"
                    @keydown.space.enter.prevent="handleCancel"
                >
                    Review Changes
                </BrightButton>

                <BrightButton
                    class="block w-full tablet:flex-1"
                    use="secondary"
                    @click="handleConfirm"
                    @keydown.space.enter.prevent="handleConfirm"
                >
                    Discard Changes
                </BrightButton>
            </div>
        </template>
    </BrightModalPopup>
</template>

<script>
import BrightModalPopup from "../../bright/components/overlay-library/modal/BrightModalPopup.vue";
import BrightButton from "../../bright/components/core-library/button/BrightButton.vue";
export default {
    name: "FormDiscardChangesModal",
    components: {
        BrightButton,
        BrightModalPopup,
    },

    props: {
        id: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            required: true,
            default: false,
        },
        handleConfirm: {
            type: Function,
            required: false,
            default: () => {},
        },
        handleCancel: {
            type: Function,
            required: false,
            default: () => {},
        },
    },

    computed: {
        modalBindings() {
            return {
                id: this.id,
                closeFocusID: '',
                width: 'medium',
                label: 'Discard Confirmation',
                subLabel: 'Are you sure you want to discard your changes?',
                show: this.show,
            };
        },
    },
};
</script>
