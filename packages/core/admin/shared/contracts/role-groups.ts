import type { Modules } from '@strapi/types';
import type { errors } from '@strapi/utils';
import { SanitizedAdminRoleGroup } from './shared';

/**
 * GET /roles-groups/:id - Find a role group by ID
 */
export declare namespace FindRoleGroup {
  export interface Request {
    params: { id: string };
    query: {};
    body: {};
  }

  export interface Response {
    data: SanitizedAdminRoleGroup;
    error?: errors.ApplicationError | errors.NotFoundError;
  }
}

/**
 * GET /role-groups
 */
export declare namespace FindRoleGroups {
  export interface Request {
    query: Modules.EntityService.Params.Pick<'admin::role-group', 'sort' | 'filters' | 'fields'>;
    body: {};
  }

  export interface Response {
    data: SanitizedAdminRoleGroup[];
    error?: errors.ApplicationError | errors.ValidationError;
  }
}
