<template>
    <div class="AppPagePadding text-center">
        <div class="__typography--heading--2 text-grey-800 mb-16">
            <BrightIcon use="check_circle" class="text-green-500" style="font-size: 48px"/>
            <span class="align-middle">{{ header }}</span>
        </div>
        <div v-if="subHeader" class="__typography--body--m text-grey-700 mb-32">
            <div>{{ subHeader }}</div>
        </div>
        <BrightCard
            v-if="cardLabel"
            class="inline-block mb-40"
            :label="cardLabel"
            :sub-label="cardSubLabel"
            size="small"
            :bordered="false"
            raised
        >
            <template v-slot:left>
                <BrightAvatar
                    class="mt-4"
                    :name="cardLabel"
                    color="green"
                    light
                />
            </template>
        </BrightCard>
        <BaseFormAddSuccessButtonGroup v-bind="bindButtons" :singular-resource-label="singularResourceLabel" :plural-resource-label="pluralResourceLabel"/>
    </div>
</template>

<script>
import BaseFormAddSuccessButtonGroup from "@/components/form/base/BaseFormAddSuccessButtonGroup.vue";
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar.vue";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
export default {
    name: "FormAddSuccessPage",
    components: { BrightIcon, BrightAvatar, BrightCard, BaseFormAddSuccessButtonGroup },
    props: {
        header: {
            type: String,
            required: true,
        },
        subHeader: {
            type: String,
            required: false,
            default: '',
        },
        bindButtons: {
            type: Object,
            required: true,
        },
        singularResourceLabel: {
            type: String,
            required: true,
        },
        pluralResourceLabel: {
            type: String,
            required: true,
        },
        cardLabel: {
            type: String,
            required: false,
            default: '',
        },
        cardSubLabel: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>
