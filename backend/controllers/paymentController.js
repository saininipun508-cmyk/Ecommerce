const catchAsync = require("../utils/catchAsync");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsync(async (req, res, next) => {
  const newPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "EShop",
    },
  });

  res.status(200).json({
    status: "success",
    client_secret: newPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
