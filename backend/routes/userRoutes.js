const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);
router.route("/password/forgot").post(userController.forgotPassword);
router.route("/resetPassword/:token").patch(userController.resetPassword);

router.use(authMiddleware.isAuthenticatedUser);

router.route("/me").get(userController.getUserDeatils);
router.route("/me/update").patch(userController.updateMe);
router.route("/me/updatePassword").patch(userController.updatePassword);

module.exports = router;
