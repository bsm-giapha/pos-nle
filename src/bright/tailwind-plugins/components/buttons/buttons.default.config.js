const theme = require("../../../tailwind.theme").theme;
module.exports = function() {
    const typographyClasses = require("../typography/typography.plugin").getPluginClasses();
    return {
        buttons: {
            buildOptions: { useDefaultConfig: true },
            base: { borderRadius: theme.borderRadius["6"] },
            primary: {
                standard: {
                    base: {
                        backgroundColor: theme.colors["brand-primary"]["500"],
                        color: theme.colors.white,
                    },
                    hover: {
                        backgroundColor: theme.colors["brand-primary"]["400"],
                        color: theme.colors.white,
                    },
                    active: {
                        backgroundColor: theme.colors["brand-primary"]["600"],
                        color: theme.colors.white,
                    },
                    disabled: {
                        backgroundColor: theme.colors["brand-primary"]["200"],
                        color: theme.colors.white,
                    },
                },
                alternative: {
                    base: {
                        backgroundColor: theme.colors.grey["800"],
                        color: theme.colors.white,
                    },
                    hover: {
                        backgroundColor: theme.colors.grey["700"],
                        color: theme.colors.white,
                    },
                    active: {
                        backgroundColor: theme.colors.grey["900"],
                        color: theme.colors.white,
                    },
                    disabled: {
                        backgroundColor: theme.colors.grey["200"],
                        color: theme.colors.white,
                    },
                },
                danger: {
                    base: {
                        backgroundColor: theme.colors.red["500"],
                        color: theme.colors.white,
                    },
                    hover: {
                        backgroundColor: theme.colors.red["400"],
                        color: theme.colors.white,
                    },
                    active: {
                        backgroundColor: theme.colors.red["600"],
                        color: theme.colors.white,
                    },
                    disabled: {
                        backgroundColor: theme.colors.red["200"],
                        color: theme.colors.white,
                    },
                },
            },
            secondary: {
                standard: {
                    base: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors["brand-primary"]["500"],
                        border: '1px ' + theme.colors["brand-primary"]["400"] + ' solid',
                    },
                    hover: {
                        backgroundColor: theme.colors["brand-primary"]["50"],
                        color: theme.colors["brand-primary"]["400"],
                        borderColor: theme.colors["brand-primary"]["300"],
                    },
                    active: {
                        backgroundColor: theme.colors["brand-primary"]["100"],
                        color: theme.colors["brand-primary"]["600"],
                        borderColor: theme.colors["brand-primary"]["400"],
                    },
                    disabled: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors["brand-primary"]["200"],
                        borderWidth: theme.borderWidth.default,
                        borderColor: theme.colors["brand-primary"]["50"],
                    },
                },
                alternative: {
                    base: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.grey["900"],
                        border: '1px ' + theme.colors.grey["800"] + ' solid',
                    },
                    hover: {
                        backgroundColor: theme.colors.grey["100"],
                        color: theme.colors.grey["800"],
                        borderColor: theme.colors.grey["700"],
                    },
                    active: {
                        backgroundColor: theme.colors.grey["200"],
                        color: theme.colors.grey["900"],
                        borderColor: theme.colors["brand-primary"]["800"],
                    },
                    disabled: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.grey["200"],
                        borderWidth: theme.borderWidth.default,
                        borderColor: theme.colors["brand-primary"]["50"],
                    },
                },
                danger: {
                    base: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.red["500"],
                        border: '1px ' + theme.colors.red["400"] + ' solid',
                    },
                    hover: {
                        backgroundColor: theme.colors.red["25"],
                        color: theme.colors.red["400"],
                        borderColor: theme.colors.red["300"],
                    },
                    active: {
                        backgroundColor: theme.colors.red["50"],
                        color: theme.colors.red["600"],
                        borderColor: theme.colors.red["400"],
                    },
                    disabled: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.red["200"],
                        borderWidth: theme.borderWidth.default,
                        borderColor: theme.colors["brand-primary"]["50"],
                    },
                },
            },
            tertiary: {
                standard: {
                    base: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors["brand-primary"]["500"],
                    },
                    hover: {
                        backgroundColor: theme.colors["brand-primary"]["50"],
                        color: theme.colors["brand-primary"]["400"],
                    },
                    active: {
                        backgroundColor: theme.colors["brand-primary"]["100"],
                        color: theme.colors["brand-primary"]["600"],
                    },
                    disabled: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors["brand-primary"]["200"],
                        borderWidth: theme.borderWidth["0"],
                        borderColor: theme.colors.transparent,
                    },
                },
                alternative: {
                    base: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.grey["800"],
                    },
                    hover: {
                        backgroundColor: theme.colors.grey["50"],
                        color: theme.colors.grey["700"],
                    },
                    active: {
                        backgroundColor: theme.colors.grey["100"],
                        color: theme.colors.grey["900"],
                    },
                    disabled: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.grey["200"],
                        borderWidth: theme.borderWidth["0"],
                        borderColor: theme.colors.transparent,
                    },
                },
                danger: {
                    base: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.red["500"],
                    },
                    hover: {
                        backgroundColor: theme.colors.red["25"],
                        color: theme.colors.red["400"],
                    },
                    active: {
                        backgroundColor: theme.colors.red["50"],
                        color: theme.colors.red["600"],
                    },
                    disabled: {
                        backgroundColor: theme.colors.transparent,
                        color: theme.colors.red["200"],
                        borderWidth: theme.borderWidth["0"],
                        borderColor: theme.colors.transparent,
                    },
                },
            },
            sizes: {
                large: {
                    ...{ padding: theme.spacing["12"] + " " + theme.spacing["18"] },
                    ...typographyClasses[".__typography--section-caps--l--bold"],
                },
                medium: {
                    ...{ padding: theme.spacing["10"] + " " + theme.spacing["16"] },
                    ...typographyClasses[".__typography--section-caps--m--bold"],
                },
                small: {
                    ...{ padding: theme.spacing["6"] + " " + theme.spacing["14"] },
                    ...typographyClasses[".__typography--section-caps--s--bold"],
                },
            },
            icons: {
                large: {
                    base: {
                        fontSize: "1.75rem",
                        padding: theme.spacing["10"],
                    },
                    textIcon: {
                        padding: theme.spacing["10"] + " " + theme.spacing["18"],
                    },
                    prefix: {
                        ...{ margin: "0 0 0 -" + theme.spacing["2"] },
                    },
                    postfix: {
                        ...{ margin: "0 -" + theme.spacing["2"] + " 0 0" },
                    },
                },
                medium: {
                    base: {
                        fontSize: theme.spacing["24"],
                        padding: theme.spacing["8"],
                    },
                    textIcon: {
                        padding: theme.spacing["8"] + " " + theme.spacing["16"],
                    },
                    prefix: {
                        ...{ margin: "0 0 0 -" + theme.spacing["2"] },
                    },
                    postfix: {
                        ...{ margin: "0 -" + theme.spacing["2"] + " 0 0" },
                    },
                },
                small: {
                    base: {
                        fontSize: "1.375rem",
                        padding: theme.spacing["5"],
                    },
                    textIcon: {
                        padding: theme.spacing["5"] + " " + theme.spacing["14"],
                    },
                    prefix: {
                        ...{ margin: "0 0 0 -" + theme.spacing["2"] },
                    },
                    postfix: {
                        ...{ margin: "0 -" + theme.spacing["2"] + " 0 0" },
                    },
                },
            },
        },
    };
};
