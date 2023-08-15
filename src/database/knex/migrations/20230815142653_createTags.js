exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name");

    table
      .integer("movieNotes_id")
      .references("id")
      .inTable("movieNotes")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("tags");
