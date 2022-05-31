<template>
    <BrightModalPopup
        id="copyTeamModal"
        close-focus-i-d="=copyTeamButton"
        :label="copyTeamLabel"
        :show="showCopyTeamModal"
        @closed="closePopup"
    >
        <BrightGrid>
            <BrightRow>
                <BrightColumn>
                    <div class="text-center">
                        <div v-show="!isTeamCopying && !isTeamCopied && !didCopyTeamFail">
                            A copy of {{ teamName }} will be created.
                        </div>
                        <div v-show="isTeamCopied">{{ teamName }} has been successfully copied.</div>
                        <div v-show="didCopyTeamFail">There was an issue copying the team.  Please contact customer support.</div>
                    </div>
                </BrightColumn>
            </BrightRow>
            <BrightRow gutters="none">
                <BrightColumn class="text-center">
                    <BrightLoader :is-loading="isTeamCopying"/>
                    <BrightIcon v-show="isTeamCopied" class="text-h1 text-green-500" use="check_circle"/>
                    <BrightIcon v-show="didCopyTeamFail" class="text-h1 text-yellow-500" use="report_problem"/>
                    <BrightButton
                        v-show="!isTeamCopying && !isTeamCopied && !didCopyTeamFail"
                        class="mt-16 -mb-8"
                        full-width
                        use="primary"
                        @click="copyTeam"
                        @keydown.space.enter="copyTeam"
                    >
                        Copy Team
                    </BrightButton>
                    <BrightButton
                        v-show="clonedTeamId && isTeamCopied"
                        class="mt-16 -mb-8"
                        full-width
                        use="primary"
                        @click="viewClonedTeam"
                        @keydown.space.enter="viewClonedTeam"
                    >
                        View Cloned Team
                    </BrightButton>
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </BrightModalPopup>
</template>

<script>
import BrightModalPopup from "@/bright/components/overlay-library/modal/BrightModalPopup.vue";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader.vue";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import axios from "axios";
export default {
    name: "ConfirmCopyTeamModal",
    components: { BrightLoader, BrightModalPopup },
    mixins: [FormDescendantMixin],
    props: {
        showModal: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['closed', 're-render-form'],
    data() {
        return {
            showCopyTeamModal: false,
            isTeamCopying: false,
            isTeamCopied: false,
            didCopyTeamFail: false,
            clonedTeamId: '',
        };
    },
    computed: {
        teamName() {
            return this.formDataCurrentOfAncestor.name;
        },
        copyTeamLabel() {
            if (this.isTeamCopying) {
                return 'Copying...';
            }
            if (this.isTeamCopied) {
                return 'Team Copied';
            }
            if (this.didCopyTeamFail) {
                return 'Team Failed to Copy';
            }
            return 'Copy Team?';
        },
    },
    watch: {
        showModal(newValue) {
            if (newValue) {
                this.resetData();
                this.showCopyTeamModal = newValue;
            } else {
                this.closePopup();
            }
        },
    },
    methods: {
        resetData() {
            this.isTeamCopying = false;
            this.isTeamCopied = false;
            this.didCopyTeamFail = false;
            this.clonedTeamId = '';
            this.showCopyTeamModal = false;
        },
        closePopup() {
            this.resetData();
            this.$emit('closed');
        },
        copyTeam() {
            axios.post(`${this.ancestorApiResourceUrl}/copy-team`)
                .then((response) => {
                    this.clonedTeamId = response.data.data[0];
                    this.isTeamCopied = true;
                }).catch((error) => {
                    console.error(error);
                    this.didCopyTeamFail = true;
                }).finally(() => {
                    this.isTeamCopying = false;
                });
            this.isTeamCopying = true;
        },
        viewClonedTeam() {
            this.$router.push({
                name: 'ManageTeamEdit',
                params: {
                    publicId: this.clonedTeamId ?? '',
                },
            }).then(() => {
                this.resetData();
                this.$emit('re-render-form');
            });
        },
    },
};
</script>
