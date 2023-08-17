const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TagsController {
  async index(request, response) {
    const { user_id } = request.params;
    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found");
    }

    const tags = await knex("tags").where({ user_id });

    return response.json(tags);
  }
}

module.exports = TagsController;
