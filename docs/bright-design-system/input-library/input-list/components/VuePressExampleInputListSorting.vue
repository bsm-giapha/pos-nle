<template>
    <BrightInputList
        ref="inputList"
        v-model="items"
        v-bind="bindings"
        @sort="currentSort = $event"
    >
        <template v-slot:left-section="item">
            <BrightAvatar :name="item.twoLetterLabel" light color="yellow"/>
        </template>
        <template v-slot:primary-label="item">
            {{ item.state }}
        </template>
        <template v-slot:secondary-label="item">
            {{ (item.isInRoundRobin) ? 'Company' : '' }}
            {{ (item.isInBranchRoundRobin) ? 'Branch' : '' }}
            {{ (item.isInZipcodeRoundRobin) ? 'Zip' : '' }}
            {{ (!item.isInRoundRobin && !item.isInBranchRoundRobin && !item.isInZipcodeRoundRobin) ? 'Not in any rules' : '' }}
        </template>
        <template v-slot:tertiary-label="item">
            {{ item.licenseNum }}
        </template>
    </BrightInputList>
</template>

<script>
import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar";
import items from "./items";
import _cloneDeep from "lodash/cloneDeep";
export default {
    name: "VuePressExampleInputListSorting",
    components: {
        BrightAvatar,
        BrightInputList,
    },
    data() {
        return {
            currentSort: 'asc',
            items: _cloneDeep(items),
        };
    },
    computed: {
        bindings() {
            return {
                id: 'inputListSorting',
                label: 'State Licensing',
                items: this.items,
                showSortButton: true,
                showLeftSection: true,
                itemsAreClickable: true,
                sortOptions: [
                    { value: 'asc', label: 'Alphabetical (A to Z)', sort: this.sortAscending },
                    { value: 'desc', label: 'Alphabetical (Z to A)', sort: this.sortDescending },
                ],
                currentSort: this.currentSort,
            };
        },
    },
    methods: {
        sortAscending(a, b) {
            const nameA = a.state.toLowerCase();
            const nameB = b.state.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        },
        sortDescending(a, b) {
            const nameA = a.state.toLowerCase();
            const nameB = b.state.toLowerCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        },
    },
};
</script>
