import React from "react";
import {
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },
  border: {
    borderBottom: "1px solid #e2e9ee",
  },
}));

export default function Perks(props) {
  const t = props.languageJson;

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const border = (
    <Grid
      container
      justify="space-around"
      style={{
        width: "100%",
        marginTop: matchesSM ? "0.5em" : "1em",
        marginBottom: matchesSM ? "0.5em" : "1em",
      }}
    >
      <Grid
        item
        md={5}
        sm={10}
        style={{ borderBottom: "1px solid #e2e9ee" }}
      ></Grid>
      {!matchesSM && (
        <Grid
          item
          md={5}
          sm={10}
          style={{ borderBottom: "1px solid #e2e9ee" }}
        ></Grid>
      )}
    </Grid>
  );
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h1" align="center" style={{ fontWeight: "500" }}>
          {t["Shop Owner Perks"]}
        </Typography>
      </Grid>

      <Grid item style={{ marginTop: "2em" }}>
        <Grid container spacing={1}>
          <Grid item md={6} sm={12}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/network.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item style={{ marginRight: matchesSM ? 0 : "0.6em" }}>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {t["Network Of 7 Million Members"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    lineHeight: "22px",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "Hello Farm is a platform to get your products in front of over 7 million members wherever they are."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={6}
            sm={12}
            style={{ borderLeft: matchesSM ? 0 : "1px solid #e2e9ee" }}
          >
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/partner.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {t["Let’s Partner Up"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    lineHeight: "22px",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "Create great products and we’ll make sure the world sees, values, and buys them."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ width: "100%" }}>
        {border}
      </Grid>

      <Grid item style={{ marginTop: "1em" }}>
        <Grid container spacing={1}>
          <Grid item md={6} sm={12}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/lock.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item style={{ marginRight: matchesSM ? 0 : "0.6em" }}>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {t["No Exclusivity Lock-In"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    lineHeight: "22px",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "Sell with us, on your own site, and beyond. There’s nothing to lose in letting us help promote your work."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={6}
            sm={12}
            style={{ borderLeft: matchesSM ? 0 : "1px solid #e2e9ee" }}
          >
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/price-tag.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {t["Set Your Own Prices"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    lineHeight: "22px",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "You know the value of your work. Keep control over your product prices and change them at anytime."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ width: "100%" }}>
        {border}
      </Grid>
      <Grid item style={{ marginTop: "1em" }}>
        <Grid container spacing={1}>
          <Grid item md={6} sm={12}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/open.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item style={{ marginRight: matchesSM ? 0 : "0.6em" }}>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {t["No Per-Product Approval"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    lineHeight: "22px",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "Create new products and update them whenever you like. Your products will go live instantly."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md={6}
            sm={12}
            style={{ borderLeft: matchesSM ? 0 : "1px solid #e2e9ee" }}
          >
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/instant-delivery.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {t["Instant Delivery"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    lineHeight: "22px",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "We’ll make sure your products are delivered safely and securely to your customers."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: "3em", width: "100%" }}>
        <Divider />
      </Grid>
      <Grid item style={{ marginTop: "2em" }}>
        <Typography variant="h6" align="center" style={{ fontWeight: "300" }}>
          {t["All the tools you’ll need to manage your shop:"]}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "2em" }}>
        <Grid container spacing={1}>
          <Grid item md={4} sm={12}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/analytics.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item style={{ marginRight: matchesSM ? 0 : "0.6em" }}>
                <Typography
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {t["Track Stats — Stay on top of"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    color: "gray",
                  }}
                >
                  {t["your products with up to the minute stats."]}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            style={{ borderLeft: matchesSM ? 0 : "1px solid #e2e9ee" }}
          >
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/customers.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item style={{ marginRight: matchesSM ? 0 : "0.6em" }}>
                <Typography
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {t["Keep up with customers —"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    color: "gray",
                  }}
                >
                  {
                    t[
                      "They’re your customers, so we make it easy for you to stay in touch with them."
                    ]
                  }
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            style={{ borderLeft: matchesSM ? 0 : "1px solid #e2e9ee" }}
          >
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <img
                  src="/dev/target.svg"
                  style={{ width: "6em", height: "3.5em" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {t["Manage support — Simple"]}
                </Typography>
                <p
                  style={{
                    fontFamily: "Averta",
                    fontSize: "12px",
                    fontWeight: 300,
                    margin: 0,
                    marginTop: "0.1em",
                    color: "gray",
                  }}
                >
                  {t["messaging system to respond to requests."]}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
