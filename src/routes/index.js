const { Router } = require("express");

const usersRoute = require("./users.route");
const movieNotesRoute = require("./movieNotes.route");
const tagsRoute = require("./tags.route");
const sessionsRoute = require("./sessions.route");

const routes = Router();

routes.use("/users", usersRoute);
routes.use("/sessions", sessionsRoute);
routes.use("/movieNotes", movieNotesRoute);
routes.use("/tags", tagsRoute);

module.exports = routes;
