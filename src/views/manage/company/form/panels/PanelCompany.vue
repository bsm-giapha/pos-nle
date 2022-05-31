<template>
    <div class="PanelCompany">
        <FormPanel label="Company">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('name')"
                            @update:modelValue="handleAncestorInput('name', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('nameLegal')"
                            @update:modelValue="handleAncestorInput('nameLegal', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('nmls')"
                            @update:modelValue="handleAncestorInput('nmls', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('tin')"
                            @update:modelValue="handleAncestorInput('tin', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('urlName')"
                            @update:modelValue="handleAncestorInput('urlName', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('urlEndpoint')"
                            @update:modelValue="handleAncestorInput('urlEndpoint', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputText
                            v-bind="bindAncestorInput('website')"
                            @update:modelValue="handleAncestorInput('website', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputGroup label="Legal Holidays">
                            <SmartLink :href="'/lender/admin/holiday-calendar'">
                                Holiday Calendar
                            </SmartLink>
                        </BrightInputGroup>
                    </BrightColumn>
                </BrightRow>
                <BrightRow align-items="end">
                    <BrightColumn desktop="8">
                        <BrightInputTextarea
                            v-bind="bindAncestorInput('about')"
                            @update:modelValue="handleAncestorInput('about', $event)"
                        />
                        <BrightDivider class="mt-20 mb-24"/>
                        <InputStateLicensing
                            v-bind="ancestorBindDescendantInput('stateLicensing')"
                            no-items-message="No State Licenses have been assigned to your company."
                            :get-object-representation-of-item-by-id="getStateLicensingObjectById"
                            :allow-free-input="true"
                            :items-in-list-are-objects="true"
                            @update:modelValue="handleAncestorInput('stateLicensing', $event)"
                        />
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import InputStateLicensing from "../components/InputStateLicensing.vue";
import SmartLink from "@/components/navigation/SmartLink.vue";
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "PanelCompany",
    components: { SmartLink, InputStateLicensing },
    mixins: [FormDescendantMixin],
    methods: {
        getStateLicensingObjectById(id) {
            let license = this.formDataCurrentOfAncestor.stateLicensing.find(license => license.id === id);
            return {
                ...license,
                name: license.state,
            };
        },
    },
};
</script>
