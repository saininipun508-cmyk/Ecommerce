const express = require("express");

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(
  authMiddleware.isAuthenticatedUser,
  authMiddleware.authorizeRoles("admin")
);

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUserRole)
  .delete(userController.deleteUser);

module.exports = router;
