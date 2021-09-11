import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import { AppProps } from 'next/app';

const reset = css`
  ${emotionReset}
  html,
  body {
    height: 100%;
  }
  #root {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans', sans-serif;
    color: #252831;
  }
  button {
    border: none;
    padding: 0;
    font-family: 'Noto Sans', sans-serif;
    color: #252831;
  }
  a {
    text-decoration: none;
    color: #252831;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={reset} />
      <Component {...pageProps} />
    </>
  );
}
