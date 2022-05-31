export default [
    {
        name: 'ManageLeadSources',
        path: '/manage/lead-sources',
        component: () => import(`./ViewLeadSources.vue`),
    },

    {
        name: 'ManageLeadSourceEdit',
        path: '/manage/lead-sources/:publicId',
        redirect: { name: 'ManageLeadSourceEditTabInformation' },
        component: () => import(`./form/FormLeadSourceEdit.vue`),
        props: true,
        children: [
            {
                name: 'ManageLeadSourceEditTabInformation',
                path: 'information',
                component: () => import(`./form/tabs/TabInformation.vue`),
            },
            {
                name: 'ManageLeadSourceEditTabAssignments',
                path: 'assignments',
                component: () => import(`./form/tabs/TabAssignments.vue`),
            },
        ],
    },

    {
        name: 'ManageLeadSourceAdd',
        path: '/manage/lead-sources/add',
        component: () => import(`./form/FormLeadSourceAdd.vue`),
    },

    {
        name: 'ManageLeadSourceAddSuccess',
        path: '/manage/lead-sources/add-success',
        component: () => import(`./form/FormLeadSourceAddSuccess.vue`),
        props: true,
    },
];
