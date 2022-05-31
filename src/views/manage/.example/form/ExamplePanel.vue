<template>
    <div class="Panel"><!-- TODO Rename this. It should match the name of this component. -->
        <FormPanel label="Example Panel"><!-- TODO Rename this -->
            <BrightGrid full-width gutters-vertical="none">
                <BrightRow align-items="end">
                    <BrightColumn>
                        <!-- TODO Things go here -->
                    </BrightColumn>
                </BrightRow>
            </BrightGrid>
        </FormPanel>
    </div>
</template>

<script>
import { FormDescendantMixin } from "@/mixins/form/FormDescendantMixin.js";

export default {
    name: "Panel", // TODO Rename this. It should be prefixed with "Panel"
    mixins: [FormDescendantMixin],
};
</script>
