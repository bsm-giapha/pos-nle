<template>
    <div class="AppLenderManageSettings">
        <BrightCard
            class="AppPagePadding bg-grey-50 z-0 -mb-12"
            no-padding
            :bordered="false"
            :rounded="false"
        >
            <div class="mb-8 __typography--heading--5 text-grey-900">Search</div>
            <BrightInputText
                id="lenderManageSettingsSearch"
                v-model="searchValue"
                input-class="bg-white"
                label="Search"
                size="large"
                optional
                hide-label
                hide-meta-label
            />
        </BrightCard>
        <BrightCard
            class="AppPagePadding z-0"
            no-padding
            :bordered="false"
            :rounded="false"
        >
            <div v-if="displayedUserManagementSettings.length > 0" class="SettingGroup">
                <div class="mb-16 __typography--heading--5 text-grey-900">User Management</div>
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="start" gutters="small">
                        <BrightColumn
                            v-for="settingsPage in displayedUserManagementSettings"
                            :key="`UserManagement-${settingsPage.label}`"
                            desktop="4"
                            tablet="6"
                            mobile="12"
                            class="mb-16"
                        >
                            <router-link :to="{ name: settingsPage.namedRouteLink }">
                                <BrightCard
                                    :class="`SettingCard SettingCard--${settingsPage.namedRouteLink.length > 0 ? 'Enabled' : 'Disabled'}`"
                                    :label="settingsPage.label"
                                    :sub-label="settingsPage.subLabel"
                                    size="small"
                                >
                                    <template v-slot:left>
                                        <BrightIcon class="SettingIcon" :use="settingsPage.icon"/>
                                    </template>
                                </BrightCard>
                            </router-link>
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </div>

            <div v-if="displayedBorrowerExperienceSettings.length > 0" class="SettingGroup">
                <div class="mb-16 __typography--heading--5 text-grey-900">Borrower Experience</div>
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="start" gutters="small">
                        <BrightColumn
                            v-for="settingsPage in displayedBorrowerExperienceSettings"
                            :key="`LoanApplication-${settingsPage.label}`"
                            desktop="4"
                            tablet="6"
                            mobile="12"
                            class="mb-16"
                        >
                            <router-link :to="{ name: settingsPage.namedRouteLink }">
                                <BrightCard
                                    :class="`SettingCard SettingCard--${settingsPage.namedRouteLink.length > 0 ? 'Enabled' : 'Disabled'}`"
                                    :label="settingsPage.label"
                                    :sub-label="settingsPage.subLabel"
                                    size="small"
                                >
                                    <template v-slot:left>
                                        <BrightIcon class="SettingIcon" :use="settingsPage.icon"/>
                                    </template>
                                </BrightCard>
                            </router-link>
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </div>

            <div v-if="displayedWorkflowAndRulesSettings.length > 0" class="SettingGroup">
                <div class="mb-16 __typography--heading--5 text-grey-900">Workflow & Rules</div>
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="start" gutters="small">
                        <BrightColumn
                            v-for="settingsPage in displayedWorkflowAndRulesSettings"
                            :key="`WorkflowRules-${settingsPage.label}`"
                            desktop="4"
                            tablet="6"
                            mobile="12"
                            class="mb-16"
                        >
                            <router-link :to="{ name: settingsPage.namedRouteLink }">
                                <BrightCard
                                    :class="`SettingCard SettingCard--${settingsPage.namedRouteLink.length > 0 ? 'Enabled' : 'Disabled'}`"
                                    :label="settingsPage.label"
                                    :sub-label="settingsPage.subLabel"
                                    size="small"
                                >
                                    <template v-slot:left>
                                        <BrightIcon class="SettingIcon" :use="settingsPage.icon"/>
                                    </template>
                                </BrightCard>
                            </router-link>
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </div>

            <div v-if="displayedPlatformSettings.length > 0" class="SettingGroup">
                <div class="mb-16 __typography--heading--5 text-grey-900">Platform</div>
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="start" gutters="small">
                        <BrightColumn
                            v-for="settingsPage in displayedPlatformSettings"
                            :key="`Platform-${settingsPage.label}`"
                            desktop="4"
                            tablet="6"
                            mobile="12"
                            class="mb-16"
                        >
                            <router-link :to="{ name: settingsPage.namedRouteLink }">
                                <BrightCard
                                    :class="`SettingCard SettingCard--${settingsPage.namedRouteLink.length > 0 ? 'Enabled' : 'Disabled'}`"
                                    :label="settingsPage.label"
                                    :sub-label="settingsPage.subLabel"
                                    size="small"
                                >
                                    <template v-slot:left>
                                        <BrightIcon class="SettingIcon" :use="settingsPage.icon"/>
                                    </template>
                                </BrightCard>
                            </router-link>
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </div>

            <div v-if="displayedVendorsAndSystemsSettings.length > 0" class="SettingGroup">
                <div class="mb-16 __typography--heading--5 text-grey-900">Vendors & Systems</div>
                <BrightGrid full-width gutters-vertical="none">
                    <BrightRow align-items="start" gutters="small">
                        <BrightColumn
                            v-for="settingsPage in displayedVendorsAndSystemsSettings"
                            :key="`VendorsSystems-${settingsPage.label}`"
                            desktop="4"
                            tablet="6"
                            mobile="12"
                            class="mb-16"
                        >
                            <router-link :to="{ name: settingsPage.namedRouteLink }">
                                <BrightCard
                                    :class="`SettingCard SettingCard--${settingsPage.namedRouteLink.length > 0 ? 'Enabled' : 'Disabled'}`"
                                    :label="settingsPage.label"
                                    :sub-label="settingsPage.subLabel"
                                    size="small"
                                >
                                    <template v-slot:left>
                                        <BrightIcon class="SettingIcon" :use="settingsPage.icon"/>
                                    </template>
                                </BrightCard>
                            </router-link>
                        </BrightColumn>
                    </BrightRow>
                </BrightGrid>
            </div>
        </BrightCard>
    </div>
