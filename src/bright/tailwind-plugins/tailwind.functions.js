/**
 * Returns a resolved Plugin Config object based on the user's
 * provided (or not provided) buildOptions.
 *
 * @param {Object} defaultConfig
 * @param {Object} userConfig
 * @returns {*}
 */
exports.getPluginConfig = function(defaultConfig, userConfig) {
    if (weShouldMergePluginConfigs(userConfig)) {
        return mergePluginConfigs(defaultConfig, userConfig);
    } else {
        return userConfig;
    }
};

/**
 * Returns true if we should merge our default Plugin Config with
 * the User's Plugin Config.
 *
 * @param {Object} userConfig
 * @returns {boolean}
 */
function weShouldMergePluginConfigs(userConfig) {
    return typeof userConfig === "undefined"
        || typeof userConfig.buildOptions === "undefined"
        || typeof userConfig.buildOptions.useDefaultConfig === "undefined"
        || userConfig.buildOptions.useDefaultConfig;
}

/**
 * Merges a user plugin config object and a default plugin config object.
 *
 * Our default plugin config is always loaded first. If the user supplied
 * a matching key, then their key's value will override our own.
 *
 * NOTE: Only similar keys are matched and returned. This means that if a
 * user passes in keys that we don't support in a plugin, they will be
 * ignored and not included in the returned object.
 *
 * @param defaultConfig
 * @param userConfig
 * @returns {*}
 */
function mergePluginConfigs(defaultConfig, userConfig) {
    let result = defaultConfig;
    if (typeof userConfig === "undefined") {
        return result;
    }
    Object.keys(defaultConfig).forEach(function(key) {
        if (Object.prototype.isPrototypeOf.call(userConfig, key)) {
            if (defaultConfig[key] === Object(defaultConfig[key])) { // If it's an object, then we need to go deeper
                result[key] = mergePluginConfigs(defaultConfig[key], userConfig[key]);
            } else {
                result[key] = userConfig[key];
            }
        }
    });
    return result;
}
