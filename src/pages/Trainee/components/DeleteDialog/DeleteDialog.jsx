import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, Dialog, DialogContentText, DialogContent,
  DialogTitle, Button, makeStyles,
} from '@material-ui/core';

export const useStyle = makeStyles(() => ({
  margin: {
    margin: '10px 0',
  },
}));

const DeleteDialog = (props) => {
  const {
    open, onClose, onDelete,
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
        <Button onClick={onDelete} variant="contained" color="secondary">
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
};

DeleteDialog.defaultProps = {
  open: false,
};

export default DeleteDialog;
