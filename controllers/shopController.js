const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const Shop = require('../Models/shop');

exports.delete = catchAsync(async (req, res, next) => {
  if (req.user.roles.filter((role) => role.name === 'Shop Manager')) {
    //Here we are checking shop manager can only update his shop and not others shop
    const shops = await Shop.find({ managerId: req.user.id });
    //check user shops includes current updated shop
    if (!shops.filter((shop) => shop._id === req.params.id)) {
      return next(
        new AppError('You dont have permission to view this route', 404)
      );
    }
  }
  const doc = await Shop.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('Requested Id not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: 'deleted Successfully',
  });
});

//To Update Shop of current user
exports.update = catchAsync(async (req, res, next) => {
  const { shopName, shopDescription } = req.body;

  const doc = await Shop.findOneAndUpdate(
    { managerId: req.user.id },
    { shopName, shopDescription },
    {
      new: true,
      runValidators: false,
    }
  );
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

exports.updateCover = catchAsync(async (req, res, next) => {
  let shopCover = null;
  if (req.file) shopCover = req.file.filename;
  else return next(new AppError('Please choose file to update', 401));

  const doc = await Shop.findOneAndUpdate(
    { managerId: req.user.id },
    { shopCover },
    {
      new: true,
      runValidators: false,
    }
  );
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.updateProfile = catchAsync(async (req, res, next) => {
  let shopProfile = null;
  if (req.file) shopProfile = req.file.filename;
  else return next(new AppError('Please choose file to update', 401));

  const doc = await Shop.findOneAndUpdate(
    { managerId: req.user.id },
    { shopProfile },
    {
      new: true,
      runValidators: false,
    }
  );
  if (!doc) return next(new AppError('requested Id not found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});
exports.createOne = catchAsync(async (req, res, next) => {
  const { productUrl, portfolioUrl, whyChooseUs } = req.body;
  if (!productUrl || !portfolioUrl || !whyChooseUs)
    return next(new AppError('Could not be able to add this shop', 400));
  let doc = new Shop({
    productUrl,
    portfolioUrl,
    managerId: req.user.id,
    whyChooseUs,
  });
  doc = await doc.save({ validateBeforeSave: false });
  if (!doc) {
    return next(new AppError('Could not be able to add this shop', 500));
  }
  res.status(201).json({
    status: 'success',
    message: 'Waiting for approval from admin',
    data: {
      doc,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  let doc = await Shop.find({
    $and: [{ _id: req.params.id }, { shopStatus: { $ne: false } }],
  })
    .populate('managerId', 'name email')
    .populate('shopCategory');
  if (!doc) {
    return next(new AppError('requested Id not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { doc },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const doc = await Shop.find().populate('managerId', 'name email');

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});

//Shop manager  Route to get his shops
exports.myshops = catchAsync(async (req, res, next) => {
  const doc = await Shop.findOne({ managerId: req.user.id }).select(
    '+shopStatus'
  );

  if (!doc) {
    return next(new AppError('requested Shop not found', 404));
  }
  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});

//Search Shop with  manager ID
exports.managerShops = catchAsync(async (req, res, next) => {
  const doc = await Shop.find({
    $and: [{ managerId: req.params.managerId }, { shopStatus: { $ne: false } }],
  }).populate('managerId', 'name email');

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: { doc },
  });
});
