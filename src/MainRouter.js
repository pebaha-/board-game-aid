import React from 'react';
import App from './App.js';
import Players from './Players.js';
import { Router, Route, Switch } from 'react-router-dom';
import history from './History';

export default () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={App} key={1} />
            <Route path="/players" render={(props) => <Players {...props}/> } key={2} />
        </Switch>
    </Router>
);
