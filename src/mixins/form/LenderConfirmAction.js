import { useLenderStore } from "@/stores/lender";

/**
 *  Use this to handle confirmation modals.
 */
export const LenderConfirmAction = {
    computed: {
        baseLenderURL() {
            const lender = useLenderStore();
            return lender.baseLenderURL;
        },

        /**
         * TODO: Override this.
         */
        resourceURL() {
            return '';
        },
    },
    methods: {
        /**
         * TODO: Override this.
         */
        performAction() {

        },
    },
};
