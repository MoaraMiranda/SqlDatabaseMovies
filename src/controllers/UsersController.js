const { hash } = require("bcryptjs");
const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const connection = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const hashedPassword = await hash(password, 8);
    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    const checkUserExists = await knex.select("email").from("users")
    
    if (checkUserExists) {
      throw new AppError("Email already registered");
    }

    response.status(201).json();
  }
}

module.exports = UsersController;
