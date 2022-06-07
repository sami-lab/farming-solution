import React, { useState } from "react";
import getConfig from "next/config";

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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "2em",
    paddingRight: "2em",
    [theme.breakpoints.down("sm")]: {
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
    textAlign: "right",
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

const orderStatus = [
  { value: "pending", label: "Pending" },
  { value: "process", label: "In Process" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];
export default function Purchases(props) {
  const t = props.languageJson;
  const theme = useTheme();
  const classes = useStyles();
  console.log(props);
  return (
    <Grid container direction="column">
      {/* heading Your product*/}
      <Grid
        item
        container
        style={{ marginTop: "2em" }}
        className={classes.root}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="subtitle1">{t["Your Products"]}</Typography>
        </Grid>
      </Grid>
      {/* products Items */}

      <Grid
        container
        direction="column"
        style={{ borderTop: "1px solid #d5d5d8" }}
        className={classes.root}
        spacing={2}
      >
        {props.purchasings.length > 0 &&
          props.purchasings.map((item) => (
            <Grid
              item
              style={{
                borderBottom: "1px solid #d5d5d8",
                padding: "24px 0",
              }}
            >
              <Grid container alignItems="center">
                {/* for image */}
                <Grid item>
                  <img
                    src={
                      publicRuntimeConfig.backend +
                      "/files/" +
                      item.productId?.images[0]
                    }
                    style={{
                      width: "125px",
                      height: "76px",
                      marginRight: "0.4em",
                    }}
                  />
                </Grid>
                {/* For details */}
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
                      <span style={{ color: theme.palette.common.primary }}>
                        {" "}
                        {item.productId?.title}
                      </span>
                    </Typography>
                  </Grid>
                  {/* for description */}
                  <Grid item style={{ marginTop: "0.3em" }}>
                    <Typography variant="subtitle2">
                      {item.productId?.description}
                    </Typography>
                  </Grid>
                  {/* for title */}
                  <Grid item>
                    <Typography variant="subtitle2">
                      <span style={{ color: theme.palette.common.primary }}>
                        {" "}
                        {
                          orderStatus.find((x) => x.value === item.orderStatus)
                            ?.label
                        }
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    flex: 1,
                    marginLeft: "0.5em",
                  }}
                >
                  {/* for title */}
                  <Grid item>
                    <Typography variant="subtitle2">
                      <span style={{ color: theme.palette.common.primary }}>
                        {" "}
                        {new Date(item.Date).toDateString()}
                      </span>
                    </Typography>
                  </Grid>
                  {/* for description */}
                  <Grid item style={{ marginTop: "0.3em" }}>
                    Quantity :
                    <Typography component="span" variant="subtitle2">
                      {item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
                {/* for Price */}
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        <span style={{ color: theme.palette.common.primary }}>
                          {item?.paymentMethod === "cashOnDelievery"
                            ? "Cash on Delivery"
                            : item?.paymentMethod === "stripe"
                            ? "Stripe"
                            : "-"}
                        </span>
                      </Typography>
                      <Typography variant="h6" align="right">
                        RS{" "}
                        {item.productId?.price * item.quantity +
                          item.productId?.deliveryPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
