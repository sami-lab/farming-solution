import React, { useEffect, useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

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

import RenderProducts from "../src/resusable/renderProducts";
import Empty from "../src/components/cart/empty";
import CartItems from "../src/components/cart/cartItems";

import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";
import Loading from "../src/resusable/spinner";
import CheckAuth from "../src/resusable/checkAuth";

import { addToCart, getMyCart, deleteCart } from "../api/cart/cart";
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

const sampleData = [
  {
    id: "1",
    title: "Love and Beach Family",
    shopOwner: "KetteCreate",
    category: "Fonts",
    price: "18",
    image: "/products/11-.jpg",
  },
  {
    id: "2",
    title: "Love and Beach Family",
    shopOwner: "Bramcreative",
    category: "Fonts",
    price: "10",
    image: "/products/01_preview1-.jpg",
  },
  {
    id: "3",
    title: "Doodle Flowers Logo",
    shopOwner: "KetteCreate",
    category: "Templates",
    price: "10",
    image:
      "/products/animated-canva-backgrounds-instagram-stories-beige-organic-sand-tones-ana-yvy-11-.webp",
  },
  {
    id: "4",
    title: "Love and Beach Family",
    shopOwner: "KetteCreate",
    category: "Fonts",
    price: "18",
    image: "/products/11-.jpg",
  },
];

const cartSample = [
  {
    id: 1,
    product: {
      id: 1,
      image: "/products/01_preview1-.jpg",
      title: "Love and Beach Family",
      shopOwner: "KetteCreate",
      personalLicence: 9,
      commercialLicence: 16,
      extendedCommercialLicence: 31,
    },
    license: "personalLicence",
    quantity: 1,
  },
];
export default function Cart(props) {
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

  const [cartItems, setCartItems] = useState([]);

  const findUserCarts = async () => {
    try {
      setLoading({
        active: true,
        action: "page",
      });

      let response = await getMyCart(props.userToken);

      let result = await response.json();
      if (result.status === "success") {
        //console.log(result.data.doc);
        setCartItems(result.data.doc);
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
        message: "Failed to Load Cart Data",
        severity: "error",
      });
    }
  };
  const addToCartHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: "addToCart",
      });
      const response = await addToCart(props.userToken, id);
      const result = response.data;
      if (result.status === "success") {
        setShowToast({
          active: true,
          message: "Item Added To Cart Successfully",
          severity: "success",
        });
        await findUserCarts();
      } else {
        setShowToast({
          active: true,
          message: "Failed to Add Item to Cart",
          severity: "error",
        });
      }
      setLoading({
        active: false,
        action: "",
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: "",
      });
      setShowToast({
        active: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  const removeCartHandler = async (id) => {
    try {
      setLoading({
        active: true,
        action: "addToCart",
      });
      const response = await deleteCart(props.userToken, id);
      const result = await response.json();
      console.log(id, cartItems, "-----------------------");
      setShowToast({
        active: true,
        message: "Item deleted Successfully",
        severity: "success",
      });

      setCartItems(cartItems.filter((x) => x._id !== id));

      setLoading({
        active: false,
        action: "",
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: "",
      });
      setShowToast({
        active: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    findUserCarts();
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
          <Alert onClose={handleToastClose} severity={showToast.severity}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <Head>
          <title>Cart</title>
        </Head>
        <Grid item container>
          <Header {...props} languageJson={t} />
        </Grid>
        <Grid item>
          {cartItems.length > 0 ? (
            <CartItems
              cartItems={cartItems}
              removeCartHandler={removeCartHandler}
              languageJson={t}
            />
          ) : (
            <Empty languageJson={t} />
          )}
        </Grid>
        {props.products && props.products.length > 0 && (
          <Grid item style={{ marginTop: "2em" }} className={classes.root}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1" style={{ fontWeight: "700" }}>
                  {t["Top Selling Products"]}
                </Typography>
              </Grid>
              <Grid item>
                <RenderProducts
                  products={props.products.flatMap((x) =>
                    x.products.map((p) => p)
                  )}
                  cart={true}
                  cartHandler={addToCartHandler}
                  loading={loading.active && loading.action === "addToCart"}
                  md={2}
                  sm={4}
                  xs={6}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item style={{ marginTop: "2em" }}>
          <Footer {...props} languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
