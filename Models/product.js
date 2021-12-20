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
  videoUrl: {
    type: String,
    require: false,
    //validate: [validator.isURL, 'Please Provide a Valid Video URL'],
  },
  images: [String],
  description: {
    type: String,
    require: [true, 'Please provide product description!'],
  },
  details: {
    type: String,
  },
  file: {
    type: String,
    require: [true, 'file cannot be null!'],
    select: false,
  },
  personalLicence: {
    type: Number,
    require: [true, 'Product must have  a personal Licence price!'],
    min: [0, 'Price must be above 0'],
  },
  commercialLicence: {
    type: Number,
    require: [true, 'Product must have  a commercial Licence price!'],
    min: [0, 'Price must be above 0'],
  },
  extendedCommercialLicence: {
    type: Number,
    require: [true, 'Product must have  a extended  Licence price!'],
    min: [0, 'Price must be above 0'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  compatibleWith: [String],
  layered: {
    type: Boolean,
    default: false,
  },
  tileable: {
    type: Boolean,
    default: false,
  },
  vector: {
    type: Boolean,
    default: false,
  },
  tags: [String],
});

var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
