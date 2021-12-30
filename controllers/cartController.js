const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Cart = require('../Models/cart');

exports.delete = catchAsync(async (req, res, next) => {
  const doc = await Cart.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('Requested Id not found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: 'deleted Successfully',
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const doc = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!doc) {
    return next(new AppError('requested Id not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.createOne = catchAsync(async (req, res, next) => {
  const { quantity, product } = req.body;
  const doc = await Cart.create({
    quantity: quantity ? quantity : 1,
    product,
    userId: req.user.id,
  });
  res.status(201).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  let doc = await Cart.findById(req.params.id).populate({
    path: 'product',
    model: 'Product',
    populate: {
      path: 'shopId',
      model: 'Shop',
    },
  });
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Cart.find().populate({
    path: 'product',
    model: 'Product',
    populate: {
      path: 'shopId',
      model: 'Shop',
    },
  });

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});

exports.myCart = catchAsync(async (req, res, next) => {
  req.params.userId = req.user.id;
  next();
});
exports.userCart = catchAsync(async (req, res, next) => {
  const doc = await Cart.find({ userId: req.params.userId }).populate({
    path: 'product',
    model: 'Product',
    populate: {
      path: 'shopId',
      model: 'Shop',
    },
  });

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});