</template>

<script>
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightInputText from "@/bright/components/input-library/text/BrightInputText.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn.vue";
import { mapState } from "pinia";
import { useNavigationStore } from "@/stores/navigation.js";
import { usePermissionsStore } from "@/stores/permissions.js";

const userManagementSettings = [
    {
        pageVisitPermission: 'AdminUsers',
        namedRouteLink: 'ManageInternalUsers',
        label: 'Internal Users',
        subLabel: 'Manage your company\'s internal users, including Loan Officers and Admins.',
        icon: 'supervisor_account',
        searchTerms: [
            'user',
            'users',
            'internal',
            'company',
            'organization',
            'admin',
            'lo',
            'loa',
            'loan',
            'officer',
            'assistant',
            'processor',
            'underwriter',
            'add',
            'delete',
            'reset',
            'password',
            'edit',
        ],
    },
    {
        pageVisitPermission: '',
        namedRouteLink: 'ManageRoles',
        label: 'Roles & Permissions',
        subLabel: 'Manage your company\'s roles and permissions.',
        icon: 'assignment_ind',
        searchTerms: [
            'role',
            'roles',
            'permission',
            'permissions',
            'add',
            'delete',
            'edit',
        ],
    },
    {
        pageVisitPermission: 'AdminBranches',
        namedRouteLink: 'ManageBranches',
        label: 'Branches',
        subLabel: 'Manage your company\'s branches.',
        icon: 'location_city',
        searchTerms: [
            'branches',
            'branch',
            'primary',
            'secondary',
            'add',
            'delete',
            'edit',
        ],
    },
    {
        pageVisitPermission: 'AdminUsers',
        namedRouteLink: 'ManageExternalUsers',
        label: 'External Agents',
        subLabel: 'Manage your company\'s external agents, including Buyer Agents and Seller Agents.',
        icon: 'contact_mail',
        searchTerms: [
            'user',
            'users',
            'external',
            'company',
            'buyer',
            'seller',
            'agent',
            'realtor',
            'add',
            'delete',
            'reset',
            'password',
            'edit',
        ],
    },
    {
        pageVisitPermission: 'ManageLenderTeams',
        namedRouteLink: 'ManageTeams',
        label: 'Teams',
        subLabel: 'Manage your company\'s teams.',
        icon: 'people',
        searchTerms: [
            'team',
            'teams',
            'add',
            'delete',
            'edit',
        ],
    },
];

