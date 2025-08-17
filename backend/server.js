const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(
    `Error Name: ${err.name}\nError Message: ${err.message} \n ${err}`
  );
  process.exit(1);
});

const app = require("./app");
const { connectToDataBase } = require("./config/database");

// connecting to data base
connectToDataBase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDELED REJECTION! Shutting down...");
  console.log(`Error Name: ${err.name}\nError Message: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
