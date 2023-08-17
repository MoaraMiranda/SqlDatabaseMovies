const { Router } = require("express");

const usersRoute = require("./users.route");
const movieNotesRoute = require("./movieNotes.route");
const tagsRoute = require("./tags.route");

const routes = Router();

routes.use("/users", usersRoute);
routes.use("/movieNotes", movieNotesRoute);
routes.use("/tags", tagsRoute);

module.exports = routes;
