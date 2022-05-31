<template>
    <div>
        <NavigationLender v-if="spaIsBootstrapped">
            <router-view v-slot="{ Component }">
                <keep-alive :include="regexComponentNamesToKeepAlive">
                    <component :is="Component"/>
                </keep-alive>
            </router-view>
        </NavigationLender>
        <div v-else>
            <router-view/>
        </div>
        <BrightTheNotificationTray/>
    </div>
</template>

<script>
import BrightTheNotificationTray from "@/bright/components/overlay-library/the-notification-tray/BrightTheNotificationTray.vue";
import { mapState } from "pinia";
import { useLenderStore } from "@/stores/lender";
import NavigationLender from "@/components/navigation/NavigationLender.vue";

export default {
    name: "App",
    components: { NavigationLender, BrightTheNotificationTray },
    data() {
        return {
            /*
                If you want to keep a component alive throughout the Vue lifecycle, this is where you do it.
                See the following Vue 3 docs for more information: https://vuejs.org/guide/built-ins/keep-alive.html

                Explanation: Normally, a component is created and destroyed many times as it is needed. In most cases, this
                is a good thing because it means you work with fresh state and don't have to deal with long-term state issues
                (e.g. clearing out data/state when leaving pages, caching data in a smart way, etc.).

                But sometimes you'll want to keep a component alive indefinitely. Valid reasons include:
                    - The component is expensive to render.
                    - The component makes a lot of API requests.
                    - The component is in a high-traffic part of the app that will be used/seen many times.
                
                Note that if you decide to keep a component alive, you'll need to manage the state and appropriately cache data.
                Your main concerns will be:
                    - When the page is navigated away from, be sure to clear out data that should not persist in memory.
                        - You can use the 'deactivated' lifecycle hook that is unique to <keep-alive> components.
                        - https://vuejs.org/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance
                    - When the page is navigated to, be sure to check if the page's state/data/cache should be updated.
                        - You can use the 'activated' lifecycle hook that is unique to <keep-alive> components.
                        - https://vuejs.org/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance
            */
            regexComponentNamesToKeepAlive: /^View.*/,
        };
    },
    computed: {
        ...mapState(useLenderStore, {
            spaIsBootstrapped: store => store.spaIsBootstrapped,
        }),
    },
};
</script>
