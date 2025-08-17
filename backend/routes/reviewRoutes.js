const express = require("express");
const reviewController = require("../controllers/reviewController.js");
const authMiddleware = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authMiddleware.isAuthenticatedUser, reviewController.createReview)
  .get(reviewController.getProductReview);

router.use(authMiddleware.isAuthenticatedUser);

router
  .route("/:reviewId")
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
