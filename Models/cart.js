const mongoose = require('mongoose');

var CartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },

  license: {
    type: String,
    require: [true, 'Please provide license details!'],
    default: 'personalLicence',
  },
  quantity: {
    type: Number,
    require: [true, 'Please provide quantity!'],
    default: 1,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});
CartSchema.index({ userId: 1, product: 1 }, { unique: true });
var Cart = mongoose.model('UserCart', CartSchema);
module.exports = Cart;
