import React from "react";
import { Grid } from "@material-ui/core";
import Header from "../src/resusable/header";
import Footer from "../src/resusable/footer";

export default function Chat(props) {
  const t = props.languageJson;

  return (
    <Grid container direction="column">
      <Grid item container>
        <Header {...props} languageJson={t} />
      </Grid>
      <Grid item container>
        <div
          style={{
            minHeight: "90vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/d34275b0-41eb-4fe8-a31e-990447f65104"
          ></iframe>
        </div>
      </Grid>
      <Grid item container>
        <Footer {...props} languageJson={t} />
      </Grid>
    </Grid>
  );
}
