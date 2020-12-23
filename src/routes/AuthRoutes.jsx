import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthLayout } from '../Layouts';

const AuthRoute = () => (
  <Router>
    <Switch>
      <Route path="/" component={AuthLayout} />
    </Switch>
  </Router>
);

export default AuthRoute;
