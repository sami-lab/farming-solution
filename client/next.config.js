module.exports = {
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    backend: process.env.API_URL,
    stripe: process.env.stripe,
    platformFee: process.env.platformFee,
    gst: process.env.gst,
  },
  //{
  //   NODE_ENV: 'development',
  //   backend: 'http://localhost:5000',
  // },
};
