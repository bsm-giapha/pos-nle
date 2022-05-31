<template>
    <BaseFormControl v-bind="getFormControlProps">
        <BaseLabel v-bind="getLabelProps"/>
        <input id="input-availableHours" type="hidden" v-bind="getBaseInputProps">
        <BrightTable
            :id="id"
            :columns="[
                { name: 'Availability', key: 'active', sort: 'none' },
                { name: 'Day', key: 'day', sort: 'none' },
                { name: 'Start', key: 'start', sort: 'none' },
                { name: 'Stop', key: 'stop', sort: 'none' },
            ]"
            :rows="rows"
            hide-footer
        >
            <template v-slot:column:active="row">
                <BrightInputSwitch
                    :id="`isActive-${row.id}`"
                    class="mb-0"
                    label="Is Active"
                    hide-label
                    :value="Boolean(row.active)"
                    @update:modelValue="handleInput(row, $event, 'isActive')"
                />
            </template>
            <template v-slot:column:start="row">
                <BrightInputDate
                    :id="`start-${row.id}`"
                    class="mb-0"
                    label="Start"
                    format="h:i K"
                    enable-time
                    hide-calendar
                    hide-label
                    :default-value="row.start"
                    :value="row.start"
                    @update:modelValue="handleInput(row, $event, 'timeStart')"
                />
            </template>
            <template v-slot:column:stop="row">
                <BrightInputDate
                    :id="`stop-${row.id}`"
                    class="mb-0"
                    label="Stop"
                    format="h:i K"
                    enable-time
                    hide-calendar
                    hide-label
                    :default-value="row.stop"
                    :value="row.stop"
                    @update:modelValue="handleInput(row, $event, 'timeStop')"
                />
            </template>
        </BrightTable>
        <BaseInputValidation v-bind="getInputValidationProps"/>
    </BaseFormControl>
</template>

<script>
import { BrightInputMixin } from "@/bright/mixins/inputs/BrightInputMixin.js";
import BrightInputDate from "@/bright/components/input-library/date/BrightInputDate.vue";
import BrightInputSwitch from "@/bright/components/input-library/switch/BrightSwitch.vue";
import BrightTable from "@/bright/components/layout-library/table/BrightTable.vue";
import _cloneDeep from "lodash/cloneDeep";

export default {
    name: "InputAvailableHours",
    components: { BrightInputDate, BrightInputSwitch, BrightTable },
    mixins: [BrightInputMixin],
    emits: ['update:modelValue'],
    data() {
        return {
            rows: [],
        };
    },
    computed: {
        daysOfTheWeek() {
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        },
    },
    watch: {
        modelValue(newRowsData) {
            if (newRowsData.length) {
                this.getRowData();
            }
        },
    },
    methods: {
        getRowData() {
            let rowData = [];
            this.modelValue.forEach(object => {
                let data = {};
                data.id = object.id;
                data.active = object.isActive;
                data.day = this.daysOfTheWeek[object.workDay];
                data.startMinutes = object.hourMinuteStart;
                data.stopMinutes = object.hourMinuteStop;
                data.start = object.timeStart;
                data.stop = object.timeStop;
                rowData.push(data);
            });
            this.rows = rowData;
        },

        handleInput(row, newValue, key) {
            const updatedAvailableHours = _cloneDeep(this.modelValue);
            let availableHoursObject = updatedAvailableHours.find(object => object.id === row.id);
            if (typeof availableHoursObject !== 'undefined') {
                availableHoursObject[key] = newValue;
            }
            this.$emit('update:modelValue', updatedAvailableHours);
        },
    },
};
</script>
