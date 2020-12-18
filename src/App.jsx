import React from 'react';
// import { TextFieldDemo } from './pages';
import { theme } from './theme';
// import { InputDemo } from './pages';
import { ChildrenDemo } from './pages';

function App() {
  const classes = theme();
  return (
    <div className={classes.root}>
      <ChildrenDemo />
    </div>
  );
}

export default App;
