<template>
    <FormPanel v-show="leadSources.length" label="Lead Sources">
        <template v-slot:sub-label>
            All of the User's lead sources.
            <br><br>
            To view all of your company's available lead sources, <SmartLink href="/lender/admin/lead-source-pricing" target="_blank">click here</SmartLink>.
        </template>
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow align-items="end">
                <BrightColumn desktop="8">
                    <BrightDropdownSelect
                        v-bind="bindAncestorInput('assignments.defaultLeadSource')"
                        :disabled="!isAuthenticatedUserAnAdmin"
                        :hide-meta-label="!isAuthenticatedUserAnAdmin"
                        @update:modelValue="handleInputDefaultLeadSource"
                    />
                    <InputLeadSources
                        v-bind="bindAncestorInput('assignments.leadSources')"
                        no-items-message="This User is not assigned to any Lead Sources."
                        :all-possible-items="leadSources.map(leadSource => leadSource.id)"
                        :get-object-representation-of-item-by-id="getLeadSourceObjectById"
                        :default-lead-source-id="formDataCurrentOfAncestor.assignments.defaultLeadSource"
                        @update:modelValue="handleInputLeadSources"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import SmartLink from "@/components/navigation/SmartLink.vue";
import _cloneDeep from "lodash/cloneDeep.js";
import InputLeadSources from "@/views/manage/internal-users/form/tabs/assignments/components/InputLeadSources.vue";
import { useLenderStore } from '@/stores/lender';
import { mapState } from 'pinia';

export default {
    name: "PanelLeadSources",
    components: { InputLeadSources, SmartLink },
    mixins: [FormDescendantMixin],
    computed: {
        ...mapState(useLenderStore, {
            leadSources: store => store.leadSources,
        }),
    },
    methods: {
        handleInputDefaultLeadSource(id) {
            this.handleAncestorInput('assignments.defaultLeadSource', id);
            let leadSources = _cloneDeep(this.formDataCurrentOfAncestor.assignments.leadSources);
            if (id && !leadSources.includes(id)) {
                leadSources.push(id);
                this.handleAncestorInput('assignments.leadSources', leadSources);
            }
        },
        getLeadSourceObjectById(id) {
            let leadSource = this.leadSources.find(leadSource => leadSource.id === id);
            return {
                id: id,
                name: leadSource.displayName,
            };
        },
        handleInputLeadSources(ids) {
            this.handleAncestorInput('assignments.leadSources', ids);
            if (!ids.includes(this.formDataCurrentOfAncestor.assignments.defaultLeadSource)) {
                this.handleAncestorInput('assignments.defaultLeadSource', '');
            }
        },
    },
};
</script>
