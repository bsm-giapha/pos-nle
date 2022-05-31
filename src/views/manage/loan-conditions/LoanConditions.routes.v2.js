export default [
    {
        name: 'ManageLoanConditions',
        path: '/manage/loan-conditions',
        component: () => import(`./ViewLoanConditions.vue`),
    },

    {
        name: 'ManageLoanConditionAdd',
        path: '/manage/loan-conditions/add',
        redirect: { name: 'ManageLoanConditionAddTabInformation' },
        component: () => import(`./form/FormLoanConditionAdd.vue`),
        children: [
            {
                name: 'ManageLoanConditionAddTabInformation',
                path: 'information',
                component: () => import(`./form/tabs/TabInformation.vue`),
            },
            {
                name: 'ManageLoanConditionAddTabAutomaticTriggers',
                path: 'automatic-triggers',
                component: () => import(`./form/tabs/TabAutomaticTriggers.vue`),
            },
        ],
    },

    {
        name: 'ManageLoanConditionAddSuccess',
        path: '/manage/loan-conditions/add-success',
        component: () => import(`./form/FormLoanConditionAddSuccess.vue`),
        props: true,
    },

    {
        name: 'ManageLoanConditionEdit',
        path: '/manage/loan-conditions/:publicId',
        redirect: { name: 'ManageLoanConditionEditTabInformation' },
        component: () => import(`./form/FormLoanConditionEdit.vue`),
        props: true,
        children: [
            {
                name: 'ManageLoanConditionEditTabInformation',
                path: 'information',
                component: () => import(`./form/tabs/TabInformation.vue`),
            },
            {
                name: 'ManageLoanConditionEditTabAutomaticTriggers',
                path: 'automatic-triggers',
                component: () => import(`./form/tabs/TabAutomaticTriggers.vue`),
            },
        ],
    },
];
