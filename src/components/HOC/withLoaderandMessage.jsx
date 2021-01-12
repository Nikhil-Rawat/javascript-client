/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: 'silver',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  opps: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: '30px',
    textShadow: '2px 2px pink',
  },
  NoMoreTrainee: {
    fontWeight: 'bold',
    fontSize: '30px',
    textShadow: '2px 2px lightBlue',
  },
}));

const WithLoaderAndMessage = (WrappedComponent) => {
  const classes = useStyles();
  const withLoaderAndMessage = (props) => {
    const { loader, dataLength, ...rest } = props;
    if (loader) {
      return <CircularProgress className={classes.buttonProgress} />;
    }
    if (!dataLength) {
      return (
        <div className={classes.container}>
          <Typography align="center" className={classes.opps}>OPPS...!!</Typography>
          <Typography color="primary" align="center" className={classes.NoMoreTrainee}>No More Trainees</Typography>
        </div>
      );
    }
    return <WrappedComponent {...rest} />;
  };
  return withLoaderAndMessage;
};

export default WithLoaderAndMessage;
