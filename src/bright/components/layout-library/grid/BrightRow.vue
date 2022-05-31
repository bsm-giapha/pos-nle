<template>
    <div
        v-if="containsValidSlotComponents"
        ref="row"
        :class="classObject"
    >
        <slot/>
    </div>
</template>

<script>
import { BrightGridSlotValidationMixin } from "./mixins/BrightGridSlotValidationMixin";
import { MobileMixin } from "Bright/mixins/global/MobileMixin";

export default {
    name: "BrightRow",
    mixins: [BrightGridSlotValidationMixin, MobileMixin],
    props: {
        gutters: {
            type: String,
            default: 'medium',
            required: false,
            validator: function(value) {
                return ['small', 'medium', 'large', 'none'].includes(value);
            },
        },
        alignItems: {
            type: String,
            default: null,
            required: false,
            validator: function(value) {
                return ['stretch', 'start', 'center', 'end', 'baseline'].includes(value);
            },
        },
    },
    computed: {
        classObject: function() {
            return {
                'BrightRow': true,
                'BrightRow__align-items--stretch': this.alignItems === 'stretch',
                'BrightRow__align-items--start': this.alignItems === 'start',
                'BrightRow__align-items--center': this.alignItems === 'center',
                'BrightRow__align-items--end': this.alignItems === 'end',
                'BrightRow__align-items--baseline': this.alignItems === 'baseline',
                'BrightRow__gutters--small': this.gutters === 'small',
                'BrightRow__gutters--medium': !this.gutters || this.gutters === 'medium',
                'BrightRow__gutters--large': this.gutters === 'large',
            };
        },
    },
    mounted() {
        this.validateSlotComponents('BrightRow', 'BrightColumn');
    },
};
</script>
