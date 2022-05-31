<template>
    <div class="TabAssignments">
        <FormPanel label="Lead Sources">
            <InputLeadSources
                v-bind="ancestorBindDescendantInput('assignments.branchLeadSourcesList')"
                no-items-message="No Lead Sources have been assigned."
                :all-possible-items="leadSources.map(leadSource => leadSource.id)"
                :get-object-representation-of-item-by-id="getLeadSourceObjectById"
                @update:modelValue="handleAncestorInput('assignments.branchLeadSourcesList', $event)"
            />
        </FormPanel>
        <FormPanel label="Operational Zipcodes">
            <BrightGrid>
                <BrightRow>
                    <BrightColumn>
                        <InputOperationalZipcodes
                            v-bind="ancestorBindDescendantInput('assignments.operationalZipcodes')"
                            no-items-message="No Lead Sources have been assigned."
                            :get-object-representation-of-item-by-id="getOperationalZipcodeObjectById"
                            :items-in-list-are-objects="true"
                            :allow-free-input="true"
                            @update:modelValue="handleAncestorInput('assignments.operationalZipcodes', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputLeadSources from "@/views/manage/branches/form/tabs/assignments/components/InputLeadSources.vue";
import InputOperationalZipcodes from "@/views/manage/branches/form/tabs/assignments/components/InputOperationalZipcodes.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "TabAssignments",
    components: {
        InputOperationalZipcodes,
        InputLeadSources,
    },
    mixins: [FormDescendantMixin],
    computed: {
        leadSources() {
            const lender = useLenderStore();
            return lender.leadSources;
        },
    },
    methods: {
        getLeadSourceObjectById(id) {
            const leadSource = this.leadSources.find(leadSource => leadSource.id === id);
            if (leadSource) {
                return {
                    id: id,
                    name: leadSource.information.name,
                };
            }
        },
        getOperationalZipcodeObjectById(id) {
            return this.formDataCurrentOfAncestor.assignments.operationalZipcodes.find(zipcode => zipcode.id === id);
        },
    },
};
</script>
