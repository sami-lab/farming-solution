const mongoose = require('mongoose');

var ShopSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      default: 'Shop Name here',
      required: [true, 'A Shop must have name'],
    },
    shopDescription: {
      type: String,
      default: 'Shop description here',
      required: [true, 'A Shop must have name'],
    },
    shopProfile: {
      type: String,
      default: 'defaultShop.png',
    },
    shopCover: {
      type: String,
      required: [true, 'A Shop must have Cover photo'],
    },
    phone: {
      type: String,
      required: [true, 'A Shop must have hepline number'],
    },
    shopStatus: {
      type: Boolean,
      default: false,
      //select: false,
    },
    where: {
      type: String,
      required: [true, 'A Shop must have its food description'],
    },
    what: {
      type: String,
      required: [true, 'A Shop must have its food description'],
    },
    whyChooseUs: {
      type: String,
      required: [true, 'A Shop must have Why Choose Us Text'],
    },
    managerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      unique: true,
      require: [true, 'Shop must have a manager!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
