/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

const WithLoaderAndMessage = (WrappedComponent) => {
  const withLoaderAndMessage = (props) => {
    const { loader, dataLength, ...rest } = props;
    if (loader) {
      return <CircularProgress />;
    }
    if (!dataLength) {
      return <Typography color="primary">Opps no more trainees</Typography>;
    }
    return <WrappedComponent {...rest} />;
  };
  return withLoaderAndMessage;
};

export default WithLoaderAndMessage;
