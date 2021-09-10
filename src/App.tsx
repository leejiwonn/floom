import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

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

const history = createBrowserHistory({ basename: '/floom' });

const App = () => {
  return (
    <>
      <Global styles={reset} />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          {/* Not Found */}
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
