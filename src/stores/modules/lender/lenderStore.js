import { defineStore } from "pinia";
import axios from "axios";
import { API_AUTH, parseUrl } from "@/utils/constants/apiEndpointV1";

export const useLenderStore = defineStore({
    id: 'lenderStore',
    state: () => {
        return {
            lenderPingData: {
                id: null,
                lenderID: null,
                name: null,
                nameFriendly: null,
                originatorType: null,
                organizationType: null,
                isActive: null,
                logo: null,
            },
            lender: null,
            isBooted: false,
        };
    },
    getters: {
    },
    actions: {
        async pingTenant(lenderID) {
            try {
                const response = await axios.get(parseUrl(API_AUTH.PING_TENANT, { 'lenderID': lenderID }));
            
                if (response && response.data.success === true) {
                    this.$patch((state) => {
                        state.lenderPingData = response.data.data;
                    });
                    return true;
                }

                return false;
            } catch (error) {
                return false;
            }
            
        },
    },
});
