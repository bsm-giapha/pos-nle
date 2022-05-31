<template>
    <div>
        <BrightInputList
            ref="inputList"
            v-bind="bindings"
            v-model="items"
            @add="isAddingItem = true"
            @remove="handleRemove"
            @add-popover-close="isAddingItem = false"
        >
            <template v-slot:add-popover-form>
                <BrightForm autocomplete="new-password" style="max-width: 256px">
                    <div class="__typography--heading--6 mb-16">Add State</div>
                    <BrightInputText
                        id="addNewState"
                        v-model="itemFormData.addNewItemState"
                        label="Imaginary State"
                        sub-label="This isn't validated against anything, so you can make up your own state name."
                        placeholder="Calivada"
                    />
                    <BrightButton
                        use="primary"
                        @click="handleFormSubmit"
                        @keydown.space.enter.prevent="handleFormSubmit"
                    >
                        Add
                    </BrightButton>
                </BrightForm>
            </template>
            <template v-slot:left-section="item">
                <BrightAvatar :name="item.state" light color="yellow"/>
            </template>
            <template v-slot:primary-label="item">
                {{ item.state }}
            </template>
        </BrightInputList>
    </div>
</template>

<script>
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightInputList from "@/bright/components/input-library/input-list/BrightInputList";
import BrightAvatar from "@/bright/components/core-library/avatar/BrightAvatar";
import BrightForm from "@/bright/components/input-library/form/BrightForm";
import BrightButton from "@/bright/components/core-library/button/BrightButton";
import BrightNotificationFactory from "@/bright/components/overlay-library/the-notification-tray/services/BrightNotificationFactory";
const _BrightNotificationFactory = new BrightNotificationFactory();
import items from "./items";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "VuePressExampleAddingItemsWithAPopover",
    components: {
        BrightButton,
        BrightForm,
        BrightAvatar,
        BrightInputList,
        BrightInputText,
    },
    data() {
        return {
            newlyAddedItems: [],
            isAddingItem: false,
            items: _cloneDeep(items),
            itemFormData: {
                addNewItemState: '',
            },
        };
    },
    computed: {
        bindings() {
            return {
                id: 'inputListAddingWithAPopover',
                label: 'States',
                items: this.items,
                useAddPopoverSlot: true,
                showAddPopover: this.isAddingItem,
                showAddButton: true,
                showSortButton: true,
                showLeftSection: true,
                itemActions: [
                    { value: 'remove', icon: 'close', label: 'Remove' },
                ],
                currentSort: 'asc',
                sortOptions: [
                    { value: 'asc', label: 'Alphabetical (A to Z)', sort: this.sortAscending },
                    { value: 'desc', label: 'Alphabetical (Z to A)', sort: this.sortDescending },
                ],
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
        handleFormSubmit() {
            this.items.push({
                id: this.$refs.inputList.$_getUniqueIDForNewItem(),
                state: this.itemFormData.addNewItemState,
            });

            _BrightNotificationFactory.createNotification({
                type: 'success',
                icon: 'check_circle',
                label: 'New State',
                subLabel: `${this.itemFormData.addNewItemState} was created successfully.`,
            });

            this.isAddingItem = false;
            this.itemFormData.addNewItemState = '';
        },
        handleRemove(itemsToBeRemoved) {
            itemsToBeRemoved.forEach((itemID) => {
                const indexOfItem = this.items.findIndex(item => item.id === itemID);
                this.items.splice(indexOfItem, 1);
            });

            _BrightNotificationFactory.createNotification({
                type: 'info',
                icon: 'delete',
                label: 'Removed State Licenses',
                subLabel: `${itemsToBeRemoved.length} state license${itemsToBeRemoved.length > 1 ? "s were" : " was"} removed successfully.`,
            });
        },
    },
};
</script>
