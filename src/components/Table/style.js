import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table: {
    boxSizing: 'border-box',
    border: '1px solid silver',
    boxShadow: '1px 2px 3px silver',
    marginTop: '10px',
  },
  topLabel: {
    color: 'gray',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  rowStyle1: {
    background: 'lightblue',
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
      cursor: 'pointer',
    },
  },
  rowStyle2: {
    background: 'white',
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
      cursor: 'pointer',
    },
  },
});
