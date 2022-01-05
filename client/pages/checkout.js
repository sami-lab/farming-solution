import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import { Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

import Checkout from "../src/components/checkout/checkout";
import { CardElement } from "@stripe/react-stripe-js";

import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";
import Loading from "../src/resusable/spinner";
import CheckAuth from "../src/resusable/checkAuth";

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
}));

export default function CheckoutProduct(props) {
  const t = props.languageJson;
  const router = useRouter();
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

  const p = JSON.parse(router.query.data);
  if (!Array.isArray(p)) {
    router.push("/cart");
  }
  const [products, setProducts] = useState(p);

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
          <Alert onClose={handleToastClose} severity={showToast.severity}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <Head>
          <title>Checkout</title>
        </Head>
        <Grid item container>
          <Header {...props} languageJson={t} />
        </Grid>
        <Grid item>
          <Checkout
            products={products}
            user={props.user}
            userToken={props.userToken}
            //checkoutHandler={checkoutHandler}
            languageJson={t}
            user={props.user}
          />
        </Grid>

        <Grid item style={{ marginTop: "2em" }}>
          <Footer {...props} languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
