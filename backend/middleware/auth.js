const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please login to access this resource.", 401));
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);

  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (user.passwordChangedAfter(decode.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = user;
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }

    next();
  };
};
