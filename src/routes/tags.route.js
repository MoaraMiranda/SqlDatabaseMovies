const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const TagsController = require("../controllers/TagsController");

const tagsRoute = Router();
const tagsController = new TagsController();

tagsRoute.get("/",ensureAuthenticated, tagsController.index);

module.exports = tagsRoute;
