import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  components: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Bold',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Training Portal
          </Typography>
          <div className={classes.components}>
            <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit" style={{ fontWeight: '600' }}>TRAINEE</Button>
            </NavLink>
            <NavLink to="/TextField-Demo" style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit" style={{ fontWeight: '600' }}>TEXTFIELD DEMO</Button>
            </NavLink>
            <NavLink to="/Input-Demo" style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit" style={{ fontWeight: '600' }}>INPUT Demo</Button>
            </NavLink>
            <NavLink to="/Children-Demo" style={{ color: 'white', textDecoration: 'none' }}>
              <Button color="inherit" style={{ fontWeight: '600' }}>CHILDREN DEMO</Button>
            </NavLink>
          </div>
          <NavLink to="logout" style={{ color: 'white', textDecoration: 'none', fontWeight: '400' }}>
            <Button color="inherit" style={{ fontWeight: '600' }} onClick={localStorage.removeItem('token')}>LOGOUT</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
