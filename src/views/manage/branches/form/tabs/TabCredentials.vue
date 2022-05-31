<template>
    <div class="TabCredentials">
        <FormPanel label="LOS">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn>
                        <BrightInputText
                            v-bind="bindAncestorInput('credentials.losUsername')"
                            @update:modelValue="handleAncestorInput('credentials.losUsername', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn>
                        <BrightInputPassword
                            v-bind="bindAncestorInput('credentials.losPassword')"
                            @update:modelValue="handleAncestorInput('credentials.losPassword', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Product Pricing Engine (PPE)">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn>
                        <BrightInputText
                            v-bind="bindAncestorInput('credentials.ppeUsername')"
                            @update:modelValue="handleAncestorInput('credentials.ppeUsername', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn>
                        <BrightInputPassword
                            v-bind="bindAncestorInput('credentials.ppePassword')"
                            @update:modelValue="handleAncestorInput('credentials.ppePassword', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";
import BrightInputPassword from "@/bright/components/input-library/password/BrightInputPassword.vue";
export default {
    name: "TabCredentials",
    components: {
        BrightInputPassword,
    },
    mixins: [FormDescendantMixin],
};
</script>

<style scoped>

</style>
