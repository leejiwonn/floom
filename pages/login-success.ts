import LoginSuccess from '~/pages/LoginSuccess';
import type { GetServerSideProps } from 'next';
import { ComponentProps } from 'react';

import api from '~/utils/api';
import { User } from '~/types/User';

export default LoginSuccess;

export const getServerSideProps: GetServerSideProps<
  ComponentProps<typeof LoginSuccess>
> = async ({ query }) => {
  const authToken = query.authToken as string | undefined;
  const redirect = (query.redirect as string) ?? '/';

  if (authToken == null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const { data: user } = await api.get<User>('/api/user', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return {
      props: {
        user,
        redirect,
        authToken,
      },
    };
  } catch (error: unknown) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
