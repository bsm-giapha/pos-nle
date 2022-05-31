<template>
    <div>
        <FormPanel label="Platform">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn>
                        <BrightSwitch
                            v-bind="bindAncestorInput('status')"
                            @update:modelValue="handleAncestorInput('status', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn>
                        <BrightInputText
                            v-bind="bindAncestorInput('name')"
                            @update:modelValue="handleAncestorInput('name', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn>
                        <BrightInputTextarea
                            v-bind="bindAncestorInput('description')"
                            @update:modelValue="handleAncestorInput('description', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Members">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn desktop="8">
                        <InputTeamMembers
                            v-bind="ancestorBindDescendantInput('members')"
                            no-items-message="No Members have been assigned."
                            :all-possible-items="loanOfficers.filter(loanOfficer => loanOfficer.account.accountStatus === true).map((loanOfficer) => loanOfficer.id)"
                            :get-object-representation-of-item-by-id="getLoanOfficerObjectById"
                            @update:modelValue="handleAncestorInput('members', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputTeamMembers from "@/views/manage/teams/form/components/InputTeamMembers.vue";
import { useLenderStore } from '@/stores/lender';
export default {
    name: "FormTeam",
    components: { InputTeamMembers },
    mixins: [FormDescendantMixin],
    computed: {
        loanOfficers() {
            const lender = useLenderStore();
            return lender.loanOfficers;
        },
    },
    methods: {
        getLoanOfficerObjectById(id) {
            let loanOfficer = this.loanOfficers.find(user => user.id === id);
            if (loanOfficer) {
                return {
                    id: loanOfficer.id,
                    name: loanOfficer.account.firstName + ' ' + loanOfficer.account.lastName,
                    role: loanOfficer.assignments.role.name,
                };
            }
        },
    },
};
</script>

<style scoped>

</style>
