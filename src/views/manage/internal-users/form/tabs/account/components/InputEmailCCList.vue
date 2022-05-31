<template>
    <BrightInputList
        v-bind="formPopoverBindings"
        @add="showAddForm"
        @add-popover-close="hideForm(); formInput = ''"
        @remove="removeItems"
    >
        <template v-slot:primary-label="item">
            {{ item.id }}
        </template>
        <template v-slot:add-popover-form>
            <div style="width: 300px">
                <div class="__typography--heading--6 mb-8">Add an Email Address</div>
                <BrightInputEmail
                    id="addEmailCCList"
                    v-model="formInput"
                    label="Email Address"
                    sub-label="Use comma-separated email addresses ('email1@mail.com,email2@mail.com') to add multiple email addresses.'"
                    hide-label
                    multiple
                />
                <BrightButton
                    use="primary"
                    full-width
                    @click="addItems(formInput.split(','))"
                    @keydown.space.enter.prevent="addItems(formInput.split(','))"
                >
                    Add
                </BrightButton>
            </div>
        </template>
    </BrightInputList>
</template>

<script>
import { FormInputListMixin } from "@/mixins/form/FormInputListMixin.js";
import BrightInputEmail from "@/bright/components/input-library/email/BrightInputEmail.vue";

export default {
    name: "InputEmailCCList",
    components: { BrightInputEmail },
    mixins: [FormInputListMixin],
    data() {
        return {
            formInput: '',
        };
    },
};
</script>
