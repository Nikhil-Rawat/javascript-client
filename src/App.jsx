import React from 'react';
// import { TextFieldDemo } from './pages';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
// import { InputDemo } from './pages';
// import { ChildrenDemo } from './pages';
// import { Trainee } from './pages';
import { FormDialog } from './pages';

function App() {
  const classes = theme();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <FormDialog />
    </div>
  );
}

export default App;
