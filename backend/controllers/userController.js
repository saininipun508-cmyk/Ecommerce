const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const createSendToken = require("../utils/createSendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.register = catchAsync(async (req, res, next) => {
  let myCloud = {
    public_id: "defaultUserImage_o3hvsv",
    secure_url:
      "https://res.cloudinary.com/dhtnodfhl/image/upload/v1657302282/avatars/defaultUserImage_o3hvsv.png",
  };

  if (req.body.avatar.length > 0) {
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  }

  const { name, email, password, confirmPassword } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email and password.", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Invalid email or password.", 401));
  }

  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (rea, res, next) => {
  res.cookie("jwt", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged Out",
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // Get reset password token
  const resetToken = user.getPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    await sendEmail({
      email: user.email,
      subject: `Ecommerce password recovery.`,
      message,
    });

    res.status(200).json({
      status: "success",
      message: `Token sent to email ${user.email} successfully.`,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;

  const resetToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;

  await user.save();
  createSendToken(user, 200, res);
});

//By user
exports.getUserDeatils = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return next(new AppError("Please fill all the feilds.", 401));
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.comparePassword(oldPassword, user.password))) {
    return next(new AppError("Old password is incorrect.", 400));
  }

  if (newPassword === oldPassword) {
    return next(
      new AppError(
        "Your new password can not be same as your old password.",
        400
      )
    );
  }

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;

  await user.save();

  createSendToken(user, 200, res);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar.length > 0) {
    const user = await User.findById(req.user._id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    userData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, userData, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
  });
});

// By Admin
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// Get details of single user by admin
exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No User found for id: " + req.params.id, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// By admin
exports.updateUserRole = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, userData, {
    runValidators: true,
    new: true,
  });

  if (!user) {
    return next(new AppError(`User not found for id: ${req.params.id}`), 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// By admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError(`User not found for id: ${req.params.id}`), 404);
  }

  //photo remove from cloudinary
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});