const borrowerExperienceSettings = [
    {
        pageVisitPermission: 'AdminConfigsApplication',
        namedRouteLink: 'ManageApplicationSettings',
        label: 'Application',
        subLabel: 'Manage settings for your company\'s borrower application workflow.',
        icon: 'settings_applications',
        searchTerms: [
            'application',
            'settings',
            'company',
            'borrower',
            'consumer',
            'workflow',
            '1003',
        ],
    },
    // {
    //     pageVisitPermission: 'AdminDashboardContents',
    //     namedRouteLink: '',
    //     label: 'Borrower Dashboard',
    //     subLabel: 'Manage your company\'s Borrower Dashboard verbiage and display.',
    //     icon: 'dashboard',
    //     searchTerms: [
    //         'borrower',
    //         'consumer',
    //         'dashboard',
    //         'verbiage',
    //         'cta',
    //     ],
    // },
    // {
    //     pageVisitPermission: 'AdminManageFiles',
    //     namedRouteLink: '',
    //     label: 'Branding & Scripts',
    //     subLabel: 'Manage your company\'s branding and custom scripts.',
    //     icon: 'developer_mode',
    //     searchTerms: [
    //         'application',
    //         'branding',
    //         'theme',
    //         'custom',
    //         'script',
    //         'scripts',
    //     ],
    // },
    {
        pageVisitPermission: 'AdminConfigsApplication',
        namedRouteLink: 'ManageVerbiage',
        label: 'Verbiage',
        subLabel: 'Manage the verbiage that appears on your company\'s borrower application.',
        icon: 'spellcheck',
        searchTerms: [
            'verbiage',
            'english',
            'spanish',
            'chinese',
            'vietnamese',
            'consumer',
            'borrower',
            'application',
        ],
    },
];

const workflowAndRulesSettings = [
    {
        pageVisitPermission: 'AdminCampaigns',
        namedRouteLink: 'ManageCampaigns',
        label: 'Campaigns',
        subLabel: 'Manage your company\'s campaigns.',
        icon: 'star',
        searchTerms: [
            'campaign',
            'campaigns',
            'workflow',
            'workflows',
            'configuration',
            'configurations',
            'configs',
            'config',
        ],
    },
    {
        pageVisitPermission: 'AdminConfigsEmails',
        namedRouteLink: 'ManageConsumerEmails',
        label: 'Emails',
        subLabel: 'Manage your company\'s email templates for internal users, agents, and borrowers.',
        icon: 'email',
        searchTerms: [
            'email',
            'internal',
            'consumer',
            'borrower',
            'external',
            'agent',
        ],
    },
    {
        pageVisitPermission: 'AdminConditions',
        namedRouteLink: 'ManageLoanConditions',
        label: 'Loan Conditions',
        subLabel: 'Manage your company\'s rules for generating loan conditions within the platform.',
        icon: 'assignment',
        searchTerms: [
            'loan',
            'condition',
            'conditions',
            'doc',
            'docs',
            'document',
            'documents',
        ],
    },
    {
        pageVisitPermission: 'AdminLeadSourcePricing',
        namedRouteLink: 'ManageLeadSources',
        label: 'Lead Sources',
        subLabel: 'Manage your company\'s lead sources.',
        icon: 'portrait',
        searchTerms: [
            'lead',
            'source',
            'pricing',
        ],
    },
];

const platformSettings = [
    {
        pageVisitPermission: 'AdminCompany',
        namedRouteLink: 'ManageCompanyEdit',
        label: 'Company',
        subLabel: 'Manage general settings for your company.',
        icon: 'business',
        searchTerms: [
            'company',
            'general',
            'setting',
            'settings',
        ],
    },
    // {
    //     pageVisitPermission: 'AdminCompany',
    //     namedRouteLink: '',
    //     label: 'Internal User Dashboards',
    //     subLabel: 'Manage your company\'s internal dashboards for your company\'s users',
    //     icon: 'dashboard',
    //     searchTerms: [
    //         'internal',
    //         'dashboard',
    //         'dashboards',
    //     ],
    // },
    // {
    //     pageVisitPermission: 'ManageAgentDashboard',
    //     namedRouteLink: '',
    //     label: 'Agent Dashboards',
    //     subLabel: 'Manage your company\'s external agent dashboards.',
    //     icon: 'dashboard',
    //     searchTerms: [
    //         'external',
    //         'agent',
    //         'dashboard',
    //         'dashboards',
    //     ],
    // },
];

