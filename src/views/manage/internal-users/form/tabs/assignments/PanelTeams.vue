<template>
    <FormPanel v-show="teams.length" label="Teams">
        <template v-slot:sub-label>
            All of the User's assigned teams.
            <br><br>
            To view all of your company's available teams, <SmartLink href="/lender/admin/teams" target="_blank">click here</SmartLink>.
        </template>
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <InputTeams
                        v-bind="bindAncestorInput('assignments.teams')"
                        no-items-message="No Teams have been assigned to this User."
                        :all-possible-items="teams.map(team => team.id)"
                        :get-object-representation-of-item-by-id="getTeamObjectById"
                        @update:modelValue="handleAncestorInput('assignments.teams', $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import SmartLink from "@/components/navigation/SmartLink.vue";
import InputTeams from "@/views/manage/internal-users/form/tabs/assignments/components/InputTeams.vue";
import { useLenderStore } from '@/stores/lender';
import { mapState } from 'pinia';

export default {
    name: "PanelTeams",
    components: { InputTeams, SmartLink },
    mixins: [FormDescendantMixin],
    computed: {
        ...mapState(useLenderStore, {
            teams: store => store.teams,
        }),
    },
    methods: {
        getTeamObjectById(id) {
            let team = this.teams.find(team => team.id === id);
            return {
                id: id,
                name: team.name,
            };
        },
    },
};
</script>
