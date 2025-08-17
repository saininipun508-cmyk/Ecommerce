const createSendToken = (user, statusCode, res) => {
  const token = user.createJWTToken();
  user.password = undefined;

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("jwt", token, options).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

module.exports = createSendToken;
