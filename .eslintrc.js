/* eslint-env node */
module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
    ],
    "env": {
        "vue/setup-compiler-macros": true,
    },
    "rules": {
    /* Best Practices */
        "block-scoped-var": "error",
        "curly": ["error", "multi-line"],
        "default-case": "error",
        "default-case-last": "error",
        "default-param-last": ["error"],
        "eqeqeq": ["error", "smart"],
        "max-classes-per-file": ["error", 1],
        "no-multi-spaces": "error",
        "no-useless-return": "error",
        "yoda": "error",

        /* Recommended */
        "no-unreachable": "warn",
        "no-unused-vars": "warn",

        /* Variables */
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": false,
            "variables": true,
        }],

        /* Stylistic Issues */
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": "error",
        "brace-style": [
            "error",
            "1tbs",
            { "allowSingleLine": true },
        ],
        "camelcase": [
            "error",
            {
                "properties": "always",
                "ignoreDestructuring": false,
                "ignoreImports": false,
                "ignoreGlobals": false,
                allow: [
                    "^(\\$_)",
                ],
            },
        ],
        "comma-dangle": ["error", "always-multiline"],
        "comma-spacing": ["error", {
            "before": false,
            "after": true,
        }],
        "comma-style": ["error", "last"],
        "eol-last": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "implicit-arrow-linebreak": ["error", "beside"],
        "indent": ["error", 4, {
            "ignoredNodes": ["TemplateLiteral"],
            "SwitchCase": 1,
        }],
        "key-spacing": ["error", { "beforeColon": false }],
        "keyword-spacing": ["error",
            { "before": true, "after": true },
        ],
        "new-parens": ["error", "always"],
        "no-bitwise": "error",
        "no-nested-ternary": "error",
        "no-trailing-spaces": [
            "error", {
                "skipBlankLines": true,
                "ignoreComments": false,
            },
        ],
        "no-whitespace-before-property": "error",
        "object-curly-spacing": ["error", "always"],
        "semi": ["error", "always"],
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", {
            "anonymous": "ignore",
            "named": "never",
            "asyncArrow": "always",
        }],
        "space-in-parens": ["error", "never"],

        /* ES6 */
        "no-var": "error",

        /* Vue Priority A: Essential */
        "vue/custom-event-name-casing": ["error", {
            "ignores": ["/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u"],
        }],

        /* Vue Priority B: Strongly Recommended */
        "vue/attribute-hyphenation": ["error", "always"],
        "vue/component-definition-name-casing": ["error", "PascalCase"],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "always",
        }],
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "never",
        }],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
        }],
        "vue/html-quotes": ["error", "double",
            { "avoidEscape": false },
        ],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 3,
            "multiline": {
                "max": 1,
            },
        }],
        "vue/mustache-interpolation-spacing": ["error", "always"],
        "vue/no-multi-spaces": "error",
        "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
        "vue/no-template-shadow": "error",
        "vue/one-component-per-file": "error",
        "vue/prop-name-casing": ["error", "camelCase"],
        "vue/require-default-prop": "error",
        "vue/require-prop-types": "error",
        "vue/v-bind-style": ["error", "shorthand"],
        "vue/v-on-style": ["error", "shorthand"],
        "vue/v-slot-style": ["error", {
            "atComponent": "v-slot",
            "default": "longform",
            "named": "longform",
        }],

        /* Vue Priority C: Recommended */
        "vue/attributes-order": ["error", {
            "order": [
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                "UNIQUE",
                "TWO_WAY_BINDING",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT",
            ],
            "alphabetical": false,
        }],
        "vue/order-in-components": ["error", {
            "order": [
                "el",
                "name",
                "key",
                "parent",
                "functional",
                ["delimiters", "comments"],
                ["components", "directives", "filters"],
                "extends",
                "mixins",
                ["provide", "inject"],
                "ROUTER_GUARDS",
                "layout",
                "middleware",
                "validate",
                "scrollToTop",
                "transition",
                "loading",
                "inheritAttrs",
                "model",
                ["props", "propsData"],
                "emits",
                "setup",
                "asyncData",
                "data",
                "fetch",
                "head",
                "computed",
                "watch",
                "watchQuery",
                "LIFECYCLE_HOOKS",
                "methods",
                ["template", "render"],
                "renderError",
            ],
        }],
        "vue/this-in-template": ["error", "never"],
        "vue/multi-word-component-names": 0,

        /* Vue Extensions */
        "vue/array-bracket-spacing": ["error", "never"],
        "vue/block-spacing": "error",
        "vue/brace-style": [
            "error",
            "1tbs",
            { "allowSingleLine": true },
        ],
        "vue/camelcase": [
            "error",
            {
                "properties": "always",
                "ignoreDestructuring": false,
                "ignoreImports": false,
                "ignoreGlobals": false,
                allow: [
                    "^(\\$_)",
                ],
            },
        ],
        "vue/comma-dangle": ["error", "always-multiline"],
        "vue/comma-spacing": ["error", {
            "before": false,
            "after": true,
        }],
        "vue/comma-style": ["error", "last"],
        "vue/eqeqeq": ["error", "smart"],
        "vue/func-call-spacing": ["error", "never"],
        "vue/key-spacing": ["error", { "beforeColon": false }],
        "vue/keyword-spacing": ["error",
            { "before": true, "after": true },
        ],
        "vue/object-curly-spacing": ["error", "always"],
        "vue/space-in-parens": ["error", "never"],
    },
};
