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

const { publicRuntimeConfig } = getConfig();
import getConfig from "next/config";

import Header from "../../src/resusable/header";
import Footer from "../../src/resusable/footer";
import Update from "../../src/components/products/update";
import CheckAuth from "../../src/resusable/checkAuth";

import { updateProduct, getProductById } from "../../api/product/product";

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

export default function UpdateProductPage(props) {
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

  useEffect(async () => {
    try {
      setLoading({
        active: true,
        action: "page",
      });

      let response = await getProductById(router.query.id);
      let result = await response.json();
      if (result.status === "success") {
        setProduct({
          ...result.data.doc,
          deletedImages: [],
          images: result.data.doc.images.map((x) => {
            return {
              img: publicRuntimeConfig.backend + "/files/" + x,
              new: false,
            };
          }),
        });
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
        message: t["Failed to Load Shop Data"],
        severity: "error",
      });
    }
  }, [router.query.id]);

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
      let newImages = [];
      let newImagesIndex = [];
      product.images.map((img, ind) => {
        if (img.new === true) {
          {
            newImages.push(img.img);
            newImagesIndex.push(ind);
          }
        }
      });
      const response = await updateProduct(props.userToken, router.query.id, {
        ...product,
        newImages: newImages,
        newImagesIndex: newImagesIndex,
      });
      const result = response.data;
      if (result.status === "success") {
        setShowToast({
          active: true,
          message: "Done",
          severity: "success",
        });
        router.push(
          "/" + props.user.shop.shopName + "/" + result.data.doc.title
        );
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
          <Update
            product={product}
            setProduct={setProduct}
            categories={props.categories}
            shopData={props.user.shop}
            languageJson={t}
          />
        </Grid>
        <Grid item>
          <Footer {...props} languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
