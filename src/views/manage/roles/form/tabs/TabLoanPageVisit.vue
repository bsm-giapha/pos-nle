<template>
    <div>
        <FormPanel label="Borrower Information">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.borrowerInformation" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Communication">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.communication" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Documents">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.documents" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Fees & Financing">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.feesFinancing" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Application Details">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.loanApplicationDetails" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Auditing">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.auditing" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Pricing">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.pricing" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Requests">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.requests" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Tools">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.tools" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Other">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in uncategorizedPermissions" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.loanPageVisitPermissions"
                                v-bind="bindAncestorInput(`loanPageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`loanPageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "TabLoanPageVisit",
    mixins: [FormDescendantMixin],
    data() {
        return {
            permissionPanels: {
                borrowerInformation: [
                    'IncomeTaxAnalysis',
                    'Conditions',
                    'Credit',
                ],
                communication: [
                    'CoBrowsing',
                    'Messages',
                ],
                documents: [
                    'Documents',
                    'DocumentManager',
                ],
                feesFinancing: [
                    'Fees',
                    'Fundings',
                    'Payments',
                ],
                loanApplicationDetails: [
                    'ChangeOfCircumstance',
                    'Application',
                    'Assignments',
                    'AUS',
                    'Notes',
                ],
                auditing: [
                    'History',
                    'UserLenderAssignmentHistory',
                    'Status',
                ],
                pricing: [
                    'SearchResults',
                    'LockPricing',
                ],
                requests: [
                    'PricingConcession',
                    'ChangeRequest',
                ],
                tools: [
                    'ClosingCenter',
                    'Sandbox',
                    'Services',
                    'Tasks',
                    'Summary',
                ],
            },
        };
    },
    computed: {
        uncategorizedPermissions() {
            return Object.keys(this.formDataCurrentOfAncestor.loanPageVisitPermissions).filter(key => {
                return !this.categorizedPermissions.includes(key);
            });
        },
        categorizedPermissions() {
            let categorizedPermissions = [];
            Object.values(this.permissionPanels).forEach(permissions => {
                categorizedPermissions = categorizedPermissions.concat(permissions);
            });
            return categorizedPermissions;
        },
    },
};
</script>
