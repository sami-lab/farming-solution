import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { useTheme, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LocationOnSharpIcon from "@material-ui/icons/LocationOnSharp";
import LocalPhoneSharpIcon from "@material-ui/icons/LocalPhoneSharp";
import MailSharpIcon from "@material-ui/icons/MailSharp";

import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {},
  paddingContainer: {
    padding: "0 10px",
    [theme.breakpoints.up("sm")]: {
      padding: "0 39px",
    },
  },
  headingContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "50px",
    backgroundColor: theme.palette.common.primary,
  },
  footerHeading: {
    color: "white",
    marginBottom: "0px",
    fontFamily: "Averta",
    fontSize: "25px",
    fontWeight: 700,
    lineHeight: "1.3em",
  },
  footerHeadingBottomContent: {
    color: "white",
    marginBottom: "0px",
    fontFamily: "Averta",
    fontSize: "15px",
    fontWeight: 700,
  },
  nestedColumn: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    //TODO condition hereF
    [theme.breakpoints.up("sm")]: {
      flex: 1,
    },
  },
  nestedColumnHeading: {
    fontSize: "1.25em",
    fontFamily: "Averta",
    fontWeight: 700,
    color: "black",
    marginTop: "0.5rem",
    marginBottom: "1rem",
    lineHeight: "1.2",
  },
  nestedColumnContent: {
    color: "#000",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "30px",
    fontFamily: "Averta",
    // fontSize: "1em",
    // fontFamily:""
  },
  copyRightText: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#7a7a7a",
    fontFamily: "Averta",
    padding: "1em 0",
    [theme.breakpoints.up("sm")]: {
      padding: "0 0",
    },
  },
  iconsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "1em",
  },
  icons: {
    margin: "0 0.4em",
  },
  smallIcons: {
    width: "20px",
    marginRight: "9px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Footer(props) {
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.between("1300", "1550"));

  return (
    <>
      <Grid container className={classes.container}>
        {/* Top for heading */}
        <Grid item xs={12} className={classes.headingContainer}>
          <div className={classes.paddingContainer}>
            <Typography className={classes.footerHeading}>
              If you need to contact us urgently
            </Typography>

            <Typography className={classes.footerHeadingBottomContent}>
              Please call us at{" "}
              <a
                className={classes.link}
                href={`tel:${publicRuntimeConfig.phone}`}
              >
                {publicRuntimeConfig.phone}
              </a>
            </Typography>
          </div>

          {/* cloud svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 27.8"
            preserveAspectRatio="xMidYMax slice"
            style={{
              height: matchesSM ? "156px" : "inherit",
              fill: "white",
              position: "relative",
              bottom: -1,
            }}
          >
            <path d="M265.8 3.5c-10.9 0-15.9 6.2-15.9 6.2s-3.6-3.5-9.2-.9c-9.1 4.1-4.4 13.4-4.4 13.4s-1.2.2-1.9.9c-.6.7-.5 1.9-.5 1.9s-1-.5-2.3-.2c-1.3.3-1.6 1.4-1.6 1.4s.4-3.4-1.5-5c-3.9-3.4-8.3-.2-8.3-.2s-.6-.7-.9-.9c-.4-.2-1.2-.2-1.2-.2s-4.4-3.6-11.5-2.6-10.4 7.9-10.4 7.9-.5-3.3-3.9-4.9c-4.8-2.4-7.4 0-7.4 0s2.4-4.1-1.9-6.4-6.2 1.2-6.2 1.2-.9-.5-2.1-.5-2.3 1.1-2.3 1.1.1-.7-1.1-1.1c-1.2-.4-2 0-2 0s3.6-6.8-3.5-8.9c-6-1.8-7.9 2.6-8.4 4-.1-.3-.4-.7-.9-1.1-1-.7-1.3-.5-1.3-.5s1-4-1.7-5.2c-2.7-1.2-4.2 1.1-4.2 1.1s-3.1-1-5.7 1.4-2.1 5.5-2.1 5.5-.9 0-2.1.7-1.4 1.7-1.4 1.7-1.7-1.2-4.3-1.2c-2.6 0-4.5 1.2-4.5 1.2s-.7-1.5-2.8-2.4c-2.1-.9-4 0-4 0s2.6-5.9-4.7-9c-7.3-3.1-12.6 3.3-12.6 3.3s-.9 0-1.9.2c-.9.2-1.5.9-1.5.9S99.4 3 94.9 3.9c-4.5.9-5.7 5.7-5.7 5.7s-2.8-5-12.3-3.9-11.1 6-11.1 6-1.2-1.4-4-.7c-.8.2-1.3.5-1.8.9-.9-2.1-2.7-4.9-6.2-4.4-3.2.4-4 2.2-4 2.2s-.5-.7-1.2-.7h-1.4s-.5-.9-1.7-1.4-2.4 0-2.4 0-2.4-1.2-4.7 0-3.1 4.1-3.1 4.1-1.7-1.4-3.6-.7c-1.9.7-1.9 2.8-1.9 2.8s-.5-.5-1.7-.2c-1.2.2-1.4.7-1.4.7s-.7-2.3-2.8-2.8c-2.1-.5-4.3.2-4.3.2s-1.7-5-11.1-6c-3.8-.4-6.6.2-8.5 1v21.2h283.5V11.1c-.9.2-1.6.4-1.6.4s-5.2-8-16.1-8z"></path>
          </svg>
        </Grid>

        {/* bottom for columns */}
        <Grid item xs={12}>
          {/* nested container */}
          <Grid container className={classes.paddingContainer}>
            {/* first */}

            <Grid
              item
              xs={12}
              className={classes.nestedColumn}
              style={{
                position: matchesSM ? "relative" : "inherit",
                top: "-45px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginBottom: "0.7em",
                }}
              >
                <img
                  src="/dev/logo.jpeg"
                  style={{
                    width: "200px",
                    height: "60px",
                  }}
                />
              </div>
              <Typography
                component="h4"
                style={{ marginLeft: "0.8em" }}
                className={classes.copyRightText}
              >
                © Copyright 2015-2022
              </Typography>

              <div className={classes.iconsContainer}>
                <a
                  target="_blank"
                  href={
                    publicRuntimeConfig.facebook
                      ? publicRuntimeConfig.facebook
                      : "#"
                  }
                  className={classes.link}
                >
                  <FacebookIcon className={classes.icons}></FacebookIcon>
                </a>
                <a
                  target="_blank"
                  href={
                    publicRuntimeConfig.twitter
                      ? publicRuntimeConfig.twitter
                      : "#"
                  }
                  className={classes.link}
                >
                  <TwitterIcon className={classes.icons}></TwitterIcon>
                </a>
                <a
                  target="_blank"
                  href={
                    publicRuntimeConfig.insta ? publicRuntimeConfig.insta : "#"
                  }
                  className={classes.link}
                >
                  <InstagramIcon className={classes.icons}></InstagramIcon>
                </a>
                <a
                  target="_blank"
                  href={
                    publicRuntimeConfig.linkedIn
                      ? publicRuntimeConfig.linkedIn
                      : "#"
                  }
                  className={classes.link}
                >
                  <LinkedInIcon className={classes.icons}></LinkedInIcon>
                </a>
              </div>
            </Grid>
            {/* second  Navigation*/}
            <Grid item xs={6} className={classes.nestedColumn}>
              <Typography
                className={classes.nestedColumnHeading}
                component="h5"
              >
                Navigation
              </Typography>

              <div className={classes.nestedColumnContentContainer}>
                <Link href="/" style={{ textDecoration: "none" }}>
                  <Typography className={classes.nestedColumnContent}>
                    Home
                  </Typography>
                </Link>
                <Link href="/partner" style={{ textDecoration: "none" }}>
                  <Typography className={classes.nestedColumnContent}>
                    Partner
                  </Typography>
                </Link>
              </div>
            </Grid>
            {/* third services */}
            <Grid item xs={6} className={classes.nestedColumn}>
              <Typography
                className={classes.nestedColumnHeading}
                component="h5"
              >
                Categories
              </Typography>
              <div className={classes.nestedColumnContentContainer}>
                {props.categories &&
                  props.categories.map((item) => (
                    <Link
                      href={"/category/" + item.name}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography className={classes.nestedColumnContent}>
                        {item.name}
                      </Typography>
                    </Link>
                  ))}
              </div>
            </Grid>
            {/* fourth */}
            {/* <Grid item className={classes.nestedColumn}>
              <Typography
                className={classes.nestedColumnHeading}
                component="h5"
              >
                Legal
              </Typography>
              <div className={classes.nestedColumnContentContainer}>
                <Typography className={classes.nestedColumnContent}>
                  NDA
                </Typography>
                <Typography className={classes.nestedColumnContent}>
                  Contracts (A)
                </Typography>
                <Typography className={classes.nestedColumnContent}>
                  Contracts (W)
                </Typography>
              </div>
            </Grid> */}
            {/* fifth */}
            <Grid
              item
              className={classes.nestedColumn}
              style={{ flex: matchesSM ? "inherit" : "1.1" }}
            >
              <Typography
                className={classes.nestedColumnHeading}
                component="h5"
              >
                Get in touch
              </Typography>
              <div className={classes.nestedColumnContentContainer}>
                <div style={{ display: "flex" }}>
                  <LocationOnSharpIcon
                    className={classes.smallIcons}
                  ></LocationOnSharpIcon>
                  <Typography
                    className={classes.nestedColumnContent}
                    style={{ lineHeight: "1.3em" }}
                  >
                    {publicRuntimeConfig.address}
                  </Typography>
                </div>

                <a
                  className={classes.link}
                  href={`tel:${publicRuntimeConfig.phone}`}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LocalPhoneSharpIcon
                      className={classes.smallIcons}
                    ></LocalPhoneSharpIcon>
                    <Typography className={classes.nestedColumnContent}>
                      {publicRuntimeConfig.phone}
                    </Typography>
                  </div>
                </a>
                <a
                  className={classes.link}
                  href={`mailto: ${publicRuntimeConfig.email}`}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MailSharpIcon
                      className={classes.smallIcons}
                    ></MailSharpIcon>
                    <Typography className={classes.nestedColumnContent}>
                      {publicRuntimeConfig.email}
                    </Typography>
                  </div>
                </a>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <svg
          style={{
            fill: "#DDEFFC",
            width: "100%",
            height: "105px",
            fill: "rgb(221, 239, 252)",
            transform: "rotate(180deg)",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 283.5 27.8"
          preserveAspectRatio="none"
        >
          <path d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
          <path d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
          <path d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
          <path d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
          <path d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
          <path d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
          <path d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
          <path d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
          <path d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
        </svg>
      </Grid>
    </>
  );
}
