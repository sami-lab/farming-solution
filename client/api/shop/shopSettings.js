import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';

export const updateShopCover = async (token, file) => {
  var raw = new FormData();
  raw.append('shopCover', file);
  const response = await axios.patch(
    `${publicRuntimeConfig.backend}/api/shops/updateCover`,
    raw,
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  );

  return response;
};

export const updateShopProfile = async (token, file) => {
  var raw = new FormData();
  raw.append('shopProfile', file);
  const response = await axios.patch(
    `${publicRuntimeConfig.backend}/api/shops/updateProfile`,
    raw,
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  );

  return response;
};

export const updateShopData = async (token, data) => {
  const response = await axios.patch(
    `${publicRuntimeConfig.backend}/api/shops/updateShop`,
    data,
    {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  );

  return response;
};
