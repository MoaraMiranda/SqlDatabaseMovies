const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoute = Router();
const tagsController = new TagsController();

tagsRoute.get("/:user_id", tagsController.index);

module.exports = tagsRoute;
