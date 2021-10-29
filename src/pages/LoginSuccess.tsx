import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

import type { User } from '~/types/User';
import { saveAuthTokenInLocalStorage } from '~/utils/auth';

type Props = {
  user: User;
  redirect: string;
  authToken: string;
};

function LoginSuccess({ user, redirect, authToken }: Props) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    saveAuthTokenInLocalStorage(authToken);
    mutate('getUserProfile', user);
    router.replace(redirect);
  }, [user, authToken, redirect]);

  return <></>;
}

export default LoginSuccess;
