export default [
    {
        name: 'ManageInternalUsers',
        path: '/manage/internal-users',
        component: () => import(`./ViewInternalUsers.vue`),
    },

    {
        name: 'ManageInternalUserAdd',
        path: '/manage/internal-users/add',
        component: () => import(`./form/FormInternalUserAdd.vue`),
    },

    {
        name: 'ManageInternalUserAddSuccess',
        path: '/manage/internal-users/add-success',
        component: () => import(`./form/FormInternalUserAddSuccess.vue`),
        props: true,
    },

    {
        name: 'ManageInternalUserEdit',
        path: '/manage/internal-users/:publicId',
        redirect: { name: 'ManageInternalUserEditTabAccount' },
        component: () => import(`./form/FormInternalUserEdit.vue`),
        props: true,
        children: [
            {
                name: 'ManageInternalUserEditTabAccount',
                path: 'account',
                component: () => import(`./form/tabs/TabAccount.vue`),
            },
            {
                name: 'ManageInternalUserEditTabAssignments',
                path: 'assignments',
                component: () => import(`./form/tabs/TabAssignments.vue`),
            },
            {
                name: 'ManageInternalUserEditTabLicensingCredentials',
                path: 'licensing-credentials',
                component: () => import(`./form/tabs/TabLicensingCredentials.vue`),
            },
        ],
    },
];
