/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { func, bool } from 'prop-types';
import { InputAdornment, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as yup from 'yup';

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const FormDialog = (props) => {
  const classes = useStyles();
  const {
    onClose, open, onSubmit, loading,
  } = props;

  const [state, setstate] = useState({
    Name: '', Email: '', Password: '', Confirm: '',
  });
  const [blur, setblur] = useState({
    Name: false, Email: false, Password: false, Confirm: false,
  });

  const [visibility, setVisibility] = useState({
    type: 'password', icon: <VisibilityOffIcon />,
  });

  const schema = yup.object().shape({
    Name: yup.string().required().min(3),
    Email: yup.string().email().required(),
    Password: yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, 'Password must be alphanumeric'),
    Confirm: yup.string().oneOf([yup.ref('Password'), null], 'Password must match'),
  });

  const handleNameChange = (event) => {
    setstate({ ...state, Name: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setstate({ ...state, Password: event.target.value });
  };

  const handleConfirmChange = (event) => {
    setstate({ ...state, Confirm: event.target.value });
  };

  const handleEmailChange = (event) => {
    setstate({ ...state, Email: event.target.value });
  };

  const hasError = () => {
    try {
      return !schema.validateSync(state);
    } catch (err) {
      return true;
    }
  };

  const handleBlur = (field) => {
    setblur({ ...blur, [field]: true });
  };

  const resetState = () => {
    setstate({
      Name: '', Email: '', Password: '', Confirm: '',
    });
    setblur({
      Name: false, Email: false, Password: false, Confirm: false,
    });
  };

  const handleVisibility = () => {
    if (visibility.type === 'password' || visibility.icon === <VisibilityOffIcon />) {
      setVisibility({ ...visibility, type: 'text', icon: <VisibilityIcon /> });
    } else {
      setVisibility({ ...visibility, type: 'password', icon: <VisibilityOffIcon /> });
    }
  };

  const isTouched = () => (blur.Name || blur.Password || blur.Confirm || blur.Email);

  const getError = (field) => {
    if (blur[field] && hasError()) {
      try {
        schema.validateSyncAt(field, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your trainee details
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            label="Name"
            type="name"
            variant="outlined"
            error={!!getError('Name')}
            helperText={getError('Name')}
            onChange={handleNameChange}
            onBlur={() => handleBlur('Name')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            error={!!getError('Email')}
            helperText={getError('Email')}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('Email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <form>
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type={visibility.type}
              variant="outlined"
              error={!!getError('Password')}
              helperText={getError('Password')}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('Password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleVisibility()} size="small" color="inherit">
                      {visibility.icon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              id="confirm"
              label="Confirm"
              type={visibility.type}
              variant="outlined"
              error={!!getError('Confirm')}
              helperText={getError('Confirm')}
              onChange={handleConfirmChange}
              onBlur={() => handleBlur('Confirm')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleVisibility()} size="small" color="inherit">
                      {visibility.icon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { onSubmit(state); resetState(); }} color="primary" disabled={hasError() || !isTouched() || loading}>
            <div className={classes.buttonProgress}>
              {
                loading && <CircularProgress color="primary" size="20px" />
              }
            </div>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

FormDialog.defaultProps = {
  open: false,
  onSubmit: null,
  loading: false,
};

FormDialog.propTypes = {
  open: bool,
  onClose: func.isRequired,
  onSubmit: func,
  loading: bool,
};

export default FormDialog;
