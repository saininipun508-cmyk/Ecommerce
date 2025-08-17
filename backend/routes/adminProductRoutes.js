const express = require("express");

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(
  authMiddleware.isAuthenticatedUser,
  authMiddleware.authorizeRoles("admin")
);

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAdminProducts);
router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
