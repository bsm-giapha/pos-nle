let pluginClasses = {};
exports.getPluginClasses = function() {
    return pluginClasses;
};

exports.getPlugin = function({ addComponents, config }) {
    const defaultConfig = require("./buttons.default.config")().buttons;
    const userConfig = config("brightPluginOptions").buttons;
    const pluginConfig = require("../../tailwind.functions").getPluginConfig(defaultConfig, userConfig);

    const sharedConfigs = getSharedConfigObjects(pluginConfig);

    pluginClasses = {
        /**
         * Primary Buttons
         */
        '.__buttons--primary--standard': { ...sharedConfigs.primaryStandardBase },
        '.__buttons--primary--standard--hover': { ...sharedConfigs.primaryStandardBase, ...pluginConfig.primary.standard.hover },
        '.__buttons--primary--standard--active': { ...sharedConfigs.primaryStandardBase, ...pluginConfig.primary.standard.active },
        '.__buttons--primary--standard--disabled': { ...sharedConfigs.primaryStandardBase, ...pluginConfig.primary.standard.disabled },

        '.__buttons--primary--alternative': { ...sharedConfigs.primaryAlternativeBase },
        '.__buttons--primary--alternative--hover': { ...sharedConfigs.primaryAlternativeBase, ...pluginConfig.primary.alternative.hover },
        '.__buttons--primary--alternative--active': { ...sharedConfigs.primaryAlternativeBase, ...pluginConfig.primary.alternative.active },
        '.__buttons--primary--alternative--disabled': { ...sharedConfigs.primaryAlternativeBase, ...pluginConfig.primary.alternative.disabled },

        '.__buttons--primary--danger': { ...sharedConfigs.primaryDangerBase },
        '.__buttons--primary--danger--hover': { ...sharedConfigs.primaryDangerBase, ...pluginConfig.primary.danger.hover },
        '.__buttons--primary--danger--active': { ...sharedConfigs.primaryDangerBase, ...pluginConfig.primary.danger.active },
        '.__buttons--primary--danger--disabled': { ...sharedConfigs.primaryDangerBase, ...pluginConfig.primary.danger.disabled },

        /**
         * Secondary Buttons
         */
        '.__buttons--secondary--standard': { ...sharedConfigs.secondaryStandardBase },
        '.__buttons--secondary--standard--hover': { ...sharedConfigs.secondaryStandardBase, ...pluginConfig.secondary.standard.hover },
        '.__buttons--secondary--standard--active': { ...sharedConfigs.secondaryStandardBase, ...pluginConfig.secondary.standard.active },
        '.__buttons--secondary--standard--disabled': { ...sharedConfigs.secondaryStandardBase, ...pluginConfig.secondary.standard.disabled },

        '.__buttons--secondary--alternative': { ...sharedConfigs.secondaryAlternativeBase },
        '.__buttons--secondary--alternative--hover': { ...sharedConfigs.secondaryAlternativeBase, ...pluginConfig.secondary.alternative.hover },
        '.__buttons--secondary--alternative--active': { ...sharedConfigs.secondaryAlternativeBase, ...pluginConfig.secondary.alternative.active },
        '.__buttons--secondary--alternative--disabled': { ...sharedConfigs.secondaryAlternativeBase, ...pluginConfig.secondary.alternative.disabled },

        '.__buttons--secondary--danger': { ...sharedConfigs.secondaryDangerBase },
        '.__buttons--secondary--danger--hover': { ...sharedConfigs.secondaryDangerBase, ...pluginConfig.secondary.danger.hover },
        '.__buttons--secondary--danger--active': { ...sharedConfigs.secondaryDangerBase, ...pluginConfig.secondary.danger.active },
        '.__buttons--secondary--danger--disabled': { ...sharedConfigs.secondaryDangerBase, ...pluginConfig.secondary.danger.disabled },

        /**
         * Tertiary Buttons
         */
        '.__buttons--tertiary--standard': { ...sharedConfigs.tertiaryStandardBase },
        '.__buttons--tertiary--standard--hover': { ...sharedConfigs.tertiaryStandardBase, ...pluginConfig.tertiary.standard.hover },
        '.__buttons--tertiary--standard--active': { ...sharedConfigs.tertiaryStandardBase, ...pluginConfig.tertiary.standard.active },
        '.__buttons--tertiary--standard--disabled': { ...sharedConfigs.tertiaryStandardBase, ...pluginConfig.tertiary.standard.disabled },

        '.__buttons--tertiary--alternative': { ...sharedConfigs.tertiaryAlternativeBase },
        '.__buttons--tertiary--alternative--hover': { ...sharedConfigs.tertiaryAlternativeBase, ...pluginConfig.tertiary.alternative.hover },
        '.__buttons--tertiary--alternative--active': { ...sharedConfigs.tertiaryAlternativeBase, ...pluginConfig.tertiary.alternative.active },
        '.__buttons--tertiary--alternative--disabled': { ...sharedConfigs.tertiaryAlternativeBase, ...pluginConfig.tertiary.alternative.disabled },

        '.__buttons--tertiary--danger': { ...sharedConfigs.tertiaryDangerBase },
        '.__buttons--tertiary--danger--hover': { ...sharedConfigs.tertiaryDangerBase, ...pluginConfig.tertiary.danger.hover },
        '.__buttons--tertiary--danger--active': { ...sharedConfigs.tertiaryDangerBase, ...pluginConfig.tertiary.danger.active },
        '.__buttons--tertiary--danger--disabled': { ...sharedConfigs.tertiaryDangerBase, ...pluginConfig.tertiary.danger.disabled },

        /**
         * Sizes
         */
        '.__buttons--large': { ...pluginConfig.sizes.large },
        '.__buttons--medium': { ...pluginConfig.sizes.medium },
        '.__buttons--small': { ...pluginConfig.sizes.small },

        /**
         * Icons
         */
        '.__buttons--icon--size--large': { fontSize: pluginConfig.icons.large.base.fontSize },
        '.__buttons--icon--size--medium': { fontSize: pluginConfig.icons.medium.base.fontSize },
        '.__buttons--icon--size--small': { fontSize: pluginConfig.icons.small.base.fontSize },

        '.__buttons--icon-and-text--size--large': { padding: pluginConfig.icons.large.textIcon.padding },
        '.__buttons--icon-and-text--size--medium': { padding: pluginConfig.icons.medium.textIcon.padding },
        '.__buttons--icon-and-text--size--small': { padding: pluginConfig.icons.small.textIcon.padding },

        '.__buttons--icon--size--large--rounded': { lineHeight: pluginConfig.icons.large.base.fontSize, padding: pluginConfig.icons.large.base.padding },
        '.__buttons--icon--size--medium--rounded': { lineHeight: pluginConfig.icons.medium.base.fontSize, padding: pluginConfig.icons.medium.base.padding },
        '.__buttons--icon--size--small--rounded': { lineHeight: pluginConfig.icons.small.base.fontSize, padding: pluginConfig.icons.small.base.padding },

        '.__buttons--icon--size--large--prefix': { ...pluginConfig.icons.large.prefix },
        '.__buttons--icon--size--medium--prefix': { ...pluginConfig.icons.medium.prefix },
        '.__buttons--icon--size--small--prefix': { ...pluginConfig.icons.small.prefix },
        '.__buttons--icon--size--large--postfix': { ...pluginConfig.icons.large.postfix },
        '.__buttons--icon--size--medium--postfix': { ...pluginConfig.icons.medium.postfix },
        '.__buttons--icon--size--small--postfix': { ...pluginConfig.icons.small.postfix },
    };
    addComponents(pluginClasses);
};

