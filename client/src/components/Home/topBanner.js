import React from "react";
import {
  Grid,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../resusable/Link";

const chipSample = [
  {
    text: "Procreate Brushes",
    link: "#",
  },
  {
    text: "Textures",
    link: "#",
  },
  {
    text: "Instagram",
    link: "#",
  },
];
const useStyles = makeStyles((theme) => ({
  brush: {
    position: "relative",
    zIndex: 1,
    display: "inline-block",
    background: "url(/dev/brush-stroke1.webp) 0 0 no-repeat",
    backgroundSize: "102% 100%",
    "&::before": {
      content: "",
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: "-1px",
      width: "99%",
      height: "94.8%",
      transform: "scale(1.1)",
    },
  },
  label: {
    ...theme.typography.label,
  },
  chip: {
    backgroundColor: "#fee4c3",
    padding: "6px 12px",
    "&:hover": {
      backgroundColor: "#FCC875",
    },
  },
}));

export default function TopBanner(props) {
  const t = props.languageJson;

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const trending = props.categories && props.categories.length > 0 && (
    <>
      <Grid item>
        <Typography variant="h3">{t["TRENDING NOW"]}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {props.categories.map((item, i) => (
            <Grid item key={i}>
              <Chip
                label={<label className={classes.label}>{item.name}</label>}
                component={Link}
                href={`/category/${item.name}`}
                clickable
                className={classes.chip}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
  return (
    <Grid container justify="space-between">
      <Grid item md={4}>
        <Grid container direction="column" spacing={2}>
          {/* For text  */}
          <Grid item>
            <Typography variant="h1" align={matchesSM ? "center" : "left"}>
              {t["Bring your farm-fresh"]}{" "}
              <span className={classes.brush}>
                {t["goodness to our customer's kitchen"]}
              </span>{" "}
              {t["around the country."]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" align={matchesSM ? "center" : "left"}>
              {
                t[
                  "Maintaining the freshness and quality you deserve to your doorstep."
                ]
              }
            </Typography>
          </Grid>
          {!matchesSM && trending}
        </Grid>
      </Grid>

      <Grid item md={7} xs={12}>
        <Grid container direction="column" spacing={2}>
          {/* for Image */}
          <Grid item style={{ marginTop: "20px" }}>
            <img
              src="/dev/home_banner.jpg"
              alt="login"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          {/* For text  */}
          <Grid item>
            <label className={classes.label}>
              <Link href={`/prediction`} style={{ textDecoration: "none" }}>
                {
                  t[
                    "Empowering Growers and AgriFood Value Chain with Real-Time Insights."
                  ]
                }
              </Link>
              {/* <a
                href="#"
                style={{
                  textDecoration: 'none',
                  color: theme.palette.common.primary,
                }}
              >
                {' '}
                {t['our Canva Finds »']}
              </a> */}
            </label>
          </Grid>
          {matchesSM && trending}
        </Grid>
      </Grid>
    </Grid>
  );
}
