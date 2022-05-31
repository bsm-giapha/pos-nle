<template>
    <BrightCard
        class="AppPagePadding z-0"
        no-padding
        :bordered="false"
        :rounded="false"
    >
        <h1 class="mb-16">404</h1>
        <p>Unfortunately, the page you want to visit is either not available or does not exist.</p>
    </BrightCard>
</template>

<script>
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import { useNavigationStore } from "@/stores/navigation";

export default {
    name: "NotFound404",
    components: { BrightCard },
    beforeRouteEnter(to, from, next) {
        next(() => {
            const navigation = useNavigationStore();
            navigation.updateNavigation({
                pageName: 'Page Not Found',
                breadcrumbs: {},
                tabs: [],
            });
        });
    },
};
</script>
