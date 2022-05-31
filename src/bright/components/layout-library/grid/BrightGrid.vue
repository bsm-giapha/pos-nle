<template>
    <div v-if="containsValidSlotComponents" :class="classObject">
        <slot/>
    </div>
</template>

<script>
import { BrightGridSlotValidationMixin } from "./mixins/BrightGridSlotValidationMixin";

export default {
    name: "BrightGrid",
    mixins: [BrightGridSlotValidationMixin],
    inheritAttrs: true,
    props: {
        guttersVertical: {
            type: String,
            default: 'medium',
            required: false,
            validator: function (value) {
                return ['small', 'medium', 'large', 'none'].includes(value);
            },
        },
    },
    computed: {
        classObject: function() {
            return {
                'BrightGrid': true,
                'BrightGrid__gutters-vertical--small': this.guttersVertical === "small",
                'BrightGrid__gutters-vertical--medium': !this.guttersVertical || this.guttersVertical === "medium",
                'BrightGrid__gutters-vertical--large': this.guttersVertical === "large",
                'BrightGrid__gutters-vertical--none': this.guttersVertical === "none",
            };
        },
    },
    mounted() {
        this.validateSlotComponents('BrightGrid', 'BrightRow');
    },
};
</script>
