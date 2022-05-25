import React from "react";

export default function Chat() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        width="350"
        height="430"
        allow="microphone;"
        src="https://console.dialogflow.com/api-client/demo/embedded/d34275b0-41eb-4fe8-a31e-990447f65104"
      ></iframe>
    </div>
  );
}
