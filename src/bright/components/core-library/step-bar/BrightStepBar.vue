<template>
    <div v-bind="stepBarBindings">
        <div class="mb-16 tablet:mb-32">
            <div class="BrightStepBar__StepLabel">Step {{ currentStep }} of {{ steps.length }}</div>
            <div role="heading" :aria-label="headingLevel" class="BrightStepBar__Header">{{ header }}</div>
            <div v-if="subHeader" class="BrightStepBar__SubHeader">{{ subHeader }}</div>
        </div>
        <div class="inline-block mr-20 tablet:block tablet:mr-auto">
            <div v-bind="barBindings">
                <div v-bind="progressBindings"></div>
                <div
                    v-for="(step, index) in steps"
                    v-bind="getStepBubbleBindings(step, index)"
                    :key="index"
                    @click="handleStepClick(index)"
                >
                    {{ currentStep > index + 1 ? '✓' : index + 1 }}
                </div>
            </div>
        </div>
        <div role="list" class="BrightStepBar__StepList">
            <div
                v-for="(step, index) in steps"
                v-bind="getStepBindings(step, index)"
                :key="index"
                @click="handleStepClick(index)"
            >
                {{ step.label }}
            </div>
        </div>
    </div>
</template>

<script>
import { MobileMixin } from "Bright/mixins/global/MobileMixin";

export default {
    name: "BrightStepBar",
    mixins: [MobileMixin],
    inheritAttrs: true,
    props: {
        id: {
            type: String,
            required: true,
        },
        steps: {
            type: Array,
            required: true,
        },
        currentStep: {
            type: Number,
            required: true,
        },
        highestAttainedStep: {
            type: Number,
            required: false,
            default: 1,
        },
        color: {
            type: String,
            required: false,
            default: 'primary',
            validator: function(value) {
                return ['primary', 'secondary'].includes(value);
            },
        },
        headingLevel: {
            type: Number,
            required: false,
            default: 2,
            validator: function(value) {
                return [1, 2, 3, 4, 5, 6].includes(value);
            },
        },
    },
    emits: ['step-click'],
    computed: {
        stepBarBindings() {
            return {
                id: this.id,
                class: {
                    'BrightStepBar': true,
                },
            };
        },
        barBindings() {
            let style = {};
            if (this.isMobile) {
                style.height = `${this.steps.length * 48}px`;
            }
            return {
                class: {
                    'BrightStepBar__Bar': true,
                },
                style: style,
            };
        },
        progressBindings() {
            let style = {};
            if (this.isMobile) {
                style.height = (this.currentStep / this.steps.length * 100) + '%';
            } else {
                style.width = (this.currentStep / this.steps.length * 100) + '%';
            }
            return {
                class: {
                    'BrightStepBar__Bar__Progress': true,
                    'BrightStepBar__Bar__Progress--primary': this.color === 'primary',
                    'BrightStepBar__Bar__Progress--secondary': this.color === 'secondary',
                },
                style: style,
            };
        },
        currentStepObject() {
            return this.steps[this.currentStep - 1];
        },
        header() {
            return this.currentStepObject.label;
        },
        subHeader() {
            return this.currentStepObject.subLabel ?? '';
        },
    },
    methods: {
        getStepBubbleBindings(step, index) {
            let baseBubbleDimension = (1 / this.steps.length) * 100;
            let style = {
                lineHeight: this.currentStep === index + 1 ? '32px' : '24px',
            };
            if (this.isMobile) {
                style.top = `calc(${baseBubbleDimension * (index + 1) - (baseBubbleDimension / 2)}% - ${this.currentStep === index + 1 ? '16' : '12'}px)`;
            } else {
                style.left = `calc(${baseBubbleDimension * (index + 1) - (baseBubbleDimension / 2)}% - ${this.currentStep === index + 1 ? '16' : '12'}px)`;
            }
            return {
                class: {
                    'BrightStepBar__Bar__Progress__Bubble': true,
                    'w-32 h-32': this.currentStep === index + 1,
                    'w-24 h-24': this.currentStep !== index + 1,
                    'BrightStepBar__Bar__Progress__Bubble--primary': this.color === 'primary',
                    'BrightStepBar__Bar__Progress__Bubble--secondary': this.color === 'secondary',
                    'BrightStepBar__Bar__Progress__Bubble--inactive': this.currentStep <= index,
                    'BrightStepBar__Bar__Progress__Bubble--active': this.currentStep > index || index < this.highestAttainedStep,
                    'BrightStepBar__Bar__Progress__Bubble--current': this.currentStep === index + 1,
                },
                style: style,
            };
        },
        getStepBindings(step, index) {
            return {
                class: {
                    'BrightStepBar__Step': true,
                    'BrightStepBar__Step--primary': this.color === 'primary',
                    'BrightStepBar__Step--secondary': this.color === 'secondary',
                    'BrightStepBar__Step--inactive': this.currentStep <= index,
                    'BrightStepBar__Step--active': this.currentStep > index || index < this.highestAttainedStep,
                    'BrightStepBar__Step--current': this.currentStep === index + 1,
                },
                role: 'listitem',
            };
        },
        handleStepClick(index) {
            this.$emit('step-click', index + 1);
        },
    },
};
</script>
