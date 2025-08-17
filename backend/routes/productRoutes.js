const express = require("express");

const reviewRouter = require("./reviewRoutes");
const productController = require("../controllers/productController");

const router = express.Router();

router.use("/:productId/reviews", reviewRouter);

router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getProductById);

module.exports = router;
