<template>
    <div class="BaseFormChangeContainer">
        <div v-for="(change, key) in displayedChanges" :key="key">
            <BaseFormChangeGroup
                v-if="'isSection' in change && change.isSection"
                :label="change.label"
                :depth="change.depth"
                :children="change.children"
                :is-edit-form="isEditForm"
                @undo="$emit('undo', $event)"
            />
            <BaseFormChangeInput
                v-else
                :type="change.type"
                :label="change.label"
                :from="change.from"
                :to="change.to"
                :input-id="change.inputId"
                :focus-id="change.focusId"
                :named-route="change.namedRoute"
                :form-data-nesting="change.formDataNesting"
                :depth="change.depth"
                :validation-error="change.validationError"
                :is-edit-form="isEditForm"
                @undo="$emit('undo', $event)"
            />
        </div>
        <BrightButton
            v-if="numberOfChangesNotShown > 0 || showAllChanges"
            use="tertiary"
            size="small"
            @click="showAllChanges = !showAllChanges"
        >
            {{ (showAllChanges) ? 'Show less' : `Show ${numberOfChangesNotShown} more` }}
        </BrightButton>
    </div>
</template>

<script>
import BaseFormChangeGroup from "@/components/form/base/BaseFormChangeGroup.vue";
import BaseFormChangeInput from "@/components/form/base/BaseFormChangeInput.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";
export default {
    name: "BaseFormChangeContainer",
    components: {
        BrightButton,
        BaseFormChangeInput,
        BaseFormChangeGroup,
    },
    props: {
        isEditForm: {
            type: Boolean,
            required: true,
        },
        changes: {
            type: Object,
            required: false,
            default: () => {},
        },
    },
    emits: ['undo'],
    data() {
        return {
            showAllChanges: false,
        };
    },
    computed: {
        displayedChanges() {
            if (this.showAllChanges) {
                return this.changes;
            } else {
                const limiter = (Object.keys(this.changes).length < 5) ? Object.keys(this.changes).length : 5;
                const allAvailableChangesKeys = Object.keys(this.changes);
                let displayedChanges = {};

                for (let x = 0; x < limiter; x++) {
                    let key = allAvailableChangesKeys[x];
                    displayedChanges[key] = this.changes[key];
                }

                return displayedChanges;
            }
        },
        numberOfChangesNotShown() {
            return Object.keys(this.changes).length - Object.keys(this.displayedChanges).length;
        },
    },
};
</script>
