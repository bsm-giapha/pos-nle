<template>
    <div v-if="shouldRender" :class="classObject">
        <BrightIcon :use="validationType === 'success' ? 'check_circle' : 'cancel'"/>
        {{ validationMessage }}
    </div>
</template>

<script>
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
export default {
    name: "BaseInputValidation",
    components: { BrightIcon },
    inheritAttrs: true,
    props: {
        size: {
            type: String,
            required: false,
            default: 'medium',
            validator(value) {
                return ['large', 'medium', 'small'].includes(value);
            },
        },
        validationMessage: {
            type: String,
            required: false,
            default: null,
        },
        validationType: {
            type: String,
            required: false,
            default: 'none',
            validator(value) {
                return ['error', 'success', 'none', ''].includes(value);
            },
        },
    },
    computed: {
        classObject() {
            return {
                'BrightInputValidation': true,

                'BrightInputValidation__type--error': this.validationType === 'error',
                'BrightInputValidation__type--success': this.validationType === 'success',

                'BrightInputValidation__size--large': this.size === 'large',
                'BrightInputValidation__size--medium': (this.size !== 'large' && this.size !== 'small'),
                'BrightInputValidation__size--small': this.size === 'small',
            };
        },
        shouldRender() {
            return (this.validationType === 'error' || this.validationType === 'success') && (this.validationMessage && this.validationMessage.length > 0);
        },
    },
};
</script>
