import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
const { publicRuntimeConfig } = getConfig();

import Link from "next/link";
import {
  Button,
  Grid,
  Typography,
  useTheme,
  TextField,
  MenuItem,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Alert } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
    ...theme.typography.input,
    borderRadius: "3px",
    background: "#fbfbfd",
    boxShadow: "none",
    marginTop: "3px",
    "&::placeholder": {
      fontFamily: "Averta",
      fontWeight: 400,
      fontSize: "1.1rem",
    },
  },
  inputOutline: {
    border: "1px solid #899298",
  },
}));

export default function Cart(props) {
  const t = props.languageJson;
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const [showToast, setShowToast] = useState({
    active: false,
    message: "",
    severity: "",
  });
  const [cartItems, setCartItems] = useState(props.cartItems);
  useEffect(() => {
    setCartItems(props.cartItems);
  }, [props.cartItems]);
  const redirectToCheckout = () => {
    if (cartItems.some((item) => item.quantity <= 0 || item.quantity === "")) {
      setShowToast({
        active: true,
        message: "Quantity cannot be zero or empty",
        severity: "error",
      });
      return;
    }
    const query = cartItems.map((item) => {
      return {
        id: item.product._id,
        quantity: item.quantity,
        image: item.product.images[0],
        title: item.product.title,
        shopId: item.product.shopId.id,
        shopName: item.product.shopId.shopName,
        price: item.product.price,
        deliveryPrice: item.product.deliveryPrice,
        unit: item.product.unit,
      };
    });
    router.push({
      pathname: "/checkout",
      query: {
        data: JSON.stringify(query),
      },
    });
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
      {/* heading Your Cart*/}
      <Grid
        item
        container
        style={{ marginTop: "2em" }}
        className={classes.root}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="subtitle1">{t["Your Cart"]}</Typography>
        </Grid>
        <Grid item style={{ marginLeft: "1em" }}>
          <Typography
            variant="h3"
            style={{ textTransform: "none", marginTop: "0.1em" }}
          >
            <Link href="/purchase">
              <a
                style={{
                  textDecoration: "none",
                  color: theme.palette.common.primary,
                }}
              >
                {" "}
                {t["View Past Purchases"]}
              </a>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      {/* cart Items */}
      <Grid
        item
        container
        style={{ marginTop: "1em" }}
        className={classes.root}
        justify="space-between"
      >
        <Grid item md={8} style={{ paddingRight: "1em" }}>
          <Grid
            container
            direction="column"
            style={{ borderTop: "1px solid #d5d5d8" }}
          >
            {props.cartItems.length > 0 &&
              cartItems.map((item, ind) => (
                <Grid
                  item
                  style={{
                    borderBottom: "1px solid #d5d5d8",
                    padding: "24px 0",
                  }}
                  key={ind}
                >
                  <Grid container alignItems="center">
                    {/* for image */}
                    <Grid item>
                      <img
                        src={
                          publicRuntimeConfig.backend +
                          "/files/" +
                          item.product.images[0]
                        }
                        style={{
                          width: "145px",
                          height: "96px",
                          marginRight: "0.4em",
                        }}
                      />
                    </Grid>
                    {/* For quantity */}
                    <Grid
                      item
                      container
                      direction="column"
                      style={{
                        flex: 1,
                        marginLeft: "0.5em",
                        alignSelf: "flex-start",
                      }}
                    >
                      {/* for title */}
                      <Grid item>
                        <Typography variant="subtitle2">
                          {item.product.title} by{" "}
                          <span style={{ color: theme.palette.common.primary }}>
                            {" "}
                            {item.product.shopId.shopName}
                          </span>
                        </Typography>
                      </Grid>
                      {/* for price and quantity */}
                      <Grid item style={{ marginTop: "0.3em" }}>
                        <Grid container spacing={2}>
                          {" "}
                          {/* quantity */}
                          <Grid item style={{ alignSelf: "flex-end" }}>
                            <Grid container alignItems="center">
                              {/* <IconButton
                                disableTouchRipple={true}
                                style={{
                                  padding: 0,
                                  backgroundColor: "transparent",
                                  opacity: item.quantity === 0.5 ? 0.3 : 1,
                                }}
                                disabled={item.quantity === 0.5}
                                onClick={() => {
                                  setCartItems(() => {
                                    return cartItems.map((x) => {
                                      if (x._id == item._id) {
                                        x.quantity = x.quantity - 0.5;
                                      }
                                      return x;
                                    });
                                  });
                                }}
                              >
                                <RemoveIcon
                                  style={{
                                    fill: theme.palette.common.primary,
                                    fontSize: "1.7rem",
                                  }}
                                />
                              </IconButton> */}
                              {/* <Typography
                                className={classes.label}
                                style={{
                                  marginLeft: "0.5em",
                                  marginRight: "0.5em",
                                }}
                              >
                                {" "}
                                {item.quantity}{" "}
                                {item.product.unit ? item.product.unit : "seat"}
                                {item.quantity === 1 ? "" : "s"}
                              </Typography> */}
                              <TextField
                                type="number"
                                inputProps={{
                                  min: 0.1,
                                }}
                                InputProps={{
                                  classes: {
                                    input: classes.input,
                                  },
                                  endAdornment: (
                                    <Typography variant="subtitle2">
                                      {item.product.unit
                                        ? item.product.unit
                                        : "seat"}
                                    </Typography>
                                  ),
                                }}
                                style={{
                                  width: "6em",
                                  textAlign: "right",
                                }}
                                className={classes.label}
                                value={item.quantity}
                                onChange={(e) => {
                                  setCartItems(() => {
                                    return cartItems.map((x) => {
                                      if (x._id === item._id) {
                                        x.quantity = e.target.value;
                                      }
                                      return x;
                                    });
                                  });
                                }}
                              />
                              {/* <IconButton
                                disableTouchRipple={true}
                                style={{
                                  padding: 0,
                                  backgroundColor: "transparent",
                                }}
                                onClick={() => {
                                  setCartItems(() => {
                                    return cartItems.map((x) => {
                                      if (x._id === item._id) {
                                        x.quantity = x.quantity + 0.5;
                                      }
                                      return x;
                                    });
                                  });
                                }}
                              >
                                <AddIcon
                                  style={{
                                    fill: theme.palette.common.primary,
                                    fontSize: "1.7rem",
                                  }}
                                />
                              </IconButton> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* for Price */}
                    <Grid item>
                      <Typography variant="h6" align="right">
                        {cartItems.some(
                          (item) => item.quantity <= 0 || item.quantity === ""
                        )
                          ? "Invalid"
                          : `$
                        ${Math.ceil(
                          item.product.price * item.quantity +
                            item.product.deliveryPrice
                        )}`}
                      </Typography>

                      <span
                        className={classes.label}
                        style={{
                          fontSize: "13px",
                          fontWeight: 300,
                          textAlign: "right",
                          color: theme.palette.common.primary,
                          cursor: "pointer",
                        }}
                        onClick={() => props.removeCartHandler(item._id)}
                      >
                        {t["Remove"]}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          style={{
            borderRadius: "3px",
            boxShadow: "0 10px 5px -5px rg",
            border: "solid 1px #ededf0",
            padding: "20px 24px",
          }}
        >
          <label className={classes.label}>Items</label>
          <Grid container justify="space-between">
            {cartItems.some(
              (item) => item.quantity <= 0 || item.quantity === ""
            ) ? (
              <Typography className={classes.label} style={{ fontWeight: 300 }}>
                Invalid
              </Typography>
            ) : (
              <Typography className={classes.label} style={{ fontWeight: 300 }}>
                {cartItems.length} Product{cartItems.length > 1 && "s"} x{" "}
                {cartItems
                  .reduce((total, item) => {
                    return parseFloat(total + item.quantity);
                  }, 0)
                  .toFixed(2)}{" "}
                item
              </Typography>
            )}
            {cartItems.some(
              (item) => item.quantity <= 0 || item.quantity === ""
            ) ? (
              <Typography className={classes.label} style={{ fontWeight: 300 }}>
                Invalid
              </Typography>
            ) : (
              <Typography className={classes.label} style={{ fontWeight: 300 }}>
                $
                {Math.ceil(
                  cartItems.reduce((total, item) => {
                    return (
                      total +
                      item.product.price * item.quantity +
                      item.product.deliveryPrice
                    );
                  }, 0)
                )}
              </Typography>
            )}
          </Grid>
          <Typography
            className={classes.label}
            style={{ fontWeight: 300, marginTop: "0.8em" }}
          >
            {t["(Excluding Taxes)"]}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: theme.palette.common.primary,
              marginTop: "0.5em",
              cursor: "pointer",
            }}
            onClick={redirectToCheckout}
          >
            <label
              className={classes.label}
              style={{ color: theme.palette.common.light, cursor: "pointer" }}
            >
              {t["Continue to Checkout"]}
            </label>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
