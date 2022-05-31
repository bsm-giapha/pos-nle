<template>
    <div v-bind="overlayBindings" tabindex="-1" @mousedown.self="handleModalClose">
        <BrightCard
            v-if="simple"
            ref="modal"
            v-bind="simpleModalBindings"
            class="p-0"
            style="width: 244px; max-width: 244px;"
            :bordered="false"
            @keydown="handleKeyDown"
        >
            <slot></slot>
        </BrightCard>
        <BrightCard
            v-else
            ref="modal"
            v-bind="modalBindings"
            @keydown="handleKeyDown"
        >
            <!-- Modals have the same slots as Cards -->
            <template v-slot:media>
                <slot name="media"></slot>
            </template>
            <template v-slot:left>
                <slot name="left"></slot>
            </template>
            <template v-slot:center>
                <slot name="center"></slot>
            </template>
            <template v-slot:right>
                <slot name="right"></slot>
            </template>

            <div :id="id + 'ModalBody'" class="BaseModalBody">
                <slot></slot>
            </div>

            <div class="BaseModalFooter">
                <slot name="footer">
                    <BrightButton
                        :use="closeButtonType"
                        full-width
                        @click="handleModalClose()"
                        @keydown.enter.space.prevent="handleModalClose($event)"
                    >
                        {{ closeLabel }}
                    </BrightButton>
                </slot>
            </div>
        </BrightCard>
    </div>
</template>

<script>
import BrightCard from "Bright/components/layout-library/card/BrightCard.vue";
import BrightButton from "Bright/components/core-library/button/BrightButton.vue";
import { ModalMixin } from "Bright/mixins/modal/ModalMixin";
import { MobileMixin } from "Bright/mixins/global/MobileMixin";

export default {
    name: "BrightModalPopout",
    components: { BrightCard, BrightButton },
    mixins: [ModalMixin, MobileMixin],
    inheritAttrs: false,
    props: {
        from: {
            type: String,
            required: false,
            default: 'right',
            validator: function(value) {
                return ['left', 'right'].includes(value);
            },
        },
        disableMobileBreakpoint: {
            type: Boolean,
            required: false,
            default: false,
        },
        simple: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        modalBindings() {
            return {
                ...{
                    class: {
                        'BaseModal BrightModalPopout': true,

                        'BaseModal__width--large': this.width === 'large',
                        'BaseModal__width--medium': (this.width !== 'large' && this.width !== 'small'),
                        'BaseModal__width--small': this.width === 'small',

                        //Slide direction from left
                        'BrightModalPopout__from--left': !this.isMobile && this.from === 'left',
                        'BrightModalPopout__from--left--mobile': this.isMobile && this.disableMobileBreakpoint && this.from === 'left',
                        'animation__modal--slide-in-from-left': this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && this.from === 'left',
                        'animation__modal--slide-out-to-left': !this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && this.from === 'left',

                        //Slide direction from right
                        'BrightModalPopout__from--right': !this.isMobile && this.from === 'right',
                        'BrightModalPopout__from--right--mobile': this.isMobile && this.disableMobileBreakpoint && this.from === 'right',
                        'animation__modal--slide-in-from-right': this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && (this.from === '' || this.from === 'right'),
                        'animation__modal--slide-out-to-right': !this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && (this.from === '' || this.from === 'right'),

                        //Slide direction from bottom
                        'BrightModalPopout__from--bottom': this.isMobile && !this.disableMobileBreakpoint,
                        'animation__modal--slide-in-from-bottom': this.isBeingShown && this.isMobile && !this.disableMobileBreakpoint,
                        'animation__modal--slide-out-to-bottom': !this.isBeingShown && this.isMobile && !this.disableMobileBreakpoint,
                    },
                    id: this.id,
                    label: this.label,
                    subLabel: this.subLabel,
                    invertLabels: this.invertLabels,
                    breakpointHeaderLeft: this.breakpointHeaderLeft,
                    breakpointHeaderRight: this.breakpointHeaderRight,
                    bordered: false,
                    role: 'dialog',
                    'aria-labelledby': this.label ? this.id + 'BrightCardLabel' : null,
                    'aria-label': this.label === '' ? this.id + ' modal' : null,
                    'aria-modal': this.isBeingShown,
                    'aria-describedby': this.subLabel ?? null,
                },
                ...this.$attrs,
            };
        },
        simpleModalBindings() {
            return {
                ...{
                    class: {
                        'BaseModal BrightModalPopout': true,

                        //Slide direction from left
                        'BrightModalPopout__from--left': !this.isMobile && this.from === 'left',
                        'BrightModalPopout__from--left--mobile': this.isMobile && this.disableMobileBreakpoint && this.from === 'left',
                        'animation__modal--slide-in-from-left': this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && this.from === 'left',
                        'animation__modal--slide-out-to-left': !this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && this.from === 'left',

                        //Slide direction from right
                        'BrightModalPopout__from--right': !this.isMobile && this.from === 'right',
                        'BrightModalPopout__from--right--mobile': this.isMobile && this.disableMobileBreakpoint && this.from === 'right',
                        'animation__modal--slide-in-from-right': this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && (this.from === '' || this.from === 'right'),
                        'animation__modal--slide-out-to-right': !this.isBeingShown && (!this.isMobile || this.disableMobileBreakpoint) && (this.from === '' || this.from === 'right'),

                        //Slide direction from bottom
                        'BrightModalPopout__from--bottom': this.isMobile && !this.disableMobileBreakpoint,
                        'animation__modal--slide-in-from-bottom': this.isBeingShown && this.isMobile && !this.disableMobileBreakpoint,
                        'animation__modal--slide-out-to-bottom': !this.isBeingShown && this.isMobile && !this.disableMobileBreakpoint,
                    },
                    id: this.id,
                    role: 'dialog',
                    'aria-modal': this.isBeingShown,
                },
                ...this.$attrs,
            };
        },
    },
};
</script>

