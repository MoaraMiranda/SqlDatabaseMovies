const { hash } = require("bcryptjs");
const knex = require("../database/knex");

const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");
const { validatePassword, validateEmail } = require("../utils/validations");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, newPassword, currentPassword } = request.body;
    const id = request.user.id;

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
    const user_id = request.user.id;

    await knex("users").where({ user_id }).del();

    return response.json();
  }
}

module.exports = UsersController;
