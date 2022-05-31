import { defineStore } from "pinia";
import { commonUpdate, commonUpsert } from "@/stores/common/actions";
import axios from "axios";
import { useLenderStore } from "@/stores/lender";

export const useConfigurationsStore = defineStore({
    id: 'configurations',
    state: () => {
        return {
            lender: {},
            branch: {},
            loan: {},
        };
    },
    getters: {
        lenderConfiguration() {
            return (key) => {
                if (Object.prototype.hasOwnProperty.call(this.lender, key)) {
                    return (key) => this.lender[key];
                } else {
                    console.error(`The key ${key} is missing in Lender Configurations.`);
                    return null;
                }
            };
        },
    },
    actions: {
        update(payload) {
            commonUpdate(this, payload);
        },
        upsert(payload) {
            commonUpsert(this, payload);
        },
        async fetchLenderConfigurations() {
            const lender = useLenderStore();
            return axios.get(`${lender.baseLenderURL}/configurations`)
                .then(response => {
                    const responseData = response.data.data;
                    this.update({
                        lender: responseData,
                    });
                });
        },
    },
});
