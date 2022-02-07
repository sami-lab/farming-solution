const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//const Email = require('../utils/emails');

const User = require("../Models/userModel");
const Shop = require("../Models/shop");
const Roles = require("../Models/roles");
const Order = require("../Models/order");
const Product = require("../Models/product");

//For Admin
exports.pendingShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.find({ shopStatus: false });

  res.status(204).json({
    status: "success",
    result: shop.length,
    data: {
      doc: shop,
    },
  });
});
//For Admin
exports.approveShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndUpdate(req.params.id, {
    shopStatus: true,
  });
  if (!shop) return next(new AppError("No Shop Exist with this id", 404));

  const ShopManagerRole = await Roles.findOne({ name: "Manager" });
  await User.findByIdAndUpdate(
    shop.managerId,
    {
      $push: { roles: ShopManagerRole._id },
    },
    {
      new: false,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Shop Approved Successfully",
  });
});
function getDayName(dateStr, locale) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
}
exports.getShopDashboardData = catchAsync(async (req, res, next) => {
  if (!req.user.shop) {
    return next(new AppError("Not Allowed", 403));
  }
  let finalData = {
    shopId: req.user.shop._id,
    shopName: req.user.shop.shopName,
  };

  const MONTHS_ARRAY = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let lastYearSalesGraph = await Order.aggregate([
    { $match: { shopId: req.user.shop._id } },
    {
      $match: {
        Date: {
          $gte: new Date(new Date().getTime() - 360 * 24 * 60 * 60 * 1000),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$Date" },
        y: { $sum: "$totalAmount" },
      },
    },
  ]);
  finalData.lastYearSalesGraph = lastYearSalesGraph.map((it) => {
    return {
      label: MONTHS_ARRAY[it._id - 1],
      y: it.y,
    };
  });

  let lastMonthSalesGraph = await Order.aggregate([
    { $match: { shopId: req.user.shop._id } },
    {
      $match: {
        Date: {
          $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $group: { _id: "$Date", y: { $sum: "$totalAmount" } } },
  ]);
  finalData.lastMonthSalesGraph = lastMonthSalesGraph.map((it) => {
    return {
      x: it._id,
      y: it.y,
    };
  });

  let lastWeekSalesGraph = await Order.aggregate([
    { $match: { shopId: req.user.shop._id } },
    {
      $match: {
        Date: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $group: { _id: "$Date", y: { $sum: "$totalAmount" } } },
  ]);
  finalData.lastWeekSalesGraph = lastWeekSalesGraph.map((item) => {
    return {
      y: item.y,
      label: getDayName(item._id, "en-US"),
    };
  });

  let totalSales = await Order.aggregate([
    { $match: { shopId: req.user.shop._id } },
    { $group: { _id: null, amount: { $sum: "$totalAmount" } } },
  ]);
  finalData.totalSales = totalSales[0] ? totalSales[0].amount : 0;

  let lastMonthSales = await Order.aggregate([
    { $match: { shopId: req.user.shop._id } },
    {
      $match: {
        Date: {
          $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $group: { _id: null, amount: { $sum: "$totalAmount" } } },
  ]);
  finalData.lastMonthSales = lastMonthSales[0] ? lastMonthSales[0].amount : 0;

  let lastWeekSales = await Order.aggregate([
    { $match: { shopId: req.user.shop._id } },
    {
      $match: {
        Date: {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    },
    { $group: { _id: null, amount: { $sum: "$totalAmount" } } },
  ]);
  finalData.lastWeekSales = lastWeekSales[0] ? lastWeekSales[0].amount : 0;

  let TotalProducts = await Product.countDocuments({
    shopId: req.user.shop._id,
  });
  finalData.TotalProducts = TotalProducts;

  let recentProducts = await Product.find({ shopId: req.user.shop._id })
    .sort({ _id: -1 })
    .limit(5);
  finalData.recentProducts = recentProducts;

  let recentSales = await Order.find({ shopId: req.user.shop._id })
    .sort({ _id: -1 })
    .populate("productId", "productId title productCategory")
    .populate("userId", "name")
    .limit(5);
  finalData.recentSales = recentSales;

  res.status(200).json({
    status: "success",
    data: finalData,
  });
});
