import { Button } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Layouts } from '../../../../components/Layouts/Layout';
import { Page } from '../../../../components/PageHelpers';
import { useTypedSelector } from '../../../../core/store/hooks';
import { useRBAC } from '../../../../hooks/useRBAC';
import { selectAdminPermissions } from '../../../../selectors';

const ListPage = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const permissions = useTypedSelector(selectAdminPermissions);

  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canCreate, canDelete, canRead, canUpdate },
  } = useRBAC(permissions.settings?.roles);

  const handleNewRoleClick = () => navigate('new');

  if (isLoadingForPermissions) {
    return <Page.Loading />;
  }

  return (
    <Page.Main>
      <Page.Title>
        {formatMessage(
          { id: 'Settings.PageTitle', defaultMessage: 'Settings - {name}' },
          {
            name: 'Role Groups',
          }
        )}
      </Page.Title>
      <Layouts.Header
        primaryAction={
          canCreate ? (
            <Button onClick={handleNewRoleClick} startIcon={<Plus />} size="S">
              {formatMessage({
                id: 'Settings.role-group.list.button.add',
                defaultMessage: 'Add new role groups',
              })}
            </Button>
          ) : null
        }
        title={formatMessage({
          id: 'global.role-groups',
          defaultMessage: 'role groups',
        })}
        subtitle={formatMessage({
          id: 'Settings.role-group.list.description',
          defaultMessage: 'List of role groups',
        })}
      />
    </Page.Main>
  );
};

const ProtectedListPage = () => {
  const permissions = useTypedSelector((state) => state.admin_app.permissions.settings?.roles.read);

  return (
    <Page.Protect permissions={permissions}>
      <ListPage />
    </Page.Protect>
  );
};

export { ProtectedListPage, ListPage };
