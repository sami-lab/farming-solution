import React, { useEffect, useState } from "react";
import Head from "next/head";

import {
  Grid,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { Search } from "@material-ui/icons";

import RenderProducts from "../src/resusable/renderProducts";
import Purchases from "../src/components/purchases/purchases";
import NoRecords from "../src/components/purchases/noRecords";
import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";
import Loading from "../src/resusable/spinner";
import CheckAuth from "../src/resusable/checkAuth";
import { getOrders, download } from "../api/purchase";

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
  alert: {
    padding: "4px 16px",
  },
  label: {
    ...theme.typography.label,
  },
  input: {
    "&::placeholder": {
      fontFamily: "Averta",
      fontWeight: 400,
      fontSize: "1.1rem",
    },
  },
}));

export default function Purchase(props) {
  const t = props.languageJson;
  const classes = useStyles();
  const [loading, setLoading] = useState({
    active: false,
    action: "",
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: "",
    severity: "",
  });
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [searchPurchase, setSearchPurchase] = useState("");
  const [purchasings, setPurchasing] = useState([]);

  const loadOrders = async () => {
    try {
      setLoading({
        active: true,
        action: "page",
      });
      let response = await getOrders(props.userToken);
      let result = await response.json();
      if (result.status === "success") {
        setPurchasing(result.data.doc);
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
    loadOrders();
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

  if (loading.active && loading.action === "page") {
    return <Loading />;
  }

  return (
    <CheckAuth {...props}>
      <Grid container direction="column">
        <Snackbar
          open={showToast.active}
          autoHideDuration={4000}
          onClose={handleToastClose}
        >
          <Alert onClose={handleToastClose} severity={showToast.active}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <Head>
          <title>Purchase</title>
        </Head>
        <Grid item container>
          <Header {...props} languageJson={t} />
        </Grid>

        <Grid item style={{ marginTop: "2em" }} className={classes.root}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h1">{t["Purchases"]}</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <img
                  src="/dev/tile1.svg"
                  style={{
                    width: "1em",
                    height: "1em",
                    fill: "#000",
                  }}
                />
              </IconButton>
              <IconButton>
                <img
                  src="/dev/tile2.svg"
                  style={{ width: "1em", height: "1em" }}
                />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        <Grid item style={{ marginTop: "2em" }} className={classes.root}>
          <Grid container justify="space-between">
            <Grid item>
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "transparent",
                  padding: "10px 20px",
                }}
              >
                <label className={classes.label}>
                  {" "}
                  {t["Filter Purchases"]}{" "}
                </label>
              </Button>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Search"
                InputProps={{
                  classes: {
                    input: classes.input,
                  },
                  startAdornment: (
                    <Search style={{ fill: "gray", fontSize: "1.1rem" }} />
                  ),
                }}
                value={searchPurchase}
                onChange={(e) => setSearchPurchase(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.root}>
          {purchasings.length > 0 ? (
            <Purchases
              purchasings={purchasings.filter((x) =>
                x.productId.title.toLowerCase().includes(searchPurchase)
              )}
              languageJson={t}
            />
          ) : (
            <>
              <NoRecords languageJson={t} products={props.products} />
              {props.products && props.products.length > 0 && (
                <Grid item container style={{ marginTop: "2em" }}>
                  <RenderProducts
                    products={props.products.flatMap((x) =>
                      x.products.map((p) => p)
                    )}
                    md={2}
                    sm={4}
                    xs={6}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
        <Grid item container style={{ marginTop: "2em" }}>
          <Footer {...props} languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