function getSharedConfigObjects(pluginConfig) {
    return {
        ...getPrimarySharedConfigObjects(pluginConfig),
        ...getSecondarySharedConfigObjects(pluginConfig),
        ...getTertiarySharedConfigObjects(pluginConfig),
    };
}

function getPrimarySharedConfigObjects(pluginConfig) {
    const primaryBaseConfig = {
        ...pluginConfig.base,
        ...pluginConfig.primary.base,
    };

    return {
        primaryStandardBase: {
            ...primaryBaseConfig,
            ...pluginConfig.primary.standard.base,
        },
        primaryAlternativeBase: {
            ...primaryBaseConfig,
            ...pluginConfig.primary.alternative.base,
        },
        primaryDangerBase: {
            ...primaryBaseConfig,
            ...pluginConfig.primary.danger.base,
        },
    };
}

function getSecondarySharedConfigObjects(pluginConfig) {
    const secondaryBaseConfig = {
        ...pluginConfig.base,
        ...pluginConfig.secondary.base,
    };

    return {
        secondaryStandardBase: {
            ...secondaryBaseConfig,
            ...pluginConfig.secondary.standard.base,
        },
        secondaryAlternativeBase: {
            ...secondaryBaseConfig,
            ...pluginConfig.secondary.alternative.base,
        },
        secondaryDangerBase: {
            ...secondaryBaseConfig,
            ...pluginConfig.secondary.danger.base,
        },
    };
}

function getTertiarySharedConfigObjects(pluginConfig) {
    const tertiaryBaseConfig = {
        ...pluginConfig.base,
        ...pluginConfig.tertiary.base,
    };

    return {
        tertiaryStandardBase: {
            ...tertiaryBaseConfig,
            ...pluginConfig.tertiary.standard.base,
        },
        tertiaryAlternativeBase: {
            ...tertiaryBaseConfig,
            ...pluginConfig.tertiary.alternative.base,
        },
        tertiaryDangerBase: {
            ...tertiaryBaseConfig,
            ...pluginConfig.tertiary.danger.base,
        },
    };
}
