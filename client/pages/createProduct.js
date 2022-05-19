import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  useMediaQuery,
  useTheme,
  Button,
  Typography,
  Divider,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/styles";

import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";
import Create from "../src/components/products/create";
import CheckAuth from "../src/resusable/checkAuth";

import { createProduct } from "../api/product/product";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "9em",
    paddingRight: "9em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "3em",
      paddingRight: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
    },
  },
}));

export default function CreateShop(props) {
  const t = props.languageJson;

  const theme = useTheme();
  const router = useRouter();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
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
  const [product, setProduct] = useState({
    title: "",
    images: [],
    details: "",
    productCategory: "",
    description: "",
    price: "",
    unit: "",
    deliveryPrice: "",
    date: Date.now(),
    tags: [],
  });

  const onSubmitHandler = async () => {
    ///Applying all validation
    if (
      product.title === "" ||
      product.productCategory === "" ||
      product.description === "" ||
      product.details === "" ||
      product.price === "" ||
      product.deliveryPrice === "" ||
      product.tags.length <= 0
    ) {
      setShowToast({
        active: true,
        message: t["Please fill all fields to continue"],
        severity: "error",
      });
      return;
    }
    if (product.images.length <= 0) {
      setShowToast({
        active: true,
        message: t["Please upload product images to continue"],
        severity: "error",
      });
      return;
    }

    try {
      setLoading({
        active: true,
        action: "submit",
      });
      const response = await createProduct(props.userToken, product);
      const result = response.data;
      if (result.status === "success") {
        setShowToast({
          active: true,
          message: "Done",
          severity: "success",
        });
        router.push(props.user.shop?.shopName + "/" + result.data.doc.title);
      } else {
        setShowToast({
          active: true,
          message: t["Failed to Create Product"],
          severity: "error",
        });
      }
      setLoading({
        active: false,
        action: "",
      });
    } catch (err) {
      console.log(err.response.data.error);
      setLoading({
        active: false,
        action: "",
      });
      setShowToast({
        active: true,
        message: err?.response?.data?.error
          ? err.response.data.error
          : t["Something went wrong"],
        severity: "error",
      });
    }
  };

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
        <Grid item container>
          <Header {...props} languageJson={t} />
        </Grid>
        {/* Save Button */}
        <Grid
          item
          container
          justify="flex-end"
          style={{ marginTop: matchesSM ? "1em" : "1.5em" }}
          className={classes.root}
        >
          <Button
            variant="contained"
            size="small"
            style={{
              background: theme.palette.common.primary,
              padding: "5px 30px",
              marginRight: "1em",
            }}
            onClick={onSubmitHandler}
            disabled={loading.active && loading.action === "submit"}
          >
            <Typography variant="h6" style={{ color: "#fff" }}>
              {loading.active && loading.action === "submit" ? (
                <CircularProgress />
              ) : (
                t["Save"]
              )}
            </Typography>
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={{
              backgroundColor: "transparent",
              padding: "5px 30px",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: theme.palette.common.primary,
                borderColor: theme.palette.common.primary,
              }}
            >
              {t["Close"]}
            </Typography>
          </Button>
        </Grid>
        {/* Divider */}
        <Grid item style={{ marginTop: "1em" }}>
          <Divider
            style={{ color: theme.palette.common.darkBlack, height: "3px" }}
          />
        </Grid>
        {/* Form */}
        <Grid
          item
          style={{ marginTop: "2em", marginBottom: "2em" }}
          className={classes.root}
        >
          <Create
            product={product}
            setProduct={setProduct}
            categories={props.categories}
            shopData={props.user.shop}
            languageJson={t}
          />
        </Grid>
        <Grid item container>
          <Footer {...props} languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
