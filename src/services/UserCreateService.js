const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");
const { hashComplexity, fieldRequested } = require("../utils/validations");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    if (!name) fieldRequested(name, "Name");
    if (!email) fieldRequested(email, "Email");
    if (!password) fieldRequested(password, "Password");

    const hashedPassword = await hash(password, hashComplexity);
    const usersEmail = await this.userRepository.findByEmail(email);

    if (usersEmail) {
      throw new AppError("Email already registered");
    }

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}
module.exports = UserCreateService;
