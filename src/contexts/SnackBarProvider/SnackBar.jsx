import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { SUCCESS } from '../../config/constants';

const SnackBar = (props) => {
  const {
    open, status, message, onClose, duration,
  } = props;
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <MuiAlert variant="filled" severity={status}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

SnackBar.propTypes = {
  duration: PropTypes.number,
  open: PropTypes.bool,
  status: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

SnackBar.defaultProps = {
  message: '',
  status: SUCCESS,
  open: false,
  duration: 6000,
};

export default SnackBar;
