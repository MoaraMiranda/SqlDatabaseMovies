const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const UsersController = require("../controllers/UsersController");

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.post("/", usersController.create);
usersRoute.put("/", ensureAuthenticated, usersController.update);
usersRoute.delete("/", ensureAuthenticated, usersController.delete);

module.exports = usersRoute;
