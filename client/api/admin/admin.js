import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';

export const blockUser = async (token, userId) => {
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
    `${publicRuntimeConfig.backend}/api/users/block/${userId}`,
    requestOptions
  );

  return response;
};

export const unBlockUser = async (token, userId) => {
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
    `${publicRuntimeConfig.backend}/api/users/unblock/${userId}`,
    requestOptions
  );

  return response;
};
export const getUsers = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/users/`,
    requestOptions
  );

  return response;
};
export const getCategories = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/categories/`,
    requestOptions
  );

  return response;
};

export const deleteCategory = async (token, categoryId) => {
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
    `${publicRuntimeConfig.backend}/api/categories/${categoryId}`,
    requestOptions
  );

  return response;
};

export const addCategory = async (token, data) => {
  var raw = new FormData();
  raw.append('name', data.name);
  raw.append('title', data.title);
  raw.append('heading', data.heading);
  raw.append('details', data.details);
  raw.append('image', data.image);
  const response = await axios.post(
    `${publicRuntimeConfig.backend}/api/categories/`,
    raw,
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  );

  return response;
};
export const getShopDashboardData = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/administration/getShopDashboardData`,
    requestOptions
  );

  return response;
};

export const getAllShopProduct = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/administration/shopProducts`,
    requestOptions
  );

  return response;
};
export const getAllShopOrder = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/order/shopOrders`,
    requestOptions
  );

  return response;
};
