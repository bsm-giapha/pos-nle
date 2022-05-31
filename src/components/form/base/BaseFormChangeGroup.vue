<template>
    <div class="BaseFormChangeGroup" v-bind="sectionBinding">
        <div class="BaseFormChangeGroup__Label">{{ label }}</div>
        <BaseFormChangeContainer :changes="displayedChildren" :is-edit-form="isEditForm" @undo="$emit('undo', $event)"/>
        <BrightButton
            v-if="numberOfChildrenNotShown > 0 || showAllChildren"
            use="tertiary"
            size="small"
            @click="showAllChildren = !showAllChildren"
        >
            {{ (showAllChildren) ? 'Show less' : `Show ${numberOfChildrenNotShown} more` }}
        </BrightButton>
    </div>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
import { defineAsyncComponent } from "vue";
export default {
    name: "BaseFormChangeGroup",
    components: {
        BaseFormChangeContainer: defineAsyncComponent(() => import('@/components/form/base/BaseFormChangeContainer.vue')), // This is how you do a recursive component
        BrightButton,
    },
    props: {
        label: {
            type: String,
            required: true,
            default: '',
        },
        depth: {
            type: Number,
            required: true,
            default: 1,
        },
        children: {
            type: Object,
            required: true,
            default: () => {},
        },
        isEditForm: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['undo'],
    data() {
        return {
            showAllChildren: false,
        };
    },
    computed: {
        sectionBinding() {
            return {
                class: {
                    'FormRecentChange__Section': true,
                    'FormRecentChange__Section--primary': this.depth === 1,
                    'FormRecentChange__Section--secondary': this.depth === 2,
                    'FormRecentChange__Section--tertiary': this.depth > 2,
                },
                style: `padding-left: ${16 * (this.depth)}px`,
            };
        },
        displayedChildren() {
            if (this.showAllChildren) { return this.children; }

            const allAvailableChildrenKeys = Object.keys(this.children);
            const limiter = (allAvailableChildrenKeys.length < 5) ? allAvailableChildrenKeys.length : 5;
            let displayedChildren = {};

            for (let x = 0; x < limiter; x++) {
                let key = allAvailableChildrenKeys[x];
                displayedChildren[key] = this.children[key];
            }

            return displayedChildren;
        },
        numberOfChildrenNotShown() {
            return Object.keys(this.children).length - Object.keys(this.displayedChildren).length;
        },
    },
};
</script>
