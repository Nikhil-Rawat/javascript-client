import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../config/constants';

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
  NavLink: {
    color: 'white',
    textDecoration: 'none',
  },
  button: {
    fontWeight: '600',
    color: 'inherit',
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
            <NavLink to="/" className={classes.NavLink}>
              <Button className={classes.button}>TRAINEE</Button>
            </NavLink>
            <NavLink to={routes.textfieldDDemo} className={classes.NavLink}>
              <Button className={classes.button}>TEXTFIELD DEMO</Button>
            </NavLink>
            <NavLink to={routes.inputDemo} className={classes.NavLink}>
              <Button className={classes.button}>INPUT Demo</Button>
            </NavLink>
            <NavLink to={routes.childrenDemo} className={classes.NavLink}>
              <Button className={classes.button}>CHILDREN DEMO</Button>
            </NavLink>
          </div>
          <NavLink to={routes.logout} className={classes.NavLink}>
            <Button className={classes.button} onClick={() => localStorage.removeItem('token')}>LOGOUT</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
