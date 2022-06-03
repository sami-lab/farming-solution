const AppError = require("../utils/appError");

//MiddleWare to check whether user have given roles or not
//parameter roles is an array of roles which we will check against user roles
module.exports = ([...roles]) => {
  return (req, res, next) => {
    console.log(req.user.roles, roles);
    const c = req.user.roles.filter((role) => roles.includes(role.name));
    if (c.length == 0)
      return next(new AppError("you Dont have Permission for this route", 403));
    // if(!roles.includes(req.user.roles)){
    //     return next(new AppError('you Dont have Permission for this route',403))
    // }
    next();
  };
};
