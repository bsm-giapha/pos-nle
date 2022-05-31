<template>
    <div class="FormAddSuccessButtonGroup">
        <BrightButton
            class="block mx-auto mb-8 tablet:w-auto tablet:inline-block tablet:mr-8"
            style="width: 180px;"
            use="primary"
            @click="handleViewNewResource"
            @keydown.space.enter.prevent="handleViewNewResource"
        >
            View {{ singularResourceLabel }}
        </BrightButton>
        <BrightButton
            class="block mx-auto mb-8 tablet:w-auto tablet:inline-block tablet:mr-8"
            style="width: 180px;"
            use="secondary"
            @click="handleViewAllResources"
            @keydown.space.enter.prevent="handleViewAllResources"
        >
            View All {{ pluralResourceLabel }}
        </BrightButton>
        <BrightButton
            icon="add"
            class="block mx-auto tablet:inline-block tablet:w-auto"
            use="tertiary"
            @click="handleCreateNewResource"
            @keydown.space.enter.prevent="handleCreateNewResource"
        >
            Create Another {{ singularResourceLabel }}
        </BrightButton>
    </div>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";

/**
 * A lot of Add Success pages have 3 buttons that give the User the option to:
 *      - View the newly created resource (View Branch)
 *      - View all resources (e.g. View All Branches)
 *      - Create another resource (Create Another Branch)
 */
export default {
    name: "BaseFormAddSuccessButtonGroup",
    components: { BrightButton },
    props: {
        /**
         * The singular label for the Form's resource.
         * For example, if you were making an Add Success Page for Branches, then you would pass 'Branch' here.
         */
        singularResourceLabel: {
            type: String,
            required: true,
        },

        /**
         * The plural label for the Form's resource.
         * For example, if you were making an Add Success Page for Branches, then you would pass 'Branches' here.
         */
        pluralResourceLabel: {
            type: String,
            required: true,
        },

        /**
         * Can be obtained from the
         */
        handleViewNewResource: {
            type: Function,
            required: true,
        },

        handleViewAllResources: {
            type: Function,
            required: true,
        },

        handleCreateNewResource: {
            type: Function,
            required: true,
        },
    },
};
</script>
