const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//  create new error
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

// get single order
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "user",
    select: "name email",
  });

  if (!order) {
    return next(new AppError(`Order not found for id: ${req.params.id}`), 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// get logged in user orders
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

// get all orders --Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    status: "success",
    totalAmount,
    results: orders.length,
    data: {
      orders,
    },
  });
});

// update orders status --Admin
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError(`Order not found for id: ${req.params.id}`), 404);
  }

  if (order.orderStatus === "Delivered") {
    return next(new AppError("You already delivered this order.", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete order --Admin
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError(`Order not found for id: ${req.params.id}`), 404);
  }

  res.status(200).json({
    status: "success",
    message: "Order deleted successfully",
  });
});
