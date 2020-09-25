/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { history } from '../core/history';

import createStore from './store/createStore';
import { routes, redirects } from './routes';

const store = createStore();

const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            exact={true}
            path={route.path}
            component={route.page}
          />
        ))}
        {redirects.map((redirect, key) => (
          <Redirect
            key={key}
            exact={true}
            from={redirect.from || undefined}
            to={redirect.to}
          />
        ))}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
