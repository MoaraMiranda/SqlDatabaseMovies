const { hash } = require("bcryptjs");
const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const {
  validatePassword,
  hashComplexity,
  validateEmail,
  fieldRequested,
} = require("../utils/validations");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name) fieldRequested(name, "Name");
    if (!email) fieldRequested(email, "Email");
    if (!password) fieldRequested(password, "Password");

    const hashedPassword = await hash(password, hashComplexity);
    const usersEmail = await knex("users").where({ email });

    if (usersEmail.length > 0) {
      throw new AppError("Email already registered");
    }

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.status(201).json();
  }

  async update(request, response) {
    const { name, email, newPassword, currentPassword } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User not found");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = await validatePassword(
      newPassword,
      currentPassword,
      user.password
    );

    const userEmailUpdated = await knex("users")
      .where({ email: user.email })
      .first();

    if (userEmailUpdated) {
      await validateEmail(userEmailUpdated.id, user.id);
    }

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return response.json();
  }

  async delete(request, response) {
    const { name, email, password } = request.body;
    const { id } = request.params;

    await knex("users").where({ id }).del();

    return response.json();
  }
}

module.exports = UsersController;
