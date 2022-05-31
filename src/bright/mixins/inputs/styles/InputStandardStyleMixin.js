/**
 *  Shared across all Base Input components that deal with textual data
 */

export const InputStandardStyleMixin = {
    props: {
        rounded: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        inputStandardStyleClassObject() {
            return {
                'InputStandardStyle': true,

                'InputStandardStyle__rounded': this.rounded,

                'InputStandardStyle__size--large': this.size === 'large',
                'InputStandardStyle__size--medium': (this.size !== 'large' && this.size !== 'small'),
                'InputStandardStyle__size--small': this.size === 'small',

                'InputStandardStyle__validationType--none': (this.validationType !== 'error' && this.validationType !== 'success'),
                'InputStandardStyle__validationType--error': this.validationType === 'error',
                'InputStandardStyle__validationType--success': this.validationType === 'success',
            };
        },
    },
};
