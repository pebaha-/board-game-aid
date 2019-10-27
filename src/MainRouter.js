import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Players from './Players';
import history from './History';
import SecretHitler from './SecretHitler';
import ProtectedRoute from './ProtectedRoute';

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
