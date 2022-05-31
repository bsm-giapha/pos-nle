let pluginClasses = {};
exports.getPluginClasses = function() {
    return pluginClasses;
};

exports.getPlugin = function({ addComponents, config }) {
    const defaultConfig = require("./typography.default.config")().typography;
    const userConfig = config("brightPluginOptions").typography;
    const pluginConfig = require("../../tailwind.functions").getPluginConfig(defaultConfig, userConfig);

    const sharedConfigs = getSharedConfigObjects(pluginConfig);

    pluginClasses = {
        /**
         * Heading
         */
        '.__typography--heading--1': { ...pluginConfig.heading.base, ...pluginConfig.heading.size["1"] },
        '.__typography--heading--2': { ...pluginConfig.heading.base, ...pluginConfig.heading.size["2"] },
        '.__typography--heading--3': { ...pluginConfig.heading.base, ...pluginConfig.heading.size["3"] },
        '.__typography--heading--4': { ...pluginConfig.heading.base, ...pluginConfig.heading.size["4"] },
        '.__typography--heading--5': { ...pluginConfig.heading.base, ...pluginConfig.heading.size["5"] },
        '.__typography--heading--6': { ...pluginConfig.heading.base, ...pluginConfig.heading.size["6"] },

        /**
         * Section/XL
         */
        '.__typography--section--xl': { ...sharedConfigs.sectionXLBase },
        '.__typography--section--xl--bold': { ...sharedConfigs.sectionXLBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section--xl--italic': { ...sharedConfigs.sectionXLBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section--xl--italic--bold': {
            ...sharedConfigs.sectionXLBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section Caps/XL
         */
        '.__typography--section-caps--xl': { ...sharedConfigs.sectionXLCapsBase },
        '.__typography--section-caps--xl--bold': { ...sharedConfigs.sectionXLCapsBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section-caps--xl--italic': { ...sharedConfigs.sectionXLCapsBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section-caps--xl--italic--bold': {
            ...sharedConfigs.sectionXLCapsBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section/L
         */
        '.__typography--section--l': { ...sharedConfigs.sectionLBase },
        '.__typography--section--l--bold': { ...sharedConfigs.sectionLBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section--l--italic': { ...sharedConfigs.sectionLBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section--l--italic--bold': {
            ...sharedConfigs.sectionLBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section Caps/L
         */
        '.__typography--section-caps--l': { ...sharedConfigs.sectionLCapsBase },
        '.__typography--section-caps--l--bold': { ...sharedConfigs.sectionLCapsBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section-caps--l--italic': { ...sharedConfigs.sectionLCapsBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section-caps--l--italic--bold': {
            ...sharedConfigs.sectionLCapsBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section/M
         */
        '.__typography--section--m': { ...sharedConfigs.sectionMBase },
        '.__typography--section--m--bold': { ...sharedConfigs.sectionMBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section--m--italic': { ...sharedConfigs.sectionMBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section--m--italic--bold': {
            ...sharedConfigs.sectionMBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section Caps/M
         */
        '.__typography--section-caps--m': { ...sharedConfigs.sectionMCapsBase },
        '.__typography--section-caps--m--bold': { ...sharedConfigs.sectionMCapsBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section-caps--m--italic': { ...sharedConfigs.sectionMCapsBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section-caps--m--italic--bold': {
            ...sharedConfigs.sectionMCapsBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section/S
         */
        '.__typography--section--s': { ...sharedConfigs.sectionSBase },
        '.__typography--section--s--bold': { ...sharedConfigs.sectionSBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section--s--italic': { ...sharedConfigs.sectionSBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section--s--italic--bold': {
            ...sharedConfigs.sectionSBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section Caps/S
         */
        '.__typography--section-caps--s': { ...sharedConfigs.sectionSCapsBase },
        '.__typography--section-caps--s--bold': { ...sharedConfigs.sectionSCapsBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section-caps--s--italic': { ...sharedConfigs.sectionSCapsBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section-caps--s--italic--bold': {
            ...sharedConfigs.sectionSCapsBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section/XS
         */
        '.__typography--section--xs': { ...sharedConfigs.sectionXSBase },
        '.__typography--section--xs--bold': { ...sharedConfigs.sectionXSBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section--xs--italic': { ...sharedConfigs.sectionXSBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section--xs--italic--bold': {
            ...sharedConfigs.sectionXSBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section Caps/XS
         */
        '.__typography--section-caps--xs': { ...sharedConfigs.sectionXSCapsBase },
        '.__typography--section-caps--xs--bold': { ...sharedConfigs.sectionXSCapsBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section-caps--xs--italic': { ...sharedConfigs.sectionXSCapsBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section-caps--xs--italic--bold': {
            ...sharedConfigs.sectionXSCapsBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section/XXS
         */
        '.__typography--section--xxs': { ...sharedConfigs.sectionXXSBase },
        '.__typography--section--xxs--bold': { ...sharedConfigs.sectionXXSBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section--xxs--italic': { ...sharedConfigs.sectionXXSBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section--xxs--italic--bold': {
            ...sharedConfigs.sectionXXSBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Section Caps/XXS
         */
        '.__typography--section-caps--xxs': { ...sharedConfigs.sectionXXSCapsBase },
        '.__typography--section-caps--xxs--bold': { ...sharedConfigs.sectionXXSCapsBase, ...pluginConfig.section.fontWeight.bold },
        '.__typography--section-caps--xxs--italic': { ...sharedConfigs.sectionXXSCapsBase, ...pluginConfig.section.fontStyle.italic },
        '.__typography--section-caps--xxs--italic--bold': {
            ...sharedConfigs.sectionXXSCapsBase,
            ...pluginConfig.section.fontStyle.italic,
            ...pluginConfig.section.fontWeight.bold,
        },

        /**
         * Body/L
         */
        '.__typography--body--l': { ...sharedConfigs.bodyLBase },
        '.__typography--body--l--bold': { ...sharedConfigs.bodyLBase, ...pluginConfig.body.fontWeight.bold },
        '.__typography--body--l--italic': { ...sharedConfigs.bodyLBase, ...pluginConfig.body.fontStyle.italic },
        '.__typography--body--l--italic--bold': {
            ...sharedConfigs.bodyLBase,
            ...pluginConfig.body.fontStyle.italic,
            ...pluginConfig.body.fontWeight.bold,
        },

        /**
         * Body/M
         */
        '.__typography--body--m': { ...sharedConfigs.bodyMBase },
        '.__typography--body--m--bold': { ...sharedConfigs.bodyMBase, ...pluginConfig.body.fontWeight.bold },
        '.__typography--body--m--italic': { ...sharedConfigs.bodyMBase, ...pluginConfig.body.fontStyle.italic },
        '.__typography--body--m--italic--bold': {
            ...sharedConfigs.bodyMBase,
            ...pluginConfig.body.fontStyle.italic,
            ...pluginConfig.body.fontWeight.bold,
        },

        /**
         * Body/S
         */
        '.__typography--body--s': { ...sharedConfigs.bodySBase },
        '.__typography--body--s--bold': { ...sharedConfigs.bodySBase, ...pluginConfig.body.fontWeight.bold },
        '.__typography--body--s--italic': { ...sharedConfigs.bodySBase, ...pluginConfig.body.fontStyle.italic },
        '.__typography--body--s--italic--bold': {
            ...sharedConfigs.bodySBase,
            ...pluginConfig.body.fontStyle.italic,
            ...pluginConfig.body.fontWeight.bold,
        },

        /**
         * Body/XS
         */
        '.__typography--body--xs': { ...sharedConfigs.bodyXSBase },
        '.__typography--body--xs--bold': { ...sharedConfigs.bodyXSBase, ...pluginConfig.body.fontWeight.bold },
        '.__typography--body--xs--italic': { ...sharedConfigs.bodyXSBase, ...pluginConfig.body.fontStyle.italic },
        '.__typography--body--xs--italic--bold': {
            ...sharedConfigs.bodyXSBase,
            ...pluginConfig.body.fontStyle.italic,
            ...pluginConfig.body.fontWeight.bold,
        },

        /**
         * Label/M
         */
        '.__typography--label--m': { ...sharedConfigs.labelMBase },
        '.__typography--label--m--bold': { ...sharedConfigs.labelMBase, ...pluginConfig.label.fontWeight.bold },
        '.__typography--label--m--italic': { ...sharedConfigs.labelMBase, ...pluginConfig.label.fontStyle.italic },
        '.__typography--label--m--italic--bold': {
            ...sharedConfigs.labelMBase,
            ...pluginConfig.label.fontStyle.italic,
            ...pluginConfig.label.fontWeight.bold,
        },

        /**
         * Label/S
         */
        '.__typography--label--s': { ...sharedConfigs.labelSBase },
        '.__typography--label--s--bold': { ...sharedConfigs.labelSBase, ...pluginConfig.label.fontWeight.bold },
        '.__typography--label--s--italic': { ...sharedConfigs.labelSBase, ...pluginConfig.label.fontStyle.italic },
        '.__typography--label--s--italic--bold': {
            ...sharedConfigs.labelSBase,
            ...pluginConfig.label.fontStyle.italic,
            ...pluginConfig.label.fontWeight.bold,
        },

        /**
         * Label/XS
         */
        '.__typography--label--xs': { ...sharedConfigs.labelXSBase },
        '.__typography--label--xs--bold': { ...sharedConfigs.labelXSBase, ...pluginConfig.label.fontWeight.bold },
        '.__typography--label--xs--italic': { ...sharedConfigs.labelXSBase, ...pluginConfig.label.fontStyle.italic },
        '.__typography--label--xs--italic--bold': {
            ...sharedConfigs.labelXSBase,
            ...pluginConfig.label.fontStyle.italic,
            ...pluginConfig.label.fontWeight.bold,
        },

        /**
         * Label/XXS
         */
        '.__typography--label--xxs': { ...sharedConfigs.labelXXSBase },
        '.__typography--label--xxs--bold': { ...sharedConfigs.labelXXSBase, ...pluginConfig.label.fontWeight.bold },
        '.__typography--label--xxs--italic': { ...sharedConfigs.labelXXSBase, ...pluginConfig.label.fontStyle.italic },
        '.__typography--label--xxs--italic--bold': {
            ...sharedConfigs.labelXXSBase,
            ...pluginConfig.label.fontStyle.italic,
            ...pluginConfig.label.fontWeight.bold,
        },
    };

    addComponents(pluginClasses);
};

function getSharedConfigObjects(pluginConfig) {
    return {
        ...getSectionSharedConfigObjects(pluginConfig),
        ...getBodySharedConfigObjects(pluginConfig),
        ...getLabelSharedConfigObjects(pluginConfig),
    };
}

function getSectionSharedConfigObjects(pluginConfig) {
    return {
        sectionXLBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.xl,
        },
        sectionXLCapsBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.xl,
            ...pluginConfig.section.textTransform.uppercase,
        },
        sectionLBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.l,
        },
        sectionLCapsBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.l,
            ...pluginConfig.section.textTransform.uppercase,
        },
        sectionMBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.m,
        },
        sectionMCapsBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.m,
            ...pluginConfig.section.textTransform.uppercase,
        },
        sectionSBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.s,
        },
        sectionSCapsBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.s,
            ...pluginConfig.section.textTransform.uppercase,
        },
        sectionXSBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.xs,
        },
        sectionXSCapsBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.xs,
            ...pluginConfig.section.textTransform.uppercase,
        },
        sectionXXSBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.l,
        },
        sectionXXSCapsBase: {
            ...pluginConfig.section.base,
            ...pluginConfig.section.size.xxs,
            ...pluginConfig.section.textTransform.uppercase,
        },
    };
}

function getBodySharedConfigObjects(pluginConfig) {
    return {
        bodyLBase: {
            ...pluginConfig.body.base,
            ...pluginConfig.body.size.l,
        },
        bodyMBase: {
            ...pluginConfig.body.base,
            ...pluginConfig.body.size.m,
        },
        bodySBase: {
            ...pluginConfig.body.base,
            ...pluginConfig.body.size.s,
        },
        bodyXSBase: {
            ...pluginConfig.body.base,
            ...pluginConfig.body.size.xs,
        },
    };
}

function getLabelSharedConfigObjects(pluginConfig) {
    return {
        labelMBase: {
            ...pluginConfig.label.base,
            ...pluginConfig.label.size.m,
        },
        labelSBase: {
            ...pluginConfig.label.base,
            ...pluginConfig.label.size.s,
        },
        labelXSBase: {
            ...pluginConfig.label.base,
            ...pluginConfig.label.size.xs,
        },
        labelXXSBase: {
            ...pluginConfig.label.base,
            ...pluginConfig.label.size.xxs,
        },
    };
}
