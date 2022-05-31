<template>
    <div class="border p-32">
        <BrightTable
            id="bulkEditUsersTable"
            ref="table"
            :bulk-edit-actions="[
                { eventName: 'assigntoteam', action: 'Assign To Team', icon: 'assignment' },
                { eventName: 'changerole', action: 'Change Role', icon: 'star' },
            ]"
            :columns="[
                { name: 'ID', key: 'id' },
                { name: 'User', key: 'user' },
                { name: 'Role', key: 'role' },
            ]"
            :rows="[
                { id: 1, user: 'Mary Lee', role: 'Loan Officer' },
                { id: 2, user: 'Jess Sea', role: 'Processor' },
                { id: 3, user: 'Sonny Graves', role: 'Loan Officer' },
                { id: 4, user: 'John Smith', role: 'Admin' },
                { id: 5, user: 'Jerome Smith', role: 'Support' },
                { id: 6, user: 'Loco Motion', role: 'Loan Officer' },
                { id: 7, user: 'Mort Gage', role: 'Admin' },
                { id: 8, user: 'Maria Garcia', role: 'Underwriter' },
                { id: 9, user: 'Pitt Rock', role: 'Processor' },
                { id: 10, user: 'Ann Wilson', role: 'Loan Officer' },
                { id: 11, user: 'Sarah Johnson', role: 'Loan Officer' },
            ]"
            :rows-per-page-options="[5, 10, 15]"
        />
    </div>
</template>

<script>
import BrightTable from "@/bright/components/layout-library/table/BrightTable";

export default {
    name: "VuePressTableBulkEditingDemo",
    components: { BrightTable },
    mounted() {
        const tableComponent = this.$refs.table;
        const tableComponentID = this.$refs.table.id;
        const bulkEditActionButtons = document.querySelectorAll("#" + tableComponentID + "BulkEditActionsContainer button[id*='" + tableComponentID + "']");

        for (const [key, button] of Object.entries(bulkEditActionButtons)) {
            button.addEventListener('click', function() {
                const selectedRows = tableComponent.$_getBulkEditableSelectedRows();
                if (selectedRows !== '') {
                    let action = tableComponent.bulkEditActions[key].action;
                    if (action === undefined) action = tableComponent.bulkEditActions[key].eventName;

                    alert('The "' + action + '" action was applied to ' + selectedRows.length + ' row(s) with the following table row id(s): \n - ' + selectedRows.join('\n - '));
                }
            });
        }

    },
};
</script>

<style scoped>

</style>
