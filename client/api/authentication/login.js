import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
export const validateToken = async (token) => {
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
    `${publicRuntimeConfig.backend}/api/users/validateToken`,
    requestOptions
  );

  return response;
};
export const login = async (email, password) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    email,
    password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/users/login`,
    requestOptions
  );

  return response;
};

export const signUp = async (
  firstName,
  lastName,
  email,
  userName,
  password
) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({
    firstName,
    lastName,
    email,
    userName,
    password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/users/signup`,
    requestOptions
  );

  return response;
};

export const changePassword = async (token, data) => {
  const response = await axios.patch(
    `${publicRuntimeConfig.backend}/api/users/updatePassword`,
    data,
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  );

  return response;
};
export const updateProfile = async (token, data) => {
  var raw = new FormData();
  Object.keys(data).map((key) => {
    raw.append(key, data[key]);
  });
  const response = await axios.patch(
    `${publicRuntimeConfig.backend}/api/users/updateMe`,
    raw,
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  );

  return response;
};
