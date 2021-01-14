import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, Dialog, DialogContentText, DialogContent,
  DialogTitle, Button, makeStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export const useStyle = makeStyles(() => ({
  margin: {
    margin: '10px 0',
  },
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const DeleteDialog = (props) => {
  const {
    open, onClose, onDelete, loading,
  } = props;
  const classes = useStyle();

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>
        Delete Trainee
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={16}>
          Do you really want to delete trainee
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.margin}>
        <Button autoFocus onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} variant="contained" color="secondary" disabled={loading}>
          <div className={classes.buttonProgress}>
            {
              loading && <CircularProgress color="primary" size="20px" />
            }
          </div>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

DeleteDialog.defaultProps = {
  open: false,
  loading: false,
};

export default DeleteDialog;
