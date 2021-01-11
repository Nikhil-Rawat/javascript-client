/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
// import trainees from './data/trainee';
import { FormDialog, EditDialog, DeleteDialog } from './components';
import { BasicTable } from '../../components';
import { SnackbarContext } from '../../contexts';
import { callApi } from '../../libs/utils';
import { WithLoaderAndMessage } from '../../components/HOC';

const TraineeList = (props) => {
  const { match, history } = props;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({});
  const [records, setRecords] = useState({ TraineeArray: [], TotalCount: 0 });
  const [loading, setLoading] = useState(true);

  const EnhanchedTable = WithLoaderAndMessage(BasicTable);

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

  const handleSubmit = async (openSnackbar, state) => {
    setLoading(true);
    await callApi('trainee/create', state);
    if (localStorage.getItem('status') === '200') {
      openSnackbar('success', 'Trainee Created Successfully');
      setOpen(false);
      setLoading(false);
    } else {
      openSnackbar('error', 'Trainee Not Created');
      setLoading(false);
    }
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
  };

  const handleTableData = async () => {
    const response = await callApi('trainee/getall', { }, { skip: page * 5, limit: 5 });
    let TraineeData = [];
    let totalcount = 0;
    if (response.data) {
      TraineeData = response.data.data[0].records;
      totalcount = response.data.data[0].Total_Count;
      localStorage.setItem('detailsData', JSON.stringify(TraineeData));
      setRecords({ TraineeArray: TraineeData, TotalCount: totalcount });
      setLoading(false);
    } else {
      setLoading(false);
      return [];
    }
    return null;
  };

  React.useEffect(() => {
    handleTableData();
  }, [open, page]);

  return (
    <SnackbarContext.Consumer>
      {({ openSnackbar }) => (
        <>
          <CssBaseline />
          <Button size="large" variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginLeft: '10px' }}>
            Add Trainee
          </Button>
          <EnhanchedTable
            id="_id"
            data={records.TraineeArray}
            loader={loading}
            disabled={loading}
            dataLength={records.TraineeArray.length}
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
            count={records.TotalCount}
            rowsPerPage={5}
          />
          <FormDialog
            loading={loading}
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
