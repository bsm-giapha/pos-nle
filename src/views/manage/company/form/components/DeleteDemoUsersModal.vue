<template>
    <BrightModalPopup
        id="deleteDemoUsers"
        close-focus-i-d="restoreDefaultButton"
        :label="deleteAllDemoUsersLabel"
        :show="showDeleteDemoUsersModal"
        @closed="closePopup"
    >
        <BrightGrid>
            <BrightRow>
                <BrightColumn>
                    <div class="text-center">
                        <div v-show="!isDeletingDemoUsers && !isDemoUsersDeleted && !didDeletingDemoUsersFail">
                            All demo users will be deleted.
                        </div>
                        <div v-show="isDemoUsersDeleted">All demo users have been deleted.</div>
                        <div v-show="didDeletingDemoUsersFail">There was an issue deleting demo users. Please contact customer support.</div>
                    </div>
                </BrightColumn>
            </BrightRow>
            <BrightRow gutters="none">
                <BrightColumn class="text-center">
                    <BrightLoader :is-loading="isDeletingDemoUsers"/>
                    <BrightIcon v-show="isDemoUsersDeleted" class="text-h1 text-green-500" use="check_circle"/>
                    <BrightIcon v-show="didDeletingDemoUsersFail" class="text-h1 text-yellow-500" use="report_problem"/>
                    <BrightButton
                        v-show="!isDeletingDemoUsers && !isDemoUsersDeleted && !didDeletingDemoUsersFail"
                        class="mt-16 -mb-8"
                        full-width
                        use="primary"
                        @click="handleDeleteDemoUsers"
                        @keydown.space.enter="handleDeleteDemoUsers"
                    >
                        Delete All Demo Users
                    </BrightButton>
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </BrightModalPopup>
</template>

<script>
import { useLenderStore } from "@/stores/lender";
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import axios from "axios";
export default {
    name: "DeleteAllDemoUsersModal",
    components: { BrightButton, BrightIcon, BrightLoader, BrightColumn, BrightRow, BrightGrid, BrightModalPopup },
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['closed'],
    data() {
        return {
            isDeletingDemoUsers: false,
            isDemoUsersDeleted: false,
            didDeletingDemoUsersFail: false,
            showDeleteDemoUsersModal: false,
        };
    },
    computed: {
        resourceURL() {
            const lender = useLenderStore();
            return `${lender.baseLenderURL}/company/delete-all-demo-users`;
        },
        deleteAllDemoUsersLabel() {
            if (this.isDeletingDemoUsers) {
                return 'Deleting All Demo Users...';
            }
            if (this.isDemoUsersDeleted) {
                return 'All Demo Users Deleted';
            }
            if (this.didDeletingDemoUsersFail) {
                return 'Deleting All Demo Users Failed';
            }

            return 'Delete All Demo Users?';
        },
    },
    watch: {
        showModal(newValue) {
            if (newValue) {
                this.resetData();
                this.showDeleteDemoUsersModal = newValue;
            } else {
                this.closePopup();
            }
        },
    },
    methods: {
        resetData() {
            this.isDemoUsersDeleted = false;
            this.isDeletingDemoUsers = false;
            this.didDeletingDemoUsersFail = false;
            this.showDeleteDemoUsersModal = false;
        },
        closePopup() {
            this.resetData();
            this.$emit('closed');
        },
        handleDeleteDemoUsers() {
            this.isDeletingDemoUsers = true;
            axios.post(this.resourceURL)
                .then(() => {
                    this.isDemoUsersDeleted = true;
                }).catch((error) => {
                    console.error(error);
                    this.didDeletingDemoUsersFail = true;
                }).finally(() => {
                    this.isDeletingDemoUsers = false;
                });
        },
    },
};
</script>
