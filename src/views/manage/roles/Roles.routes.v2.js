export default [
    {
        name: 'ManageRoles',
        path: '/manage/roles',
        component: () => import(`./ViewRoles.vue`),
    },

    {
        name: 'ManageRoleEdit',
        path: '/manage/roles/:publicId',
        redirect: { name: 'ManageRoleEditTabRole' },
        component: () => import(`./form/FormRoleEdit.vue`),
        props: true,
        children: [
            {
                name: 'ManageRoleEditTabRole',
                path: 'role',
                component: () => import(`./form/tabs/TabRole.vue`),
            },
            {
                name: 'ManageRoleEditTabGeneral',
                path: 'general-permissions',
                component: () => import(`./form/tabs/TabGeneral.vue`),
            },
            {
                name: 'ManageRoleEditTabPageVisit',
                path: 'page-visit-permissions',
                component: () => import(`./form/tabs/TabPageVisit.vue`),
            },
            {
                name: 'ManageRoleEditTabLoanPageVisit',
                path: 'loan-page-visit-permissions',
                component: () => import(`./form/tabs/TabLoanPageVisit.vue`),
            },
        ],
    },
];
