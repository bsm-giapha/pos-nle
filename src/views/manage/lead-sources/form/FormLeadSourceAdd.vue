<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <TabInformation v-bind="bindDescendant"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import Schema from "@/views/manage/lead-sources/form/FormLeadSource.schema.js";
import TabInformation from "@/views/manage/lead-sources/form/tabs/TabInformation.vue";

export default {
    name: "FormLeadSourceAdd",
    components: {
        TabInformation,
    },
    mixins: [FormAncestorMixin],
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
            return 'FormLeadSourceAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/lead-sources`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('AdminLeadSourcePricing');
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Add Lead Source',
                breadcrumbs: {
                    to: { name: 'ManageLeadSources' },
                    label: 'Manage > Settings > Lead Sources',
                },
                backBar: {
                    to: { name: 'ManageLeadSources' },
                    label: 'Lead Sources',
                },
            });
        },
        formSubmitSuccessHandler() {
            this.$router.push({
                name: 'ManageLeadSourceAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    leadSourceName: this.formDataCurrent.information.name,
                    leadSourceValue: this.formDataCurrent.information.value,
                },
            });
        },
    },
};
</script>
