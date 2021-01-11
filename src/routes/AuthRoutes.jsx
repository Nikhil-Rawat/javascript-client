import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../Layouts';

const AuthRoute = () => {
  if (localStorage.getItem('token')) {
    return (
      <Redirect path="/" to="/trainee" />
    );
  }
  return (
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
};

export default AuthRoute;
