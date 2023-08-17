const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoute = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoute.get("/", movieNotesController.index);
movieNotesRoute.post("/:user_id", movieNotesController.create);
movieNotesRoute.get("/:id", movieNotesController.show);
movieNotesRoute.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoute;
