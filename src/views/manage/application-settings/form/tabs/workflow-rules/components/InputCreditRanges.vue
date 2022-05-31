<template>
    <div>
        <BrightButton
            use="secondary"
            class="mb-16"
            @click="showRestoreDefaultsModal = true"
            @keydown.space.enter.prevent="showRestoreDefaultsModal = true"
        >
            Restore Defaults
        </BrightButton>
        <BrightModalPopup
            id="restoreCreditRangeDefaults"
            close-focus-i-d="restoreDefaultButton"
            :label="restoreDefaultsLabel"
            :show="showRestoreDefaultsModal"
            @closed="closePopup"
        >
            <BrightGrid>
                <BrightRow>
                    <BrightColumn>
                        <div class="text-center">
                            <div v-show="!isRestoringDefaults && !isDefaultsRestored && !didRestoreDefaultsFail">
                                Credit Ranges Defaults will be restored.
                            </div>
                            <div v-show="isDefaultsRestored">Credit Range Defaults has been successfully restored.</div>
                            <div v-show="didRestoreDefaultsFail">There was an issue restoring Credit Range Defaults.  Please contact customer support.</div>
                        </div>
                    </BrightColumn>
                </BrightRow>
                <BrightRow gutters="none">
                    <BrightColumn class="test-center">
                        <BrightLoader :is-loading="isRestoringDefaults"/>
                        <BrightIcon v-show="isDefaultsRestored" class="text-h1 text-green-500" use="check_circle"/>
                        <BrightIcon v-show="didRestoreDefaultsFail" class="text-h1 text-yellow-500" use="report_problem"/>
                        <BrightButton
                            v-show="!isRestoringDefaults && !isDefaultsRestored && !didRestoreDefaultsFail"
                            class="mt-16 -mb-8"
                            full-width
                            use="secondary"
                            @click="handleRestoreDefaults"
                            @keydown.space.enter="handleRestoreDefaults"
                        >
                            Restore Defaults
                        </BrightButton>
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </BrightModalPopup>

        <BrightInputList
            v-bind="inputListBindings"
            @add="showAddForm"
            @add-popover-close="hideForm()"
            @remove="handleRemove"
        >
            <template v-slot:primary-label="item">
                <span>{{ item.displayText }}</span>
            </template>
            <template v-slot:secondary-label="item">
                {{ item.ficoTarget }}
            </template>
            <template v-slot:add-popover-form>
                <div style="width: 300px">
                    <div class="__typography--heading--6 mb-8">Add Credit Range</div>
                    <BrightInputText
                        id="creditRangeDisplayText"
                        v-model="creditRangeFormData.displayText"
                        label="Display Text"
                    />
                    <BrightInputNumber
                        id="creditRangeFicoTarget"
                        v-model="creditRangeFormData.ficoTarget"
                        label="FICO Target"
                    />
                    <BrightButton
                        use="primary"
                        :disabled="!creditRangeFormData.displayText || !creditRangeFormData.ficoTarget"
                        full-width
                        @click="handleAdd"
                        @keydown.space.enter.prevent="handleAdd"
                    >
                        Add
                    </BrightButton>
                </div>
            </template>
        </BrightInputList>
    </div>
</template>
<script>
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";
import axios from "axios";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "InputCreditRanges",
    mixins: [FormDescendantInputListMixin],
    data() {
        return {
            creditRangeFormData: {
                displayText: '',
                ficoTarget: '',
            },
            showRestoreDefaultsModal: false,
            isRestoringDefaults: false,
            isDefaultsRestored: false,
            didRestoreDefaultsFail: false,
        };
    },
    computed: {
        resourceURL() {
            return `${this.ancestorApiResourceUrl}/restore-credit-range-defaults`;
        },
        inputListBindings() {
            return {
                ...this.formPopoverBindings,
                hideLabel: true,
                sortOptions: [
                    { value: 'asc', label: 'Numerical (Smallest to Largest)', sort: this.sortFicoAscending },
                    { value: 'desc', label: 'Numerical (Largest to Smallest)', sort: this.sortFicoDescending },
                ],
            };
        },
        restoreDefaultsLabel() {
            if (this.isRestoringDefaults) {
                return 'Restoring Credit Range Defaults...';
            }
            if (this.isDefaultsRestored) {
                return 'Credit Range Defaults Restored';
            }
            if (this.didRestoreDefaultsFail) {
                return 'Credit Range Defaults Failed to Restore';
            }

            return 'Restore Credit Range Defaults?';
        },
    },
    methods: {
        sortFicoAscending(a, b) {
            const numberA = a.ficoTarget;
            const numberB = b.ficoTarget;

            if (numberA < numberB) return -1;
            if (numberA > numberB) return 1;
            return 0;
        },
        sortFicoDescending(a, b) {
            const numberA = a.ficoTarget;
            const numberB = b.ficoTarget;

            if (numberA > numberB) return -1;
            if (numberA < numberB) return 1;
            return 0;
        },

        handleAdd() {
            let creditRanges = _cloneDeep(this.modelValue);
            const creditRange = this.createItemObject();

            creditRanges.push(creditRange);

            this.$emit('update:modelValue', creditRanges);

            this.hideForm();
            this.creditRangeFormData.displayText = '';
            this.creditRangeFormData.ficoTarget = '';
        },
        handleRemove(toBeRemoved) {
            let creditRanges = _cloneDeep(this.modelValue);

            toBeRemoved.forEach(ficoTarget => {
                const index = creditRanges.findIndex(creditRange => creditRange.ficoTarget === ficoTarget);
                if (index > -1) {
                    creditRanges.splice(index, 1);
                }
            });

            this.$emit('update:modelValue', creditRanges);
        },
        createItemObject() {
            return {
                id: this.creditRangeFormData.ficoTarget,
                name: this.creditRangeFormData.displayText,
                displayText: this.creditRangeFormData.displayText,
                ficoTarget: this.creditRangeFormData.ficoTarget,
            };
        },

        resetData() {
            this.isDefaultsRestored = false;
            this.isRestoringDefaults = false;
            this.didRestoreDefaultsFail = false;
            this.showRestoreDefaultsModal = false;
        },
        closePopup() {
            this.resetData();
        },

        handleRestoreDefaults() {
            this.isRestoringDefaults = true;
            axios.post(this.resourceURL)
                .then(() => {
                    this.isDefaultsRestored = true;
                }).catch((error) => {
                    console.error(error);
                    this.didRestoreDefaultsFail = true;
                }).finally(() => {
                    this.isRestoringDefaults = false;
                });
        },
    },
};
</script>

<style scoped>

</style>