const vendorsAndSystemsSettings = [
    /*{
        pageVisitPermission: 'AdminVendors',
        namedRouteLink: '',
        label: 'Vendors & Integrations',
        subLabel: 'Manage general settings for the various vendors and integrations that your company uses.',
        icon: 'device_hub',
        searchTerms: [
            'vendor',
            'vendors',
            'integration',
            'integrations',
            'aus',
            'bank',
            'aggregation',
            'credit',
            'docs',
            'document',
            'documents',
            'appraisal',
            'amc',
        ],
    },
    {
        pageVisitPermission: 'AdminCompany', // todo need to change this
        namedRouteLink: '',
        label: 'Product Pricing Engine (PPE)',
        subLabel: 'Manage your company\'s PPE settings.',
        icon: 'shopping_cart',
        searchTerms: [
            'ppe',
            'product',
            'pricing',
            'engine',
            'ob',
            'optimal',
            'blue',
        ],
    },
    {
        pageVisitPermission: 'AdminCompany', // todo need to change this
        namedRouteLink: '',
        label: 'Fees',
        subLabel: 'Manage your company\'s fees.',
        icon: 'monetization_on',
        searchTerms: [
            'ppe',
            'product',
            'pricing',
            'engine',
            'fees',
            'fee',
        ],
    },
    {
        pageVisitPermission: 'AdminConfigsApplication',
        namedRouteLink: '',
        label: 'Impounds & Prepaids',
        subLabel: 'Manage your company\'s impound and prepaid settings.',
        icon: 'account_balance',
        searchTerms: [
            'impound',
            'impounds',
            'prepaid',
            'prepaids',
        ],
    },
    {
        pageVisitPermission: 'AdminCompany',
        namedRouteLink: '',
        label: 'CRM Mappings',
        subLabel: 'Manage your company\'s CRM (Customer Relationship Management) settings.',
        icon: 'map',
        searchTerms: [
            'crm',
            'customer',
            'relationship',
            'management',
            'salesforce',
            'sf',
        ],
    },*/
];

export default {
    name: "ViewSettings",
    components: {
        BrightColumn,
        BrightRow,
        BrightGrid,
        BrightIcon,
        BrightInputText,
        BrightCard,
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
        });
    },
    data() {
        return {
            searchValue: '',
        };
    },
    computed: {
        ...mapState(usePermissionsStore, {
            hasPageVisitPermission: store => store.hasPageVisitPermission,
            hasAnySettingsPageVisitPermissions: store => store.hasAnySettingsPageVisitPermissions,
            canEditRoles: store => store.canEditRoles,
        }),
        displayedUserManagementSettings() {
            return userManagementSettings.filter((page) => {
                return this.hasPageVisitPermission(page.pageVisitPermission) || (page.label === 'Roles & Permissions' && this.canEditRoles);
            });
        },
        displayedBorrowerExperienceSettings() {
            return borrowerExperienceSettings.filter(page => this.hasPageVisitPermission(page.pageVisitPermission));
        },
        displayedWorkflowAndRulesSettings() {
            return workflowAndRulesSettings.filter(page => this.hasPageVisitPermission(page.pageVisitPermission));
        },
        displayedPlatformSettings() {
            return platformSettings.filter(page => this.hasPageVisitPermission(page.pageVisitPermission));
        },
        displayedVendorsAndSystemsSettings() {
            return vendorsAndSystemsSettings.filter(page => this.hasPageVisitPermission(page.pageVisitPermission));
        },
    },
    beforeMount() {
        const navigation = useNavigationStore();
        navigation.fakeLoadingAnimation();
    },
};
</script>
