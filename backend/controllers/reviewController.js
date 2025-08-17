const Review = require("../models/reviewModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync.js");

exports.createReview = catchAsync(async (req, res, next) => {
  const { review, rating } = req.body;

  const newReview = await Review.create({
    review,
    rating,
    user: req.user._id,
    product: req.params.productId,
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

exports.getProductReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ product: req.params.productId });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { review, rating } = req.body;

  const newReview = await Review.findById(req.params.reviewId);

  if (
    req.user.role === "user" &&
    req.user._id.toString() !== newReview.user._id.toString()
  ) {
    return next(
      new AppError(
        `You can not perform this action for review id: ${req.params.reviewId}`,
        404
      )
    );
  }

  if (!newReview) {
    return next(
      new AppError(
        `Review not found for review id: ${req.params.reviewId}`,
        404
      )
    );
  }

  newReview.rating = rating;
  newReview.review = review || newReview.review;
  await newReview.save();

  res.status(200).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);

  if (
    req.user.role === "user" &&
    req.user._id.toString() !== review.user._id.toString()
  ) {
    return next(
      new AppError(
        `You can not perform this action for review id: ${req.params.reviewId}`,
        404
      )
    );
  }

  if (!review) {
    return next(
      new AppError(
        `Review not found for review id: ${req.params.reviewId}`,
        404
      )
    );
  }

  await review.delete();
  Review.calcAverageRatings(req.params.productId);

  res.status(200).json({
    status: "success",
    message: "Review deleted successfully",
  });
});
