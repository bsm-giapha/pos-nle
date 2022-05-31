<template>
    <div class="border p-32">
        <BrightButton use="primary" @click.native.stop="openPopover()">Open Popover</BrightButton>
        <BrightButton use="primary" @click.native.stop="closePopover()">Close Popover</BrightButton>
        <BrightButton use="primary" @click.native.stop="togglePopover()">Toggle Popover</BrightButton>
        <br><br>
        <div>{{popoverAction}}</div>
        <div class="mt-8 mb-16">
            <BrightPopover
                ref="popover"
                placement="left"
            >
                <template v-slot:popover>
                    <BrightGrid>
                        <BrightRow>
                            <BrightColumn>
                                <BrightInputText
                                    id="textInputMethodDemo"
                                    label="Text Input"
                                    sub-label="Sub-Label"
                                    placeholder="Placeholder"
                                />
                                <BrightInputEmail
                                    id="emailInputMethodDemo"
                                    label="Email Input"
                                    sub-label="Sub-Label"
                                    placeholder="example@domain.com"
                                />
                                <BrightButton use="primary" icon="star" style="width:200px"> Submit</BrightButton>
                            </BrightColumn>
                        </BrightRow>
                    </BrightGrid>
                </template>
                <BrightButton use="secondary">Lorem Ipsum</BrightButton>
            </BrightPopover>
        </div>
    </div>
</template>

<script>
    import BrightButton from "@/bright/components/core-library/button/BrightButton";
    import BrightPopover from "@/bright/components/overlay-library/BrightPopover";
    import BrightGrid from "@/bright/components/layout-library/grid/BrightGrid";
    import BrightRow from "@/bright/components/layout-library/grid/BrightRow";
    import BrightColumn from "@/bright/components/layout-library/grid/BrightColumn";
    import BrightInputText from "@/bright/components/input-library/text/BrightInputText";
    import BrightInputEmail from "@/bright/components/input-library/email/BrightInputEmail";

    export default {
        name: "VuePressPopoverMethodDemo",
        components: {
            BrightButton,
            BrightGrid,
            BrightRow,
            BrightColumn,
            BrightInputEmail,
            BrightInputText,
            BrightPopover,
        },
        data() {
            return {
                popoverAction: 'Select a method above to see its usage.'
            }
        },
        methods: {
            openPopover() {
                this.$refs.popover.$_openPopover();
                this.popoverAction = 'Popover opened.';
            },
            closePopover() {
                this.$refs.popover.$_closePopover();
                this.popoverAction = 'Popover closed.';
            },
            togglePopover() {
                this.$refs.popover.$_togglePopover();
                this.popoverAction = 'Popover toggled.';
            }
        }
    }
</script>

<style scoped>

</style>