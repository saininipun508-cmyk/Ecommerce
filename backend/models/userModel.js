const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    maxLength: [30, "Name can not exceed 30 characters."],
    minLength: [4, "Name should have more than 4 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email."],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minLength: [8, "Password should be greater than 8 characters."],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter your password."],
    select: false,
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  passwordResetToken: String,
  passwordResetExpire: Date,
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.createJWTToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

userSchema.methods.passwordChangedAfter = function (JWTTimeStamp) {
  // false means password not changed
  if (!this.passwordChangedAt) return false;

  // 'JWTTimeStamp' is in second and 'this.passwordChangedAt' is in Date format so to compare them
  // 1. Convert 'this.passwordChangedAt' into millisecond by using 'this.passwordChangedAt.getTime()'
  // 2. convert the above result into second and extract only integer part from it using parseInt.
  // 3. 'JWTTimeStamp' is in second and 'this.passwordChangedAt' is in millisecond so make their unit same
  const changeTimeStamp = parseInt(this.passwordChangedAt.getTime());

  return JWTTimeStamp * 1000 < changeTimeStamp;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
