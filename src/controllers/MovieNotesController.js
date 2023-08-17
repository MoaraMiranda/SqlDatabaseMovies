const knex = require("../database/knex");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

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

    response.json();
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
    const { title, user_id, tags } = request.query;
    let notes;

    if (tags) {
      const filteredTags = tags
        .split(",")
        .map((tag) => tag.toLowerCase().trim());
      notes = await knex("tags")
        .select(["movieNotes.id", "movieNotes.title", "movieNotes.user_id"])
        .where("movieNotes.user_id", user_id)
        .whereLike("movieNotes.title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("movieNotes", "movieNotes_id", "tags.movieNotes_id")
        .orderBy("movieNotes.title");
    } else {
      notes = await knex("movieNotes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.movieNotes_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
  }
}

module.exports = MovieNotesController;
