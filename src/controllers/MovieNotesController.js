const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found");
    }

    const [movieNotes_id] = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        movieNotes_id,
        name: name.toLowerCase(),
        user_id,
      };
    });
    await knex("tags").insert(tagsInsert);

    console.log("entrou aqui", response.json());

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("movieNotes").where({ id }).first();
    const tags = await knex("tags")
      .where({ movieNotes_id: id })
      .orderBy("name");
    return response.json({ ...note, tags });
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex("movieNotes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    // recebimento e tratamento de dados
    const { search } = request.query;
    const user_id = request.user.id;
    const searchParsed = search.toLowerCase().trim();

    // busca de dados no banco
    const movies = await knex("movieNotes")
      .select(["id"])
      .where("user_id", user_id)
      .whereLike("title", `%${searchParsed}%`)
      .orderBy("title");

    const tags = await knex("tags")
      .select(["movieNotes_id"])
      .where("user_id", user_id)
      .whereLike("name", `%${searchParsed}%`);

    const moviesIds = [...movies, ...tags].map(
      (item) => item.id || item.movieNotes_id
    );

    const notes = await knex("tags")
      .select(["movieNotes.id", "movieNotes.title", "movieNotes.user_id"])
      .groupBy("movieNotes_id")
      .where("movieNotes.user_id", user_id)
      .whereIn("movieNotes.id", moviesIds)
      .innerJoin("movieNotes", "movieNotes.id", "tags.movieNotes_id")
      .orderBy("movieNotes.title");

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.movieNotes_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });
    //conversão para json e retorno
    return response.json(notesWithTags);
  }
}

module.exports = MovieNotesController;
