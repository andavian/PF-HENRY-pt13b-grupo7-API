//Get Client By Name
const { Op } = require("sequelize");
const { User } = require("../../db");

const getUserByName = async (name) => {
  const nameLowerCase = name.toLowerCase();

  const user = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${nameLowerCase}%`,
      },
    },
  });
  return user;
};

module.exports = getUserByName;
