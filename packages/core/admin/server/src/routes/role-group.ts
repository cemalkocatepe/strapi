export default [
  {
    method: 'GET',
    path: '/role-groups/:id',
    handler: 'role-group.findOne',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['admin::role-groups.read'] } },
      ],
    },
  },
  {
    method: 'GET',
    path: '/role-groups',
    handler: 'role-group.findAll',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        { name: 'admin::hasPermissions', config: { actions: ['admin::role-groups.read'] } },
      ],
    },
  },
];
