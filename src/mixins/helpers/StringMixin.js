export const StringMixin = {
    methods: {
        isEmptyString: (str) => {
            return (!str || /^\s*$/.test(str) || str.length === 0);
        },
    },
};
