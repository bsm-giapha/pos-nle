<template>
    <div class="CustomScripts">
        <PanelConsumer v-bind="bindDescendant"/>

        <FormPanel label="Scripts - LO Portal" sub-label="Place Javascript code inside <script></script> blocks.">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow>
                    <BrightColumn tablet="6">
                        <BrightInputTextarea
                            v-bind="bindAncestorInput('customScripts.customScriptHeadTop1LoPortal')"
                            @update:modelValue="handleAncestorInput('customScripts.customScriptHeadTop1LoPortal', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import PanelConsumer from "@/views/manage/campaigns/form/tabs/custom-scripts/PanelConsumer.vue";

export default {
    name: "TabCustomScripts",
    components: { PanelConsumer },
    mixins: [FormDescendantMixin],
};
</script>
