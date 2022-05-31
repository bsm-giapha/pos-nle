const theme = require("../../../tailwind.theme").theme;
module.exports = function() {
    return {
        typography: {
            buildOptions: {
                useDefaultConfig: true,
            },
            heading: {
                base: {
                    fontFamily: theme.fontFamily.primary.join(),
                    letterSpacing: theme.letterSpacing.heading,
                },
                size: {
                    "1": {
                        fontSize: theme.fontSize.h1,
                        fontWeight: theme.fontWeight.bold,
                        lineHeight: theme.lineHeight.h1,
                        marginBottom: "1.75rem",
                    },
                    "2": {
                        fontSize: theme.fontSize.h2,
                        fontWeight: theme.fontWeight.semibold,
                        lineHeight: theme.lineHeight.h2,
                        marginBottom: theme.spacing["24"],
                    },
                    "3": {
                        fontSize: theme.fontSize.h3,
                        fontWeight: theme.fontWeight.semibold,
                        lineHeight: theme.lineHeight.h3,
                        marginBottom: theme.spacing["24"],
                    },
                    "4": {
                        fontSize: theme.fontSize.h4,
                        fontWeight: theme.fontWeight.semibold,
                        lineHeight: theme.lineHeight.h4,
                        marginBottom: theme.spacing["20"],
                    },
                    "5": {
                        fontSize: theme.fontSize.h5,
                        fontWeight: theme.fontWeight.semibold,
                        lineHeight: theme.lineHeight.h5,
                        marginBottom: theme.spacing["20"],
                    },
                    "6": {
                        fontSize: theme.fontSize.h6,
                        fontWeight: theme.fontWeight.semibold,
                        lineHeight: theme.lineHeight.h6,
                        marginBottom: theme.spacing["16"],
                    },
                },
            },
            section: {
                base: {
                    fontFamily: theme.fontFamily.primary.join(),
                    fontWeight: theme.fontWeight.regular,
                    letterSpacing: theme.letterSpacing.section,
                },
                size: {
                    xl: {
                        fontSize: theme.fontSize.xl,
                        lineHeight: theme.lineHeight["section-xl"],
                        marginBottom: theme.spacing["16"],
                    },
                    l: {
                        fontSize: theme.fontSize.l,
                        lineHeight: theme.lineHeight["section-l"],
                        marginBottom: theme.spacing["12"],
                    },
                    m: {
                        fontSize: theme.fontSize.m,
                        lineHeight: theme.lineHeight["section-m"],
                        marginBottom: theme.spacing["12"],
                    },
                    s: {
                        fontSize: theme.fontSize.s,
                        lineHeight: theme.lineHeight["section-s"],
                        marginBottom: theme.spacing["8"],
                    },
                    xs: {
                        fontSize: theme.fontSize.xs,
                        lineHeight: theme.lineHeight["section-xs"],
                        marginBottom: theme.spacing["8"],
                    },
                    xxs: {
                        fontSize: theme.fontSize.xxs,
                        lineHeight: theme.lineHeight["section-xxs"],
                        marginBottom: theme.spacing["8"],
                    },
                },
                fontWeight: {
                    bold: { fontWeight: theme.fontWeight.semibold },
                },
                textTransform: {
                    uppercase: { textTransform: "uppercase" },
                },
                fontStyle: {
                    italic: { fontStyle: "italic" },
                },
            },
            body: {
                base: {
                    fontFamily: theme.fontFamily.secondary.join(),
                    fontWeight: theme.fontWeight.regular,
                    letterSpacing: theme.letterSpacing.body,
                },
                size: {
                    l: {
                        fontSize: theme.fontSize.l,
                        lineHeight: theme.lineHeight["body-l"],
                        marginBottom: theme.spacing["20"],
                    },
                    m: {
                        fontSize: theme.fontSize.m,
                        lineHeight: theme.lineHeight["body-m"],
                        marginBottom: theme.spacing["20"],
                    },
                    s: {
                        fontSize: theme.fontSize.s,
                        lineHeight: theme.lineHeight["body-s"],
                        marginBottom: theme.spacing["16"],
                    },
                    xs: {
                        fontSize: theme.fontSize.xs,
                        lineHeight: theme.lineHeight["body-xs"],
                        marginBottom: theme.spacing["12"],
                    },
                    xxs: {
                        fontSize: theme.fontSize.xxs,
                        lineHeight: theme.lineHeight["body-xxs"],
                        marginBottom: theme.spacing["8"],
                    },
                },
                fontWeight: {
                    bold: { fontWeight: theme.fontWeight.bold },
                },
                fontStyle: {
                    italic: { fontStyle: "italic" },
                },
            },
            label: {
                base: {
                    fontFamily: theme.fontFamily.primary.join(),
                    fontWeight: theme.fontWeight.regular,
                    letterSpacing: theme.letterSpacing.label,
                    marginBottom: theme.spacing["0"],
                },
                size: {
                    m: {
                        fontSize: theme.fontSize.m,
                        lineHeight: theme.lineHeight["label-m"],
                    },
                    s: {
                        fontSize: theme.fontSize.s,
                        lineHeight: theme.lineHeight["label-s"],
                    },
                    xs: {
                        fontSize: theme.fontSize.xs,
                        lineHeight: theme.lineHeight["label-xs"],
                    },
                    xxs: {
                        fontSize: theme.fontSize.xxs,
                        lineHeight: theme.lineHeight["label-xxs"],
                    },
                },
                fontWeight: {
                    bold: { fontWeight: theme.fontWeight.medium },
                },
                fontStyle: {
                    italic: { fontStyle: "italic" },
                },
            },
        },
    };
};
