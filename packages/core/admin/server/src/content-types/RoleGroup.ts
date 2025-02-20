/**
 * Lifecycle callbacks for the `Role group` model.
 */

export default {
  collectionName: 'admin_role_groups',
  info: {
    name: 'Role Groups',
    description: '',
    singularName: 'role-group',
    pluralName: 'role-groups',
    displayName: 'Role Groups',
  },
  options: {},
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
  attributes: {
    name: {
      type: 'string',
      minLength: 1,
      unique: true,
      configurable: false,
      required: true,
    },
    code: {
      type: 'string',
      minLength: 1,
      unique: true,
      configurable: false,
      required: true,
    },
    description: {
      type: 'string',
      configurable: false,
    },
    roles: {
      configurable: false,
      type: 'relation',
      relation: 'oneToMany',
      target: 'admin::role',
      mappedBy: 'role_groups',
    },
  },
};
