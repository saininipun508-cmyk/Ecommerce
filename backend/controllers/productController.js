const Product = require("../models/productModel");
const cloudinary = require("cloudinary");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/apiFeatures");

//by admin only
exports.createProduct = catchAsync(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // const productsCount = await Product.countDocuments();
  const resultPerPage = 10;

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let productsCount = products.length;

  apiFeature.pagination(resultPerPage);

  apiFeature.query._executionStack = null;
  products = await apiFeature.query;

  res.status(200).json({
    status: "success",
    results: products.length,
    resultPerPage,
    data: {
      products,
    },
    productsCount,
  });
});

//  Get All Products --Admin
exports.getAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// by admin only
exports.updateProduct = catchAsync(async (req, res, next) => {
  const findProduct = await Product.findById(req.params.id).populate("review");

  if (!findProduct) {
    return next(
      new AppError(`Product not found for product id: ${req.params.id}`, 404)
    );
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < findProduct.images.length; i++) {
      await cloudinary.v2.uploader.destroy(findProduct.images[i].public_id);
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// by admin only
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError(`Product not found for product id: ${req.params.id}`, 404)
    );
  }

  // deleting images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("review");

  if (!product) {
    return next(
      new AppError(`Product not found for product id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
