/* eslint-disable no-console */
import {
  Typography, Card, CardContent, Button,
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { NotFound } from '../NoMatch';
import profile from './data/images/profile.jpg';

const traineeDetails = (props) => {
  const { match: { params: { id } } } = props;

  const data = JSON.parse(localStorage.getItem('detailsData'));

  const idString = 'originalId';
  const details = data.find(((element) => element[idString] === id));
  if (!details) {
    return <NotFound />;
  }

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  return (
    <>
      <Card>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <img src={profile} alt="thumbnail" style={{ height: '150px', width: '120px' }} />
            </div>
            <div>
              <Typography variant="h3">{details.name}</Typography>
              <br />
              <Typography color="secondary">{getDateFormatted(details.createdAt)}</Typography>
              <Typography color="primary">{details.email}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      <Typography component="div" align="center">
        <Link to="/">
          <div style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary">
              Back
            </Button>
          </div>
        </Link>
      </Typography>
    </>
  );
};

export default traineeDetails;
