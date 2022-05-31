<template>
    <BrightDropdownSelect
        ref="input"
        v-bind="dropdownSelectBindings"
        @update:modelValue="handleInput"
    />
</template>

<script>
import States from './helper/states';
import BrightDropdownSelect from "Bright/components/input-library/select-dropdown/BrightDropdownSelect.vue";
import { BrightDropdownCommonPropsMixin } from "Bright/mixins/inputs/BrightDropdownCommonPropsMixin";
import { BrightInputMixin } from "Bright/mixins/inputs/BrightInputMixin";

export default {
    name: 'BrightInputState',
    components: { BrightDropdownSelect },
    mixins: [BrightInputMixin, BrightDropdownCommonPropsMixin],
    inheritAttrs: true,
    props: {
        modelValue: {
            type: [String, Array],
            required: false,
            default: '',
        },
        /**
         * Overridden from BrightDropdownCommonPropsMixin:
         */
        label: {
            type: String,
            default: 'State',
            required: false,
        },
        searchable: {
            type: Boolean,
            required: false,
            default: true,
        },

        /**
         * Unique to BrightInputState:
         */
        states: {
            type: Array,
            default: null,
            required: false,
        },
        includeTerritories: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        dropdownSelectBindings() {
            return {
                ...this.$props,
                id: this.id,
                options: this.computedOptions,
            };
        },
        computedOptions() {
            if (this.states) {
                return this.states.map((abbreviation => {
                    return this.allStatesAndTerritories.find(entry => entry.value === abbreviation);
                }));
            }
            if (this.includeTerritories) {
                return this.allStatesAndTerritories;
            }
            return this.allStates;
        },
        allStates() {
            return States.getStates().map((entry) => {
                return {
                    value: entry.abbreviation,
                    label: entry.name,
                    searchTags: [entry.abbreviation],
                };
            });
        },
        allStatesAndTerritories() {
            return States.getStatesAndTerritories().map((entry) => {
                return {
                    value: entry.abbreviation,
                    label: entry.name,
                    searchTags: [entry.abbreviation],
                };
            });
        },
    },
    methods: {
        handleInput(input) {
            this.$emit('update:modelValue', input);
        },
    },
};
</script>

<style scoped>

</style>
