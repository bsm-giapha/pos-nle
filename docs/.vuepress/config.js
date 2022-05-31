module.exports = {
    title: 'Bright Design System',
    description: 'The official documentation site for the Bright Design System, built by and for BeSmartee.',
    port: 8079,
    themeConfig: { // https://v1.vuepress.vuejs.org/theme/default-theme-config.html#homepage
        nav: [
            {
                text: 'Bright Design System',
                link: '/bright-design-system/',
                items: [
                    { text: 'What\'s New', link: '/bright-design-system/whats-new/' },
                    { text: 'Getting Started', link: '/bright-design-system/getting-started/' },
                    { text: 'Design Studio', link: '/bright-design-system/design-studio/' },
                    { text: 'Core Library', link: '/bright-design-system/core-library/' },
                    { text: 'Layout Library', link: '/bright-design-system/layout-library/' },
                    { text: 'Input Library', link: '/bright-design-system/input-library/' },
                    { text: 'Overlay Library', link: '/bright-design-system/overlay-library/' },
                ]
            },
            {
                text: 'Ardent API',
                items: [
                    { text: 'Learn', link: '/ardent-api/learn/' },
                    { text: 'Essentials', link: '/ardent-api/essentials/' },
                    { text: 'Resources', link: '/ardent-api/resources/' },
                    { text: 'Advanced', link: '/ardent-api/advanced/' },
                ],
            },
            {
                text: 'BeSmartee',
                items: [
                    { text: 'New Lender Experience', link: '/besmartee/new-lender-experience/learn/introduction/' },
                    { text: 'REST API', link: '/besmartee/rest-api/' },
                ],
            }
        ],
        sidebar: {
            '/bright-design-system/': [
                {
                    title: 'What\'s New',
                    path: '/bright-design-system/whats-new/',
                    collapsable: true,
                    children: [
                        '/bright-design-system/whats-new/component-status',
                        '/bright-design-system/whats-new/release-history/',
                        '/bright-design-system/whats-new/upcoming-releases',
                    ]
                },
                {
                    title: 'Getting Started',
                    path: '/bright-design-system/getting-started/',
                    collapsable: true,
                    children: [
                        '/bright-design-system/getting-started/what-is-bright',
                        '/bright-design-system/getting-started/for-designers',
                        '/bright-design-system/getting-started/for-developers',
                    ]
                },
                {
                    title: 'Design Studio',
                    path: '/bright-design-system/design-studio/',
                    collapsable: true,
                    children: [
                        '/bright-design-system/design-studio/vision-statement',
                        '/bright-design-system/design-studio/principles',
                        '/bright-design-system/design-studio/colors',
                        '/bright-design-system/design-studio/typography',
                        '/bright-design-system/design-studio/sizing-spacing',
                        '/bright-design-system/design-studio/grid',
                        '/bright-design-system/design-studio/icons',
                    ]
                },
                {
                    title: 'Core Library',
                    path: '/bright-design-system/core-library/',
                    collapsable: false,
                    children: [
                        '/bright-design-system/core-library/avatar/',
                        '/bright-design-system/core-library/button/',
                        '/bright-design-system/core-library/expandable/',
                        '/bright-design-system/core-library/icon/',
                        '/bright-design-system/core-library/loader/',
                        '/bright-design-system/core-library/step-bar/',
                        '/bright-design-system/core-library/tag/',
                    ]
                },
                {
                    title: 'Layout Library',
                    path: '/bright-design-system/layout-library/',
                    collapsable: false,
                    children: [
                        '/bright-design-system/layout-library/banner/',
                        '/bright-design-system/layout-library/card/',
                        '/bright-design-system/layout-library/divider/',
                        '/bright-design-system/layout-library/grid/',
                        '/bright-design-system/layout-library/table/',
                    ]
                },
                {
                    title: 'Input Library',
                    path: '/bright-design-system/input-library/',
                    collapsable: false,
                    children: [
                        '/bright-design-system/input-library/overview/',
                        '/bright-design-system/input-library/date/',
                        '/bright-design-system/input-library/form/',
                        '/bright-design-system/input-library/input-compound/',
                        '/bright-design-system/input-library/input-group/',
                        '/bright-design-system/input-library/input-list/',
                        '/bright-design-system/input-library/address/',
                        '/bright-design-system/input-library/checkbox/',
                        '/bright-design-system/input-library/email/',
                        '/bright-design-system/input-library/money/',
                        '/bright-design-system/input-library/number/',
                        '/bright-design-system/input-library/password/',
                        '/bright-design-system/input-library/phone-number/',
                        '/bright-design-system/input-library/radio-group/',
                        '/bright-design-system/input-library/select-dropdown/',
                        '/bright-design-system/input-library/state/',
                        '/bright-design-system/input-library/switch/',
                        '/bright-design-system/input-library/text/',
                        '/bright-design-system/input-library/textarea/',
                    ],
                },
                {
                    title: 'Overlay Library',
                    path: '/bright-design-system/overlay-library/',
                    collapsable: false,
                    children: [
                        '/bright-design-system/overlay-library/modal/',
                        '/bright-design-system/overlay-library/popover/',
                        '/bright-design-system/overlay-library/the-notification-tray/',
                        '/bright-design-system/overlay-library/tooltip/',
                    ]
                },
            ],
            '/ardent-api/': [
                {
                    title: 'Learn',
                    path: '/ardent-api/learn/',
                    collapsable: false,
                    children: [
                        '/ardent-api/learn/introduction/',
                        '/ardent-api/learn/guide/',
                        '/ardent-api/learn/best-practices/',
                    ]
                },
                {
                    title: 'Essentials',
                    path: '/ardent-api/essentials/',
                    collapsable: false,
                    children: [
                        '/ardent-api/essentials/request',
                        '/ardent-api/essentials/response',
                        '/ardent-api/essentials/routing',
                        '/ardent-api/essentials/access-control',
                        '/ardent-api/essentials/permissions',
                        '/ardent-api/essentials/root-resources-vs-nested-resources',
                    ]
                },
                {
                    title: 'Resources',
                    path: '/ardent-api/resources/',
                    collapsable: false,
                    children: [
                        '/ardent-api/resources/procedure',
                        '/ardent-api/resources/model',
                        '/ardent-api/resources/model-resource',
                        '/ardent-api/resources/reader',
                        '/ardent-api/resources/validation',
                        '/ardent-api/resources/updater',
                    ]
                },
                {
                    title: 'Advanced',
                    path: '/ardent-api/advanced/',
                    collapsable: false,
                    children: [
                        '/ardent-api/advanced/avoiding-recursion',
                    ]
                },
            ],
            '/besmartee/new-lender-experience/': [
                {
                    title: 'Learn',
                    path: '/besmartee/new-lender-experience/learn/',
                    collapsable: false,
                    children: [
                        '/besmartee/new-lender-experience/learn/introduction/',
                        '/besmartee/new-lender-experience/learn/guide/',
                        '/besmartee/new-lender-experience/learn/best-practices/',
                    ]
                },
                {
                    title: 'Essentials',
                    path: '/besmartee/new-lender-experience/essentials/',
                    collapsable: false,
                    children: [
                        '/besmartee/new-lender-experience/essentials/application-architecture/',
                        '/besmartee/new-lender-experience/essentials/project-structure/',
                        '/besmartee/new-lender-experience/essentials/routing-and-navigation/',
                        '/besmartee/new-lender-experience/essentials/store/',
                        '/besmartee/new-lender-experience/essentials/forms/',
                    ]
                },
                {
                    title: 'Supplementary',
                    path: '/besmartee/new-lender-experience/supplementary/',
                    collapsable: false,
                    children: [
                        '/besmartee/new-lender-experience/supplementary/css-and-styling/',
                    ]
                },
            ],
            '/besmartee/rest-api/': [
                {
                    title: 'Functions',
                    path: '/besmartee/rest-api/functions/',
                    collapsable: false,
                    children: [
                        '/besmartee/rest-api/functions/decrypt',
                    ]
                },
                {
                    title: 'Lenders',
                    path: '/besmartee/rest-api/lenders/',
                    collapsable: false,
                    children: [
                        '/besmartee/rest-api/lenders/branches',
                        '/besmartee/rest-api/lenders/campaigns',
                        '/besmartee/rest-api/lenders/internal-users',
                        '/besmartee/rest-api/lenders/roles',
                        '/besmartee/rest-api/lenders/teams',
                    ]
                },
                '/besmartee/rest-api/vendors/',
            ],
        },
        search: true,
        searchPlaceholder: 'Search',
        searchMaxSuggestions: 10,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        displayAllHeaders: false,
        nextLinks: true,
        prevLinks: true,
        smoothScroll: true,
    },
    head: [
        ["script", {
            type: "text/javascript",
        }, "window.onload = function() {\n" +
        "    requestAnimationFrame(function() {\n" +
        "        if (location.hash) {\n" +
        "            const element = document.getElementById(location.hash.slice(1))\n" +
        "\n" +
        "            if (element) {\n" +
        "                element.scrollIntoView()\n" +
        "            }\n" +
        "        }\n" +
        "    })\n" +
        "}"],
    ],
    configureWebpack: {
        resolve: {
            alias: {
                'Bright': '/src/common/bright',
            }
        }
    },
    postcss: {
        "plugins": [
            require('postcss-import'),
            require('tailwindcss')('src/common/bright/tailwind.config.js'),
            require('postcss-nested'),
            require('autoprefixer')(),
        ]
    },
};