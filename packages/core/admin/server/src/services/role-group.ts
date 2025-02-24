import type { AdminRoleGroup } from '../../../shared/contracts/shared';

/**
 * Find a role group in database
 * @param params query params to find the role group
 * @param populate
 */
const findOne = (params = {}, populate?: unknown): Promise<AdminRoleGroup> => {
  return strapi.db.query('admin::role-group').findOne({ where: params, populate });
};

/**
 * Find a role group in database
 * @param params query params to find the role group
 * @param populate
 */
const findAll = (params = {}, populate?: unknown): Promise<AdminRoleGroup[]> => {
  return strapi.db.query('admin::role-group').findMany({ where: params, populate });
};

export default {
  findOne,
  findAll,
};
