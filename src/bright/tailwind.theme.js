exports.theme = {
    /**
     * Core
     */
    screens: {
        tablet: '640px',
        landscape: '1024px',
        desktop: '1440px',
    },
    colors: {
        transparent: 'transparent',
        current: 'currentColor',

        black: '#000000',
        white: '#ffffff',
        grey: {
            25: '#FBFBFB',
            50: '#F5F7FA',
            100: '#E4E7EB',
            200: '#CBD2D9',
            300: '#9AA5B1',
            400: '#7B8794',
            500: '#616E7C',
            600: '#52606D',
            700: '#3E4C59',
            800: '#323F4B',
            900: '#1F2933',
        },
        blue: {
            25: '#F5FBFF',
            50: '#E6F6FF',
            100: '#BAE3FF',
            200: '#7CC4FA',
            300: '#47A3F3',
            400: '#2186EB',
            500: '#0967D2',
            600: '#0552B5',
            700: '#03449E',
            800: '#01337D',
            900: '#002159',
        },
        aqua: {
            25: '#F0FCFF',
            50: '#E0FAFF',
            100: '#C8F6FE',
            200: '#9EF1FA',
            300: '#71EBF4',
            400: '#51E6EC',
            500: '#20DFDF',
            600: '#10C0C6',
            700: '#099FAA',
            800: '#048290',
            900: '#006675',
        },
        pink: {
            25: '#FFF5FB',
            50: '#FEE7F4',
            100: '#FECDE8',
            200: '#FCA6D2',
            300: '#FA89C0',
            400: '#F764A6',
            500: '#F53D8A',
            600: '#E00B6B',
            700: '#C10660',
            800: '#91034C',
            900: '#650138',
        },
        yellow: {
            25: '#FFFDF5',
            50: '#FFFAE5',
            100: '#FFF2C2',
            200: '#FFE999',
            300: '#FFDD70',
            400: '#FFD44C',
            500: '#FFCA23',
            600: '#FFAE00',
            700: '#DB8000',
            800: '#B85900',
            900: '#993B00',
        },
        green: {
            25: '#F0FFF1',
            50: '#E1F9E3',
            100: '#C4F3C8',
            200: '#98E19D',
            300: '#53C659',
            400: '#2CAA30',
            500: '#1A891E',
            600: '#0A7B0E',
            700: '#066B09',
            800: '#025A08',
            900: '#004705',
        },
        red: {
            25: '#FFF5F5',
            50: '#FFE3E3',
            100: '#FFBDBD',
            200: '#FF9B9B',
            300: '#F86A6A',
            400: '#EF4E4E',
            500: '#E12D39',
            600: '#CF1124',
            700: '#AB091E',
            800: '#8A041A',
            900: '#610316',
        },
        orange: {
            25: '#FFF9F5',
            50: '#FFEBDC',
            100: '#FDD4B4',
            200: '#FCC497',
            300: '#FAAE6B',
            400: '#F8963A',
            500: '#FF8000',
            600: '#D0640B',
            700: '#AC4906',
            800: '#8C3303',
            900: '#6B2000',
        },
        purple: {
            25: '#F9F5FE',
            50: '#F5EBFF',
            100: '#E9D3FD',
            200: '#D1AAF8',
            300: '#B375F0',
            400: '#9952E0',
            500: '#892AD5',
            600: '#772AB2',
            700: '#641C9C',
            800: '#511281',
            900: '#410B65',
        },
        indigo: {
            25: '#F5F9FF',
            50: '#EBF2FE',
            100: '#CDDBFE',
            200: '#97B1F7',
            300: '#6F8CEB',
            400: '#506BD7',
            500: '#304CD3',
            600: '#293DB3',
            700: '#223191',
            800: '#1D2777',
            900: '#171E5E',
        },
    },
    spacing: {
        px: '1px',
        '0': '0',
        '1': '0.063rem',
        '2': '0.125rem',
        '3': '0.188rem',
        '4': '0.25rem',
        '5': '0.313rem',
        '6': '0.375rem',
        '7': '0.438rem',
        '8': '0.5rem',
        '10': '0.625rem',
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
        '18': '1.125rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '32': '2rem',
        '40': '2.5rem',
        '48': '3rem',
        '56': '3.5rem',
        '64': '4rem',
    },

    /**
     * Backgrounds
     */
    backgroundColor: theme => theme('colors'),
    backgroundOpacity: theme => theme('opacity'),

    /**
     * Layout
     */
    inset: {
        '0': '0',
        auto: 'auto',
    },
    zIndex: {
        auto: 'auto',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
    },

    /**
     * Flexbox
     */
    flex: {
        '1': '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
    },
    flexGrow: {
        '0': '0',
        DEFAULT: '1',
    },
    flexShrink: {
        '0': '0',
        DEFAULT: '1',
    },
    order: {
        first: '-9999',
        last: '9999',
    },

    /**
     * Spacing
     */
    padding: theme => theme('spacing'),
    margin: (theme, { negative }) => ({
        auto: 'auto',
        ...theme('spacing'),
        ...negative(theme('spacing')),
    }),

    /**
     * Sizing
     */
    width: theme => ({
        auto: 'auto',
        ...theme('spacing'),
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        full: '100%',
        screen: '100vw',
    }),
    height: theme => ({
        auto: 'auto',
        ...theme('spacing'),
        full: '100%',
        screen: '100vh',
    }),
    minWidth: {
        '0': '0',
        full: '100%',
    },
    maxWidth: {
        full: '100%',
    },
    minHeight: {
        '0': '0',
        full: '100%',
        screen: '100vh',
    },
    maxHeight: {
        full: '100%',
        screen: '100vh',
    },

    /**
     * Typography
     */
    fontFamily: {
        primary: [
            'Poppins',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ],
        secondary: [
            'Nunito Sans',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ],
        code: [
            'Inconsolata',
            'Courier New',
            'Lucida Console',
            'monospace',
        ],
    },
    fontSize: {
        'h1': '2.25rem', // 36px
        'h2': '1.875rem', // 30px
        'h3': '1.625rem', // 26px
        'h4': '1.375rem', // 22px
        'h5': '1.125rem', // 18px
        'h6': '1rem', // 16px
        'xl': '1.25rem', // 20px
        'l': '1.125rem', // 18px
        'm': '1rem', // 16px
        's': '0.875rem', // 14px
        'xs': '0.75rem', // 12px
        'xxs': '0.625rem', // 10px
    },
    fontWeight: {
        light: '300',
        regular: '400', // Poppins and Nunito
        medium: '500', // Poppins only (Label)
        semibold: '600', // Poppins only
        bold: '700', // Poppins and Nunito
    },
    textColor: theme => theme('colors'),
    letterSpacing: {
        'heading': '-0.02em',
        'body': '-0.005em',
        'normal': '0',
        'section': '0',
        'section-caps': '0.04em',
        'label': '0',
    },
    lineHeight: {
        none: '1',
        'h1': '1.222',
        'h2': '1.2',
        'h3': '1.231',
        'h4': '1.273',
        'h5': '1.334',
        'h6': '1.25',
        'section-xl': '1.3',
        'section-l': '1.3',
        'section-m': '1.3',
        'section-s': '1.429',
        'section-xs': '1.334',
        'section-xxs': '1.2',
        'body-l': '1.556',
        'body-m': '1.5',
        'body-s': '1.429',
        'body-xs': '1.333',
        'body-xxs': '1.2',
        'label-m': '1.25',
        'label-s': '1.142',
        'label-xs': '1.333',
        'label-xxs': '1.2',
    },
    listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
    },

    /**
     * Borders
     */
    borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.grey.100', 'currentColor'),
    }),
    borderOpacity: theme => theme('opacity'),
    borderRadius: {
        none: '0',
        3: '0.1875rem',
        4: '0.25rem',
        6: '0.375rem',
        full: '9999px',
    },
    borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
        '6': '6px',
    },

    /**
     * Effects
     */
    boxShadow: {
        'card': '0px 1px 4px rgba(0, 0, 0, 0.25)',
        'state-default': '0px 2px 4px rgba(0, 0, 0, 0.25)',
        'state-focused': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        'state-pressed': '0px 0px 4px rgba(0, 0, 0, 0.25)',
        'input-glow-pressed': '0px 0px 3px #00CAE5',
        'input-glow-pressed-error': '0px 0px 3px #EB0A0A',
        'input-glow-pressed-success': '0px 0px 3px #008A19',
        glow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none',
    },
    opacity: {
        '0': '0',
        '20': '0.2',
        '40': '0.4',
        '60': '0.6',
        '80': '0.8',
        '90': '0.9',
        '100': '1',
    },

    /**
     * Interactivity
     */
    cursor: {
        auto: 'auto',
        DEFAULT: 'default',
        pointer: 'pointer',
        wait: 'wait',
        text: 'text',
        move: 'move',
        'not-allowed': 'not-allowed',
    },

    /**
     * SVG
     */
    stroke: {
        current: 'currentColor',
    },
};

exports.theme.colors['brand-primary'] = exports.theme.colors.indigo;

exports.brightPluginOptions = {
    typography: {},
    buttons: {},
};
