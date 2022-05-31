<template>
    <BrightInputList v-bind="readonlyBindings">
        <template v-slot:primary-label="item">
            {{ item.value }} on {{ item.id }}
        </template>
    </BrightInputList>
</template>

<script>
import { FormInputListMixin } from "@/mixins/form/FormInputListMixin.js";
export default {
    name: "ViewSmsNotificationLogs",
    mixins: [FormInputListMixin],
};
</script>
