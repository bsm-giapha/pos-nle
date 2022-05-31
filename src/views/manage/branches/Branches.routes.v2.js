export default [
    {
        name: 'ManageBranches',
        path: '/manage/branches',
        component: () => import(`./ViewBranches.vue`),
    },

    {
        name: 'ManageBranchAdd',
        path: '/manage/branches/add',
        component: () => import(`./form/FormBranchAdd.vue`),
    },

    {
        name: 'ManageBranchAddSuccess',
        path: '/manage/branches/add-success',
        component: () => import(`./form/FormBranchAddSuccess.vue`),
        props: true,
    },

    {
        name: 'ManageBranchEdit',
        path: '/manage/branches/:publicId',
        redirect: { name: 'ManageBranchEditTabInformation' },
        component: () => import(`./form/FormBranchEdit.vue`),
        props: true,
        children: [
            {
                name: 'ManageBranchEditTabInformation',
                path: 'information',
                component: () => import(`./form/tabs/TabInformation.vue`),
            },
            {
                name: 'ManageBranchEditTabConfigurations',
                path: 'configurations',
                component: () => import(`./form/tabs/TabConfigurations.vue`),
            },
            {
                name: 'ManageBranchEditTabAssignments',
                path: 'assignments',
                component: () => import(`./form/tabs/TabAssignments.vue`),
            },
            {
                name: 'ManageBranchEditTabCredentials',
                path: 'credentials',
                component: () => import(`./form/tabs/TabCredentials.vue`),
            },
        ],
    },
];
