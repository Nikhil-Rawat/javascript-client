import {
  Typography, Card, CardContent, Button,
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import trainees from './data/trainee';
import { NotFound } from '../NoMatch';

const traineeDetails = (props) => {
  const { match: { params: { id } } } = props;
  const details = trainees.find(((element) => element.id === id));
  if (!details) {
    return <NotFound />;
  }

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h3">{details.name}</Typography>
          <br />
          <Typography colorText="secondary">{getDateFormatted(details.createdAt)}</Typography>
          <Typography>{details.email}</Typography>
        </CardContent>
      </Card>
      <Button value="BACK" />
    </>
  );
};

export default traineeDetails;
