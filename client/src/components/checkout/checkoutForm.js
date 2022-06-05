import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, useTheme, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { CardElement } from "@stripe/react-stripe-js";
import { checkout } from "../../../api/cart/cart";

const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },
}));
export default function CheckoutForm(props) {
  const t = props.languageJson;
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const { stripe, elements } = props;

  const [isCustomer, setIsCustomer] = useState(
    props?.store?.stripeCustomerId ? true : false
  );

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(!stripe);

  const handleChangeStripe = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    console.log("event ", event);
    setDisabled(event.empty || event.error || !event.complete);
    setError(event.error ? event.error.message : "");
  };

  const checkoutHandler = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      if (props.paymentMethod === "stripe") {
        props.stripe
          .createToken(props.elements.getElement(CardElement))
          .then(async (res) => {
            if (res.error) {
              setError(res.error.message);
            } else {
              const response = await checkout(
                props.userToken,
                res?.token,
                props.products,
                props.name,
                props.address,
                props.zipCode,
                props.phone,
                props.paymentMethod
              );
              const result = await response.json();
              if (result.status === "success") {
                props.elements.getElement(CardElement).clear();
                router.push("/purchase");
              } else {
                setError("Something went wrong");
              }
            }
            setProcessing(false);
          });
      } else {
        const response = await checkout(
          props.userToken,
          "",
          props.products,
          props.name,
          props.address,
          props.zipCode,
          props.phone,
          props.paymentMethod
        );
        const result = await response.json();
        if (result.status === "success") {
          if (props.paymentMethod === "stripe") {
            props.elements.getElement(CardElement).clear();
          }
          router.push("/purchase");
        } else {
          setError("Something went wrong");
        }
        setProcessing(false);
      }
    } catch (err) {
      console.log(err);
      setProcessing(false);
      setError(err.message);
    }
  };
  const cardStyle = {
    style: {
      root: {
        backgroundColor: "#fff",
      },
      base: {
        // border: "2px solid blue",
        // margin: "1rem",
        color: "#32325d",

        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        // color: 'red',
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <form id="payment-form" onSubmit={checkoutHandler}>
      {props.paymentMethod === "stripe" && (
        <div
          style={{
            border: "1px solid #D6D9DB",
            padding: "1rem",
            borderRadius: "3px",
            marginBottom: "1rem",
            // color: "red"
          }}
        >
          <CardElement
            id="card-element"
            className="card-element"
            options={{
              hidePostalCode: true,
              style: cardStyle,
            }}
            onChange={handleChangeStripe}
          />
        </div>
      )}
      <div
        style={{
          // border: "2px solid blue",
          marginTop: "1rem",
          display: "flex",
          // justifyContent: "flex-end",
          alignItems: "center",
          cursor:
            processing ||
            (props.paymentMethod === "stripe" && (disabled || succeeded))
              ? "not-allowed"
              : "pointer",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{
            backgroundColor:
              processing ||
              (props.paymentMethod === "stripe" && (disabled || succeeded)) ||
              props.name === "" ||
              props.phone === "" ||
              props.address === "" ||
              props.zipCode === ""
                ? "#E1E8EE"
                : theme.palette.common.primary,
          }}
          disabled={
            processing ||
            (props.paymentMethod === "stripe" && (disabled || succeeded)) ||
            props.phone === "" ||
            props.name === "" ||
            props.address === "" ||
            props.zipCode === ""
          }
        >
          {processing ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <span
              className={classes.label}
              style={{
                color:
                  processing ||
                  (props.paymentMethod === "stripe" && (disabled || succeeded))
                    ? "#2d2d2d"
                    : theme.palette.common.light,
                cursor:
                  processing ||
                  (props.paymentMethod === "stripe" && (disabled || succeeded))
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {t["Enter Payment to Purchase"]}
            </span>
          )}
        </Button>
      </div>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div
          className="card-error"
          role="alert"
          style={{ color: "red", textAlign: "center" }}
        >
          {error}
        </div>
      )}
      <style jsx>{`
        #payment-form > div {
          background-color: #fff;
        }
      `}</style>
    </form>
  );
}
