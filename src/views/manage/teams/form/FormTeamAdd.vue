<template>
    <FormWrapper v-if="showFormWrapper" v-bind="bindFormWrapper">
        <FormTeam v-bind="bindDescendant"/>
    </FormWrapper>
</template>

<script>
import { FormAncestorMixin } from "@/mixins/form/FormAncestorMixin.js";
import FormTeam from "@/views/manage/teams/form/FormTeam.vue";
import Schema from "@/views/manage/teams/form/FormTeam.schema.js";

export default {
    name: "FormTeamAdd",
    components: {
        FormTeam,
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
            return 'FormTeamAdd';
        },
        formSubmissionHttpMethod() {
            return 'POST';
        },
        apiResourceUrl() {
            return `${this.lenderBaseUrl}/teams`;
        },
        userCanViewPage() {
            return this.hasPageVisitPermission('ManageLenderTeams');
        },
    },
    methods: {
        updateNavigationOnPageLoad(updateNavigation) {
            updateNavigation({
                pageName: 'Add Team',
                breadcrumbs: {
                    to: { name: 'ManageTeams' },
                    label: 'Manage > Teams',
                },
                backBar: {
                    to: { name: 'ManageTeams' },
                    label: 'Teams',
                },
            });
        },
        formSubmitSuccessHandler() {
            this.$router.push({
                name: 'ManageTeamAddSuccess',
                params: {
                    idOfResourceThatWasCreated: this.formDataCurrent.id,
                    teamName: this.formDataCurrent.name,
                    description: this.formDataCurrent.description,
                },
            });
        },
    },
};
</script>

<style scoped>

</style>
