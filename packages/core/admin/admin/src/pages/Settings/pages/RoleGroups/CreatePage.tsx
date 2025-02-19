import { Typography } from '@strapi/design-system';

import { Page } from '../../../../components/PageHelpers';
import { useTypedSelector } from '../../../../core/store/hooks';

const CreatePage = () => {
  return <Typography variant="alpha">CreatePage</Typography>;
};

const ProtectedCreatePage = () => {
  const permissions = useTypedSelector((state) => state.admin_app.permissions.settings?.roles.read);

  return (
    <Page.Protect permissions={permissions}>
      <CreatePage />
    </Page.Protect>
  );
};

export { ProtectedCreatePage, CreatePage };
