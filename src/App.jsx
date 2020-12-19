import React from 'react';
// import { TextFieldDemo } from './pages';
import { theme } from './theme';
// import { InputDemo } from './pages';
// import { ChildrenDemo } from './pages';
import { Trainee } from './pages/Trainee';

function App() {
  const classes = theme();
  return (
    <div className={classes.root}>
      <Trainee />
    </div>
  );
}

export default App;
