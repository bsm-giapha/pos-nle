import { defineStore } from "pinia";
import { commonUpdate, commonUpsert } from "@/stores/common/actions";
import { useLenderStore } from "@/stores/lender";
import axios from "axios";

export const useAuthenticatedUserStore = defineStore({
    id: 'authenticated-user',
    state: () => {
        return {
            id: '',
            account: {
                firstName: '',
                middleName: '',
                lastName: '',
                fullName: '',
                title: '',
                email: '',
                phoneNumber: '',
                phoneExtension: '',
                timezone: '',
                accountStatus: false,
                preferredLanguage: '',
            },
            assignments: {
                role: '',
                region: '',
                urlName: '',
                vanityURL: '',
                preferredLoanOfficerAssistant: '',
                loanOfficerAssistants: [],
                processor: '',
                preferredLOAToTheseLOs: [],
                loanOfficersTheLOAIsAssignedTo: [],
                campaigns: [],
                primaryBranch: '',
                branches: [],
                teams: [],
                defaultLeadSource: null,
                leadSources: [],
                certifications: [],
            },
            licensingCredentials: {
                nmlsNumber: '',
                stateLicensing: [],
            },
        };
    },
    getters: {
        isLoggedIn() {
            return this.id.length > 0;
        },
        isAuthenticatedUserAnAdmin() {
            const lender = useLenderStore();
            const currentRole = this.assignments.role.id;
            const matchingLenderRole = lender.roles.find(role => role.id === currentRole);
            if (matchingLenderRole) {
                return matchingLenderRole.subroles.includes('Admin');
            }
            return false;
        },
    },
    actions: {
        update(payload) {
            commonUpdate(this, payload);
        },
        upsert(payload) {
            commonUpsert(this, payload);
        },
        async fetchDataForAuthenticatedUser() {
            const lender = useLenderStore();
            return axios.get(`${lender.baseLenderURL}/internal-users/${this.id}`)
                .then(response => {
                    const responseData = response.data.data[0];

                    const account = responseData.account;
                    const assignments = responseData.assignments;
                    const licensing = responseData.licensingCredentials;

                    let userData = {
                        id: this.id,
                        account: {
                            firstName: account.firstName,
                            middleName: account.middleName,
                            lastName: account.lastName,
                            fullName: account.fullName,
                            title: account.title,
                            email: account.email,
                            phoneNumber: account.phoneNumber,
                            phoneExtension: account.phoneExtension,
                            timezone: account.timezone,
                            accountStatus: account.accountStatus,
                            preferredLanguage: account.preferredLanguage,
                        },
                        assignments: {
                            role: assignments.role,
                            region: assignments.region,
                            urlName: assignments.urlName,
                            vanityURL: assignments.vanityURL,
                            preferredLoanOfficerAssistant: assignments.preferredLoanOfficerAssistant,
                            loanOfficerAssistants: assignments.loanOfficerAssistants,
                            processor: assignments.processor,
                            preferredLOAToTheseLOs: assignments.preferredLOAToTheseLOs,
                            loanOfficersTheLOAIsAssignedTo: assignments.loanOfficersTheLOAIsAssignedTo,
                            campaigns: assignments.campaigns,
                            primaryBranch: assignments.primaryBranch,
                            branches: assignments.branches,
                            teams: assignments.teams,
                            defaultLeadSource: assignments.defaultLeadSource,
                            leadSources: assignments.leadSources,
                            certifications: assignments.certifications,
                        },
                        licensingCredentials: {
                            nmlsNumber: licensing.nmlsNumber,
                            stateLicensing: licensing.stateLicensing,
                        },
                    };
                    this.update(userData);
                });
        },
    },
});
