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
import {
  Snackbar,
  IconButton,
  Grid,
  Container,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import CloseSharp from '@material-ui/icons/CloseSharp';
import { getCategories, deleteCategory, addCategory } from '../api/admin/admin';
import CheckAuth from '../src/resusable/checkAuth';
import Header from '../src/resusable/header';
import Loading from '../src/resusable/spinner';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    padding: '1em',
  },

  label: {
    ...theme.typography.label,
  },
  button: {
    ...theme.typography.label,
    background: theme.palette.common.primary,
    color: '#fff',
    '&$disabled': {
      backgroundColor: '#e2e9ee',
      color: theme.palette.common.darkBlack,
    },
  },
  input: {
    fontFamily: 'Averta',
    fontSize: '1rem',
    color: theme.palette.common.darkBlack,
    lineHeight: 1.4,
    borderRadius: '3px',
    background: '#fbfbfd',
    boxShadow: 'none',
    marginTop: '3px',
    '&:hover': {
      border: '1px solid #899298',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px #dceefc',
    },
    '&::placeholder': {
      fontFamily: 'Averta',
      fontWeight: 400,
      fontSize: '1.1rem',
    },
  },
}));

export default function Categories(props) {
  const classes = useStyles();

  const [category, setCategory] = useState({
    name: '',
    title: '',
    heading: '',
    details: '',
    image: null,
  });
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });
  const deleteCategoryHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'delete',
      });
      let response = await deleteCategory(props.userToken, id);
      let result = await response.json();
      if (result.status === 'success') {
        setCategories(categories.filter((x) => x._id !== id));
        setShowToast({
          active: true,
          message: 'Category Deleted Successfully',
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
        message: 'Failed to Delete Category',
        severity: 'error',
      });
    }
  };
  const addCategoryHandler = async () => {
    try {
      setLoading({
        active: true,
        action: 'add',
      });
      let response = await addCategory(props.userToken, category);
      if (response.data.status === 'success') {
        setCategories([...categories, response.data.data.doc]);
        setShowToast({
          active: true,
          message: 'Category Added Successfully',
          severity: 'success',
        });
      }
      setCreateCategoryModal(false);
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
        message: 'Failed to add Category',
        severity: 'error',
      });
    }
  };
  const fetchCategories = async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });
      let response = await getCategories(props.userToken);
      let result = await response.json();
      if (result.status === 'success') {
        setCategories(result.data.doc);
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
    fetchCategories();
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
              <a>Admin dashboard</a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/users">
              <a>All Users</a>
            </Link>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          size="small"
          style={{ marginTop: '1em', marginBottom: '0.5em' }}
          onClick={() => setCreateCategoryModal(true)}
        >
          Add Category
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Heading</TableCell>
                <TableCell align="right">Details</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.heading}</TableCell>
                  <TableCell align="right">{row.details}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => deleteCategoryHandler(row._id)}
                      style={{ backgroundColor: 'red', color: '#fff' }}
                      disabled={loading && loading.action === 'delete'}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog
        open={createCategoryModal}
        keepMounted
        onClose={() => setCreateCategoryModal(false)}
        className={classes.root}
        aria-labelledby="simple-dialog-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogContent className={classes.root}>
          <span style={{ position: 'absolute', right: 5, top: 5 }}>
            <IconButton onClick={() => setCreateCategoryModal(false)}>
              <CloseSharp />
            </IconButton>
          </span>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Add Category </Typography>
            </Grid>

            <Grid item xs={12} container direction="column">
              <label className={classes.label}>Name</label>
              <input
                className={classes.input}
                value={category.name}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} container direction="column">
              <label className={classes.label}>Title</label>
              <input
                className={classes.input}
                value={category.title}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    title: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} container direction="column">
              <label className={classes.label}>Heading</label>
              <input
                className={classes.input}
                value={category.heading}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    heading: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} container direction="column">
              <label className={classes.label}>Details</label>
              <textarea
                className={classes.input}
                rows={2}
                value={category.details}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    details: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                onChange={(e) =>
                  setCategory({
                    ...category,
                    image: e.target.files[0],
                  })
                }
                type="file"
                style={{ display: 'none' }}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  component="span"
                >
                  Upload Image
                </Button>
              </label>
              {category.image !== null && <label>{category.image.name}</label>}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={
                  (loading && loading === 'add') ||
                  category.name.length <= 0 ||
                  category.title.length <= 0 ||
                  category.heading.length <= 0 ||
                  category.details.length <= 0 ||
                  category.image === null
                }
                className={classes.button}
                onClick={addCategoryHandler}
              >
                {loading.active && loading.action === 'add' ? (
                  <CircularProgress />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </CheckAuth>
  );
}
