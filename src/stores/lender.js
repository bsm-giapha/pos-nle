import { defineStore } from "pinia";
import { commonUpdate, commonUpsert } from "@/stores/common/actions";
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser";
import axios from "axios";
import { useConfigurationsStore } from "@/stores/configurations";
import { usePermissionsStore } from "@/stores/permissions";

export const useLenderStore = defineStore({
    id: 'lender',
    state: () => {
        return {
            id: '',
            spaIsBootstrapped: false, // TODO Move this to a central module to manage global SPA state
            name: '',
            nameFriendly: '',
            originatorType: '',
            isTPO: false,
            wholesaleLenderID: '',
            appDomain: '',
            isUsingByteLOS: false,
            isUWMOrUWMBroker: false,
            losLoanTemplates: [],
            companyDesignations: [],
            roles: [],
            campaigns: [],
            campaignsForInternalUser: [],
            branches: [],
            loanOfficers: [],
            teams: [],
            creditVendors: [],
            loanOfficerAssistants: [],
            processors: [],
            leadSources: [],
            loanConditions: [],
            externalUsers: [],
        };
    },
    getters: {
        baseLenderURL() {
            return `/lenders/${this.id}`;
        },
        isBroker() {
            return this.wholesaleLenderID && ['Broker', 'Correspondent', 'MiniCorrespondent'].includes(this.originatorType);
        },
    },
    actions: {
        update(payload) {
            commonUpdate(this, payload);
        },
        upsert(payload) {
            commonUpsert(this, payload);
        },
        async bootstrapSPAWithLender(lenderId) {
            const authenticatedUser = useAuthenticatedUserStore();
            const configurations = useConfigurationsStore();
            const permissions = usePermissionsStore();

            this.update({ id: lenderId });
            return Promise.all([
                axios.get(this.baseLenderURL).then(response => {
                    const data = response.data.data[0];
                    this.update(data);
                }),
                this.fetchRoles(),
                authenticatedUser.fetchDataForAuthenticatedUser(),
                configurations.fetchLenderConfigurations(),
                permissions.fetchPermissions(),
            ]).then(() => {
                this.spaIsBootstrapped = true;
            });
        },
        async fetchRoles() {
            return axios.get(`${this.baseLenderURL}/roles?limit=250`)
                .then(response => {
                    this.update({ roles: response.data.data });
                });
        },
        async fetchCampaigns() {
            return axios.get(`${this.baseLenderURL}/campaigns?limit=250`)
                .then(response => {
                    this.update({ campaigns: response.data.data });
                });
        },
        async fetchCampaignsForInternalUser() {
            return axios.get(`${this.baseLenderURL}/campaigns?status=1&subscriptionType_notEqualTo=Public&limit=250`)
                .then(response => {
                    this.update({ campaignsForInternalUser: response.data.data });
                });
        },
        async fetchBranches() {
            return axios.get(`${this.baseLenderURL}/branches?active=1&limit=250`)
                .then(response => {
                    this.update({ branches: response.data.data });
                });
        },
        async fetchLoanOfficers() {
            return axios.get(`${this.baseLenderURL}/internal-users?sort=firstName&order=asc&subrole=Loan Officer&limit=250`)
                .then(response => {
                    this.update({ loanOfficers: response.data.data });
                });
        },
        async fetchTeams() {
            return axios.get(`${this.baseLenderURL}/teams?active=1&limit=250`)
                .then(response => {
                    this.update({ teams: response.data.data });
                });
        },
        async fetchCreditVendors() {
            return axios.get(`/vendors?type=credit&limit=250`)
                .then(response => {
                    this.update({ creditVendors: response.data.data });
                });
        },
        async fetchLoanOfficerAssistants() {
            return axios.get(`${this.baseLenderURL}/internal-users?sort=firstName&order=asc&subrole=Loan Officer Assistant&limit=250`)
                .then(response => {
                    this.update({ loanOfficerAssistants: response.data.data });
                });
        },
        async fetchProcessors() {
            return axios.get(`${this.baseLenderURL}/internal-users?subrole=Processor&limit=250`)
                .then(response => {
                    this.update({ processors: response.data.data });
                });
        },
        async fetchLeadSources() {
            return axios.get(`${this.baseLenderURL}/lead-sources?limit=250`)
                .then(response => {
                    this.update({ leadSources: response.data.data });
                });
        },
        async fetchLoanConditions() {
            return axios.get(`${this.baseLenderURL}/loan-conditions?limit=250`)
                .then(response => {
                    this.update({ loanConditions: response.data.data });
                });
        },
        async fetchExternalUsers() {
            return axios.get(`${this.baseLenderURL}/external-users?limit=250`)
                .then(response => {
                    this.update({ externalUsers: response.data.data });
                });
        },
    },
});
