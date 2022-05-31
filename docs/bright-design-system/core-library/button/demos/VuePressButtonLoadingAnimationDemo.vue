<template>
    <div class="flex flex-wrap justify-between border p-32">
        <BrightButton
            v-for="(prop, id) in buttonProps"
            :id="id + 'LoadingAnimation'"
            :use="prop.use"
            :variant="prop.variant"
            show-loading-animation
            class="mb-4"
        >
            {{ buttonLabel }}
        </BrightButton>
    </div>
</template>

<script>
import BrightButton from "@/bright/components/core-library/button/BrightButton";

export default {
    name: "VuePressButtonLoadingAnimationDemo",
    components: { BrightButton },
    data() {
        return {
            buttonLabel: 'Label',
            buttonProps: {
                primaryStandard: {
                    use: 'primary',
                    variant: 'standard',
                },
                primaryAlternative: {
                    use: 'primary',
                    variant: 'alternative',
                },
                primaryDanger: {
                    use: 'primary',
                    variant: 'danger',
                },
                secondaryStandard: {
                    use: 'secondary',
                    variant: 'standard',
                },
                secondaryAlternative: {
                    use: 'secondary',
                    variant: 'alternative',
                },
                secondaryDanger: {
                    use: 'secondary',
                    variant: 'danger',
                },
                tertiaryStandard: {
                    use: 'tertiary',
                    variant: 'standard',
                },
                tertiaryAlternative: {
                    use: 'tertiary',
                    variant: 'alternative',
                },
                tertiaryDanger: {
                    use: 'tertiary',
                    variant: 'danger',
                },
            },
        };
    },
};
</script>
