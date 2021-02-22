import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthRoute, PrivateRoute } from './routes';
import { SnackBarProvider } from './contexts';
import { theme } from './theme';
import client from './libs/apollo-client';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route path="/login" component={AuthRoute} />
              <Route default component={PrivateRoute} />
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
