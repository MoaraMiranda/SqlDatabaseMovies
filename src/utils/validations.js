const { hash, compare } = require("bcryptjs");
const AppError = require("./AppError");

const hashComplexity = 8;
async function validatePassword(
  userNewPassword,
  userCurrentPassword,
  dbPassword
) {
  if (!userNewPassword && userCurrentPassword) {
    throw new AppError(
      "You need to inform the password to define a new password"
    );
  }

  if (userNewPassword && !userCurrentPassword) {
    throw new AppError(
      "You need to inform the old password to define a new password"
    );
  }
  if (userNewPassword && userCurrentPassword) {
    const checkPassword = await compare(userCurrentPassword, dbPassword);
    if (!checkPassword) {
      throw new AppError("Old password is not correct");
    }
    const hashNewPassword = await hash(userNewPassword, hashComplexity);
    return hashNewPassword;
  }

  return dbPassword;
}

async function validateEmail(dbUserId, userId) {
  if (dbUserId != userId) {
    throw new AppError("Email registered for a different user");
  }
}

module.exports = { validatePassword, hashComplexity, validateEmail };
