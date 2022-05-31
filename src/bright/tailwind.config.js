module.exports = {
    prefix: '',
    important: false,
    separator: ':',
    content: [
        // Example content paths...
        './public/**/*.html',
        './docs/**/*.{md,js,jsx,ts,tsx,vue}',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    safelist: [
        {
            pattern: /w-(1|2|3|4|5|6|7|8|9|10|11)\/(12)/,
            variants: ['desktop', 'tablet', 'mobile'],
        },
        {
            pattern: /__flex--(initial|none|grow|grow--none|shrink|shrink--none)/,
            variants: ['desktop', 'tablet', 'mobile'],
        },
    ],
    theme: require("./tailwind.theme").theme,
    corePlugins: { // To reduce the file size of the generated CSS file, always lean toward disabling unused/edge-case plugins
        /* Core */
        screens: true,
        colors: true,
        spacing: true,

        /* Layout */
        container: false,
        boxSizing: true,
        display: true,
        float: true,
        clear: true,
        objectFit: false,
        objectPosition: false,
        overflow: true,
        overscrollBehavior: true,
        position: true,
        inset: true,
        visibility: true,
        zIndex: true,

        /* Flexbox */
        flexDirection: true,
        flexWrap: true,
        alignItems: true,
        alignContent: true,
        alignSelf: true,
        justifyContent: true,
        flex: true,
        flexGrow: true,
        flexShrink: true,
        order: true,

        /* Grid */
        gridTemplateColumns: false,
        gridColumn: false,
        gridColumnStart: false,
        gridColumnEnd: false,
        gridTemplateRows: false,
        gridRow: false,
        gridRowStart: false,
        gridRowEnd: false,
        gridAutoColumns: false,
        gridAutoRows: false,
        gap: false,
        gridAutoFlow: false,
        justifyItems: false,
        justifySelf: false,
        placeContent: false,
        placeItems: false,
        placeSelf: false,

        /* Spacing */
        padding: true,
        margin: true,
        space: false,

        /* Sizing */
        width: true,
        minWidth: true,
        maxWidth: true,
        height: true,
        minHeight: true,
        maxHeight: true,

        /* Typography */
        fontFamily: true,
        fontSize: true,
        fontSmoothing: false,
        fontStyle: false,
        fontVariantNumeric: false,
        fontWeight: true,
        letterSpacing: true,
        lineHeight: true,
        listStyleType: true,
        listStylePosition: true,
        placeholderColor: false,
        placeholderOpacity: false,
        textAlign: true,
        textColor: true,
        textOpacity: true,
        textDecoration: true,
        textTransform: true,
        verticalAlign: true,
        whitespace: true,
        wordBreak: true,

        /* Backgrounds */
        backgroundAttachment: false,
        backgroundClip: false,
        backgroundColor: true,
        backgroundOpacity: true,
        backgroundPosition: false,
        backgroundRepeat: false,
        backgroundSize: false,
        backgroundImage: false,
        gradientColorStops: false,

        /* Borders */
        borderRadius: true,
        borderWidth: true,
        borderColor: true,
        borderOpacity: false,
        borderStyle: true,
        divideWidth: false,
        divideColor: false,
        divideOpacity: false,
        divideStyle: false,

        /* Tables */
        borderCollapse: false,
        tableLayout: false,

        /* Effects */
        boxShadow: true,
        opacity: true,

        /* Transitions & Animations */
        transitionProperty: false,
        transitionTimingFunction: false,
        transitionDuration: false,
        transitionDelay: false,
        animation: false,
        keyframes: false,

        /* Transforms */
        scale: false,
        rotate: false,
        translate: false,
        skew: false,
        transformOrigin: false,

        /* Interactivity */
        appearance: false,
        cursor: true,
        outline: false,
        pointerEvents: false,
        resize: true,
        userSelect: true,

        /* SVG */
        fill: true,
        stroke: true,
        strokeWidth: true,

        /* Accessibility */
        accessibility: true,
    },
    brightPluginOptions: require("./tailwind.theme").brightPluginOptions,
    plugins: require("./tailwind-plugins/tailwind.plugins").plugins,
};
