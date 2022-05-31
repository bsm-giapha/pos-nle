<template>
    <BrightCard
        class="AppPagePadding z-0"
        no-padding
        :bordered="false"
        :rounded="false"
    >
        <h1 class="mb-16">403</h1>
        <p>Unfortunately, you are not authorized to view this page. If you think that you should be able to view this page, then please contact your account manager to grant you the appropriate permission(s).</p>
    </BrightCard>
</template>

<script>
import BrightCard from "@/bright/components/layout-library/card/BrightCard.vue";
import { useNavigationStore } from "@/stores/navigation";

export default {
    name: "UnAuthorized403",
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
