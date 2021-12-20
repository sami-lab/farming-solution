const mongoose = require('mongoose');

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
  license: {
    type: String,
    enum: ['personalLicence', 'commercialLicence', 'extendedCommercialLicence'],
    default: 'personalLicence',
    require: [true, 'Order must have license type'],
  },
  totalAmount: {
    type: Number,
    min: [1, 'Amount must be above 0'],
  },
  quantity: {
    type: Number,
    min: [1, 'Quantity must be above 0'],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Order Must have a Customer Data'],
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: [true, 'Order Must contain product'],
  },
  shopId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    require: [true, 'Order Must contain Shop'],
  },
  transactionId: {
    type: String,
  },
});

var order = mongoose.model('Order', OrderSchema);
module.exports = order;
