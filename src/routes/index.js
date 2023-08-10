const { Router } = require("express");

const usersRoute = require("./users.route");

const routes = Router();

routes.use("/users", usersRoute);

module.exports = routes;
