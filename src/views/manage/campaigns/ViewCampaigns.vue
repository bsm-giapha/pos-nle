<template>
    <BrightCard :bordered="false" class="AppPagePadding" no-padding>
        <div class="__typography--heading--3 text-grey-900">All Campaigns</div>
        <div>
            <ViewCampaignsConfirmAction ref="viewCampaignsConfirmAction" @action-complete="getRowData"/>
        </div>
        <BrightTable
            id="campaignsTable"
            size="small"
            show-refresh-button
            row-class="hover:cursor-pointer"
            :show-horizontal-divider="false"
            :bordered="false"
            :columns="[
                { name: 'Status', key: 'status', filterable: true, excludeFromSearch: true, sort: 'none' },
                { name: 'Name', key: 'name' },
                { name: 'Subscription Type', key: 'subscriptionType', filterable: true, excludeFromSearch: true },
                { name: 'Links', key: 'links', excludeFromSearch: true, sort: 'none' },
                { name: 'Actions', key: 'actions', align: 'center', excludeFromSearch: true, sort: 'none', headerClass: 'w-1/5' },
            ]"
            :rows="rows"
            :filters="[
                { columnKey: 'status', name: 'Status', pluralName: 'Status', operator: 'equalTo', value: ['Active'] },
                { columnKey: 'subscriptionType', name: 'Subscription Type', pluralName: 'Subscription Types' },
            ]"
            :bulk-edit-actions="[
                { eventName: 'suspend', action: 'Suspend', icon: 'pause' },
                { eventName: 'resume', action: 'Resume', icon: 'play_arrow' },
            ]"
            :rows-per-page-options="[25, 50, 100]"
            searchable
            :server-side-data="serverSideData"
            @refresh="getRefreshedRows"
            @page-update="getUpdatedPages"
            @filter-update="getFilteredRows"
            @search-update="getSearchedRows"
            @sort-update="getSortedRows"
            @row:click="handleUserRowClick"
            @suspendbulkeditbutton:clicked="handleBulkEditActions"
            @resumebulkeditbutton:clicked="handleBulkEditActions"
        >
            <template v-slot:actions>
                <BrightButton
                    use="primary"
                    size="small"
                    icon="add"
                    icon-position="prefix"
                    @click="handleAddCampaignButtonClick"
                >
                    Add a Campaign
                </BrightButton>
            </template>
            <template v-slot:column:status="row">
                <BrightTag :label="isActive(row.status) ? 'Active' : 'Inactive'" :color="isActive(row.status) ? 'green' : 'red'"/>
            </template>
            <template v-slot:column:links="row">
                <div
                    v-for="(link, index) in row.links"
                    :key="index + link"
                    class="mt-14 mb-12"
                    @click.stop
                >
                    <span class="font-bold">{{ index }} Link: </span><SmartLink :href="link" target="_blank">{{ link }}</SmartLink>
                    <BrightTooltip text="Copy Link">
                        <BrightIcon
                            use="content_copy"
                            class="ml-4 text-h5 text-blue-500"
                            tabindex="0"
                            @click="handleCopy(link)"
                            @keydown.space.enter="handleCopy(link)"
                        />
                    </BrightTooltip>
                    <BrightTooltip text="Download QR Code">
                        <SmartLink :href="`/qr?text=${link}&name=${row.urlName}`">
                            <!-- TODO: qr_code icon is not working -->
                            <BrightIcon
                                use="apps"
                                class="ml-4 text-h5 text-blue-500"
                                tabindex="0"
                                @click="handleQRDownload()"
                                @keydown.space.enter="handleQRDownload()"
                            />
                        </SmartLink>
                    </BrightTooltip>
                </div>
            </template>
            <template v-slot:column:actions="row">
                <BrightDropdownSelect
                    :id="row.id + '-Actions'"
                    class="inline-block"
                    tabindex="0"
                    :label="'View Actions for ' + row.name"
                    placeholder=""
                    hierarchy="tertiary"
                    icon="more_vert"
                    icon-position="center"
                    :button-full-width="false"
                    form-control="none"
                    dummy
                    hide-label
                    hide-arrow
                    rounded
                    :options="[
                        { label: 'Actions', options: getActionsOptions(row.status) },
                    ]"
                    @option:selected="handleRowAction($event, row)"
                    @click.stop
                />
            </template>
        </BrightTable>
    </BrightCard>
</template>

<script>
import { ResourceTableMixin } from "@/mixins/table/helpers/ResourceTableMixin";
import ViewCampaignsConfirmAction from "@/views/manage/campaigns/components/ViewCampaignsConfirmAction.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightTag from "@/bright/components/core-library/tag/BrightTag.vue";
import BrightTooltip from "@/bright/components/overlay-library/BrightTooltip.vue";
import SmartLink from "@/components/navigation/SmartLink.vue";
import axios from "axios";
import _cloneDeep from "lodash/cloneDeep";
import { useNavigationStore } from '@/stores/navigation';
import { usePermissionsStore } from '@/stores/permissions';
import { useLenderStore } from '@/stores/lender';
import { useAuthenticatedUserStore } from '@/stores/authenticatedUser';
const _BrightNotificationFactory = new BrightNotificationFactory();

