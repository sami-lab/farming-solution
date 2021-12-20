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

import { getShops, approveShop, deleteShop } from '../api/shop/shop';
import CheckAuth from '../src/resusable/checkAuth';
import Loading from '../src/resusable/spinner';
import { Button } from '@material-ui/core';
import Header from '../src/resusable/header';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Admin(props) {
  const t = props.languageJson;

  const classes = useStyles();

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });
  const rejectShop = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'delete',
      });
      let response = await deleteShop(props.userToken, id);
      let result = await response.json();
      if (result.status === 'success') {
        setShops(shops.filter((x) => x.id !== id));
        setShowToast({
          active: true,
          message: 'Shop Deleted Successfully',
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
        message: 'Failed to Delete Shop',
        severity: 'error',
      });
    }
  };
  const approveShopHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'approve',
      });
      let response = await approveShop(props.userToken, id);
      let result = await response.json();
      if (result.status === 'success') {
        setShops(
          shops.map((x) => {
            if (x.id === id) {
              x.shopStatus = true;
            }
            return x;
          })
        );
        setShowToast({
          active: true,
          message: 'Shop Approved Successfully',
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
  const fetchShops = async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });
      let response = await getShops(props.userToken);
      let result = await response.json();
      if (result.status === 'success') {
        setShops(result.data.doc);
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
    fetchShops();
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
      <Header {...props} languageJson={t} />

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
            <Link href="/users">
              <a>All Users</a>
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
                <TableCell>Email</TableCell>
                <TableCell align="right">Shop URL</TableCell>
                <TableCell align="right">Design Portfolio</TableCell>
                <TableCell align="right">Why Creative Market</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shops.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.managerId.email}
                  </TableCell>
                  <TableCell align="right">{row.productUrl}</TableCell>
                  <TableCell align="right">{row.portfolioUrl}</TableCell>
                  <TableCell align="right">{row.whyChooseUs}</TableCell>
                  <TableCell align="right">
                    {row.shopStatus ? (
                      new Date(row.createdAt).toDateString()
                    ) : (
                      <Grid container spacing={1}>
                        <Grid item>
                          <Button
                            variant="primary"
                            onClick={() => approveShopHandler(row.id)}
                            style={{ color: '#fff' }}
                            disabled={loading && loading.action === 'approve'}
                          >
                            Approve
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            onClick={() => rejectShop(row.id)}
                            style={{ backgroundColor: 'red', color: '#fff' }}
                            disabled={loading && loading.action === 'delete'}
                          >
                            Reject
                          </Button>
                        </Grid>
                      </Grid>
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
