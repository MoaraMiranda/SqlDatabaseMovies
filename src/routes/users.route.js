const { Router } = require("express");

const UsersController = require("../controllers/UsersController")

const usersRoute = Router();
const usersController = new UsersController();

usersRoute.post("/", usersController.create)

module.exports = usersRoute;
