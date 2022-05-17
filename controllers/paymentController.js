const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Product = require("../Models/product");
const Order = require("../Models/order");
const Cart = require("../Models/cart");
var fs = require("fs").promises;
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
// const Cart = require('../Models/cart');

exports.buyNow = catchAsync(async (req, res, next) => {
  const { productId, stripeToken, quantity, name, zipCode, address } = req.body;

  let product = await Product.findById(productId);
  if (!product) return next(new AppError("requested Product not found", 404));

  const fakeKey = uuidv4();
  return stripe.customers
    .create({
      email: stripeToken.email,
      source: stripeToken.id,
    })
    .then((customer) => {
      return stripe.charges.create(
        {
          ///source: stripeToken.card.id,
          customer: customer.id, // set the customer id
          amount:
            product.price * quantity +
            parseFloat(product.deliveryPrice) +
            parseFloat(process.env.platformFee + process.env.gst) * 100,
          currency: "usd",
          description: `Product ${product.title} Purchased `,
          receipt_email: stripeToken.email,
        },
        { idempotencyKey: fakeKey }
      );
    })
    .then(async (result) => {
      const doc = await Order.create({
        name,
        address,
        zipCode,
        totalAmount:
          (product.price + product.deliveryPrice) * quantity +
          parseFloat(process.env.platformFee + process.env.gst),
        quantity,
        shopId: product.shopId,
        productId,
        userId: req.user.id,
        transactionId: result.id,
      });

      res.status(201).json({
        status: "success",
        data: {
          doc,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      let message = "";
      switch (err.type) {
        case "StripeCardError":
          // A declined card error
          message = "Your card's expiration year is invalid.";
          break;
        case "StripeInvalidRequestError":
          message = "Invalid parameters were supplied to Stripe's API";
          break;
        case "StripeAPIError":
          message = "An error occurred internally with Stripe's API";
          break;
        case "StripeConnectionError":
          message =
            "Some kind of error occurred during the HTTPS communication";
          break;
        case "StripeAuthenticationError":
          message = "You probably used an incorrect API key";
          break;
        case "StripeRateLimitError":
          message = "Too many requests hit the API too quickly";
          break;
        default:
          message = "Something went wrong";
          break;
      }
      return next(new AppError(message, 500));
    });
});

//Search Shop with  manager ID
exports.userOrders = catchAsync(async (req, res, next) => {
  const doc = await Order.find({
    userId: req.user.id,
  })
    .populate("userId")
    .populate("productId");

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: { doc },
  });
});

exports.getAllOrderofShopManager = catchAsync(async (req, res, next) => {
  req.params.shopId = req.user.shop._id;

  next();
});
//Get All orders of particular shop
exports.getAllOrderofShop = catchAsync(async (req, res, next) => {
  //All Products with
  const doc = await Order.find({
    shopId: req.params.shopId,
  }).populate("shopId");

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: { doc },
  });
});

exports.checkout = catchAsync(async (req, res, next) => {
  const { cartItems, stripeToken, name, zipCode, address } = req.body;

  let products = await Product.find({
    _id: { $in: cartItems.map((x) => x.id) },
  });
  if (!products) return next(new AppError("requested Products not found", 404));
  let total =
    (cartItems.reduce((total, item) => {
      let pr = products.find((x) => x._id == item.id);

      return total + pr.price * item.quantity + pr.deliveryPrice;
    }, 0) +
      parseFloat(process.env.platformFee + process.env.gst)) *
    100;

  console.log(total);
  const fakeKey = uuidv4();
  return stripe.customers
    .create({
      email: req.user.email,
      source: stripeToken.id,
    })
    .then((customer) => {
      return stripe.charges.create(
        {
          ///source: stripeToken.card.id,
          customer: customer.id, // set the customer id
          amount: Math.ceil(total), // 25
          currency: "usd",
          description: `${products.length} Products Purchased `,
          receipt_email: req.user.email,
        },
        { idempotencyKey: fakeKey }
      );
    })
    .then(async (result) => {
      let finalArray = cartItems.map((item) => {
        let p = products.find((x) => x._id == item.id);
        return {
          name: name,
          zipCode,
          address,
          totalAmount: total,
          quantity: item.quantity,
          shopId: p.shopId,
          productId: item.id,
          userId: req.user.id,
          transactionId: result.id,
        };
      });
      const doc = await Order.insertMany(finalArray);
      await Cart.deleteMany({ userId: req.user._id });

      res.status(201).json({
        status: "success",
        data: {
          doc,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      let message = "";
      switch (err.type) {
        case "StripeCardError":
          // A declined card error
          message = "Your card's expiration year is invalid.";
          break;
        case "StripeInvalidRequestError":
          message = "Invalid parameters were supplied to Stripe's API";
          break;
        case "StripeAPIError":
          message = "An error occurred internally with Stripe's API";
          break;
        case "StripeConnectionError":
          message =
            "Some kind of error occurred during the HTTPS communication";
          break;
        case "StripeAuthenticationError":
          message = "You probably used an incorrect API key";
          break;
        case "StripeRateLimitError":
          message = "Too many requests hit the API too quickly";
          break;
        default:
          message = "Something went wrong";
          break;
      }
      return next(new AppError(message, 500));
    });
});
exports.downloadFile = catchAsync(async (req, res, next) => {
  try {
    //checking this product is in purchase of actve user?
    const order = await Order.findOne({
      $and: [{ userId: req.user.id }, { productId: req.params.id }],
    }).populate("productId", "+file");

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "requested file not found",
      });
    }

    res.set("Access-Control-Expose-Headers", "file");
    res.set("file", order.productId.file);
    res.download(
      path.join(__dirname, "../files", order.productId.file),
      order.productId.file,
      function (err) {
        if (err) {
          console.log(err);

          // Handle error, but keep in mind the response may be partially-sent
          // so check res.headersSent
        } else {
          console.log("Success");

          // decrement a download credit, etc.
        }
      }
    );
  } catch (err) {
    console.log(err);
    return next(new AppError("Something went wrong", 404));
  }
});
