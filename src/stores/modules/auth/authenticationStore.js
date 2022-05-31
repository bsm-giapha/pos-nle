import { defineStore } from "pinia";
import axios from "axios";
import { API_AUTH } from "@/utils/constants/apiEndpointV1";
import { getCookie, setCookie } from "@/helpers/CookieHelper";

export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        accessToken: getCookie('bsm_user_lender_access_token') ?? null,
        userLender: null,
        userRole: null,
        userPermissions: null,
    }),
    actions: {
        async userLenderLogin(credentials) {
            try {
                const response = await axios.post(API_AUTH.LOGIN_USER_LENDER, credentials);
                if (response && response.data.success) {
                    this.$patch((state) => {
                        state.accessToken = response.data.data.accessToken;
                    });
                    setCookie('bsm_user_lender_access_token', response.data.data.accessToken);
                    return true;
                }
            } catch (error) {
                return false;
            }
        },
    },
});
