<template>
    <BrightModalPopout v-bind="bindModal" @closed="handleModalClose">
        <FormWrapper v-bind="bindFormWrapper">
            <slot></slot>
        </FormWrapper>
        <template v-slot:footer>
            <div class="flex">
                <BrightButton
                    class="w-1/2 mr-4"
                    use="primary"
                    :disabled="bindFormWrapper.disableSubmitButton"
                    @click="bindFormWrapper.handleFormSubmit"
                    @keydown.space.enter.prevent="bindFormWrapper.handleFormSubmit"
                >
                    {{ (!bindFormWrapper.isEditForm) ? 'Add' : 'Save' }}
                </BrightButton>
                <BrightButton
                    class="w-1/2 ml-4"
                    use="secondary"
                    @click="handleModalClose"
                    @keydown.space.enter.prevent="handleModalClose"
                >
                    Cancel
                </BrightButton>
            </div>
        </template>
    </BrightModalPopout>
</template>

<script>
import FormWrapper from "@/components/form/FormWrapper.vue";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";

/**
 * A component that handles the presentation of Form Modals (Popouts).
 * It's essentially a Modal with a slotted FormWrapper in it that has Modal-specific buttons/event handlers.
 */
export default {
    name: "FormModalPopout",
    components: { BrightButton, BrightModalPopout, FormWrapper },
    props: {
        /** The object to bind to the BrightModalPopout component, */
        bindModal: {
            type: Object,
            required: true,
        },

        /** The object to bind to the FormWrapper component. */
        bindFormWrapper: {
            type: Object,
            required: true,
        },

        /** The function to call when the Modal closes. */
        handleModalClose: {
            type: Function,
            required: true,
        },
    },
};
</script>
