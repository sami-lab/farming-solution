const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Product = require('../Models/product');
const Category = require('../Models/category');

const fs = require('fs');

exports.decode = (req, res, next) => {
  //req.body.compatibleWith = JSON.parse(req.body.compatibleWith);
  //req.body.tags = JSON.parse(req.body.tags);
  //req.body.images = JSON.parse(req.body.images);
  //next();
  res.status(200).json({
    status: 'success',
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
        console.log(f + ' deleted.');
        deleteFiles(files, callback);
      }
    });
  }
}
exports.delete = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('Requested Id not found', 404));
  //means some wrong move by mislead user
  if (product.shopId !== req.user.shop.id) {
    return next(new AppError('Access Denied ', 403));
  }
  const doc = await Product.deleteOne(req.params.id);
  if (!doc) return next(new AppError('Requested Id not found', 404));
  fs.unlink(`/public/files/${product.file}`, function (err) {
    if (err) {
      console.log(
        'Product file not deleted',
        product.id + ' : ' + product.name
      );
    }
  });
  deleteFiles(
    product.images.map((x) => `/public/files/${x}`),
    function (err) {
      if (err) {
        console.log(
          'Product images not deleted',
          product.id + ' : ' + product.name
        );
      }
    }
  );
  res.status(204).json({
    status: 'success',
    data: 'deleted Successfully',
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(
    req.body,
    'title',
    'productCategory',
    'description',
    'details',
    'price',
    'unit',
    'deliveryPrice',
    'tags'
  );

  //Must adjust images here

  //Saving IN DB
  const doc = await Product.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(
    req.body,
    'title',
    'productCategory',
    'description',
    'details',
    'price',
    'unit',
    'deliveryPrice',
    'tags'
  );
  if (req.files && req.files.images)
    filterBody.images = req.files.images.map((item) => item.filename);

  filterBody.shopId = req.user.shop._id;
  const doc = await Product.create(filterBody);

  res.status(201).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

exports.getProductByName = catchAsync(async (req, res, next) => {
  let doc = await Product.findOne({ title: req.params.productName }).populate(
    'shopId'
  );
  if (!doc) return next(new AppError('requested Product not found', 404));

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  let doc = await Product.findById(req.params.id).populate('shopId');
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Product.find().populate('shopId');

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});

//Get All Products Based on Category
exports.getAllProductsCategories = catchAsync(async (req, res, next) => {
  const doc = await Product.find({
    productCategory: req.params.category,
  }).populate('shopId');

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});

//Get all Products of my shop
exports.getMyProducts = catchAsync(async (req, res, next) => {
  if (req.user.roles.filter((role) => role.name === 'Manager')) {
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
  }).populate('shopId');

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});
//Get recent Products
exports.recentproducts = catchAsync(async (req, res, next) => {
  const Graphics = await Product.find({
    productCategory: 'Graphics',
  })
    .populate('shopId')
    .sort({ date: -1 })
    .limit(4);

  const Fonts = await Product.find({
    productCategory: 'Fonts',
  })
    .populate('shopId')
    .sort({ date: -1 })
    .limit(4);

  const products = await Product.find({}).populate('shopId').limit(3);
  const categories = await Category.find().limit(7);

  res.status(200).json({
    status: 'success',
    data: {
      products,
      Graphics,
      Fonts,
      categories,
    },
  });
});
//Get recent Products
exports.recentproduct = catchAsync(async (req, res, next) => {
  const doc = await Product.aggregate([
    { $sort: { date: -1 } },

    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ['$products', 0] }, '$$ROOT'],
        },
      },
    },
    {
      $group: {
        // '_id':'{$toUpper : $difficulty'},
        // _id:'$ratingAverage',
        _id: '$productCategory',
        products: { $push: '$$ROOT' },
      },
    },

    {
      $project: {
        // pagination for products
        products: {
          $slice: ['$products', 4],
        },
        _id: 1,
        catName: 1,
        catDescription: 1,
      },
    },
    {
      $lookup: {
        from: 'Shop',
        localField: 'shopId',
        foreignField: '_id',
        as: 'shop',
      },
    },
  ]);
  //await Shop.populate(doc, { path: 'shopId' });
  console.log(doc);
  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});
