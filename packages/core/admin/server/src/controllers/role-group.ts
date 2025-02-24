import type { Context } from 'koa';
import { getService } from '../utils';
import type { FindRoleGroups, FindRoleGroup } from '../../../shared/contracts/role-groups';

export default {
  /**
   * Returns on role group by id
   * @param {KoaContext} ctx - koa context
   */
  async findOne(ctx: Context) {
    const { id } = ctx.params as FindRoleGroup.Request['params'];

    const roleGroup = await getService('role-group').findOne({ id });

    if (!roleGroup) {
      return ctx.notFound('roleGroup.notFound');
    }

    ctx.body = {
      data: roleGroup,
    } satisfies FindRoleGroup.Response;
  },

  /**
   * Returns every role groups
   * @param {KoaContext} ctx - koa context
   */
  async findAll(ctx: Context) {
    const roleGroups = await getService('role-group').findAll();

    ctx.body = {
      data: roleGroups,
    } satisfies FindRoleGroups.Response;
  },
};
