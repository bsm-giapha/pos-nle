<template>
    <FormPanel
        v-show="!isEditForm || Object.keys(changes).length > 0"
        :label="panelLabel"
        :sub-label="panelSubLabel"
        class="bg-grey-50"
    >
        <div class="FormRecentChangesList mb-24">
            <BaseFormChangeContainer :changes="changes" :is-edit-form="isEditForm" @undo="$emit('undo', $event)"/>
        </div>
        <div>
            <BrightButton
                class="block w-full mr-0 mb-8 tablet:w-auto tablet:inline-block tablet:mr-8 tablet:mb-0"
                use="primary"
                :disabled="disableSubmitButton"
                @click="handleSubmit"
                @keydown.space.enter.prevent="handleSubmit"
            >
                {{ isEditForm ? 'Save Changes' : 'Submit' }}
            </BrightButton>

            <BrightButton
                class="block w-full tablet:inline-block tablet:w-auto"
                use="secondary"
                @click="handleDiscard"
                @keydown.space.enter.prevent="handleDiscard"
            >
                {{ isEditForm ? 'Discard Changes' : 'Cancel' }}
            </BrightButton>
        </div>
    </FormPanel>
</template>

<script>
import FormPanel from "@/components/form/FormPanel.vue";
import BaseFormChangeContainer from "@/components/form/base/BaseFormChangeContainer.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
export default {
    name: "BaseFormReviewChangesPanel",
    components: { BrightButton, BaseFormChangeContainer, FormPanel },
    props: {
        isEditForm: {
            type: Boolean,
            required: true,
        },
        changes: {
            type: Object,
            default: () => {},
            required: false,
        },
        disableSubmitButton: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['undo', 'submit', 'discard'],
    computed: {
        panelLabel() {
            if (this.isEditForm) {
                return 'Review Changes';
            } else if (this.numberOfRootChanges > 0) {
                return 'Review Errors';
            } else {
                return '';
            }
        },
        panelSubLabel() {
            if (this.isEditForm) {
                return 'Does everything look good? Take a moment to review your changes before saving.';
            } else if (this.numberOfRootChanges > 0) {
                return 'Whoops, there was a problem. Take a moment to review your data and adjust some things.';
            } else {
                return '';
            }
        },
        /**
         * The number of changes at the root-level of the this.changes prop. This does not recursively count changes; just the top-level.
         */
        numberOfRootChanges() {
            return Object.keys(this.changes).length;
        },
    },
    methods: {
        handleSubmit() {
            this.$emit('submit');
        },
        handleDiscard() {
            this.$emit('discard');
        },
    },
};
</script>
