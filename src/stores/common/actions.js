/**
 * @param {Object} state - Pass `this` here.
 * @param {Object} payload
 */
export const commonUpdate = (state, payload) => {
    const payloadKeysThatAreNotInState = Object.keys(payload).filter(key => !(key in state));
    if (payloadKeysThatAreNotInState.length > 0) {
        console.error(`[Store Update Error] Store with id of '${state.$id}' could not update key(s) [${payloadKeysThatAreNotInState.join(', ')}]. Reason: The key(s) do not exist in the store. Possible Solution: Double-check that the key(s) are defined in the store's state. If you need to add/upsert a new key at run-time, then use the 'upsert()' action instead.`);
    }
    state.$patch(payload);
};

/**
 * @param {Object} state - Pass `this` here.
 * @param {Object} payload
 */
export const commonUpsert = (state, payload) => {
    state.$patch(payload);
};
