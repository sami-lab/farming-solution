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
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import CheckAuth from "../src/resusable/checkAuth";
import Loading from "../src/resusable/spinner";
import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";
import { getAllShopOrder } from "../api/admin/admin";
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

const licenseType = [
  { value: "personalLicence", label: "Personal" },
  { value: "commercialLicence", label: "Commercial" },
  { value: "extendedCommercialLicence", label: "Extended Commercial" },
];
export default function Manager(props) {
  const t = props.languageJson;
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  const [data, setData] = useState([]);
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
      let response = await getAllShopOrder(props.userToken);
      let result = await response.json();
      if (result.status === "success") {
        setData(result.data.doc);
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
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          className={classes.root}
        >
          <Typography variant="h4">Shop Orders</Typography>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Typography
              variant="h4"
              style={{ cursor: "pointer", color: theme.palette.common.primary }}
            >
              Back
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
                    Username
                  </TableCell>
                  <TableCell className={classes.header} align="center">
                    License
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
                {data.map((item) => (
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
                      {item.userId?.name}
                    </TableCell>
                    <TableCell className={classes.tableItem} align="center">
                      {licenseType.find((x) => x.value === item.license).label}
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

        <Grid item style={{ marginTop: "2em" }}>
          <Footer {...props} languageJson={props.languageJson} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
