const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(
  authMiddleware.isAuthenticatedUser,
  authMiddleware.authorizeRoles("admin")
);

router.route("/").get(orderController.getAllOrders);

router
  .route("/:id")
  .patch(orderController.updateOrderStatus)
  .delete(orderController.deleteOrder);

module.exports = router;
