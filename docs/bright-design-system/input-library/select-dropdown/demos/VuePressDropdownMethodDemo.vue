<template>
    <div class="border p-32">
        <BrightButton use="primary" @click.native="selectRed()">Select Red</BrightButton>
        <BrightButton use="primary" @click.native="unselectRed()">Unselect Red</BrightButton>
        <BrightButton use="primary" @click.native="toggleRed()">Toggle Red</BrightButton>
        <br><br>
        <BrightButton use="secondary" @click.native.stop="openDropdownMenu()">Open Menu</BrightButton>
        <BrightButton use="secondary" @click.native.stop="closeDropdownMenu()">Close Menu</BrightButton>
        <BrightButton use="secondary" @click.native.stop="toggleDropdownMenu()">Toggle Menu</BrightButton>
        <br><br>
        <BrightButton use="secondary" @click.native="alertCurrentOptions()">Show Current Options</BrightButton>
        <BrightButton use="secondary" @click.native="selectAllOptions()">Select All Options</BrightButton>
        <BrightButton use="secondary" @click.native="unselectAllOptions()">Unselect All Options</BrightButton>
        <br><br>
        <BrightDropdownSelect
            v-model="selectedOptions"
            ref="dropdown"
            id="methodDemo"
            label="What is your favorite color?"
            sub-label="Choose wisely..."
            multiple
            :options="[
                {
                    label: 'Primary Colors',
                    options: [
                        { label: 'Blue', value: 'blue' },
                        { label: 'Red', value: 'red' },
                        { label: 'Yellow', value: 'yellow', disabled: true, },
                    ]
                },
                {
                    label: 'Imaginary Primary Colors',
                    options: [
                        { label: 'Blured', value: 'blured', icon: 'palette'},
                        { label: 'Redlow', value: 'redlow', icon: 'palette' },
                        { label: 'Yellue', value: 'yellue', icon: 'palette', disabled: true },
                    ]
                },
                {
                    label: 'Secondary Colors',
                    options: [
                        { label: 'Purple', subLabel: 'Consists of red and blue.', value: 'purple'},
                        { label: 'Green', subLabel: 'Consists of blue and yellow.', value: 'green' },
                        { label: 'Orange', subLabel: 'Consists of yellow and red.', value: 'orange', disabled: true },
                    ]
                },
                {
                    label: 'Imaginary Secondary Colors',
                    options: [
                        { label: 'Puren', subLabel: 'Consists of purple and green.', value: 'puren', icon: 'palette'},
                        { label: 'Greenge', subLabel: 'Consists of green and orange.', value: 'greenge', icon: 'palette' },
                        { label: 'Oranple', subLabel: 'Consists of orange and purple.', value: 'oranple', icon: 'palette', disabled: true },
                    ]
                },
                { label: 'I don\'t know', value: 'idk' },
            ]"
        />
        <div v-for="option in selectedOptions" :key="option.id">
            {{option}}
        </div>
    </div>
</template>

<script>
    import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
    import BrightButton from "@/bright/components/core-library/button/BrightButton";
    
    export default {
        name: "VuePressDropdownMethodDemo",
        components: {BrightButton, BrightDropdownSelect},
        data() {
            return {
                selectedOptions: ['blue'],
            }
        },
        methods: {
            selectRed() {
                this.$refs.dropdown.$_selectOptionByValue('red');
            },
            unselectRed() {
                this.$refs.dropdown.$_unselectOptionByValue('red');
            },
            toggleRed() {
                this.$refs.dropdown.$_toggleOptionByValue('red');
            },
            openDropdownMenu() {
                this.$refs.dropdown.$_openDropdownMenu();
            },
            closeDropdownMenu() {
                this.$refs.dropdown.$_closeDropdownMenu();
            },
            toggleDropdownMenu() {
                this.$refs.dropdown.$_toggleDropdownMenu();
            },
            alertCurrentOptions() {
                alert(this.$refs.dropdown.$_getCurrentlySelectedOptions());
            },
            selectAllOptions() {
                this.$refs.dropdown.$_selectAllPossibleOptions();
            },
            unselectAllOptions() {
                this.$refs.dropdown.$_unselectAllOptions();
            },
        }
    }
</script>

<style scoped>

</style>