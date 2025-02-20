import * as React from 'react';

import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  Main,
  Textarea,
  TextInput,
  Typography,
} from '@strapi/design-system';
import { Check } from '@strapi/icons';
import { format } from 'date-fns';
import { Formik, Form, FormikHelpers } from 'formik';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
/* import { styled } from 'styled-components'; */
import * as yup from 'yup';

import { Layouts } from '../../../../components/Layouts/Layout';
import { Page } from '../../../../components/PageHelpers';
import { useTypedSelector } from '../../../../core/store/hooks';
import { BackButton } from '../../../../features/BackButton';
import { useNotification } from '../../../../features/Notifications';
import { useTracking } from '../../../../features/Tracking';
/* import { useAPIErrorHandler } from '../../../../hooks/useAPIErrorHandler';
import {
  useCreateRoleMutation,
  useGetRolePermissionLayoutQuery,
  useGetRolePermissionsQuery,
  useUpdateRolePermissionsMutation,
} from '../../../../services/users';
import { isBaseQueryError } from '../../../../utils/baseQuery'; */
import { translatedErrors } from '../../../../utils/translatedErrors';

/* import { Permissions, PermissionsAPI } from './components/Permissions'; */

/* -------------------------------------------------------------------------------------------------
 * CreatePage
 * -----------------------------------------------------------------------------------------------*/

const CREATE_SCHEMA = yup.object().shape({
  name: yup.string().required(translatedErrors.required.id),
  description: yup.string().required(translatedErrors.required.id),
  domain: yup.string().required(translatedErrors.required.id),
});

/**
 * TODO: be nice if we could just infer this from the schema
 */
interface CreateRoleGroupFormValues {
  name: string;
  description: string;
  domain: string;
}

const CreatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  //const permissionsRef = React.useRef<PermissionsAPI>(null);
  const { trackUsage } = useTracking();

  const handleCreateRoleSubmit = (
    data: CreateRoleGroupFormValues,
    formik: FormikHelpers<CreateRoleGroupFormValues>
  ) => {
    alert('aaaaa');
  };

  return (
    <Main>
      <Page.Title>
        {formatMessage(
          { id: 'Settings.PageTitle', defaultMessage: 'Settings - {name}' },
          {
            name: 'Role Groups',
          }
        )}
      </Page.Title>
      <Formik
        initialValues={
          {
            name: '',
            description: `${formatMessage({
              id: 'Settings.role-groups.form.created',
              defaultMessage: 'Created',
            })} ${format(new Date(), 'PPP')}`,
            domain: '',
          } satisfies CreateRoleGroupFormValues
        }
        onSubmit={handleCreateRoleSubmit}
        validationSchema={CREATE_SCHEMA}
        validateOnChange={false}
      >
        {({ values, errors, handleReset, handleChange, isSubmitting }) => (
          <Form>
            <>
              <Layouts.Header
                primaryAction={
                  <Flex gap={2}>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        handleReset();
                        //permissionsRef.current?.resetForm();
                      }}
                    >
                      {formatMessage({
                        id: 'app.components.Button.reset',
                        defaultMessage: 'Reset',
                      })}
                    </Button>
                    <Button type="submit" loading={isSubmitting} startIcon={<Check />}>
                      {formatMessage({
                        id: 'global.save',
                        defaultMessage: 'Save',
                      })}
                    </Button>
                  </Flex>
                }
                title={formatMessage({
                  id: 'Settings.role-groups.create.title',
                  defaultMessage: 'Create a role',
                })}
                subtitle={formatMessage({
                  id: 'Settings.role-groups.create.description',
                  defaultMessage: 'Define the rights given to the role',
                })}
                navigationAction={<BackButton fallback="../role-groups" />}
              />
              <Layouts.Content>
                <Flex direction="column" alignItems="stretch" gap={6}>
                  <Box background="neutral0" padding={6} shadow="filterShadow" hasRadius>
                    <Flex direction="column" alignItems="stretch" gap={4}>
                      <Flex justifyContent="space-between">
                        <Box>
                          <Box>
                            <Typography fontWeight="bold">
                              {formatMessage({
                                id: 'global.details',
                                defaultMessage: 'Details',
                              })}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="pi" textColor="neutral600">
                              {formatMessage({
                                id: 'Settings.role-groups.form.description',
                                defaultMessage: 'Name and description of the role',
                              })}
                            </Typography>
                          </Box>
                        </Box>
                      </Flex>
                      <Grid.Root gap={4}>
                        <Grid.Item col={6} direction="column" alignItems="stretch">
                          <Field.Root
                            name="name"
                            error={errors.name && formatMessage({ id: errors.name })}
                            required
                          >
                            <Field.Label>
                              {formatMessage({
                                id: 'global.name',
                                defaultMessage: 'Name',
                              })}
                            </Field.Label>
                            <TextInput onChange={handleChange} value={values.name} />
                            <Field.Error />
                          </Field.Root>
                        </Grid.Item>
                        <Grid.Item col={6} direction="column" alignItems="stretch">
                          <Field.Root
                            name="domain"
                            error={errors.domain && formatMessage({ id: errors.domain })}
                            required
                          >
                            <Field.Label>
                              {formatMessage({
                                id: 'global.domain',
                                defaultMessage: 'Domain',
                              })}
                            </Field.Label>
                            <TextInput onChange={handleChange} value={values.domain} />
                            <Field.Error />
                          </Field.Root>
                        </Grid.Item>
                        <Grid.Item col={12} direction="column" alignItems="stretch">
                          <Field.Root
                            name="description"
                            error={errors.description && formatMessage({ id: errors.description })}
                          >
                            <Field.Label>
                              {formatMessage({
                                id: 'global.description',
                                defaultMessage: 'Description',
                              })}
                            </Field.Label>
                            <Textarea onChange={handleChange} value={values.description} />
                          </Field.Root>
                        </Grid.Item>
                      </Grid.Root>
                    </Flex>
                  </Box>
                </Flex>
              </Layouts.Content>
            </>
          </Form>
        )}
      </Formik>
    </Main>
  );
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
