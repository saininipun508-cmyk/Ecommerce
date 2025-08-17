const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware.isAuthenticatedUser);

router.route("/").post(orderController.newOrder);

router.route("/me").get(orderController.myOrders);

router.route("/:id").get(orderController.getSingleOrder);

module.exports = router;
