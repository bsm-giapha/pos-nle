<template>
    <component :is="elementType" :class="classObject">
        <slot/>
    </component>
</template>

<script>
export default {
    name: "BaseFormControl",
    inheritAttrs: true,
    props: {
        elementType: {
            type: String,
            required: false,
            default: 'div',
            validator(value) {
                return ['div', 'fieldset'].includes(value);
            },
        },
        formControl: {
            type: String,
            required: false,
            default: 'comfortable',
            validator(value) {
                return ['comfortable', 'tight', 'loose', 'none'].includes(value);
            },
        },
        size: {
            type: String,
            required: false,
            default: 'medium',
            validator(value) {
                return ['large', 'medium', 'small'].includes(value);
            },
        },
    },
    computed: {
        classObject() {
            return {
                'BaseFormControl': true,

                'BaseFormControl__size--large--loose': this.size === 'large' && this.formControl === 'loose',
                'BaseFormControl__size--large--comfortable': this.size === 'large' && this.formControl === 'comfortable',
                'BaseFormControl__size--large--tight': this.size === 'large' && this.formControl === 'tight',
                'BaseFormControl__size--large--none': this.size === 'large' && this.formControl === 'none',

                'BaseFormControl__size--medium--loose': (this.size !== 'large' && this.size !== 'small') && this.formControl === 'loose',
                'BaseFormControl__size--medium--comfortable': (this.size !== 'large' && this.size !== 'small') && this.formControl === 'comfortable',
                'BaseFormControl__size--medium--tight': (this.size !== 'large' && this.size !== 'small') && this.formControl === 'tight',
                'BaseFormControl__size--medium--none': (this.size !== 'large' && this.size !== 'small') && this.formControl === 'none',

                'BaseFormControl__size--small--loose': this.size === 'small' && this.formControl === 'loose',
                'BaseFormControl__size--small--comfortable': this.size === 'small' && this.formControl === 'comfortable',
                'BaseFormControl__size--small--tight': this.size === 'small' && this.formControl === 'tight',
                'BaseFormControl__size--small--none': this.size === 'small' && this.formControl === 'none',
            };
        },
    },
};
</script>
