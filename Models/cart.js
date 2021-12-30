const mongoose = require('mongoose');

var CartSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
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
