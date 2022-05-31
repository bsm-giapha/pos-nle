import { usePermissionsStore } from "@/stores/permissions";

/**
 * A helper mixin that assists with dealing with responses from our API.
 */
export const ArdentResponseMixin = {
    methods: {
        /**
         * Use this when making a Get One or Get Many request to the API.
         *
         * @param response An Axios response
         * @param onlyGetOneResource Pass false here if you need to get data from a Get Many request.
         */
        getDataFromResponse(response, onlyGetOneResource = true) {
            this.upsertPermissionsFromResponse(response[0]);
            if (onlyGetOneResource) {
                return response[0].data.data[0];
            } else {
                return response[0].data.data;
            }
        },

        /**
         * Will retrieve the permissions from an Ardent request and upsert them into the Permissions store module.
         * @param response An Axios response
         */
        upsertPermissionsFromResponse(response) {
            if (typeof response !== 'undefined') {
                const permissions = usePermissionsStore();
                permissions.upsertManyArdentPermissions(response.data['__metadata__'].permissions);
            }
        },
    },
};
