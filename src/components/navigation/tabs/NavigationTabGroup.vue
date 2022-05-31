<template>
    <div class="NavigationTabGroup mt-0 -ml-8">
        <SmartLink
            v-for="tab in tabs"
            :key="tab.label"
            v-bind="tab"
            class="NavigationTabGroup__Tab"
        >
            {{ tab.label }}
        </SmartLink>
    </div>
</template>

<script>
import SmartLink from "../SmartLink.vue";
export default {
    name: "NavigationTabGroup",
    components: { SmartLink },
    props: {
        tabs: {
            type: Array,
            default() {
                return [];
            },
            required: false,
        },
    },
};
</script>
