<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" v-bind="bindDescendant"/>
            </keep-alive>
        </router-view>
    </FormWrapper>
</template>

<script>
import FormWrapper from "@/components/form/FormWrapper.vue";
import Schema from "./FormLoanCondition.schema.js";
import { FormLoanConditionMixin } from "@/views/manage/loan-conditions/form/FormLoanConditionMixin.js";

export default {
    name: "FormLoanConditionEdit",
    components: { FormWrapper },
    mixins: [FormLoanConditionMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.beforeRouteEnterGuard();
        });
    },
    beforeRouteLeave(to, from) {
        return this.beforeRouteLeaveGuard(to, from);
    },
    props: {
        publicId: {
            type: String,
            required: true,
        },
    },
    data() {
        return this.getInitialDataFromSchema(Schema, 'edit');
    },
    computed: {
        id() {
            return 'FormLoanConditionEdit';
        },
        formSubmissionHttpMethod() {
            return 'PATCH';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/loan-conditions/${this.publicId}`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminConditions');
        },
    },
    methods: {
        formSubmitSuccessHandler() {},
    },
};
</script>
