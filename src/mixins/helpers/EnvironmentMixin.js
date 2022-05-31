export default {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                isDevelopment() {
                    return !import.meta.env.VITE_APP_ENV || import.meta.env.VITE_APP_ENV === 'development';
                },
            },
        });
    },
};
