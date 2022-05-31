<template>
    <div class="TabInformation">
        <FormPanel label="Platform">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightSwitch
                            v-bind="bindAncestorInput('information.status')"
                            @update:modelValue="handleAncestorInput('information.status', $event)"
                        />
                        <BrightInputText
                            v-bind="bindAncestorInput('information.logoURL')"
                            @update:modelValue="handleAncestorInput('information.logoURL', $event)"
                        />

                        <BrightInputText
                            v-bind="bindAncestorInput('information.urlName')"
                            @update:modelValue="handleAncestorInput('information.urlName', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <PanelInformation v-bind="bindDescendant"/>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelInformation from "@/views/manage/branches/form/tabs/information/PanelInformation.vue";

export default {
    name: "TabInformation",
    components: {
        PanelInformation,
    },
    mixins: [FormDescendantMixin],
};
</script>
