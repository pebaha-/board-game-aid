import React from 'react';
import App from './App.js';
import Players from './Players.js';
import { HashRouter, Route, Switch } from 'react-router-dom';
import history from './History';
import SecretHitler from './SecretHitler.js';
import ProtectedRoute from './ProtectedRoute.js';

class MainRouter extends React.Component {
  render() {
    return (
      <HashRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} key={1} />
          <Route path="/players" component={Players} key={2} />
          <ProtectedRoute path="/sh" component={SecretHitler} key={3} />
        </Switch>
      </HashRouter>
    );
  }
};


export default MainRouter;