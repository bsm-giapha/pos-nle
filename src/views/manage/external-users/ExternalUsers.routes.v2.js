export default [
    {
        name: 'ManageExternalUsers',
        path: '/manage/external-users',
        component: () => import(`./ViewExternalUsers.vue`),
    },

    {
        name: 'ManageExternalUserAdd',
        path: '/manage/external-users/add',
        component: () => import(`./form/FormExternalUserAdd.vue`),
    },

    {
        name: 'ManageExternalUserAddSuccess',
        path: '/manage/external-users/add-success',
        component: () => import(`./form/FormExternalUserAddSuccess.vue`),
        props: true,
    },

    {
        name: 'ManageExternalUserEdit',
        path: '/manage/external-users/:publicId',
        component: () => import(`./form/FormExternalUserEdit.vue`),
        props: true,
    },
];
