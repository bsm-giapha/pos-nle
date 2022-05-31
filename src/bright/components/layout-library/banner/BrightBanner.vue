<template>
    <BrightCard v-if="!hasBeenRemoved" v-bind="bannerBindings">
        <template v-slot:left>
            <BrightIcon class="BrightBannerIcon" :use="useIcon"/>
        </template>
        <template v-slot:center>
            <div><slot>{{ body }}</slot></div>
        </template>
        <template v-slot:right v-if="removable">
            <BrightIcon
                class="BrightBannerRemove"
                use="close"
                role="button"
                tabindex="0"
                aria-label="Dismiss Banner"
                @click="hasBeenRemoved = true"
                @keydown.space.enter.delete.prevent="hasBeenRemoved = true"
            />
        </template>
    </BrightCard>
</template>

<script>
import BrightCard from "Bright/components/layout-library/card/BrightCard.vue";
import BrightIcon from "Bright/components/core-library/icon/BrightIcon.vue";
export default {
    name: "BrightBanner",
    components: { BrightIcon, BrightCard },
    props: {
        type: {
            type: String,
            required: false,
            default: 'info',
            validator(value) {
                return ['info', 'error', 'warning', 'success'].includes(value);
            },
        },
        label: {
            type: String,
            required: false,
            default: '',
        },
        body: {
            type: String,
            required: false,
            default: '',
        },
        removable: {
            type: Boolean,
            required: false,
            default: false,
        },
        announcement: {
            type: Boolean,
            required: false,
            default: false,
        },
        bordered: {
            type: Boolean,
            required: false,
            default: true,
        },
        rounded: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            hasBeenRemoved: false,
        };
    },
    computed: {
        bannerBindings() {
            return {
                class: {
                    'BrightBanner': true,
                    'BrightBanner__announcement': this.announcement,
                    'BrightBanner__type--info': this.type === 'info',
                    'BrightBanner__type--error': this.type === 'error',
                    'BrightBanner__type--warning': this.type === 'warning',
                    'BrightBanner__type--success': this.type === 'success',
                },
                size: 'medium',
                raised: this.announcement,
                bordered: (this.announcement) ? false : this.bordered,
                rounded: (this.announcement) ? false : this.rounded,
                label: this.label,
                role: 'region',
                'aria-label': this.label,
            };
        },
        useIcon() {
            if (this.type === 'info') return 'info';
            if (this.type === 'error') return 'error';
            if (this.type === 'warning') return 'warning';
            if (this.type === 'success') return 'check_circle';
            return 'info';
        },
    },
};
</script>
