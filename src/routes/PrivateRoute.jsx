import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { PrivateLayout } from '../Layouts';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee,
} from '../pages';
import NotFound from '../pages/NoMatch/NoMatch';

const PrivateRoute = () => {
  if (localStorage.getItem('token')) {
    return (
      <>
        <PrivateLayout />
        <Switch>
          <Redirect exact path="/" to="/trainee" />
          <Route path="/trainee" component={Trainee} />
          <Route path="/TextField-Demo" component={TextFieldDemo} />
          <Route path="/Input-Demo" component={InputDemo} />
          <Route path="/Children-Demo" component={ChildrenDemo} />
          <Redirect path="/logout" to="/login" />
          <Route default component={NotFound} />
        </Switch>
      </>
    );
  }
  return (
    <Switch>
      <Redirect path="/" to="/login" />
    </Switch>
  );
};

export default PrivateRoute;
