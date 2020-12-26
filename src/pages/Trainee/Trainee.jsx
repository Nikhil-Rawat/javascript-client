/* eslint-disable no-console */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetail';

const Trainee = () => (
  <>
    <Switch>
      <Route
        exact
        path="/trainee"
        render={({ match, history }) => (
          <TraineeList match={match} history={history} />
        )}
      />
      <Route
        exact
        path="/trainee/:id"
        render={({ match }) => (
          <TraineeDetails match={match} />
        )}
      />
    </Switch>
  </>
);

export default Trainee;
