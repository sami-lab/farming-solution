import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: "url(/dev/clear-night.jpeg)",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#000",
    opacity: 0.5,
    transition: "background 0.3s",
    borderRadius: ".3s",
    opacity: ".3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      minHeight: "100vh",
      position: "relative",
    },
  },
  overlay: {
    backgroundColor: "#000000",
    opacity: 0.5,
    transition: "background 0.3s, border-radius 0.3s, opacity 0.3s",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: "86px",
    zIndex: 1,
    [theme.breakpoints.up("sm")]: {
      top: 0,
    },
    // flex: 1
  },
  paper: {
    borderRadius: "5px",
    padding: "2em",
    width: "65%",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //boxShadow: 'rgba(116, 115, 115, 0.5) 0px 5px 15px',
    backgroundColor: "rgba(116, 115, 115, 0.5)",
    margin: "auto auto",

    [theme.breakpoints.down("md")]: {
      width: "75%",
    },

    [theme.breakpoints.down("xs")]: {
      minHeight: "65vh",
      width: "100%",
    },
  },
  formHeading: {
    marginBottom: "1.5em",
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: "25px",
    fontWeight: "700",
    color: "rgb(255, 255, 255)",
    textAlign: "center",
    lineHeight: 1.6,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    marginBottom: "1em",
  },
  textboxRoot: {
    backgroundColor: "#fff",
    height: "3em",
    fontFamily: "Montserrat",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  },
  input: {
    color: "#000",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Montserrat",
    //color: '#000',
  },
  formButton: {
    textTransform: "uppercase",
    color: "white",
    backgroundColor: theme.palette.primary.orange,
    borderRadius: 50,
    fontSize: "21px",
    fontWeight: "bold",
    width: "100%",
    marginTop: "0.7em",
    minWidth: "8em",
    [theme.breakpoints.up("sm")]: {
      width: "inherit",
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.orange,
      color: "#fff",
    },
  },
}));
export default function Prediction(props) {
  const classes = useStyles();
  const t = props.languageJson;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [data, setData] = useState({
    nitrogen: "",
    phos: "",
    pot: "",
    temp: "",
    hum: "",
    pH: "",
    rainfall: "",
  });

  const submitHandler = () => {
    setLoading(true);

    axios
      .post("https://crop-prediction-fyp.herokuapp.com/crop", {
        K: data.pot,
        N: data.nitrogen,
        P: data.phos,
        humidity: data.hum,
        ph: data.pH,
        rainfall: data.rainfall,
        temperature: data.rainfall,
      })
      .then((res) => {
        if (res.data) {
          setError({
            status: true,
            message: `Result: ${res.data.prediction}`,
          });
        } else {
          setError({
            status: true,
            message: "Something went wrong",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError({
          status: true,
          message: err?.response?.data?.message || "Something went wrong",
        });
      });
  };
  return (
    <Grid container direction="column">
      <Grid item container>
        <Header {...props} languageJson={t} />
      </Grid>
      <Grid item container className={classes.container}>
        <div className={classes.overlay}></div>
        <Grid style={{ zIndex: 2 }} item xs={11}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1" className={classes.formHeading}>
              Crop Field Prediction
            </Typography>
            <form className={classes.form}>
              {/*Nitrogen */}
              <TextField
                type="number"
                name="Nitrogen"
                placeholder="Nitrogen"
                required
                value={data.nitrogen}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                inputProps={{
                  min: 0,
                }}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    nitrogen: e.target.value,
                  })
                }
              />
              <TextField
                name="Phosphorus"
                type="number"
                inputProps={{
                  min: 0,
                }}
                placeholder="Phosphorus"
                required
                value={data.phos}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    phos: e.target.value,
                  })
                }
              />
              <TextField
                name="Potassium"
                type="number"
                inputProps={{
                  min: 0,
                }}
                placeholder="Potassium"
                required
                value={data.pot}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    pot: e.target.value,
                  })
                }
              />

              <TextField
                name="Temperature"
                type="number"
                inputProps={{
                  min: 0,
                }}
                placeholder="Temperature"
                required
                value={data.temp}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    temp: e.target.value,
                  })
                }
              />

              <TextField
                name="Humadity"
                type="number"
                inputProps={{
                  min: 0,
                }}
                placeholder="Humadity"
                required
                value={data.hum}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    hum: e.target.value,
                  })
                }
              />

              <TextField
                name="pH"
                type="number"
                inputProps={{
                  min: 0,
                }}
                placeholder="pH"
                required
                value={data.pH}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    pH: e.target.value,
                  })
                }
              />

              <TextField
                name="rainfall"
                type="number"
                inputProps={{
                  min: 0,
                }}
                placeholder="Rainfall"
                required
                value={data.rainfall}
                fullWidth
                size="small"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  classes: {
                    root: classes.textboxRoot,
                    input: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                onChange={(e) =>
                  setData({
                    ...data,
                    rainfall: e.target.value,
                  })
                }
              />
              {error.status && (
                <Grid item container>
                  <Typography
                    style={{
                      marginBottom: "10px",
                      color: "#fff",
                      textAlign: "left",
                    }}
                    variant="subtitle1"
                    className={classes.formHeading}
                  >
                    {error.message}
                  </Typography>
                </Grid>
              )}
              <Button
                onClick={submitHandler}
                disabled={loading}
                className={classes.formButton}
              >
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "SUBMIT"
                )}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container>
        <Footer {...props} languageJson={t} />
      </Grid>
    </Grid>
  );
}
