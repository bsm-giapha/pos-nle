export default [
    {
        name: 'ManageTeams',
        path: '/manage/teams',
        component: () => import(`./ViewTeams.vue`),
    },

    {
        name: 'ManageTeamAdd',
        path: '/manage/teams/add',
        component: () => import(`./form/FormTeamAdd.vue`),
    },

    {
        name: 'ManageTeamAddSuccess',
        path: '/manage/teams/add-success',
        component: () => import(`./form/FormTeamAddSuccess.vue`),
        props: true,
    },

    {
        name: 'ManageTeamEdit',
        path: '/manage/teams/:publicId',
        component: () => import(`./form/FormTeamEdit.vue`),
        props: true,
    },
];
