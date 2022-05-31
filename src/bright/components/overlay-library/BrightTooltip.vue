<template>
    <BasePopper
        ref="basePopper"
        use="tooltip"
        @tooltip:keydown-opened="handleKeydownOpened"
        @tooltip:keydown-closed="handleKeydownClosed"
    >
        <template v-slot:tooltip>
            <div>
                <div :class="tooltipClassObject">{{ title }}</div>
                <div>{{ text }}</div>
            </div>
        </template>
        <slot/>
    </BasePopper>
</template>

<script>
import BasePopper from "./base/BasePopper.vue";

export default {
    name: "BrightTooltip",
    components: {
        BasePopper,
    },
    inheritAttrs: true,
    props: {
        title: {
            type: String,
            required: false,
            default: '',
        },
        text: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        tooltipClassObject() {
            return {
                'BrightTooltip__card--title': this.title !== '',
            };
        },
    },
    mounted() {
        const sourceElement = this.$refs.basePopper.$refs.sourceElement.firstElementChild;
        sourceElement.addEventListener('focus', () => {
            this.openPopperKeyDown();
        });
        sourceElement.addEventListener('focusout', () => {
            this.closePopperKeyDown();
        });
    },
    beforeUnmount() {
        const sourceElement = this.$refs.basePopper.$refs.sourceElement.firstElementChild;
        sourceElement.removeEventListener('focus', () => {
            this.openPopperKeyDown();
        });
        sourceElement.removeEventListener('focusout', () => {
            this.closePopperKeyDown();
        });
    },
    methods: {
        openPopperKeyDown() {
            this.$refs.basePopper.openPopperKeyDown();
        },
        closePopperKeyDown() {
            this.$refs.basePopper.closePopperKeyDown();
        },
        handleKeydownOpened() {
            const sourceElement = this.$refs.basePopper.$refs.sourceElement;
            sourceElement.focus();
        },
        handleKeydownClosed($event) {
            const keyException = ($event && $event.keyException) ?? null;
            const sourceElement = this.$refs.basePopper.$refs.sourceElement;

            if (sourceElement !== undefined) {
                if (keyException === null) {
                    // Removes focus from source element when tabbing to other elements.
                    sourceElement.blur();
                } else {
                    // Maintains focus on source element when toggling the Escape key.
                    sourceElement.focus();
                }
            }
        },
    },
};
</script>

<style scoped>

</style>
