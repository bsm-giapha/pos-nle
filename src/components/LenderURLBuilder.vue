<template>
    <BrightModalPopout
        id="resetPasswordModal"
        close-focus-i-d="resetPasswordButton"
        label="URL Builder"
        :show="showModal"
        width="medium"
        @closed="$emit('closed')"
    >
        <div class="LenderURLBuilder">
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow v-show="source !== 'lender'" gutters="none">
                    <BrightColumn v-show="source !== 'branch'" mobile="12">
                        <BrightDropdownSelect
                            id="branchList"
                            v-model="selectedBranch"
                            label="Branch"
                            sub-label="For branch-specific links."
                            form-control="tight"
                            :disabled="branchesOptions.length === 0"
                            :options="branchesOptions"
                            optional
                            @option:selected="onBranchSelected($event)"
                        />
                    </BrightColumn>
                    <BrightColumn v-show="source !== 'campaign'" mobile="12">
                        <BrightDropdownSelect
                            id="campaignList"
                            v-model="selectedCampaign"
                            label="Campaign"
                            sub-label="For campaign-specific links."
                            form-control="tight"
                            :disabled="campaignsOptions.length === 0"
                            :options="campaignsOptions"
                            optional
                            @option:selected="onCampaignSelected($event)"
                        />
                    </BrightColumn>
                    <BrightColumn v-show="source !== 'internalUser'" mobile="12">
                        <BrightDropdownSelect
                            id="loanOfficerList"
                            v-model="selectedLoanOfficer"
                            label="Loan Officer"
                            sub-label="For loan officer-specific links."
                            form-control="tight"
                            :disabled="assignedLoanOfficersOptions.length === 0"
                            :options="assignedLoanOfficersOptions"
                            optional
                            @option:selected="onLoanOfficerSelected($event)"
                        />
                    </BrightColumn>
                </BrightRow>
                <BrightRow v-show="isFiltered" class="mt-8 pb-8">
                    <BrightColumn class="px-0">
                        <BrightButton
                            id="clearListButton"
                            use="tertiary"
                            size="small"
                            @click="handleClearListButton"
                        >Reset to Default</BrightButton>
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn v-show="source !== 'lender'" class="px-0">
                        <BrightDivider/>
                    </BrightColumn>
                </BrightRow>
                <BrightRow>
                    <BrightColumn class="px-0">
                        <div class="LenderURLBuilder__Section mt-8">
                            <div class="LenderURLBuilder__Section__Header">
                                <div class="inline-block LenderURLBuilder__Section__Header--signup">
                                    <BrightIcon use="person_add" class="LenderURLBuilder__Section__Header__Icon"/>
                                </div>
                                <div class="LenderURLBuilder__Section__Header--label">
                                    SIGNUP (BORROWER)
                                </div>
                            </div>
                            <div class="LenderURLBuilder__Section__Body">
                                <div class="LenderURLBuilder__Section--sublabel">{{
                                    signupUrlSubLabel
                                }}</div>
                                <div class="LenderURLBuilder__Section__Action">
                                    <BrightButton
                                        use="secondary"
                                        class="my-4 inline-block"
                                        size="small"
                                        @click="handleCopySignupButton"
                                    >COPY LINK</BrightButton>
                                    <div id="signupLink" class="LenderURLBuilder__Section__Action--url">{{ signupUrl }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="LenderURLBuilder__Section">
                            <div class="LenderURLBuilder__Section__Header">
                                <div class="inline-block LenderURLBuilder__Section__Header--marketplace">
                                    <BrightIcon use="shopping_cart" class="LenderURLBuilder__Section__Header__Icon"/>
                                </div>
                                <div class="LenderURLBuilder__Section__Header--label">
                                    MARKETPLACE (BORROWER)
                                </div>
                            </div>
                            <div class="LenderURLBuilder__Section__Body">
                                <div class="LenderURLBuilder__Section--sublabel">{{ marketplaceUrlSubLabel }}</div>
                                <div class="LenderURLBuilder__Section__Action">
                                    <BrightButton
                                        use="secondary"
                                        class="my-4 inline-block"
                                        size="small"
                                        @click="handleCopyMarketplaceButton"
                                    >COPY LINK</BrightButton>
                                    <div class="LenderURLBuilder__Section__Action--url">{{ marketplaceUrl }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="LenderURLBuilder__Section">
                            <div class="LenderURLBuilder__Section__Header">
                                <div class="inline-block LenderURLBuilder__Section__Header--login">
                                    <BrightIcon use="important_devices" class="LenderURLBuilder__Section__Header__Icon"/>
                                </div>
                                <div class="LenderURLBuilder__Section__Header--label">
                                    LOGIN (BORROWER)
                                </div>
                            </div>
                            <div class="LenderURLBuilder__Section__Body">
                                <div class="LenderURLBuilder__Section--sublabel">Allows a borrower to login and continue their application.</div>
                                <div class="LenderURLBuilder__Section__Action">
                                    <BrightButton
                                        use="secondary"
                                        class="my-4 inline-block"
                                        size="small"
                                        @click="handleCopyLoginButton"
                                    >COPY LINK</BrightButton>
                                    <div class="LenderURLBuilder__Section__Action--url">{{ loginUrl }}</div>
                                </div>
                            </div>
                        </div>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </div>
    </BrightModalPopout>
</template>

<script>
import BrightGrid from "../bright/components/layout-library/grid/BrightGrid.vue";
import BrightRow from "../bright/components/layout-library/grid/BrightRow.vue";
import BrightColumn from "../bright/components/layout-library/grid/BrightColumn.vue";
import BrightButton from "../bright/components/core-library/button/BrightButton.vue";
import BrightDropdownSelect from "../bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import BrightIcon from "../bright/components/core-library/icon/BrightIcon.vue";
import BrightDivider from "../bright/components/layout-library/divider/BrightDivider.vue";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory.js";
const _BrightNotificationFactory = new BrightNotificationFactory();
import { useLenderStore } from "@/stores/lender";

import _cloneDeep from "lodash/cloneDeep";
import BrightModalPopout from "@/bright/components/overlay-library/modal/BrightModalPopout.vue";

export default {
    name: "LenderURLBuilder",
    components: {
        BrightModalPopout,
        BrightDivider,
        BrightButton,
        BrightGrid,
        BrightRow,
        BrightColumn,
        BrightDropdownSelect,
        BrightIcon,
    },
    inheritAttrs: true,
    props: {
        showModal: {
            type: Boolean,
            default: false,
            required: true,
        },
        lenderID: {
            type: String,
            default: () => '',
            required: true,
        },
        lenderNameFriendly: {
            type: String,
            default: () => '',
            required: false,
        },
        source: {
            type: String,
            default: () => '',
            required: true,
        },
        loanOfficers: {
            type: Array,
            default: () => [],
            required: false,
        },
        campaigns: {
            type: Array,
            default: () => [],
            required: false,
        },
        branches: {
            type: Array,
            default: () => [],
            required: false,
        },
        branch: {
            type: Object,
            default: () => {},
            required: false,
        },
        loanOfficer: {
            type: Object,
            default: () => {},
            required: false,
        },
        campaign: {
            type: Object,
            default: () => {},
            required: false,
        },
        baseURL: {
            type: String,
            default: () => '',
            required: true,
        },
    },
    emits: ['closed'],
    data: function() {
        return {
            selectedBranch: '',
            selectedLoanOfficer: '',
            selectedCampaign: '',
            filteredBranches: _cloneDeep(this.branches),
            filteredLoanOfficers: _cloneDeep(this.loanOfficers),
            filteredCampaigns: _cloneDeep(this.campaigns),
            isFiltered: false,
        };
    },
    computed: {
        signupUrlSubLabel() {
            let label = 'Allows a borrower to signup';

            if (this.source === 'internalUser') {
                label += ` with ${this.loanOfficer.account.firstName} as their assigned Loan Officer`;
            } else if (this.selectedLoanOfficer) {
                let lo = this.loanOfficers.filter(loanOfficer => loanOfficer.id === this.selectedLoanOfficer)[0];
                label += ` with ${lo.account.firstName + ' ' + lo.account.lastName} as their assigned Loan Officer`;
            }

            if (this.selectedBranchName) {
                label += ` from ${this.selectedBranchName} branch`;
            }
            
            if (this.campaign) {
                label += ` with campaign, ${this.campaign.information.name}`;
            } else if (this.selectedCampaign) {
                let campaignName = this.campaigns.filter(campaign => campaign.id === this.selectedCampaign)[0].name;
                label += ` with campaign, ${campaignName}`;
            }

            if (this.source === 'lender') {
                label += ' generically with your company. It is typically used on your website';
            }
            
            return label + '.';
        },
        marketplaceUrlSubLabel() {
            let label = 'Allows a potential borrower to shop for rates. If they decide to apply with a product in mind, then';

            if (this.source === 'internalUser') {
                label += ` ${this.loanOfficer.account.firstName} ${this.loanOfficer.account.lastName} ${this.selectedBranchName ? 'from ' + this.selectedBranchName + ' branch ' : ''}will be assigned to the borrower as their Loan Officer`;
            } else if (this.selectedLoanOfficer) {
                let loanOfficer = this.loanOfficers.filter(lo => lo.id === this.selectedLoanOfficer)[0];
                label += ` ${loanOfficer.account.firstName + ' ' + loanOfficer.account.lastName} ${this.selectedBranchName ? 'from ' + this.selectedBranchName + ' branch ' : ''}will be assigned to the borrower as their Loan Officer`;
            } else {
                label += ` a Loan Officer ${this.selectedBranchName ? 'from ' + this.selectedBranchName + ' branch ' : ''}will be assigned to the borrower`;
            }

            if (this.campaign) {
                label += ` with campaign, ${this.campaign.information.name}`;
            } else if (this.selectedCampaign) {
                let campaignName = this.campaigns.filter(campaign => campaign.id === this.selectedCampaign)[0].name;
                label += ` with campaign, ${campaignName}`;
            }
          
            return label + '.';
        },
        selectedBranchName() {
            if (this.source === 'branch') {
                return this.branch.information.name;
            }
            if (this.selectedBranch) {
                return this.branches.filter(branch => branch.id === this.selectedBranch)[0].information.name;
            }
            
            return '';
        },
        signupUrl() {
            let url = this.baseURL + '/app/signup';
            let campaign, branch, loanOfficer;

            if (this.lenderNameFriendly) {
                url += `/p/${this.lenderNameFriendly}`;
            } else {
                url += `/partner/${this.lenderID}`;
            }

            if (this.selectedBranch) {
                branch = this.branches.filter(branch => branch.id === this.selectedBranch)[0];
            } else if (this.source === 'branch') {
                branch = this.branch;
            }
            
            if (branch) {
                if (branch.information.urlName) {
                    url += `/b/${branch.information.urlName}`;
                } else {
                    url += `/b/${branch.id}`;
                }
            }

            if (this.selectedLoanOfficer) {
                loanOfficer = this.loanOfficers.filter(loanOfficer => loanOfficer.id === this.selectedLoanOfficer)[0];
            } else if (this.source === 'internalUser') {
                loanOfficer = this.loanOfficer;
            }
            
            if (loanOfficer) {
                if (loanOfficer.licensingCredentials.nameFriendly) {
                    url += `/${loanOfficer.licensingCredentials.nameFriendly}`;
                } else {
                    url += `/${loanOfficer.id}`;
                }
            }

            if (this.selectedCampaign) {
                campaign = this.campaigns.filter(campaign => campaign.id === this.selectedCampaign)[0];
                url += `?campaign=${campaign.information.urlName}`;
            } else if (this.campaign) {
                url += `?campaign=${this.campaign.information.urlName}`;
            }

            return url;
        },
        marketplaceUrl() {
            let url = this.baseURL;
            let campaign, loanOfficer, branch;

            url += `/partner/${this.lenderNameFriendly ? this.lenderNameFriendly : this.lenderID}`;

            if (this.selectedBranch) {
                branch = this.branches.filter(branch => branch.id === this.selectedBranch)[0];
                url += `/b/${branch.id}`;
            } else if (this.source === 'branch') {
                url += `/b/${this.branch.id}`;
            }

            if (this.selectedLoanOfficer) {
                loanOfficer = this.loanOfficers.filter(loanOfficer => loanOfficer.id === this.selectedLoanOfficer)[0];
                url += `/${loanOfficer.id}`;
            } else if (this.source === 'internalUser') {
                url += `/${this.loanOfficer.id}`;
            }
            
            url += '/search';

            if (this.selectedCampaign) {
                campaign = this.campaigns.filter(campaign => campaign.id === this.selectedCampaign)[0];
                url += `?campaign=${campaign.information.urlName}`;
            } else if (this.campaign) {
                url += `?campaign=${this.campaign.information.urlName}`;
            }
            
            return url;
        },
        loginUrl() {
            let url = this.baseURL + '/app/login';
            let branch;

            url += `/partner/${this.lenderID}`;
  
            if (this.selectedBranch) {
                branch = this.branches.filter(branch => branch.id === this.selectedBranch)[0];

                // If branch has name friendly, the pattern needs to have /p/{lenderID}, else /partner/{lenderID}
                if (branch.information.urlName) {
                    url = url.replace('partner', 'p');
                    url += `/b/${branch.information.urlName}`;
                } else {
                    url += `/b/${branch.id}`;
                }
            }

            return url;
        },
        branchesOptions() {
            let branches = [];

            if (this.isFiltered) {
                branches = _cloneDeep(this.filteredBranches);
            } else {
                branches = _cloneDeep(this.branches);
            }
            
            if (branches.length > 0) {
                branches = branches.map(branch => {
                    return {
                        label: branch.information.name,
                        value: branch.id,
                    };
                });
                branches.unshift({ label: 'None', value: 0 });
            }
            return branches;
        },
        assignedLoanOfficersOptions() {
            let loanOfficers = [];
            
            if (this.isFiltered) {
                loanOfficers = _cloneDeep(this.filteredLoanOfficers);
            } else {
                loanOfficers = _cloneDeep(this.loanOfficers);
            }
          
            if (loanOfficers.length > 0) {
                loanOfficers = loanOfficers.map(loanOfficer => {
                    return {
                        label: `${loanOfficer.account.firstName} ${loanOfficer.account.lastName}`,
                        value: loanOfficer.id,
                    };
                });
                loanOfficers.unshift({ label: 'None', value: 0 });
            }

            return loanOfficers;
        },
        campaignsOptions() {
            let campaigns = [];

            // Check if lists have been filtered, then assign filteredCampaigns. Otherwise, set to initial list.
            if (this.isFiltered) {
                campaigns = _cloneDeep(this.filteredCampaigns);
            } else {
                campaigns = _cloneDeep(this.campaigns);
            }
          
            if (campaigns.length > 0) {
                campaigns = campaigns.map(campaign => {
                    const additionalLabelText = campaign.information.subscriptionType === 2 ? " (LO Subscription)" : "";
                    return {
                        label: campaign.information.name + additionalLabelText,
                        value: campaign.id,
                    };
                });
                campaigns.unshift({ label: 'None', value: 0 });
            }
            
            return campaigns;
        },
    },
    methods: {
        getPublicCampaigns() {
            const lender = useLenderStore();
            return lender.campaigns && lender.campaigns.length > 0 ? lender.campaigns.filter(campaign => campaign.information.isActive && campaign.information.isPublic) : [];
        },
        getPublicCampaignIds() {
            return this.getPublicCampaigns().map(campaign => campaign.id);
        },
        onBranchSelected(value) {
            this.selectedBranch = value;
            let filteredLoanOfficers = _cloneDeep(this.loanOfficers);
            let filteredCampaigns = _cloneDeep(this.campaigns);
            let branch = this.branches.filter(branch => branch.id === value)[0];

            // Set filtered branches if this is the first filter or the list will be empty.
            if (!this.isFiltered) {
                this.filteredBranches = _cloneDeep(this.branches);
            }
            
            if (value) {
                if (this.source !== 'internalUser') {
                    // Add LO specific campaigns from LOs in this Branch
                    filteredCampaigns = this.getPublicCampaigns();
                    let filteredCampaignsIDs = filteredCampaigns.map(campaign => campaign.id);
                    filteredLoanOfficers = this.loanOfficers.filter(loanOfficer => branch.assignments.assignedLoanOfficers.some(branchLO => branchLO.id === loanOfficer.id));
                    filteredLoanOfficers.forEach(loanOfficer => {
                        loanOfficer.assignments.campaigns.forEach(campaign => {
                            if (!filteredCampaignsIDs.includes(campaign.id)) {
                                filteredCampaigns.push(campaign);
                                filteredCampaignsIDs.push(campaign.id);
                            }
                        });
                    });
                }
            }

            // Check if selected loan officer is no longer in filtered loan officers list to properly update selected loan officer value to empty
            if (filteredLoanOfficers.filter(loanOfficer => loanOfficer.id === this.selectedLoanOfficer).length === 0) {
                this.selectedLoanOfficer = '';
            }

            // Check if selected campaign is no longer in filtered campaigns list to properly update selected campaign value to empty
            if (filteredCampaigns.filter(campaign => campaign.id === this.selectedCampaign).length === 0) {
                this.selectedCampaign = '';
            }

            this.isFiltered = true;
            this.filteredLoanOfficers = filteredLoanOfficers;
            this.filteredCampaigns = filteredCampaigns;
        },
        onLoanOfficerSelected(value) {
            this.selectedLoanOfficer = value;
            let filteredBranches = _cloneDeep(this.branches);
            let filteredCampaigns = this.getPublicCampaigns();

            // Set filtered loan officers to initial list if this is the first filter or the list will be empty.
            if (!this.isFiltered) {
                this.filteredLoanOfficers = _cloneDeep(this.loanOfficers);
            }
            
            if (value) {
                let lo = this.loanOfficers.filter(loanOfficer => loanOfficer.id === value)[0];

                // Add LO specific campaigns onto list of campaigns
                let filteredCampaignIDs = filteredCampaigns.map(campaign => campaign.id);
                filteredCampaigns = filteredCampaigns.concat(lo.assignments.campaigns.filter(campaign => !filteredCampaignIDs.includes(campaign.id)));

                // Filter branch list to have branches where the LO is assigned to
                if (this.source !== 'branch') {
                    filteredBranches = filteredBranches.filter(branch => branch.assignments.assignedLoanOfficers.some(loanOfficer => loanOfficer.id === value));
                }
            }

            // Check if selected campaign is no longer in filtered campaigns list to properly update selected campaign value to empty
            if (filteredCampaigns.filter(campaign => campaign.id === this.selectedCampaign).length === 0) {
                this.selectedCampaign = '';
            }
            // Check if selected branch is no longer in filtered branches list to properly update selected branch value to empty
            if (filteredBranches.filter(branch => branch.id === this.selectedBranch).length === 0) {
                this.selectedBranch = '';
            }

            this.isFiltered = true;
            this.filteredCampaigns = filteredCampaigns;
            this.filteredBranches = filteredBranches;
        },
        onCampaignSelected(value) {
            this.selectedCampaign = value;
            let filteredBranches = _cloneDeep(this.branches);
            let filteredLoanOfficers = _cloneDeep(this.loanOfficers);

            // Set filtered campaigns to initial list if this is the first filter or the list will be empty.
            if (!this.isFiltered) {
                this.filteredCampaigns = _cloneDeep(this.campaigns);
            }

            if (value) {
                // If selected campaign is not a public campaign, then filter LO list to have just LOs in that campaign.
                if (!this.getPublicCampaignIds().includes(value)) {
                    let selectCampaign = this.campaigns.filter(campaign => campaign.id === this.selectedCampaign)[0];
                    filteredLoanOfficers = this.loanOfficers.filter(loanOfficer => selectCampaign.assignedLoanOfficers.some(campaignLO => campaignLO.id === loanOfficer.id));
                }
                
                if (this.source !== 'internalUser') {
                    // Filter branch list to include branches where LOs belong to.
                    filteredBranches = this.branches.filter(branch => {
                        let { assignedLoanOfficers } = branch.assignments;
                        for (let i = 0; i < assignedLoanOfficers.length; i++) {
                            for (let j = 0; j < filteredLoanOfficers.length; j++) {
                                if (assignedLoanOfficers[i].id === filteredLoanOfficers[j].id) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    });
                }
            }

            // Check if selected branch is no longer in filtered branches list to properly update selected branch value to empty
            if (filteredBranches.filter(branch => branch.id === this.selectedBranch).length === 0) {
                this.selectedBranch = '';
            }
  
            // Check if selected loan officer is no longer in filtered loan officers list to properly update selected loan officer value to empty
            if (filteredLoanOfficers.filter(loanOfficer => loanOfficer.id === this.selectedLoanOfficer).length === 0) {
                this.selectedLoanOfficer = '';
            }
          
            this.isFiltered = true;
            this.filteredLoanOfficers = filteredLoanOfficers;
            this.filteredBranches = filteredBranches;
        },
        handleCopySignupButton() {
            navigator.clipboard.writeText(this.signupUrl);
            _BrightNotificationFactory.createNotification({
                type: 'success',
                icon: 'check_circle',
                duration: 4000,
                label: 'Linked Copied',
                subLabel: 'Sign-up link was copied successfully.',
            });
        },
        handleCopyMarketplaceButton() {
            navigator.clipboard.writeText(this.marketplaceUrl);
            _BrightNotificationFactory.createNotification({
                type: 'success',
                icon: 'check_circle',
                duration: 4000,
                label: 'Linked Copied',
                subLabel: 'Marketplace link was copied successfully.',
            });
        },
        handleCopyLoginButton() {
            navigator.clipboard.writeText(this.loginUrl);
            _BrightNotificationFactory.createNotification({
                type: 'success',
                icon: 'check_circle',
                duration: 4000,
                label: 'Linked Copied',
                subLabel: 'Login link was copied successfully.',
            });
        },
        handleClearListButton() {
            this.filteredLoanOfficers = _cloneDeep(this.loanOfficers);
            this.filteredBranches = _cloneDeep(this.branches);
            this.filteredCampaigns = _cloneDeep(this.campaigns);
            this.selectedCampaign = '';
            this.selectedBranch = '';
            this.selectedLoanOfficer = '';
            this.isFiltered = false;
        },
    },
};
</script>

<style scoped>

</style>
