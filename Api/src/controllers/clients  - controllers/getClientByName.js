//Get Client By Name
const { Op } = require("sequelize");
const { Client } = require("../../db");

const getClientByName = async (name) => {
  const nameLowerCase = name.toLowerCase();

  const client = await Client.findAll({
    where: {
      name: {
        [Op.iLike]: `%${nameLowerCase}%`,
      },
    },
  });
  return client;
};

module.exports = getClientByName;