export default {
    name: "ViewCampaigns",
    components: {
        ViewCampaignsConfirmAction,
        BrightButton,
        BrightCard,
        BrightIcon,
        BrightDropdownSelect,
        BrightTable,
        BrightTag,
        BrightTooltip,
        SmartLink,
    },
    mixins: [ResourceTableMixin],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permisisons = usePermissionsStore();
            const navigation = useNavigationStore();
            if (!permisisons.hasPageVisitPermission('AdminCampaigns')) {
                vm.$router.push({ name: "404", params: { '0': to.path } });
                return;
            }
            navigation.updateNavigation({
                pageName: 'Campaigns',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
            });
        });
    },
    data() {
        const lender = useLenderStore();
        return {
            baseResourceURL: `${lender.baseLenderURL}/campaigns`,
        };
    },
    computed: {
        isAuthenticatedUserAnAdmin() {
            const lender = useLenderStore();
            const authenticatedUser = useAuthenticatedUserStore();
            const currentRole = authenticatedUser.assignments.role.id;
            const matchingLenderRole = lender.roles.find(role => role.id === currentRole);
            if (matchingLenderRole) {
                return matchingLenderRole.subroles.includes('Admin');
            }
            return false;
        },
    },
    methods: {
        getRowData() {
            const navigation = useNavigationStore();
            navigation.startLoadingAnimation();
            Promise.all([
                axios.get(this.getResourceURL()),
            ]).then((response) => {
                this.serverSideData = _cloneDeep(response[0].data.__metadata__);
                this.setServerSideData();

                let responseData = response[0].data.data;
                this.rows = responseData.map(campaign => {
                    const information = campaign.information;
                    return {
                        id: campaign.id,
                        status: information.isActive ? "Active" : "Inactive",
                        name: information.name,
                        urlName: information.urlName,
                        subscriptionType: information.subscriptionType === "Public" ? "Public" : "Loan Officer Specific",
                        links: Object.keys(information.links).length ? information.links : "",
                        actions: '',
                    };
                });
            }).catch((error) => {
                console.error(error);
                this.handle500Errors();
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },

        setFilterServerSideData() {
            this.serverSideData.filter = {};
            this.serverSideData.filter.status = [{ name: 'Active' }, { name: 'Inactive' }];
            this.serverSideData.filter.subscriptionType = [{ name: 'Public' }, { name: 'Loan Officer Specific' }]; // TODO: Use form fields to obtain this data instead.
        },

        handleAddCampaignButtonClick() {
            this.$router.push({
                name: 'ManageCampaignAdd',
            });
        },

        handleUserRowClick(rowID) {
            try {
                const campaign = this.rows.find((element) => element.id === rowID);
                this.$router.push({
                    name: 'ManageCampaignEditTabInformation',
                    params: {
                        publicId: campaign.id,
                    },
                });
            } catch (e) {
                console.error('Row in Campaigns table does not have a public ID.');
            }
        },

        handleCopy(link) {
            navigator.clipboard.writeText(link);
            _BrightNotificationFactory.createNotification({
                type: 'success',
                icon: 'check_circle',
                duration: 4000,
                label: 'Link was copied successfully.',
            });
        },

        handleQRDownload() {
            _BrightNotificationFactory.createNotification({
                type: 'success',
                icon: 'check_circle',
                duration: 4000,
                label: 'QR code was downloaded successfully.',
            });
        },

        getActionsOptions(campaignStatus) {
            let options = [
                { label: 'Edit', icon: 'edit', value: 'edit' },
            ];

            if (this.isActive(campaignStatus)) {
                options.push({ label: 'Suspend', icon: 'pause', value: 'suspend' });
            } else {
                options.push({ label: 'Resume', icon: 'play_arrow', value: 'resume' });
            }

            if (this.isAuthenticatedUserAnAdmin) {
                options.push(
                    { label: 'Clone', icon: 'content_copy', value: 'clone' },
                    { label: 'Delete', icon: 'delete', value: 'delete' },
                );
            }

            return options;
        },

        handleBulkEditActions(event) {
            this.handleAction(event.action, event.rowIDs);
        },

        handleRowAction(action, campaign) {
            this.handleAction(action, [campaign.id], campaign.name);
        },

        handleAction(action, campaignIDs, campaignName = "") {
            const viewCampaignsConfirmAction = this.$refs.viewCampaignsConfirmAction;

            if (action !== 'edit') viewCampaignsConfirmAction.$_showModal();

            switch (action) {
                case 'suspend':
                    viewCampaignsConfirmAction.$_suspendCampaign(campaignIDs, campaignName);
                    break;
                case 'resume':
                    viewCampaignsConfirmAction.$_resumeCampaign(campaignIDs, campaignName);
                    break;
                case 'clone':
                    viewCampaignsConfirmAction.$_cloneCampaign(campaignIDs, campaignName);
                    break;
                case 'delete':
                    viewCampaignsConfirmAction.$_deleteCampaign(campaignIDs, campaignName);
                    break;
                default:
                    break;
            }
        },

        isActive(status) {
            return status === 'Active';
        },
    },
};
</script>

