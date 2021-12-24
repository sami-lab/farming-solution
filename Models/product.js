const mongoose = require('mongoose');
const validator = require('validator');

var ProductSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Product must have a Title!'],
  },
  productCategory: {
    type: String,
    require: [true, 'Product must have a Category!'],
    // type: mongoose.Schema.ObjectId,
    // ref: 'Category',
    // require: [true, 'Product must have a Category!'],
  },
  shopId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Shop',
    require: [true, 'Product must have a Shop!'],
  },
  images: [String],
  description: {
    type: String,
    require: [true, 'Please provide product description!'],
  },
  details: {
    type: String,
  },

  price: {
    type: Number,
    require: [true, 'Product must have a price!'],
    min: [0, 'Price must be above 0'],
  },
  unit: {
    type: String,
  },
  delieveryPrice: {
    type: Number,
    require: [true, 'Delievery Product must have a price!'],
    min: [0, 'Price must be above 0'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  tags: [String],
});

var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
