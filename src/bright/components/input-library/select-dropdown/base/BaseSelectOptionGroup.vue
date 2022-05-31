<template>
    <div>
        <span :class="selectOptionGroupClassObject">{{ label }}</span>
        <slot></slot>
    </div>

</template>

<script>
import { SizeMixin } from "Bright/mixins/global/SizeMixin";
export default {
    name: "BaseSelectOptionGroup",
    mixins: [SizeMixin],
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            required: true,
            default: '',
        },
    },
    computed: {
        selectOptionGroupClassObject() {
            return {
                'BaseSelectOptionGroup': true,
            };
        },
    },
};
</script>

<style scoped>

</style>
