const mongoose = require("mongoose");

var OrderSchema = mongoose.Schema({
  Date: {
    type: Date,
    default: Date.now(),
  },

  // paymentMethod: {
  //     type:String,
  //     enum: ['CashOnDelievery'],
  //     default: 'CashOnDelievery',
  //     require: [true, "Order must have Payment method"]
  // },
  totalAmount: {
    type: Number,
    min: [1, "Amount must be above 0"],
  },
  quantity: {
    type: Number,
    min: [0, "Quantity must be above 0"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "Order Must have a Customer Data"],
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    require: [true, "Order Must contain product"],
  },
  shopId: {
    type: mongoose.Schema.ObjectId,
    ref: "Shop",
    require: [true, "Order Must contain Shop"],
  },
  transactionId: {
    email: String,
  },
  name: {
    type: String,
    require: [true, "Order Must belong to any person"],
  },
  zipCode: {
    type: String,
    require: [true, "zipcode cannot be empty"],
  },
  address: {
    type: String,
    require: [true, "Address cannot be empty"],
  },
});

var order = mongoose.model("Order", OrderSchema);
module.exports = order;
