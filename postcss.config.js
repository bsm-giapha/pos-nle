module.exports = {
    "plugins": [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss')('./src/bright/tailwind.config.js'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
