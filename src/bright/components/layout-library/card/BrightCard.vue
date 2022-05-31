<template>
    <component :is="rootElementType" v-bind="cardBindings">
        <div v-if="hasMediaSection" v-bind="mediaBindings">
            <slot name="media"/>
        </div>
        <component :is="mainBodyElementType" v-bind="mainBindings">
            <!-- For Expandable Cards, the Header is embedded in the BrightExpandable template -->
            <!-- TODO: In future versions of Vue, see if this can be refactored to be more DRY -->
            <template v-if="mainBodyElementType === 'BrightExpandable'" v-slot:header>
                <div v-if="hasLeftSection" v-bind="headerLeftBindings">
                    <slot name="left"/>
                </div>
                <div v-if="hasCenterSection || hasLabels" v-bind="headerCenterBindings">
                    <div v-if="hasLabels" v-bind="labelContainerBindings">
                        <component :is="labelElementType" v-bind="labelBindings" v-if="label">{{ label }}</component>
                        <div v-if="subLabel" v-bind="subLabelBindings">{{ subLabel }}</div>
                    </div>
                    <slot name="center"/>
                </div>
                <div v-if="hasRightSection && !showFooterOnBottom" v-bind="headerRightBindings">
                    <slot name="right"/>
                </div>
            </template>

            <!-- For Non-Expandable Cards, the Header is by itself. Yes, this is redundant. -->
            <div v-if="shouldRenderHeader" v-bind="headerBindings">
                <div v-if="hasLeftSection" v-bind="headerLeftBindings">
                    <slot name="left"/>
                </div>
                <div v-if="hasCenterSection || hasLabels" v-bind="headerCenterBindings">
                    <div v-if="hasLabels" v-bind="labelContainerBindings">
                        <component :is="labelElementType" v-bind="labelBindings" v-if="label">{{ label }}</component>
                        <div v-if="subLabel" v-bind="subLabelBindings">{{ subLabel }}</div>
                    </div>
                    <slot name="center"/>
                </div>
                <div v-if="hasRightSection && !showFooterOnBottom" v-bind="headerRightBindings">
                    <slot name="right"/>
                </div>
            </div>

            <!-- A Card will always have its Body (default slot) and Right Merge available -->
            <slot/>
            <div v-if="hasRightSection && showFooterOnBottom" v-bind="footerRightBindings">
                <slot name="right"/>
            </div>
        </component>
    </component>
</template>

