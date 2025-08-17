const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorHandler = require("./controllers/errorController");

// routes import
const adminProductRoutes = require("./routes/adminProductRoutes");
const productRoutes = require("./routes/productRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const userRoutes = require("./routes/userRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1/admin/products", adminProductRoutes);
app.use("/api/v1/products", productRoutes);

app.use("/api/v1/admin/users", adminUserRoutes);
app.use("/api/v1/users", userRoutes);

app.use("/api/v1/admin/orders", adminOrderRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/payment", paymentRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorHandler);

module.exports = app;
