import React from 'react';
import { Typography } from '@material-ui/core';

const NotFound = () => (
  <div style={{ marginTop: '50px' }}>
    <br />
    <Typography variant="h3" align="center" color="error">Not Found</Typography>
    <br />
    <Typography variant="body1" color="primary" align="center">
      Seems like the page you are looking for does not exists
    </Typography>
  </div>
);

export default NotFound;
