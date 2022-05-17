import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import axios from "axios";
export const createProduct = async (token, data) => {
  var raw = new FormData();
  Object.keys(data).map((key) => {
    if (Array.isArray(data[key])) {
      //raw.append(key, JSON.stringify(data[key]));

      for (let i = 0; i < data[key].length; i++) {
        raw.append(key, data[key][i]);
      }
    } else {
      raw.append(key, data[key]);
    }
  });
  const response = await axios.post(
    `${publicRuntimeConfig.backend}/api/products/`,
    raw,
    {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};
export const updateProduct = async (token, id, data) => {
  var raw = new FormData();
  raw.append("title", data.title);
  raw.append("productCategory", data.productCategory);
  raw.append("description", data.description);
  raw.append("details", data.details);
  raw.append("price", data.price);
  raw.append("unit", data.unit);
  raw.append("deliveryPrice", data.deliveryPrice);

  raw.append("tags", JSON.stringify(data.tags));
  raw.append("images", JSON.stringify(data.images));
  raw.append("newImagesIndex", JSON.stringify(data.newImagesIndex));
  raw.append("deletedImages", JSON.stringify(data.deletedImages));

  for (let i = 0; i < data.newImages.length; i++) {
    raw.append("newImages", data.newImages[i]);
  }

  console.log(raw);
  const response = await axios.post(
    `${publicRuntimeConfig.backend}/api/products/${id}`,
    raw,
    {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};
export const getProductByName = async (name) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "get",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/products/getProductByName/${name}`,
    requestOptions
  );

  return response;
};
export const getProductById = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "get",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/products/${id}`,
    requestOptions
  );

  return response;
};
export const getProductByCategory = async (category) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "get",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/products/category/${category}`,
    requestOptions
  );

  return response;
};

export const getProductByShop = async (shopId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "get",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/products/shop/${shopId}`,
    requestOptions
  );

  return response;
};
export const getRecentProducts = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "get",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  };

  const response = await fetch(
    `${publicRuntimeConfig.backend}/api/products/recentProducts`,
    requestOptions
  );

  return response;
};
export const deleteProduct = async (token, id) => {
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
    `${publicRuntimeConfig.backend}/api/products/${id}`,
    requestOptions
  );

  return response;
};
