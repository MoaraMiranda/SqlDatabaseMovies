const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoute = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoute.use(ensureAuthenticated);

movieNotesRoute.get("/", movieNotesController.index);
movieNotesRoute.post("/", movieNotesController.create);
movieNotesRoute.get("/:id", movieNotesController.show);
movieNotesRoute.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoute;
