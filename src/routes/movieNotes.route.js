const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoute = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoute.post("/:user_id", movieNotesController.create);

module.exports = movieNotesRoute;
