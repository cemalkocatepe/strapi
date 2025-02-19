import { Typography } from '@strapi/design-system';

import { Page } from '../../../../components/PageHelpers';
import { useTypedSelector } from '../../../../core/store/hooks';

const EditPage = () => {
  return <Typography variant="alpha">EditPage</Typography>;
};

const ProtectedEditPage = () => {
  const permissions = useTypedSelector((state) => state.admin_app.permissions.settings?.roles.read);

  return (
    <Page.Protect permissions={permissions}>
      <EditPage />
    </Page.Protect>
  );
};

export { ProtectedEditPage, EditPage };
