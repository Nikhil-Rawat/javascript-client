/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {
  Typography, InputAdornment, Container, IconButton,
} from '@material-ui/core';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackbarContext } from '../../contexts';
import { LOGIN_USER } from './mutation';
import { APOLLO_UNDER_MAINTANCE, SUCCESS, ERROR } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid silver',
    boxShadow: '1px 2px 3px silver',
    marginTop: '100px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    alignSelf: 'center',
    padding: '5px',
    marginTop: '20px',
    marginBottom: '10px',
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
    alignSelf: 'center',
    margin: '15px 0px',
  },
  signin: {
    margin: '20px',
    alignSelf: 'center',
    padding: '10px',
    boxSizing: 'border-box',
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

const FormDialog = ({ history }) => {
  const classes = useStyles();

  const [spin, setSpin] = useState(false);

  const [visibility, setVisibility] = useState({
    type: 'password', icon: <VisibilityOffIcon />,
  });

  const [state, setstate] = useState({
    Email: '', Password: '',
  });

  const [blur, setblur] = useState({
    Email: false, Password: false,
  });

  const [loginUser] = useMutation(LOGIN_USER);

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

  const handleLogin = async (openSnackbar) => {
    let ServerResponse = {};
    try {
      setSpin(true);
      ServerResponse = await loginUser({
        variables:
      { email: state.Email, password: state.Password },
      });
      if (ServerResponse.data.loginUser.status === 200) {
        localStorage.setItem('token', ServerResponse.data.loginUser.data);
        openSnackbar(SUCCESS, ServerResponse.data.loginUser.message);
        history.push('/trainee');
      } else {
        openSnackbar(ERROR, ServerResponse.data.loginUser.message);
        setSpin(false);
      }
    } catch (err) {
      openSnackbar(ERROR, APOLLO_UNDER_MAINTANCE);
      setSpin(false);
    }
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

  const handleVisibility = () => {
    if (visibility.type === 'password' || visibility.icon === <VisibilityOffIcon />) {
      setVisibility({ ...visibility, type: 'text', icon: <VisibilityIcon /> });
    } else {
      setVisibility({ ...visibility, type: 'password', icon: <VisibilityOffIcon /> });
    }
  };

  return (
    <SnackbarContext.Consumer>
      {({ openSnackbar }) => (
        <Container className={classes.container} aria-labelledby="form-dialog-title">
          <LockRoundedIcon className={classes.icon} />
          <Typography id="form-dialog-title" className={classes.login}>Login</Typography>
          <form>
            <TextField
              className={classes.input}
              size="medium"
              id="Email"
              label="Email"
              type="email"
              variant="outlined"
              error={!!getError('Email')}
              helperText={getError('Email')}
              onChange={handleEmailChange}
              onBlur={() => handleBlur('Email')}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" color="inherit">
                      <MailIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className={classes.input}
              size="medium"
              id="Password"
              label="Password"
              type={visibility.type}
              variant="outlined"
              error={!!getError('Password')}
              helperText={getError('Password')}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('Password')}
              autoComplete="true"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleVisibility()} size="small" color="inherit">
                      {visibility.icon}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </form>
          <Button
            fullWidth
            onClick={() => handleLogin(openSnackbar)}
            className={classes.signin}
            color="primary"
            variant="contained"
            disabled={hasError() || !isTouched() || spin}
          >
            <div className={classes.buttonProgress}>
              {
                spin && <CircularProgress color="primary" size="20px" />
              }
            </div>
            LOGIN
          </Button>
        </Container>
      )}
    </SnackbarContext.Consumer>
  );
};

FormDialog.propTypes = {
  history: PropTypes.object.isRequired,
};

export default FormDialog;
