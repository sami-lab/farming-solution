import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Chip,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import CheckAuth from '../src/resusable/checkAuth';
import Loading from '../src/resusable/spinner';
import Header from '../src/resusable/header';
import Footer from '../src/resusable/footer';
import { getAllShopProduct } from '../api/admin/admin';
import { deleteProduct } from '../api/product/product';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '10em',
    paddingRight: '10em',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '3em',
      paddingRight: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '1em',
      paddingRight: '1em',
    },
  },
  table: {
    minWidth: 650,
  },
  card: {
    padding: '2em 1em',
    boxShadow: 'rgba(100,100,111,0.2) 0px 7px 29px 0px',
    borderRadius: 20,
  },
  icon: {
    fontSize: '3rem',
    color: theme.palette.common.primary,
  },
  header: {
    ...theme.typography.h6,
  },
  tableItem: {
    ...theme.typography.label,
    fontWeight: 300,
  },
}));

export default function Manager(props) {
  const t = props.languageJson;
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });

  const fetchData = async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });
      let response = await getAllShopProduct(props.userToken);
      let result = await response.json();
      if (result.status === 'success') {
        setData(result.data.doc);
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
    fetchData();
  }, []);
  const deleteProductHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'delete',
      });
      const response = await deleteProduct(props.userToken, id);
      const result = await response.json();
      if (result.status !== 'Fail') {
        setShowToast({
          active: true,
          message: 'Item deleted Successfully',
          severity: 'success',
        });

        setData(data.filter((x) => x._id !== id));
      } else {
        setShowToast({
          active: true,
          message: result.message,
          severity: 'error',
        });
      }

      setLoading({
        active: false,
        action: '',
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: 'Something went wrong',
        severity: 'error',
      });
    }
  };
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
  if (!data || (loading && loading.action === 'page')) {
    return <Loading />;
  }
  return (
    <CheckAuth managerOnly {...props}>
      <Grid container direction="column">
        <Snackbar
          open={showToast.active}
          autoHideDuration={4000}
          onClose={handleToastClose}
        >
          <Alert onClose={handleToastClose} severity={showToast.severity}>
            {showToast.message}
          </Alert>
        </Snackbar>
        {/* header */}
        <Grid item>
          <Header {...props} languageJson={props.languageJson} />
        </Grid>
        {/* Overview  */}
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          className={classes.root}
        >
          <Typography variant="h4">Shop Products</Typography>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h4"
              style={{ cursor: 'pointer', color: theme.palette.common.primary }}
            >
              Back
            </Typography>
          </Link>
        </Grid>
        {/* for Products */}
        <Grid
          item
          xs={12}
          style={{ marginTop: '2em' }}
          className={classes.root}
        >
          <Grid
            container
            direction={matchesSM ? 'column' : 'row'}
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                elevation={2}
                className={classes.card}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.header}>Date</TableCell>
                      <TableCell className={classes.header} align="center">
                        Title
                      </TableCell>
                      <TableCell className={classes.header} align="center">
                        Category
                      </TableCell>
                      <TableCell className={classes.header} align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item._id} hover>
                        <TableCell className={classes.tableItem}>
                          {new Date(item.date).toLocaleDateString()}{' '}
                        </TableCell>
                        <TableCell className={classes.tableItem} align="center">
                          {item.title}
                        </TableCell>
                        <TableCell className={classes.tableItem} align="center">
                          {item.productCategory}
                        </TableCell>
                        <TableCell className={classes.tableItem} align="center">
                          <Grid container justifyContent="center">
                            <Link
                              href={`/updateProduct/${item._id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Button
                                size="small"
                                variant="primary"
                                style={{
                                  backgroundColor: theme.palette.common.primary,
                                }}
                              >
                                <EditIcon style={{ fill: '#fff' }} />
                              </Button>
                            </Link>

                            <Button
                              size="small"
                              variant="primary"
                              style={{
                                backgroundColor: theme.palette.common.primary,
                                marginLeft: '10px',
                              }}
                              disabled={
                                loading.active && loading.action === 'delete'
                              }
                              onClick={() => deleteProductHandler(item._id)}
                            >
                              <DeleteIcon style={{ fill: '#fff' }} />
                            </Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: '2em' }}>
          <Footer {...props} languageJson={props.languageJson} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