<script>
import BrightExpandable from "Bright/components/core-library/expandable/BrightExpandable.vue";
const screenSizes = {
    tablet: '640px',
    landscape: '1024px',
    desktop: '1440px',
};
export default {
    name: "BrightCard",
    components: { BrightExpandable },
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
        label: {
            type: String,
            default: '',
            required: false,
        },
        subLabel: {
            type: String,
            default: '',
            required: false,
        },
        labelPosition: {
            type: String,
            default: 'left',
            required: false,
            validator(value) {
                return ['', 'left', 'center', 'right'].includes(value);
            },
        },
        labelElement: {
            type: String,
            default: '',
            required: false,
        },
        invertLabels: {
            type: Boolean,
            default: false,
            required: false,
        },
        bordered: {
            type: Boolean,
            default: true,
            required: false,
        },
        breakpointHeaderLeft: { // Determines when the Left section will be put on its own line.
            type: [String],
            default: 'never',
            required: false,
            validator(value) {
                return ['always', 'tablet', 'never'].includes(value);
            },
        },
        breakpointHeaderRight: { // Determines when the Right section will be merged with the Bottom section.
            type: [String],
            default: 'never',
            required: false,
            validator(value) {
                return ['always', 'tablet', 'never'].includes(value);
            },
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
        expandable: {
            type: Boolean,
            default: false,
            required: false,
        },
        expanded: {
            type: Boolean,
            default: false,
            required: false,
        },
        expandableHideArrow: {
            type: Boolean,
            default: false,
            required: false,
        },
        href: {
            type: String,
            default: '',
            required: false,
        },
        id: {
            type: String,
            default: '',
            required: false,
        },
        raised: {
            type: Boolean,
            default: false,
            required: false,
        },
        ribbon: {
            type: String,
            required: false,
            default: 'none',
            validator: function(value) {
                return ['none', 'grey', 'blue', 'pink', 'aqua', 'yellow', 'green', 'red', 'orange', 'purple', 'indigo'].includes(value);
            },
        },
        rounded: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    data() {
        return {
            currentWindowSize: window.innerWidth,
        };
    },
    computed: {
        rootElementType() {
            return this.href.length > 0 ? 'a' : 'div';
        },
        mainBodyElementType() {
            return this.expandable && this.href.length === 0 ? "BrightExpandable" : "div";
        },
        labelElementType() {
            return this.labelElement.length ? this.labelElement : "div";
        },
        cardBindings() {
            let cardBindingsObject = {
                class: {
                    'BrightCard': true,
                    'BrightCard__href': this.href,

                    'BrightCard__size--small': !this.hasMediaSection && this.size === 'small',
                    'BrightCard__size--medium': !this.hasMediaSection && (!this.size || this.size === 'medium'),
                    'BrightCard__size--large': !this.hasMediaSection && this.size === 'large',
                    'BrightCard__bordered': this.bordered === true,
                    'BrightCard__raised': this.raised === true,
                    'BrightCard__rounded': this.rounded === true,

                    'BrightCard__ribbon--grey': !this.hasMediaSection && this.ribbon === 'grey',
                    'BrightCard__ribbon--blue': !this.hasMediaSection && this.ribbon === 'blue',
                    'BrightCard__ribbon--pink': !this.hasMediaSection && this.ribbon === 'pink',
                    'BrightCard__ribbon--aqua': !this.hasMediaSection && this.ribbon === 'aqua',
                    'BrightCard__ribbon--yellow': !this.hasMediaSection && this.ribbon === 'yellow',
                    'BrightCard__ribbon--green': !this.hasMediaSection && this.ribbon === 'green',
                    'BrightCard__ribbon--red': !this.hasMediaSection && this.ribbon === 'red',
                    'BrightCard__ribbon--orange': !this.hasMediaSection && this.ribbon === 'orange',
                    'BrightCard__ribbon--purple': !this.hasMediaSection && this.ribbon === 'purple',
                    'BrightCard__ribbon--indigo': !this.hasMediaSection && this.ribbon === 'indigo',
                },
            };
            if (this.id) {
                cardBindingsObject.id = this.id;
            }
            if (this.href) {
                cardBindingsObject.href = this.href;
            }
            return cardBindingsObject;
        },
        mediaBindings() {
            return {
                class: {
                    'BrightCardMedia': true,
                    'BrightCardMedia__rounded': this.rounded,
                    'BrightCardMedia__bordered': this.bordered,
                },
            };
        },
        mainBindings() {
            let mainBindingObject = {
                class: {
                    'BrightCardMain': true,
                    'BrightCard__size--small': this.hasMediaSection && this.size === 'small',
                    'BrightCard__size--medium': this.hasMediaSection && (!this.size || this.size === 'medium'),
                    'BrightCard__size--large': this.hasMediaSection && this.size === 'large',
                },
            };
            if (this.expandable) {
                mainBindingObject.id = this.id;
                mainBindingObject.arrowSize = this.size;
                mainBindingObject.hideArrow = this.expandableHideArrow;
                mainBindingObject.expanded = this.expanded;
            }
            return mainBindingObject;
        },
        headerBindings() {
            return {
                class: {
                    'BrightCardHeader': true,
                    'BrightCardHeader__bottom-margin': this.hasBody,
                },
            };
        },
        headerLeftBindings() {
            return {
                class: {
                    'BrightCardHeaderLeft': true,
                    'BrightCardHeader--expandable': this.expandable,
                    'BrightCardHeaderLeft__margin block w-full': this.breakpointHeaderLeft === 'always',
                    'BrightCardHeaderLeft__margin block w-full tablet:inline-block tablet:w-auto': this.breakpointHeaderLeft === 'tablet',
                    'inline-block': this.breakpointHeaderLeft === 'never',
                },
            };
        },
        headerCenterBindings() {
            return {
                class: {
                    'BrightCardHeaderCenter': true,
                    'BrightCardHeader--expandable': this.expandable,
                    'BrightCardHeaderCenter__margin': this.hasRightSection && !this.showFooterOnBottom,
                },
            };
        },
        headerRightBindings() {
            return {
                class: {
                    'BrightCardHeaderRight': true,
                    'BrightCardHeader--expandable': this.expandable,
                    'hidden tablet:inline-block': this.breakpointHeaderRight === 'tablet',
                    'inline-block': this.breakpointHeaderRight === 'never',
                },
            };
        },
        showFooterOnBottom() {
            if (this.breakpointHeaderRight === 'always') {
                return true;
            } else if (this.breakpointHeaderRight === 'tablet' && this.currentWindowSize < parseInt(screenSizes.tablet)) {
                return true;
            }
            return false;
        },
        shouldHandleRightBreakpoint() {
            return this.breakpointHeaderRight !== 'never' && this.breakpointHeaderRight !== 'always';
        },
        footerRightBindings() {
            return {
                class: {
                    'BrightCardFooterRight': true,
                    'inline-block tablet:hidden': this.breakpointHeaderRight === 'tablet',
                    'hidden': this.breakpointHeaderRight === 'never',
                },
            };
        },
        labelContainerBindings() {
            return {
                class: {
                    'BrightCardLabelContainer': true,
                    'BrightCardLabelContainer__position--left': this.labelPosition === '' || this.labelPosition === 'left',
                    'BrightCardLabelContainer__position--center': this.labelPosition === 'center',
                    'BrightCardLabelContainer__position--right': this.labelPosition === 'right',
                },
            };
        },
        labelBindings() {
            return {
                id: this.id ? this.id + 'BrightCardLabel' : null,
                class: {
                    'BrightCardLabel': !this.labelElement.length || this.labelElement === 'div',
                    'BrightCardLabel__invert': this.invertLabels,

                    'BrightCardLabelElement': this.labelElement.length && this.labelElement !== 'div',
                    'BrightCardLabelElement__invert': this.labelElement.length && this.labelElement !== 'div' && this.invertLabels,
                },
            };
        },
        subLabelBindings() {
            return {
                class: {
                    'BrightCardSubLabel': true,
                    'BrightCardSubLabel__invert': this.invertLabels,
                    'order-first': this.invertLabels,
                },
            };
        },
        shouldRenderHeader() {
            return this.mainBodyElementType !== 'BrightExpandable' &&
                    (this.hasLeftSection || this.hasLabels || this.hasCenterSection || this.hasRightSection);
        },
        hasMediaSection() {
            return !!this.$slots.media;
        },
        hasLeftSection() {
            return !!this.$slots.left;
        },
        hasLabels() {
            return this.label.length > 0 || this.subLabel.length > 0;
        },
        hasCenterSection() {
            return !!this.$slots.center;
        },
        hasRightSection() {
            return !!this.$slots.right;
        },
        hasBody() {
            return !!this.$slots.default;
        },
    },
    watch: {
        breakpointHeaderRight: function(newValue) {
            window.removeEventListener('resize', this.resizeHandler);
            if (newValue !== 'never' && newValue !== 'always') {
                window.addEventListener('resize', this.resizeHandler);
            }
        },
    },
    mounted() {
        if (this.shouldHandleRightBreakpoint) {
            window.addEventListener('resize', this.resizeHandler);
        }
    },
    beforeUnmount() {
        if (this.shouldHandleRightBreakpoint) {
            window.removeEventListener('resize', this.resizeHandler);
        }
    },
    methods: {
        resizeHandler() {
            this.currentWindowSize = window.innerWidth;
        },
    },
};
</script>
