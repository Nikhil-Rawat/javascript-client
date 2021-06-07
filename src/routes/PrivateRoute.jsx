/* eslint-disable no-alert */
import React from 'react';
import * as jwt from 'jsonwebtoken';
import Alert from '@material-ui/lab/Alert';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { PrivateLayout } from '../Layouts';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee,
} from '../pages';
import NotFound from '../pages/NoMatch/NoMatch';

const PrivateRoute = () => {
  try {
    const token = localStorage.getItem('token');
    jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456');
  } catch (error) {
    localStorage.removeItem('token');
  }
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
    <>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Switch>
        <Redirect path="/" to="/login" />
      </Switch>
    </>
  );
};

export default PrivateRoute;
