import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  root: {
    fontFamily: 'Comic Sans MS, cursive, sans-serif',
    fontSize: 10,
    fontWeight: 'cursive',
    spacing: (factor) => `${0.25 * factor}rem`,
  },
});
