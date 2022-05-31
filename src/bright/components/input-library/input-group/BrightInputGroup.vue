<template>
    <BaseFormControl v-bind="fieldsetBindings">
        <legend :class="legendClassObject">
            <label :class="labelClassObject">
                <span v-show="!hideLabel">
                    <span>{{ label }}</span>
                    <span v-if="shouldShowOptionalLabel" :class="optionalLabelClassObject">&nbsp;(optional)</span>
                    <span v-if="shouldShowRequiredLabel" :class="requiredLabelClassObject">*</span>
                </span>
                <span v-show="!hideSubLabel" v-if="subLabel" :class="subLabelClassObject">
                    {{ subLabel }}
                </span>
            </label>
        </legend>
        <slot></slot>
    </BaseFormControl>
</template>

<script>
import { SizeMixin } from "Bright/mixins/global/SizeMixin";
import BaseFormControl from "Bright/components/input-library/base/BaseFormControl.vue";
export default {
    name: "BrightInputGroup",
    components: { BaseFormControl },
    mixins: [SizeMixin],
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
        formControl: {
            type: String,
            required: false,
            default: 'comfortable',
            validator(value) {
                return ['comfortable', 'tight', 'loose', 'none'].includes(value);
            },
        },
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
        optional: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideMetaLabel: {
            type: Boolean,
            required: false,
            default: null,
        },
        label: {
            type: String,
            default: '',
            required: true,
        },
        subLabel: {
            type: String,
            default: '',
            required: false,
        },
    },
    computed: {
        fieldsetBindings() {
            return {
                elementType: 'fieldset',
                size: this.size,
                formControl: this.formControl,
                disabled: this.disabled,
                class: {
                    'BrightInputGroupFieldset': true,
                },
            };
        },
        legendClassObject() {
            return {
                'BrightInputGroup__size': true,
                'BrightInputGroup__size--small': this.size === 'small',
                'BrightInputGroup__size--medium': !this.size || this.size === 'medium',
                'BrightInputGroup__size--large': this.size === 'large',
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
        shouldShowOptionalLabel() {
            return this.optional && this.hideMetaLabel !== true;
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
        shouldShowRequiredLabel() {
            return !this.optional && this.hideMetaLabel === false;
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

<style scoped>

</style>
