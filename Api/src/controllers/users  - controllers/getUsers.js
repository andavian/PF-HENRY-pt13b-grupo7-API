//Get All Clients
const { Client } = require("../../db");

const getClients = async () => {
  const allClients = await Client.findAll();
  return allClients;
};

module.exports = getClients;
