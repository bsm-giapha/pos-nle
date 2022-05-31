/**
 *  @deprecated This will be taken out soon.
 *  Shared globally across all components that use our standard size standard (with Medium as the default)
 */
export const SizeMixin = {
    props: {
        size: {
            type: String,
            required: false,
            default: 'medium',
            validator(value) {
                return ['large', 'medium', 'small'].includes(value);
            },
        },
    },
};
