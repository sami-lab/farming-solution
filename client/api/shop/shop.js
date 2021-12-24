import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const createShop = async (token, data) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);
  var raw = JSON.stringify({
    what: data.what,
    where: data.where,
    whyChooseUs: data.whyChooseUs,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/shops/`,
    requestOptions
  );

  return response;
};

export const approveShop = async (token, shopId) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: null,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/administration/approveShop/${shopId}`,
    requestOptions
  );

  return response;
};

export const deleteShop = async (token, shopId) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('authorization', 'Bearer ' + token);

  var requestOptions = {
    method: 'delete',
    headers: myHeaders,
    body: null,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/shops/${shopId}`,
    requestOptions
  );

  return response;
};
export const getMyShop = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/shops/myshop`,
    requestOptions
  );

  return response;
};
export const getShopById = async (id) => {
  console.log(id);
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'get',
    headers: myHeaders,
    body: null,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/shops/${id}`,
    requestOptions
  );

  return response;
};

export const getShops = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/shops/`,
    requestOptions
  );

  return response;
};
