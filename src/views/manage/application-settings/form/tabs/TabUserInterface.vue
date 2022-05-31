<template>
    <div class="TabUserInterface">
        <PanelSignupPage v-bind="bindDescendant"/>

        <FormPanel label="Terms of Use & Privacy Pages">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('userInterface.useDefaultTOUPP')"
                            @update:modelValue="handleAncestorInput('userInterface.useDefaultTOUPP', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-show="!formDataCurrentOfAncestor.userInterface.useDefaultTOUPP"
                            v-bind="bindAncestorInput('userInterface.termsOfUseURL')"
                            @update:modelValue="handleAncestorInput('userInterface.termsOfUseURL', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-show="!formDataCurrentOfAncestor.userInterface.useDefaultTOUPP"
                            v-bind="bindAncestorInput('userInterface.privacyPolicyURL')"
                            @update:modelValue="handleAncestorInput('userInterface.privacyPolicyURL', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>

        <FormPanel label="Masking">
            <BrightGrid align-items="end">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputNumber
                            v-bind="bindAncestorInput('userInterface.numberOfDigitsToShowWhenDisplayingBorrowerAssetsAndLiabilities')"
                            @update:modelValue="handleAncestorInput('userInterface.numberOfDigitsToShowWhenDisplayingBorrowerAssetsAndLiabilities', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelSignupPage from "@/views/manage/application-settings/form/tabs/user-interface/PanelSignupPage.vue";

export default {
    name: "TabUserInterface",
    components: { PanelSignupPage },
    mixins: [FormDescendantMixin],
};
</script>
