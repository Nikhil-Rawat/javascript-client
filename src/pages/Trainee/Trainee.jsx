/* eslint-disable no-console */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetail';

const Trainee = () => {
  console.log('fasfa');
  return (
    <>
      <Switch>
        <Route exact path="/trainee">
          <TraineeList />
        </Route>
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
};

export default Trainee;
