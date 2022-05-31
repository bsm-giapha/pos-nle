<template>
    <div>
        <BrightCard :bordered="false" class="AppPagePadding" no-padding>
            <BrightTable
                id="consumerEmailsTable"
                size="small"
                show-refresh-button
                row-class="hover:cursor-pointer"
                :show-horizontal-divider="false"
                :bordered="false"
                :columns="[
                    { name: 'Send Email', key: 'sendEmail', filterable: true, excludeFromSearch: true, sort: 'none' },
                    { name: 'Description', key: 'description' },
                    { name: 'Trigger', key: 'triggerDescription' },
                    { name: 'To', key: 'toRecipient' },
                    { name: 'CC', key: 'ccRecipients' },
                    { name: 'From', key: 'fromRecipient' },
                    { name: 'Reply-To', key: 'replyToRecipient' },
                ]"
                :rows="rows"
                :filters="[
                    { columnKey: 'sendEmail', name: 'Send Email', pluralName: 'Send Email' },
                ]"
                :rows-per-page-options="[25, 50, 100]"
                searchable
                @refresh="getRowData(true)"
                @row:click="handleRowClick"
            >
                <template v-slot:column:sendEmail="row">
                    <BrightTag :label="row.sendEmail" :color="row.sendEmail === 'Yes' ? 'green' : 'red'"/>
                </template>
                <template v-slot:column:description="row">
                    <div>{{ row.description }}</div>
                </template>
                <template v-slot:column:triggerDescription="row">
                    <div>{{ row.triggerDescription }}</div>
                </template>
                <template v-slot:column:toRecipient="row">
                    <div>{{ row.toRecipient }}</div>
                </template>
                <template v-slot:column:ccRecipients="row">
                    <div>{{ row.ccRecipients }}</div>
                </template>
                <template v-slot:column:fromRecipient="row">
                    <div>{{ row.fromRecipient }}</div>
                </template>
                <template v-slot:column:replyToRecipient="row">
                    <div>{{ row.replyToRecipient }}</div>
                </template>
            </BrightTable>
        </BrightCard>
    </div>
</template>

<script>
import { usePermissionsStore } from "@/stores/permissions";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import BrightTag from "Bright/components/core-library/tag/BrightTag.vue";
import axios from "axios";
import { useNavigationStore } from "@/stores/navigation";
import { useLenderStore } from "@/stores/lender";

export default {
    name: "ViewConsumerEmails",
    components: {
        BrightTag,
        BrightCard,
        BrightIcon,
        BrightTable,
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const permissions = usePermissionsStore();
            if (!permissions.hasPageVisitPermission('AdminConfigsEmails')) {
                vm.$router.push({ name: "UnAuthorized403", params: { '0': to.path } });
                return;
            }
            const navigation = useNavigationStore();
            navigation.updateNavigation({
                pageName: 'Consumer Emails',
                backBar: {
                    to: { name: 'ManageSettings' },
                    label: 'Settings',
                },
                breadcrumbs: {
                    label: 'Manage',
                },
                tabs: [
                    { to: { name: 'ManageConsumerEmails' }, label: 'Consumer Emails' },
                    { to: { name: 'ManageInternalEmails' }, label: 'Internal Emails' },
                    { to: { name: 'ManageExternalEmails' }, label: 'External Emails' },
                ],
            });
            vm.getRowData();
        });
    },
    data() {
        return {
            rows: [],
        };
    },
    computed: {
        resourceURL() {
            const lender = useLenderStore();
            return `${lender.baseLenderURL}/consumer-emails`;
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

                this.rows = responseData.map(email => {
                    let cc = email.ccRecipients.join(', ');
                    let ccList;
                    if (cc) {
                        ccList = email.ccList ? `${cc}, ${email.ccList}` : cc;
                    } else {
                        ccList = email.ccList;
                    }

                    return {
                        sendEmail: email.isSendEmail ? "Yes" : "No",
                        description: email.description,
                        triggerDescription: email.triggerDescription,
                        toRecipient: email.toRecipient,
                        ccRecipients: ccList,
                        fromRecipient: email.fromRecipient,
                        replyToRecipient: email.replyToRecipient || '',
                    };
                });
            }).catch((error) => {
                console.error(error);
            }).then(() => {
                navigation.stopLoadingAnimation();
            });
        },
        handleRowClick(rowID) {
            // TODO: Implement with form.
        },
    },
};
</script>
