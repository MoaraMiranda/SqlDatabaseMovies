const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");

const usersRoute = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.MULTER);

usersRoute.post("/", usersController.create);
usersRoute.put("/", ensureAuthenticated, usersController.update);
usersRoute.delete("/", ensureAuthenticated, usersController.delete);
usersRoute.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoute;
