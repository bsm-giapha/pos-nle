/**
 * Example Template for Plugins.
 * Be sure to review all "TODO" comments and delete them once addressed.
 * Also: delete this comment before submitting a PR.
 */

// TODO: Register this plugin in "tailwind.plugins.js"

let pluginClasses = {};
exports.getPluginClasses = function() {
    return pluginClasses;
};

exports.getPlugin = function({ addComponents, theme, config}) { // TODO: Replace "addComponents" with "addBase" or "addUtilities" if building a Base or Utilities plugin
    const defaultConfig = require("./example.default.config")(theme).myPluginName; // TODO: Replace with your own file
    const userConfig = config("brightPluginOptions").myPluginName; // TODO: Add your key here
    const pluginConfig = require("../../tailwind.functions").getPluginConfig(defaultConfig, userConfig);

    const sharedConfigs = getSharedConfigObjects(pluginConfig); // TODO: Use this if you need to re-use config objects.

    pluginClasses = {
        /**
         * Example
         */
        '.__example': { ...pluginConfig.base },
        // TODO: Add your classes here
    };

    addComponents(pluginClasses); // TODO: Replace with addBase or addUtilities if building a Base or Utilities plugin
};

function getSharedConfigObjects(pluginConfig) { // TODO: Decide if you need this function or not
    return {
        // TODO: Put commonly re-used Configs here (if needed)
    }
}