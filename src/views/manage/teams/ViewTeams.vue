<template>
    <div>
        <BrightCard
            class="AppPagePadding bg-grey-50 z-0"
            no-padding
            :bordered="false"
            :rounded="false"
        >
            <div class="mb-16 __typography--heading--5 text-grey-900">Recently Viewed</div>
            <div>
                <BrightCard
                    class="inline-block"
                    label="Bright Brigade"
                    sub-label="4 Members"
                    size="small"
                    :bordered="false"
                    raised
                >
                </BrightCard>
            </div>
        </BrightCard>
        <BrightCard :bordered="false" class="AppPagePadding" no-padding>
            <div class="__typography--heading--3 text-grey-900">All Teams</div>
            <BrightTable
                id="teamsTable"
                size="small"
                show-refresh-button
                row-class="hover:cursor-pointer"
                :show-horizontal-divider="false"
                :bordered="false"
                :columns="[
                    { name: 'Name', key: 'name', filterable: true, cellClass: 'whitespace-no-wrap' },
                    { name: '# of Members', key: 'numberOfMembers', filterable: true },
                    { name: 'Members', key: 'members', hidden: true },
                    { name: 'Description', key: 'description' },
                    { name: 'Last Modified', key: 'lastModifiedDate', filterable: true },
                    { name: 'Status', key: 'status', filterable: true, excludeFromSearch: true, sort: 'none' },
                ]"
                :rows="teams"
                :filters="[
                    { columnKey: 'status', name: 'Status', pluralName: 'Status', operator: 'equalTo', value: ['Active'] },
                    { columnKey: 'name', name: 'Name', pluralName: 'Name' },
                    { columnKey: 'numberOfMembers', name: '# of Members', pluralName: '# of Members' },
                    { columnKey: 'lastModifiedDate', name: 'Last Modified', pluralName: 'Last Modified' },
                ]"
                searchable
                @refresh="getTeams(true)"
                @row:click="handleRowClick"
            >
                <template v-slot:actions>
                    <BrightButton
                        use="primary"
                        size="small"
                        icon="add"
                        icon-position="prefix"
                        @click="handleAddTeamButtonClick"
                    >
                        Add Team
                    </BrightButton>
                </template>
                <template v-slot:column:name="row">
                    <BrightAvatar
                        class="inline-block mr-12 align-middle"
                        src=""
                        :name="row.name"
                        color="grey"
                        light
                    />
                    <div class="inline-block align-middle">{{ row.name }}</div>
                </template>
                <template v-slot:column:numberOfMembers="row">
                    <div class="text-center">{{ row.numberOfMembers }}</div>
                </template>
                <template v-slot:column:description="row">
                    <div>{{ row.description }}</div>
                </template>
                <template v-slot:column:lastModifiedDate="row">
                    <div>{{ row.lastModifiedDate }}</div>
                    <div class="text-grey-500">{{ row.lastModifiedTime }}</div>
                </template>
                <template v-slot:column:status="row">
                    <BrightIcon
                        class="inline-block mr-12 align-middle"
                        use="lens"
                        :class="row.status === 'Active' ? 'text-green-500' : 'text-red-500'"
                    />
                    <div class="inline-block align-middle">{{ row.status }}</div>
                </template>
            </BrightTable>
        </BrightCard>
    </div>
</template>

<script>
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import axios from "axios";
import { usePermissionsStore } from '@/stores/permissions';
import { useNavigationStore } from '@/stores/navigation';
import { useLenderStore } from '@/stores/lender';
export default {
    name: "ViewTeams",
    components: { BrightAvatar, BrightCard, BrightTable, BrightIcon, BrightButton },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            const navigation = useNavigationStore();
            if (!permissions.hasPageVisitPermission('ManageLenderTeams')) {
                vm.$router.push({ name: "404", params: { '0': to.path } });
                return;
            }
            navigation.updateNavigation({
                pageName: 'Teams',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
            });
            if (from.name.includes('ManageTeam') || vm.teams.length === 0) {
                vm.getTeams();
            }
        });
    },
    data() {
        return {
            teams: [],
        };
    },
    methods: {
        getTeams(fromRefreshButton = false) {
            const lender = useLenderStore();
            const navigation = useNavigationStore();
            if (fromRefreshButton || this.teams.length === 0) {
                navigation.startLoadingAnimation();
            }
            axios.get(`${lender.baseLenderURL}/teams`).then((response) => {
                let responseData = response.data.data;
                this.teams = responseData.map(team => {
                    return {
                        id: team.id,
                        name: team.name,
                        numberOfMembers: team.numberOfMembers,
                        members: team.members,
                        description: team.description,
                        lastModifiedDate: team.lastModifiedDate.date,
                        lastModifiedTime: team.lastModifiedDate.time,
                        status: team.status ? 'Active' : 'Inactive',
                    };
                });
            }).catch((error) => {
                console.error(error);
                this.handle500Errors();
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },
        handleRowClick(rowID) {
            try {
                const team = this.teams.find((element) => element.id === rowID);
                this.$router.push({
                    name: 'ManageTeamEdit',
                    params: {
                        publicId: team.id,
                    },
                });
            } catch (e) {
                console.error('Row in Teams table does not have a public ID.');
            }
        },
        handleAddTeamButtonClick() {
            this.$router.push({
                name: 'ManageTeamAdd',
            });
        },
    },
  
};
</script>

