import { AppProps } from 'next/app';
import Header from '~/components/Header';

import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
