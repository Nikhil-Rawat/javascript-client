/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, InputAdornment, Container } from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '5px',
    alignSelf: 'center',
    margin: '10px',
  },
  components: {
    marginRight: theme.spacing(4),
  },
  login: {
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '25px',
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    padding: '10px',
  },
  signin: {
    width: '80%',
    alignSelf: 'center',
    margin: '20px',
  },
}));

const FormDialog = () => {
  const classes = useStyles();
  const [open, setopen] = useState({
    openDialog: true,
  });

  const [state, setstate] = useState({
    Email: '', Password: '',
  });

  const [blur, setblur] = useState({
    Email: false, Password: false,
  });

  const schema = yup.object().shape({
    Email: yup.string().email().required(),
    Password: yup.string().required().min(8).matches(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, 'Password must be alphanumeric'),
  });

  const handleEmailChange = (event) => {
    setstate({ ...state, Email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setstate({ ...state, Password: event.target.value });
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

  const isTouched = () => (blur.Password || blur.Email);

  const handleClose = () => {
    setopen({ ...open, openDialog: false });
    console.log(state);
  };

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
    <Container>
      <Dialog maxWidth="xs" fullWidth open={open.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <LockRoundedIcon className={classes.icon} />
        <Typography id="form-dialog-title" className={classes.login}>Login</Typography>
        <DialogContent className={classes.input}>
          <TextField
            margin="dense"
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            error={getError('Email')}
            helperText={getError('Email')}
            onChange={handleEmailChange}
            onBlur={() => handleBlur('Email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            error={getError('Password')}
            helperText={getError('Password')}
            onChange={handlePasswordChange}
            onBlur={() => handleBlur('Password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityOffIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </DialogContent>
        <Button fullWidth onClick={handleClose} className={classes.signin} color="primary" variant="contained" disabled={hasError() || !isTouched()}>
          SIGN IN
        </Button>
      </Dialog>
    </Container>
  );
};

export default FormDialog;
