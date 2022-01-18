const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Shop = require('../Models/shop');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/emails');
const Roles = require('../Models/roles');

const createLoginToken = async (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  if (user.roles.some((role) => role.name === 'Manager')) {
    const doc = await Shop.findOne({ managerId: user._id }).select(
      '+shopStatus'
    );

    if (doc) {
      user = {
        ...user._doc,
        shop: doc,
        id: user._doc._id,
      };
    }
  }
  user.password = undefined; //not saving
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
//This route is only for User Registeration
exports.signUp = catchAsync(async (req, res, next) => {
  const roleId = await Roles.findOne({ name: 'User' });
  if (!roleId)
    return next(
      new AppError('Sorry! Application is not ready to register Userss', 500)
    );
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    roles: [roleId._id],
  };

  newUser = await User.create(newUser);
  //Generate Random Token
  await createLoginToken(newUser, 200, req, res);
});
exports.signUpAdmin = async () => {
  let u = await User.countDocuments({ email: process.env.email });
  if (u === 0) {
    const roleId = await Roles.findOne({ name: 'Admin' });
    if (!roleId)
      return {
        error: true,
        status: 500,
        message: 'Sorry! Application is not ready to register Userss',
      };

    let newUser = {
      firstName: process.env.firstName,
      lastName: process.env.lastName,
      email: process.env.email,
      userName: process.env.userName,
      password: process.env.password,
      emailVerified: true,
      roles: [roleId._id],
    };
    newUser = await User.create(newUser);
    if (!newUser) {
      return {
        error: true,
        status: 500,
        message: 'server unable to read this request',
      };
    }
  }

  return {
    error: false,
  };
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please Provide Email and password', 400));
  }
  const user = await User.findOne({
    $or: [{ email: email }, { userName: email }],
  })
    .populate('roles')
    .select('+password');

  //Comparing password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or password', 401));
  }
  if (!user.active) {
    return next(new AppError('Sorry! User is not allowed to Login', 500));
  }
  await createLoginToken(user, 200, req, res);
});
exports.validateUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
  let { email } = req.body;
  //Get User Based on Email
  const user = await User.findOne({
    $or: [{ email: email }, { userName: email }],
  });

  if (!user) {
    return next(new AppError('There is No User with These Email', 404));
  }
  if (!user.active) {
    return next(new AppError('Sorry! User is not allowed to Login', 500));
  }
  //Generate Random Token
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false }); //Saving only 2 Fields

  //Sending Email
  const resettoken = `${process.env.APP_URL}/resetPassword/${resetToken}`;
  const homepage = `${process.env.APP_URL}`;
  try {
    await new Email(user, resettoken, homepage).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Token Sent to Email',
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('There was an error sending an email, Try Again Later', 500)
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log('--', req.params.token);
  //Comparing Token
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('Token is Invalid or expired', 400));
  if (user && user.password != user.confirmPassword)
    return next(
      new AppError('Password and Confirm Password does not match', 400)
    );
  //Updating Field if there token verifies
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  this.changedPasswordAt = Date.now() - 1000;
  await user.save({ validateBeforeSave: false });
  //update passwordChangedAt property
  //Login To the User
  res.status(200).json({
    status: 'success',
    message: 'Password Change Success! Login to continue',
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1 Get User From Collection
  const user = await User.findById(req.user.id).select('+password');
  //2 Check If Posted Current Password is Correct
  if (
    !user ||
    !(await user.correctPassword(req.body.passwordCurrent, user.password))
  ) {
    return next(new AppError('Your Current Password is Wrong', 401));
  }
  if (!user.active) {
    return next(new AppError('Sorry! User is not allowed to Login', 500));
  }
  //3 If So, Update Password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save(); //User.findByIdAndUpdate will not work here
  //4 Log User in,send JWT
  res.status(200).json({
    status: 'success',
    message: 'Password Changed Successfully',
  });
  //createLoginToken(user, 200, req, res);
});
