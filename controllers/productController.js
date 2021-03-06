const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Product = require("../Models/product");
const Order = require("../Models/order");
const Category = require("../Models/category");

const fs = require("fs");

exports.decode = (req, res, next) => {
  //req.body.compatibleWith = JSON.parse(req.body.compatibleWith);
  //req.body.tags = JSON.parse(req.body.tags);
  //req.body.images = JSON.parse(req.body.images);
  //next();
  res.status(200).json({
    status: "success",
    body: req.body,
    files: req.files,
  });
};
//To filter Some fields from req.body so we can update only these fields
const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).filter((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
function deleteFiles(files, callback) {
  if (files.length == 0) callback();
  else {
    var f = files.pop();
    fs.unlink(f, function (err) {
      if (err) callback(err);
      else {
        console.log(f + " deleted.");
        deleteFiles(files, callback);
      }
    });
  }
}
exports.delete = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError("Requested Id not found", 404));
  //means some wrong move by mislead user

  if (!product.shopId.equals(req.user.shop._id)) {
    return next(new AppError("Access Denied ", 403));
  }
  const doc = await Product.findByIdAndDelete(req.params.id);
  if (!doc) return next(new AppError("Requested Id not found", 404));
  await Order.deleteMany({ productId: doc._id });

  deleteFiles(
    product.images.map((x) => `${__dirname}/../public/files/${x}`),
    function (err) {
      if (err) {
        console.log(
          "Product images not deleted",
          product.id + " : " + product.title
        );
      }
    }
  );
  res.status(200).json({
    status: "success",
    data: "deleted Successfully",
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(
    req.body,
    "title",
    "productCategory",
    "description",
    "details",
    "price",
    "unit",
    "deliveryPrice",
    "tags",
    "images",
    "newImagesIndex",
    "deletedImages"
  );
  filterBody.tags = JSON.parse(filterBody.tags);
  filterBody.images = JSON.parse(filterBody.images);
  filterBody.newImagesIndex = JSON.parse(filterBody.newImagesIndex);
  filterBody.deletedImages = JSON.parse(filterBody.deletedImages);

  //if new images are uploaded
  if (req.files && req.files.newImages) {
    let newImgs = req.files.newImages.map((item) => item.filename);
    //replaces file with filename
    filterBody.newImagesIndex.map((i, ind) => {
      filterBody.images[i] = {
        new: true,
        img: newImgs[ind],
      };
    });
  }
  filterBody.images = filterBody.images.map((x) => x.img);

  //Saving IN DB
  const doc = await Product.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });
  if (!doc) return next(new AppError("requested Id not found", 404));

  //deleting images that is deleted
  if (filterBody.deletedImages && filterBody.deletedImages.length > 0) {
    deleteFiles(
      filterBody.deletedImages.map((x) => `/public/files/${x}`),
      function (err) {
        if (err) {
          console.log(
            "Product images not deleted",
            req.params.id + " : " + filterBody.title
          );
        }
      }
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(
    req.body,
    "title",
    "productCategory",
    "description",
    "details",
    "price",
    "unit",
    "deliveryPrice",
    "tags"
  );
  if (req.files && req.files.images)
    filterBody.images = req.files.images.map((item) => item.filename);

  filterBody.shopId = req.user.shop._id;
  const doc = await Product.create(filterBody);

  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.getProductByName = catchAsync(async (req, res, next) => {
  let doc = await Product.findOne({ title: req.params.productName }).populate(
    "shopId"
  );
  if (!doc) return next(new AppError("requested Product not found", 404));

  res.status(200).json({
    status: "success",
    data: { doc },
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  let doc = await Product.findById(req.params.id).populate("shopId");
  if (!doc) return next(new AppError("requested Id not found", 404));

  res.status(200).json({
    status: "success",
    data: { doc },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Product.find().populate("shopId");

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: { doc },
  });
});

//Get All Products Based on Category
exports.getAllProductsCategories = catchAsync(async (req, res, next) => {
  const doc = await Product.find({
    productCategory: req.params.category,
  }).populate("shopId");

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: { doc },
  });
});

//Get all Products of my shop
exports.getMyProducts = catchAsync(async (req, res, next) => {
  if (req.user.roles.filter((role) => role.name === "Manager")) {
    req.params.shop = req.user.id;
  }
  next();
});
exports.getAllProductofShopManager = catchAsync(async (req, res, next) => {
  req.params.shopId = req.user.shop._id;

  next();
});
//Get All products of particular shop
exports.getAllProductofShop = catchAsync(async (req, res, next) => {
  //All Products with
  const doc = await Product.find({
    shopId: req.params.shopId,
  }).populate("shopId");

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: { doc },
  });
});
//Get recent Products
exports.recentproduct = catchAsync(async (req, res, next) => {
  const Graphics = await Product.find({
    productCategory: "Graphics",
  })
    .populate("shopId")
    .sort({ date: -1 })
    .limit(4);

  const Fonts = await Product.find({
    productCategory: "Fonts",
  })
    .populate("shopId")
    .sort({ date: -1 })
    .limit(4);

  const products = await Product.find({}).populate("shopId").limit(3);
  const categories = await Category.find().limit(7);

  res.status(200).json({
    status: "success",
    data: {
      products,
      Graphics,
      Fonts,
      categories,
    },
  });
});
//Get recent Products
exports.recentproducts = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  const doc = await Product.aggregate([
    { $sort: { date: -1 } },
    {
      $group: {
        _id: "$productCategory",
        products: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        products: { $slice: ["$products", 4] },
      },
    },
    {
      $lookup: {
        from: "shops",
        localField: "products.shopId",
        foreignField: "_id",
        as: "shop",
      },
    },
    {
      $project: {
        products: {
          $map: {
            input: "$products",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  shop: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$shop",
                          as: "s",
                          cond: { $eq: ["$$s._id", "$$this.shopId"] },
                        },
                      },
                      0,
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);
  //await Shop.populate(doc, { path: 'shopId' });

  res.status(200).json({
    status: "success",

    data: { products: doc, categories: categories },
  });
});
