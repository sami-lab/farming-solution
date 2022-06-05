import React, { useState } from "react";
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
  Divider,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import StripeCheckout from "react-stripe-checkout";
import CheckoutForm from "./checkoutForm";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe(publicRuntimeConfig.stripe);

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

export default function Checkout(props) {
  const t = props.languageJson;
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();

  const [user, setUser] = useState({
    name: {
      value: props.user.firstName + props.user.lastName,
      error: false,
      errorMessage: "",
    },
    phone: {
      value: props.user.phone || "",
      error: false,
      errorMessage: "",
    },
    zipCode: {
      value: props.user.zipCode || "",
      error: false,
      errorMessage: "",
    },
    address: {
      value: props.user.address || "",
      error: false,
      errorMessage: "",
    },
    paymentMethod: {
      value: "cashOnDelievery",
      error: false,
      errorMessage: "",
    },
  });

  return (
    <Grid container direction="column">
      {/* heading checkout*/}
      <Grid
        item
        container
        style={{ marginTop: "2em" }}
        className={classes.root}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="subtitle1">{t["Checkout"]}</Typography>
        </Grid>
        <Grid item style={{ marginLeft: "1em" }}>
          <Typography
            variant="h3"
            style={{ textTransform: "none", marginTop: "0.1em" }}
          >
            <a
              style={{
                textDecoration: "none",
                color: theme.palette.common.primary,
              }}
              href="#"
              onClick={() => router.back()}
            >
              {t["Back"]}
            </a>
          </Typography>
        </Grid>
      </Grid>
      {/* poucts Items */}
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
            {props.products &&
              props.products.length > 0 &&
              props.products.map((item, ind) => (
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
                          publicRuntimeConfig.backend + "/files/" + item.image
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
                          {item.title} by{" "}
                          <span style={{ color: theme.palette.common.primary }}>
                            {" "}
                            {item.shopName}
                          </span>
                        </Typography>
                      </Grid>
                      {/* for liciance and quantity */}
                      <Grid item style={{ marginTop: "0.3em" }}>
                        <Typography variant="subtitle2">
                          {item.quantity} {item.unit ? item.unit : "Quantity"}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* for Price */}
                    <Grid item>
                      <Typography variant="h6" align="right">
                        RS {item.price * item.quantity + item.deliveryPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          style={{
            borderRadius: "3px",
            boxShadow: "0 10px 5px -5px rg",
            border: "solid 1px #ededf0",
            padding: "20px 24px",
          }}
        >
          {/* platform fee */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                {t["Platform Fee"]}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                border: "1px dashed gray",
                flex: 1,
                opacity: 0.6,
                marginTop: "5px",
              }}
            ></Grid>
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                RS {publicRuntimeConfig.platformFee}
              </Typography>
            </Grid>
          </Grid>

          {/* subtotal  */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ marginTop: "2em" }}
          >
            <Grid item>
              <Typography variant="subtitle2">{t["Subtotal"]}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                RS{" "}
                {props.products.reduce((total, item) => {
                  return (
                    total +
                    parseFloat(item.price) * item.quantity +
                    parseFloat(item.deliveryPrice)
                  );
                }, 0)}{" "}
              </Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
          {/* gst fee */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                {t["GST/VAT Tax"]}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                border: "1px dashed gray",
                flex: 1,
                opacity: 0.6,
                marginTop: "5px",
              }}
            ></Grid>
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                RS {publicRuntimeConfig.gst}
              </Typography>
            </Grid>
          </Grid>
          {/* Email */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ marginTop: "2em" }}
          >
            <Typography variant="subtitle2"> {props.user.email}</Typography>
          </Grid>

          <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
          {/* estimated total */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                {t["Estimated Total"]}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                RS{" "}
                {props.products.reduce((total, item) => {
                  return (
                    total +
                    parseFloat(item.price) * item.quantity +
                    parseFloat(item.deliveryPrice)
                  );
                }, 0) +
                  parseFloat(publicRuntimeConfig.gst) +
                  parseFloat(publicRuntimeConfig.platformFee)}{" "}
              </Typography>
            </Grid>
          </Grid>

          <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
          {/* user details */}
          <Grid container direction="column">
            <Grid item>
              <label htmlFor="name" className={classes.label}>
                {t["Name*"]}
              </label>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                required
                error={user.name.error}
                helperText={user.name.error ? user.name.errorMessage : ""}
                value={user.name.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Grid>
            <Grid item style={{ marginTop: "1em" }}>
              <label htmlFor="phone" className={classes.label}>
                Phone
              </label>
              <TextField
                id="phone"
                placeholder={"Phone"}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                required
                error={user.phone.error}
                helperText={user.phone.error ? user.phone.errorMessage : ""}
                value={user.phone.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Grid>
            <Grid item style={{ marginTop: "1em" }}>
              <label htmlFor="Zipcode" className={classes.label}>
                {t["Zip Code"]}
              </label>
              <TextField
                id="Zipcode"
                placeholder={t["Zip Code"]}
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                required
                error={user.zipCode.error}
                helperText={user.zipCode.error ? user.zipCode.errorMessage : ""}
                value={user.zipCode.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    zipCode: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Grid>
            <Grid item style={{ marginTop: "1em" }}>
              <label htmlFor="address" className={classes.label}>
                {t["Address"]}
              </label>
              <TextField
                id="address"
                multiline={true}
                minRows={3}
                variant="outlined"
                placeholder={t["Address"]}
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                required
                error={user.address.error}
                helperText={user.address.error ? user.address.errorMessage : ""}
                value={user.address.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: {
                      value: e.target.value,
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
              />
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />

          <div
            style={{
              padding: "1em",
              backgroundColor: "#F4F8FB",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
              {t["Select a Payment Type:"]}
            </Typography>
            <Grid container alignItems="center" style={{ marginTop: "0.5em" }}>
              <Radio
                name="paymentMethod"
                id="cashOnDelievery"
                checked={user.paymentMethod.value === "cashOnDelievery"}
                onChange={() =>
                  setUser({
                    ...user,
                    paymentMethod: {
                      value: "cashOnDelievery",
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
                color="success"
              />{" "}
              <label htmlFor="cashOnDelievery">
                <img
                  src="/dev/cashondelivery.jpg"
                  style={{ width: "7em", height: "2.5em", cursor: "pointer" }}
                />
              </label>
            </Grid>
            <Grid container alignItems="center" style={{ marginTop: "0.5em" }}>
              <Radio
                name="paymentMethod"
                id="stripe"
                checked={user.paymentMethod.value === "stripe"}
                onChange={() =>
                  setUser({
                    ...user,
                    paymentMethod: {
                      value: "stripe",
                      error: false,
                      errorMessage: "",
                    },
                  })
                }
                color="success"
              />{" "}
              <label htmlFor="stripe">
                <img
                  src="/dev/Stripe.png"
                  style={{ width: "8em", height: "3.5em", cursor: "pointer" }}
                />
              </label>
            </Grid>
            {user.paymentMethod.value === "stripe" && (
              <>
                <Divider style={{ marginTop: "1em", marginBottom: "1em" }} />
                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                  {t["Card Number"]}
                </Typography>
              </>
            )}
            <Elements stripe={promise}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  <CheckoutForm
                    languageJson={t}
                    //checkoutHandler={props.checkoutHandler}
                    user={props.user}
                    userToken={props.userToken}
                    name={user.name.value}
                    phone={user.phone.value}
                    zipCode={user.zipCode.value}
                    paymentMethod={user.paymentMethod.value}
                    address={user.address.value}
                    products={props.products}
                    elements={elements}
                    stripe={stripe}
                  />
                )}
              </ElementsConsumer>
            </Elements>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
