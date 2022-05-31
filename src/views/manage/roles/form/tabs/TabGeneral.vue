<template>
    <div>
        <FormPanel label="Company">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.company" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Credentials">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.credentials" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Loan Access">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.loanAccess" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Loan Creation">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.loanCreation" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Loan General">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.loanGeneral" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
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
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="User Management">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.userManagement" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
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
                                v-if="key in formDataCurrentOfAncestor.generalPermissions"
                                v-bind="bindAncestorInput(`generalPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`generalPermissions.${key}`, $event)"
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
    name: "TabGeneral",
    mixins: [FormDescendantMixin],
    data() {
        return {
            permissionPanels: {
                company: [
                    'Resources',
                    'ManageResources',
                    'Tickets',
                    'editHolidayList',
                ],
                credentials: [
                    'AllowUserAUSCredentials',
                    'AllowUserCreditCredentials',
                ],
                loanAccess: [
                    'ViewAllLoans',
                    'ViewAllLoansFromBranch',
                    'ViewEmployeeLoans',
                ],
                loanCreation: [
                    'CreateNewLoanApplication',
                    'CreateLoanApplicationFrom32Import',
                    'CreateLoanApplicationFromLOSImport',
                    'CreateLoanApplicationFromMISMO34',
                ],
                loanGeneral: [
                    'ImportRawCreditMISMO',
                ],
                pricing: [
                    'QuickPricing',
                    'RateSheets',
                    'NewRateSheets',
                    'UseLenderPricingComparisonTool',
                ],
                userManagement: [
                    'CloneLender',
                    'AllowAdminCreateDemoUser',
                    'ExportLOLicenses',
                ],
            },
        };
    },
    computed: {
        uncategorizedPermissions() {
            return Object.keys(this.formDataCurrentOfAncestor.generalPermissions).filter(key => {
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
