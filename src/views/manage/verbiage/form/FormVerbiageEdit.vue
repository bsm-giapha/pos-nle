<template>
    <FormModalPopout
        :bind-modal="bindModal"
        :bind-form-wrapper="bindFormWrapper"
        :handle-modal-close="handleModalClose"
    >
        <BrightForm v-show="!formIsLoading" autocomplete="new-password">
            <BrightInputText
                v-bind="bindInput('section')"
            />
            <BrightInputText
                v-bind="bindInput('keyword')"
            />
            <span v-for="(value, key) in baselineSchema.texts" :key="key">
                <BrightInputTextarea
                    v-bind="bindInput(`texts.${key}.text`)"
                    @update:modelValue="handleInput(`texts.${key}.text`, $event)"
                />
            </span>
        </BrightForm>
        <BrightRow gutters="none">
            <BrightColumn class="text-center">
                <BrightLoader :is-loading="formIsLoading"/>
            </BrightColumn>
        </BrightRow>
    </FormModalPopout>
</template>

<script>
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import { FormAncestorModalMixin } from "@/mixins/form/FormAncestorModalMixin.js";
import BrightForm from "Bright/components/input-library/form/BrightForm.vue";
import Schema from "@/views/manage/verbiage/form/FormVerbiage.schema.js";

export default {
    name: "FormVerbiageEdit",
    components: {
        BrightLoader,
        BrightForm,
    },
    mixins: [FormAncestorModalMixin],
    inheritAttrs: true,
    props: {
        pageID: {
            type: String,
            required: true,
        },
        keyword: {
            type: String,
            required: true,
        },
    },
    emits: ['update'],
    data() {
        return {
            ...this.getInitialDataFromSchema(Schema, 'edit'),
        };
    },
    computed: {
        id() {
            return 'FormVerbiageEdit';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/verbiage/page/${this.pageID}/keyword/${this.keyword}`;
        },
        formSubmissionHttpMethod() {
            return 'PUT';
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminConfigsApplication');
        },
        shouldValidate() {
            return this.formWasSubmitted;
        },
        suppressFormSubmission() {
            return false;
        },
    },
    methods: {
        formSubmitSuccessHandler() {
            this.$emit('update');
        },
    },
};
</script>
