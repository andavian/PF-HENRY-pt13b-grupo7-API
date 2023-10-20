//Get Client By Name
const { Op } = require("sequelize");
const { User } = require("../../db");

const getUserByEmail = async (email) => {
  const emailLowerCase = email.toLowerCase();

  const user = await User.findAll({
    where: {
      email: {
        [Op.iLike]: `%${emailLowerCase}%`,
      },
    },
  });
  return user;
};

module.exports = getUserByEmail;
