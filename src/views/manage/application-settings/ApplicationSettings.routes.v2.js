export default [
    {
        name: 'ManageApplicationSettings',
        path: '/manage/application-settings',
        redirect: { name: 'ManageApplicationSettingsEditTabApplicationData' },
        component: () => import(`./form/FormApplicationSettingsEdit.vue`),
        children: [
            {
                name: 'ManageApplicationSettingsEditTabApplicationData',
                path: 'application-data',
                component: () => import(`./form/tabs/TabApplicationData.vue`),
            },
            {
                name: 'ManageApplicationSettingsEditTabWorkflowRules',
                path: 'workflow-rules',
                component: () => import(`./form/tabs/TabWorkflowRules.vue`),
            },
            {
                name: 'ManageApplicationSettingsEditTabUserInterface',
                path: 'user-interface',
                component: () => import(`./form/tabs/TabUserInterface.vue`),
            },
        ],
    },
];
