<template>
    <div>
        <div
            :class="headerClassObject"
            v-bind="headerBindings"
            @click="handleExpandable"
            @keydown.enter.space.prevent="handleExpandable"
        >
            <span v-show="!hideArrow" :class="arrowClassObject">
                <BrightIcon v-bind="arrowIconBindings"/>
            </span>
            <slot name="header"/>
        </div>
        <div v-show="isExpanded" v-bind="contentBindings" :class="contentClassObject">
            <slot/>
        </div>
    </div>
</template>

<script>
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";

export default {
    name: "BrightExpandable",
    components: { BrightIcon },
    props: {
        id: {
            type: String,
            required: true,
        },
        expanded: {
            type: Boolean,
            required: false,
            default: false,
        },
        hideArrow: {
            type: Boolean,
            required: false,
            default: false,
        },
        arrowSize: {
            type: [Number, String],
            required: false,
            default: 'medium',
            validator(value) {
                return !isNaN(value) || ['large', 'medium', 'small'].includes(value);
            },
        },
    },
    data() {
        return {
            isExpanded: this.expanded === 'true' || this.expanded === true,
            arrowSizeIsCustom: !isNaN(this.arrowSize),
        };
    },
    computed: {
        headerClassObject() {
            return {
                'BrightExpandableHeader': true,
                'BrightExpandableHeaderExpanded': this.isExpanded,
                'BrightExpandableHeaderExpanded__size--large': this.arrowSize === 'large',
                'BrightExpandableHeaderExpanded__size--medium': this.arrowSize === '' || this.arrowSize === 'medium',
                'BrightExpandableHeaderExpanded__size--small': this.arrowSize === 'small',
                'BrightExpandableHeader__collapsed': !this.isExpanded,
                'focus:outline-none': true,
            };
        },
        arrowClassObject() {
            return {
                'BrightExpandable__arrow': true,
                'BrightExpandable__arrow--size--large': this.arrowSize === 'large',
                'BrightExpandable__arrow--size--medium': this.arrowSize === '' || this.arrowSize === 'medium',
                'BrightExpandable__arrow--size--small': this.arrowSize === 'small',
                'BrightExpandable__arrow--expanded': this.isExpanded,
                'BrightExpandable__arrow--collapsed': !this.isExpanded,
            };
        },
        contentClassObject() {
            return {
                'BrightExpandable__content--expanded': this.isExpanded,
                'BrightExpandable__content--collapsed': !this.isExpanded,
            };
        },
        headerBindings() {
            return {
                'id': this.id + 'BrightExpandableHeader',
                'aria-controls': this.id + 'BrightExpandableContent',
                'aria-expanded': this.isExpanded ? 'true' : 'false',
                'aria-disabled': 'false',
                'role': 'button',
                'tabindex': '0',
            };
        },
        arrowIconBindings() {
            return {
                'use': 'keyboard_arrow_right',
                'style': this.arrowSizeIsCustom ? 'font-size: ' + this.arrowSize + 'px' : '',
            };
        },
        contentBindings() {
            return {
                'id': this.id + 'BrightExpandableContent',
                'role': 'region',
                'aria-labelledby': this.id + 'BrightExpandableHeader',
            };
        },
    },
    watch: {
        expanded: function(newValue) {
            this.isExpanded = newValue;
        },
    },
    methods: {
        handleExpandable() {
            this.isExpanded = !this.isExpanded;
        },
    },
};
</script>

<style scoped>

</style>
