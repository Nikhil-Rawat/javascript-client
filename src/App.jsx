import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthRoute, PrivateRoute } from './routes';
import { SnackBarProvider } from './contexts';
import { theme } from './theme';
import apolloclient from './libs/apollo-client';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <ApolloProvider client={apolloclient}>
          <CssBaseline />
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
