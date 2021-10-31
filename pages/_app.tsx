import { AppProps } from 'next/app';
import DotRing from '~/components/DotRing';
import Header from '~/components/Header';
import MouseContextProvider from '~/context/mouseContext';

import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MouseContextProvider>
      <DotRing />
      <Header />
      <Component {...pageProps} />
    </MouseContextProvider>
  );
}
