import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Snackbar, Grid, Container, Typography } from '@material-ui/core/';
import { Alert } from '@material-ui/lab';

import { getUsers, blockUser, unBlockUser } from '../api/admin/admin';
import CheckAuth from '../src/resusable/checkAuth';
import Loading from '../src/resusable/spinner';
import { Button } from '@material-ui/core';
import Header from '../src/resusable/header';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function users(props) {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });

  const blockUserHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'block',
      });
      let response = await blockUser(props.userToken, id);
      let result = await response.json();
      if (result.status === 'success') {
        setUsers(
          users.map((x) => {
            if (x.id === id) {
              x.active = false;
            }
            return x;
          })
        );
        setShowToast({
          active: true,
          message: 'User Blocked Successfully',
          severity: 'success',
        });
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (e) {
      console.log(e.message);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: 'Failed to block user',
        severity: 'error',
      });
    }
  };
  const unBlockUserHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'unblock',
      });
      let response = await unBlockUser(props.userToken, id);
      let result = await response.json();
      if (result.status === 'success') {
        setUsers(
          users.map((x) => {
            if (x.id === id) {
              x.active = true;
            }
            return x;
          })
        );
        setShowToast({
          active: true,
          message: 'User unblocked Successfully',
          severity: 'success',
        });
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (e) {
      console.log(e.message);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: 'Failed to Load Products',
        severity: 'error',
      });
    }
  };
  const fetchUsers = async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });
      let response = await getUsers(props.userToken);
      let result = await response.json();
      if (result.status === 'success') {
        setUsers(result.data.doc);
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (e) {
      console.log(e.message);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: 'Failed to Load Products',
        severity: 'error',
      });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast({
      active: false,
      message: '',
      severity: '',
    });
  };
  if (loading && loading.action === 'page') {
    return <Loading />;
  }
  return (
    <CheckAuth adminOnly {...props}>
      <Header {...props} />
      <Container maxWidth="md" style={{ paddingTop: '5em' }}>
        <Snackbar
          open={showToast.active}
          autoHideDuration={4000}
          onClose={handleToastClose}
        >
          <Alert onClose={handleToastClose} severity={showToast.severity}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <Grid
          container
          justifyContent="space-between"
          style={{ marginTop: '2em', marginBottom: '2em' }}
        >
          <Grid item>
            <Link href="/adminDashboard">
              <a>Back to Dashboard</a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/categories">
              <a>All Categories</a>
            </Link>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.firstName
                      ? row.firstName + ' ' + row.lastName
                      : row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.userName}</TableCell>
                  <TableCell align="right">
                    {row.active ? (
                      <Button
                        variant="primary"
                        onClick={() => blockUserHandler(row.id)}
                        style={{
                          color: '#fff',
                          backgroundColor: 'red',
                          width: '110px',
                        }}
                        disabled={
                          (loading && loading.action === 'block') ||
                          row.roles.some((x) => x.name === 'Admin')
                        }
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => unBlockUserHandler(row.id)}
                        style={{
                          color: '#fff',
                          backgroundColor: '#13AA52',
                          width: '110px',
                        }}
                        disabled={loading && loading.action === 'unblock'}
                      >
                        Unblock
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </CheckAuth>
  );
}
