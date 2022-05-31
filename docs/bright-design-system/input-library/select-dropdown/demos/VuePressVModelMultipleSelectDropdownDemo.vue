<template>
    <div class="code-example-box">
        <BrightDropdownSelect
            v-model="selectedLetters"
            id="letterDropdownMultiple"
            label="My Letter Dropdown"
            multiple
            :options="[
                { label: 'A', value: 'a'},
                { label: 'B', value: 'b'},
                { label: 'C', value: 'c'},
            ]"
        />
        <div>Selected Letter Values: '{{selectedLetters}}'</div>
        <br>
        <BrightDropdownSelect
            v-model="selectedNumbers"
            id="numberDropdownMultiple"
            label="My Number Dropdown"
            sub-label="Note: This one has a pre-selected option."
            multiple
            :options="[
                { label: 'One', value: '1'},
                { label: 'Two', value: '2'},
                { label: 'Three', value: '3'},
            ]"
        />
        <div>Selected Number Values: '{{selectedNumbers}}'</div>
    </div>
</template>

<script>
    import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
    export default {
        name: "VuePressVModelMultipleSelectDropdownDemo",
        components: {BrightDropdownSelect},
        data() {
            return {
                selectedLetters: [],
                selectedNumbers: ['1'],
            }
        },
    }
</script>