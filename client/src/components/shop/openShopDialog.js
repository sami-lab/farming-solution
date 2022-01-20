import React, { useState } from "react";
import {
  Grid,
  Dialog,
  Typography,
  IconButton,
  Slide,
  DialogContent,
  useTheme,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { CloseSharp } from "@material-ui/icons";
import { createShop } from "../../../api/shop/shop";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },

  label: {
    ...theme.typography.label,
  },
  button: {
    ...theme.typography.label,
    background: theme.palette.common.primary,
    color: "#fff",
    "&$disabled": {
      backgroundColor: "#e2e9ee",
      color: theme.palette.common.darkBlack,
    },
  },
  input: {
    fontFamily: "Averta",
    fontSize: "1rem",
    color: theme.palette.common.darkBlack,
    lineHeight: 1.4,
    borderRadius: "3px",
    background: "#fbfbfd",
    boxShadow: "none",
    marginTop: "3px",
    resize: "vertical",
    "&:hover": {
      border: "1px solid #899298",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 0 3px #dceefc",
    },
    "&::placeholder": {
      fontFamily: "Averta",
      fontWeight: 400,
      fontSize: "1.1rem",
    },
  },
}));
export default function OpenShopDialog(props) {
  const t = props.languageJson;

  const theme = useTheme();
  const classes = useStyles();
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("");
  const [whyChooseUs, setWhyChooseUs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const submitFormHandler = async () => {
    setError({
      status: false,
      message: "",
    });
    if (what === "" || whyChooseUs === "" || where === "") {
      setError({
        status: true,
        message: t["Please fill All fields to continue"],
      });
      return;
    }
    try {
      setLoading(true);
      const response = await createShop(props.token, {
        what,
        where,
        whyChooseUs,
      });
      const result = await response.json();
      if (result.status === "success") {
        setLoading(false);
        props.shopApproved();
        props.onClose();
      } else {
        setLoading(false);
        setError({
          status: true,
          message: result.message,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.message,
      });
    }
  };

  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.onClose}
      TransitionComponent={Transition}
      aria-labelledby="simple-dialog-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      className={classes.root}
    >
      <DialogContent className={classes.root}>
        <span style={{ position: "absolute", right: 5, top: 5 }}>
          <IconButton onClick={props.onClose}>
            <CloseSharp />
          </IconButton>
        </span>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">{t["Request an Invite"]} </Typography>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontFamily: "Averta", margin: 0 }}>
              {
                t[
                  "Our shop space is limited to the most qualified sellers at the moment, so tell us why you'd be a great shop owner below. All fields are required."
                ]
              }
            </p>
          </Grid>
          <Grid item xs={12} container direction="column">
            <label className={classes.label}>
              {t["What type of food you will Sell?"]}
            </label>
            <textarea
              className={classes.input}
              rows={2}
              value={what}
              onChange={(e) => setWhat(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} container direction="column">
            <label className={classes.label}>
              {t["Where does your food come from?"]}
            </label>
            <textarea
              className={classes.input}
              rows={2}
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} container direction="column">
            <label className={classes.label}>
              {t["Why do you want to open a shop on Farming Solutions?"]}
            </label>
            <textarea
              className={classes.input}
              rows={2}
              value={whyChooseUs}
              onChange={(e) => setWhyChooseUs(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={
                what.length <= 0 || where.length <= 0 || whyChooseUs.length <= 0
              }
              className={classes.button}
              onClick={submitFormHandler}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : t["Request Invite"]}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
