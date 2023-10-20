//Get All Clients
const { User } = require("../../db");

const getUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

module.exports = getUsers;
