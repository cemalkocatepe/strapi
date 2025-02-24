export default [
  {
    method: 'GET',
    path: '/role-groups/:id',
    handler: 'role-group.findOne',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/role-groups',
    handler: 'role-group.findAll',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];
