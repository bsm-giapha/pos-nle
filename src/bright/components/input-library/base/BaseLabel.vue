<template>
    <div :class="containerClassObject">
        <label v-bind="$attrs" :class="labelClassObject" :for="forValue">
            <span v-show="!hideLabel">
                <span>{{ label }}</span>
                <span v-if="!readonly && !hideMetaLabel">
                    <span v-if="optional" :class="optionalLabelClassObject">&nbsp;(optional)</span>
                    <span v-else :class="requiredLabelClassObject">*</span>
                </span>
            </span>
            <span v-if="subLabel" v-show="!hideSubLabel" :class="subLabelClassObject">
                {{ subLabel }}
            </span>
        </label>
    </div>
</template>

<script>
export default {
    name: "BaseLabel",
    inheritAttrs: false,
    props: {
        hideLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideSubLabel: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        forValue: {
            type: String,
            required: true,
            default: '',
        },
        label: {
            type: String,
            required: true,
        },
        optional: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Whether to display a red asterisk if the field is required or the word (optional) if the field is optional
         */
        hideMetaLabel: {
            type: Boolean,
            required: false,
            default: true,
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false,
        },
        subLabel: {
            type: String,
            required: false,
            default: null,
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
        containerClassObject() {
            return {
                'BaseLabelContainer': true,
                'BaseLabelContainer__size--large': this.size === 'large' && !this.subLabel,
                'BaseLabelContainer__size--large--withSubLabel': this.size === 'large' && this.subLabel,
                'BaseLabelContainer__size--medium': (this.size !== 'large' && this.size !== 'small') && !this.subLabel,
                'BaseLabelContainer__size--medium--withSubLabel': (this.size !== 'large' && this.size !== 'small') && this.subLabel,
                'BaseLabelContainer__size--small': this.size === 'small' && !this.subLabel,
                'BaseLabelContainer__size--small--withSubLabel': this.size === 'small' && this.subLabel,
                'mb-0': this.hideLabel,
            };
        },
        labelClassObject() {
            return {
                'BaseLabelPrimary': true,
                'BaseLabelPrimary__size--large': this.size === 'large',
                'BaseLabelPrimary__size--medium': (this.size !== 'large' && this.size !== 'small'),
                'BaseLabelPrimary__size--small': this.size === 'small',
                'BaseLabelPrimary__disabled': this.disabled,
            };
        },
        subLabelClassObject() {
            return {
                'BaseLabelSecondary': true,
                'BaseLabelSecondary__size--large': this.size === 'large',
                'BaseLabelSecondary__size--medium': (this.size !== 'large' && this.size !== 'small'),
                'BaseLabelSecondary__size--small': this.size === 'small',
                'BaseLabelSecondary__disabled': this.disabled,
            };
        },
        optionalLabelClassObject() {
            return {
                'BaseLabelOptional': true,
                'BaseLabelOptional__size--large': this.size === 'large',
                'BaseLabelOptional__size--medium': (this.size !== 'large' && this.size !== 'small'),
                'BaseLabelOptional__size--small': this.size === 'small',
                'BaseLabelOptional__disabled': this.disabled,
            };
        },
        requiredLabelClassObject() {
            return {
                'BaseLabelRequired': true,
                'BaseLabelRequired__disabled': this.disabled,
            };
        },
    },
};
</script>
