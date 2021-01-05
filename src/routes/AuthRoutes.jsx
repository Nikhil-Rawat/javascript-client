import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthLayout } from '../Layouts';

const AuthRoute = () => (
  <Switch>
    <Route
      exact
      path="/login"
      render={({ match, history }) => (
        <AuthLayout match={match} history={history} />
      )}
    />
  </Switch>
);

export default AuthRoute;
