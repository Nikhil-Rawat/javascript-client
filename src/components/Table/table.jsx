import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableSortLabel, TablePagination, IconButton } from '@material-ui/core';
import { useStyles } from './style';

const ActionsCell = (ActionProps) => {
  const { actions, details } = ActionProps;
  return (
    <>
      {
        actions.map((action, index) => (
          <IconButton
            key={`${index + 1}`}
            disableFocusRipple
            size="small"
            onClick={() => action.handler(details)}
          >
            {action.icon}
          </IconButton>
        ))
      }
    </>
  );
};

export default function BasicTable(props) {
  const {
    id, data, columns, order, orderBy, onSort, onSelect, page, count, onChangePage, actions,
  } = props;
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow hover>
            {
              columns.map((element) => (
                <TableCell
                  key={element.label}
                  className={classes.topLabel}
                  align={element.align}
                >
                  <TableSortLabel
                    hideSortIcon
                    active={orderBy === element.label}
                    direction={order}
                    onClick={() => onSort(element.label)}
                  >
                    {element.label}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element, index) => (
            <TableRow
              className={index % 2 ? classes.rowStyle1 : classes.rowStyle2}
              key={element[id]}
            >
              {
                columns.map((ele) => (
                  <TableCell onClick={() => onSelect(element[id])} key={`${element[id]}${ele.field}`} component="th" scope="row" align={ele.align}>
                    { ele.format ? ele.format(element[ele.field]) : element[ele.field]}
                  </TableCell>
                ))
              }
              <TableCell align="center" key={`${data[id]}`}>
                <ActionsCell actions={actions} details={element} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={count}
        page={page}
        rowsPerPageOptions={[]}
        component="div"
        onChangePage={onChangePage}
        rowsPerPage={5}
      />
    </TableContainer>
  );
}

BasicTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
};

BasicTable.defaultProps = {
  order: 'asc',
  orderBy: '',
};
