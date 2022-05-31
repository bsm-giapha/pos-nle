export default [
    {
        name: 'ManageCampaigns',
        path: '/manage/campaigns',
        component: () => import(`./ViewCampaigns.vue`),
    },

    {
        name: 'ManageCampaignAdd',
        path: '/manage/campaigns/add',
        component: () => import(`./form/FormCampaignAdd.vue`),
    },

    {
        name: 'ManageCampaignAddSuccess',
        path: '/manage/campaigns/add-success',
        component: () => import(`./form/FormCampaignAddSuccess.vue`),
        props: true,
    },

    {
        name: 'ManageCampaignEdit',
        path: '/manage/campaigns/:publicId',
        redirect: { name: 'ManageCampaignEditTabInformation' },
        component: () => import(`./form/FormCampaignEdit.vue`),
        props: true,
        children: [
            {
                name: 'ManageCampaignEditTabInformation',
                path: 'information',
                component: () => import(`./form/tabs/TabInformation.vue`),
            },
            {
                name: 'ManageCampaignEditTabConfigurations',
                path: 'configurations',
                component: () => import(`./form/tabs/TabConfigurations.vue`),
            },
            {
                name: 'ManageCampaignEditTabCredentials',
                path: 'credentials',
                component: () => import(`./form/tabs/TabCredentials.vue`),
            },
            {
                name: 'ManageCampaignEditTabCustomScripts',
                path: 'custom-scripts',
                component: () => import(`./form/tabs/TabCustomScripts.vue`),
            },
        ],
    },
];
