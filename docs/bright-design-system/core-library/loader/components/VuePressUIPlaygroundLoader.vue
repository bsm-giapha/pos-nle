<template>
    <BrightGrid>
        <BrightRow gutters="none">
            <BrightColumn>
                <BrightCard>
                    <BrightLoader v-bind="bindings"/>
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
                            <div class="__typography--heading--6 border-b pb-2"><BrightIcon class="text-blue-500" style="font-size: 20px; vertical-align: middle;" use="subject"/> Status</div>
                            <BrightSwitch v-model="isLoading" id="playgroundRounded" label="Is Loading"/>
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
import BrightSwitch from "@/bright/components/input-library/switch/BrightSwitch";
import BrightCard from "@/bright/components/layout-library/card/BrightCard";
import BrightInputGroup from "@/bright/components/input-library/input-group/BrightInputGroup";
import BrightIcon from "@/bright/components/core-library/icon/BrightIcon";
import BrightLoader from "@/bright/components/core-library/loader/BrightLoader";
export default {
    name: "VuePressUIPlaygroundLoader",
    components: {
        BrightLoader,
        BrightIcon,
        BrightInputGroup,
        BrightCard,
        BrightSwitch,
        BrightRow,
        BrightGrid,
        BrightColumn,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    computed: {
        bindings() {
            return {
                isLoading: this.isLoading,
            };
        },
    },
};
</script>
