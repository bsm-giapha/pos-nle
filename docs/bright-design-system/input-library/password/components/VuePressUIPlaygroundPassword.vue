<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightInputPassword
                        ref="passwordInput"
                        v-model="vModelData"
                        v-bind="inputBindings"
                        @show-password="handleShowPassword"
                    />
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Text</div>
                            <BrightInputText id="playgroundLabel" v-model="label" label="Label"/>
                            <BrightInputText id="playgroundSubLabel" v-model="subLabel" label="Sub Label"/>
                            <BrightInputText id="playgroundPlaceholder" v-model="placeholder" label="Placeholder Text"/>
                            <div class="__typography--heading--6 border-b pt-16 pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="verified_user"/> Validation</div>
                            <BrightDropdownSelect
                                id="playgroundValidationType"
                                v-model="validationType"
                                label="Validation Type"
                                menu-full-width
                                :options="[
                                    { id: 'none', label: 'No Validation', value: 'none' },
                                    { id: 'error', label: 'Error', value: 'error' },
                                    { id: 'success', label: 'Success', value: 'success' },
                                ]"
                            />
                            <BrightInputText
                                id="playgroundValidationMessage"
                                v-model="validationMessage"
                                label="Validation Message"
                                sub-label="This will only show if validation is used."
                            />
                        </BrightColumn>
                        <BrightColumn tablet="6">
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="palette"/> Styling & State</div>
                            <BrightDropdownSelect
                                id="playgroundSize"
                                v-model="size"
                                label="Size"
                                menu-full-width
                                :options="[
                                    { id: 'sizeLarge', label: 'Large', value: 'large' },
                                    { id: 'sizeMedium', label: 'Medium', value: 'medium' },
                                    { id: 'sizeSmall', label: 'Small', value: 'small' },
                                ]"
                            />
                            <BrightInputGroup label="Toggleable" class="mb-8">
                                <BrightSwitch id="playgroundLoadingAnimation" v-model="showLoadingAnimation" label="Show Loading Animation"/>
                                <BrightSwitch id="playgroundRounded" v-model="rounded" label="Rounded"/>
                                <BrightSwitch id="playgroundDisabled" v-model="disabled" label="Disabled"/>
                                <BrightSwitch id="playgroundOptional" v-model="optional" label="Optional"/>
                                <BrightSwitch id="playgroundReadonly" v-model="readonly" label="Readonly"/>
                            </BrightInputGroup>
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
import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightDropdownSelect from "@/bright/components/input-library/select-dropdown/BrightDropdownSelect";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightInputPassword from "@/bright/components/input-library/password/BrightInputPassword";
export default {
    name: "VuePressUIPlaygroundPassword",
    components: {
        BrightInputPassword,
        BrightIcon,
        BrightInputGroup,
        BrightDropdownSelect,
        BrightCard,
        BrightSwitch,
        BrightInputText,
        BrightRow,
        BrightGrid,
        BrightColumn,
    },
    data() {
        return {
            label: 'Password',
            subLabel: 'Please provide your password.',
            placeholder: '',
            size: 'medium',
            isLoading: false,
            showLoadingAnimation: false,
            rounded: false,
            disabled: false,
            optional: false,
            readonly: false,
            validationType: 'none',
            validationMessage: 'This is the validation message.',
            vModelData: '',
        };
    },
    computed: {
        inputBindings() {
            return {
                id: 'showcasePassword',
                label: this.label,
                subLabel: this.subLabel,
                placeholder: this.placeholder,
                size: this.size,
                showLoadingAnimation: this.isLoading,
                rounded: this.rounded,
                disabled: this.disabled,
                optional: this.optional,
                readonly: this.readonly,
                validationType: this.validationType,
                validationMessage: this.validationMessage,
            };
        },
    },
    methods: {
        handleShowPassword() {
            if (this.showLoadingAnimation) {
                setTimeout(() => {
                    this.isLoading = false;
                    this.$refs.passwordInput.forceShowPassword();
                }, 1000);
                this.isLoading = true;
                this.$refs.passwordInput.forceHidePassword();
            }
        },
    },
};
</script>

<style scoped>

</style>
