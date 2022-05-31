<template>
    <div v-bind="overlayBindings" tabindex="-1" @mousedown.self="handleModalClose()">
        <BrightCard ref="modal" v-bind="modalBindings" @keydown="handleKeyDown">
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
    name: "BrightModalPopup",
    components: { BrightCard, BrightButton },
    mixins: [ModalMixin, MobileMixin],
    inheritAttrs: false,
    computed: {
        modalBindings() {
            return {
                ...{
                    class: {
                        'BaseModal BrightModalPopup': true,
                        'BrightModalPopup__mobile': this.isMobile,

                        'BaseModal__width--large': this.width === 'large',
                        'BaseModal__width--medium': (this.width !== 'large' && this.width !== 'small'),
                        'BaseModal__width--small': this.width === 'small',

                        'animation__modal--zoom-in': this.isBeingShown,
                        'animation__modal--zoom-out': !this.isBeingShown,
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
    },
};
</script>
