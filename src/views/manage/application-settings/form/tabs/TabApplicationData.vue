<template>
    <div class="TabApplicationData">
        <PanelBorrowerInformation v-bind="bindDescendant"/>

        <FormPanel label="Down Payment">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('applicationData.requireSourceOfDownPayment')"
                            @update:modelValue="handleAncestorInput('applicationData.requireSourceOfDownPayment', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <PanelEmployment v-bind="bindDescendant"/>

        <FormPanel label="Declarations">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('applicationData.prePopulateDeclarationsPage')"
                            @update:modelValue="handleAncestorInput('applicationData.prePopulateDeclarationsPage', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Subject Property">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('applicationData.subjectPropertyIsKnown')"
                            @update:modelValue="handleAncestorInput('applicationData.subjectPropertyIsKnown', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('applicationData.availableAddressTypesForSubjectProperty')"
                            @update:modelValue="handleAncestorInput('applicationData.availableAddressTypesForSubjectProperty', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightDropdownSelect
                            v-bind="bindAncestorInput('applicationData.availableAddressTypesForTBDLoans')"
                            @update:modelValue="handleAncestorInput('applicationData.availableAddressTypesForTBDLoans', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelBorrowerInformation from "@/views/manage/application-settings/form/tabs/application-data/PanelBorrowerInformation.vue";
import PanelEmployment from "@/views/manage/application-settings/form/tabs/application-data/PanelEmployment.vue";

export default {
    name: "TabApplicationData",
    components: { PanelBorrowerInformation, PanelEmployment },
    mixins: [FormDescendantMixin],
};
</script>
