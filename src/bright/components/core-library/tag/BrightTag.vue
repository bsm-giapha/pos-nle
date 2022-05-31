<template>
    <component
        :is="getElement"
        v-bind="containerBindings"
        v-if="!hasBeenRemoved"
        @keydown.delete.prevent="handleRemoveEvent()"
        @click.prevent="handleUserInput()"
        @keydown.space.enter.prevent="handleUserInput()"
    >
        <div class="flex">
            <BrightIcon v-if="showIcon" v-bind="iconBindings"/><span v-if="showIcon">&nbsp;</span>
            <span v-if="showImagePlaceholder" :class="imagePlaceholderClassObject"></span>
            {{ displayedLabel }}
            <span
                v-if="removable"
                v-bind="iconContainerBindings"
                @click.stop="handleRemoveEvent"
                @keydown.enter.space.prevent.stop="handleRemoveEvent"
            >
                &nbsp;<BrightIcon use="close"/>
            </span>
        </div>
    </component>
</template>

<script>
import { SizeMixin } from "Bright/mixins/global/SizeMixin";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
export default {
    name: "BrightTag",
    components: { BrightIcon },
    mixins: [SizeMixin],
    inheritAttrs: true,
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
        boneless: { /* Alias for the normal `borderless` property. Just in case you wanted a boneless Tag */
            type: Boolean,
            default: false,
            required: false,
        },
        borderless: {
            type: Boolean,
            default: false,
            required: false,
        },
        label: {
            type: String,
            default: null,
            required: true,
        },
        color: {
            type: String,
            default: 'grey',
            required: false,
            validator: function(value) {
                return [
                    'grey',
                    'blue',
                    'aqua',
                    'pink',
                    'yellow',
                    'green',
                    'red',
                    'orange',
                    'purple',
                    'indigo',
                ].includes(value);
            },
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
        href: {
            type: String,
            default: null,
            required: false,
        },
        icon: {
            type: String,
            default: '',
            required: false,
        },
        imagePlaceholder: {
            type: Boolean,
            default: false,
            required: false,
        },
        isToggleTag: {
            type: Boolean,
            required: false,
            default: false,
        },
        removable: {
            type: Boolean,
            default: false,
            required: false,
        },
        removableElementId: {
            type: String,
            default: null,
            required: false,
        },
        rounded: {
            type: Boolean,
            default: false,
            required: false,
        },
        tabindex: {
            type: [Number, String],
            default: 0,
            required: false,
        },
        truncateAt: {
            type: [Number, String],
            default: -1,
            required: false,
        },
    },
    emits: ['update:modelValue', 'tag:remove'],
    data() {
        return {
            hasBeenRemoved: false,
            triggerRemoveAnimation: false,
            toggle: {
                active: this.active,
            },
        };
    },
    computed: {
        displayedLabel() {
            const text = this.label;
            const length = this.truncateAt;
            if (length > 0 && text.length > length) {
                return text.substring(0, length) + '…';
            } else {
                return text;
            }
        },
        getElement() {
            return (this.href) ? 'a' : 'span';
        },
        containerBindings() {
            let containerClassBindings = {
                class: this.tagClassObject,
                title: this.label,
                'aria-label': this.label,
                'aria-disabled': this.disabled,
                tabindex: this.tabindex,
            };

            if (this.href) {
                containerClassBindings.href = this.getHref;
            }

            if (this.isToggleTag) {
                containerClassBindings.role = 'button';
                containerClassBindings['tabindex'] = 0;
                containerClassBindings['aria-pressed'] = this.toggle.active ? 'true' : 'false';
            }

            return containerClassBindings;
        },
        iconContainerBindings() {
            return {
                id: this.removableElementId,
                class: this.removeIconClassObject,
                role: 'button',
                title: 'Remove ' + this.label,
                'aria-label': 'Remove ' + this.label,
                'aria-pressed': false,
                'aria-disabled': this.disabled,
                tabindex: this.tabindex,
            };
        },
        getHref() {
            if (this.href && !this.disabled) {
                return this.href;
            } else {
                return "javascript:void(0)";
            }
        },
        tagClassObject() {
            return {
                'BrightTag': true,

                'BrightTag__color--grey': this.color === 'grey',
                'BrightTag__color--blue': this.color === 'blue',
                'BrightTag__color--aqua': this.color === 'aqua',
                'BrightTag__color--pink': this.color === 'pink',
                'BrightTag__color--yellow': this.color === 'yellow',
                'BrightTag__color--green': this.color === 'green',
                'BrightTag__color--red': this.color === 'red',
                'BrightTag__color--orange': this.color === 'orange',
                'BrightTag__color--purple': this.color === 'purple',
                'BrightTag__color--indigo': this.color === 'indigo',

                'BrightTag__size--large': this.size === 'large',
                'BrightTag__size--medium': this.size === 'medium',
                'BrightTag__size--small': this.size === 'small',

                'BrightTag__borderless': this.borderless || this.boneless,

                'BrightTag__rounded': this.rounded,

                'BrightTag__active': this.isToggleTag && this.toggle.active,

                'BrightTag__disabled': this.disabled,
                'animate__animated animate__fadeIn': !this.triggerRemoveAnimation,
                'animate__animated animate__fadeOut': this.triggerRemoveAnimation,
            };
        },
        iconBindings() {
            return {
                use: this.icon,
                class: {
                    'BrightTagIcon flex self-center': true,

                    'BrightTagIcon__size--large': this.icon && this.size === 'large',
                    'BrightTagIcon__size--medium': this.icon && this.size === 'medium',
                    'BrightTagIcon__size--small': this.icon && this.size === 'small',

                    'cursor-not-allowed': this.icon && this.disabled,
                },
            };
        },
        imagePlaceholderClassObject() {
            return {
                'BrightTagImagePlaceholder flex self-center': true,
            };
        },
        removeIconClassObject() {
            return {
                'BrightTagRemoveIcon flex items-center': true,
            };
        },
        showIcon() {
            return this.icon;
        },
        showImagePlaceholder() {
            return this.imagePlaceholder && !this.icon;
        },
    },
    methods: {
        handleUserInput() {
            if (!this.disabled && this.isToggleTag) {
                this.toggle.active = !this.toggle.active;
                this.$emit('update:modelValue', this.toggle.active);
            }
        },
        handleRemoveEvent() {
            if (!this.disabled && this.removable && (!this.hasBeenRemoved || !this.triggerRemoveAnimation)) {
                this.triggerRemoveAnimation = true;
                this.$el.addEventListener('animationend', this.emitTagRemoveEvent);
            }
        },
        emitTagRemoveEvent() {
            this.hasBeenRemoved = true;
            this.$emit('tag:remove', this.label);
            this.$el.removeEventListener('animationend', this.emitTagRemoveEvent);
        },
    },
};
</script>

<style scoped>

</style>
