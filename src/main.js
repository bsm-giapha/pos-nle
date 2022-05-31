import { createApp } from 'vue';
import { createPinia } from 'pinia';
import "./mainAxios.js";
import App from "@/App.vue";
import router from './mainRouter.js';
import { useAuthenticatedUserStore } from "@/stores/authenticatedUser.js";
import EnvironmentMixin from '@/mixins/helpers/EnvironmentMixin';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(EnvironmentMixin);

router.beforeEach((to, from, next) => {
    const authenticatedUser = useAuthenticatedUserStore();
    let normalizedRedirect = to.fullPath;
    if (to.path === '/') {
        normalizedRedirect = '/manage/settings';
    }


    if (!['Login', 'ForgotPassword'].includes(to.name) && !authenticatedUser.isLoggedIn) {
        next({ name: 'Login', params: { redirect: normalizedRedirect } });
    } else {
        next();
    }
});

app.mount('#app');
