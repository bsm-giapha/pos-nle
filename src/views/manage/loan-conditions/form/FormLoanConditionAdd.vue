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
import Schema from "@/views/manage/loan-conditions/form/FormLoanCondition.schema.js";
import { FormLoanConditionMixin } from "@/views/manage/loan-conditions/form/FormLoanConditionMixin.js";

export default {
    name: "FormLoanConditionAdd",
    mixins: [FormLoanConditionMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.beforeRouteEnterGuard();
        });
    },
    beforeRouteLeave(to, from) {
        return this.beforeRouteLeaveGuard(to, from);
    },
    data() {
        return this.getInitialDataFromSchema(Schema, 'add');
    },
    computed: {
        id() {
            return 'FormLoanConditionAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/loan-conditions`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminConditions');
        },
    },
    methods: {
        formSubmitSuccessHandler(navigation) {
            navigation.updateNavigation({
                pageName: `Add Loan Condition`,
                breadcrumbs: {
                    to: { name: 'ManageLoanConditions' },
                    label: 'Manage > Loan Conditions',
                },
                tabs: [],
                backBar: {
                    to: { name: 'ManageLoanConditions' },
                    label: 'Loan Conditions',
                },
                localActions: [],
            });
            this.$router.push({
                name: 'ManageLoanConditionAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    conditionName: this.formDataCurrent.information.name,
                    conditionDocType: this.formDataCurrent.information.docType,
                },
            });
        },
    },
};
</script>
