module.exports = {
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    backend: process.env.API_URL,
    stripe: process.env.stripe,
    platformFee: process.env.platformFee,
    gst: process.env.gst,
    phone: process.env.phone,
    whatsapp: process.env.whatsapp,
    email: process.env.email,
    address: process.env.address,
  },
  //{
  //   NODE_ENV: 'development',
  //   backend: 'http://localhost:5000',
  // },
};
