<template>
    <fieldset class="FormPanel">
        <div class="FormPanel__Left">
            <legend class="FormPanel__Left__Label">{{ label }}</legend>
            <p class="FormPanel__Left__SubLabel">{{ subLabel }}<slot name="sub-label"></slot></p>
            <BrightDivider class="landscape:hidden mt-16 mb-24"/>
        </div>
        <div class="FormPanel__Right">
            <slot></slot>
        </div>
    </fieldset>
</template>

<script>
import BrightDivider from "../../bright/components/layout-library/divider/BrightDivider.vue";
export default {
    name: "FormPanel",
    components: { BrightDivider },
    props: {
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
    },
};
</script>
