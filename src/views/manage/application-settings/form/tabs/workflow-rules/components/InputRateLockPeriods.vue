<template>
    <BrightInputList
        v-bind="inputListBindings"
        @add="showAddForm"
        @add-popover-close="hideForm(); lockPeriod = ''"
        @remove="removeItems"
    >
        <template v-slot:primary-label="item">
            <span>{{ getLockPeriodLabel(item.name) }}</span>
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add Rate Lock Period</div>
                <BrightInputNumber
                    id="rateLockPeriod"
                    v-model="lockPeriod"
                    label="Period"
                />
                <BrightButton
                    use="primary"
                    :disabled="!lockPeriod"
                    full-width
                    @click="addItems([lockPeriod])"
                    @keydown.space.enter.prevent="addItems([lockPeriod])"
                >
                    Add
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>
<script>
import { FormDescendantInputListMixin } from "@/mixins/form/FormDescendantInputListMixin.js";

export default {
    name: "InputRateLockPeriods",
    mixins: [FormDescendantInputListMixin],
    data() {
        return {
            lockPeriod: '',
        };
    },
    computed: {
        inputListBindings() {
            return {
                ...this.formPopoverBindings,
                sortOptions: [
                    { value: 'asc', label: 'Numerical (Smallest to Largest)', sort: this.sortRateLockPeriodsAscending },
                    { value: 'desc', label: 'Numerical (Largest to Smallest)', sort: this.sortRateLockPeriodsDescending },
                ],
            };
        },
    },
    methods: {
        getLockPeriodLabel(number) {
            return number + (number > 1 ? ' days' : ' day');
        },
        sortRateLockPeriodsAscending(a, b) {
            if (a.name < b.name) return -1;
            if (b.name > a.name) return 1;
            return 0;
        },
        sortRateLockPeriodsDescending(a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        },
    },
};
</script>

<style scoped>

</style>
