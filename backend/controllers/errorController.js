const AppError = require("../utils/AppError");

const validationErrorHandler = (err) => {
  let message = `Invalid input data.`;
  for (let key in err.errors) {
    message = `${message} ${err.errors[key].message}`;
  }

  return new AppError(message, 400);
};

const castErrorHandler = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let duplicateValue = "";
  for (let key in err.keyValue) {
    duplicateValue = duplicateValue + `${err.keyValue[key]}`;
  }

  const message = `Duplicate field value: ${duplicateValue}. Please use another value!`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  // Programming or other unknown error: don't leak error details
  console.log("Error: ", err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!!!",
  });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.errorstatusCode || 500;
  error.status = `${error.statusCode}`.startsWith("4") ? "fail" : "error";

  if (process.env.NODE_ENV === "development ") {
    sendErrorDev(error, res);
  } else {
    let err = { ...error, message: error.message };

    if (error.name === "ValidationError") err = validationErrorHandler(error);
    if (error.name === "CastError") err = castErrorHandler(error);
    if (error.code === 11000) err = handleDuplicateFieldsDB(error);
    if (error.name === "JsonWebTokenError") err = handleJWTError();
    if (error.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendErrorProd(err, res);
  }
};
