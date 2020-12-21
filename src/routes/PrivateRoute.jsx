import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateLayout } from '../Layouts';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee,
} from '../pages';
import NotFound from '../pages/NoMatch/NoMatch';

const PrivateRoute = () => (
  <>
    <PrivateLayout />
    <Router>
      <Switch>
        <Route exact path="/" component={Trainee} />
        <Route path="/TextField-Demo" component={TextFieldDemo} />
        <Route path="/Input-Demo" component={InputDemo} />
        <Route path="/Children-Demo" component={ChildrenDemo} />
        <Route default component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default PrivateRoute;
