const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Category = require('../Models/category');

exports.delete = catchAsync(async (req, res, next) => {
  const doc = await Category.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('Requested Id not found', 404));
  }
  res.status(204).json({
    status: 'success',
    data: 'deleted Successfully',
  });
});
exports.update = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const doc = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
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
  const { name, title, heading, details } = req.body;
  if (req.file) image = req.file.filename;
  const doc = await Category.create({ name, title, heading, details, image });
  res.status(201).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.getOne = catchAsync(async (req, res, next) => {
  let doc = await Category.findById(req.params.id);
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Category.find();

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});
