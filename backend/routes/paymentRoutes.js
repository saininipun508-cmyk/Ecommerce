const express = require("express");
const authMiddleware = require("../middleware/auth");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.use(authMiddleware.isAuthenticatedUser);

router.route("/process").post(paymentController.processPayment);
router.route("/stripeapikey").get(paymentController.sendStripeApiKey);

module.exports = router;
