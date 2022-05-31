<template>
    <BrightInputList
        ref="inputList"
        v-bind="bindings"
        v-model="items"
        @remove="handleRemove"
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
    name: "VuePressExampleRemovingItems",
    components: {
        BrightAvatar,
        BrightInputList,
    },
    data() {
        return {
            items: _cloneDeep(items),
        };
    },
    computed: {
        bindings() {
            return {
                id: 'inputListRemoving',
                label: 'State Licensing',
                items: this.items,
                showLeftSection: true,
                bulkEditActions: [
                    { eventName: 'remove', action: 'Remove', icon: 'delete' },
                ],
            };
        },
    },
    methods: {
        handleRemove(itemsToBeRemoved) {
            itemsToBeRemoved.forEach((itemID) => {
                const indexOfItem = this.items.findIndex(item => item.id === itemID);
                this.items.splice(indexOfItem, 1);
            });
        },
    },
};
</script>
