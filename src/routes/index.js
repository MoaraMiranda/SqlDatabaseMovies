const { Router } = require("express");

const usersRoute = require("./users.route");
const movieNotesRoute = require("./movieNotes.route");

const routes = Router();

routes.use("/users", usersRoute);
routes.use("/movieNotes", movieNotesRoute);

module.exports = routes;
