import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, Dialog, DialogContentText, DialogContent,
  DialogTitle, Button, TextField, InputAdornment, makeStyles,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import * as yup from 'yup';

export const useStyle = makeStyles(() => ({
  margin: {
    margin: '10px 0',
  },
}));

const EditDialog = (props) => {
  const {
    open, onClose, onSubmit, defaultValues,
  } = props;
  const classes = useStyle();
  const schema = yup.object().shape({
    Name: yup.string().required('Name is required').min(3, 'should have more then 3 characters'),
    Email: yup.string().required('Email is required').email(),
  });

  const [state, setstate] = useState({
    Name: '', Email: '',
  });

  const [onBlur, setBlur] = useState({
    Name: false, Email: false,
  });

  const handleBlur = (label) => {
    setBlur({ ...onBlur, [label]: true });
  };

  const isTouched = () => (onBlur.Name || onBlur.Email);

  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  const getError = (label) => {
    if (onBlur[label] && hasErrors()) {
      try {
        schema.validateSyncAt(label, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

  const handleNameField = (input) => {
    setstate({
      ...state, Name: input.target.value,
    });
  };

  const handleEmailField = (input) => {
    setstate({
      ...state, Email: input.target.value,
    });
  };

  const handleClose = () => {
    setBlur({ Name: false, Email: false });
    onClose();
  };
  const handleSubmit = (details) => {
    setBlur({ Name: false, Email: false });
    onSubmit(details);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>
        Edit Trainee
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={16}>
          Edit Your New Details
        </DialogContentText>
        <TextField
          required
          fullWidth
          error={!!getError('Name')}
          helperText={getError('Name')}
          className={classes.margin}
          defaultValue={defaultValues.name}
          onChange={handleNameField}
          onBlur={() => handleBlur('Name')}
          label="Name"
          id="outlined-start-adornment"
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon opacity="0.6" /></InputAdornment>,
          }}
          variant="outlined"
        />
        <TextField
          required
          fullWidth
          error={!!getError('Email')}
          helperText={getError('Email')}
          className={classes.margin}
          defaultValue={defaultValues.email}
          onChange={handleEmailField}
          onBlur={() => handleBlur('Email')}
          label="Email"
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon opacity="0.6" /></InputAdornment>,
          }}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions className={classes.margin}>
        <Button autoFocus onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button disabled={hasErrors() || !isTouched()} onClick={() => handleSubmit(state)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
};

EditDialog.defaultProps = {
  open: false,
  defaultValues: {},
};

export default EditDialog;
