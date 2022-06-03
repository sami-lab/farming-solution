import React, { useState, useEffect } from "react";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import WeekSalesIcon from "@material-ui/icons/Loyalty";
import TotalEarningIcon from "@material-ui/icons/MonetizationOn";
import MonthlySalesIcon from "@material-ui/icons/Receipt";
import ProductIcon from "@material-ui/icons/AddShoppingCart";
import CheckAuth from "../src/resusable/checkAuth";
import Loading from "../src/resusable/spinner";
import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";
import { getShopDashboardData } from "../api/admin/admin";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("../src/components/dashboard/chart"), {
  ssr: false,
});
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10em",
    paddingRight: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "3em",
      paddingRight: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
    },
  },
  table: {
    minWidth: 650,
  },
  card: {
    padding: "2em 1em",
    boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
    borderRadius: 20,
  },
  icon: {
    fontSize: "3rem",
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
const sampleData = {
  shopId: 1,
  shopName: "Sam Store",
  lastWeekSalesGraph: [
    { y: 300878, label: "Monday" },
    { y: 266455, label: "Tuesday" },
    { y: 169709, label: "Wednesday" },
    { y: 158400, label: "Thursday" },
    { y: 142503, label: "Friday" },
    { y: 101500, label: "Saturday" },
    { y: 97800, label: "Sunday" },
  ],
  lastYearSalesGraph: [
    { y: 300878, label: "Jan" },
    { y: 266455, label: "Feb" },
    { y: 169709, label: "March" },
    { y: 158400, label: "April" },
    { y: 142503, label: "May" },
    { y: 101500, label: "Jun" },
    { y: 101500, label: "Jul" },
    { y: 97800, label: "Aug" },
    { y: 300878, label: "Sept" },
    { y: 266455, label: "Oct" },
    { y: 169709, label: "Nov" },
    { y: 158400, label: "Dec" },
  ],
  lastMonthSalesGraph: [
    { x: "2012, 1, 1", y: 26 },
    { x: "2012, 1, 2", y: 66 },
    { x: "2012, 1, 3", y: 38 },
    { x: "2012, 1, 4", y: 60 },
    { x: "2012, 1, 5", y: 43 },
    { x: "2012, 1, 6", y: 53 },
    { x: "2012, 1, 7", y: 29 },
    { x: "2012, 1, 8", y: 60 },
    { x: "2012, 1, 11", y: 41 },
    { x: "2012, 1, 12", y: 26 },
    { x: "2012, 1, 13", y: 66 },
    { x: "2012, 1, 14", y: 38 },
    { x: "2012, 1, 15", y: 60 },
    { x: "2012, 1, 16", y: 43 },
    { x: "2012, 1, 17", y: 54 },
    { x: "2012, 1, 18", y: 66 },
    { x: "2012, 1, 19", y: 60 },
    { x: "2012, 1, 20", y: 53 },
    { x: "2012, 1, 21", y: 60 },
    { x: "2012, 1, 22", y: 43 },
    { x: "2012, 1, 23", y: 53 },
    { x: "2012, 1, 24", y: 29 },
    { x: "2012, 1, 25", y: 60 },
    { x: "2012, 1, 26", y: 41 },
    { x: "2012, 1, 27", y: 26 },
    { x: "2012, 1, 28", y: 29 },
    { x: "2012, 1, 29", y: 60 },
    { x: "2012, 1, 30", y: 41 },
  ],
  totalSales: 25000,
  lastMonthSales: 2500,
  lastWeekSales: 544,
  recentSales: [
    {
      _id: "1",
      Date: "2021-10-03T18:41:39.786Z",
      productId: {
        title: "Canva Template",
        productCategory: "Graphics",
      },
      userId: {
        name: "Sami",
      },

      totalAmount: 300,
      quantity: 1,
    },
    {
      _id: "2",
      Date: "2021-10-03T18:41:39.786Z",
      productId: {
        title: "Canva Template",
        productCategory: "Graphics",
      },
      userId: {
        name: "Sami",
      },
      totalAmount: 300,
      quantity: 1,
    },
    {
      _id: "3",
      Date: "2021-10-03T18:41:39.786Z",
      productId: {
        title: "Canva Template",
        productCategory: "Graphics",
      },
      userId: {
        name: "Sami",
      },
      totalAmount: 300,
      quantity: 1,
    },
    {
      _id: "4",
      Date: "2021-10-03T18:41:39.786Z",
      productId: {
        title: "Canva Template",
        productCategory: "Graphics",
      },
      userId: {
        name: "Sami",
      },
      totalAmount: 300,
      quantity: 1,
    },
    {
      _id: "5",
      Date: "2021-10-03T18:41:39.786Z",
      productId: {
        title: "Canva Template",
        productCategory: "Graphics",
      },
      userId: {
        name: "Sami",
      },
      totalAmount: 300,
      quantity: 1,
    },
  ],
  recentProducts: [
    {
      _id: "1",
      date: "2021-10-03T18:41:39.786Z",
      title: "Canva Template",
      productCategory: "Graphics",
      tags: ["asdsda", "dssasa", "rrrrrr"],
    },
    {
      _id: "2",
      date: "2021-10-03T18:41:39.786Z",
      title: "Canva Template",
      productCategory: "Graphics",
      tags: ["asdsda", "dssasa", "rrrrrr"],
    },
    {
      _id: "3",
      date: "2021-10-03T18:41:39.786Z",
      title: "Canva Template",
      productCategory: "Graphics",
      tags: ["asdsda", "dssasa", "rrrrrr"],
    },
    {
      _id: "4",
      date: "2021-10-03T18:41:39.786Z",
      title: "Canva Template",
      productCategory: "Graphics",
      tags: ["asdsda", "dssasa", "rrrrrr"],
    },
    {
      _id: "5",
      date: "2021-10-03T18:41:39.786Z",
      title: "Canva Template",
      productCategory: "Graphics",
      tags: ["asdsda", "dssasa", "rrrrrr"],
    },
  ],
  TotalProducts: 25,
};

export default function Manager(props) {
  const t = props.languageJson;
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  const [data, setData] = useState();
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: "",
    severity: "",
  });

  const fetchData = async () => {
    try {
      setLoading({
        active: true,
        action: "page",
      });
      let response = await getShopDashboardData(props.userToken);
      let result = await response.json();
      if (result.status === "success") {
        setData(result.data);
      }
      setLoading({
        active: false,
        action: "",
      });
    } catch (e) {
      console.log(e.message);
      setLoading({
        active: false,
        action: "",
      });
      setShowToast({
        active: true,
        message: "Failed to Load Products",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    // For sample
    // setLoading({
    //   active: true,
    //   action: 'page',
    // });
    // setTimeout(() => {
    //   setData(sampleData);
    //   setLoading({
    //     active: false,
    //     action: '',
    //   });
    // }, 1000);

    fetchData();
  }, []);

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast({
      active: false,
      message: "",
      severity: "",
    });
  };
  if (!data || (loading && loading.action === "page")) {
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
        <Grid item xs={12} container className={classes.root}>
          <Typography variant="h4">Overview</Typography>
        </Grid>
        {/* For cards */}
        <Grid
          item
          xs={12}
          style={{ marginTop: "1em" }}
          className={classes.root}
        >
          <Grid container justify="center" spacing={4}>
            <Grid item md={3} sm={6}>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                className={classes.card}
                component={Paper}
                spacing={2}
              >
                <Grid item>
                  <TotalEarningIcon className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Total Earning</Typography>
                  <Typography variant="h5">${data.totalSales}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3} sm={6}>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                className={classes.card}
                component={Paper}
                spacing={2}
              >
                <Grid item>
                  <MonthlySalesIcon className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Monthly Sales</Typography>
                  <Typography variant="h5">${data.lastMonthSales}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3} sm={6}>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                className={classes.card}
                component={Paper}
                spacing={2}
              >
                <Grid item>
                  <WeekSalesIcon className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Weekly Sales</Typography>
                  <Typography variant="h5">${data.lastWeekSales}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3} sm={6}>
              <Grid
                container
                wrap="nowrap"
                alignItems="center"
                className={classes.card}
                component={Paper}
                spacing={2}
              >
                <Grid item>
                  <ProductIcon className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography variant="h4">Total Products</Typography>
                  <Typography variant="h5">{data.TotalProducts}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* for chart */}
        <Grid
          item
          xs={12}
          style={{ marginTop: "1em" }}
          className={classes.root}
        >
          <Chart
            lastWeekSalesGraph={data.lastWeekSalesGraph}
            lastMonthSalesGraph={data.lastMonthSalesGraph.map((it) => {
              return {
                ...it,
                x: new Date(it.x),
              };
            })}
            lastYearSalesGraph={data.lastYearSalesGraph}
          />
        </Grid>

        {/* recent Sales  */}
        <Grid
          item
          xs={12}
          style={{ marginTop: "2em" }}
          container
          justifyContent="space-between"
          className={classes.root}
        >
          <Typography variant="h4">Recent Sales</Typography>
          <Link href="/shopOrders">
            <Typography
              variant="h4"
              style={{ cursor: "pointer", color: theme.palette.common.primary }}
            >
              All Orders
            </Typography>
          </Link>
        </Grid>
        {/* for sales tables */}
        <Grid
          item
          style={{ marginTop: "1em" }}
          container
          xs={12}
          className={classes.root}
        >
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
                    Email
                  </TableCell>

                  <TableCell className={classes.header} align="center">
                    Amount
                  </TableCell>
                  <TableCell className={classes.header} align="center">
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.recentSales.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell className={classes.tableItem}>
                      {new Date(item.Date).toLocaleDateString()}{" "}
                    </TableCell>
                    <TableCell className={classes.tableItem} align="center">
                      {item.productId?.title}
                    </TableCell>
                    <TableCell className={classes.tableItem} align="center">
                      {item.productId?.productCategory}
                    </TableCell>
                    <TableCell className={classes.tableItem} align="center">
                      {item.userId?.email}
                    </TableCell>

                    <TableCell className={classes.tableItem} align="center">
                      {item.totalAmount}
                    </TableCell>
                    <TableCell className={classes.tableItem} align="center">
                      {item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* recent Products  */}
        <Grid
          item
          style={{ marginTop: "2em" }}
          container
          justifyContent="space-between"
          xs={12}
          className={classes.root}
        >
          <Typography variant="h4">Recent Products</Typography>
          <Link href="/shopProducts">
            <Typography
              variant="h4"
              style={{ cursor: "pointer", color: theme.palette.common.primary }}
            >
              All Products
            </Typography>
          </Link>
        </Grid>
        {/* for Products */}
        <Grid
          item
          xs={12}
          style={{ marginTop: "2em" }}
          className={classes.root}
        >
          <Grid
            container
            direction={matchesSM ? "column" : "row"}
            alignItems="stretch"
            spacing={1}
          >
            <Grid item md={8} xs={12}>
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
                        Tags
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.recentProducts.map((item) => (
                      <TableRow key={item._id} hover>
                        <TableCell className={classes.tableItem}>
                          {new Date(item.date).toLocaleDateString()}{" "}
                        </TableCell>
                        <TableCell className={classes.tableItem} align="center">
                          {item.title}
                        </TableCell>
                        <TableCell className={classes.tableItem} align="center">
                          {item.productCategory}
                        </TableCell>
                        <TableCell className={classes.tableItem} align="center">
                          <Grid container spacing={1}>
                            {item.tags.map((t, ind) => (
                              <Grid item key={ind}>
                                <Chip label={t} />
                              </Grid>
                            ))}
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid
                component={Paper}
                container
                direction="column"
                justify="center"
                style={{
                  height: "100%",
                  backgroundColor: "black",
                  color: "white",
                  padding: "1rem",
                }}
              >
                <Typography variant="h1" style={{ color: "inherit" }}>
                  <span style={{ fontWeight: 500 }}> Welcome </span>,{" "}
                  {data.shopName}
                </Typography>

                <Typography variant="caption" style={{ color: "inherit" }}>
                  Total {data.TotalProducts} Products Registered on your shop.
                  Register new Product now to boost your sales.
                </Typography>
                <Link href={"/createProduct"}>
                  <Button
                    variant="contained"
                    disableElevation
                    style={{
                      marginTop: "1em",
                      backgroundColor: "green",
                      width: "100%",
                      color: "white",
                    }}
                  >
                    Add Product
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: "2em" }}>
          <Footer {...props} languageJson={props.languageJson} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
