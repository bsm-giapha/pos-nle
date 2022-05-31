<template>
    <div>
        <FormPanel label="AMC">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.amc" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Campaigns">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.campaigns" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Loan Application">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.loanApplication" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="System">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.system" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
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
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Dashboard">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.dashboard" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Fees">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.fees" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Hierarchy">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.hierarchy" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Logs">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.logs" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Organization">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.organization" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="PPE">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.ppe" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Rates">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.rates" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Resources">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.resources" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
                            />
                        </span>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
        <FormPanel label="Users">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow allign-items="end">
                    <BrightColumn desktop="8">
                        <span v-for="key in permissionPanels.users" :key="key">
                            <BrightSwitch
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
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
                                v-if="key in formDataCurrentOfAncestor.pageVisitPermissions"
                                v-bind="bindAncestorInput(`pageVisitPermissions.${key}`)"
                                @update:modelValue="handleAncestorInput(`pageVisitPermissions.${key}`, $event)"
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
    name: "TabPageVisit",
    mixins: [FormDescendantMixin],
    data() {
        return {
            permissionPanels: {
                amc: [
                    'EditAMCExclusion',
                    'CanManageAMCVendorFee',
                ],
                campaigns: [
                    'AdminManageUserSpecificCampaigns',
                    'AdminCampaigns',
                ],
                loanApplication: [
                    'AdminConfigsApplication',
                    'AdminConditions',
                    'AdminCoupons',
                    'CustomAssignmentRules',
                    'AdminProducts',
                ],
                system: [
                    'AdminConfigsEmails',
                    'AdminManageFiles',
                    'AdminUTM',
                ],
                credentials: [
                    'AdminCompany',
                    'AdminManageCredentials',
                ],
                dashboard: [
                    'ManageAgentDashboard',
                    'AdminDashboardContents',
                ],
                fees: [
                    'CanManageFeeTemplates',
                    'AdminFees',
                ],
                hierarchy: [
                    'AdminBranches',
                    'AddBranches',
                    'ManageLenderTeams',
                ],
                logs: [
                    'CanManageLoanLogReports',
                    'ViewAuditLog',
                    'AdminConfigsHistory',
                ],
                organization: [
                    'AdminManageClients',
                    'AdminDealers',
                    'AdminVendors',
                ],
                ppe: [
                    'AdminBsmCustomPPE',
                    'AdminManagePPEFilter',
                    'AdminLeadSourcePricing',
                    'AdminPricingFields',
                    'UpdatePricingTiers',
                ],
                rates: [
                    'ManageMIRates',
                    'ManageRates',
                ],
                resources: [
                    'AdminFAQs',
                    'AdminReporting',
                ],
                users: [
                    'AdminAgents',
                    'AdminBrokers',
                    'AdminBrokersUsers',
                    'AdminUsers',
                ],
            },
        };
    },
    computed: {
        uncategorizedPermissions() {
            return Object.keys(this.formDataCurrentOfAncestor.pageVisitPermissions).filter(key => {
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
