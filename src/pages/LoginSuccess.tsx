import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { saveAuthTokenInLocalStorage } from '../utils/auth';

function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const authToken = router.query.authToken as string | undefined;
    const redirect = (router.query.redirect as string) ?? '/home';

    if (authToken != null) {
      saveAuthTokenInLocalStorage(authToken);
      router.replace(redirect);
    } else {
      window.alert('잘못된 접근입니다.');
      router.replace('/');
    }
  }, [router]);

  return <></>;
}

export default LoginSuccess;

