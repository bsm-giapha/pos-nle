<template>
    <div class="FormRecentChange" :style="styleBinding">
        <div
            class="FormRecentChange__IconBubble"
            tabindex="0"
            role="button"
            :aria-label="'Scroll to and focus on ' + label + ' field.'"
            @click="handleFind"
            @keydown.space.enter.prevent="handleFind"
        >
            <div :class="bubbleClassBinding">
                <BrightIcon :use="iconType" class="FormRecentChange__IconBubble__Icon"/>
            </div>
        </div>
        <div class="FormRecentChange__Summary">
            <div :class="summaryTypeClassBinding">{{ (validationError && from === to) || !isEditForm ? 'Error' : iconType }}</div>
            <div class="FormRecentChange__Summary__Label">{{ label }}</div>
            <div v-if="(from || to) && from !== to" class="FormRecentChange__Summary__Diff">
                <span v-if="from.length > 0">{{ from }} <BrightIcon v-if="to.length > 0" use="arrow_forward"/></span>
                {{ to }}
            </div>
            <div v-if="validationError" class="FormRecentChange__Summary__Error">
                <BrightIcon use="cancel"/>
                {{ validationError }}
            </div>
        </div>
        <div v-if="inputId.length > 0 && focusId.length > 0" class="FormRecentChange__Actions">
            <BrightButton
                class="ml-48"
                use="tertiary"
                variant="alternative"
                rounded
                icon="find_in_page"
                size="small"
                icon-position="prefix"
                :aria-label="`Find ${label}.`"
                @click="handleFind"
                @keydown.space.enter.prevent="handleFind"
            >
                Find
            </BrightButton>
            <BrightButton
                v-if="isEditForm"
                use="tertiary"
                variant="alternative"
                rounded
                icon="undo"
                size="small"
                icon-position="prefix"
                :aria-label="`Undo changes to ${label}.`"
                @click="handleUndo"
                @keydown.space.enter.prevent="handleUndo"
            >
                Undo
            </BrightButton>
        </div>
    </div>
</template>

<script>
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon.vue";
import BrightButton from "@/bright/components/core-library/button/BrightButton.vue";

export default {
    name: "BaseFormChangeInput",
    components: {
        BrightIcon,
        BrightButton,
    },
    props: {
        type: {
            type: String,
            default: 'edit',
            required: true,
            validator(value) {
                return ['edit', 'add', 'delete', 'priority_high'].indexOf(value) !== -1;
            },
        },
        label: {
            type: String,
            default: '',
            required: true,
        },
        inputId: {
            type: String,
            default: '',
            required: false,
        },
        namedRoute: {
            type: String,
            default: '',
            required: false,
        },
        formDataNesting: {
            type: String,
            default: '',
            required: false,
        },
        depth: {
            type: Number,
            default: 1,
            required: false, // It's required if you want it to look good
        },
        isSection: {
            type: Boolean,
            default: false,
            required: false,
        },
        focusId: {
            type: String,
            default: '',
            required: false,
        },
        from: {
            type: String,
            default: '',
            required: false,
        },
        to: {
            type: String,
            default: '',
            required: true,
        },
        validationError: {
            type: String,
            default: '',
            required: false,
        },
        isEditForm: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['undo'],
    computed: {
        iconType() {
            return this.validationError && this.from === this.to ? 'priority_high' : this.type;
        },
        bubbleClassBinding() {
            return {
                'FormRecentChange__IconBubble__Bubble': true,
                'FormRecentChange__IconBubble__Bubble--edit': this.iconType === 'edit',
                'FormRecentChange__IconBubble__Bubble--add': this.iconType === 'add',
                'FormRecentChange__IconBubble__Bubble--delete': this.iconType === 'delete' || this.iconType === 'priority_high',
            };
        },
        summaryTypeClassBinding() {
            return {
                'FormRecentChange__Summary__Type': true,
                'FormRecentChange__Summary__Type--edit': this.iconType === 'edit',
                'FormRecentChange__Summary__Type--add': this.iconType === 'add',
                'FormRecentChange__Summary__Type--delete': this.iconType === 'delete' || this.iconType === 'priority_high',
            };
        },
        sectionBinding() {
            return {
                class: {
                    'FormRecentChange__Section': true,
                    'FormRecentChange__Section--primary': this.depth === 1,
                    'FormRecentChange__Section--secondary': this.depth === 2,
                    'FormRecentChange__Section--tertiary': this.depth > 2,
                },
                style: this.styleBinding,
            };
        },
        styleBinding() {
            return `margin-left: ${16 * (!this.isSection)}px`;
        },
    },
    methods: {
        handleFind() {
            if (this.focusId.length > 0) {
                const elementToFocus = document.getElementById(this.focusId);
                if (elementToFocus) {
                    elementToFocus.scrollIntoView({ behavior: 'smooth' });
                    elementToFocus.focus();
                } else if (this.namedRoute.length > 0) {
                    this.$router.push({ name: this.namedRoute }).then(() => {
                        this.$nextTick(() => {
                            const elementToFocus = document.getElementById(this.focusId);
                            if (elementToFocus) {
                                elementToFocus.scrollIntoView({ behavior: 'smooth' });
                                elementToFocus.focus();
                            }
                        });
                    });
                }
            }
        },
        handleUndo() {
            if (this.formDataNesting.length > 0) {
                this.$emit('undo', this.formDataNesting);
            }
        },
    },
};
</script>
