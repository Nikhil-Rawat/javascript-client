import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes';
import { SnackBarProvider } from './contexts';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/login" component={AuthRoute} />
            <Route default component={PrivateRoute} />
          </Switch>
        </Router>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
