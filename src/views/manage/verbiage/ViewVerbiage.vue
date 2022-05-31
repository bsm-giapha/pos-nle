<template>
    <div>
        <BrightCard :bordered="false" class="AppPagePadding" no-padding>
            <BrightTable
                id="verbiageTable"
                size="small"
                show-refresh-button
                row-class="hover:cursor-pointer"
                :show-horizontal-divider="false"
                :bordered="false"
                :columns="[
                    { name: 'Section', key: 'section', excludeFromSearch: true, filterable: true },
                    { name: 'Keyword', key: 'keyword', filterable: true },
                    { name: 'Text', key: 'text' },
                    { name: 'Edit', key: 'edit', sort: 'none', excludeFromSearch: true },
                ]"
                :rows="rows"
                :filters="[
                    { columnKey: 'section', name: 'Section', pluralName: 'Sections' },
                    { columnKey: 'keyword', name: 'Keyword', pluralName: 'Keywords' },
                ]"
                :rows-per-page-options="[25, 50, 100]"
                searchable
                @refresh="getRowData(true)"
                @row:click="handleRowClick"
            >
                <template v-slot:column:section="row">
                    <div>{{ row.section }}</div>
                </template>
                <template v-slot:column:keyword="row">
                    <div>{{ row.keyword }}</div>
                </template>
                <template v-slot:column:text="row">
                    <div>{{ row.text }}</div>
                </template>
                <template v-slot:column:edit="row">
                    <BrightIcon
                        :id="row.id + '-edit'"
                        class="inline-block"
                        :label="'Edit verbiage for ' + row.keyword"
                        use="edit"
                    />
                </template>
            </BrightTable>
        </BrightCard>
        <FormVerbiageEdit
            v-bind="formVerbiageBindings"
            @update="getRowData"
        >
        </FormVerbiageEdit>
    </div>
</template>

<script>
import { usePermissionsStore } from "@/stores/permissions";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import axios from "axios";
import FormVerbiageEdit from "@/views/manage/verbiage/form/FormVerbiageEdit.vue";
import { useNavigationStore } from "@/stores/navigation";
import { useLenderStore } from "@/stores/lender";

export default {
    name: "ViewVerbiage",
    components: {
        FormVerbiageEdit,
        BrightCard,
        BrightIcon,
        BrightTable,
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            if (!permissions.hasPageVisitPermission('AdminConfigsApplication')) {
                vm.$router.push({ name: "UnAuthorized403", params: { '0': to.path } });
                return;
            }
            const navigation = useNavigationStore();
            navigation.updateNavigation({
                pageName: 'Verbiage',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
            });
            vm.getRowData();
        });
    },
    data() {
        return {
            rows: [],
            isShowingPopout: false,
            selectedPageID: '',
            selectedKeyword: '',
        };
    },
    computed: {
        resourceURL() {
            const lender = useLenderStore();
            return `${lender.baseLenderURL}/verbiage`;
        },
        formVerbiageBindings() {
            return {
                formType: 'edit',
                singularResourceLabel: 'Verbiage',
                show: this.isShowingPopout,
                allObjectsThatCanBeEdited: this.rows,
                handleModalClose: this.handleFormClose,
                pageID: this.selectedPageID,
                keyword: this.selectedKeyword,
            };
        },
    },
    methods: {
        getRowData(fromRefreshButton = false) {
            const navigation = useNavigationStore();
            if (fromRefreshButton || this.rows.length === 0) {
                navigation.startLoadingAnimation();
            }
            Promise.all([
                axios.get(this.resourceURL),
            ]).then((response) => {

                let responseData = response[0].data.data;

                let verbiages = responseData.map(verbiage => {
                    let verbiageEnglish = verbiage.filter(verbiage => verbiage.lang === '1')[0];
                    if (verbiageEnglish) {
                        return {
                            id: verbiageEnglish.id,
                            section: verbiageEnglish.pageLabel,
                            keyword: verbiageEnglish.keyword,
                            language: verbiageEnglish.langLabel,
                            text: verbiageEnglish.text,
                            edit: '',
                            lenderID: verbiageEnglish.lenderID,
                            notes: verbiageEnglish.notes,
                            pageID: verbiageEnglish.page,
                            langID: verbiageEnglish.lang,
                        };
                    }
                });
                this.rows = verbiages.filter((verbiage) => verbiage !== undefined);
            }).catch((error) => {
                console.error(error);
            }).then(() => {
                navigation.stopLoadingAnimation();
            });

        },
        handleRowClick(rowID) {
            try {
                const verbiage = this.rows.find((element) => element.id === rowID);

                this.selectedKeyword = verbiage.keyword;
                this.selectedPageID = verbiage.pageID;

                this.isShowingPopout = true;

            } catch (e) {
                console.error('Row in Verbiage table does not have a public ID.');
            }
        },
        handleFormClose() {
            this.isShowingPopout = false;
        },
    },
};
</script>
