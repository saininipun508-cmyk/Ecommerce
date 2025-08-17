const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description."],
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price."],
      maxLength: [8, "Price cannot exceeds 8 character."],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category."],
      lowercase: true,
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock."],
      maxLength: [4, "Stock cannot exceed 4 characters."],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("review", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
