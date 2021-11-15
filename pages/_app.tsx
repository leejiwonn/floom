import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '~/components/Header';

import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== '/intro' && <Header />}
      <Component {...pageProps} />
    </>
  );
}
