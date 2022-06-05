import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import axios from "axios";

export const addToCart = async (token, product, quantity, license) => {
  const response = await axios.post(
    `${publicRuntimeConfig.backend}/api/cart/`,
    {
      product,
      quantity: quantity,
      license: license,
    },
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );

  return response;
};

export const getMyCart = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);

  var requestOptions = {
    method: "get",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };
  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/cart/myCart`,
    requestOptions
  );

  return response;
};
export const deleteCart = async (token, id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);

  var requestOptions = {
    method: "delete",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/cart/${id}`,
    requestOptions
  );

  return response;
};

export const checkout = async (
  token,
  stripeToken,
  cartItems,
  name,
  address,
  zipCode,
  phone,
  paymentMethod
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authorization", "Bearer " + token);
  var raw = JSON.stringify({
    stripeToken,
    cartItems,
    name,
    address,
    zipCode,
    phone,
    paymentMethod,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/order/cartCheckout`,
    requestOptions
  );

  return response;
};
