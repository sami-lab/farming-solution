import React from "react";
import Link from "next/link";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "4em",
    paddingRight: "4em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
    },
  },
}));

export default function AuthHeader(props) {
  const classes = useStyles();

  return (
    <div style={{ borderTop: `3px solid #39B4AC` }}>
      <Grid container className={classes.root}>
        <Grid item>
          <Link href="/">
            <a style={{ textDecoration: "none" }}>
              <Typography variant="h6" noWrap>
                <img
                  src="/dev/logo.jpeg"
                  style={{
                    width: "200px",
                    height: "50px",

                    marginTop: "0.8em",
                  }}
                  alt="logo"
                />
              </Typography>
            </a>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
