/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import trainees from './data/trainee';
import { FormDialog, EditDialog, DeleteDialog } from './components';
import { BasicTable } from '../../components';
import { SnackbarContext } from '../../contexts';

const TraineeList = (props) => {
  const { match, history } = props;
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [page, setPage] = React.useState(0);
  const [details, setDetails] = React.useState({});

  const handleSort = (property) => {
    setOrder(order === 'asc' && orderBy === property ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (property) => {
    history.push(`${match.path}/${property}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = (openSnackbar, state) => {
    openSnackbar('success', 'Trainee Created Successfully');
    setOpen(false);
    console.log(state);
  };

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do yyyy, hh:mm:ss a');

  const handleEditDialogOpen = (traineeDetails) => {
    setEditOpen(true);
    setDetails(traineeDetails);
  };

  const handleDeleteDialogOpen = (traineeDetails) => {
    setDeleteOpen(true);
    setDetails(traineeDetails);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
  };

  const handleEditDialogSubmit = (openSnackbar, state) => {
    openSnackbar('success', 'Trainee Updated Successfully');
    setEditOpen(false);
    console.log(state);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = (openSnackbar) => {
    if (details.createdAt >= '2019-02-14') {
      openSnackbar('success', 'Trainee Deleted Successfully');
    } else {
      openSnackbar('error', 'Trainee cannot be Deleted');
    }
    setDeleteOpen(false);
    console.log(details);
  };

  return (
    <SnackbarContext.Consumer>
      {({ openSnackbar }) => (
        <>
          <CssBaseline />
          <Button size="large" variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginLeft: '10px' }}>
            Add Trainee
          </Button>
          <BasicTable
            id="id"
            data={trainees}
            columns={[
              {
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]}
            actions={[
              {
                icon: <EditIcon />,
                handler: handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: handleDeleteDialogOpen,
              },
            ]}
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
            onSelect={handleSelect}
            page={page}
            onChangePage={handleChangePage}
            count={100}
            rowsPerPage={5}
          />
          <FormDialog
            open={open}
            onClose={handleClose}
            onSubmit={(state) => handleSubmit(openSnackbar, state)}
          />
          <EditDialog
            open={editOpen}
            onClose={handleEditDialogClose}
            onSubmit={(state) => handleEditDialogSubmit(openSnackbar, state)}
            defaultValues={details}
          />
          <DeleteDialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            onDelete={() => handleDelete(openSnackbar)}
          />
        </>
      )}
    </SnackbarContext.Consumer>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default TraineeList;
