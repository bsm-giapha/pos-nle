import { createRouter, createWebHistory } from 'vue-router';

/* Auto-import all .route.js files */
let autoimportedRoutes = [];
const globbedRoutes = import.meta.globEager('./views/**/*.routes.v2.js'); // TODO Remove the 'v2' part later after finishing NLE v2

Object.keys(globbedRoutes).forEach(key => {
    autoimportedRoutes.push(...globbedRoutes[key].default);
});

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...autoimportedRoutes,
        {
            name: 'Login',
            path: '/login/:lenderId?',
            component: () => import('./views/Login.vue'),
            props: route => ({ lenderId: route.params.lenderId, redirect: route.params?.redirect, prefilledEmail: route.params?.prefilledEmail }),
        },
        {
            name: 'ForgotPassword',
            path: '/forgot-password/:lenderId?',
            component: () => import('./views/ForgotPassword.vue'),
            props: route => ({ lenderId: route.params.lenderId, prefilledEmail: route.params?.prefilledEmail }),
        },
        {
            name: 'UnAuthorized403',
            path: '/403',
            component: () => import('./views/UnAuthorized403.vue'),
        },
    ],
});

export default router;
