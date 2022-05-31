<template>
    <div>
        <FormPanel label="Status">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('information.isActive')"
                            @update:modelValue="handleAncestorInput('information.isActive', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="About">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('information.name')"
                            @update:modelValue="handleAncestorInput('information.name', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputTextarea
                            v-bind="bindAncestorInput('information.description')"
                            @update:modelValue="handleAncestorInput('information.description', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-show="!isUWMOrUWMBroker" align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputTextarea
                            v-bind="bindAncestorInput('information.friendlyDescription')"
                            @update:modelValue="handleAncestorInput('information.friendlyDescription', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Categorization">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('information.type')"
                            @update:modelValue="handleAncestorInput('information.type', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('information.status')"
                            @update:modelValue="handleAncestorInput('information.status', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('information.docType')"
                            @update:modelValue="handleAncestorInput('information.docType', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Settings">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <InputConditionFees
                            v-bind="bindAncestorInput('information.fees')"
                            no-items-message="This Condition has no fees associated with it."
                            :all-possible-items="formDataCurrentOfAncestor.information.fees"
                            :items-in-list-are-objects="true"
                            :allow-free-input="true"
                            @update:modelValue="handleAncestorInput('information.fees', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-show="lenderConfiguration('isSkipPayroll') === 1 && formDataCurrentOfAncestor.information.docType === 'Pay Stubs'" align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputNumber
                            v-bind="bindAncestorInput('information.payStubRequestedNumberOfDays')"
                            @update:modelValue="handleAncestorInput('information.payStubRequestedNumberOfDays', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('information.wetSignInitDocName')"
                            @update:modelValue="handleAncestorInput('information.wetSignInitDocName', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Assignments">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('information.isBorrowerSpecific')"
                            @update:modelValue="handleAncestorInput('information.isBorrowerSpecific', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('information.assignedTo')"
                            @update:modelValue="handleAncestorInput('information.assignedTo', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-if="inputMetadataOfAncestor.information.resourceFile.length > 0" align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('information.resourceFile')"
                            @update:modelValue="handleAncestorInput('information.resourceFile', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import InputConditionFees from "@/views/manage/loan-conditions/form/tabs/components/InputConditionFees.vue";
import { useLenderStore } from '@/stores/lender';

export default {
    name: "TabInformation",
    components: { InputConditionFees },
    mixins: [FormDescendantMixin],
    computed: {
        isUWMOrUWMBroker() {
            const lender = useLenderStore();
            return lender.isUWMOrUWMBroker;
        },
    },
};
</script>
