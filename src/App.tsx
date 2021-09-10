import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';

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

const App = () => {
  return (
    <>
      <Global styles={reset} />
      <BrowserRouter basename="/floom">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
