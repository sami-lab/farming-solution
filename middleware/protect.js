const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const Shop = require('../Models/shop');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//To Check whether user is login or not
module.exports = catchAsync(async (req, res, next) => {
  //1 getting Token and check if there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  //verifying Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //checking User Really Exist
  let freshUser = await User.findById(decoded.id).populate('roles', 'name');
  if (!freshUser)
    return next(
      new AppError('The User Belonging to this Token does no longer Exist', 401)
    );

  //checking if user changed password
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    //will return true if password changed
    return next(
      new AppError('User recently changed password! Please Log in again', 401)
    );
  }

  if (freshUser.roles.some((role) => role.name === 'Manager')) {
    const doc = await Shop.findOne({ managerId: freshUser._id }).select(
      '+shopStatus'
    );

    if (doc) {
      req.user = {
        ...freshUser._doc,
        shop: doc,
        id: freshUser._doc._id,
      };
      next();
    }
  } else {
    req.user = freshUser;
    next(); //Allowing Access to
  }
});
