<template>
    <FormPanel label="Scripts - Consumer" sub-label="Place Javascript code inside <script></script> blocks.">
        <BrightGrid full-width gutters-vertical="none">
            <BrightRow v-for="key in customScripts.headTop" :key="key">
                <BrightColumn tablet="6">
                    <BrightInputTextarea
                        v-bind="bindAncestorInput(`customScripts.${key}`)"
                        @update:modelValue="handleAncestorInput(`customScripts.${key}`, $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-for="key in customScripts.headBottom" :key="key">
                <BrightColumn tablet="6">
                    <BrightInputTextarea
                        v-bind="bindAncestorInput(`customScripts.${key}`)"
                        @update:modelValue="handleAncestorInput(`customScripts.${key}`, $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-for="key in customScripts.betweenHeadBody" :key="key">
                <BrightColumn tablet="6">
                    <BrightInputTextarea
                        v-bind="bindAncestorInput(`customScripts.${key}`)"
                        @update:modelValue="handleAncestorInput(`customScripts.${key}`, $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-for="key in customScripts.bodyTop" :key="key">
                <BrightColumn tablet="6">
                    <BrightInputTextarea
                        v-bind="bindAncestorInput(`customScripts.${key}`)"
                        @update:modelValue="handleAncestorInput(`customScripts.${key}`, $event)"
                    />
                </BrightColumn>
            </BrightRow>
            <BrightRow>
                <BrightColumn>
                    <BrightDivider class="mt-8 mb-24"/>
                </BrightColumn>
            </BrightRow>
            <BrightRow v-for="key in customScripts.footer" :key="key">
                <BrightColumn tablet="6">
                    <BrightInputTextarea
                        v-bind="bindAncestorInput(`customScripts.${key}`)"
                        @update:modelValue="handleAncestorInput(`customScripts.${key}`, $event)"
                    />
                </BrightColumn>
            </BrightRow>
        </BrightGrid>
    </FormPanel>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelConsumer",
    mixins: [FormDescendantMixin],
    data() {
        return {
            customScripts: {
                headTop: [
                    'customScriptHeadTop1',
                    'customScriptHeadTop2',
                    'customScriptHeadTop3',
                ],
                headBottom: [
                    'customScriptHeadBottom1',
                    'customScriptHeadBottom2',
                    'customScriptHeadBottom3',
                ],
                betweenHeadBody: [
                    'customScriptBetweenHeadBody1',
                    'customScriptBetweenHeadBody2',
                    'customScriptBetweenHeadBody3',
                ],
                bodyTop: [
                    'customScriptBodyTop1',
                    'customScriptBodyTop2',
                    'customScriptBodyTop3',
                ],
                footer: [
                    'customScriptFooter',
                ],
            },
        };
    },
};
</script>
