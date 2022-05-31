<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightStepBar v-bind="bindings" @step-click="handleStepClick"/>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
        <BrightRow gutters="none" class="mt-16">
            <BrightColumn>
                <BrightCard
                    ribbon="blue"
                    :expandable="true"
                    label="Interactive Playground"
                    sub-label="Use this playground to interact with the above component in different states and settings."
                >
                    <BrightRow class="mt-24">
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="settings"/> Content</div>
                            <BrightDropdownSelect
                                id="playgroundCurrentStep"
                                v-model="currentStep"
                                label="Current Step"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'step1', label: '1', value: 1 },
                                    { id: 'step2', label: '2', value: 2 },
                                    { id: 'step3', label: '3', value: 3 },
                                    { id: 'step4', label: '4', value: 4 },
                                    { id: 'step5', label: '5', value: 5 },
                                    { id: 'step6', label: '6', value: 6 },
                                    { id: 'step7', label: '7', value: 7 },
                                ]"
                            />
                            <BrightDropdownSelect
                                id="playgroundNumberOfSteps"
                                v-model="numberOfSteps"
                                label="Number of Steps"
                                hide-meta-label
                                menu-full-width
                                :options="[
                                    { id: 'steps2', label: '2', value: 2 },
                                    { id: 'steps3', label: '3', value: 3 },
                                    { id: 'steps4', label: '4', value: 4 },
                                    { id: 'steps5', label: '5', value: 5 },
                                    { id: 'steps6', label: '6', value: 6 },
                                    { id: 'steps7', label: '7', value: 7 },
                                ]"
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightRadioGroup
                                id="playgroundColor"
                                v-model="color"
                                label="Color"
                                hide-meta-label
                                :options="[
                                    { id: 'primary', label: 'Primary', value: 'primary' },
                                    { id: 'secondary', label: 'Secondary', value: 'secondary' },
                                ]"
                            />
                        </BrightColumn>
                    </BrightRow>
                </BrightCard>
            </BrightColumn>
        </BrightRow>
    </BrightGrid>
</template>

<script>
import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightStepBar from "@/bright/components/core-library/step-bar/BrightStepBar";
import BrightRadioGroup from "@/bright/components/input-library/radio-group/BrightRadioGroup";
export default {
    name: "VuePressUIPlaygroundStepBar",
    components: {
        BrightRadioGroup,
        BrightStepBar,
        BrightIcon,
        BrightDropdownSelect,
        BrightCard,
        BrightRow,
        BrightGrid,
        BrightColumn,
    },
    data() {
        return {
            currentStep: 1,
            numberOfSteps: 5,
            color: 'primary',
        };
    },
    computed: {
        bindings() {
            return {
                id: 'uiplaygroundStepBar',
                steps: this.steps,
                currentStep: this.currentStep,
                color: this.color,
            };
        },
        steps() {
            let steps = [
                {
                    label: 'Lorem ipsum',
                    subLabel: 'Dolor sit amet, consectetur adipiscing elit.',
                },
                {
                    label: 'Quisque lobortis',
                    subLabel: 'Metus sit amet vehicula eleifend.',
                },
                {
                    label: 'Arcu lectus',
                    subLabel: 'Dictum velit, non porta odio justo sed dolor.',
                },
                {
                    label: 'Aliquam dapibus nulla vitae',
                    subLabel: 'Libero lacinia lacinia.',
                },
                {
                    label: 'Integer non',
                    subLabel: 'Ante id enim ornare posuere. Morbi ac ultricies eros. Proin elementum ligula rhoncus, ornare lorem a, tincidunt leo.',
                },
                {
                    label: 'Arcu lectus',
                    subLabel: 'Dictum velit, non porta odio justo sed dolor.',
                },
                {
                    label: 'Aliquam dapibus nulla vitae',
                    subLabel: 'Libero lacinia lacinia.',
                },
            ];

            if (this.numberOfSteps <= 6) steps.pop();
            if (this.numberOfSteps <= 5) steps.pop();
            if (this.numberOfSteps <= 4) steps.pop();
            if (this.numberOfSteps <= 3) steps.pop();
            if (this.numberOfSteps <= 2) steps.pop();

            return steps;
        },
    },
    watch: {
        currentStep: function(newValue) {
            if (newValue > this.numberOfSteps) {
                this.currentStep = this.numberOfSteps;
            }
        },
        numberOfSteps: function(newValue) {
            if (newValue < this.currentStep) {
                this.currentStep = this.numberOfSteps;
            }
        },
    },
    methods: {
        handleStepClick(stepNumber) {
            this.currentStep = stepNumber;
        },
    },
};
</script>
