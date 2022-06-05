const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("../Models/userModel");

//To filter Some fields from req.body so we can update only these fields
const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).filter((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user Post Password
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not for Updating Password", 400));
  }
  //update User Document
  const filterBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "phone",
    "userName",
    "zipCode",
    "address",
    "twitter",
    "facebook",
    "instagram"
  ); //filtering unwanted Field
  if (req.file) filterBody.image = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  }).populate("roles");
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
  });
});

exports.getalluser = catchAsync(async (req, res, next) => {
  const doc = await User.find().populate("roles");

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: { doc },
  });
});
exports.getUser = catchAsync(async (req, res, next) => {
  let doc = await User.findById(req.params.id).populate("roles", "_id name");
  if (!doc) return next(new AppError("requested Id not found", 404));

  res.status(200).json({
    status: "success",
    data: { doc },
  });
});
//Do not Update Password with this
exports.updateUser = catchAsync(async (req, res, next) => {
  let user = {};
  user.name = req.body.name;
  user.email = req.body.email;
  if (req.file) user.photo = req.file.filename;
  const doc = await User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
  }).populate("roles");
  if (!doc) {
    return next(new AppError("requested Id not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("Requested Id not found", 404));
  }
  res.status(204).json({
    status: "success",
    data: "deleted Successfully",
  });
});

exports.block = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    active: false,
  });
  if (!user) return next(new AppError("No Shop Exist with this id", 404));

  res.status(200).json({
    status: "success",
    message: "User block Successfully",
  });
});
exports.unblock = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    active: true,
  });
  if (!user) return next(new AppError("No Shop Exist with this id", 404));

  res.status(200).json({
    status: "success",
    message: "User Unblock Successfully",
  });
});
