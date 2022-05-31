<template>
    <div class="code-example-box">
        <BrightDropdownSelect
            v-model="selectedLetter"
            id="letterDropdown"
            label="My Letter Dropdown"
            :options="[
                { label: 'A', value: 'a'},
                { label: 'B', value: 'b'},
                { label: 'C', value: 'c'},
            ]"
        />
        <div>Selected Letter Value: '{{selectedLetter}}'</div>
        <br>
        <BrightDropdownSelect
            v-model="selectedNumber"
            id="numberDropdown"
            label="My Number Dropdown"
            sub-label="Note: This one has a pre-selected option."
            :options="[
                { label: 'One', value: '1'},
                { label: 'Two', value: '2'},
                { label: 'Three', value: '3'},
            ]"
        />
        <div>Selected Number Value: '{{selectedNumber}}'</div>
    </div>
</template>

<script>
    import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
    export default {
        name: "VuePressVModelSingleSelectDropdownDemo",
        components: {BrightDropdownSelect},
        data() {
            return {
                selectedLetter: '',
                selectedNumber: '1',
            }
        },
    }
</script>