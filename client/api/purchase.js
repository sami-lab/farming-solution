import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const createOrder = async (
  token,
  stripeToken,
  productId,
  name,
  address,
  zipCode,
  quantity
) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);
  var raw = JSON.stringify({
    stripeToken,
    productId,
    name,
    address,
    zipCode,
    quantity,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/order/`,
    requestOptions
  );

  return response;
};

export const getOrders = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);
  var requestOptions = {
    method: 'get',
    headers: myHeaders,
    body: null,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/order/userOrders`,
    requestOptions
  );

  return response;
};

export const download = async (token, productId) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);
  var requestOptions = {
    method: 'get',
    headers: myHeaders,
    body: null,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/order/downloadFile/` + productId,
    requestOptions
  );

  return response;
};
